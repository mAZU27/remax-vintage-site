// ============================================================
// Central site content & configuration.
// Content lives here (not in markup) so it is easy to maintain.
// Brand: RE/MAX Collection Vintage (gold/navy/cream). Do NOT
// rename — the "HEMAX" text in early mockups was AI hallucination.
// ============================================================

import { EXTERNAL_LISTINGS_URL } from '../lib/site.config';

export const site = {
  name: 'RE/MAX Collection Vintage',
  shortName: 'Collection Vintage',
  brandLine: 'RE/MAX Collection® Vintage',
  // Display logo (nav/footer render at 26–32px → ship the 96px-tall version).
  logo: '/assets/remax-vintage-horizontal-nav.png',
  // Full-resolution logo — structured data / social previews only.
  logoFull: '/assets/remax-vintage-horizontal.png',
  tagline: 'A coleção mais rara do Porto.',
  description:
    'Imóveis vintage e premium no Porto — oito zonas de eleição, da Foz do Douro à Baixa. Avaliação confidencial e uma apresentação à altura de cada imóvel distinto.',
  // Contactos VERIFICADOS no perfil oficial da agência em remax.pt
  // (remax.pt/pt/agencia/remax-collection-vintage/12382, consultado 2026-07-10).
  // Email, horário, redes sociais e WhatsApp: por confirmar com a agência —
  // deliberadamente ausentes até haver dados reais (nunca inventar).
  phone: '+351 226 181 031',
  phoneHref: 'tel:+351226181031',
  city: 'Porto, Portugal',
  address: ['Avenida da Boavista, 3191/3195', '4100-137 Porto, Portugal'],
  legalName: 'Vintage Patamar - Mediação Imobiliária, Lda',
  ami: 'AMI 10092',
  established: 2014,
} as const;

export interface NavItem {
  label: string;
  href: string;
  highlight?: boolean;
  /** Opens in a new tab (target=_blank + security rel). */
  external?: boolean;
}

// 7 items (owner-approved grouping): the two method pages lead; listings are
// external; Zonas/Método are on-page sections (reachable by scroll) and
// Carreiras moved to the footer to keep the menu scannable.
// «Blog» removido temporariamente do menu: os 4 artigos são placeholders
// declarados (noindex + fora do sitemap) até existir conteúdo editorial real.
export const nav: NavItem[] = [
  { label: 'Comprar', href: '/comprar' },
  { label: 'Vender', href: '/vender', highlight: true },
  { label: 'Imóveis', href: EXTERNAL_LISTINGS_URL, external: true },
  { label: 'Arrendar', href: '/alugar' },
  { label: 'Sobre nós', href: '/sobre-nos' },
  { label: 'Contacto', href: '/contacto' },
];

export const primaryCta = { label: 'Pedir avaliação', href: '/#vender' } as const;

// Zonas moved to src/content/zonas.ts (single content source).

// Trust strip (homepage). HONEST by design — qualitative, brand-true claims,
// NO invented track-record figures. When the team supplies real, verifiable
// numbers (anos de atividade, imóveis comercializados, volume, % recomendação),
// swap a `value` here for the real figure, e.g. { value: '[INSERIR NÚMERO REAL]',
// label: 'imóveis comercializados', note: '…' }.
export const stats = [
  { value: 'Premium', label: 'Segmento de luxo', note: 'Especialistas no Porto' },
  { value: 'Curadoria', label: 'Seleção criteriosa', note: 'Poucos imóveis de cada vez' },
  { value: 'Discrição', label: 'Confidencial', note: 'Em cada etapa do processo' },
  { value: 'RE/MAX', label: 'Collection®', note: 'Rede global, equipa local' },
] as const;

// Stats bar under the Zonas map. Honest, brand-true content — NO invented
// market figures. `countTo` (optional) enables a count-up only where the number
// is real & verifiable (8 zonas). When the team supplies real, defensible
// metrics (e.g. nº de imóveis, valorização média a 3 anos), swap them in here.
export const zonasStats = [
  { icon: 'pin', value: '8', countTo: 8, label: 'Zonas selecionadas' },
  { icon: 'diamond', value: 'Curadoria', label: 'Imóveis por seleção' },
  { icon: 'shield-check', value: 'Confidencial', label: 'Em cada etapa' },
  { icon: 'sparkle', value: 'Vintage', label: 'Carácter raro' },
] as const;

export const methodSteps = [
  { num: '01', name: 'Curadoria', icon: 'search', text: 'Entendemos o imóvel, o contexto e o seu potencial real.' },
  { num: '02', name: 'Avaliação', icon: 'target', text: 'Análise estratégica para posicionar com clareza e confiança.' },
  { num: '03', name: 'Estratégia', icon: 'strategy', text: 'Criamos uma narrativa distinta para o público certo.' },
  { num: '04', name: 'Apresentação', icon: 'camera', text: 'Apresentamos com excelência através de imagem e experiência.' },
  { num: '05', name: 'Negociação', icon: 'handshake', text: 'Gerimos o processo com discrição, rigor e foco no resultado.' },
] as const;

// Testemunhos: REMOVIDOS do site (2026-07-10). Os 12 testemunhos anteriores
// eram ilustrativos (inventados) e não podem ser publicados como reais.
// Quando existirem testemunhos reais COM AUTORIZAÇÃO ESCRITA do cliente,
// reintroduzir aqui e repor as secções em index.astro / sobre-nos.astro.

// Editorial "Sobre" moment — the house, not a fabricated individual (no fake headshots).
export const about = {
  eyebrow: 'A casa',
  title: 'Uma equipa pequena, por opção.',
  paragraphs: [
    'A Collection Vintage nasceu da convicção de que os imóveis verdadeiramente distintos do Porto merecem um acompanhamento à sua altura — pessoal, discreto e sem pressa.',
    'Trabalhamos um número limitado de propriedades de cada vez. É isso que nos permite conhecer cada imóvel a fundo, posicioná-lo com rigor e negociar sempre a partir de uma posição de força.',
  ],
  signature: 'A equipa Collection Vintage',
} as const;

// "Escolha o seu caminho" — dual-journey section (sell vs buy).
// Illustration is rendered in the component, keyed by `variant`.
export const journeys = [
  {
    id: 'vender',
    variant: 'seller',
    label: 'Jornada de venda',
    titleLead: 'Tenho um imóvel',
    emphasisPrefix: 'para ',
    emphasis: 'vender',
    description: 'Apresentamos o seu imóvel ao mercado com estratégia, discrição e o posicionamento certo.',
    features: [
      { icon: 'target', label: ['Avaliação', 'estratégica'] },
      { icon: 'strategy', label: ['Plano de', 'comercialização'] },
      { icon: 'camera', label: ['Apresentação', 'ao mercado'] },
      { icon: 'handshake', label: ['Acompanhamento', 'até à venda'] },
    ],
    cta: { label: 'Pedir avaliação', href: '/#vender' },
    micro: 'Confidencial · Sem compromisso',
  },
  {
    id: 'comprar',
    variant: 'buyer',
    label: 'Jornada de compra',
    titleLead: 'Procuro um imóvel',
    emphasisPrefix: 'para ',
    emphasis: 'comprar',
    description: 'Encontramos o imóvel certo para o seu estilo de vida, objetivos e investimento.',
    features: [
      { icon: 'users', label: ['Compreensão', 'das suas necessidades'] },
      { icon: 'heart', label: ['Seleção', 'personalizada'] },
      { icon: 'eye', label: ['Visitas', 'qualificadas'] },
      { icon: 'handshake', label: ['Negociação', 'e apoio total'] },
    ],
    cta: { label: 'Explorar imóveis', href: EXTERNAL_LISTINGS_URL, external: true },
    micro: 'Confidencial · Sem compromisso',
  },
] as const;
