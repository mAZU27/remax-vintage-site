// ============================================================
// O Método — COMPRAR. Single content source for the /comprar page
// and the homepage método sections.
//
// SOURCE OF TRUTH: official printed buyer guide of Grupo RE/MAX
// Dragão, transcribed in the mission appendix. Voice adapted from
// the consultant's 1st person to the agency ("nós"), facts, numbers
// and services UNCHANGED. Items flagged `confirmar: true` need
// written confirmation from the agency before launch.
// ============================================================

// 2.1 — the three buyer essentials for the homepage split.
export const essenciaisComprar = [
  {
    icon: 'compass',
    title: 'Todo o mercado',
    text: 'Acesso a todo o mercado — não apenas a imóveis RE/MAX.',
  },
  {
    icon: 'shield-check',
    title: 'Representação do comprador',
    text: 'Representamos os seus interesses, formalizados num Mandato de Comprador.',
  },
  {
    icon: 'handshake',
    title: 'Até à escritura',
    text: 'Acompanhamento contínuo em todas as fases, até à concretização do negócio.',
  },
] as const;

// 2.3 — buyer mini-process (4 milestones) for the homepage.
export const miniProcessoComprar = [
  'Qualificação',
  'Procura',
  'Negociação',
  'Escritura',
] as const;

// A1 · The structure working for the client (10 points). Reused by the
// radial StructureDiagram on the homepage and on /comprar.
export const estrutura = [
  { icon: 'key', label: 'Rápido acesso aos imóveis no mercado' },
  { icon: 'globe', label: 'Rede RE/MAX' },
  { icon: 'building', label: 'Outras imobiliárias' },
  { icon: 'device', label: 'Plataformas tecnológicas' },
  { icon: 'compass', label: 'Conhecedor do mercado' },
  { icon: 'camera', label: 'Departamento de Marketing' },
  { icon: 'bank', label: 'Intermediário de crédito junto das várias instituições bancárias' },
  { icon: 'chart', label: 'Departamento Financeiro' },
  { icon: 'document', label: 'Gestor Processual' },
  { icon: 'scale', label: 'Departamento Jurídico' },
] as const;

// A2 · Mandato de Comprador & Contrato Exclusivo — what they are.
export const mandato = {
  intro: [
    'Podemos mostrar-lhe qualquer imóvel de toda a rede RE/MAX, bem como de outras agências fora da rede.',
    'É um serviço pensado para quem tem uma vida ocupada e não pode perder tempo com diligências e papelada à procura da casa ideal.',
    'Em vez de perder horas na Internet ou fins de semana em visitas a imóveis que não correspondem ao que procura, tratamos de tudo: somos o seu representante à procura da solução que idealiza, com os seus interesses sempre salvaguardados.',
  ],
  formalizacao:
    'A relação formaliza-se através de um Mandato de Comprador ou de um Contrato Exclusivo de Comprador — uma permissão para o consultor atuar em nome do comprador na procura de um imóvel com determinadas características, num determinado local, por um determinado preço.',
  porque:
    'A compra de casa é, para muitos, a maior transação financeira da vida. O processo é cada vez mais complexo, e a experiência jurídica, financeira e de marketing simplifica o que poderia ser uma aventura frustrante e dispendiosa.',
} as const;

// A3 · How the exclusive buyer contract works (7 steps).
export const comoFunciona = [
  'Fazemos uma qualificação aprofundada das suas necessidades e pesquisamos todos os imóveis disponíveis na zona.',
  'Contactamos e visitamos previamente os imóveis nas localizações selecionadas, para verificar se cumprem os critérios pretendidos.',
  'Valorizamos o seu tempo: apresentamos-lhe apenas os imóveis qualificados.',
  'Fazemos todos os esforços para tornar o processo de aquisição simples e bem-sucedido.',
  'Com franqueza e honestidade, colocamos a nossa experiência, rede e conhecimento ao serviço de quem compra.',
  'Explicamos cada fase do processo para uma tomada de decisão esclarecida e avaliamos o mercado no segmento de imóveis em questão.',
  'Acompanhamos o comprador em todas as fases, de forma contínua, até à concretização do negócio.',
] as const;

// A4 · The buyer's guarantees (9).
export const garantias = [
  'Assumimos a responsabilidade pela procura da sua futura casa',
  'Motivação total — trabalhamos consigo em exclusivo',
  'Mais tempo dedicado à procura da sua futura casa',
  'Plano e estratégia desenhados para encontrar a sua casa',
  'Procura em todo o mercado — não apenas imóveis RE/MAX',
  'Informação regular das atividades em curso',
  'Organização das visitas aos imóveis',
  'Apoio na negociação, para fazer o melhor negócio ao mais baixo preço',
  'Retorno do investimento de todo o trabalho quando compra connosco',
] as const;

// A5 · Mandato vs Contrato Exclusivo — differences table.
// Mandatory legal note rendered next to this table (see notaFiscal).
export const tabelaMandato = {
  colunas: ['Mandato de Comprador', 'Contrato Exclusivo de Comprador'],
  linhas: [
    {
      tema: 'Formalização',
      mandato: 'Assinatura do Mandato de Comprador.',
      exclusivo: 'Assinatura do Contrato Exclusivo de Comprador.',
    },
    {
      tema: 'Compromisso',
      mandato: 'Sem exclusividade; poupa o seu tempo.',
      exclusivo: 'Representação do comprador em exclusivo; poupa tempo e negociação do melhor valor.',
    },
    {
      tema: 'Acesso',
      mandato: 'Só aos imóveis em comercialização na rede RE/MAX e restantes imobiliárias.',
      exclusivo: 'A todos os imóveis existentes, estejam ou não em comercialização.',
    },
    {
      tema: 'Custos',
      mandato: 'Honorários do consultor pagos pelo vendedor (contemplados no valor de venda).',
      exclusivo: 'Honorários pagos pelo comprador — que poupa nos impostos, pois paga só sobre o valor real da aquisição.',
    },
    {
      tema: 'Incidência de impostos',
      mandato: 'Comprador tributado pelo valor total da transação (já inclui comissões).',
      exclusivo: 'Comprador tributado só pelo valor do imóvel; a fatura da comissão desconta em futuras mais-valias.',
    },
    {
      tema: 'Se for empresa',
      mandato: 'Com CAE de compra e venda de imóveis, poupa IMT.',
      exclusivo: 'Idem; os honorários são assimilados como custo (baixa o valor de IRC, regulariza o IVA).',
    },
    {
      tema: 'Exemplo',
      mandato: 'Imóvel de 200.000 € → IMT + IRS sobre 200.000 €.',
      exclusivo: 'Imóvel de 190.000 € → IMT + IRS só sobre 190.000 €.',
    },
  ],
} as const;

// Mandatory note next to the tax table (mission rule).
export const notaFiscal =
  'Informação de carácter geral. Não dispensa aconselhamento fiscal ou jurídico profissional.';

// A6 · The 12 milestones of the buying process.
export const etapas = [
  'Qualificação comercial e financeira',
  'Formalização da parceria',
  'Análise bancária',
  'Procura de imóveis',
  'Agendamento de visitas',
  'Início do processo de visitas',
  'Reserva do imóvel (válida por 15 dias)',
  'Financiamento: submissão do processo bancário',
  'Avaliação do imóvel e pagamento de impostos',
  'Contrato de promessa de compra e venda',
  'Dia da escritura',
  'Alteração da morada fiscal',
] as const;

// A6 support copy (from the guide's notes).
export const etapasNotas = [
  'Cada visita gera um relatório com opinião e proposta, partilhado com o proprietário.',
  'O departamento de intermediação de crédito está registado no Banco de Portugal, com protocolos com várias instituições bancárias — pedimos múltiplas propostas para negociar as melhores condições.',
  'O departamento jurídico verifica todos os atos contratuais: dívidas ao condomínio, contrato-promessa, impostos e escritura.',
] as const;

// A7 · Documents for financing simulations.
export const docsFinanciamento = [
  'Cartão de Cidadão',
  'Três últimos recibos de vencimento',
  'Declaração de efetividade laboral',
  'Nota de liquidação de IRS',
  'Declaração de IRS',
  'Três últimos meses de extratos bancários',
  'Declaração da Central de Responsabilidades de Crédito do Banco de Portugal',
  'Fiadores, se existirem: mesma documentação',
] as const;

// A8 · Our commitment.
export const compromisso = [
  'Procura incessante da casa que procura',
  'Respeito pelas suas necessidades e pela sua capacidade financeira',
  'Descomplicar a burocracia do processo',
  'Procurar o melhor financiamento',
  'Apoio em toda a burocracia necessária à transação',
  'Verificação da documentação do imóvel',
  'Organização dos documentos para pagamento de impostos; preparação e agendamento da escritura',
  'Ponto de situação semanal',
  'Atualização constante da dinâmica do mercado — preços, transações, procura vs. oferta, condições jurídico-legais',
  'Estudo de mercado, cumprimento do plano de marketing, marcação e realização das visitas',
  'Visita prévia a vários imóveis para selecionar os que mais se adequam a si',
] as const;

// A9 · Network advantages & services. `confirmar` items need the
// agency's written sign-off before launch (rendered with an HTML
// comment CONFIRMAR COM AGÊNCIA next to them).
export const vantagensRede = [
  {
    title: 'Preços ajustados',
    text: 'Os estudos de mercado asseguram imóveis vendidos ao preço justo para vendedor e comprador.',
    confirmar: false,
  },
  {
    title: 'Informação detalhada',
    text: 'Descrições completas, boas fotografias, visitas virtuais e vídeos.',
    confirmar: false,
  },
  {
    title: 'O maior «armazém de imóveis» do mercado',
    text: 'Mais de 400 agências a angariar em Portugal.',
    confirmar: true, // number needs agency confirmation
  },
  {
    title: 'Imóveis exclusivos',
    text: 'Comercializados em regime de exclusividade — não os encontra noutras imobiliárias.',
    confirmar: false,
  },
] as const;

// A9 · Partners — ALL pending confirmation of availability at this agency.
export const parceiros = [
  {
    name: 'Proteção Casa RE/MAX',
    text: '1 ano de proteção na compra, numa seleção de imóveis em carteira (Allianz Partners).',
  },
  {
    name: 'MELOM',
    text: 'Orçamento de obras gratuito para clientes compradores.',
  },
  {
    name: 'Casa de Sonho RE/MAX',
    text: 'Construção chave na mão.',
  },
  {
    name: 'MDS Finance / MaxFinance Dragão',
    text: 'Apoio à obtenção de financiamento.',
  },
] as const;
