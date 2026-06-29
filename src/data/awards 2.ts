// ============================================================
// Prémios & credibilidade — RE/MAX Portugal (rede).
//
// HONESTY: these awards belong to the RE/MAX Portugal NETWORK, not exclusively
// to the Collection Vintage agency. All copy frames it as "fazemos parte da rede
// mais premiada" — never "os nossos prémios". Do not overstate.
//
// PLACEHOLDER(seals): the award seals arrived only as a chat screenshot and are
// NOT on disk yet, so every `image` is null and the card renders a dignified
// text lockup (no broken image). To light up the real seals, drop transparent
// PNGs/WebP under /public/images/awards/<slug>.webp and set `image` to
// `/images/awards/<slug>` (without extension). Target ≤30 KB each.
// ============================================================

export interface Award {
  /** kebab-case id, also the image filename stem under /images/awards/. */
  slug: string;
  /** Award name, European Portuguese. */
  name: string;
  /** Year label (e.g. '2026'). */
  year: string;
  /** Short issuer/context line for the text fallback. */
  issuer: string;
  /**
   * Image path WITHOUT extension (e.g. '/images/awards/superbrands-2026').
   * null → dignified text lockup fallback (no broken image).
   */
  image: string | null;
}

export interface AwardStat {
  value: string;
  label: string;
}

// Ordered by visual prestige (per the design brief).
export const awards: Award[] = [
  { slug: 'escolha-consumidor-2026',  name: 'Escolha do Consumidor', year: '2026', issuer: 'Nº 1 · Agências Imobiliárias', image: null },
  { slug: 'superbrands-2026',         name: 'Superbrands Portugal',  year: '2026', issuer: 'Eleita pelos consumidores',   image: null },
  { slug: 'best-work-experience-2026', name: 'Best Work Experience',  year: '2026', issuer: 'Of the Year',                 image: null },
  { slug: 'cinco-estrelas-2026',      name: 'Prémio Cinco Estrelas', year: '2026', issuer: 'Rede de franchising',         image: null },
  { slug: 'best-tech-experience-2026', name: 'Best Tech Experience',  year: '2026', issuer: 'Consumer Award',             image: null },
  { slug: 'produto-ano-2025',         name: 'Eleito Produto do Ano', year: '2025', issuer: 'Inovação premiada',           image: null },
  { slug: 'cinco-estrelas-2025',      name: 'Prémio Cinco Estrelas', year: '2025', issuer: 'Rede de franchising',         image: null },
  { slug: 'escolha-sustentavel-2026', name: 'Escolha Sustentável',   year: '2026', issuer: 'RE/MAX',                      image: null },
  { slug: 'melhor-loja-2026',         name: 'A Melhor Loja',         year: '2026', issuer: 'Imobiliárias · RE/MAX',       image: null },
];

// Real, network-level figures used in the credibility strip on /sobre-nos.
export const awardStats: AwardStat[] = [
  { value: '26 anos',                 label: 'De liderança no mercado português' },
  { value: 'Nº 1',                    label: 'Escolha do Consumidor 2026' },
  { value: '2× Prémio Cinco Estrelas', label: '2025 e 2026' },
];

export const awardsBeltCopy = {
  ariaLabel: 'Prémios RE/MAX Portugal',
  eyebrow: 'RE/MAX Portugal · 26 anos de liderança',
  tagline: 'A marca imobiliária mais premiada de Portugal.',
} as const;

export const awardsGridCopy = {
  eyebrow: 'Reconhecimento',
  headline: '26 anos a ser escolhidos pelos melhores.',
  subtitle:
    'Os prémios que a RE/MAX Portugal conquistou em 2025 e 2026 refletem o compromisso com a ' +
    'excelência que cada agência da rede representa — incluindo a RE/MAX Collection Vintage no Porto.',
  cta: { label: 'Conheça a rede RE/MAX Collection®', href: 'https://www.remax.pt/collection' },
} as const;
