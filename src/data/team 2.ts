// ============================================================
// Equipa — "A Nossa Equipa" showcase used in /sobre-nos.
//
// ⚠️ PLACEHOLDER DATA — NOT FOR PRODUCTION.
// The carousel currently shows 51 AI-generated portraits (team-01.jpg …
// team-51.jpg) with INVENTED names/roles, so the design can be previewed full.
// Before launch, replace `PLACEHOLDER_TEAM` below with the real consultants:
//   • real name + role for each person (never invent),
//   • verified photo↔name pairing,
//   • ideally add .webp variants (<slug>-400.webp, <slug>-600.webp) and set
//     hasWebp:true for crisp, lighter images.
// The earlier hand-picked five (jose-vieira/ligia-mofreita/luis-dinis/
// lubna-braylih/luis-abreu, with .webp) still live in /public/images/team/ if
// you want to map real names back onto those faces.
//
// PLACEHOLDER(stats): the four metrics below (25+, 500+, 15+, 100%) come
// from the design reference and are NOT yet confirmed for this agency.
// Confirm the real figures with the client before publishing.
// ============================================================

export interface Consultant {
  name: string;
  role: string;
  /**
   * Base path for the portrait, WITHOUT extension (e.g. '/images/team/jose-vieira').
   * The card derives <slug>-400.webp, <slug>-600.webp and <slug>.jpg from it.
   * null → dignified gold-monogram fallback (no broken image).
   */
  image: string | null;
  /** Service area / zona (e.g. 'Foz'). null until confirmed by the client. */
  zone: string | null;
  /** Direct phone. null until confirmed by the client. */
  phone: string | null;
  /** Direct email. null until confirmed by the client. */
  email: string | null;
  /** Optional grouping/filter label, reserved for future use. */
  category?: string;
  /** Whether responsive .webp sources exist on disk; false → use .jpg only. */
  hasWebp?: boolean;
  /** True while name/role are invented placeholders awaiting the real data. */
  placeholder?: boolean;
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
  cta: { label: 'Conhecer toda a equipa', href: '/contacto' },
} as const;

// ⚠️ PLACEHOLDER NAMES — DO NOT SHIP. The 51 portraits below are AI-generated
// images selected from the client's batch; the names/roles are INVENTED only so
// the team carousel can be previewed full. Replace `PLACEHOLDER_TEAM` with the
// real consultants (real names + roles, photo↔name verified) before launch.
// The portrait files are team-01.jpg … team-51.jpg in /public/images/team/
// (JPG only — no .webp variants yet, hence hasWebp:false).
const PLACEHOLDER_TEAM: { name: string; role: string }[] = [
  { name: 'Mariana Costa', role: 'Consultora Imobiliária' },
  { name: 'André Ferreira', role: 'Consultor Imobiliário' },
  { name: 'Sofia Carvalho', role: 'Consultora Imobiliária' },
  { name: 'Tiago Magalhães', role: 'Consultor Imobiliário' },
  { name: 'Beatriz Nogueira', role: 'Consultora Imobiliária' },
  { name: 'Ricardo Pinto', role: 'Consultor Imobiliário' },
  { name: 'Inês Tavares', role: 'Consultora Imobiliária' },
  { name: 'Miguel Antunes', role: 'Consultor Imobiliário' },
  { name: 'Catarina Lopes', role: 'Consultora Imobiliária' },
  { name: 'Pedro Faria', role: 'Consultor Imobiliário' },
  { name: 'Helena Marques', role: 'Diretora Comercial' },
  { name: 'Bruno Saraiva', role: 'Consultor Imobiliário' },
  { name: 'Carolina Pereira', role: 'Consultora Imobiliária' },
  { name: 'Nuno Cardoso', role: 'Consultor Imobiliário' },
  { name: 'Rita Amaral', role: 'Consultora Imobiliária' },
  { name: 'Gonçalo Esteves', role: 'Consultor Imobiliário' },
  { name: 'Daniela Fonseca', role: 'Consultora Imobiliária' },
  { name: 'Hugo Barbosa', role: 'Consultor Imobiliário' },
  { name: 'Patrícia Lima', role: 'Consultora Imobiliária' },
  { name: 'Vasco Teixeira', role: 'Consultor Imobiliário' },
  { name: 'Joana Ribeiro', role: 'Consultora Imobiliária' },
  { name: 'Filipe Moreira', role: 'Consultor Imobiliário' },
  { name: 'Marta Sousa', role: 'Consultora Imobiliária' },
  { name: 'Diogo Rocha', role: 'Consultor Imobiliário' },
  { name: 'Cláudia Matos', role: 'Consultora Imobiliária' },
  { name: 'Rui Santos', role: 'Consultor Imobiliário' },
  { name: 'Vera Cunha', role: 'Consultora Imobiliária' },
  { name: 'Luís Cordeiro', role: 'Consultor Sénior' },
  { name: 'Ana Reis', role: 'Consultora Imobiliária' },
  { name: 'Fábio Macedo', role: 'Consultor Imobiliário' },
  { name: 'Teresa Branco', role: 'Consultora Imobiliária' },
  { name: 'Sérgio Vaz', role: 'Consultor Imobiliário' },
  { name: 'Mafalda Guerreiro', role: 'Consultora Imobiliária' },
  { name: 'João Pacheco', role: 'Consultor Imobiliário' },
  { name: 'Cristina Lourenço', role: 'Gestora de Processos' },
  { name: 'Paulo Henriques', role: 'Consultor Imobiliário' },
  { name: 'Susana Bastos', role: 'Consultora Imobiliária' },
  { name: 'Henrique Valente', role: 'Consultor Imobiliário' },
  { name: 'Liliana Coelho', role: 'Consultora Imobiliária' },
  { name: 'Marco Freitas', role: 'Consultor Imobiliário' },
  { name: 'Sara Monteiro', role: 'Consultora Imobiliária' },
  { name: 'Eduardo Lobo', role: 'Consultor Imobiliário' },
  { name: 'Raquel Figueiredo', role: 'Consultora Imobiliária' },
  { name: 'Jorge Mendes', role: 'Consultor Imobiliário' },
  { name: 'Cátia Neves', role: 'Consultora Imobiliária' },
  { name: 'Alexandre Brito', role: 'Consultor Imobiliário' },
  { name: 'Carla Sampaio', role: 'Coordenadora de Vendas' },
  { name: 'Duarte Almeida', role: 'Consultor Imobiliário' },
  { name: 'Vanessa Pires', role: 'Consultora Imobiliária' },
  { name: 'Telmo Castro', role: 'Consultor Imobiliário' },
  { name: 'Madalena Fontes', role: 'Consultora Imobiliária' },
];

export const consultants: Consultant[] = PLACEHOLDER_TEAM.map((p, i) => ({
  name: p.name,
  role: p.role,
  image: `/images/team/team-${String(i + 1).padStart(2, '0')}`,
  zone: null,
  phone: null,
  email: null,
  hasWebp: false,
  placeholder: true,
}));

export const teamStats: TeamStat[] = [
  { icon: 'users', value: '25+', label: 'Consultores' },
  { icon: 'building', value: '500+', label: 'Negócios fechados' },
  { icon: 'clock', value: '15+', label: 'Anos de experiência' },
  { icon: 'shield-check', value: '100%', label: 'Foco no cliente' },
];
