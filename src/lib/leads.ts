// Lead processing — pure, framework-free, unit-testable.
//
// This module owns everything that can be reasoned about without a request or
// environment: the allow-list of legitimate forms, input validation and
// normalization (merging the message/mensagem variants, coalescing dynamic
// chat keys), escaped HTML/plain-text email rendering, and the Resend delivery
// call. It deliberately reads NO env (no import.meta.env / process.env) and
// performs no I/O except the injectable fetch in deliverViaResend, so the whole
// contract is testable from Node with a mocked fetch. The thin API route
// (src/pages/api/lead.ts) reads env, enforces transport limits, and orchestrates.

// ---- Allow-list: the only five legitimate lead surfaces on the site ----
export const FORM_LABELS = {
  'valuation-form': 'Pedido de avaliação',
  'value-simulator': 'Simulador de valor',
  contacto: 'Contacto geral',
  'careers-application': 'Candidatura — Carreiras',
  'chat-assistente': 'Assistente (chat)',
} as const;

export type FormType = keyof typeof FORM_LABELS;
export const ALLOWED_FORMS = Object.keys(FORM_LABELS) as FormType[];

// Forms carrying a canonical email field that must be present and well-formed.
// The chat captures contact as free text (phone OR email), so email is optional
// there and only used opportunistically as reply-to.
const EMAIL_REQUIRED: Record<FormType, boolean> = {
  'valuation-form': true,
  'value-simulator': true,
  contacto: true,
  'careers-application': true,
  'chat-assistente': false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAIL_ANYWHERE_RE = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const MAX_FIELD = 2000;
const MAX_MESSAGE = 8000;
const MAX_ITEM = 300;

// Keys handled explicitly; anything else on the body is treated as a
// form-specific "extra" row (this is what carries value-simulator's property
// details, careers' interest_area/cv_filename, and the chat's dynamic answers).
const CANONICAL_KEYS = new Set([
  'form',
  'submission_id',
  'full_name',
  'name',
  'email',
  'phone',
  'message',
  'mensagem',
  'consent',
  'utm',
]);

// Pretty labels for the known snake_case extras (chat keys are already
// human-readable Portuguese and fall through unchanged).
const KEY_LABELS: Record<string, string> = {
  property_location: 'Localização do imóvel',
  property_type: 'Tipo de imóvel',
  typology: 'Tipologia',
  area_m2: 'Área (m²)',
  condition: 'Estado',
  extras: 'Extras',
  estimate_low: 'Estimativa (mín.)',
  estimate_high: 'Estimativa (máx.)',
  assunto: 'Assunto',
  interest_area: 'Área de interesse',
  location: 'Localidade',
  cv_filename: 'Ficheiro CV (nome)',
  objetivo: 'Objetivo',
};

export interface NormalizedLead {
  form: FormType;
  formLabel: string;
  submissionId: string;
  fullName: string;
  email: string; // '' when absent/optional
  phone: string; // '' when absent
  message: string; // '' when absent (message || mensagem merged)
  consent: { given: boolean; type: string; textVersion: string };
  utm: Record<string, string>;
  extra: Array<{ key: string; value: string }>;
}

export type NormalizeError =
  | 'unknown_form'
  | 'missing_consent'
  | 'invalid_email';

export type NormalizeResult =
  | { ok: true; lead: NormalizedLead }
  | { ok: false; error: NormalizeError };

export function escapeHtml(input: unknown): string {
  return String(input ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function toStr(value: unknown, max = MAX_FIELD): string {
  if (value == null) return '';
  let s: string;
  if (Array.isArray(value)) {
    s = value.map((v) => toStr(v, MAX_ITEM)).filter(Boolean).join(', ');
  } else if (typeof value === 'object') {
    try {
      s = JSON.stringify(value);
    } catch {
      s = '';
    }
  } else {
    s = String(value);
  }
  s = s.trim();
  return s.length > max ? s.slice(0, max) + '…' : s;
}

function newSubmissionId(): string {
  const c = (globalThis as { crypto?: { randomUUID?: () => string } }).crypto;
  if (c?.randomUUID) return c.randomUUID();
  // Fallback for exotic runtimes without WebCrypto — never the primary path.
  return `sid-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function normalizeLead(raw: Record<string, unknown>): NormalizeResult {
  const form = String(raw.form ?? '') as FormType;
  if (!ALLOWED_FORMS.includes(form)) return { ok: false, error: 'unknown_form' };

  // Consent — accept both the boolean shape (consent:true) and the richer
  // object shape ({ type, text_version }) the four classic forms already send.
  let given = false;
  let consentType = '';
  let consentVersion = 'v1';
  const consentRaw = raw.consent;
  if (consentRaw === true) {
    given = true;
    consentType = 'generic';
  } else if (consentRaw && typeof consentRaw === 'object') {
    const c = consentRaw as Record<string, unknown>;
    consentType = toStr(c.type, 60);
    consentVersion = toStr(c.text_version, 20) || 'v1';
    given = c.given === true || Boolean(consentType);
  }
  if (!given) return { ok: false, error: 'missing_consent' };

  const fullName = toStr(raw.full_name ?? raw.name);
  const email = toStr(raw.email, 320);
  const phone = toStr(raw.phone, 80);
  const message = toStr(raw.message ?? raw.mensagem, MAX_MESSAGE);

  if (EMAIL_REQUIRED[form] && (!email || !EMAIL_RE.test(email))) {
    return { ok: false, error: 'invalid_email' };
  }

  const utm: Record<string, string> = {};
  if (raw.utm && typeof raw.utm === 'object' && !Array.isArray(raw.utm)) {
    for (const [k, v] of Object.entries(raw.utm as Record<string, unknown>)) {
      if (/^utm_[a-z_]+$/i.test(k)) utm[k] = toStr(v, MAX_ITEM);
    }
  }

  const extra: Array<{ key: string; value: string }> = [];
  for (const [k, v] of Object.entries(raw)) {
    if (CANONICAL_KEYS.has(k)) continue;
    const val = toStr(v);
    if (val) extra.push({ key: k, value: val });
  }

  const providedSid = toStr(raw.submission_id, 64);
  const submissionId = UUID_RE.test(providedSid) ? providedSid : newSubmissionId();

  return {
    ok: true,
    lead: {
      form,
      formLabel: FORM_LABELS[form],
      submissionId,
      fullName,
      email, // kept verbatim for display; validity is enforced above per form
      phone,
      message,
      consent: { given, type: consentType || 'generic', textVersion: consentVersion },
      utm,
      extra,
    },
  };
}

// Best email to answer the lead on: the canonical field if valid, otherwise the
// first address found among the free-text extras (covers the chat's 'Contacto').
export function deriveReplyTo(lead: NormalizedLead): string | undefined {
  if (lead.email && EMAIL_RE.test(lead.email)) return lead.email;
  for (const { value } of lead.extra) {
    const m = value.match(EMAIL_ANYWHERE_RE);
    if (m) return m[0];
  }
  return undefined;
}

function prettyKey(key: string): string {
  return KEY_LABELS[key] ?? key;
}

export interface EmailContext {
  referer: string;
  timestampIso: string;
}

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

export function buildLeadEmail(lead: NormalizedLead, ctx: EmailContext): RenderedEmail {
  const rows: Array<[string, string]> = [];
  rows.push(['Formulário', `${lead.formLabel} (${lead.form})`]);
  if (lead.fullName) rows.push(['Nome', lead.fullName]);
  if (lead.email) rows.push(['Email', lead.email]);
  if (lead.phone) rows.push(['Telefone', lead.phone]);
  if (lead.message) rows.push(['Mensagem', lead.message]);
  for (const { key, value } of lead.extra) rows.push([prettyKey(key), value]);
  const utmEntries = Object.entries(lead.utm);
  if (utmEntries.length) rows.push(['UTM', utmEntries.map(([k, v]) => `${k}=${v}`).join(' · ')]);
  rows.push([
    'Consentimento',
    lead.consent.given ? `sim (${lead.consent.type}, ${lead.consent.textVersion})` : 'não',
  ]);
  if (ctx.referer) rows.push(['Origem', ctx.referer]);
  rows.push(['Data (UTC)', ctx.timestampIso]);
  rows.push(['ID de envio', lead.submissionId]);

  const subjectRaw = `Nova lead — ${lead.formLabel}${lead.fullName ? ` — ${lead.fullName}` : ''}`;
  const subject = subjectRaw.length > 180 ? subjectRaw.slice(0, 180) : subjectRaw;

  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');
  const html = renderHtml(subject, rows);
  return { subject, html, text };
}

// Transactional email HTML. Literal hex colours (not the site CSS tokens) are
// intentional: email clients do not support CSS custom properties, and inline
// styles are the portable path. EVERY interpolated key/value is escaped.
function renderHtml(subject: string, rows: Array<[string, string]>): string {
  const body = rows
    .map(([k, v]) => {
      const value = escapeHtml(v).replace(/\n/g, '<br>');
      return (
        `<tr>` +
        `<td style="padding:10px 16px;border-bottom:1px solid #EFE6D1;font:600 12px/1.4 Arial,sans-serif;color:#9A7E50;text-transform:uppercase;letter-spacing:0.06em;vertical-align:top;white-space:nowrap;">${escapeHtml(k)}</td>` +
        `<td style="padding:10px 16px;border-bottom:1px solid #EFE6D1;font:400 15px/1.5 Arial,sans-serif;color:#0B1A2E;">${value}</td>` +
        `</tr>`
      );
    })
    .join('');

  return (
    `<!doctype html><html lang="pt-PT"><head><meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width,initial-scale=1">` +
    `<title>${escapeHtml(subject)}</title></head>` +
    `<body style="margin:0;padding:24px;background:#F4EDDE;">` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;margin:0 auto;background:#FAF6EC;border:1px solid #EFE6D1;border-radius:8px;overflow:hidden;">` +
    `<tr><td style="padding:20px 24px;background:#0B1A2E;">` +
    `<div style="font:600 12px/1 Arial,sans-serif;color:#B89968;text-transform:uppercase;letter-spacing:0.14em;">RE/MAX Collection Vintage</div>` +
    `<div style="margin-top:6px;font:400 20px/1.3 Georgia,serif;color:#F4EDDE;">${escapeHtml(subject)}</div>` +
    `</td></tr>` +
    `<tr><td style="padding:8px 8px 4px;">` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${body}</table>` +
    `</td></tr>` +
    `<tr><td style="padding:14px 24px 22px;font:400 12px/1.5 Arial,sans-serif;color:#9A7E50;">` +
    `Lead gerada automaticamente pelo site. Responda diretamente a este email para contactar a pessoa (quando um email válido foi fornecido).` +
    `</td></tr>` +
    `</table></body></html>`
  );
}

export interface ResendConfig {
  apiKey: string;
  from: string;
  to: string;
}

export interface DeliveryResult {
  ok: boolean;
  id?: string;
  status: number;
}

// Deliver via the Resend REST API. fetchImpl is injectable for tests. The
// Idempotency-Key is derived from the submission id so a retried/duplicated
// POST (double-click, network retry) never produces a second email.
export async function deliverViaResend(
  lead: NormalizedLead,
  email: RenderedEmail,
  cfg: ResendConfig,
  fetchImpl: typeof fetch = fetch,
): Promise<DeliveryResult> {
  const payload: Record<string, unknown> = {
    from: `RE/MAX Collection Vintage <${cfg.from}>`,
    to: [cfg.to],
    subject: email.subject,
    html: email.html,
    text: email.text,
  };
  const replyTo = deriveReplyTo(lead);
  if (replyTo) payload.reply_to = replyTo;

  let res: Response;
  try {
    res = await fetchImpl('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cfg.apiKey}`,
        'Idempotency-Key': `lead-${lead.submissionId}`,
      },
      body: JSON.stringify(payload),
    });
  } catch {
    return { ok: false, status: 0 };
  }

  let data: unknown = {};
  try {
    data = await res.json();
  } catch {
    /* Resend may return an empty body on some statuses; ignore. */
  }
  const id =
    data && typeof data === 'object' && typeof (data as { id?: unknown }).id === 'string'
      ? (data as { id: string }).id
      : undefined;
  return { ok: res.ok, id, status: res.status };
}
