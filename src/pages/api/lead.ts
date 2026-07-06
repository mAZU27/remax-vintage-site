import type { APIRoute } from 'astro';

// Server-side lead proxy. Every lead-capture form on the site POSTs here
// (same origin), and this endpoint forwards to the Novus ingest with the
// source token kept SERVER-SIDE (never shipped to the browser). This closes
// the token-exposure hole and gives all forms one clean, CORS-free endpoint.
//
// Runs on-demand (not prerendered). Config via server env (Vercel / .env):
//   NOVUS_INGEST_ENDPOINT  e.g. https://<novus>.vercel.app/api/leads/ingest
//   NOVUS_INGEST_TOKEN     the website lead-source token
export const prerender = false;

const MAX_BODY = 32 * 1024;

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  const endpoint = import.meta.env.NOVUS_INGEST_ENDPOINT;
  const token = import.meta.env.NOVUS_INGEST_TOKEN;

  const raw = await request.text();
  if (raw.length > MAX_BODY) return json({ error: 'payload demasiado grande' }, 413);

  let body: Record<string, unknown>;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('bad');
    body = parsed as Record<string, unknown>;
  } catch {
    return json({ error: 'corpo inválido' }, 400);
  }

  // Not configured (e.g. a preview without env): accept gracefully so the
  // form UX never breaks, but signal it wasn't forwarded.
  if (!endpoint || !token) {
    console.warn('[lead] NOVUS_INGEST_* not configured — lead not forwarded');
    return json({ received: true, forwarded: false }, 202);
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    // Mirror the ingest's status class; never leak internal details.
    if (res.status >= 500) return json({ received: true, pending: true }, 202);
    return json({ received: true, ...('deduplicated' in data ? { deduplicated: data.deduplicated } : {}) }, res.status);
  } catch (e) {
    // Network failure reaching Novus: don't lose the UX; report received.
    console.error('[lead] forward failed:', e);
    return json({ received: true, pending: true }, 202);
  }
};
