import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Source-only contract for the public footer. Reads the component text — no
// network, no browser, no build. `npm test` runs from the repo root, so
// process.cwd() is the stable anchor regardless of where esbuild emits the
// bundle.
//
// Why this exists: the mobile footer shipped four `#` social links, a `#`
// "Termos e Condições" and a `#` "Livro de Reclamações" (a legal obligation
// rendered as a dead link), and its copyright line omitted the legal entity
// and the AMI licence that the desktop line carried. This locks all of it.

const SRC = readFileSync(join(process.cwd(), 'src/components/Footer.astro'), 'utf8');

/** The component minus HTML/JS comments — what a visitor can actually reach. */
const RENDERED = SRC.replace(/<!--[\s\S]*?-->/g, '').replace(/^\s*\/\/.*$/gm, '');

const COMPLAINTS_URL = 'https://www.livroreclamacoes.pt/Inicio/';

test('footer: no dead placeholder links remain', () => {
  assert.equal(SRC.includes('href="#"'), false, 'Footer still contains href="#"');
});

test('footer: "Termos e Condições" is absent while no approved legal copy exists', () => {
  assert.equal(RENDERED.includes('Termos e Condições'), false);
});

test('footer: the official Livro de Reclamações URL is defined, over HTTPS', () => {
  assert.ok(SRC.includes(`'${COMPLAINTS_URL}'`), 'official URL constant missing');
  assert.ok(COMPLAINTS_URL.startsWith('https://'));
});

test('footer: Livro de Reclamações is linked in BOTH layouts', () => {
  const links = RENDERED.match(/href=\{COMPLAINTS_BOOK_URL\}/g) ?? [];
  assert.equal(links.length, 2, `expected 2 Livro de Reclamações links, found ${links.length}`);
});

test('footer: every external link opens safely in a new tab', () => {
  const externals = RENDERED.match(/<a\s+href=\{COMPLAINTS_BOOK_URL\}[^>]*>/g) ?? [];
  assert.equal(externals.length, 2);
  for (const anchor of externals) {
    assert.ok(anchor.includes('target="_blank"'), `missing target: ${anchor}`);
    assert.ok(anchor.includes('rel="noopener noreferrer"'), `missing rel: ${anchor}`);
  }
});

test('footer: Política de Privacidade stays in BOTH layouts', () => {
  const links = RENDERED.match(/href="\/privacidade"/g) ?? [];
  assert.equal(links.length, 2, `expected 2 privacy links, found ${links.length}`);
});

test('footer: the legal line is built from site.legalName', () => {
  assert.ok(/const legalLine =[\s\S]{0,240}\$\{site\.legalName\}/.test(SRC));
});

test('footer: the legal line is built from site.ami', () => {
  assert.ok(/const legalLine =[\s\S]{0,240}\$\{site\.ami\}/.test(SRC));
});

test('footer: desktop and mobile render the SAME legal line source', () => {
  const uses = RENDERED.match(/\{legalLine\}/g) ?? [];
  assert.equal(uses.length, 2, `expected legalLine in 2 layouts, found ${uses.length}`);
  assert.ok(RENDERED.includes('class="foot__copy">{legalLine}<'), 'desktop line not shared');
  assert.ok(RENDERED.includes('class="foot__mobile-copy">{legalLine}<'), 'mobile line not shared');
});

test('footer: no unconfirmed social profiles are linked', () => {
  for (const network of ['instagram', 'linkedin', 'facebook', 'youtube']) {
    assert.equal(
      new RegExp(network, 'i').test(RENDERED),
      false,
      `Footer references ${network} without a confirmed URL`
    );
  }
});

test('footer: no empty social wrapper is left behind', () => {
  assert.equal(SRC.includes('foot__mobile-social'), false, 'orphan social markup or CSS');
});

test('footer: no unconfirmed business data was published', () => {
  // NIF/NIPC and an agency e-mail are NOT confirmed — they must not appear.
  assert.equal(/\bNIF\b|\bNIPC\b/i.test(RENDERED), false, 'unconfirmed NIF/NIPC published');
  assert.equal(/mailto:/i.test(RENDERED), false, 'unconfirmed e-mail published');
});
