// ============================================================
// Response engine for the Collection Vintage assistant.
//
// Turns a detected intent (or a direct FAQ hit) into a BotReply: a short,
// premium PT-PT message plus optional quick-reply chips, a CTA and/or a
// lead-capture flow to start. All copy is grounded in supportKnowledge.ts —
// nothing invented. When no reliable answer exists, returns the mandatory
// fallback that routes the visitor to the human team.
// ============================================================
import {
  assistant,
  contacts,
  zonas,
  services,
  processes,
  company,
  careers,
  team,
  blog,
  fallbackMessage,
  leadClosing,
} from './supportKnowledge';
import { detectIntent, searchFaq, type IntentId } from './supportIntents';

export interface Chip {
  label: string;
  /** Re-send this text through the engine (simulates the user typing it). */
  send?: string;
  /** Start a lead-capture flow by id. */
  flow?: FlowId;
  /** Navigate to a URL. */
  href?: string;
  external?: boolean;
}

export interface BotReply {
  text: string;
  chips?: Chip[];
  cta?: { label: string; href: string; external?: boolean };
  /** When set, the controller starts this lead-capture flow after the message. */
  flow?: FlowId;
}

export type FlowId = 'vender' | 'comprar' | 'alugar' | 'avaliacao' | 'visita' | 'carreira';

export interface FlowStep {
  key: string;
  question: string;
  chips?: string[];
}

export interface LeadFlow {
  id: FlowId;
  objective: string;
  intro: string;
  steps: FlowStep[];
}

const ZONA_CHIPS = ['Foz do Douro', 'Boavista', 'Ribeira', 'Cedofeita', 'Outra zona'];
const TIPO_CHIPS = ['T1', 'T2', 'T3', 'T4', 'Moradia', 'Outra'];

// ---------- Lead-capture flows ----------
export const flows: Record<FlowId, LeadFlow> = {
  vender: {
    id: 'vender',
    objective: 'Vender imóvel',
    intro: 'Com todo o gosto. Faço-lhe algumas perguntas rápidas para a equipa o poder ajudar melhor.',
    steps: [
      { key: 'Zona do imóvel', question: 'Em que zona fica o imóvel?', chips: ZONA_CHIPS },
      { key: 'Tipologia', question: 'Que tipo de imóvel é?', chips: TIPO_CHIPS },
      { key: 'Nome', question: 'Como se chama?' },
      { key: 'Contacto', question: 'Qual a melhor forma de o contactarmos? (telefone ou email)' },
    ],
  },
  comprar: {
    id: 'comprar',
    objective: 'Comprar imóvel',
    intro: 'Excelente. Para encontrarmos o imóvel certo, deixe-me perceber o que procura.',
    steps: [
      { key: 'Zona pretendida', question: 'Em que zona do Porto gostaria de comprar?', chips: ZONA_CHIPS },
      { key: 'Tipologia', question: 'Que tipologia procura?', chips: TIPO_CHIPS },
      { key: 'Orçamento', question: 'Tem um orçamento de referência? (pode indicar um intervalo)' },
      { key: 'Nome', question: 'Como se chama?' },
      { key: 'Contacto', question: 'Qual a melhor forma de o contactarmos? (telefone ou email)' },
    ],
  },
  alugar: {
    id: 'alugar',
    objective: 'Arrendar imóvel',
    intro: 'Com certeza. Algumas perguntas rápidas para o ajudarmos a arrendar.',
    steps: [
      { key: 'Zona pretendida', question: 'Em que zona procura arrendar?', chips: ZONA_CHIPS },
      { key: 'Tipo de imóvel', question: 'Que tipo de imóvel procura?', chips: TIPO_CHIPS },
      { key: 'Prazo', question: 'Para quando precisa?', chips: ['Imediato', '1–3 meses', '3–6 meses', 'Flexível'] },
      { key: 'Nome', question: 'Como se chama?' },
      { key: 'Contacto', question: 'Qual a melhor forma de o contactarmos? (telefone ou email)' },
    ],
  },
  avaliacao: {
    id: 'avaliacao',
    objective: 'Pedido de avaliação',
    intro: 'A avaliação é confidencial e sem compromisso. Preciso só de alguns dados.',
    steps: [
      { key: 'Zona do imóvel', question: 'Em que zona fica o imóvel a avaliar?', chips: ZONA_CHIPS },
      { key: 'Tipologia', question: 'Que tipo de imóvel é?', chips: TIPO_CHIPS },
      { key: 'Nome', question: 'Como se chama?' },
      { key: 'Contacto', question: 'Qual a melhor forma de o contactarmos? (telefone ou email)' },
    ],
  },
  visita: {
    id: 'visita',
    objective: 'Marcar visita',
    intro: 'As visitas são sem compromisso e com total discrição. Vamos tratar disso.',
    steps: [
      { key: 'Imóvel de interesse', question: 'Qual o imóvel ou zona de interesse? (pode indicar a referência, ex.: CV-1042)' },
      { key: 'Nome', question: 'Como se chama?' },
      { key: 'Contacto', question: 'Qual o seu telefone ou email para confirmarmos a visita?' },
    ],
  },
  carreira: {
    id: 'carreira',
    objective: 'Carreira / candidatura',
    intro: 'Que bom ter o seu interesse. Deixe-me recolher alguns dados para a equipa de recrutamento.',
    steps: [
      { key: 'Área de interesse', question: 'Em que área gostaria de trabalhar?', chips: ['Área Comercial', 'Liderança Comercial', 'Marketing & Comunicação', 'Gestão de Clientes', 'Outra'] },
      { key: 'Nome', question: 'Como se chama?' },
      { key: 'Contacto', question: 'Qual a melhor forma de o contactarmos? (telefone ou email)' },
    ],
  },
};

// ---------- Reusable chip sets ----------
const NAV_CHIPS: Chip[] = [
  { label: 'Comprar', flow: 'comprar' },
  { label: 'Vender', flow: 'vender' },
  { label: 'Avaliação', flow: 'avaliacao' },
  { label: 'Contactos', send: 'contactos' },
];

const humanChips: Chip[] = [
  { label: 'WhatsApp', href: contacts.whatsappHref, external: true },
  { label: 'Ligar', href: contacts.phoneHref },
  { label: 'Enviar email', href: contacts.emailHref },
  { label: 'Página de contacto', href: '/contacto' },
];

function list(items: string[]): string {
  return items.map((s) => `• ${s}`).join('\n');
}

// ---------- Intent → reply ----------
function replyFor(intent: IntentId): BotReply {
  switch (intent) {
    case 'saudacao':
      return { text: 'Olá! Em que posso ajudar hoje — comprar, vender, arrendar ou avaliar um imóvel?', chips: NAV_CHIPS };

    case 'agradecimento':
      return { text: 'Ao seu dispor. Se precisar de mais alguma coisa, estou aqui.', chips: NAV_CHIPS };

    case 'vender':
      return {
        text: 'Apresentamos o seu imóvel ao mercado com estratégia, discrição e o posicionamento certo. O primeiro passo é uma avaliação confidencial e sem compromisso. Quer avançar?',
        flow: 'vender',
        cta: { label: 'Pedir avaliação', href: '/#vender' },
      };

    case 'comprar':
      return {
        text: 'Acompanhamo-lo em todo o processo de compra — seleção de imóveis distintos, visitas qualificadas e negociação. Posso ajudá-lo a encontrar o imóvel certo.',
        flow: 'comprar',
        cta: { label: 'Ver imóveis', href: '/imoveis' },
      };

    case 'alugar':
      return {
        text: 'Fazemos arrendamento de imóveis premium, com seleção criteriosa e acompanhamento dedicado. Diga-me o que procura.',
        flow: 'alugar',
        cta: { label: 'Imóveis para arrendar', href: '/alugar' },
      };

    case 'avaliacao':
      return {
        text: 'A nossa avaliação é uma análise estratégica confidencial e sem compromisso. Inclui:\n' + list(processes.avaliacao) + '\n\nNão é apenas um número — é uma visão do potencial real do seu imóvel.',
        flow: 'avaliacao',
        cta: { label: 'Pedir avaliação', href: '/#vender' },
      };

    case 'pedir_avaliacao':
      return {
        text: 'Posso tratar já do seu pedido de avaliação — é gratuito e sem compromisso. Avançamos?',
        flow: 'avaliacao',
        cta: { label: 'Pedir avaliação', href: '/#vender' },
      };

    case 'visita':
      return {
        text: 'As visitas são sem compromisso e organizadas com total discrição. Posso ajudá-lo a marcar.',
        flow: 'visita',
      };

    case 'contacto':
      return {
        text: `Pode falar connosco por:\n• Telefone: ${contacts.phone}\n• Email: ${contacts.email}\n• WhatsApp (resposta imediata)\n\nRespondemos normalmente em 24h.`,
        chips: humanChips,
      };

    case 'localizacao':
      return {
        text: `Estamos no ${contacts.city}.\n• Morada: ${contacts.address}\n• Horário: ${contacts.hours}\n\nAs visitas ao escritório são com marcação prévia.`,
        chips: [{ label: 'Ver no mapa', href: contacts.mapsHref, external: true }, ...NAV_CHIPS.slice(0, 2)],
      };

    case 'horario':
      return {
        text: `O nosso horário é ${contacts.hours}. Fora deste horário pode deixar mensagem por email ou WhatsApp e respondemos assim que possível.`,
        chips: humanChips,
      };

    case 'zonas':
      return {
        text: 'Somos especialistas em zonas de carácter no Porto:\n' + zonas.map((z) => `• ${z.name} — ${z.blurb}`).join('\n'),
        cta: { label: 'Explorar zonas', href: '/#zonas' },
        chips: zonas.map((z) => ({ label: z.name, href: z.href })),
      };

    case 'imoveis':
      return {
        text: 'Temos uma seleção criteriosa de imóveis distintos no Porto — apartamentos, moradias e imóveis com história. Veja o catálogo atual e filtre por zona, tipologia ou preço.',
        cta: { label: 'Ver imóveis', href: '/imoveis' },
        chips: [{ label: 'Comprar', flow: 'comprar' }, { label: 'Arrendar', flow: 'alugar' }, { label: 'Marcar visita', flow: 'visita' }],
      };

    case 'processo_compra':
      return {
        text: 'O processo de compra connosco:\n' + list(processes.compra),
        cta: { label: 'Ver imóveis', href: '/imoveis' },
        chips: [{ label: 'Quero comprar', flow: 'comprar' }],
      };

    case 'processo_venda':
      return {
        text: 'O nosso método de venda, passo a passo:\n' + list(processes.venda),
        cta: { label: 'Pedir avaliação', href: '/#vender' },
        chips: [{ label: 'Quero vender', flow: 'vender' }],
      };

    case 'processo_arrendamento':
      return {
        text: 'No arrendamento garantimos:\n' + list(processes.arrendamento),
        cta: { label: 'Imóveis para arrendar', href: '/alugar' },
        chips: [{ label: 'Quero arrendar', flow: 'alugar' }],
      };

    case 'servicos':
      return {
        text: 'Acompanhamos todo o ciclo do imóvel premium no Porto:\n' + services.map((s) => `• ${s.title} — ${s.text}`).join('\n'),
        chips: NAV_CHIPS,
      };

    case 'comissao':
      return {
        text: 'A comissão de mediação é paga pelo vendedor e apenas na conclusão da venda. Não há custos iniciais nem taxas de avaliação. Na primeira reunião explicamos tudo de forma clara e transparente.',
        cta: { label: 'Pedir avaliação', href: '/#vender' },
        chips: [{ label: 'Quero vender', flow: 'vender' }, { label: 'Falar com a equipa', send: 'falar com a equipa' }],
      };

    case 'documentos':
      return {
        text: 'Para iniciar a venda são geralmente necessários: caderneta predial, certidão de teor do registo predial, licença de utilização (imóveis posteriores a 1951), certificado energético e identificação do proprietário. A nossa equipa orienta-o em cada passo.',
        chips: [{ label: 'Quero vender', flow: 'vender' }, { label: 'Falar com a equipa', send: 'falar com a equipa' }],
      };

    case 'confidencialidade':
      return {
        text: 'Totalmente. Toda a informação partilhada connosco é tratada com total discrição e não é partilhada com terceiros sem autorização. O processo é confidencial desde a primeira conversa.',
        chips: NAV_CHIPS,
      };

    case 'blog':
      return { text: blog.text, cta: { label: 'Ver o blog', href: blog.href } };

    case 'carreiras':
      return {
        text: careers.text,
        cta: { label: 'Ver carreiras', href: careers.href },
        chips: [{ label: 'Candidatar-me', flow: 'carreira' }],
      };

    case 'equipa':
      return { text: team.text, cta: { label: 'Conhecer a equipa', href: team.href } };

    case 'empresa':
      return {
        text: company.about + ` Estamos presentes no Porto desde ${company.established}.`,
        chips: [{ label: 'Sobre nós', href: '/sobre-nos' }, { label: 'Reconhecimento', send: 'premios' }],
      };

    case 'reconhecimento':
      return { text: company.recognition, chips: [{ label: 'Sobre nós', href: '/sobre-nos' }] };

    case 'humano':
      return {
        text: 'Com certeza. Pode falar diretamente com a nossa equipa por aqui:',
        chips: humanChips,
      };

    default:
      return { text: fallbackMessage, chips: humanChips };
  }
}

// ---------- Public entry ----------
export function getReply(userText: string): BotReply {
  const intent = detectIntent(userText);

  // For broad/ambiguous intents, prefer a precise FAQ answer when one matches well.
  const preferFaq = !intent || intent === 'empresa' || intent === 'imoveis';
  if (preferFaq) {
    const faq = searchFaq(userText);
    if (faq) return { text: faq.a, chips: NAV_CHIPS };
  }

  if (intent) return replyFor(intent);

  // Nothing reliable → mandatory fallback to a human channel.
  return { text: fallbackMessage, chips: humanChips };
}

export function getWelcome(): BotReply {
  return { text: assistant.welcome };
}

// Compose a human-readable lead summary (used for the WhatsApp hand-off + recap).
export function composeLead(flowId: FlowId, answers: Record<string, string>): {
  lines: string[];
  closing: string;
  waHref: string;
} {
  const flow = flows[flowId];
  const lines = [`Objetivo: ${flow.objective}`];
  for (const step of flow.steps) {
    const v = answers[step.key];
    if (v) lines.push(`${step.key}: ${v}`);
  }
  const waText = `Olá, gostaria de avançar.\n\n${lines.join('\n')}`;
  const waHref = `${contacts.whatsappHref}?text=${encodeURIComponent(waText)}`;
  return { lines, closing: leadClosing, waHref };
}
