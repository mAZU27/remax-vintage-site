import { EXTERNAL_LISTINGS_URL } from '../lib/site.config';
// ============================================================
// Knowledge base for the Collection Vintage digital assistant.
//
// Rich, contextual knowledge grounded in real brand + market positioning.
// The assistant understands zones deeply (demographics, character, investment
// thesis), brand DNA (discretion, selectivity, premium premium), and client
// profiles (investor, lifestyle buyer, privacy seeker, renovation aficionado).
//
// HONESTY: no invented figures, prices, awards or contacts. Everything
// grounded in existing site content; contacts read from site.ts (single source).
// ============================================================
import { site, methodSteps } from './site';
import { zonas as zonasAtivas } from '../content/zonas';
import { faqs } from './faqs';

export const assistant = {
  name: 'Assistente Collection Vintage',
  status: 'Assistente digital · 24/7 · premium',
  welcome:
    'Bem-vindo à RE/MAX Collection Vintage 👋\n\nSou o assistente especializado da Collection — aqui para ajudá-lo com perguntas sobre compra, venda ou arrendamento de imóveis distintos no Porto.\n\nDiga-me: procura comprar, vender, arrendar... ou tem dúvidas sobre uma zona em particular?',
  humanNote:
    'Sou o assistente digital da Collection Vintage. Para um acompanhamento completamente personalizado e conversas muito mais aprofundadas, a nossa equipa está disponível via WhatsApp, email ou telefone — resposta em 24h.',
};

export const fallbackMessage =
  'Sobre isso não tenho uma confirmação. Prefere que a equipa lhe responda diretamente?';
export const fallbackMessageEn =
  'I don’t have a confirmed answer on that. Would you like the team to reply to you directly?';

export const leadClosing =
  'Obrigado. A nossa equipa entrará em contacto consigo para dar seguimento — normalmente em 24h.';

// Contacts — single source of truth is site.ts (factos verificados no perfil
// oficial remax.pt). Email, WhatsApp e horário: por confirmar com a agência —
// ausentes de propósito para o assistente nunca citar dados inventados.
export const contacts = {
  phone: site.phone,
  phoneHref: site.phoneHref,
  address: site.address.join(', '),
  city: site.city,
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(site.address.join(', ')),
};

// Rich zona knowledge — each zone has deep context (beyond the tagline).
export interface ZonaContext {
  name: string;
  slug: string;
  blurb: string;
  href: string;
  // Who lives here and why
  demographic: string;
  // Investment thesis
  investment: string;
  // Typical property types
  propertyTypes: string;
  // Why choose this zone (vs. others)
  uniqueValue: string;
}

export const zonas: ZonaContext[] = zonasAtivas.map((n) => {
  const zoneDetails: Record<string, Omit<ZonaContext, 'name' | 'slug' | 'blurb' | 'href'>> = {
    'foz-do-douro': {
      demographic: 'Famílias, executivos, empresários internacionais que valorizam privacidade e acesso direto ao atlântico.',
      investment: 'Proximidade ao mar, vista, densidade baixa — procura seletiva mas sólida de quem pode escolher.',
      propertyTypes: 'Moradias isoladas, apartamentos de luxo em primeira linha, palacetes com terreno.',
      uniqueValue: 'A única zona de Porto com vista mar genuína. Tranquilidade e status combinados.',
    },
    'boavista': {
      demographic: 'Profissionais, investidores, pequenas famílias que precisam de centralidade e infraestruturas.',
      investment: 'Hub comercial e residencial do Porto — valorização garantida, procura contínua.',
      propertyTypes: 'Apartamentos de tipologia variada, espaços comerciais, edifícios de investimento.',
      uniqueValue: 'Infraestruturas de classe mundial, comércio, restauração. O centro verdadeiro do Porto moderno.',
    },
    'ribeira': {
      demographic: 'Colecionadores, investidores de herança, turismo premium, empresários criativos.',
      investment: 'Património UNESCO, demanda internacional, escassez de oferta — especulação positiva garantida.',
      propertyTypes: 'Casarões históricos, apartamentos em edifícios singulares, espaços comerciais únicos.',
      uniqueValue: 'A zona mais autêntica de Porto. História, vista rio, exclusividade que não se replica.',
    },
    'cedofeita': {
      demographic: 'Casais jovens profissionais, famílias criativas, quem procura bairro vivível e central.',
      investment: 'Gentrificação contida, renovação constante, procura equilibrada.',
      propertyTypes: 'Apartamentos de tipologia média-grande, casas de bairro renovadas.',
      uniqueValue: 'Bairro genuinamente lisboeta em Porto. Convivência, comércio local, qualidade de vida.',
    },
    'nevogilde': {
      demographic: 'Famílias estabelecidas, profissionais que querem espaço, verde e tranquilidade mantendo centralidade.',
      investment: 'Zona verde e residencial consolidada. Procura estável de quem quer ficar.',
      propertyTypes: 'Moradias, casarões, apartamentos maiores com áreas verdes.',
      uniqueValue: 'Espaço, áreas verdes, tranquilidade. Sem abrir mão de estar a minutos do centro.',
    },
    'lordelo': {
      demographic: 'Famílias de raiz, colecionadores de arquitetura, quem respeita tradição e autenticidade.',
      investment: 'Zona verde, consolidada, histórica. Baixa especulação mas procura sólida.',
      propertyTypes: 'Moradias antigas com potencial, solares, casarões com carácter.',
      uniqueValue: 'Arquitectura genuína, tradição, espaço. O Porto real, longe de modismo.',
    },
    'bonfim': {
      demographic: 'Investidores, casais criativos, quem vê potencial em bairros em transformação.',
      investment: 'Regeneração urbana em progresso, preços acessíveis, procura crescente.',
      propertyTypes: 'Apartamentos de tipo médio, casas de bairro, espaços mistos (residencial + comercial).',
      uniqueValue: 'Bairro em transformação. Potencial de revalorização, ambiente criativo emergente.',
    },
    'baixa': {
      demographic: 'Executivos urbanos, profissionais liberais, investidores internacionais, famílias no coração da cidade.',
      investment: 'Centro histórico de Porto, fluxo contínuo de turismo e negócio, escassez de oferta.',
      propertyTypes: 'Apartamentos em edifícios históricos, lofts industriais, moradias geminadas.',
      uniqueValue: 'Coração de Porto. Autenticidade histórica com toda a conveniência urbana moderna.',
    },
  };

  const details = zoneDetails[n.slug] || {
    demographic: 'Profissionais e famílias que valorizam localização',
    investment: 'Zona consolidada no Porto',
    propertyTypes: 'Apartamentos e moradias',
    uniqueValue: 'Localização estratégica no Porto',
  };

  return {
    name: n.nome,
    slug: n.slug,
    blurb: n.descricao,
    href: EXTERNAL_LISTINGS_URL,
    ...details,
  };
});

// The agency's services.
export const services = [
  { title: 'Comprar', text: 'Seleção de imóveis distintos, visitas qualificadas e negociação com tato.', href: '/comprar' },
  { title: 'Vender', text: 'Avaliação estratégica, posicionamento premium e negociação discreta.', href: '/#vender' },
  { title: 'Arrendar', text: 'Arrendamento de imóveis premium com seleção e acompanhamento dedicado.', href: '/alugar' },
  { title: 'Avaliar', text: 'Avaliação confidencial, estratégica e sem compromisso do seu imóvel.', href: '/#vender' },
];

// Process details (deeper than before).
export const processes = {
  venda: methodSteps.map((s) => `${s.name} — ${s.text}`),
  compra: [
    '🤝 Compreendemos profundamente as suas necessidades, estilo de vida e objetivos.',
    '🔍 Selecionamos imóveis distintos à medida — incluindo oportunidades fora do mercado.',
    '✨ Visitas qualificadas e organizadas sem pressão, com tempo para conhecer cada detalhe.',
    '💼 Negociação estruturada, acompanhamento completo até à escritura.',
  ],
  arrendamento: [
    '✓ Seleção cuidada de imóveis únicos, verificados pessoalmente.',
    '✓ Acompanhamento dedicado em cada etapa do processo.',
    '✓ Confidencialidade garantida, discrição em toda a transação.',
  ],
  avaliacao: [
    '📍 Estudo profundo do imóvel, da zona e do seu potencial real.',
    '📊 Análise de comparáveis de mercado — dados, não achismo.',
    '🎯 Posicionamento estratégico recomendado para o seu mercado-alvo.',
    '📈 Estratégia completa de apresentação e timing de venda.',
  ],
};

// Brand positioning and values.
export const company = {
  established: site.established,
  motto: 'Uma coleção de imóveis. Uma filosofia de discretion e qualidade.',
  about:
    'A RE/MAX Collection® é a linha premium da rede RE/MAX, dedicada a imóveis de alto valor e carácter. "Vintage" é a nossa agência no Porto, especializada em imóveis com história, arquitetura e localização distintas. Não vendemos casas — vendemos capítulos de vidas em locais inesquecíveis.',
  philosophy:
    'Discretion, selectivity, expertise. Cada cliente é único. Cada imóvel conta uma história. O nosso trabalho é encontrar o encaixe perfeito — com paciência, rigor e sem compromissos.',
  recognition:
    'Fazemos parte da RE/MAX, a marca imobiliária mais premiada de Portugal (12 anos de liderança, Escolha do Consumidor 2026, Prémio Cinco Estrelas 2025 e 2026). A Collection Vintage representa esse padrão no segmento de luxo do Porto.',
  recognitionEn:
    'We are part of RE/MAX, Portugal’s most awarded real-estate brand (12 years of leadership, Consumer Choice 2026, Five Star Award 2025 and 2026). Collection Vintage carries that standard into Porto’s luxury segment.',
};

// Careers.
export const careers = {
  text: 'Estamos à procura de consultores que entendam o segmento premium. Vaga atual: Consultor Imobiliário (Porto, full-time). Aceitamos também candidaturas espontâneas — talentos excepcionais são sempre bem-vindos.',
  textEn: 'We look for consultants who understand the premium segment. Current opening: Real Estate Consultant (Porto, full-time). We also welcome speculative applications — exceptional talent is always welcome.',
  href: '/carreiras',
};

// Team.
export const team = {
  text: 'Uma equipa de consultores especializados no segmento premium do Porto, com acompanhamento próximo, discreto e muito pessoal em cada etapa.',
  textEn: 'A team of consultants specialising in Porto’s premium segment, with close, discreet and very personal support at every step.',
  href: '/sobre-nos',
};

// Blog.
export const blog = {
  text: 'Análises de mercado, guias profundos de zona e perspetivas sobre o segmento de luxo no Porto — escrito por quem vive o mercado.',
  textEn: 'Market analysis, in-depth area guides and perspectives on Porto’s luxury segment — written by people who live the market.',
  href: '/insights',
};

// Re-export FAQ for the engine's keyword search.
export const faqList = faqs;

// Initial quick-suggestion chips — now more diverse.
export const quickStart: { label: string; flow?: string; send?: string }[] = [
  { label: 'Quero comprar casa', flow: 'comprar' },
  { label: 'Quero vender o meu imóvel', flow: 'vender' },
  { label: 'Quero conhecer as zonas', send: 'zonas' },
  { label: 'Marcar uma visita', flow: 'visita' },
  { label: 'Pedir avaliação', flow: 'avaliacao' },
  { label: 'Falar com consultores', send: 'falar com a equipa' },
];
