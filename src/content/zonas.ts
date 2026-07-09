// ============================================================
// Zonas de eleição — single content source for the Zonas section
// (cards + interactive map), the valuation forms' zone selects and
// the support assistant.
//
// Zones I–IV are the house signature (content unchanged from the
// original site.ts data). Zones V–VIII were added from the owner's
// approved copy deck (mission appendix) — the ONLY permitted source.
// `procura` labels are qualitative and flagged confirmar:true until
// the agency signs them off; price is ALWAYS «Sob consulta» (no
// invented market figures).
//
// `opcional: true` zones are PREPARED BUT DISABLED — they await an
// agency decision and are filtered out of every consumer via
// `zonas` (the active list). Antas (in-city classic) and Matosinhos
// Sul (outside the Porto municipality — brand decision pending).
// ============================================================

export interface Zona {
  id: string;
  numeral: string;
  nome: string;
  /** Card kicker, e.g. "Porto · Atlântico". */
  kicker: string;
  descricao: string;
  /** Exactly 3 feature tags with a thin-line icon each. */
  tags: readonly { icon: string; label: string }[];
  /** Card glyph (top-right thin-line icon). */
  icone: string;
  /** Tooltip price — always «Sob consulta» (never an invented figure). */
  preco: string;
  /** Qualitative demand label; confirmar:true → pending agency sign-off. */
  procura: string;
  confirmarProcura?: boolean;
  slug: string;
  /** Map pin position, % of the map box. */
  x: number;
  y: number;
  image?: string;
  /** Prepared but disabled — awaiting agency decision. */
  opcional?: boolean;
}

const todas: readonly Zona[] = [
  // ---- I–IV · the house signature (unchanged) ----------------------------
  {
    id: 'foz-do-douro',
    numeral: 'I',
    nome: 'Foz do Douro',
    kicker: 'Porto · Atlântico',
    icone: 'compass',
    descricao: 'Privacidade, proximidade ao mar e uma procura naturalmente seletiva.',
    preco: 'Sob consulta',
    procura: 'Seletiva',
    tags: [
      { icon: 'eye', label: 'Vista mar' },
      { icon: 'diamond', label: 'Luxo discreto' },
      { icon: 'compass', label: 'Baixa densidade' },
    ],
    slug: 'foz-do-douro',
    x: 28,
    y: 60,
    image: '/images/porto/porto-foz-promenade.webp',
  },
  {
    id: 'boavista',
    numeral: 'II',
    nome: 'Boavista',
    kicker: 'Porto · Centro',
    icone: 'building',
    descricao: 'Centralidade, conveniência e imóveis com forte potencial residencial e empresarial.',
    preco: 'Sob consulta',
    procura: 'Elevada',
    tags: [
      { icon: 'pin', label: 'Central' },
      { icon: 'building', label: 'Infraestruturas' },
      { icon: 'users', label: 'Forte procura' },
    ],
    slug: 'boavista',
    x: 70,
    y: 34,
    image: '/images/porto/porto-aliados.webp',
  },
  {
    id: 'ribeira',
    numeral: 'III',
    nome: 'Ribeira',
    kicker: 'Porto · Histórico',
    icone: 'diamond',
    descricao: 'História, vista rio e imóveis com carácter difícil de replicar.',
    preco: 'Sob consulta',
    procura: 'Património',
    tags: [
      { icon: 'award', label: 'Património' },
      { icon: 'compass', label: 'Turismo seletivo' },
      { icon: 'briefcase', label: 'Investimento' },
    ],
    slug: 'ribeira',
    x: 55,
    y: 72,
    image: '/images/porto/porto-ribeira-barcos.webp',
  },
  {
    id: 'cedofeita',
    numeral: 'IV',
    nome: 'Cedofeita',
    kicker: 'Porto · Cultural',
    icone: 'sparkle',
    descricao: 'Identidade urbana, cultura e procura crescente por imóveis distintos.',
    preco: 'Sob consulta',
    procura: 'Crescente',
    tags: [
      { icon: 'sparkle', label: 'Cultura' },
      { icon: 'diamond', label: 'Design' },
      { icon: 'heart', label: 'Estilo de vida' },
    ],
    slug: 'cedofeita',
    x: 50,
    y: 45,
    image: '/images/porto/porto-rua-classica.webp',
  },

  // ---- V–VIII · new territories (owner-approved copy deck) ---------------
  {
    id: 'nevogilde',
    numeral: 'V',
    nome: 'Nevogilde',
    kicker: 'Porto · Residencial',
    icone: 'lock',
    descricao: 'Moradias reservadas entre o Parque da Cidade e o mar, onde a discrição é o verdadeiro luxo.',
    preco: 'Sob consulta',
    procura: 'Elevada',
    confirmarProcura: true,
    tags: [
      { icon: 'key', label: 'Moradias' },
      { icon: 'heart', label: 'Parque da Cidade' },
      { icon: 'lock', label: 'Privacidade' },
    ],
    slug: 'nevogilde',
    x: 13,
    y: 29,
  },
  {
    id: 'lordelo-massarelos',
    numeral: 'VI',
    nome: 'Lordelo do Ouro & Massarelos',
    kicker: 'Porto · Serralves',
    icone: 'bookmark',
    descricao: 'Entre Serralves e o rio Douro, arquitetura de autor e uma elegância que dispensa anúncio.',
    preco: 'Sob consulta',
    procura: 'Elevada',
    confirmarProcura: true,
    tags: [
      { icon: 'sparkle', label: 'Serralves' },
      { icon: 'eye', label: 'Vista rio' },
      { icon: 'award', label: 'Arquitetura de autor' },
    ],
    slug: 'lordelo-massarelos',
    x: 27,
    y: 78,
  },
  {
    id: 'bonfim',
    numeral: 'VII',
    nome: 'Bonfim',
    kicker: 'Porto · Em transformação',
    icone: 'bolt',
    descricao: 'O lado criativo do Porto: prédios com carácter, reabilitação cuidada e uma energia nova em ruas antigas.',
    preco: 'Sob consulta',
    procura: 'Crescente',
    confirmarProcura: true,
    tags: [
      { icon: 'strategy', label: 'Reabilitação' },
      { icon: 'diamond', label: 'Carácter' },
      { icon: 'briefcase', label: 'Investimento' },
    ],
    slug: 'bonfim',
    x: 86,
    y: 53,
  },
  {
    id: 'baixa-aliados',
    numeral: 'VIII',
    nome: 'Baixa & Aliados',
    kicker: 'Porto · Monumental',
    icone: 'bank',
    descricao: 'Fachadas imponentes, pés-direitos generosos e endereços que fazem parte da história da cidade.',
    preco: 'Sob consulta',
    procura: 'Elevada',
    confirmarProcura: true,
    tags: [
      { icon: 'bank', label: 'Centro cívico' },
      { icon: 'award', label: 'Prestígio' },
      { icon: 'pin', label: 'Endereço histórico' },
    ],
    slug: 'baixa-aliados',
    x: 71,
    y: 66,
  },

  // ---- OPCIONAIS · prepared, DISABLED — awaiting agency decision ----------
  // Antas: in-city classic residencial. Enable by flipping `opcional`.
  {
    id: 'antas',
    numeral: 'IX',
    nome: 'Antas',
    kicker: 'Porto · Clássico residencial',
    icone: 'building',
    descricao: 'A elegância tranquila do Porto de sempre: avenidas largas, prédios sólidos e vida de bairro consolidada.',
    preco: 'Sob consulta',
    procura: 'Estável',
    confirmarProcura: true,
    tags: [
      { icon: 'users', label: 'Familiar' },
      { icon: 'compass', label: 'Avenidas' },
      { icon: 'award', label: 'Tradição' },
    ],
    slug: 'antas',
    x: 88,
    y: 30,
    opcional: true,
  },
  // Matosinhos Sul: OUTSIDE the Porto municipality — brand decision pending.
  {
    id: 'matosinhos-sul',
    numeral: 'X',
    nome: 'Matosinhos Sul',
    kicker: 'Matosinhos · Beira-mar',
    icone: 'compass',
    descricao: 'Urbanismo contemporâneo à beira-mar, entre a praia e algumas das melhores mesas da região.',
    preco: 'Sob consulta',
    procura: 'Elevada',
    confirmarProcura: true,
    tags: [
      { icon: 'eye', label: 'Praia' },
      { icon: 'building', label: 'Contemporâneo' },
      { icon: 'heart', label: 'Gastronomia' },
    ],
    slug: 'matosinhos-sul',
    x: 8,
    y: 22,
    opcional: true,
  },
] as const;

/** Active zones — every consumer uses this list (optionals filtered out). */
export const zonas = todas.filter((z) => !z.opcional);

/** Full list incl. disabled optionals (for tooling/QA only). */
export const zonasTodas = todas;
