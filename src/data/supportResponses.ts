import { EXTERNAL_LISTINGS_URL } from '../lib/site.config';
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
  /** Consent-gate action before a chat lead is delivered. */
  consent?: 'send' | 'cancel' | 'retry';
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
  { label: 'Ligar', href: contacts.phoneHref },
  { label: 'Página de contacto', href: '/contacto' },
];

function list(items: string[]): string {
  return items.map((s) => `• ${s}`).join('\n');
}

// ---------- Intent → reply ----------
// Exported so tooling (scripts/i18n-coverage) can enumerate every reply.
export function replyFor(intent: IntentId): BotReply {
  switch (intent) {
    case 'saudacao':
      return {
        text: 'Bem-vindo à Collection Vintage! Sou o assistente digital da equipa.\n\nComo posso ajudar?\n• Procura comprar ou vender um imóvel?\n• Quer conhecer as zonas onde operamos?\n• Tem dúvidas sobre os nossos processos?',
        chips: [...NAV_CHIPS, { label: 'Conhecer a equipa', send: 'quem sao voces' }]
      };

    case 'agradecimento':
      return {
        text: 'Fico feliz em ajudar! 😊\n\nSe tiver mais perguntas ou precisar de falar diretamente com alguém da equipa, estou aqui.',
        chips: NAV_CHIPS
      };

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
        cta: { label: 'Ver imóveis', href: EXTERNAL_LISTINGS_URL, external: true },
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
        text: `Pode contactar-nos de várias formas:\n\n📞 Telefone: ${contacts.phone}\n📍 Morada: ${contacts.address}\n📝 Formulário: na página de contacto\n\nRespondemos com a maior brevidade possível.`,
        chips: humanChips,
      };

    case 'localizacao':
      return {
        text: `Estamos no ${contacts.city}.\n• Morada: ${contacts.address}\n\nAs visitas ao escritório são com marcação prévia.`,
        chips: [{ label: 'Ver no mapa', href: contacts.mapsHref, external: true }, ...NAV_CHIPS.slice(0, 2)],
      };

    case 'horario':
      return {
        text: `Atendemos no nosso escritório na ${contacts.address}, com marcação prévia. Pode ligar-nos (${contacts.phone}) ou deixar mensagem no formulário de contacto — respondemos com a maior brevidade possível.`,
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
        cta: { label: 'Ver imóveis', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [{ label: 'Comprar', flow: 'comprar' }, { label: 'Arrendar', flow: 'alugar' }, { label: 'Marcar visita', flow: 'visita' }],
      };

    case 'processo_compra':
      return {
        text: 'O processo de compra connosco:\n' + list(processes.compra),
        cta: { label: 'Ver imóveis', href: EXTERNAL_LISTINGS_URL, external: true },
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

    // Zone-specific replies (intelligent, character-driven)
    case 'zona_foz':
      return {
        text: 'Foz do Douro - a zona mais exclusiva do Porto.\n\nVista para o Atlantico, privacidade, densidade baixa. Procura seletiva mas consistente. Moradias isoladas, apartamentos de luxo em primeira linha, palacetes com terreno.\n\nInvestimento seguro para quem valoriza tranquilidade e estatuto.',
        cta: { label: 'Ver imoveis em Foz', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [{ label: 'Quero comprar em Foz', flow: 'comprar' }, { label: 'Falar com equipa', send: 'falar com a equipa' }],
      };

    case 'zona_boavista':
      return {
        text: 'Boavista - o centro verdadeiro do Porto moderno.\n\nHub comercial e de infraestruturas de classe mundial. Centralidade absoluta, procura elevada garantida. Apartamentos, espacos comerciais, edificios de investimento.\n\nO coracao do Porto novo - investimento garantido.',
        cta: { label: 'Ver imoveis em Boavista', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [{ label: 'Quero comprar em Boavista', flow: 'comprar' }, { label: 'Investidor', send: 'lifestyle_investimento' }],
      };

    case 'zona_ribeira':
      return {
        text: 'Ribeira - a zona mais autentica e historica de Porto.\n\nPatrimonio UNESCO, vista rio, exclusividade unica. Demanda internacional, escassez de oferta genuina. Casaroes historicos, apartamentos em edificios singulares.\n\nCompra historia. Revalorizacao garantida.',
        cta: { label: 'Ver imoveis na Ribeira', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [{ label: 'Quero comprar', flow: 'comprar' }, { label: 'Reforma', send: 'lifestyle_reforma' }],
      };

    case 'zona_cedofeita':
      return {
        text: 'Cedofeita - o bairro verdadeiramente vivivel.\n\nConvivencia genuina, comercio local, qualidade de vida. Gentrificacao contida, procura de casais profissionais. Apartamentos, casas de bairro renovadas.\n\nPerto do centro mas com alma de bairro.',
        cta: { label: 'Ver imoveis em Cedofeita', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [{ label: 'Quero viver aqui', flow: 'comprar' }, { label: 'Contactos', send: 'contactos' }],
      };

    case 'zona_nevogilde':
      return {
        text: 'Nevogilde - espaco, verde e tranquilidade, mantendo centralidade.\n\nZona verde consolidada, procura estavel de familias. Moradias, casaroes, apartamentos com areas verdes. Perto do centro sem abrir mao de espaco.\n\nSeguranca imobiliaria, mercado consistente.',
        cta: { label: 'Ver imoveis em Nevogilde', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [{ label: 'Para familia', flow: 'comprar' }, { label: 'Contactos', send: 'contactos' }],
      };

    case 'zona_lordelo':
      return {
        text: 'Lordelo do Ouro - tradicao, arquitectura e autenticidade.\n\nZona verde historica, solares e casaroes com caracter. Procura solida de quem respeita tradicao. Potencial de reforma genuina.\n\nO Porto real, longe de modismo.',
        cta: { label: 'Ver imoveis em Lordelo', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [{ label: 'Historia e espaco', flow: 'comprar' }, { label: 'Reforma', send: 'lifestyle_reforma' }],
      };

    case 'zona_bonfim':
      return {
        text: 'Bonfim - o bairro em transformacao, com potencial.\n\nRegeneracao urbana em progresso, precos interessantes. Procura crescente de investidores e criativos. Apartamentos, casas de bairro, espacos mistos.\n\nRevalorizacao gradual, ambiente criativo emergente.',
        cta: { label: 'Ver imoveis em Bonfim', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [{ label: 'Investidor', flow: 'comprar' }, { label: 'Potencial', send: 'lifestyle_investimento' }],
      };

    case 'zona_baixa':
      return {
        text: 'Baixa & Aliados - o coracao historico e urbano de Porto.\n\nFluxo continuo de turismo, negocio, vida urbana. Escassez de oferta genuina, demanda constante. Apartamentos em edificios historicos, lofts, moradias singulares.\n\nAutenticidade historica mais conveniencia moderna.',
        cta: { label: 'Ver imoveis na Baixa', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [{ label: 'Quero comprar', flow: 'comprar' }, { label: 'Estilo urbano', send: 'contactos' }],
      };

    case 'tipo_moradia':
      return {
        text: 'Moradias - espaco, privacidade, liberdade.\n\nNo Porto encontra moradias isoladas premium em Foz, Nevogilde e Lordelo. Cada uma com caracter e localizacao unica. Potencial de investimento variavel conforme zona.',
        cta: { label: 'Ver moradias', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [{ label: 'Quero moradia', flow: 'comprar' }, { label: 'Em que zona?', send: 'zonas' }],
      };

    case 'tipo_apartamento':
      return {
        text: 'Apartamentos - variedade, localizacao flexivel, investimento.\n\nDe T1 compactos em Cedofeita a apartamentos de luxo em Foz ou Boavista. Cada zona oferece tipologias e mercados distintos.',
        cta: { label: 'Ver apartamentos', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [{ label: 'T1/T2', send: 'tipo_t1_t2' }, { label: 'T3/T4', send: 'tipo_t3_t4' }],
      };

    case 'tipo_t1_t2':
      return {
        text: 'T1 e T2 - perfeito para profissionais, casais, ou investimento.\n\nMercado dinamico, procura constante, especialmente em Boavista, Cedofeita e Baixa.',
        cta: { label: 'Ver T1/T2', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [{ label: 'Profissional', flow: 'comprar' }, { label: 'Investimento', send: 'lifestyle_investimento' }],
      };

    case 'tipo_t3_t4':
      return {
        text: 'T3, T4 e maiores - espaco, qualidade de vida, familia e investimento.\n\nEm todas as zonas, cada uma com mercado e publico-alvo distinto. Foz e Nevogilde para familia premium, Boavista para investimento urbano.',
        cta: { label: 'Ver T3/T4+', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [{ label: 'Para familia', flow: 'comprar' }, { label: 'Investimento', send: 'lifestyle_investimento' }],
      };

    case 'lifestyle_privacidade':
      return {
        text: 'Privacidade - a Collection entende perfeitamente.\n\nZonas ideais:\n- Foz do Douro: isolamento, vista, densidade baixa\n- Nevogilde e Lordelo: espaco, bairro tranquilo\n- Ribeira: privacidade ao abrigo de historia\n\nCada zona oferece discricao garantida.',
        cta: { label: 'Explorar zonas', href: '/#bairros' },
        chips: [{ label: 'Foz', send: 'zona_foz' }, { label: 'Nevogilde', send: 'zona_nevogilde' }],
      };

    case 'lifestyle_centralidade':
      return {
        text: 'Centralidade - estar perto de tudo sem abrir mao de qualidade.\n\nOpcoes:\n- Boavista: centralidade absoluta\n- Cedofeita: central com alma de bairro\n- Baixa: coracao de Porto\n\nCada zona e central mas com experiencia diferente.',
        cta: { label: 'Explorar zonas centrais', href: '/#bairros' },
        chips: [{ label: 'Boavista', send: 'zona_boavista' }, { label: 'Cedofeita', send: 'zona_cedofeita' }],
      };

    case 'lifestyle_investimento':
      return {
        text: 'Investimento imobiliario - Porto e mercado em ascensao.\n\nTeses de investimento por zona:\n- Ribeira: escassez, demanda internacional\n- Boavista: centralidade, rentabilidade garantida\n- Bonfim: regeneracao, upside potencial\n- Foz: densidade baixa, procura estavel\n\nCada zona tem potencial distinto.',
        cta: { label: 'Estrategia de investimento', href: '/#vender' },
        chips: [{ label: 'Ribeira', send: 'zona_ribeira' }, { label: 'Boavista', send: 'zona_boavista' }],
      };

    case 'lifestyle_reforma':
      return {
        text: 'Potencial de reforma - Porto tem oportunidades reais.\n\nZonas com melhor custo-beneficio:\n- Ribeira: casaroes historicos, valor agregado\n- Lordelo: solares, arquitectura original\n- Bonfim: casas de bairro, upside financeiro\n- Cedofeita: apartamentos a modernizar\n\nReforma e estrategia de valor.',
        cta: { label: 'Discutir potencial', href: '/#vender' },
        chips: [{ label: 'Ribeira', send: 'zona_ribeira' }, { label: 'Lordelo', send: 'zona_lordelo' }],
      };

    case 'lifestyle_historia':
      return {
        text: 'Historia e caracter - o DNA da Collection.\n\nZonas com imoveiscom verdadeira historia:\n- Ribeira: patrimonio UNESCO, casaroes, vista rio\n- Lordelo: solares, arquitectura senhorial\n- Baixa: edificios historicos\n\nAutenticidade tem valor.',
        cta: { label: 'Ver imoveis com historia', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [{ label: 'Ribeira', send: 'zona_ribeira' }, { label: 'Lordelo', send: 'zona_lordelo' }],
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
        text: 'Com certeza! Pode falar diretamente com a nossa equipa. Estamos aqui para ajudar:',
        chips: humanChips,
      };

    case 'preco':
      return {
        text: 'Os valores dos imóveis dependem da localização, tipologia, tamanho e características.\n\nOs preços variam conforme o mercado atual no Porto. Veja o catálogo ou peça uma avaliação personalizada.',
        cta: { label: 'Ver imóveis disponíveis', href: EXTERNAL_LISTINGS_URL, external: true },
        chips: [{ label: 'Pedir avaliação', flow: 'avaliacao' }, { label: 'Comprar', flow: 'comprar' }],
      };

    case 'urgente':
      return {
        text: 'Entendo que tem pressa! A nossa equipa está disponível para o ajudar.\n\nLigue-nos para uma resposta rápida:',
        chips: [{ label: 'Ligar', href: contacts.phoneHref }, { label: 'Página de contacto', href: '/contacto' }],
      };

    case 'problema':
      return {
        text: 'Peço desculpa por qualquer inconveniente. A nossa equipa está aqui para resolver a situação.\n\nPode contactar-nos diretamente e resolveremos o mais rápido possível:',
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

// Compose a human-readable lead summary (recap shown in chat; the component
// POSTs the answers to /api/lead — the same proxy every form on the site uses).
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
