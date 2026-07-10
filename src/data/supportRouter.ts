// ============================================================
// Conversational router for the Collection Vintage assistant.
//
// The chat used to be a rigid state machine: whatever the user typed at a
// "free" flow step (zone / typology / budget) was stored verbatim as the
// answer, so a question typed mid-flow ("quem são vocês?") was swallowed and
// the flow marched on. This module re-classifies EVERY message against the
// current context so the controller can decide what to actually do:
//
//   intent detection → context decision (here) → state update → response.
//
// It is pure and dependency-light (no DOM, no timers) so the 12 mandatory
// conversation cases can be unit-tested directly.
// ============================================================
import { detectIntent, normalize, searchFaq, type IntentId } from './supportIntents';
import { flows, validateAnswer, type FlowId } from './supportResponses';

// ---------- Slots the assistant can read out of free text ----------
export interface Slots {
  objective?: FlowId; // comprar / vender / alugar / avaliacao / visita / carreira
  zone?: string; // canonical zone label
  typology?: string; // e.g. "T3", "Moradia"
  budget?: string; // raw budget phrase
}

const INTENT_TO_FLOW: Partial<Record<IntentId, FlowId>> = {
  comprar: 'comprar',
  vender: 'vender',
  alugar: 'alugar',
  avaliacao: 'avaliacao',
  pedir_avaliacao: 'avaliacao',
  visita: 'visita',
  carreiras: 'carreira',
};

// Canonical zone labels (match the chips offered in the flows).
const ZONES: Array<[RegExp, string]> = [
  [/\bfoz\b/, 'Foz do Douro'],
  [/\bboavista\b/, 'Boavista'],
  [/\bribeira\b/, 'Ribeira'],
  [/\bcedofeita\b/, 'Cedofeita'],
  [/\bnevogilde\b/, 'Nevogilde'],
  [/\blordelo\b/, 'Lordelo do Ouro'],
  [/\bbonfim\b/, 'Bonfim'],
  [/\b(baixa|aliados)\b/, 'Baixa & Aliados'],
];

// Specific zone/type intents that ARE a slot value (not a stand-alone question).
const ZONE_INTENTS = new Set<IntentId>([
  'zona_foz', 'zona_boavista', 'zona_ribeira', 'zona_cedofeita',
  'zona_nevogilde', 'zona_lordelo', 'zona_bonfim', 'zona_baixa',
]);
const TYPE_INTENTS = new Set<IntentId>(['tipo_moradia', 'tipo_apartamento', 'tipo_t1_t2', 'tipo_t3_t4']);

export type StepExpectation = 'zone' | 'typology' | 'budget' | 'name' | 'contact' | 'free';

export function stepExpectation(key: string | undefined): StepExpectation {
  if (!key) return 'free';
  if (/zona/i.test(key)) return 'zone';
  if (/tipologia|tipo de/i.test(key)) return 'typology';
  if (/orçamento|orcamento/i.test(key)) return 'budget';
  if (key === 'Nome') return 'name';
  if (key === 'Contacto') return 'contact';
  return 'free';
}

// Returns the zone mentioned LAST in the text — a correction ("não é Foz, é
// Boavista") puts the intended value at the end.
export function extractZone(text: string): string | undefined {
  const n = normalize(text);
  let best: string | undefined;
  let bestIdx = -1;
  for (const [re, label] of ZONES) {
    const m = n.match(re);
    if (m && m.index !== undefined && m.index > bestIdx) {
      bestIdx = m.index;
      best = label;
    }
  }
  return best;
}

// Returns the typology mentioned LAST ("não é T2, é T3" → T3). Reads the raw
// (lowercased) text so the trailing "+" of T5+/T6+ survives (normalize strips it).
export function extractTypology(text: string): string | undefined {
  const raw = text.toLowerCase();
  const matches = [...raw.matchAll(/\bt([0-6])(\+)?/g)];
  if (matches.length) {
    const m = matches[matches.length - 1];
    return `T${m[1]}${m[2] ? '+' : ''}`;
  }
  const n = normalize(text);
  if (/\bmoradia\b/.test(n)) return 'Moradia';
  if (/\bapartamento\b/.test(n)) return 'Apartamento';
  return undefined;
}

export function extractBudget(text: string): string | undefined {
  const n = normalize(text);
  const lower = text.toLowerCase();
  // With an explicit scale/currency marker, any number reads as a budget.
  if (/\d/.test(text) && /(mil|milhao|milhoes|milhão|milhões|\bk\b|euro|euros|€)/.test(lower)) {
    return text.trim();
  }
  if (/\b(flexivel|indiferente|sem limite|nao sei|em aberto)\b/.test(n)) return text.trim();
  // A number reads as a budget when some digit group is 5–7 digits (100k–9.99M).
  // A 9-digit phone number has no 5–7-digit group, so it is never a budget.
  const runs = (text.match(/\d[\d.\s]*\d|\d/g) ?? []).map((s) => s.replace(/[^\d]/g, ''));
  if (runs.some((r) => r.length >= 5 && r.length <= 7)) return text.trim();
  return undefined;
}

export function detectObjective(text: string): FlowId | undefined {
  const intent = detectIntent(text);
  return intent ? INTENT_TO_FLOW[intent] : undefined;
}

export function extractSlots(text: string): Slots {
  return {
    objective: detectObjective(text),
    zone: extractZone(text),
    typology: extractTypology(text),
    budget: extractBudget(text),
  };
}

// ---------- Navigation / meta commands (work anywhere) ----------
export type NavCommand = 'cancel' | 'restart' | 'back' | 'human';

export function detectNav(text: string): NavCommand | null {
  const n = ` ${normalize(text)} `;
  const has = (re: RegExp) => re.test(n);
  // Human hand-off — highest intent to escalate.
  if (has(/\b(falar|contactar|contacto)\b.*\b(pessoa|humano|humana|consultor|consultora|equipa|alguem|agente)\b/) ||
      has(/\b(pessoa real|ser humano|atendimento humano|talk to (someone|a person|the team)|speak (to|with))\b/) ||
      has(/\bhumano\b/) || has(/\bconsultor(a)?\b/)) {
    return 'human';
  }
  if (has(/\b(recomecar|recomeco|reiniciar|comecar de novo|do inicio|do principio|restart|start over)\b/)) return 'restart';
  if (has(/\b(voltar|volta|anterior|atras|pergunta anterior|retomar|retoma|continuar procura|back|previous|go back)\b/)) return 'back';
  if (has(/\b(cancelar|cancela|parar|para|desisto|desistir|esquece|esquecer|deixa|nao quero continuar|stop|cancel|quit|nevermind)\b/)) return 'cancel';
  return null;
}

// "não quero responder a isso" / "prefiro não dizer"
export function isDecline(text: string): boolean {
  const n = normalize(text);
  return /\b(nao quero responder|prefiro nao responder|prefiro nao dizer|nao quero dizer|nao respondo|nao vou responder|prefiro nao|dont want to answer|rather not)\b/.test(n);
}

// "não percebi" / "isso não responde à minha pergunta"
export function isClarify(text: string): boolean {
  const n = normalize(text);
  return /\b(nao percebi|nao entendi|nao compreendi|isso nao responde|nao e isso|nao respondeu|nao era isso|didnt understand|that doesnt answer|not what i asked)\b/.test(n);
}

// Correction markers that reframe a previous slot.
const CORRECTION_MARKER = /\b(afinal|na verdade|antes|prefiro|melhor|mudei de ideia|mudei de ideias|corrig|nao e |nao era |em vez)\b/;
export function hasCorrectionMarker(text: string): boolean {
  return CORRECTION_MARKER.test(normalize(text));
}

// ---------- Full classification ----------
export interface ClassifyCtx {
  inFlow: boolean;
  flowId?: FlowId;
  stepKey?: string;
  /** Keys already collected in the current flow (for correction detection). */
  answeredKeys?: string[];
}

export type Classification =
  | { kind: 'nav'; command: NavCommand }
  | { kind: 'decline' }
  | { kind: 'clarify' }
  | { kind: 'switch'; objective: FlowId; slots: Slots }
  | { kind: 'correction'; slots: Slots }
  | { kind: 'answer' }
  | { kind: 'question'; intent: IntentId | null; slots: Slots }
  | { kind: 'ambiguous' };

function isSlotIntent(intent: IntentId | null, expected: StepExpectation): boolean {
  if (!intent) return false;
  if (expected === 'zone') return ZONE_INTENTS.has(intent);
  if (expected === 'typology') return TYPE_INTENTS.has(intent);
  return false;
}

function fitsStep(expected: StepExpectation, text: string, slots: Slots): boolean {
  const n = normalize(text);
  switch (expected) {
    case 'zone':
      return !!slots.zone || /\boutra\b/.test(n);
    case 'typology':
      return !!slots.typology;
    case 'budget':
      return !!slots.budget;
    case 'name':
    case 'contact':
      return validateAnswer(expected === 'name' ? 'Nome' : 'Contacto', text).ok;
    case 'free':
      return true;
  }
}

export function classifyMessage(text: string, ctx: ClassifyCtx): Classification {
  const raw = text.trim();
  const hasQuestion = /\?/.test(raw);

  // 1. Navigation / hand-off — always wins.
  const nav = detectNav(raw);
  if (nav) return { kind: 'nav', command: nav };

  // 2/3. Decline / clarify.
  if (isDecline(raw)) return { kind: 'decline' };
  if (isClarify(raw)) return { kind: 'clarify' };

  const slots = extractSlots(raw);
  const marker = hasCorrectionMarker(raw);

  // 4. Objective switch (mid-flow, to a different objective).
  if (ctx.inFlow && slots.objective && slots.objective !== ctx.flowId) {
    return { kind: 'switch', objective: slots.objective, slots };
  }
  // A standalone "afinal quero arrendar" outside a flow also switches.
  if (!ctx.inFlow && slots.objective && marker) {
    return { kind: 'switch', objective: slots.objective, slots };
  }

  if (ctx.inFlow) {
    const expected = stepExpectation(ctx.stepKey);
    const intent = detectIntent(raw);

    // 5. Correction: a marker, or a slot value that belongs to a DIFFERENT step
    //    than the one being asked (e.g. "prefiro Foz" while at the typology step).
    const otherSlot =
      (!!slots.zone && expected !== 'zone') ||
      (!!slots.typology && expected !== 'typology') ||
      (!!slots.budget && expected !== 'budget');
    if ((marker || otherSlot) && (slots.zone || slots.typology || slots.budget)) {
      return { kind: 'correction', slots };
    }

    // 6. Answer: fits the current step and is not a stand-alone question.
    const clearlyQuestion = hasQuestion || (!!intent && !isSlotIntent(intent, expected) && !fitsStep(expected, raw, slots));
    if (!clearlyQuestion && fitsStep(expected, raw, slots)) {
      return { kind: 'answer' };
    }

    // 7. Question / interruption.
    if (intent || hasQuestion || searchFaq(raw)) return { kind: 'question', intent, slots };
    return { kind: 'ambiguous' };
  }

  // Not in a flow → a fresh question / intent (may start a flow).
  return { kind: 'question', intent: detectIntent(raw), slots };
}

// Map a Slots object onto a flow's step keys (used to pre-fill from free text).
export function slotsToAnswers(flowId: FlowId, slots: Slots): Record<string, string> {
  const out: Record<string, string> = {};
  for (const step of flows[flowId].steps) {
    const exp = stepExpectation(step.key);
    if (exp === 'zone' && slots.zone) out[step.key] = slots.zone;
    if (exp === 'typology' && slots.typology) out[step.key] = slots.typology;
    if (exp === 'budget' && slots.budget) out[step.key] = slots.budget;
  }
  return out;
}
