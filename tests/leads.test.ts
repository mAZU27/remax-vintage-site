import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import {
  normalizeLead,
  buildLeadEmail,
  deliverViaResend,
  deriveReplyTo,
  escapeHtml,
  ALLOWED_FORMS,
  type NormalizedLead,
} from '../src/lib/leads.ts';
import { POST, GET } from '../src/pages/api/lead.ts';

const CTX = { referer: 'https://remaxcollectionvintage.pt/vender/', timestampIso: '2026-07-10T12:00:00.000Z' };
const UUID = '11111111-2222-4333-8444-555555555555';

function okLead(over: Record<string, unknown> = {}) {
  return {
    form: 'valuation-form',
    full_name: 'Ana Silva',
    email: 'ana@example.com',
    phone: '912345678',
    property_location: 'foz-do-douro',
    typology: 'T3',
    mensagem: 'Olá',
    submission_id: UUID,
    consent: { type: 'avaliacao_imovel', text_version: 'v1' },
    ...over,
  };
}

// ---------------- normalizeLead ----------------

test('allow-list has exactly the five legitimate forms', () => {
  assert.deepEqual(
    [...ALLOWED_FORMS].sort(),
    ['careers-application', 'chat-assistente', 'contacto', 'valuation-form', 'value-simulator'],
  );
});

test('unknown form is rejected', () => {
  const r = normalizeLead({ form: 'evil-form', consent: true });
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.error, 'unknown_form');
});

test('missing consent is rejected', () => {
  const r = normalizeLead(okLead({ consent: undefined }));
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.error, 'missing_consent');
});

test('invalid email on an email-required form is rejected', () => {
  const r = normalizeLead(okLead({ email: 'not-an-email' }));
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.error, 'invalid_email');
});

test('valid valuation lead normalizes, merges mensagem→message, keeps provided UUID', () => {
  const r = normalizeLead(okLead());
  assert.equal(r.ok, true);
  if (!r.ok) return;
  assert.equal(r.lead.form, 'valuation-form');
  assert.equal(r.lead.fullName, 'Ana Silva');
  assert.equal(r.lead.message, 'Olá');
  assert.equal(r.lead.submissionId, UUID);
  assert.equal(r.lead.consent.given, true);
  // property_location / typology land as extras
  const keys = r.lead.extra.map((e) => e.key);
  assert.ok(keys.includes('property_location'));
  assert.ok(keys.includes('typology'));
});

test('consent boolean true is accepted', () => {
  const r = normalizeLead(okLead({ consent: true }));
  assert.equal(r.ok, true);
});

test('chat lead: email optional, dynamic keys become extras', () => {
  const r = normalizeLead({
    form: 'chat-assistente',
    objetivo: 'Vender imóvel',
    'Zona do imóvel': 'Foz do Douro',
    Nome: 'João',
    Contacto: 'joao@example.com',
    consent: true,
  });
  assert.equal(r.ok, true);
  if (!r.ok) return;
  assert.equal(r.lead.email, ''); // no canonical email field
  const keys = r.lead.extra.map((e) => e.key);
  assert.ok(keys.includes('Zona do imóvel'));
  assert.ok(keys.includes('Contacto'));
});

test('invalid submission_id is replaced with a generated one', () => {
  const r = normalizeLead(okLead({ submission_id: 'nope' }));
  assert.equal(r.ok, true);
  if (!r.ok) return;
  assert.notEqual(r.lead.submissionId, 'nope');
  assert.ok(r.lead.submissionId.length > 8);
});

// ---------------- escaping / email ----------------

test('escapeHtml neutralizes markup', () => {
  assert.equal(escapeHtml('<script>&"\''), '&lt;script&gt;&amp;&quot;&#39;');
});

test('buildLeadEmail escapes user content (no raw script tag in html)', () => {
  const lead = (normalizeLead(okLead({ full_name: '<script>alert(1)</script>' })) as { lead: NormalizedLead }).lead;
  const email = buildLeadEmail(lead, CTX);
  assert.ok(!email.html.includes('<script>alert(1)</script>'));
  assert.ok(email.html.includes('&lt;script&gt;'));
  // text + subject include the timestamp and submission id
  assert.ok(email.text.includes('2026-07-10T12:00:00.000Z'));
  assert.ok(email.text.includes(UUID));
});

test('deriveReplyTo finds an address inside chat free-text', () => {
  const lead = (normalizeLead({ form: 'chat-assistente', Contacto: 'liga para joao@example.com', consent: true }) as { lead: NormalizedLead }).lead;
  assert.equal(deriveReplyTo(lead), 'joao@example.com');
});

// ---------------- deliverViaResend (mocked fetch) ----------------

test('deliverViaResend success sets Idempotency-Key, from, to, reply_to', async () => {
  const lead = (normalizeLead(okLead()) as { lead: NormalizedLead }).lead;
  const email = buildLeadEmail(lead, CTX);
  let captured: { url: string; init: RequestInit } | null = null;
  const mockFetch = (async (url: string, init: RequestInit) => {
    captured = { url, init };
    return new Response(JSON.stringify({ id: 're_abc123' }), { status: 200 });
  }) as unknown as typeof fetch;

  const r = await deliverViaResend(lead, email, { apiKey: 'rk_test', from: 'leads@notify.x.pt', to: 'agencia@x.pt' }, mockFetch);
  assert.equal(r.ok, true);
  assert.equal(r.id, 're_abc123');
  assert.ok(captured);
  const headers = captured!.init.headers as Record<string, string>;
  assert.equal(captured!.url, 'https://api.resend.com/emails');
  assert.equal(headers['Idempotency-Key'], `lead-${UUID}`);
  assert.equal(headers.Authorization, 'Bearer rk_test');
  const sent = JSON.parse(captured!.init.body as string);
  assert.equal(sent.from, 'RE/MAX Collection Vintage <leads@notify.x.pt>');
  assert.deepEqual(sent.to, ['agencia@x.pt']);
  assert.equal(sent.reply_to, 'ana@example.com');
});

test('deliverViaResend failure (422) reports not-ok', async () => {
  const lead = (normalizeLead(okLead()) as { lead: NormalizedLead }).lead;
  const email = buildLeadEmail(lead, CTX);
  const mockFetch = (async () => new Response(JSON.stringify({ name: 'validation_error' }), { status: 422 })) as unknown as typeof fetch;
  const r = await deliverViaResend(lead, email, { apiKey: 'rk', from: 'a@b.pt', to: 'c@d.pt' }, mockFetch);
  assert.equal(r.ok, false);
  assert.equal(r.status, 422);
});

test('deliverViaResend 409 (idempotency replay) is a deduplicated success', async () => {
  const lead = (normalizeLead(okLead()) as { lead: NormalizedLead }).lead;
  const email = buildLeadEmail(lead, CTX);
  const mockFetch = (async () => new Response(JSON.stringify({ name: 'idempotency_conflict' }), { status: 409 })) as unknown as typeof fetch;
  const r = await deliverViaResend(lead, email, { apiKey: 'rk', from: 'a@b.pt', to: 'c@d.pt' }, mockFetch);
  assert.equal(r.ok, true);
  assert.equal(r.deduplicated, true);
  assert.equal(r.status, 409);
});

test('deliverViaResend network throw is swallowed to not-ok', async () => {
  const lead = (normalizeLead(okLead()) as { lead: NormalizedLead }).lead;
  const email = buildLeadEmail(lead, CTX);
  const mockFetch = (async () => {
    throw new Error('network down');
  }) as unknown as typeof fetch;
  const r = await deliverViaResend(lead, email, { apiKey: 'rk', from: 'a@b.pt', to: 'c@d.pt' }, mockFetch);
  assert.equal(r.ok, false);
  assert.equal(r.status, 0);
});

test('idempotency key is stable across retries of the same submission', async () => {
  const lead = (normalizeLead(okLead()) as { lead: NormalizedLead }).lead;
  const email = buildLeadEmail(lead, CTX);
  const seen: string[] = [];
  const mockFetch = (async (_url: string, init: RequestInit) => {
    seen.push((init.headers as Record<string, string>)['Idempotency-Key']);
    return new Response(JSON.stringify({ id: 're_1' }), { status: 200 });
  }) as unknown as typeof fetch;
  await deliverViaResend(lead, email, { apiKey: 'rk', from: 'a@b.pt', to: 'c@d.pt' }, mockFetch);
  await deliverViaResend(lead, email, { apiKey: 'rk', from: 'a@b.pt', to: 'c@d.pt' }, mockFetch);
  assert.deepEqual(seen, [`lead-${UUID}`, `lead-${UUID}`]);
});

// ---------------- route (POST/GET) ----------------

const REAL_FETCH = globalThis.fetch;

beforeEach(() => {
  globalThis.fetch = REAL_FETCH;
  delete process.env.RESEND_API_KEY;
  delete process.env.LEAD_FROM_EMAIL;
  delete process.env.LEAD_RECIPIENT_EMAIL;
  delete process.env.NOVUS_INGEST_ENDPOINT;
  delete process.env.NOVUS_INGEST_TOKEN;
});

function req(body: string, headers: Record<string, string> = { 'content-type': 'application/json' }) {
  return new Request('https://remaxcollectionvintage.pt/api/lead', { method: 'POST', headers, body });
}
function configureResend() {
  process.env.RESEND_API_KEY = 'rk_test';
  process.env.LEAD_FROM_EMAIL = 'leads@notify.remaxcollectionvintage.pt';
  process.env.LEAD_RECIPIENT_EMAIL = 'agencia@remaxcollectionvintage.pt';
}

test('GET is 405', async () => {
  const res = await GET({} as never);
  assert.equal(res.status, 405);
});

test('non-JSON content-type is 415', async () => {
  const res = await POST({ request: req('{}', { 'content-type': 'text/plain' }) } as never);
  assert.equal(res.status, 415);
});

test('oversized body is 413', async () => {
  configureResend();
  const big = JSON.stringify({ form: 'contacto', consent: true, blob: 'x'.repeat(40 * 1024) });
  const res = await POST({ request: req(big) } as never);
  assert.equal(res.status, 413);
});

test('invalid JSON is 400', async () => {
  const res = await POST({ request: req('{not json') } as never);
  assert.equal(res.status, 400);
});

test('unknown form is 400', async () => {
  configureResend();
  const res = await POST({ request: req(JSON.stringify({ form: 'evil', consent: true })) } as never);
  assert.equal(res.status, 400);
  assert.equal((await res.json()).error, 'unknown_form');
});

test('missing consent is 422', async () => {
  configureResend();
  const res = await POST({ request: req(JSON.stringify(okLead({ consent: undefined }))) } as never);
  assert.equal(res.status, 422);
  assert.equal((await res.json()).error, 'missing_consent');
});

test('invalid email is 422', async () => {
  configureResend();
  const res = await POST({ request: req(JSON.stringify(okLead({ email: 'bad' }))) } as never);
  assert.equal(res.status, 422);
  assert.equal((await res.json()).error, 'invalid_email');
});

test('no configuration is 503 (never a fake success)', async () => {
  const res = await POST({ request: req(JSON.stringify(okLead())) } as never);
  assert.equal(res.status, 503);
  const body = await res.json();
  assert.equal(body.delivered, false);
  assert.equal(body.error, 'delivery_unavailable');
});

test('Resend success → 200 delivered:true with submission_id', async () => {
  configureResend();
  let hit = 0;
  globalThis.fetch = (async (url: string) => {
    hit++;
    assert.equal(url, 'https://api.resend.com/emails');
    return new Response(JSON.stringify({ id: 're_ok' }), { status: 200 });
  }) as unknown as typeof fetch;
  const res = await POST({ request: req(JSON.stringify(okLead())) } as never);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.delivered, true);
  assert.equal(body.received, true);
  assert.equal(body.submission_id, UUID);
  assert.equal(hit, 1);
});

test('Resend failure → 502 delivery_failed (no fake success)', async () => {
  configureResend();
  globalThis.fetch = (async () => new Response(JSON.stringify({ name: 'error' }), { status: 500 })) as unknown as typeof fetch;
  const res = await POST({ request: req(JSON.stringify(okLead())) } as never);
  assert.equal(res.status, 502);
  const body = await res.json();
  assert.equal(body.delivered, false);
  assert.equal(body.error, 'delivery_failed');
});

test('Resend 409 replay → 200 delivered:true deduplicated:true (retry after lost response)', async () => {
  configureResend();
  globalThis.fetch = (async () => new Response(JSON.stringify({ name: 'idempotency_conflict' }), { status: 409 })) as unknown as typeof fetch;
  const res = await POST({ request: req(JSON.stringify(okLead())) } as never);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.delivered, true);
  assert.equal(body.deduplicated, true);
});
