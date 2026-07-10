import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  classifyMessage,
  extractSlots,
  extractZone,
  extractTypology,
  slotsToAnswers,
  stepExpectation,
  type ClassifyCtx,
} from '../src/data/supportRouter.ts';

// Context helpers matching the real flow step keys.
const buying = (stepKey: string): ClassifyCtx => ({ inFlow: true, flowId: 'comprar', stepKey });
const idle: ClassifyCtx = { inFlow: false };

// ---- The critical bug: a question at a free step must NOT be an answer ----
test('CRITICAL: "quem são vocês?" at the zone step is a question, not an answer', () => {
  const c = classifyMessage('quem são vocês?', buying('Zona pretendida'));
  assert.equal(c.kind, 'question');
  if (c.kind === 'question') assert.equal(c.intent, 'empresa');
});

test('a real zone value at the zone step IS an answer', () => {
  assert.equal(classifyMessage('Foz', buying('Zona pretendida')).kind, 'answer');
  assert.equal(classifyMessage('quero na Boavista', buying('Zona pretendida')).kind, 'answer');
});

test('a typology at the typology step IS an answer', () => {
  assert.equal(classifyMessage('T3', buying('Tipologia')).kind, 'answer');
});

test('a name at the name step IS an answer; a question is not', () => {
  assert.equal(classifyMessage('João Silva', buying('Nome')).kind, 'answer');
  assert.equal(classifyMessage('e vocês quem são?', buying('Nome')).kind, 'question');
});

test('a 9-digit phone at the contact step is an answer, not a budget correction', () => {
  assert.equal(classifyMessage('912000000', buying('Contacto')).kind, 'answer');
  assert.equal(classifyMessage('geral@exemplo.pt', buying('Contacto')).kind, 'answer');
  // a real budget with a marker at the budget step still works
  assert.equal(classifyMessage('500 mil', buying('Orçamento')).kind, 'answer');
  assert.equal(classifyMessage('cerca de 600000', buying('Orçamento')).kind, 'answer');
});

// ---- 12 mandatory cases ----
test('case 1 — interrupt with "quem são vocês?" during property search', () => {
  const c = classifyMessage('quem são vocês?', buying('Zona pretendida'));
  assert.equal(c.kind, 'question');
});

test('case 2 — "afinal quero arrendar" during a buy flow switches objective', () => {
  const c = classifyMessage('afinal quero arrendar', buying('Tipologia'));
  assert.equal(c.kind, 'switch');
  if (c.kind === 'switch') assert.equal(c.objective, 'alugar');
});

test('case 3 — "não quero responder a isso" is a decline', () => {
  assert.equal(classifyMessage('não quero responder a isso', buying('Contacto')).kind, 'decline');
});

test('case 4 — "voltar à pergunta anterior" is nav back', () => {
  const c = classifyMessage('voltar à pergunta anterior', buying('Tipologia'));
  assert.equal(c.kind, 'nav');
  if (c.kind === 'nav') assert.equal(c.command, 'back');
});

test('case 5 — "quero falar com uma pessoa" is nav human', () => {
  const c = classifyMessage('quero falar com uma pessoa', buying('Zona pretendida'));
  assert.equal(c.kind, 'nav');
  if (c.kind === 'nav') assert.equal(c.command, 'human');
});

// cases 6 & 7 (rapid messages / message during generation) are concurrency
// behaviours handled by the controller's turnId guard — see the component.

test('case 8 — "não é T2, é T3" is a correction to T3', () => {
  const c = classifyMessage('não é T2, é T3', buying('Nome'));
  assert.equal(c.kind, 'correction');
  if (c.kind === 'correction') assert.equal(c.slots.typology, 'T3');
});

test('case 9 — an unexpected question mid-flow is a question', () => {
  const c = classifyMessage('que zonas têm?', buying('Orçamento'));
  assert.equal(c.kind, 'question');
});

test('case 10 — "retomar" is nav back (resume)', () => {
  const c = classifyMessage('retomar', { inFlow: false });
  assert.equal(c.kind, 'nav');
  if (c.kind === 'nav') assert.equal(c.command, 'back');
});

test('case 11 — "cancelar" is nav cancel', () => {
  const c = classifyMessage('cancelar', buying('Nome'));
  assert.equal(c.kind, 'nav');
  if (c.kind === 'nav') assert.equal(c.command, 'cancel');
});

test('case 12 — free text with zone + typology + budget is parsed', () => {
  const slots = extractSlots('quero comprar um T3 na Foz até 500 mil');
  assert.equal(slots.objective, 'comprar');
  assert.equal(slots.zone, 'Foz do Douro');
  assert.equal(slots.typology, 'T3');
  assert.ok(slots.budget && /500/.test(slots.budget));
  // and it maps onto the comprar flow's step keys
  const answers = slotsToAnswers('comprar', slots);
  assert.equal(answers['Zona pretendida'], 'Foz do Douro');
  assert.equal(answers['Tipologia'], 'T3');
});

// ---- extraction unit checks ----
test('extractZone prefers the last zone mentioned (correction)', () => {
  assert.equal(extractZone('não é Foz, é Boavista'), 'Boavista');
  assert.equal(extractZone('prefiro Foz'), 'Foz do Douro');
});

test('extractTypology prefers the last typology mentioned', () => {
  assert.equal(extractTypology('não é T2, é T3'), 'T3');
  assert.equal(extractTypology('uma moradia'), 'Moradia');
  assert.equal(extractTypology('T5+'), 'T5+');
});

test('stepExpectation maps step keys to slot kinds', () => {
  assert.equal(stepExpectation('Zona pretendida'), 'zone');
  assert.equal(stepExpectation('Tipologia'), 'typology');
  assert.equal(stepExpectation('Tipo de imóvel'), 'typology');
  assert.equal(stepExpectation('Orçamento'), 'budget');
  assert.equal(stepExpectation('Nome'), 'name');
  assert.equal(stepExpectation('Contacto'), 'contact');
  assert.equal(stepExpectation('Prazo'), 'free');
});

test('correction with a zone while at a different step', () => {
  const c = classifyMessage('afinal prefiro Foz', buying('Tipologia'));
  assert.equal(c.kind, 'correction');
  if (c.kind === 'correction') assert.equal(c.slots.zone, 'Foz do Douro');
});

test('idle question maps to a flow objective for prefill', () => {
  const c = classifyMessage('quero comprar', idle);
  assert.equal(c.kind, 'question');
  if (c.kind === 'question') assert.equal(c.slots.objective, 'comprar');
});

const visiting = (stepKey: string): ClassifyCtx => ({ inFlow: true, flowId: 'visita', stepKey });

test('a non-property question at a FREE step is a question, not swallowed', () => {
  assert.equal(classifyMessage('quem são vocês', visiting('Imóvel de interesse')).kind, 'question');
  assert.equal(classifyMessage('quais os vossos contactos', visiting('Imóvel de interesse')).kind, 'question');
});

test('a property description at a FREE step is a valid answer', () => {
  assert.equal(classifyMessage('a moradia na Foz', visiting('Imóvel de interesse')).kind, 'answer');
  assert.equal(classifyMessage('CV-1042', visiting('Imóvel de interesse')).kind, 'answer');
});

test('budget with a k suffix is recognised', () => {
  assert.ok(extractSlots('around 800k').budget);
  assert.ok(extractSlots('até 500 k').budget);
  assert.equal(classifyMessage('around 800k', buying('Orçamento')).kind, 'answer');
});
