import type { APIRoute } from 'astro';
import { normalizeLead, buildLeadEmail, deliverViaResend } from '../../lib/leads';

// Server-side lead endpoint. Every lead-capture form on the site POSTs here
// (same origin) and this route delivers the submission through a real,
// server-confirmed channel before reporting success — the browser only sees
// { delivered: true } once at least one channel accepted the message.
//
// Primary channel: Resend transactional email to the agency.
// Optional future channel: the Novus ingest (kept wired but NOT required).
// Secrets stay server-side (never shipped to the browser).
//
// Runs on-demand (not prerendered). Config via server env (Vercel / .env):
//   RESEND_API_KEY        Resend API key (Bearer)
//   LEAD_FROM_EMAIL       verified sender on notify.remaxcollectionvintage.pt
//   LEAD_RECIPIENT_EMAIL  agency inbox that receives the leads
//   NOVUS_INGEST_ENDPOINT optional — e.g. https://<novus>.vercel.app/api/leads/ingest
//   NOVUS_INGEST_TOKEN    optional — the website lead-source token
export const prerender = false;

const MAX_BODY = 32 * 1024;

// import.meta.env is statically replaced by Vite at build; process.env carries
// the runtime values on Vercel's Node serverless runtime. Read runtime first,
// fall back to build-time. process is reached via globalThis so no @types/node
// (which would clash with Astro's DOM lib globals) is required.
const IM_ENV = (import.meta.env ?? {}) as Record<string, string | undefined>;
const PROC_ENV =
  (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};
function env(key: string): string | undefined {
  const p = PROC_ENV[key];
  return (p && p.length ? p : undefined) ?? IM_ENV[key];
}

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  // 1. Transport: JSON content-type only.
  const contentType = (request.headers.get('content-type') ?? '').toLowerCase();
  if (!contentType.includes('application/json')) {
    return json({ received: false, delivered: false, error: 'unsupported_media_type' }, 415);
  }

  // 2. Transport: bounded body.
  const raw = await request.text();
  if (raw.length > MAX_BODY) {
    return json({ received: false, delivered: false, error: 'payload_too_large' }, 413);
  }

  // 3. Parse a single JSON object.
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return json({ received: false, delivered: false, error: 'invalid_json' }, 400);
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return json({ received: false, delivered: false, error: 'invalid_body' }, 400);
  }

  // 4. Validate + normalize (allow-list, consent, email, field merge).
  const result = normalizeLead(parsed as Record<string, unknown>);
  if (!result.ok) {
    const status = result.error === 'unknown_form' ? 400 : 422;
    return json({ received: false, delivered: false, error: result.error }, status);
  }
  const lead = result.lead;

  // 5. Resolve channels from env.
  const RESEND_API_KEY = env('RESEND_API_KEY');
  const LEAD_FROM_EMAIL = env('LEAD_FROM_EMAIL');
  const LEAD_RECIPIENT_EMAIL = env('LEAD_RECIPIENT_EMAIL');
  const NOVUS_INGEST_ENDPOINT = env('NOVUS_INGEST_ENDPOINT');
  const NOVUS_INGEST_TOKEN = env('NOVUS_INGEST_TOKEN');

  const resendReady = Boolean(RESEND_API_KEY && LEAD_FROM_EMAIL && LEAD_RECIPIENT_EMAIL);
  const novusReady = Boolean(NOVUS_INGEST_ENDPOINT && NOVUS_INGEST_TOKEN);

  if (!resendReady && !novusReady) {
    // No real channel — never fake a success. Log without PII/payload.
    console.error('[lead] delivery unavailable: no channel configured', {
      form: lead.form,
      submission_id: lead.submissionId,
    });
    return json({ received: false, delivered: false, error: 'delivery_unavailable' }, 503);
  }

  const ctx = {
    referer: request.headers.get('referer') ?? '',
    timestampIso: new Date().toISOString(),
  };
  const email = buildLeadEmail(lead, ctx);

  let delivered = false;
  let deduplicated: boolean | undefined;

  // Channel A — Resend transactional email (primary).
  if (resendReady) {
    const r = await deliverViaResend(lead, email, {
      apiKey: RESEND_API_KEY as string,
      from: LEAD_FROM_EMAIL as string,
      to: LEAD_RECIPIENT_EMAIL as string,
    });
    if (r.ok) {
      delivered = true;
      if (r.deduplicated) deduplicated = true;
    } else {
      console.error('[lead] resend delivery failed', {
        form: lead.form,
        submission_id: lead.submissionId,
        status: r.status,
      });
    }
  }

  // Channel B — Novus ingest (optional, future). Also counts as confirmation.
  if (novusReady) {
    try {
      const res = await fetch(NOVUS_INGEST_ENDPOINT as string, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${NOVUS_INGEST_TOKEN}`,
          'Idempotency-Key': `lead-${lead.submissionId}`,
        },
        body: raw,
      });
      if (res.ok) {
        delivered = true;
        const data = (await res.json().catch(() => ({}))) as { deduplicated?: unknown };
        if (typeof data.deduplicated === 'boolean') deduplicated = data.deduplicated;
      } else {
        console.error('[lead] novus delivery failed', {
          form: lead.form,
          submission_id: lead.submissionId,
          status: res.status,
        });
      }
    } catch {
      console.error('[lead] novus delivery error', {
        form: lead.form,
        submission_id: lead.submissionId,
      });
    }
  }

  // 6. Report success ONLY when a real channel confirmed delivery.
  if (!delivered) {
    return json({ received: false, delivered: false, error: 'delivery_failed' }, 502);
  }
  return json(
    {
      received: true,
      delivered: true,
      submission_id: lead.submissionId,
      ...(deduplicated !== undefined ? { deduplicated } : {}),
    },
    200,
  );
};

// Any non-POST method is rejected cleanly (the site only ingests via POST).
export const GET: APIRoute = () =>
  json({ received: false, delivered: false, error: 'method_not_allowed' }, 405);
