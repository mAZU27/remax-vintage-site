// i18n coverage checker — walks the built HTML exactly like src/i18n/apply.ts
// does in the browser (same skip rules, same attribute allow-list) and reports
// every visible PT string that has no EN entry in src/i18n/dict.ts.
//
// Usage: node scripts/i18n-coverage.mjs [--json]
// Run `npm run build` first so dist/client is fresh.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { parse } from 'parse5';
import { en } from '../src/i18n/dict.ts';
import { consultants } from '../src/data/team.ts';

// Run from the project root (the script may execute as an esbuild bundle, so
// import.meta.url is not a reliable anchor).
const DIST = join(process.cwd(), 'dist', 'client');

const SKIP_TAGS = new Set(['script', 'style', 'noscript', 'template', 'code', 'pre']);
const ATTRS = ['placeholder', 'title', 'aria-label', 'alt', 'content'];
// `content` is only meaningful on <meta name="description"> — filtered below.

// Strings that need no translation: numbers, prices, punctuation, bare
// proper nouns, emails/phones/urls.
const IGNORABLE = [
  /^[\d\s.,:;%€$+·–—\-\/()†*&#@!?'"’“”anº°|↗→←]+$/u,
  /^\S+@\S+$/,
  /^https?:/,
  /^\+?[\d\s]{7,}$/,
];
// Single capitalised words are mostly proper nouns — filtered unless --all.
if (!process.argv.includes('--all')) IGNORABLE.push(/^[A-ZÀ-Ü][\wÀ-ÿ'’.-]*$/);

// Reviewed and intentionally untranslated: brand names, people, addresses,
// awards that are already English, and strings identical in EN.
const ALLOW = new Set([
  // brand / partners
  'RE/MAX Collection Vintage', 'Collection Vintage', 'RE/MAX', 'RE/MAX Collection®', 'Collection®',
  'RE/MAX Collection · Porto', 'RE/MAX · ’26', 'MDS Finance / MaxFinance', 'Superbrands Portugal',
  // awards already in English
  'Best Tech Experience', 'Best Work Experience',
  'Best Tech Experience 2026 — RE/MAX Portugal', 'Best Work Experience 2026 — RE/MAX Portugal',
  'Superbrands Portugal 2026 — RE/MAX Portugal',
  'Consumer Award', 'Consumer Award · ’26', 'Of the Year', 'Of the Year · ’26',
  // places / addresses (kept as-is in EN)
  'Baixa & Aliados', 'Lordelo do Ouro & Massarelos', 'Porto, Portugal', '4100-000 Porto, Portugal',
  'Av. da Boavista 0000', 'Av. da Boavista 0000, 4100-000 Porto, Portugal', 'Av. da Boavista, Porto',
  'Vila Nova de Gaia', 'Matosinhos Sul', 'Parque da Cidade', 'Foz do Douro, Porto', 'Boavista, Porto',
  'Ribeira, Porto', 'Porto · Monumental', 'Porto · Serralves',
  // people (testimonials / team placeholders)
  'António V.', 'Teresa F.', 'Helena & Rui M.', 'Marta S.', 'Sónia Santos', 'André Pinto',
  'Beatriz Carvalho', 'Carla Soares', 'Inês Moura', 'Miguel Tavares', 'Beatriz L.',
  'Carolina & Miguel P.', 'Clara M.', 'Inês & Duarte C.', 'João R.', 'Luís M.', 'Pedro & Ana T.',
  'Tiago Ferreira', 'Ricardo Nunes', 'Sofia A.', 'Sofia Lemos',
  // identical in EN
  'Blog & Insights', 'premium', 'T5+', 'T6+', 'Insights · Collection Vintage',
  '📧 Email: collection@vintage.pt', 'Full-time',
]);
// Team member names are proper nouns — never translated (roster is data-driven).
for (const c of consultants) ALLOW.add(c.name);

const htmlFiles = [];
const walkDir = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walkDir(p);
    else if (name.endsWith('.html') && !p.includes('mobile-preview')) htmlFiles.push(p);
  }
};
walkDir(DIST);

const missing = new Map(); // string -> Set(pages)
const record = (text, page) => {
  const t = text.trim().replace(/\s+/g, ' ');
  if (!t) return;
  if (en[t] != null) return;
  if (ALLOW.has(t)) return;
  if (IGNORABLE.some((re) => re.test(t))) return;
  if (!missing.has(t)) missing.set(t, new Set());
  missing.get(t).add(page);
};

const hasAttr = (node, name) => node.attrs?.some((a) => a.name === name);
const getAttr = (node, name) => node.attrs?.find((a) => a.name === name)?.value;

const walk = (node, page, inBody) => {
  if (node.nodeName === '#text') {
    if (inBody) record(node.value, page);
    return;
  }
  if (node.tagName && SKIP_TAGS.has(node.tagName)) return;
  if (node.tagName && hasAttr(node, 'data-i18n-skip')) return;

  if (node.tagName === 'title') {
    // document.title is translated explicitly by applyTitle()
    for (const c of node.childNodes ?? []) if (c.value) record(c.value, page + ' <title>');
    return;
  }
  if (node.tagName && inBody) {
    for (const attr of ATTRS) {
      if (attr === 'content') continue;
      const v = getAttr(node, attr);
      if (v) record(v, page + ` [${attr}]`);
    }
  }
  if (node.tagName === 'meta' && getAttr(node, 'name') === 'description') {
    const v = getAttr(node, 'content');
    if (v) record(v, page + ' <meta desc>');
  }

  const nowInBody = inBody || node.tagName === 'body';
  for (const child of node.childNodes ?? []) walk(child, page, nowInBody);
};

for (const file of htmlFiles) {
  const page = '/' + relative(DIST, file).replace(/index\.html$/, '');
  const doc = parse(readFileSync(file, 'utf8'));
  walk(doc, page, false);
}

// ---------- Dynamic strings (support assistant + simulator) ----------
// The chat renders each reply line as its own text node (split on \n), so
// every possible line must have a dict entry for the MutationObserver to
// translate it in EN mode.
const { replyFor, getWelcome, flows, composeLead } = await import('../src/data/supportResponses.ts');
const { quickStart, fallbackMessage, leadClosing, assistant } = await import('../src/data/supportKnowledge.ts');
const { intents } = await import('../src/data/supportIntents.ts');
const { faqs } = await import('../src/data/faqs.ts');

const recordLines = (text, where) => {
  for (const line of String(text).split('\n')) record(line, where);
};
const recordReply = (reply, where) => {
  recordLines(reply.text, where);
  if (reply.cta) record(reply.cta.label, where);
  for (const c of reply.chips ?? []) record(c.label, where);
};

recordReply(getWelcome(), 'chat:welcome');
for (const q of quickStart) record(q.label, 'chat:quickstart');
for (const intent of intents) recordReply(replyFor(intent.id), `chat:${intent.id}`);
recordLines(fallbackMessage, 'chat:fallback');
recordLines(leadClosing, 'chat:leadClosing');
record(assistant.name, 'chat:header');
record(assistant.status, 'chat:header');
recordLines(assistant.humanNote, 'chat:humanNote');
for (const [id, flow] of Object.entries(flows)) {
  recordLines(flow.intro, `chat:flow:${id}`);
  record(`Objetivo: ${flow.objective}`, `chat:flow:${id}`);
  for (const s of flow.steps) {
    recordLines(s.question, `chat:flow:${id}`);
    for (const c of s.chips ?? []) record(c, `chat:flow:${id}`);
  }
  const lead = composeLead(id, {});
  recordLines(lead.closing, `chat:flow:${id}`);
}
for (const f of faqs) recordLines(f.a, 'chat:faq');
// Labels set via JS (buttons/aria-labels rewritten at runtime).
for (const s of [
  'Continuar', 'Ver a minha estimativa', 'Receber avaliação detalhada', 'Outra zona do Porto',
  'Enviar à equipa (WhatsApp)', 'Página de contacto',
  'Fechar assistente', 'Abrir assistente', 'Pausar prémios', 'Retomar prémios',
]) record(s, 'js:runtime-label');

const entries = [...missing.entries()].sort((a, b) => b[1].size - a[1].size || a[0].localeCompare(b[0]));

if (process.argv.includes('--json')) {
  console.log(JSON.stringify(entries.map(([text, pages]) => ({ text, pages: [...pages] })), null, 2));
} else {
  for (const [text, pages] of entries) {
    console.log(`[${pages.size}] ${text}`);
    if (pages.size <= 2) for (const p of pages) console.log(`      ${p}`);
  }
  console.log(`\n${entries.length} untranslated strings across ${htmlFiles.length} pages; dict has ${Object.keys(en).length} entries.`);
}
