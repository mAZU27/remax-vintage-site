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
  titleLead: 'O seu próximo passo como consultor imobiliário',
  titleEmphasis: 'no Porto',
  lede:
    'Quer trabalhar no imobiliário, mudar de profissão ou conhecer uma nova agência? Apresente o seu percurso à RE/MAX Collection Vintage, na Avenida da Boavista, através de uma candidatura espontânea para a área comercial.',
  // Secção de vagas removida (placeholders) → CTAs apontam para a candidatura.
  primary: { label: 'Candidatura espontânea', href: `#${anchors.apply}` },
  secondary: { label: 'Conhecer a equipa', href: '/sobre-nos' },
  // Cinematic Porto avenue (Aliados) as an aspirational careers backdrop.
  background: '/images/porto/porto-aliados.webp',
  cards: [
    { icon: 'target', title: 'O seu percurso', text: 'Partilhe a sua experiência e esclareça com a equipa as condições de uma possível colaboração.' },
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
    { icon: 'diamond', title: 'Condições claras', text: 'Esclareça o modelo de colaboração, a remuneração e eventuais custos antes de tomar uma decisão.' },
    { icon: 'compass', title: 'Formação contínua', text: 'Aprendizagem permanente, do conhecimento de mercado à negociação.' },
    { icon: 'award', title: 'Marca de prestígio', text: 'A força de uma marca global ao serviço da sua reputação.' },
    { icon: 'users', title: 'Acompanhamento de liderança', text: 'Mentoria próxima de quem já percorreu o caminho.' },
  ] as CardItem[],
  // Topics for a candidate conversation, not a promised progression ladder.
  path: ['O seu percurso', 'A atividade comercial', 'Apoio e recursos', 'Condições de colaboração'],
  // Roles section is not rendered (placeholders removed) → CTA goes to the form.
  cta: { label: 'Enviar candidatura', href: `#${anchors.apply}` },
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
    { icon: 'clock', title: 'Organização da atividade', text: 'Converse com a equipa sobre a disponibilidade e a organização do trabalho.' },
    { icon: 'handshake', title: 'Networking exclusivo', text: 'Acesso a uma rede seleta de clientes e parceiros.' },
    { icon: 'camera', title: 'Apoio de marketing', text: 'Produção e divulgação à altura de cada imóvel.' },
    { icon: 'sliders', title: 'Ferramentas premium', text: 'Tecnologia e processos que libertam o seu tempo.' },
    { icon: 'award', title: 'Reconhecimento', text: 'O mérito é celebrado — interna e publicamente.' },
    { icon: 'star', title: 'Objetivos profissionais', text: 'Partilhe o que pretende desenvolver na sua próxima etapa profissional.' },
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
  // Legacy draft only: NOT verified as currently open and NOT rendered.
  // Confirm an individual vacancy before publishing this or JobPosting data.
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
    cta: { label: 'Enviar candidatura', href: `#${anchors.apply}` },
  },
};

// ---------- 8. Vida no escritório ----------
export const careersOffice = {
  eyebrow: 'A atividade imobiliária',
  titleLead: 'Onde a ambição encontra o',
  titleEmphasis: 'ambiente certo',
  text:
    'Acreditamos que o sucesso é construído em conjunto. No nosso escritório no Porto encontrará um ambiente de excelência, colaboração genuína e inspiração diária para ir mais longe.',
  // Editorial illustrations; do not present these as photographs of the office.
  images: [
    { src: '/images/porto/editorial-consultoria.webp', caption: 'Acompanhamento · imagem ilustrativa' },
    { src: '/images/porto/editorial-curadoria.webp', caption: 'Preparação · imagem ilustrativa' },
    { src: '/images/porto/editorial-fotografia.webp', caption: 'Apresentação · imagem ilustrativa' },
    { src: '/images/porto/editorial-secretaria.webp', caption: 'Organização · imagem ilustrativa' },
  ],
  cards: [
    { icon: 'pin', title: 'Localização premium' },
    { icon: 'users', title: 'Cultura colaborativa' },
    { icon: 'diamond', title: 'Padrão de excelência' },
    { icon: 'target', title: 'Crescimento contínuo' },
  ] as CardItem[],
  // KPIs: a faixa de métricas foi REMOVIDA do render (2026-07-10) — os tokens
  // '[INSERIR NÚMERO REAL]' apareciam na página pública. Quando a agência
  // confirmar números reais e verificáveis, repor aqui e reativar a faixa
  // em CareersOfficeLife.astro.
  metrics: [] as Metric[],
};

// ---------- 9. Candidatura espontânea ----------
export const careersApplication = {
  eyebrow: 'Candidatura espontânea',
  titleLead: 'Apresente-nos o seu percurso e o que procura na',
  titleEmphasis: 'área comercial',
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
  // Owner call 2026-07-10: recruitment is for the sales area only.
  areas: ['Área Comercial'],
};

// ---------- 10. CTA final ----------
export const careersFinalCta = {
  eyebrow: 'Faça parte da excelência',
  titleLead: 'O próximo passo começa',
  titleEmphasis: 'aqui',
  text:
    'Estamos sempre à procura de talento, ambição e pessoas que queiram fazer parte de algo verdadeiramente extraordinário. O seu futuro começa agora.',
  primary: { label: 'Candidatura espontânea', href: `#${anchors.apply}` },
  secondary: { label: 'Falar com a equipa', href: '/contacto' },
  trust: ['Equipa local', 'Candidatura espontânea', 'Marca RE/MAX Collection', 'Porto'],
};
