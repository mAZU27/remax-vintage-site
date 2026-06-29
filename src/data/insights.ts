// ============================================================
// Editorial / insights content — illustrative placeholder copy.
// TODO(content): replace with real articles + author photos.
// ============================================================

export interface Article {
  slug: string;
  title: string;
  category: 'Mercado' | 'Zonas' | 'Guias' | 'Estilo de vida';
  excerpt: string;
  date: string; // ISO
  readingTime: number; // minutes
  author: string;
  image: string;
  featured?: boolean;
  body: { heading?: string; paragraphs: string[] }[];
}

export const articles: Article[] = [
  {
    slug: 'mercado-premium-porto-2026',
    title: 'O mercado premium do Porto em 2026',
    category: 'Mercado',
    excerpt: 'Onde está a procura, como evoluem os valores por zona e o que esperar do segmento de luxo no próximo ano.',
    date: '2026-05-18',
    readingTime: 6,
    author: 'Equipa Collection Vintage',
    image: '/images/porto/porto-ponte-luis-noite.jpg',
    featured: true,
    body: [
      {
        paragraphs: [
          'O segmento premium do Porto entrou numa fase de maturidade. Depois de anos de valorização acentuada, o mercado estabilizou num patamar onde a qualidade do imóvel — e não apenas a localização — passou a determinar o valor final.',
          'Esta nota reúne a leitura da nossa equipa sobre a procura, a oferta e os fatores que, em 2026, separam um imóvel que se vende de um imóvel que se vende bem.',
        ],
      },
      {
        heading: 'A procura concentra-se na qualidade',
        paragraphs: [
          'O comprador premium do Porto é hoje mais informado e mais exigente. Procura imóveis prontos, com eficiência energética, luz natural e uma narrativa clara — e está disposto a esperar pela propriedade certa.',
          'Em contrapartida, imóveis que exigem obra ou apresentam compromissos de luz e privacidade enfrentam negociações mais longas e ajustes de valor.',
        ],
      },
      {
        heading: 'O que esperar no próximo ano',
        paragraphs: [
          'Antecipamos uma valorização moderada e seletiva, liderada pela Foz e pelos eixos ribeirinhos com vista protegida. A escassez de produto verdadeiramente distinto deverá manter a tensão entre procura e oferta no topo do mercado.',
        ],
      },
    ],
  },
  {
    slug: 'foz-do-douro-guia-da-zona',
    title: 'Foz do Douro: guia de uma zona à beira-mar',
    category: 'Zonas',
    excerpt: 'Privacidade, luz atlântica e uma procura naturalmente seletiva — porque a Foz continua a ser a morada mais desejada do Porto.',
    date: '2026-04-30',
    readingTime: 5,
    author: 'Equipa Collection Vintage',
    image: '/images/porto/porto-foz-promenade.webp',
    featured: true,
    body: [
      {
        paragraphs: [
          'A Foz do Douro é, há décadas, o endereço mais cobiçado do Porto. A combinação de frente de mar, ruas arborizadas e uma comunidade discreta criou um mercado que se rege por regras próprias.',
        ],
      },
      {
        heading: 'Porque a procura é tão seletiva',
        paragraphs: [
          'A oferta na primeira linha é finita e raramente chega ao mercado aberto. Muitas das melhores transações acontecem com discrição, antes de qualquer anúncio — razão pela qual a relação e a confiança valem tanto quanto o portefólio.',
        ],
      },
    ],
  },
  {
    slug: 'vender-imovel-premium-sem-pressa',
    title: 'Como vender um imóvel premium sem pressa (e por mais)',
    category: 'Guias',
    excerpt: 'O tempo é um ativo. Um guia sobre posicionamento, apresentação e negociação no topo do mercado.',
    date: '2026-04-12',
    readingTime: 7,
    author: 'Equipa Collection Vintage',
    image: '/images/porto/editorial-curadoria.webp',
    body: [
      {
        paragraphs: [
          'Vender bem um imóvel distinto raramente é uma questão de velocidade. É uma questão de preparação: posicionar o imóvel para o comprador certo e dar-lhe todas as razões para não negociar o valor.',
        ],
      },
      {
        heading: 'Começa antes do anúncio',
        paragraphs: [
          'A apresentação — fotografia, vídeo, staging e uma narrativa honesta — é o que transforma um imóvel num objeto de desejo. Quando o trabalho de base está feito, a negociação parte de uma posição de força.',
        ],
      },
    ],
  },
  {
    slug: 'viver-no-porto-arte-de-receber',
    title: 'Viver no Porto: a arte de receber',
    category: 'Estilo de vida',
    excerpt: 'Da adega à cozinha em ilha — como os imóveis distintos do Porto são pensados para a vida social.',
    date: '2026-03-22',
    readingTime: 4,
    author: 'Equipa Collection Vintage',
    image: '/images/porto/editorial-adega.jpg',
    body: [
      {
        paragraphs: [
          'Há uma forma de habitar o Porto que vai além dos metros quadrados. Está nos terraços que recebem o pôr do sol sobre o Douro, nas cozinhas pensadas para conviver e nas adegas que guardam mais do que vinho.',
        ],
      },
    ],
  },
];

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso));
}
