import { EXTERNAL_TEAM_URL } from '../lib/site.config';
// ============================================================
// Equipa — "A Nossa Equipa" carousel used in /sobre-nos.
//
// NAMES, ROLES, ORDER & PHOTOS: OFFICIAL — sourced 2026-07-10 from the same
// first-party API the official agency page consumes
// (GET https://api-v2-prod-remaxpt.devscope.net/api/User/GetOfficeAgentsAndStaff?officeNumber=12382,
// the endpoint https://www.remax.pt/pt/agencia/remax-collection-vintage/12382
// fetches client-side). Order matches the official page exactly: the agents
// grid first (alphabetical), then the 5 staff members. Headshots were
// downloaded from the official CDN (i.maxwork.pt, mxw-650 preset, 650×650)
// into /public/images/team/official/{slug}.jpg — the slug is the one used by
// each person's official remax.pt profile URL, so photo↔name↔role pairing is
// guaranteed by the source system, never guessed.
//
// ROLE DISPLAY (owner ask 2026-07-10): the roster's "Agente Associado" is
// shown gendered — "Consultor Associado" / "Consultora Associada" per person.
// Every other role keeps the exact official label (e.g. "Agente em Formação").
//
// image: null → dignified gold-monogram fallback (Alex Prazeres has no photo
// on the official page either). officialUrl: null → the official page renders
// that person without a personal profile link (the 5 staff members).
//
// To refresh the roster, re-query the endpoint above and re-download photos.
// ============================================================

export interface Consultant {
  name: string;
  /** Displayed role (official label, with the owner's gendered override). */
  role: string;
  /** Local path of the official headshot; null → gold-monogram fallback. */
  image: string | null;
  /** This person's official remax.pt profile, when the official page links one. */
  officialUrl: string | null;
}

export interface TeamStat {
  /** Icon name from components/Icon.astro. */
  icon: string;
  value: string;
  label: string;
}

export const teamShowcase = {
  eyebrow: 'A Nossa Equipa',
  titleLine1: 'Uma equipa. Um compromisso.',
  titleLine2: 'O seu próximo capítulo.',
  intro:
    'Profissionais apaixonados pelo que fazem e dedicados a entregar um serviço excecional e resultados que fazem a diferença.',
  // Opens the official RE/MAX agency page positioned on the team section.
  cta: { label: 'Ver equipa completa', href: EXTERNAL_TEAM_URL },
} as const;

// OFFICIAL roster — 57 people, verbatim from the official agency page (see header).
export const consultants: Consultant[] = [
  { name: 'Alexandrina Magalhães', role: 'Consultora Associada', image: '/images/team/official/alexandrina-magalhaes.jpg', officialUrl: 'https://www.remax.pt/pt/agente/alexandrina-magalhaes/123821036' },
  { name: 'Alice Miranda', role: 'Gestor(a) Integrador(a)', image: '/images/team/official/alice-miranda.jpg', officialUrl: 'https://www.remax.pt/pt/agente/alice-miranda/123821473' },
  { name: 'Ana Paula Pereira', role: 'Consultora Associada', image: '/images/team/official/ana-paula-pereira.jpg', officialUrl: 'https://www.remax.pt/pt/agente/ana-paula-pereira/123821435' },
  { name: 'Anabela Amaral', role: 'Consultora Associada', image: '/images/team/official/anabela-amaral.jpg', officialUrl: 'https://www.remax.pt/pt/agente/anabela-amaral/123821364' },
  { name: 'Anabela Dinis', role: 'Consultora Associada', image: '/images/team/official/anabela-dinis.jpg', officialUrl: 'https://www.remax.pt/pt/agente/anabela-dinis/123821384' },
  { name: 'André Mayer', role: 'Diretor(a) de Agência', image: '/images/team/official/andre-mayer.jpg', officialUrl: 'https://www.remax.pt/pt/agente/andre-mayer/123821002' },
  { name: 'António Pereira da Silva', role: 'Consultor Associado', image: '/images/team/official/antonio-pereira-da-silva.jpg', officialUrl: 'https://www.remax.pt/pt/agente/antonio-pereira-da-silva/123821423' },
  { name: 'Bruno Afonso', role: 'Consultor Associado', image: '/images/team/official/bruno-afonso.jpg', officialUrl: 'https://www.remax.pt/pt/agente/bruno-afonso/123821478' },
  { name: 'Charles Adrien', role: 'Consultor Associado', image: '/images/team/official/charles-adrien.jpg', officialUrl: 'https://www.remax.pt/pt/agente/charles-adrien/123821455' },
  { name: 'Cláudia Granja', role: 'Gestor(a) de Recursos Humanos', image: '/images/team/official/claudia-granja.jpg', officialUrl: 'https://www.remax.pt/pt/agente/claudia-granja/123821301' },
  { name: 'Cristina Drumond', role: 'Consultora Associada', image: '/images/team/official/cristina-drumond.jpg', officialUrl: 'https://www.remax.pt/pt/agente/cristina-drumond/123821363' },
  { name: 'Elsa Silva', role: 'Consultora Associada', image: '/images/team/official/elsa-silva.jpg', officialUrl: 'https://www.remax.pt/pt/agente/elsa-silva/123821239' },
  { name: 'Filipe Vilela', role: 'Designer Gráfico', image: '/images/team/official/filipe-vilela.jpg', officialUrl: 'https://www.remax.pt/pt/agente/filipe-vilela/123821413' },
  { name: 'Frederico Pinto', role: 'Designer Gráfico', image: '/images/team/official/frederico-pinto.jpg', officialUrl: 'https://www.remax.pt/pt/agente/frederico-pinto/123821464' },
  { name: 'Gonçalo Matias', role: 'Consultor Associado', image: '/images/team/official/goncalo-matias.jpg', officialUrl: 'https://www.remax.pt/pt/agente/goncalo-matias/123821463' },
  { name: 'Graça Pinto', role: 'Consultora Associada', image: '/images/team/official/graca-pinto.jpg', officialUrl: 'https://www.remax.pt/pt/agente/graca-pinto/123821211' },
  { name: 'Gualdino Carvalho', role: 'Consultor Associado', image: '/images/team/official/gualdino-carvalho.jpg', officialUrl: 'https://www.remax.pt/pt/agente/gualdino-carvalho/123821462' },
  { name: 'Guilherme Machado', role: 'Consultor Associado', image: '/images/team/official/guilherme-machado.jpg', officialUrl: 'https://www.remax.pt/pt/agente/guilherme-machado/123821343' },
  { name: 'Hugo Araújo', role: 'Consultor Associado', image: '/images/team/official/hugo-araujo.jpg', officialUrl: 'https://www.remax.pt/pt/agente/hugo-araujo/123821476' },
  { name: 'Janete Macêdo', role: 'Consultora Associada', image: '/images/team/official/janete-macedo.jpg', officialUrl: 'https://www.remax.pt/pt/agente/janete-macedo/123821459' },
  { name: 'José Braz', role: 'Consultor Associado', image: '/images/team/official/jose-braz.jpg', officialUrl: 'https://www.remax.pt/pt/agente/jose-braz/123821029' },
  { name: 'José Cunha Lopes', role: 'Consultor Associado', image: '/images/team/official/jose-cunha-lopes.jpg', officialUrl: 'https://www.remax.pt/pt/agente/jose-cunha-lopes/123821031' },
  { name: 'José Neto', role: 'Consultor Associado', image: '/images/team/official/jose-neto.jpg', officialUrl: 'https://www.remax.pt/pt/agente/jose-neto/123821022' },
  { name: 'José Vieira', role: 'Consultor Associado', image: '/images/team/official/jose-vieira.jpg', officialUrl: 'https://www.remax.pt/pt/agente/jose-vieira/123821092' },
  { name: 'Lígia Mofreita', role: 'Gestor(a) de Processos', image: '/images/team/official/ligia-mofreita.jpg', officialUrl: 'https://www.remax.pt/pt/agente/ligia-mofreita/123821230' },
  { name: 'Lua Dinis', role: 'Consultora Associada', image: '/images/team/official/lua-dinis.jpg', officialUrl: 'https://www.remax.pt/pt/agente/lua-dinis/123821472' },
  { name: 'Lubna Braytih', role: 'Consultora Associada', image: '/images/team/official/lubna-braytih.jpg', officialUrl: 'https://www.remax.pt/pt/agente/lubna-braytih/123821401' },
  { name: 'Luís Abreu', role: 'Consultor Associado', image: '/images/team/official/luis-abreu.jpg', officialUrl: 'https://www.remax.pt/pt/agente/luis-abreu/123821251' },
  { name: 'Luís Guedes', role: 'Consultor Associado', image: '/images/team/official/luis-guedes.jpg', officialUrl: 'https://www.remax.pt/pt/agente/luis-guedes/123821367' },
  { name: 'Luís Ribeiro', role: 'Consultor Associado', image: '/images/team/official/luis-ribeiro.jpg', officialUrl: 'https://www.remax.pt/pt/agente/luis-ribeiro/123821347' },
  { name: 'Luís Velo', role: 'Consultor Associado', image: '/images/team/official/luis-velo.jpg', officialUrl: 'https://www.remax.pt/pt/agente/luis-velo/123821111' },
  { name: 'Luísa Leal', role: 'Consultora Associada', image: '/images/team/official/luisa-leal.jpg', officialUrl: 'https://www.remax.pt/pt/agente/luisa-leal/123821475' },
  { name: 'Luiz Souza', role: 'Consultor Associado', image: '/images/team/official/luiz-souza.jpg', officialUrl: 'https://www.remax.pt/pt/agente/luiz-souza/123821414' },
  { name: 'Marcelo Silva', role: 'Consultor Associado', image: '/images/team/official/marcelo-silva.jpg', officialUrl: 'https://www.remax.pt/pt/agente/marcelo-silva/123821465' },
  { name: 'Maria Neves', role: 'Consultora Associada', image: '/images/team/official/maria-neves.jpg', officialUrl: 'https://www.remax.pt/pt/agente/maria-neves/123821038' },
  { name: 'Mariana Mata', role: 'Diretor(a) Financeiro(a)', image: '/images/team/official/mariana-mata.jpg', officialUrl: 'https://www.remax.pt/pt/agente/mariana-mata/123821024' },
  { name: 'Martin Duran', role: 'Consultor Associado', image: '/images/team/official/martin-duran.jpg', officialUrl: 'https://www.remax.pt/pt/agente/martin-duran/123821437' },
  { name: 'Maura Sampaio', role: 'Consultora Associada', image: '/images/team/official/maura-sampaio.jpg', officialUrl: 'https://www.remax.pt/pt/agente/maura-sampaio/123821371' },
  { name: 'Nuno Macedo', role: 'Gestor(a) de Equipa Comercial', image: '/images/team/official/nuno-macedo.jpg', officialUrl: 'https://www.remax.pt/pt/agente/nuno-macedo/123821436' },
  { name: 'Nuno Silva', role: 'Consultor Associado', image: '/images/team/official/nuno-silva.jpg', officialUrl: 'https://www.remax.pt/pt/agente/nuno-silva/123821468' },
  { name: 'Paulo Pinto', role: 'Diretor(a) de Agência', image: '/images/team/official/paulo-pinto.jpg', officialUrl: 'https://www.remax.pt/pt/agente/paulo-pinto/123821001' },
  { name: 'Pedro Brandão', role: 'Consultor Associado', image: '/images/team/official/pedro-brandao.jpg', officialUrl: 'https://www.remax.pt/pt/agente/pedro-brandao/123821430' },
  { name: 'Rita Alçada Ramos', role: 'Consultora Associada', image: '/images/team/official/rita-alcada-ramos.jpg', officialUrl: 'https://www.remax.pt/pt/agente/rita-alcada-ramos/123821412' },
  { name: 'Sandra Pimenta', role: 'Gestor(a) de Equipa Comercial', image: '/images/team/official/sandra-pimenta.jpg', officialUrl: 'https://www.remax.pt/pt/agente/sandra-pimenta/123821407' },
  { name: 'Sara Rodrigues', role: 'Coordenador(a)', image: '/images/team/official/sara-rodrigues.jpg', officialUrl: 'https://www.remax.pt/pt/agente/sara-rodrigues/123821340' },
  { name: 'Silvia Alves Pereira', role: 'Diretor(a) de Agência', image: '/images/team/official/silvia-alves-pereira.jpg', officialUrl: 'https://www.remax.pt/pt/agente/silvia-alves-pereira/123821064' },
  { name: 'Sónia Cerqueira', role: 'Coordenador(a)', image: '/images/team/official/sonia-cerqueira.jpg', officialUrl: 'https://www.remax.pt/pt/agente/sonia-cerqueira/123821217' },
  { name: 'Teresa Marques', role: 'Consultora Associada', image: '/images/team/official/teresa-marques.jpg', officialUrl: 'https://www.remax.pt/pt/agente/teresa-marques/123821099' },
  { name: 'Teresa Mota', role: 'Consultora Associada', image: '/images/team/official/teresa-mota.jpg', officialUrl: 'https://www.remax.pt/pt/agente/teresa-mota/123821431' },
  { name: 'Tiago Almeida', role: 'Consultor Associado', image: '/images/team/official/tiago-almeida.jpg', officialUrl: 'https://www.remax.pt/pt/agente/tiago-almeida/123821361' },
  { name: 'Tiago Mogadouro Aguiar', role: 'Consultor Associado', image: '/images/team/official/tiago-mogadouro-aguiar.jpg', officialUrl: 'https://www.remax.pt/pt/agente/tiago-mogadouro-aguiar/123821429' },
  { name: 'Vinicius Torinelli', role: 'Designer Gráfico', image: '/images/team/official/vinicius-torinelli.jpg', officialUrl: 'https://www.remax.pt/pt/agente/vinicius-torinelli/123821382' },
  { name: 'Alex Prazeres', role: 'Agente em Formação', image: null, officialUrl: null },
  { name: 'Pedro Couto', role: 'Gestor(a) de Acompanhamento', image: '/images/team/official/pedro-couto.jpg', officialUrl: null },
  { name: 'Salviano Cruz', role: 'Agente em Formação', image: '/images/team/official/salviano-cruz.jpg', officialUrl: null },
  { name: 'Sónia Santos', role: 'Gestor(a) de Recursos Humanos', image: '/images/team/official/sonia-santos.jpg', officialUrl: null },
  { name: 'Tiago Quintas', role: 'Agente em Formação', image: '/images/team/official/tiago-quintas.jpg', officialUrl: null },
];

// HONEST by design — qualitative, brand-true claims, NO invented figures.
// When the client confirms real, verifiable numbers (nº de consultores,
// negócios fechados, anos de atividade), swap a `value` for the real figure
// or the explicit placeholder '[INSERIR NÚMERO REAL]'.
export const teamStats: TeamStat[] = [
  { icon: 'users', value: 'Equipa', label: 'Consultores dedicados' },
  { icon: 'building', value: 'Porto', label: 'Especialistas no mercado local' },
  { icon: 'diamond', value: 'Premium', label: 'Foco no segmento de luxo' },
  { icon: 'shield-check', value: 'Confiança', label: 'O cliente em primeiro lugar' },
];
