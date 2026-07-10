import { EXTERNAL_LISTINGS_URL } from '../lib/site.config';
// ============================================================
// Response engine for the Collection Vintage assistant.
//
// Turns a detected intent (or a direct FAQ hit) into a BotReply: a short,
// premium message plus optional quick-reply chips, a CTA and/or a lead-capture
// flow to start. Copy is bilingual (PT-PT / EN) so the assistant answers in the
// language the visitor is writing in. All copy is grounded in
// supportKnowledge.ts — nothing invented. When no reliable answer exists, it
// returns the mandatory fallback that routes the visitor to the human team.
//
// Tone rules: 1–3 sentences, one question per turn, no artificial intros
// ("Excelente!", "Compreendo perfeitamente"), no sales pressure, no repeated
// greetings. Internal step keys and the lead `objective` stay in PT — they are
// identifiers and the agency inbox is Portuguese.
// ============================================================
import {
  contacts,
  zonas,
  company,
  careers,
  team,
  blog,
  fallbackMessage,
  fallbackMessageEn,
  leadClosing,
} from './supportKnowledge';
import { detectIntent, searchFaq, type IntentId } from './supportIntents';

export type Lang = 'pt' | 'en';
type Bi = { pt: string; en: string };
/** Bilingual string literal. */
const L = (pt: string, en: string): Bi => ({ pt, en });

export interface Chip {
  label: string;
  /** Re-send this text through the engine (simulates the user typing it). */
  send?: string;
  /** Start a lead-capture flow by id. */
  flow?: FlowId;
  /** Navigate to a URL. */
  href?: string;
  external?: boolean;
  /** Consent-gate action before a chat lead is delivered. */
  consent?: 'send' | 'cancel' | 'retry';
  /** Conversational control action (resume/dismiss a suspended flow, etc.). */
  action?: 'resume' | 'dismiss' | 'human' | 'cancel' | 'restart';
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
  /** Internal identifier (stays PT — used by the router and the lead payload). */
  key: string;
  question: Bi;
  chips?: { pt: string[]; en: string[] };
}

export interface LeadFlow {
  id: FlowId;
  /** Internal objective label sent to the agency (stays PT). */
  objective: string;
  intro: Bi;
  steps: FlowStep[];
}

// Quick-reply chips (capped at 4 useful options; free text is always allowed).
const ZONA_CHIPS = { pt: ['Foz do Douro', 'Boavista', 'Ribeira', 'Outra zona'], en: ['Foz do Douro', 'Boavista', 'Ribeira', 'Other area'] };
const TIPO_CHIPS = { pt: ['T2', 'T3', 'Moradia', 'Outra'], en: ['T2', 'T3', 'House', 'Other'] };
const PRAZO_CHIPS = { pt: ['Imediato', '1–3 meses', '3–6 meses', 'Flexível'], en: ['Immediate', '1–3 months', '3–6 months', 'Flexible'] };
const AREA_CHIPS = {
  pt: ['Área Comercial', 'Marketing & Comunicação', 'Gestão de Clientes', 'Outra'],
  en: ['Sales', 'Marketing & Comms', 'Client Management', 'Other'],
};
const NOME_Q = L('Como se chama?', "What's your name?");
const CONTACTO_Q = L('Qual o melhor contacto — telefone ou email?', 'Best way to reach you — phone or email?');

// ---------- Lead-capture flows ----------
export const flows: Record<FlowId, LeadFlow> = {
  vender: {
    id: 'vender',
    objective: 'Vender imóvel',
    intro: L('Com todo o gosto — umas perguntas rápidas para a equipa o ajudar.', 'Of course — a few quick questions so the team can help you.'),
    steps: [
      { key: 'Zona do imóvel', question: L('Em que zona fica o imóvel?', 'Which area is the property in?'), chips: ZONA_CHIPS },
      { key: 'Tipologia', question: L('Que tipo de imóvel é?', 'What type of property is it?'), chips: TIPO_CHIPS },
      { key: 'Nome', question: NOME_Q },
      { key: 'Contacto', question: CONTACTO_Q },
    ],
  },
  comprar: {
    id: 'comprar',
    objective: 'Comprar imóvel',
    intro: L('Vamos encontrar o imóvel certo. Diga-me o que procura.', "Let's find the right property. Tell me what you're looking for."),
    steps: [
      { key: 'Zona pretendida', question: L('Em que zona do Porto procura?', 'Which part of Porto are you looking in?'), chips: ZONA_CHIPS },
      { key: 'Tipologia', question: L('Que tipologia procura?', 'What size are you after?'), chips: TIPO_CHIPS },
      { key: 'Orçamento', question: L('Tem um orçamento de referência?', 'Do you have a budget in mind?') },
      { key: 'Nome', question: NOME_Q },
      { key: 'Contacto', question: CONTACTO_Q },
    ],
  },
  alugar: {
    id: 'alugar',
    objective: 'Arrendar imóvel',
    intro: L('Certo — umas perguntas rápidas para o ajudar a arrendar.', 'Sure — a few quick questions to help you rent.'),
    steps: [
      { key: 'Zona pretendida', question: L('Em que zona procura arrendar?', 'Which area are you looking to rent in?'), chips: ZONA_CHIPS },
      { key: 'Tipo de imóvel', question: L('Que tipo de imóvel procura?', 'What type of property are you after?'), chips: TIPO_CHIPS },
      { key: 'Prazo', question: L('Para quando precisa?', 'When do you need it?'), chips: PRAZO_CHIPS },
      { key: 'Nome', question: NOME_Q },
      { key: 'Contacto', question: CONTACTO_Q },
    ],
  },
  avaliacao: {
    id: 'avaliacao',
    objective: 'Pedido de avaliação',
    intro: L('A avaliação é confidencial e sem compromisso. Só preciso de alguns dados.', 'The valuation is confidential and with no obligation. I just need a few details.'),
    steps: [
      { key: 'Zona do imóvel', question: L('Em que zona fica o imóvel a avaliar?', 'Which area is the property you want valued?'), chips: ZONA_CHIPS },
      { key: 'Tipologia', question: L('Que tipo de imóvel é?', 'What type of property is it?'), chips: TIPO_CHIPS },
      { key: 'Nome', question: NOME_Q },
      { key: 'Contacto', question: CONTACTO_Q },
    ],
  },
  visita: {
    id: 'visita',
    objective: 'Marcar visita',
    intro: L('As visitas são sem compromisso e com discrição. Vamos tratar disso.', 'Viewings are with no obligation and full discretion. Let’s arrange it.'),
    steps: [
      { key: 'Imóvel de interesse', question: L('Qual o imóvel ou zona de interesse? (a referência é bem-vinda)', 'Which property or area? (a reference is welcome)') },
      { key: 'Nome', question: NOME_Q },
      { key: 'Contacto', question: L('Qual o seu telefone ou email para confirmarmos a visita?', 'Your phone or email so we can confirm the viewing?') },
    ],
  },
  carreira: {
    id: 'carreira',
    objective: 'Carreira / candidatura',
    intro: L('Com gosto. Recolho alguns dados para a equipa de recrutamento.', "Gladly. I'll gather a few details for the recruitment team."),
    steps: [
      { key: 'Área de interesse', question: L('Em que área gostaria de trabalhar?', 'Which area would you like to work in?'), chips: AREA_CHIPS },
      { key: 'Nome', question: NOME_Q },
      { key: 'Contacto', question: CONTACTO_Q },
    ],
  },
};

// ---------- Reusable chip sets ----------
export function navChips(lang: Lang): Chip[] {
  return [
    { label: lang === 'en' ? 'Buy' : 'Comprar', flow: 'comprar' },
    { label: lang === 'en' ? 'Sell' : 'Vender', flow: 'vender' },
    { label: lang === 'en' ? 'Valuation' : 'Avaliação', flow: 'avaliacao' },
    { label: lang === 'en' ? 'Contact' : 'Contactos', send: 'contactos' },
  ];
}
export function humanChips(lang: Lang): Chip[] {
  return [
    { label: lang === 'en' ? 'Call' : 'Ligar', href: contacts.phoneHref },
    { label: lang === 'en' ? 'Contact page' : 'Página de contacto', href: '/contacto' },
  ];
}

// ---------- Intent → reply ----------
// Exported so tooling (scripts/i18n-coverage) can enumerate every reply (PT).
export function replyFor(intent: IntentId, lang: Lang = 'pt'): BotReply {
  const p = (bi: Bi) => bi[lang];
  const nav = navChips(lang);
  const human = humanChips(lang);
  const buyChip: Chip = { label: lang === 'en' ? 'Buy' : 'Comprar', flow: 'comprar' };
  const sellChip: Chip = { label: lang === 'en' ? 'Sell' : 'Vender', flow: 'vender' };
  const rentChip: Chip = { label: lang === 'en' ? 'Rent' : 'Arrendar', flow: 'alugar' };
  const valChip: Chip = { label: lang === 'en' ? 'Request valuation' : 'Pedir avaliação', flow: 'avaliacao' };

  switch (intent) {
    case 'saudacao':
      return {
        text: p(L('Olá — procura comprar, vender, arrendar ou avaliar um imóvel no Porto?', 'Hello — are you looking to buy, sell, rent or value a property in Porto?')),
        chips: nav,
      };

    case 'agradecimento':
      return {
        text: p(L('Ao seu dispor. Se precisar de mais alguma coisa, é só dizer.', 'My pleasure. If you need anything else, just say.')),
        chips: nav,
      };

    case 'vender':
      return {
        text: p(L('Apresentamos o seu imóvel com estratégia e discrição. Começamos por uma avaliação confidencial e sem compromisso — quer avançar?', 'We present your property with strategy and discretion, starting with a confidential, no-obligation valuation — shall we begin?')),
        flow: 'vender',
      };

    case 'comprar':
      return {
        text: p(L('Acompanhamo-lo na seleção, visitas e negociação. Diga-me o que procura e trato disso.', 'We guide you through selection, viewings and negotiation. Tell me what you’re after and I’ll take it from there.')),
        flow: 'comprar',
        cta: { label: lang === 'en' ? 'See properties' : 'Ver imóveis', href: EXTERNAL_LISTINGS_URL, external: true },
      };

    case 'alugar':
      return {
        text: p(L('Fazemos arrendamento premium, com seleção criteriosa e acompanhamento próximo. O que procura?', 'We handle premium rentals with careful selection and close support. What are you looking for?')),
        flow: 'alugar',
      };

    case 'avaliacao':
      return {
        text: p(L('A nossa avaliação é uma análise confidencial e sem compromisso do potencial real do seu imóvel. Avançamos?', 'Our valuation is a confidential, no-obligation read of your property’s real potential. Shall we start?')),
        flow: 'avaliacao',
      };

    case 'pedir_avaliacao':
      return {
        text: p(L('Trato já do seu pedido de avaliação — gratuito e sem compromisso. Avançamos?', 'I can start your valuation request now — free and with no obligation. Shall we?')),
        flow: 'avaliacao',
      };

    case 'visita':
      return {
        text: p(L('As visitas são sem compromisso e com total discrição. Posso ajudá-lo a marcar.', 'Viewings are with no obligation and full discretion. I can help you arrange one.')),
        flow: 'visita',
      };

    case 'contacto':
      return {
        text: p(L(`Pode falar connosco por telefone (${contacts.phone}) ou pelo formulário de contacto. Respondemos com brevidade.`, `You can reach us by phone (${contacts.phone}) or via the contact form. We reply promptly.`)),
        chips: human,
      };

    case 'localizacao':
      return {
        text: p(L(`Estamos na ${contacts.address}, ${contacts.city}. As visitas ao escritório são com marcação prévia.`, `We’re at ${contacts.address}, ${contacts.city}. Office visits are by appointment.`)),
        chips: [{ label: lang === 'en' ? 'View on map' : 'Ver no mapa', href: contacts.mapsHref, external: true }, ...human],
      };

    case 'horario':
      return {
        text: p(L(`Atendemos com marcação prévia na ${contacts.address}. Ligue-nos (${contacts.phone}) ou use o formulário — respondemos com brevidade.`, `We meet by appointment at ${contacts.address}. Call us (${contacts.phone}) or use the form — we reply promptly.`)),
        chips: human,
      };

    case 'zonas':
      return {
        text: p(L('Somos especialistas em zonas de carácter no Porto. Qual lhe interessa?', 'We specialise in Porto’s neighbourhoods of character. Which one interests you?')),
        cta: { label: lang === 'en' ? 'Explore areas' : 'Explorar zonas', href: '/#zonas' },
        chips: zonas.slice(0, 4).map((z) => ({ label: z.name, href: z.href })),
      };

    case 'imoveis':
      return {
        text: p(L('Temos uma seleção criteriosa de imóveis distintos no Porto. Veja o catálogo ou diga-me o que procura.', 'We have a curated selection of distinctive Porto properties. Browse the catalogue or tell me what you’re after.')),
        cta: { label: lang === 'en' ? 'See properties' : 'Ver imóveis', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [buyChip, rentChip],
      };

    case 'processo_compra':
      return {
        text: p(L('Acompanhamo-lo em cada passo — da seleção às visitas, negociação e escritura. Quer que o ajude a encontrar imóvel?', 'We guide you at every step — from selection to viewings, negotiation and deed. Would you like help finding a property?')),
        cta: { label: lang === 'en' ? 'See properties' : 'Ver imóveis', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [buyChip],
      };

    case 'processo_venda':
      return {
        text: p(L('Avaliação, marketing planeado, partilha com toda a rede e acompanhamento até à escritura. Começamos pela avaliação?', 'Valuation, planned marketing, network-wide exposure and support through to the deed. Shall we start with the valuation?')),
        chips: [valChip],
      };

    case 'processo_arrendamento':
      return {
        text: p(L('Seleção criteriosa, contratos claros e acompanhamento próximo, com discrição. Procura para arrendar?', 'Careful selection, clear contracts and close, discreet support. Are you looking to rent?')),
        chips: [rentChip],
      };

    case 'servicos':
      return {
        text: p(L('Acompanhamos todo o ciclo do imóvel premium no Porto — compra, venda, avaliação e arrendamento. Em que posso ajudar?', 'We cover the full premium-property cycle in Porto — buying, selling, valuation and rentals. How can I help?')),
        chips: nav,
      };

    case 'comissao':
      return {
        text: p(L('A comissão é paga pelo vendedor, apenas na conclusão da venda. Sem custos iniciais nem taxa de avaliação; explicamos tudo na primeira reunião.', 'The commission is paid by the seller, only on completion. No upfront costs or valuation fee; we explain everything at the first meeting.')),
        chips: [sellChip, { label: lang === 'en' ? 'Talk to the team' : 'Falar com a equipa', send: 'falar com a equipa' }],
      };

    case 'documentos':
      return {
        text: p(L('Geralmente: caderneta predial, certidão do registo predial, licença de utilização, certificado energético e identificação. A equipa orienta-o em cada passo.', 'Usually: property tax record, land registry certificate, use licence, energy certificate and ID. The team guides you through each step.')),
        chips: [sellChip, { label: lang === 'en' ? 'Talk to the team' : 'Falar com a equipa', send: 'falar com a equipa' }],
      };

    case 'confidencialidade':
      return {
        text: p(L('Totalmente. A informação é tratada com discrição e não é partilhada sem a sua autorização — confidencial desde a primeira conversa.', 'Completely. Your information is handled discreetly and never shared without your consent — confidential from the very first conversation.')),
        chips: nav,
      };

    // Zone-specific replies — concise, character-driven.
    case 'zona_foz':
      return {
        text: p(L('Foz do Douro — a zona mais exclusiva do Porto: vista atlântica, privacidade e procura consistente. Quer comprar aqui?', 'Foz do Douro — Porto’s most exclusive area: Atlantic views, privacy and steady demand. Looking to buy here?')),
        cta: { label: lang === 'en' ? 'Properties in Foz' : 'Imóveis em Foz', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [buyChip, { label: lang === 'en' ? 'Talk to the team' : 'Falar com a equipa', send: 'falar com a equipa' }],
      };

    case 'zona_boavista':
      return {
        text: p(L('Boavista — o centro do Porto moderno, com infraestruturas de topo e procura elevada. Interessa-lhe comprar ou investir?', 'Boavista — the heart of modern Porto, with top infrastructure and strong demand. Keen to buy or invest?')),
        cta: { label: lang === 'en' ? 'Properties in Boavista' : 'Imóveis em Boavista', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [buyChip, { label: lang === 'en' ? 'Investment' : 'Investir', send: 'lifestyle_investimento' }],
      };

    case 'zona_ribeira':
      return {
        text: p(L('Ribeira — património UNESCO, vista rio e oferta escassa e procurada. Quer explorar imóveis aqui?', 'Ribeira — UNESCO heritage, river views and scarce, sought-after stock. Want to explore properties here?')),
        cta: { label: lang === 'en' ? 'Properties in Ribeira' : 'Imóveis na Ribeira', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [buyChip],
      };

    case 'zona_cedofeita':
      return {
        text: p(L('Cedofeita — bairro vivível, comércio local e qualidade de vida, perto do centro. Quer viver aqui?', 'Cedofeita — a liveable neighbourhood with local shops and quality of life, close to the centre. Fancy living here?')),
        cta: { label: lang === 'en' ? 'Properties in Cedofeita' : 'Imóveis em Cedofeita', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [buyChip],
      };

    case 'zona_nevogilde':
      return {
        text: p(L('Nevogilde — espaço, verde e tranquilidade, mantendo centralidade. Procura para família?', 'Nevogilde — space, greenery and calm while staying central. Looking for a family home?')),
        cta: { label: lang === 'en' ? 'Properties in Nevogilde' : 'Imóveis em Nevogilde', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [buyChip],
      };

    case 'zona_lordelo':
      return {
        text: p(L('Lordelo do Ouro — tradição, arquitetura e autenticidade, com potencial de reforma. Interessa-lhe?', 'Lordelo do Ouro — tradition, architecture and authenticity, with renovation potential. Interested?')),
        cta: { label: lang === 'en' ? 'Properties in Lordelo' : 'Imóveis em Lordelo', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [buyChip, { label: lang === 'en' ? 'Renovation' : 'Reforma', send: 'lifestyle_reforma' }],
      };

    case 'zona_bonfim':
      return {
        text: p(L('Bonfim — bairro em regeneração, preços interessantes e procura crescente. Quer investir aqui?', 'Bonfim — a regenerating neighbourhood with attractive prices and growing demand. Keen to invest here?')),
        cta: { label: lang === 'en' ? 'Properties in Bonfim' : 'Imóveis em Bonfim', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [{ label: lang === 'en' ? 'Investment' : 'Investir', send: 'lifestyle_investimento' }, buyChip],
      };

    case 'zona_baixa':
      return {
        text: p(L('Baixa & Aliados — o coração histórico e urbano, com oferta escassa e procura constante. Quer explorar?', 'Baixa & Aliados — the historic, urban heart, with scarce stock and constant demand. Want to explore?')),
        cta: { label: lang === 'en' ? 'Properties in Baixa' : 'Imóveis na Baixa', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [buyChip],
      };

    case 'tipo_moradia':
      return {
        text: p(L('Moradias premium sobretudo em Foz, Nevogilde e Lordelo — espaço e privacidade, cada uma com carácter próprio. Quer ver opções?', 'Premium houses mainly in Foz, Nevogilde and Lordelo — space and privacy, each with its own character. Want to see options?')),
        cta: { label: lang === 'en' ? 'See houses' : 'Ver moradias', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [buyChip],
      };

    case 'tipo_apartamento':
      return {
        text: p(L('Apartamentos de T1 compactos a frações de luxo em Foz ou Boavista — cada zona com o seu mercado. Que tipologia procura?', 'Apartments from compact one-beds to luxury units in Foz or Boavista — each area with its own market. What size are you after?')),
        cta: { label: lang === 'en' ? 'See apartments' : 'Ver apartamentos', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [buyChip],
      };

    case 'tipo_t1_t2':
      return {
        text: p(L('T1 e T2 — ideais para profissionais, casais ou investimento, com procura constante em Boavista, Cedofeita e Baixa. Quer ver?', 'One- and two-beds — ideal for professionals, couples or investment, with steady demand in Boavista, Cedofeita and Baixa. Want to see some?')),
        cta: { label: lang === 'en' ? 'See T1/T2' : 'Ver T1/T2', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [buyChip],
      };

    case 'tipo_t3_t4':
      return {
        text: p(L('T3, T4 e maiores — espaço para família, com Foz e Nevogilde no segmento premium. Quer que o ajude a procurar?', 'Three-, four-bed and larger — family space, with Foz and Nevogilde in the premium bracket. Shall I help you search?')),
        cta: { label: lang === 'en' ? 'See T3/T4+' : 'Ver T3/T4+', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [buyChip],
      };

    case 'lifestyle_privacidade':
      return {
        text: p(L('Para privacidade, Foz, Nevogilde e Lordelo são as mais indicadas — discrição garantida. Quer explorar alguma?', 'For privacy, Foz, Nevogilde and Lordelo are the strongest — discretion assured. Want to explore one?')),
        chips: [{ label: 'Foz', send: 'zona_foz' }, { label: 'Nevogilde', send: 'zona_nevogilde' }],
      };

    case 'lifestyle_centralidade':
      return {
        text: p(L('Para centralidade, Boavista, Cedofeita e Baixa oferecem tudo à mão, cada uma com o seu ambiente. Qual prefere?', 'For central living, Boavista, Cedofeita and Baixa put everything at hand, each with its own feel. Which appeals?')),
        chips: [{ label: 'Boavista', send: 'zona_boavista' }, { label: 'Cedofeita', send: 'zona_cedofeita' }],
      };

    case 'lifestyle_investimento':
      return {
        text: p(L('Cada zona tem a sua tese: Ribeira pela escassez, Boavista pela rentabilidade, Bonfim pelo potencial. Que perfil procura?', 'Each area has its thesis: Ribeira for scarcity, Boavista for yield, Bonfim for upside. What profile are you after?')),
        chips: [{ label: 'Ribeira', send: 'zona_ribeira' }, { label: 'Boavista', send: 'zona_boavista' }],
      };

    case 'lifestyle_reforma':
      return {
        text: p(L('Para reabilitar com valor, veja a Ribeira, Lordelo, Bonfim e Cedofeita. Quer discutir o potencial de alguma?', 'For value-adding renovation, look at Ribeira, Lordelo, Bonfim and Cedofeita. Want to discuss the potential of one?')),
        chips: [{ label: 'Ribeira', send: 'zona_ribeira' }, { label: 'Lordelo', send: 'zona_lordelo' }],
      };

    case 'lifestyle_historia':
      return {
        text: p(L('Para imóveis com história, a Ribeira, Lordelo e a Baixa são incomparáveis. Quer ver alguma?', 'For properties with history, Ribeira, Lordelo and Baixa are unmatched. Want to see one?')),
        cta: { label: lang === 'en' ? 'Properties with history' : 'Imóveis com história', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [{ label: 'Ribeira', send: 'zona_ribeira' }, { label: 'Lordelo', send: 'zona_lordelo' }],
      };

    case 'blog':
      return { text: p(L(blog.text, blog.textEn)), cta: { label: lang === 'en' ? 'Read the blog' : 'Ver o blog', href: blog.href } };

    case 'carreiras':
      return {
        text: p(L(careers.text, careers.textEn)),
        cta: { label: lang === 'en' ? 'See careers' : 'Ver carreiras', href: careers.href },
        chips: [{ label: lang === 'en' ? 'Apply' : 'Candidatar-me', flow: 'carreira' }],
      };

    case 'equipa':
      return { text: p(L(team.text, team.textEn)), cta: { label: lang === 'en' ? 'Meet the team' : 'Conhecer a equipa', href: team.href } };

    case 'empresa':
      return {
        text: p(L(`Somos a RE/MAX Collection Vintage — a linha premium da RE/MAX, especializada em imóveis de prestígio e carácter no Porto desde ${company.established}.`, `We’re RE/MAX Collection Vintage — RE/MAX’s premium line, specialising in distinctive, prestige property in Porto since ${company.established}.`)),
        chips: [{ label: lang === 'en' ? 'Meet the team' : 'Conhecer a equipa', href: '/sobre-nos' }, { label: lang === 'en' ? 'About us' : 'Sobre nós', href: '/sobre-nos' }],
      };

    case 'reconhecimento':
      return { text: p(L(company.recognition, company.recognitionEn)), chips: [{ label: lang === 'en' ? 'About us' : 'Sobre nós', href: '/sobre-nos' }] };

    case 'humano':
      return {
        text: p(L('Com certeza. Fale diretamente com a nossa equipa:', 'Of course. Speak directly with our team:')),
        chips: human,
      };

    case 'preco':
      return {
        text: p(L('Os valores dependem da zona, tipologia e características. Veja o catálogo ou peça uma avaliação personalizada.', 'Values depend on area, size and features. Browse the catalogue or request a personalised valuation.')),
        cta: { label: lang === 'en' ? 'See properties' : 'Ver imóveis', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [valChip, buyChip],
      };

    case 'urgente':
      return {
        text: p(L('Se tem pressa, o mais rápido é falar diretamente connosco:', 'If you’re in a hurry, the quickest is to speak with us directly:')),
        chips: human,
      };

    case 'problema':
      return {
        text: p(L('Lamento o incómodo. A equipa resolve consigo — contacte-nos e tratamos disso:', 'Sorry for the trouble. The team will sort it with you — get in touch and we’ll handle it:')),
        chips: human,
      };

    default:
      return { text: lang === 'en' ? fallbackMessageEn : fallbackMessage, chips: human };
  }
}

// ---------- Public entry ----------
export function getReply(userText: string, lang: Lang = 'pt'): BotReply {
  const intent = detectIntent(userText);

  // For broad/ambiguous intents, prefer a precise FAQ answer when one matches
  // well (FAQ answers are PT-sourced; the DOM i18n layer handles EN display).
  const preferFaq = !intent || intent === 'empresa' || intent === 'imoveis';
  if (preferFaq) {
    const faq = searchFaq(userText);
    if (faq) return { text: faq.a, chips: navChips(lang) };
  }

  if (intent) return replyFor(intent, lang);

  // Nothing reliable → mandatory fallback to a human channel.
  return { text: lang === 'en' ? fallbackMessageEn : fallbackMessage, chips: humanChips(lang) };
}

export function getWelcome(lang: Lang = 'pt'): BotReply {
  return {
    text:
      lang === 'en'
        ? 'Hello — good to have you here. Are you looking to buy, sell, rent or value a property in Porto?'
        : 'Olá — é um gosto tê-lo aqui. Procura comprar, vender, arrendar ou avaliar um imóvel no Porto?',
  };
}

// Compose a human-readable lead summary (recap shown in chat; the component
// POSTs the answers to /api/lead — the same proxy every form on the site uses).
// Kept PT: the summary/objective travel to the (Portuguese) agency inbox.
export function composeLead(flowId: FlowId, answers: Record<string, string>): {
  lines: string[];
  closing: string;
} {
  const flow = flows[flowId];
  const lines = [`Objetivo: ${flow.objective}`];
  for (const step of flow.steps) {
    const v = answers[step.key];
    if (v) lines.push(`${step.key}: ${v}`);
  }
  return { lines, closing: leadClosing };
}

// ---------- Answer validation ----------
// Guards for the name/contact capture steps so a lead never gets a bogus
// name/contact (a question typed there is handled by the router, not stored).
export function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim());
}
export function isPhone(s: string): boolean {
  const digits = s.replace(/[^\d]/g, '');
  return digits.length >= 9 && digits.length <= 15;
}
export function isValidContact(s: string): boolean {
  return isEmail(s) || isPhone(s);
}
function looksLikeName(s: string): boolean {
  const v = s.trim();
  if (v.length < 2 || v.length > 60) return false;
  if (/[?@]/.test(v) || /\d/.test(v)) return false; // questions/emails/numbers aren't names
  if (!/[a-zà-ÿ]/i.test(v)) return false;
  if (detectIntent(v)) return false; // matches a request intent → not a name
  return true;
}

export type StepKind = 'name' | 'contact' | 'free';
export function stepKind(key: string): StepKind {
  if (key === 'Nome') return 'name';
  if (key === 'Contacto') return 'contact';
  return 'free';
}

export interface StepValidation {
  ok: boolean;
  answerQuestion?: boolean;
}
export function validateAnswer(key: string, text: string): StepValidation {
  const v = text.trim();
  const kind = stepKind(key);
  const isQuestion = /\?/.test(v);
  if (kind === 'contact') return isValidContact(v) ? { ok: true } : { ok: false, answerQuestion: isQuestion };
  if (kind === 'name') return looksLikeName(v) ? { ok: true } : { ok: false, answerQuestion: isQuestion };
  return { ok: true };
}

// Build the structured lead the site's /api/lead proxy forwards. Same shape
// family as the other forms (full_name/email/phone/form/consent).
export function buildLeadPayload(flowId: FlowId, answers: Record<string, string>) {
  const flow = flows[flowId];
  const contact = (answers['Contacto'] || '').trim();
  const details: Record<string, string> = {};
  const lines: string[] = [`Objetivo: ${flow.objective}`];
  for (const step of flow.steps) {
    const val = answers[step.key];
    if (!val) continue;
    lines.push(`${step.key}: ${val}`);
    if (step.key !== 'Nome' && step.key !== 'Contacto') details[step.key] = val;
  }
  return {
    full_name: answers['Nome'] || null,
    email: isEmail(contact) ? contact : null,
    phone: isPhone(contact) ? contact.replace(/[^\d+]/g, '') : null,
    form: 'support-chat',
    objective: flow.objective,
    details,
    message: lines.join('\n'),
    consent: { type: 'support_chat', text_version: 'v1' },
  };
}
