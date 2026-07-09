// ============================================================
// O Método — VENDER. Single content source for the /vender page
// and the homepage método sections.
//
// SOURCE OF TRUTH: official printed seller guide of Grupo RE/MAX
// Dragão, transcribed in the mission appendix. Voice adapted from
// the consultant's 1st person to the agency ("nós"), facts, numbers
// and services UNCHANGED. Items flagged `confirmar: true` need
// written confirmation from the agency before launch.
// ============================================================

// 2.1 — the three seller essentials for the homepage split.
export const essenciaisVender = [
  {
    icon: 'chart',
    title: 'Estudo de mercado gratuito',
    text: 'Uma leitura fundamentada do valor do seu imóvel, sem qualquer custo.',
  },
  {
    icon: 'camera',
    title: 'Marketing profissional',
    text: 'Fotografia, vídeo e drone, com divulgação nacional e internacional.',
  },
  {
    icon: 'globe',
    title: 'Partilha com toda a rede',
    text: 'O seu imóvel trabalhado por toda a rede — para vender mais depressa.',
  },
] as const;

// 2.3 — seller mini-process (4 milestones) for the homepage.
export const miniProcessoVender = [
  'Estudo de mercado',
  'Promoção',
  'Visitas qualificadas',
  'Venda',
] as const;

// B1 · What we do to sell your property (9 actions).
// Item 4's "portal com mais audiência" formulation needs confirmation.
export const acoes = [
  { text: 'Estudo de mercado gratuito', confirmar: false },
  { text: 'Apoio na decoração / home staging', confirmar: false },
  { text: 'Foto-reportagem e vídeo profissionais, incluindo visita virtual', confirmar: false },
  {
    text: 'Inserção do imóvel no site da RE/MAX — o portal imobiliário com mais audiência em Portugal — e em plataformas internacionais que reforçam a divulgação no estrangeiro',
    confirmar: true, // "portal com mais audiência" formulation
  },
  { text: 'Informação a toda a rede RE/MAX e a outras imobiliárias de que o imóvel está para venda', confirmar: false },
  { text: 'Feedback constante sobre o trabalho desenvolvido e os resultados', confirmar: false },
  { text: 'Apoio documental e jurídico, ao proprietário e ao comprador', confirmar: false },
  { text: 'Ajuda ao comprador na obtenção de financiamento', confirmar: false },
  { text: 'Trabalho em exclusivo para encontrar o comprador para o seu imóvel', confirmar: false },
] as const;

// B2 · Planned marketing strategy (6 items). Flyer volume needs confirmation.
export const marketing = [
  { text: '1000 flyers de divulgação por mês', confirmar: true },
  { text: 'Montra, cartaz, lona e outdoor de venda', confirmar: false },
  { text: 'Open House para potenciais compradores', confirmar: false },
  { text: 'Open House para mediadores', confirmar: false },
  { text: 'Divulgação nas redes sociais e em newsletter — para mediadores e clientes compradores', confirmar: false },
  { text: 'Divulgação na rede RE/MAX e partilha com outras imobiliárias', confirmar: false },
] as const;

// B3 · Step-by-step property promotion (14 milestones).
// Milestone 4's "maior plataforma" formulation needs confirmation.
export const promocao = [
  { label: 'Estudo de mercado do imóvel', confirmar: false },
  { label: 'Recolha documental, análise e tratamento', confirmar: false },
  { label: 'Reportagem fotográfica, visita virtual, drone e vídeo', confirmar: false },
  { label: 'Inserção no site RE/MAX', confirmar: true }, // guide adds "maior plataforma imobiliária de Portugal"
  { label: 'Plataforma de exportação — divulgação internacional', confirmar: false },
  { label: 'Redes sociais e newsletters', confirmar: false },
  { label: 'Rede RE/MAX e partilha com outras imobiliárias', confirmar: false },
  { label: 'Newsletter / e-mail marketing', confirmar: false },
  { label: 'Montras', confirmar: false },
  { label: 'Flyers e Open House para parceiros', confirmar: false },
  { label: 'Safari para colegas', confirmar: false },
  { label: 'Visitas', confirmar: false },
  { label: 'Negociação', confirmar: false },
  { label: 'Vendido', confirmar: false },
] as const;

// B4 · The power of sharing. ALL numbers need confirmation.
export const forcaPartilha = {
  intro:
    'Um consultor dedicado — e toda a equipa da agência a trabalhar o seu imóvel.',
  pontos: [
    { text: '10.000 consultores em Portugal na rede RE/MAX', confirmar: true },
    {
      text: 'A partilha com a rede abrange todo o mercado imobiliário nacional e internacional; outras imobiliárias procuram imóveis na rede RE/MAX — o maior «armazém» de angariações do mercado',
      confirmar: true,
    },
  ],
} as const;

// B5 · Exclusivity advantages — with/without table.
// Rendered as "Incluído" vs "Não garantido" (not the guide's ✗/○).
export const tabelaExclusividade = {
  grupos: [
    {
      titulo: 'Serviço garantido',
      linhas: [
        { item: 'Preparação da venda', com: true, sem: false },
        { item: 'Estudo de mercado', com: true, sem: 'pontual' },
        { item: 'Serviço personalizado', com: true, sem: false },
        { item: 'Consultor responsável por todo o processo', com: true, sem: false },
      ],
    },
    {
      titulo: 'Publicidade',
      linhas: [
        { item: 'Cartaz e montra profissional', com: true, sem: false },
        { item: 'Drone, reportagem fotográfica, visita virtual, vídeo, lona, outdoor', com: true, sem: false },
        { item: 'Redes sociais', com: true, sem: 'pontual' },
        { item: 'Flyers, folhetos e revista profissional', com: true, sem: false },
        { item: 'Safari e Open House', com: true, sem: false },
        { item: 'Partilha com outras imobiliárias', com: true, sem: false },
      ],
    },
    {
      titulo: 'Acompanhamento',
      linhas: [
        { item: 'Qualificação de compradores', com: true, sem: false },
        { item: 'Feedback das visitas', com: true, sem: false },
        { item: 'Relatórios e reuniões', com: true, sem: false },
        { item: 'Negociação e conclusão', com: true, sem: false },
        { item: 'Elaboração de minutas e contratos', com: true, sem: false },
        { item: 'Gestão do processo jurídico', com: true, sem: false },
      ],
    },
  ],
} as const;

// B6 · Exclusivity guarantees you (9). MaxFinance point needs confirmation.
export const exclusividadeGarante = [
  { text: 'Dedicação total ao seu imóvel', confirmar: false },
  { text: 'Conhecimento profundo da zona do imóvel', confirmar: false },
  {
    text: 'Atendimento personalizado — contactável quando lhe for conveniente, incluindo horários pós-laborais e fim de semana',
    confirmar: false,
  },
  {
    text: 'Segurança da sua família: visitas sempre acompanhadas, com potenciais compradores qualificados',
    confirmar: false,
  },
  {
    text: 'Uma equipa de apoio em todas as fases — preparação de documentos, contratos e escrituras — para uma negociação segura',
    confirmar: false,
  },
  {
    text: 'Experiência em análise comparativa de mercado, para conseguir o melhor preço pelo seu imóvel',
    confirmar: false,
  },
  {
    text: 'Mesmo em exclusivo, o imóvel é partilhado com outras imobiliárias e consultores — nunca perde um negócio',
    confirmar: false,
  },
  { text: 'Orientação, se necessário, na melhoria da apresentação do imóvel', confirmar: false },
  {
    text: 'MaxFinance a apoiar os compradores na obtenção de financiamento',
    confirmar: true,
  },
] as const;

// B7 · Thinking of selling alone? Working with us you are:
export const venderSozinho = {
  enquadramento:
    'Vender casa é uma das maiores transações financeiras que se pode fazer. O processo é complexo e demorado, e exige experiência jurídica, financeira e de marketing — sem ela, pode tornar-se uma aventura frustrante e dispendiosa.',
  pontos: [
    'Otimizar o preço de venda do seu imóvel',
    'Preparar a casa para as visitas',
    'Maximizar a exposição do imóvel no mercado',
    'Facilitar a relação de confiança com o cliente comprador',
    'Beneficiar de pré-seleção de potenciais compradores',
    'Garantir privacidade, confidencialidade e segurança entre vendedor e comprador',
    'Ter uma negociação profissional',
  ],
  fecho: 'Faça o que mais gosta enquanto vendemos o seu imóvel.',
} as const;

// B8 · Documents needed to sell (accordion by category).
export const documentos = [
  {
    categoria: 'Proprietário individual',
    itens: [
      'Cartão de Cidadão',
      'Estado civil (havendo vários proprietários: cartões de cidadão e regime de casamento)',
    ],
  },
  {
    categoria: 'Proprietário empresarial',
    itens: [
      'Cartão de identificação de pessoa coletiva',
      'Código de acesso à certidão permanente',
      'Cartão de Cidadão de quem obriga a sociedade',
    ],
  },
  {
    categoria: 'Imóvel',
    itens: [
      'Certificado Energético (obrigatório — Decreto-Lei n.º 251/2015)',
      'Caderneta Predial Urbana (Finanças)',
      'Certidão de Registo Predial (Conservatória do Registo Predial)',
      'Licença de Utilização (imóveis posteriores a 7/8/1951 — Câmara Municipal)',
      'Ficha Técnica de Habitação (imóveis posteriores a março de 2004 — Câmara Municipal)',
      'Plantas (Câmara Municipal)',
      'Cópia da escritura (caso faltem alguns dos documentos anteriores)',
    ],
  },
  {
    categoria: 'Heranças',
    itens: ['Habilitação de herdeiros', 'Imposto do selo'],
  },
] as const;

// B9 · FAQ — open vs exclusive listing (comparative accordion).
export const faqAngariacao = [
  {
    q: 'Quem é o responsável pela venda do meu imóvel?',
    aberto:
      'Não existe uma única pessoa responsável — todos os consultores sabem que não são os únicos e o compromisso diminui.',
    exclusivo:
      'O consultor é o único responsável por coordenar todo o processo e está totalmente motivado para a venda.',
  },
  {
    q: 'Quem vai realmente investir na venda?',
    aberto:
      'O esforço centra-se no cliente comprador, não na estratégia de venda do seu imóvel — o que diminui a oportunidade de venda.',
    exclusivo: 'Todo o esforço está centrado no plano de marketing, da promoção à venda.',
  },
  {
    q: 'Qual o nível de motivação para vender?',
    aberto: 'Baixo — ninguém tem a garantia de receber a comissão pela venda.',
    exclusivo:
      'Máximo — ao concretizar a venda, o consultor vê ressarcido todo o investimento e trabalho.',
  },
  {
    q: 'O que perde o agente se não vender?',
    aberto: 'Nada, porque não fez qualquer investimento na promoção e divulgação.',
    exclusivo: 'Perde todo o esforço, investimento e tempo dedicados à promoção e venda.',
  },
  {
    q: 'Qual vai ser o nível de esforço?',
    aberto: 'Muito baixo, porque não há garantia de comissão.',
    exclusivo:
      'Total — do plano de marketing personalizado à partilha com toda a rede, com milhares de agentes imobiliários.',
  },
  {
    q: 'Que interesses vai o agente defender?',
    aberto:
      'Com vários consultores envolvidos, só o proprietário consegue tratar dos seus interesses junto de cada um.',
    exclusivo:
      'O proprietário trata apenas connosco — representamos e defendemos os seus interesses e somos o seu único comunicador com todo o mercado.',
  },
  {
    q: '«Sempre achei que, com exclusividade, só vocês é que podiam vender.»',
    aberto:
      'É o argumento usado por agências que trabalham «em aberto» para denegrir este modelo.',
    exclusivo:
      'Na prática, partilhamos e trabalhamos com todo o mercado para encontrar o comprador da sua casa — a exclusividade é uma mais-valia na promoção do imóvel.',
  },
] as const;
