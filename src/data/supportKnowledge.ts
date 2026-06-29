// ============================================================
// Knowledge base for the Collection Vintage digital assistant.
//
// Composes REAL site content (site.ts, faqs.ts) into a chatbot-oriented view.
// HONESTY (see CLAUDE.md): no invented figures, prices, awards or contacts.
// Everything here is grounded in existing site content. Contacts are read from
// site.ts (single source) so they stay correct when the real ones land.
//
// This module is imported by both the Astro frontmatter (build) and the
// client-side chat controller (bundled by Vite) — keep it framework-free.
// ============================================================
import { site, neighborhoods, methodSteps } from './site';
import { faqs } from './faqs';

export const assistant = {
  name: 'Assistente Collection Vintage',
  status: 'Assistente digital · resposta 24/7',
  // Shown as the first bubble when the panel opens.
  welcome:
    'Bem-vindo à RE/MAX Collection Vintage 👋\n\nSou o assistente digital da Collection — aqui para ajudá-lo com perguntas sobre compra, venda, arrendamento, avaliação ou qualquer dúvida sobre a Collection.\n\nComo posso ajudar?',
  // Used whenever the user asks if they are talking to a person.
  humanNote:
    'Sou o assistente digital da Collection Vintage. Para um acompanhamento completamente personalizado e conversas mais aprofundadas, a nossa equipa está disponível via WhatsApp, email ou telefone.',
};

// Mandatory fallback (verbatim from the brief) when nothing reliable is found.
export const fallbackMessage =
  'Não tenho informação suficiente para responder com precisão a essa questão. Posso encaminhar o seu pedido para a equipa da RE/MAX Collection Vintage.';

// Closing line after a lead is captured (verbatim from the brief).
export const leadClosing =
  'Obrigado. A nossa equipa pode entrar em contacto consigo para dar seguimento.';

// Contacts — single source of truth is site.ts (placeholders until launch).
export const contacts = {
  phone: site.phone,
  phoneHref: site.phoneHref,
  email: site.email,
  emailHref: `mailto:${site.email}`,
  whatsappHref: site.whatsappHref,
  address: site.address.join(', '),
  hours: `${site.hours[0]}, ${site.hours[1]}`,
  city: site.city,
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(site.address.join(', ')),
};

// Zonas of the collection (from site.ts neighborhoods — real curated areas).
export const zonas = neighborhoods.map((n) => ({
  name: n.name,
  slug: n.slug,
  blurb: n.blurb,
  href: `/imoveis?zona=${n.slug}`,
}));

// The agency's services, grounded in the site's method + journeys.
export const services = [
  { title: 'Comprar', text: 'Seleção de imóveis distintos, visitas qualificadas e negociação.', href: '/imoveis' },
  { title: 'Vender', text: 'Avaliação, estratégia, apresentação ao mercado e negociação.', href: '/#vender' },
  { title: 'Arrendar', text: 'Arrendamento de imóveis premium, com seleção criteriosa.', href: '/alugar' },
  { title: 'Avaliar', text: 'Avaliação confidencial e sem compromisso do seu imóvel.', href: '/#vender' },
];

// Process flows, grounded in real site content.
export const processes = {
  venda: methodSteps.map((s) => `${s.name} — ${s.text}`),
  compra: [
    'Compreendemos as suas necessidades, objetivos e estilo de vida.',
    'Selecionamos imóveis à medida — incluindo oportunidades fora do mercado.',
    'Organizamos visitas qualificadas, sem pressão.',
    'Negociamos e acompanhamos todo o processo até à escritura.',
  ],
  arrendamento: [
    'Seleção cuidada de imóveis únicos, criteriosamente escolhidos.',
    'Acompanhamento dedicado em cada etapa.',
    'Processo discreto, com confidencialidade garantida.',
  ],
  avaliacao: [
    'Estudo do imóvel e da zona.',
    'Análise de comparáveis de mercado.',
    'Posicionamento recomendado.',
    'Estratégia de apresentação ao mercado.',
  ],
};

// Company / brand explainer (from FAQ + site.ts — honest, network-aware).
export const company = {
  established: site.established,
  about:
    'A RE/MAX Collection® é a linha premium da rede RE/MAX, dedicada a imóveis de alto valor e carácter. "Vintage" é a nossa agência no Porto, especializada em imóveis com história, arquitetura e localização distintas.',
  // Awards belong to the RE/MAX Portugal NETWORK — framed accordingly, never "os nossos prémios".
  recognition:
    'Fazemos parte da RE/MAX, a marca imobiliária mais premiada de Portugal (26 anos de liderança, Escolha do Consumidor 2026, Prémio Cinco Estrelas 2025 e 2026). A Collection Vintage representa esse padrão no segmento de luxo do Porto.',
};

// Careers summary (from carreiras.ts — only the verified open role is named).
export const careers = {
  text: 'Estamos sempre atentos a talento para o segmento premium. Vaga atual: Consultor Imobiliário (Porto, full-time). Aceitamos também candidaturas espontâneas.',
  href: '/carreiras',
};

// Team summary — honest, no invented numbers (photos are still placeholders).
export const team = {
  text: 'Uma equipa de consultores especializados no segmento premium do Porto, com acompanhamento próximo e discreto em cada etapa.',
  href: '/sobre-nos',
};

export const blog = {
  text: 'No nosso blog encontra análises de mercado, guias de zona e perspetivas sobre o segmento de luxo no Porto.',
  href: '/insights',
};

// Re-export FAQ for the engine's keyword search.
export const faqList = faqs;

// Initial quick-suggestion chips shown under the welcome bubble.
export const quickStart: { label: string; flow?: string; send?: string }[] = [
  { label: 'Quero vender o meu imóvel', flow: 'vender' },
  { label: 'Quero comprar casa', flow: 'comprar' },
  { label: 'Quero pedir avaliação', flow: 'avaliacao' },
  { label: 'Quero marcar uma visita', flow: 'visita' },
  { label: 'Falar com a equipa', send: 'falar com a equipa' },
  { label: 'Ver contactos', send: 'contactos' },
];
