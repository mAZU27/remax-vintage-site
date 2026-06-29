// ============================================================
// Property listings — illustrative placeholder data.
// TODO(listings): replace with real inventory + photography before launch.
// Photos are placeholder property shots under /public/images/imoveis/ —
// one fitting image per listing, NOT the real homes. Swap when authorised
// per-property photo sets exist.
// ============================================================

export type PropertyStatus = 'disponivel' | 'reservado' | 'vendido';

export interface Property {
  slug: string;
  ref: string;
  title: string;
  neighborhood: string; // matches neighborhoods[].slug (or a region slug outside the 4 zones)
  neighborhoodName: string;
  region?: string; // location suffix on cards; defaults to 'Porto'. Use 'Douro' for quintas.
  type: string; // T2, T3, Moradia…
  price: number | null; // null → "Sob consulta"
  status: PropertyStatus;
  badge?: string;
  beds: number;
  baths: number;
  area: number; // m² gross
  energy: string; // energy certificate letter
  year: number;
  image: string;
  gallery?: string[]; // extra detail-page photos; falls back to a generic interior pool
  blurb: string;
  description: string[];
  features: string[];
  featured?: boolean;
}

export const properties: Property[] = [
  {
    slug: 'foz-apartamento-beira-mar',
    ref: 'CV-1042',
    title: 'Apartamento à beira-mar',
    neighborhood: 'foz-do-douro',
    neighborhoodName: 'Foz do Douro',
    type: 'T3',
    price: 1450000,
    status: 'disponivel',
    badge: 'Vista mar',
    beds: 3,
    baths: 2,
    area: 185,
    energy: 'B',
    year: 2019,
    image: '/images/imoveis/imovel-terraco-rio.webp',
    blurb: 'Luz atlântica, varanda corrida e a primeira linha de mar à porta.',
    description: [
      'Um T3 sereno e luminoso na primeira linha da Foz, com a frente virada ao Atlântico e uma varanda corrida que acompanha toda a zona social.',
      'A reabilitação de 2019 preservou a proporção generosa dos espaços e introduziu acabamentos contemporâneos discretos — madeira natural, pedra clara e caixilharia de alto desempenho.',
    ],
    features: ['Vista mar frontal', 'Varanda corrida', 'Garagem para 2 carros', 'Cozinha equipada Gaggenau', 'Ar condicionado por conduta'],
    featured: true,
  },
  {
    slug: 'ribeira-edificio-historico',
    ref: 'CV-0987',
    title: 'Edifício histórico recuperado',
    neighborhood: 'ribeira',
    neighborhoodName: 'Ribeira',
    type: 'T4',
    price: 2200000,
    status: 'disponivel',
    badge: 'Património',
    beds: 4,
    baths: 3,
    area: 240,
    energy: 'C',
    year: 2021,
    image: '/images/imoveis/imovel-fachada-varanda.webp',
    blurb: 'Pedra granítica, vista rio e uma recuperação que respeita o original.',
    description: [
      'Um edifício de autor na malha histórica da Ribeira, recuperado com rigor patrimonial e uma sensibilidade rara ao detalhe.',
      'A fachada granítica e os tetos altos originais convivem com infraestruturas inteiramente novas — uma casa com alma antiga e conforto contemporâneo, sobre o Douro.',
    ],
    features: ['Vista rio', 'Fachada classificada', 'Tetos altos originais', 'Elevador privativo', 'Terraço panorâmico'],
    featured: true,
  },
  {
    slug: 'boavista-penthouse-contemporanea',
    ref: 'CV-1110',
    title: 'Penthouse contemporânea',
    neighborhood: 'boavista',
    neighborhoodName: 'Boavista',
    type: 'T4',
    price: 1850000,
    status: 'disponivel',
    badge: 'Cobertura',
    beds: 4,
    baths: 4,
    area: 210,
    energy: 'A',
    year: 2022,
    image: '/images/imoveis/imovel-sala-vista-rio.webp',
    blurb: 'Último piso, terraço envolvente e a cidade aos seus pés.',
    description: [
      'Cobertura de gaveto na Boavista, com terraço envolvente e exposição solar dupla — a opção certa para quem procura centralidade sem abdicar de privacidade.',
      'Classe energética A, domótica integrada e materiais nobres definem um espaço pensado para viver e receber em grande.',
    ],
    features: ['Terraço envolvente 90m²', 'Classe energética A', 'Domótica integrada', '3 lugares de garagem', 'Cozinha em ilha'],
    featured: true,
  },
  {
    slug: 'cedofeita-casa-de-autor',
    ref: 'CV-0921',
    title: 'Casa de autor',
    neighborhood: 'cedofeita',
    neighborhoodName: 'Cedofeita',
    type: 'T3',
    price: 980000,
    status: 'reservado',
    badge: 'Reservado',
    beds: 3,
    baths: 2,
    area: 165,
    energy: 'B',
    year: 2020,
    image: '/images/imoveis/imovel-entrada-pedra.webp',
    blurb: 'Reabilitação assinada no coração cultural do Porto.',
    description: [
      'Uma casa de gaveto em Cedofeita, reabilitada por atelier de referência, onde o betão aparente dialoga com a madeira e a luz zenital.',
      'Pátio interior ajardinado e um piso superior dedicado a suíte fazem desta uma morada urbana com a tranquilidade de um refúgio.',
    ],
    features: ['Pátio ajardinado', 'Luz zenital', 'Suíte no último piso', 'Projeto de arquitetura premiado'],
  },
  {
    slug: 'foz-moradia-com-jardim',
    ref: 'CV-0850',
    title: 'Moradia com jardim',
    neighborhood: 'foz-do-douro',
    neighborhoodName: 'Foz do Douro',
    type: 'Moradia T5',
    price: 3400000,
    status: 'disponivel',
    badge: 'Exclusivo',
    beds: 5,
    baths: 5,
    area: 380,
    energy: 'A',
    year: 2018,
    image: '/images/imoveis/imovel-villa-jardim.webp',
    blurb: 'Privacidade absoluta, jardim maduro e piscina, a passos do mar.',
    description: [
      'Uma moradia independente numa das ruas mais discretas da Foz, com jardim maduro, piscina aquecida e um pé-direito que respira.',
      'Concebida para a vida em família e para receber, distribui-se por três pisos com zonas sociais amplas e suítes privativas voltadas ao jardim.',
    ],
    features: ['Jardim privado maduro', 'Piscina aquecida', 'Garagem para 4 carros', 'Suíte master 45m²', 'Adega climatizada'],
    featured: true,
  },
  {
    slug: 'ribeira-loft-sobre-o-rio',
    ref: 'CV-1075',
    title: 'Loft sobre o rio',
    neighborhood: 'ribeira',
    neighborhoodName: 'Ribeira',
    type: 'T1',
    price: 720000,
    status: 'disponivel',
    badge: 'Vista rio',
    beds: 1,
    baths: 1,
    area: 95,
    energy: 'B',
    year: 2021,
    image: '/images/imoveis/imovel-panorama-rio.webp',
    blurb: 'Pé-direito duplo e o Douro emoldurado pela janela.',
    description: [
      'Um loft de pé-direito duplo sobre a frente ribeirinha, com uma janela monumental que transforma o rio em quadro permanente.',
      'Solução ideal como pied-à-terre no Porto ou investimento de prestígio em zona de procura constante.',
    ],
    features: ['Pé-direito duplo', 'Vista rio frontal', 'Mezzanine', 'Totalmente mobilado por designer'],
  },
  {
    slug: 'douro-quinta-com-vinha',
    ref: 'CV-1188',
    title: 'Quinta com vinha',
    neighborhood: 'douro',
    neighborhoodName: 'Cima Corgo',
    region: 'Douro',
    type: 'Quinta T6',
    price: 2950000,
    status: 'disponivel',
    badge: 'Vinha própria',
    beds: 6,
    baths: 5,
    area: 620,
    energy: 'C',
    year: 2016,
    image: '/images/imoveis/quinta-douro-vinhas.jpg',
    gallery: [
      '/images/imoveis/quinta-douro-sala.jpg',
      '/images/imoveis/quinta-douro-suite.jpg',
      '/images/imoveis/quinta-douro-adega.jpg',
    ],
    blurb: 'Vinha em produção, casa senhorial recuperada e o vale do Douro até onde a vista alcança.',
    description: [
      'Uma quinta vinhateira sobre as encostas do Douro, com a casa senhorial recuperada com mão sábia e a vinha em plena produção — uma propriedade que se vive e que dá fruto.',
      'No interior, a pedra, a madeira e os tetos altos originais convivem com o conforto contemporâneo; lá fora, a adega abobadada, o olival e uma zona social virada ao vale completam um refúgio raro, a pouco mais de uma hora do Porto.',
    ],
    features: ['Vinha em produção', 'Adega abobadada', 'Casa senhorial recuperada', 'Olival e terreno com vários hectares', 'Vista sobre o vale', 'Lareira em pedra'],
    featured: true,
  },
];

export const propertyTypes = ['Todos', 'Apartamento', 'Moradia', 'Penthouse', 'Loft'] as const;

// Coarse category used by the listing/homepage filters, derived from title/type.
// Single source of truth so /imoveis, the homepage section and cards agree.
export function categoryOf(p: Property): string {
  const t = `${p.title} ${p.type}`.toLowerCase();
  if (t.includes('moradia') || t.includes('quinta')) return 'Moradia';
  if (t.includes('penthouse')) return 'Penthouse';
  if (t.includes('loft')) return 'Loft';
  return 'Apartamento';
}

export function formatPrice(price: number | null): string {
  if (price === null) return 'Sob consulta';
  return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);
}

export const statusLabel: Record<PropertyStatus, string> = {
  disponivel: 'Disponível',
  reservado: 'Reservado',
  vendido: 'Vendido',
};
