// ============================================================
// Central site content & configuration.
// Content lives here (not in markup) so it is easy to maintain.
// Brand: RE/MAX Collection Vintage (gold/navy/cream). Do NOT
// rename — the "HEMAX" text in early mockups was AI hallucination.
// ============================================================

export const site = {
  name: 'RE/MAX Collection Vintage',
  shortName: 'Collection Vintage',
  brandLine: 'RE/MAX Collection® Vintage',
  logo: '/assets/remax-vintage-horizontal.png',
  tagline: 'A coleção mais rara do Porto.',
  description:
    'Imóveis vintage e premium no Porto — Foz, Cedofeita, Boavista e Ribeira. Avaliação confidencial e uma apresentação à altura de cada imóvel distinto.',
  // TODO(contacto): substituir pelos contactos reais antes do lançamento.
  phone: '+351 220 000 000',
  phoneHref: 'tel:+351220000000',
  email: 'collection@vintage.pt',
  whatsappHref: 'https://wa.me/351220000000',
  city: 'Porto, Portugal',
  // TODO(contacto): morada e horário reais antes do lançamento.
  address: ['Av. da Boavista 0000', '4100-000 Porto, Portugal'],
  hours: ['Segunda a Sexta', '09:00 – 18:00'],
  established: 2007,
  // TODO(social): substituir '#' pelos perfis reais antes do lançamento.
  social: [
    { label: 'Instagram', href: '#', icon: 'instagram' },
    { label: 'LinkedIn', href: '#', icon: 'linkedin' },
    { label: 'YouTube', href: '#', icon: 'youtube' },
    { label: 'Facebook', href: '#', icon: 'facebook' },
  ],
} as const;

export interface NavItem {
  label: string;
  href: string;
  highlight?: boolean;
}

export const nav: NavItem[] = [
  { label: 'Imóveis', href: '/imoveis' },
  { label: 'Zonas', href: '/#zonas' },
  { label: 'Método', href: '/#metodo' },
  { label: 'Vender', href: '/#vender', highlight: true },
  { label: 'Alugar', href: '/alugar' },
  { label: 'Sobre nós', href: '/sobre-nos' },
  { label: 'Blog', href: '/insights' },
  { label: 'Carreiras', href: '/carreiras' },
  { label: 'Contacto', href: '/contacto' },
];

export const primaryCta = { label: 'Pedir avaliação', href: '/#vender' } as const;

// Zonas section data. `x`/`y` are pin positions as % of the map box.
// `num` is the roman numeral shown on the pin and card.
// NOTE(price): "Sob consulta" é um placeholder honesto — não inventamos €/m².
// Substituir por preço médio real por zona quando a equipa o fornecer e validar.
export const neighborhoods = [
  {
    slug: 'foz-do-douro',
    num: 'I',
    name: 'Foz do Douro',
    context: 'Porto · Atlântico',
    glyph: 'compass',
    blurb: 'Privacidade, proximidade ao mar e uma procura naturalmente seletiva.',
    price: 'Sob consulta',
    demand: 'Seletiva',
    features: [
      { icon: 'eye', label: 'Vista mar' },
      { icon: 'diamond', label: 'Luxo discreto' },
      { icon: 'compass', label: 'Baixa densidade' },
    ],
    x: 28,
    y: 60,
    image: '/images/porto/porto-foz-promenade.webp',
  },
  {
    slug: 'boavista',
    num: 'II',
    name: 'Boavista',
    context: 'Porto · Centro',
    glyph: 'building',
    blurb: 'Centralidade, conveniência e imóveis com forte potencial residencial e empresarial.',
    price: 'Sob consulta',
    demand: 'Elevada',
    features: [
      { icon: 'pin', label: 'Central' },
      { icon: 'building', label: 'Infraestruturas' },
      { icon: 'users', label: 'Forte procura' },
    ],
    x: 70,
    y: 34,
    image: '/images/porto/porto-aliados.webp',
  },
  {
    slug: 'ribeira',
    num: 'III',
    name: 'Ribeira',
    context: 'Porto · Histórico',
    glyph: 'diamond',
    blurb: 'História, vista rio e imóveis com carácter difícil de replicar.',
    price: 'Sob consulta',
    demand: 'Património',
    features: [
      { icon: 'award', label: 'Património' },
      { icon: 'compass', label: 'Turismo seletivo' },
      { icon: 'briefcase', label: 'Investimento' },
    ],
    x: 55,
    y: 72,
    image: '/images/porto/porto-ribeira-barcos.webp',
  },
  {
    slug: 'cedofeita',
    num: 'IV',
    name: 'Cedofeita',
    context: 'Porto · Cultural',
    glyph: 'sparkle',
    blurb: 'Identidade urbana, cultura e procura crescente por imóveis distintos.',
    price: 'Sob consulta',
    demand: 'Crescente',
    features: [
      { icon: 'sparkle', label: 'Cultura' },
      { icon: 'diamond', label: 'Design' },
      { icon: 'heart', label: 'Estilo de vida' },
    ],
    x: 50,
    y: 45,
    image: '/images/porto/porto-rua-classica.webp',
  },
] as const;

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
// is real & verifiable (4 zonas). When the team supplies real, defensible
// metrics (e.g. nº de imóveis, valorização média a 3 anos), swap them in here.
export const zonasStats = [
  { icon: 'pin', value: '4', countTo: 4, label: 'Zonas selecionadas' },
  { icon: 'diamond', value: 'Curadoria', label: 'Imóveis por seleção' },
  { icon: 'shield-check', value: 'Confidencial', label: 'Em cada etapa' },
  { icon: 'sparkle', value: 'Vintage', label: 'Carácter raro' },
] as const;

export const methodSteps = [
  { num: '01', name: 'Curação', icon: 'search', text: 'Entendemos o imóvel, o contexto e o seu potencial real.' },
  { num: '02', name: 'Avaliação', icon: 'target', text: 'Análise estratégica para posicionar com clareza e confiança.' },
  { num: '03', name: 'Estratégia', icon: 'strategy', text: 'Criamos uma narrativa distinta para o público certo.' },
  { num: '04', name: 'Apresentação', icon: 'camera', text: 'Apresentamos com excelência através de imagem e experiência.' },
  { num: '05', name: 'Negociação', icon: 'handshake', text: 'Gerimos o processo com discrição, rigor e foco no resultado.' },
] as const;

// `theme`, `location` and `icon` drive the premium carousel (components/Testimonials.astro):
//   theme    — short editorial tag rendered as an uppercase pill
//   location — place tag (uppercased in CSS); `context` is kept for the /sobre-nos grid
//   icon     — Porto line-art engraving: 'bridge' | 'facade' | 'tower'
export const testimonials = [
  {
    quote:
      'Venderam a nossa casa da Foz acima do que esperávamos e sem nunca expor a nossa privacidade. Discrição e resultado — foi exatamente o que procurávamos.',
    name: 'Helena & Rui M.',
    context: 'Venderam na Foz do Douro',
    theme: 'Discrição',
    location: 'Foz do Douro, Porto',
    icon: 'bridge',
  },
  {
    quote:
      'Procurávamos algo com carácter e encontraram-no antes sequer de chegar ao mercado. O acompanhamento foi impecável, do primeiro contacto à escritura.',
    name: 'António V.',
    context: 'Comprou na Ribeira',
    theme: 'Exclusividade',
    location: 'Ribeira, Porto',
    icon: 'facade',
  },
  {
    quote:
      'Profissionalismo raro. Cada detalhe da apresentação do imóvel foi pensado — e isso refletiu-se claramente no valor final da negociação.',
    name: 'Marta S.',
    context: 'Vendeu na Boavista',
    theme: 'Apresentação Premium',
    location: 'Boavista, Porto',
    icon: 'tower',
  },
  {
    quote:
      'Mostraram-nos uma casa que nunca chegou a estar anunciada. Era exatamente o que sonhávamos — e nem sabíamos que existia.',
    name: 'Carolina & Miguel P.',
    context: 'Compraram em Nevogilde',
    theme: 'Exclusividade',
    location: 'Foz do Douro, Porto',
    icon: 'bridge',
  },
  {
    quote:
      'A forma como apresentaram o apartamento elevou tudo. Senti que estavam a vender uma história, não apenas metros quadrados.',
    name: 'Sofia A.',
    context: 'Vendeu na Foz Velha',
    theme: 'Apresentação Premium',
    location: 'Ribeira, Porto',
    icon: 'facade',
  },
  {
    quote:
      'Conhecem o mercado do Porto como ninguém. Pouparam-me meses de procura e ajudaram-me a perceber o valor real de cada zona.',
    name: 'João R.',
    context: 'Comprou em Lordelo do Ouro',
    theme: 'Conhecimento de Mercado',
    location: 'Boavista, Porto',
    icon: 'tower',
  },
  {
    quote:
      'Queríamos um imóvel com alma, no coração do Porto. Souberam ouvir o que procurávamos e levaram-nos diretamente a ele.',
    name: 'Inês & Duarte C.',
    context: 'Compraram no Centro Histórico',
    theme: 'Escuta Atenta',
    location: 'Centro Histórico, Porto',
    icon: 'facade',
  },
  {
    quote:
      'Na negociação fizeram toda a diferença. Defenderam o valor da casa com serenidade e firmeza, e o resultado superou as expectativas.',
    name: 'Teresa F.',
    context: 'Vendeu na Avenida da Boavista',
    theme: 'Negociação',
    location: 'Av. da Boavista, Porto',
    icon: 'tower',
  },
  {
    quote:
      'Nunca senti pressão. Deram-me tempo, espaço e informação para decidir com confiança. Uma experiência rara nos dias que correm.',
    name: 'Luís M.',
    context: 'Comprou em Miramar',
    theme: 'Acompanhamento',
    location: 'Miramar',
    icon: 'bridge',
  },
  {
    quote:
      'Aconselharam-me a esperar pelo momento certo em vez de vender à pressa. Esse conselho honesto valeu cada semana de espera.',
    name: 'Beatriz L.',
    context: 'Vendeu em Vila Nova de Gaia',
    theme: 'Aconselhamento',
    location: 'Vila Nova de Gaia',
    icon: 'tower',
  },
  {
    quote:
      'Estávamos a mudar-nos do estrangeiro e trataram de tudo à distância, com uma clareza e um cuidado que nos deram total tranquilidade.',
    name: 'Pedro & Ana T.',
    context: 'Compraram no Porto',
    theme: 'Acompanhamento',
    location: 'Porto',
    icon: 'facade',
  },
  {
    quote:
      'Comunicação impecável do início ao fim. Sempre soube em que ponto estava o processo. Confiança total, sem qualquer reserva.',
    name: 'Clara M.',
    context: 'Vendeu em Matosinhos Sul',
    theme: 'Comunicação',
    location: 'Matosinhos Sul',
    icon: 'bridge',
  },
] as const;
// NOTE(testimonials): placeholder — 12 testemunhos ilustrativos. Substituir por
// testemunhos reais com autorização do cliente; os campos theme/location são
// editoriais e devem ser revistos quando os testemunhos forem reais.

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
    cta: { label: 'Explorar imóveis', href: '/imoveis' },
    micro: 'Confidencial · Sem compromisso',
  },
] as const;
