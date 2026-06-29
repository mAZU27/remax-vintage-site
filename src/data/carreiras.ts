// ============================================================
// Careers / recruitment page content (/carreiras).
// Brand: RE/MAX Collection Vintage (gold/navy/cream). PT-PT copy.
//
// ⚠️  HONESTY NOTE — READ BEFORE PUBLISHING
// Everything tagged `[PLACEHOLDER — substituir antes de publicar]`
// below is illustrative copy, NOT verified business data. In
// particular: the metric strips, the team testimonials (names +
// quotes + stats), the open-role list and the recruitment contact
// are fabricated placeholders. Do NOT publish them as real. Swap
// for confirmed content (and real photography/headshots) before
// going live. Images currently reuse Porto cityscape assets as a
// cinematic stand-in — real office/team photography to be supplied.
// ============================================================

export interface CardItem {
  icon: string;
  title: string;
  text?: string;
}

export interface Metric {
  prefix?: string;
  /** number → animated count-up; string (e.g. a placeholder) → rendered as-is. */
  value: number | string;
  suffix?: string;
  label: string;
}

// In-page anchors (single-page careers experience — no per-role detail pages yet).
export const anchors = {
  roles: 'vagas',
  apply: 'candidatura',
} as const;

// ---------- 1. Hero ----------
export const careersHero = {
  eyebrow: 'Carreiras',
  titleLead: 'Constrói connosco o futuro do imobiliário',
  titleEmphasis: 'distinto',
  lede:
    'Junta-te a uma equipa de excelência em propriedades premium no Porto e eleva a tua carreira ao mais alto nível. Aqui, o teu talento encontra propósito, formação de elite e oportunidades sem teto.',
  primary: { label: 'Ver oportunidades', href: `#${anchors.roles}` },
  secondary: { label: 'Candidatura espontânea', href: `#${anchors.apply}` },
  // Cinematic Porto avenue (Aliados) as an aspirational careers backdrop.
  background: '/images/porto/porto-aliados.webp',
  cards: [
    { icon: 'target', title: 'Crescimento real', text: 'Plano de carreira estruturado e comissões acima da média em propriedades premium.' },
    { icon: 'compass', title: 'Formação curada', text: 'Acesso a formação contínua, mentoria especializada e ferramentas de excelência.' },
    { icon: 'award', title: 'Marca de prestígio', text: 'Representa o padrão global da RE/MAX Collection® e destaca-te no segmento de luxo.' },
  ] as CardItem[],
};

// ---------- 2. Cultura e ambiente ----------
export const careersCulture = {
  eyebrow: 'Cultura e ambiente',
  titleLead: 'Uma cultura feita de ambição, elegância e',
  titleEmphasis: 'proximidade',
  text:
    'Acreditamos que pessoas extraordinárias constroem resultados extraordinários. Na RE/MAX Collection Vintage cultivamos um ambiente de confiança, exigência e colaboração onde o talento é reconhecido e as relações fazem a diferença.',
  images: ['/images/porto/editorial-escritura.webp', '/images/porto/editorial-chaves.webp'],
  cards: [
    { icon: 'handshake', title: 'Proximidade', text: 'Uma equipa próxima, que se apoia e cresce em conjunto.' },
    { icon: 'target', title: 'Crescimento', text: 'Espaço real para evoluir, com objetivos claros e mérito reconhecido.' },
    { icon: 'diamond', title: 'Excelência', text: 'Um padrão alto em tudo o que fazemos — sem atalhos.' },
    { icon: 'compass', title: 'Propósito', text: 'Trabalho com sentido, ao serviço de imóveis e pessoas distintas.' },
  ] as CardItem[],
  // Qualitative, brand-true pillars (NO invented percentages).
  metrics: [
    { value: 'Equipa', label: 'Colaboração genuína' },
    { value: 'Mentoria', label: 'Apoio próximo e contínuo' },
    { value: 'Mérito', label: 'Crescimento por resultados' },
    { value: 'Excelência', label: 'Padrão em tudo o que fazemos' },
  ] as Metric[],
};

// ---------- 3. Porque trabalhar connosco ----------
export const careersWhyJoin = {
  eyebrow: 'Porque trabalhar connosco',
  titleLead: 'Porque escolher a',
  titleEmphasis: 'nossa equipa',
  text:
    'Acreditamos no talento, na ambição e na criação de valor. Na RE/MAX Collection Vintage encontra o ecossistema ideal para crescer, com o respaldo de uma marca global e a proximidade de uma equipa que o apoia em cada passo.',
  benefits: [
    { icon: 'diamond', title: 'Comissão premium', text: 'Modelo de remuneração orientado ao mérito e ao segmento de luxo.' },
    { icon: 'compass', title: 'Formação contínua', text: 'Aprendizagem permanente, do conhecimento de mercado à negociação.' },
    { icon: 'award', title: 'Marca de prestígio', text: 'A força de uma marca global ao serviço da sua reputação.' },
    { icon: 'users', title: 'Acompanhamento de liderança', text: 'Mentoria próxima de quem já percorreu o caminho.' },
  ] as CardItem[],
  // Career progression path (illustrative stages, not a contractual promise).
  path: ['Consultor', 'Consultor Sénior', 'Gestor de Equipa', 'Diretor de Sucesso'],
  cta: { label: 'Ver oportunidades', href: `#${anchors.roles}` },
};

// ---------- 4. Benefícios ----------
export const careersBenefits = {
  eyebrow: 'Benefícios',
  titleLead: 'Benefícios pensados para quem quer',
  titleEmphasis: 'crescer',
  text:
    'Na RE/MAX Collection Vintage investimos nas pessoas. Oferecemos um ecossistema de apoio, conhecimento e recursos para impulsionar o seu sucesso e reconhecimento no mercado imobiliário de luxo.',
  items: [
    { icon: 'compass', title: 'Formação contínua', text: 'Programas de desenvolvimento ao longo de todo o percurso.' },
    { icon: 'users', title: 'Mentoria especializada', text: 'Apoio individual de profissionais experientes.' },
    { icon: 'clock', title: 'Flexibilidade total', text: 'Autonomia para gerir o seu tempo e a sua agenda.' },
    { icon: 'handshake', title: 'Networking exclusivo', text: 'Acesso a uma rede seleta de clientes e parceiros.' },
    { icon: 'camera', title: 'Apoio de marketing', text: 'Produção e divulgação à altura de cada imóvel.' },
    { icon: 'sliders', title: 'Ferramentas premium', text: 'Tecnologia e processos que libertam o seu tempo.' },
    { icon: 'award', title: 'Reconhecimento', text: 'O mérito é celebrado — interna e publicamente.' },
    { icon: 'star', title: 'Incentivos & viagens', text: 'Recompensas que acompanham os grandes resultados.' },
  ] as CardItem[],
  strip: {
    text: 'O seu sucesso é o nosso compromisso.',
    cta: { label: 'Quero fazer parte', href: `#${anchors.apply}` },
  },
};

// ---------- 5. Oportunidades abertas ----------
export interface Job {
  id: string;
  title: string;
  area: string;
  location: string;
  type: string;
  text: string;
  icon: string;
}

// [PLACEHOLDER — substituir antes de publicar] lista de vagas ilustrativa.
export const careersRoles = {
  eyebrow: 'Carreiras',
  titleLead: 'Oportunidades',
  titleEmphasis: 'abertas',
  text:
    'Faça parte de uma marca global que representa o mais alto padrão no mercado imobiliário de luxo. Descubra as vagas disponíveis e encontre o próximo passo da sua carreira.',
  // Only one verified, currently-open role. Add further entries here as real
  // vacancies open — the filter UI auto-enables when more than one job exists.
  jobs: [
    {
      id: 'consultor-premium',
      title: 'Consultor Imobiliário',
      area: 'Área Comercial',
      location: 'Porto',
      type: 'Full-time',
      text: 'Acompanha clientes na compra e venda de imóveis distintos, com discrição e um serviço de excelência.',
      icon: 'briefcase',
    },
  ] as Job[],
  summaryBenefits: [
    'Marca global de prestígio',
    'Formação contínua',
    'Crescimento real',
    'Cultura de excelência',
  ],
};

// ---------- 6. Processo de recrutamento ----------
export const careersProcess = {
  eyebrow: 'Carreiras',
  titleLead: 'Processo de',
  titleEmphasis: 'recrutamento',
  text:
    'Um percurso claro, humano e orientado para o mérito. Acompanhamos cada passo com proximidade para que possa construir uma carreira sólida no segmento premium.',
  steps: [
    { num: '01', name: 'Candidatura', icon: 'send', text: 'Envie a sua candidatura. Analisamos o seu perfil e o alinhamento com os valores da RE/MAX Collection.' },
    { num: '02', name: 'Conversa inicial', icon: 'phone', text: 'Uma conversa para conhecermos a sua trajetória, ambições e motivação.' },
    { num: '03', name: 'Encontro estratégico', icon: 'strategy', text: 'Avaliamos competências, visão e potencial de crescimento no segmento premium.' },
    { num: '04', name: 'Experiência no terreno', icon: 'compass', text: 'Acompanhamento prático com a equipa para sentir o mercado, os processos e o nível de serviço.' },
    { num: '05', name: 'Integração', icon: 'sparkle', text: 'Boas-vindas à equipa. Formação especializada, mentoria contínua e acesso a ferramentas de excelência.' },
  ],
  cta: { label: 'Quero fazer parte', href: `#${anchors.apply}` },
};

// ---------- 7. Testemunhos da equipa ----------
export interface Voice {
  name: string;
  initials: string;
  role: string;
  quote: string;
  stats: string[];
}

// [PLACEHOLDER — substituir antes de publicar] testemunhos da equipa fictícios
// (nomes e citações). As tags são qualitativas (SEM números inventados).
// Substituir por depoimentos reais com autorização antes de publicar.
export const careersTeam = {
  eyebrow: 'Testemunhos da equipa',
  titleLead: 'O que diz a',
  titleEmphasis: 'nossa equipa',
  intro:
    'Na RE/MAX Collection Vintage acreditamos que o sucesso se constrói em equipa. Conheça quem já encontrou aqui o ambiente, o apoio e as ferramentas para ir mais longe.',
  voices: [
    {
      name: 'Carla Soares',
      initials: 'CS',
      role: 'Consultora Imobiliária',
      quote: 'Encontrei aqui um ecossistema que valoriza a excelência e dá liberdade para criar relações duradouras.',
      stats: ['Segmento premium', 'Acompanhamento dedicado'],
    },
    {
      name: 'Tiago Ferreira',
      initials: 'TF',
      role: 'Consultor Imobiliário',
      quote: 'O apoio da liderança e a formação contínua fazem toda a diferença no meu crescimento profissional.',
      stats: ['Formação contínua', 'Foco no cliente'],
    },
    {
      name: 'Inês Moura',
      initials: 'IM',
      role: 'Consultora Imobiliária',
      quote: 'Mais do que uma marca, a Vintage é uma cultura de elegância, exigência e resultados consistentes.',
      stats: ['Cultura de excelência', 'Resultados consistentes'],
    },
    {
      name: 'Ricardo Nunes',
      initials: 'RN',
      role: 'Consultor Sénior',
      quote: 'A autonomia para construir o meu negócio, com uma marca forte por trás, mudou por completo a forma como trabalho.',
      stats: ['Autonomia e marca forte', 'Visão de negócio'],
    },
    {
      name: 'Sofia Lemos',
      initials: 'SL',
      role: 'Consultora Imobiliária',
      quote: 'A formação contínua e o acompanhamento próximo deram-me a confiança para fechar negócios que nunca imaginei.',
      stats: ['Negociação', 'Confiança do cliente'],
    },
    {
      name: 'André Pinto',
      initials: 'AP',
      role: 'Consultor Imobiliário',
      quote: 'Aqui ninguém cresce sozinho. Há sempre alguém mais experiente disponível para ajudar e partilhar.',
      stats: ['Espírito de equipa', 'Partilha de conhecimento'],
    },
    {
      name: 'Beatriz Carvalho',
      initials: 'BC',
      role: 'Coordenadora de Equipa',
      quote: 'O ambiente é exigente, mas profundamente humano. Sentimo-nos valorizados e ouvidos todos os dias.',
      stats: ['Ambiente humano', 'Valorização da equipa'],
    },
    {
      name: 'Miguel Tavares',
      initials: 'MT',
      role: 'Consultor Imobiliário',
      quote: 'Vim de outra agência e a diferença no posicionamento e na apresentação dos imóveis é abismal.',
      stats: ['Posicionamento premium', 'Apresentação de excelência'],
    },
  ] as Voice[],
  strip: {
    text: 'O próximo testemunho de sucesso pode ser o seu.',
    cta: { label: 'Ver oportunidades', href: `#${anchors.roles}` },
  },
};

// ---------- 8. Vida no escritório ----------
export const careersOffice = {
  eyebrow: 'Vida no escritório',
  titleLead: 'Onde a ambição encontra o',
  titleEmphasis: 'ambiente certo',
  text:
    'Acreditamos que o sucesso é construído em conjunto. No nosso escritório no Porto encontrará um ambiente de excelência, colaboração genuína e inspiração diária para ir mais longe.',
  // Editorial lifestyle placeholders until real office/team photos exist.
  images: [
    { src: '/images/porto/editorial-consultoria.webp', caption: 'Escritório com vista sobre o Porto' },
    { src: '/images/porto/editorial-curadoria.webp', caption: 'Espaços de reunião e lounge' },
    { src: '/images/porto/editorial-fotografia.webp', caption: 'Colaboração de equipa' },
    { src: '/images/porto/editorial-secretaria.webp', caption: 'O dia a dia de um consultor' },
  ],
  cards: [
    { icon: 'pin', title: 'Localização premium' },
    { icon: 'users', title: 'Cultura colaborativa' },
    { icon: 'diamond', title: 'Padrão de excelência' },
    { icon: 'target', title: 'Crescimento contínuo' },
  ] as CardItem[],
  // Real business KPIs belong here — leave the explicit placeholder until the
  // client confirms verifiable figures. String values render as-is (no count-up).
  metrics: [
    { value: '[INSERIR NÚMERO REAL]', label: 'Consultores especialistas' },
    { value: '[INSERIR NÚMERO REAL]', label: 'Volume de negócio anual' },
    { value: '[INSERIR NÚMERO REAL]', label: 'Imóveis exclusivos em carteira' },
    { value: '[INSERIR NÚMERO REAL]', label: 'Satisfação de clientes' },
  ] as Metric[],
};

// ---------- 9. Candidatura espontânea ----------
export const careersApplication = {
  eyebrow: 'Candidatura espontânea',
  titleLead: 'Ainda não encontrou a função certa? Adoramos conhecer talento',
  titleEmphasis: 'excecional',
  text:
    'Na RE/MAX Collection Vintage acreditamos que o talento, a ambição e a discrição são essenciais para elevar o mercado imobiliário de luxo. Valorizamos profissionais que partilham a nossa paixão pela excelência e pelo serviço verdadeiramente excecional.',
  image: '/images/porto/porto-ribeira-barcos.webp',
  // Director box overlapping the bottom of the building image.
  director: {
    name: 'Sónia Santos',
    role: 'Diretora dos Recursos Humanos',
    text: 'Estou disponível para falar consigo sobre oportunidades, o nosso ambiente de trabalho e o que nos torna únicos.',
    photo: '/images/team/sonia-santos.jpg',
    initials: 'SS',
    ctaLabel: 'Falar com a responsável',
  },
  formTitle: 'Envie-nos a sua candidatura',
  // Options for the "Área de interesse" select.
  areas: ['Área Comercial', 'Liderança Comercial', 'Marketing & Comunicação', 'Gestão de Clientes', 'Outra'],
};

// ---------- 10. CTA final ----------
export const careersFinalCta = {
  eyebrow: 'Faça parte da excelência',
  titleLead: 'O próximo passo começa',
  titleEmphasis: 'aqui',
  text:
    'Estamos sempre à procura de talento, ambição e pessoas que queiram fazer parte de algo verdadeiramente extraordinário. O seu futuro começa agora.',
  primary: { label: 'Ver oportunidades', href: `#${anchors.roles}` },
  secondary: { label: 'Falar com a equipa', href: '/contacto' },
  trust: ['Equipa de excelência', 'Carreira sem limites', 'Marca de prestígio', 'Alcance global'],
};
