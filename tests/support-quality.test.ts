import { test } from 'node:test';
import assert from 'node:assert/strict';

import { replyFor, getReply, getWelcome, flows, type Lang } from '../src/data/supportResponses.ts';
import { detectLang } from '../src/data/supportRouter.ts';
import { intents } from '../src/data/supportIntents.ts';
import { contacts } from '../src/data/supportKnowledge.ts';

const LANGS: Lang[] = ['pt', 'en'];
const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
const questionCount = (s: string) => (s.match(/\?/g) ?? []).length;

// Artificial / hype intros the brand must never open with.
const BANNED_INTRO = /^\s*(excelente|compreendo perfeitamente|fico feliz|que [óo]timo|claro que sim|maravilh|fant[áa]stico|perfect!|great!|awesome|absolutely!|i completely understand)/i;
// Fabricated-data markers (prices, invented stats, placeholders).
const FABRICATED = /(€\s*\d|\bR\$|\[inserir|\blorem\b)/i;

function everyReply(fn: (text: string, where: string, lang: Lang) => void) {
  for (const lang of LANGS) {
    fn(getWelcome(lang).text, 'welcome', lang);
    for (const intent of intents) {
      const r = replyFor(intent.id, lang);
      fn(r.text, `reply:${intent.id}`, lang);
    }
    for (const [id, flow] of Object.entries(flows)) {
      fn(flow.intro[lang], `flow:${id}:intro`, lang);
      for (const s of flow.steps) fn(s.question[lang], `flow:${id}:${s.key}`, lang);
    }
  }
}

test('every reply is concise (<= 45 words)', () => {
  everyReply((text, where) => {
    assert.ok(wordCount(text) <= 45, `${where} has ${wordCount(text)} words: "${text}"`);
  });
});

test('at most one question per reply', () => {
  everyReply((text, where) => {
    assert.ok(questionCount(text) <= 1, `${where} has ${questionCount(text)} questions: "${text}"`);
  });
});

test('no artificial / hype intros', () => {
  everyReply((text, where) => {
    assert.ok(!BANNED_INTRO.test(text), `${where} opens artificially: "${text}"`);
  });
});

test('no fabricated data (prices, stats, placeholders)', () => {
  everyReply((text, where) => {
    assert.ok(!FABRICATED.test(text), `${where} looks fabricated: "${text}"`);
  });
});

test('no phone number other than the real one appears in replies', () => {
  const realDigits = contacts.phone.replace(/\D/g, '');
  everyReply((text, where) => {
    for (const m of text.match(/\d[\d\s]{7,}\d/g) ?? []) {
      assert.equal(m.replace(/\D/g, ''), realDigits, `${where} contains a non-official number: "${m}"`);
    }
  });
});

test('flow step questions are actual questions with one prompt', () => {
  for (const flow of Object.values(flows)) {
    for (const s of flow.steps) {
      for (const lang of LANGS) assert.equal(questionCount(s.question[lang]), 1, `${flow.id}:${s.key} (${lang})`);
    }
  }
});

test('mid-conversation replies never open with a greeting', () => {
  const GREETING = /^\s*(bem-vindo|welcome\b|ol[áa]\b|hello\b|hi\b|hey\b)/i;
  for (const lang of LANGS) {
    for (const intent of intents) {
      if (intent.id === 'saudacao') continue; // the greeting intent may greet
      const r = replyFor(intent.id, lang);
      assert.ok(!GREETING.test(r.text), `reply:${intent.id} (${lang}) repeats a greeting: "${r.text}"`);
    }
    for (const flow of Object.values(flows)) {
      assert.ok(!GREETING.test(flow.intro[lang]), `flow:${flow.id} intro greets: "${flow.intro[lang]}"`);
    }
  }
});

test('quick-reply chips are capped at 4 useful options', () => {
  for (const lang of LANGS) {
    for (const intent of intents) {
      const r = replyFor(intent.id, lang);
      assert.ok((r.chips ?? []).length <= 4, `reply:${intent.id} (${lang}) has ${(r.chips ?? []).length} chips`);
    }
    for (const flow of Object.values(flows)) {
      for (const s of flow.steps) assert.ok((s.chips?.[lang] ?? []).length <= 4, `flow ${flow.id}:${s.key} chips`);
    }
  }
});

// ---- language ----
test('detectLang identifies EN and PT', () => {
  assert.equal(detectLang('I want to buy a house in Porto'), 'en');
  assert.equal(detectLang('Do you have apartments for rent?'), 'en');
  assert.equal(detectLang('quero comprar uma casa na Foz'), 'pt');
  assert.equal(detectLang('qual o vosso contacto?'), 'pt');
});

test('contact tokens never flip the language (an email is not "com")', () => {
  assert.equal(detectLang('john@example.com'), null);
  assert.equal(detectLang('912 345 678'), null);
  assert.equal(detectLang('+351 226 181 031'), null);
});

test('the assistant answers in the requested language', () => {
  const pt = getReply('quem são vocês', 'pt').text;
  const en = getReply('who are you', 'en').text;
  assert.match(pt, /Somos a RE\/MAX Collection Vintage/);
  assert.match(en, /RE\/MAX Collection Vintage/);
  assert.notEqual(pt, en);
  // English replies read as English (a common EN word appears; no PT-only word).
  assert.match(en, /\b(we|the|in|since|property|team)\b/i);
});

test('unknown questions fall back to a human hand-off (no invention)', () => {
  const r = getReply('qual a taxa de juro do banco central europeu amanhã', 'pt');
  assert.ok(!FABRICATED.test(r.text));
  assert.ok((r.chips ?? []).some((c) => c.href === contacts.phoneHref || c.href === '/contacto'));
});
