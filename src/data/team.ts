// ============================================================
// Equipa — "A Nossa Equipa" showcase used in /sobre-nos.
//
// NAMES & ROLES: REAL — taken from the official RE/MAX Collection Vintage
// roster (the 4 source screenshots G provided). Staff roles keep the exact
// gender-neutral form used there, e.g. "Gestor(a) de Recursos Humanos".
// EXCEPTION (owner ask 2026-07-10): the roster's "Agente Associado" is shown
// gendered — "Consultor Associado" / "Consultora Associada" per person.
//
// PHOTOS (estado 2026-07-10): os retratos gerados por IA foram REMOVIDOS do
// site e do repositório — eram enganadores junto a nomes reais. Só a Sónia
// Santos tem fotografia real (sonia-santos.jpg); todos os restantes usam o
// monograma dourado até G fornecer cada headshot real (adicionar ficheiro em
// /public/images/team/ + entrada em REAL_PHOTOS).
//
// NOTE: the official roster shows a "Collection" badge on some people and a
// RE/MAX-balloon placeholder for those without photos. Our card component has
// neither (no badge; gold-monogram instead of the balloon). Replicating the
// badge would require new card UI — left out pending G's go-ahead.
//
// STATS: the strip below uses honest, qualitative claims (NO invented figures).
// Swap in real, verifiable numbers when the client confirms them.
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

// REAL roster — names + roles verbatim from the official RE/MAX Collection
// Vintage team page (G's 4 screenshots), in the same order shown there:
// alphabetical by first name, with the 5 trainees / support staff appended last
// exactly as in the source. 59 people. Photos are assigned in the map below.
const REAL_TEAM: { name: string; role: string }[] = [
  { name: 'Alexandrina Magalhães', role: 'Consultora Associada' },
  { name: 'Alice Miranda', role: 'Gestor(a) Integrador(a)' },
  { name: 'Ana Paula Pereira', role: 'Consultora Associada' },
  { name: 'Anabela Amaral', role: 'Consultora Associada' },
  { name: 'Anabela Dinis', role: 'Consultora Associada' },
  { name: 'André Mayer', role: 'Diretor(a) de Agência' },
  { name: 'António Pereira da Silva', role: 'Consultor Associado' },
  { name: 'Bruno Afonso', role: 'Consultor Associado' },
  { name: 'Charles Adrien', role: 'Consultor Associado' },
  { name: 'Cristina Drumond', role: 'Consultora Associada' },
  { name: 'Elsa Silva', role: 'Consultora Associada' },
  { name: 'Filipe Vilela', role: 'Designer Gráfico' },
  { name: 'Frederico Pinto', role: 'Designer Gráfico' },
  { name: 'Graça Pinto', role: 'Consultora Associada' },
  { name: 'Gualdino Carvalho', role: 'Consultor Associado' },
  { name: 'Guilherme Machado', role: 'Consultor Associado' },
  { name: 'Hugo Araújo', role: 'Consultor Associado' },
  { name: 'Janete Macêdo', role: 'Consultora Associada' },
  { name: 'Joana Silva', role: 'Consultora Associada' },
  { name: 'José Braz', role: 'Consultor Associado' },
  { name: 'José Cunha Lopes', role: 'Consultor Associado' },
  { name: 'José Neto', role: 'Consultor Associado' },
  { name: 'José Vieira', role: 'Consultor Associado' },
  { name: 'Lígia Mofreita', role: 'Gestor(a) de Processos' },
  { name: 'Lua Dinis', role: 'Consultora Associada' },
  { name: 'Lubna Braytih', role: 'Consultora Associada' },
  { name: 'Luís Abreu', role: 'Consultor Associado' },
  { name: 'Luís Guedes', role: 'Consultor Associado' },
  { name: 'Luís Ribeiro', role: 'Consultor Associado' },
  { name: 'Luís Velo', role: 'Consultor Associado' },
  { name: 'Luísa Leal', role: 'Consultora Associada' },
  { name: 'Luiz Souza', role: 'Consultor Associado' },
  { name: 'Marcelo Silva', role: 'Consultor Associado' },
  { name: 'Márcia Basto', role: 'Consultora Associada' },
  { name: 'Maria Neves', role: 'Consultora Associada' },
  { name: 'Mariana Mata', role: 'Diretor(a) Financeiro(a)' },
  { name: 'Martin Duran', role: 'Consultor Associado' },
  { name: 'Maura Sampaio', role: 'Consultora Associada' },
  { name: 'Nuno Macedo', role: 'Gestor(a) de Equipa Comercial' },
  { name: 'Nuno Silva', role: 'Consultor Associado' },
  { name: 'Paulo Pinto', role: 'Diretor(a) de Agência' },
  { name: 'Pedro Brandão', role: 'Consultor Associado' },
  { name: 'Rita Alçada Ramos', role: 'Consultora Associada' },
  { name: 'Sandra Pimenta', role: 'Gestor(a) de Equipa Comercial' },
  { name: 'Sara Rodrigues', role: 'Coordenador(a)' },
  { name: 'Silvia Alves Pereira', role: 'Diretor(a) de Agência' },
  { name: 'Sónia Cerqueira', role: 'Coordenador(a)' },
  { name: 'Teresa Marques', role: 'Consultora Associada' },
  { name: 'Teresa Mota', role: 'Consultora Associada' },
  { name: 'Tiago Almeida', role: 'Consultor Associado' },
  { name: 'Tiago Mogadouro Aguiar', role: 'Consultor Associado' },
  { name: 'Vinicius Torinelli', role: 'Designer Gráfico' },
  { name: 'Pedro Couto', role: 'Gestor(a) de Acompanhamento' },
  { name: 'Sónia Santos', role: 'Gestor(a) de Recursos Humanos' },
];

// AI placeholder portraits: REMOVIDOS (2026-07-10). Retratos gerados por IA
// junto a nomes de pessoas reais eram enganadores — quem não tem fotografia
// real em REAL_PHOTOS usa agora o monograma dourado (fallback do componente).
// Para repor fotografias: colocar o ficheiro real em /public/images/team/ e
// acrescentar a pessoa a REAL_PHOTOS — nunca voltar a usar caras geradas.

// Real photos we genuinely have on disk (the actual person). Add to this map as
// G sends each real headshot.
const REAL_PHOTOS: Record<string, { image: string; hasWebp: boolean }> = {
  'Sónia Santos': { image: '/images/team/sonia-santos', hasWebp: false },
};

export const consultants: Consultant[] = REAL_TEAM.map((p) => {
  const base = { name: p.name, role: p.role, zone: null, phone: null, email: null };
  const real = REAL_PHOTOS[p.name];
  if (real) return { ...base, image: real.image, hasWebp: real.hasWebp, placeholder: false };
  return { ...base, image: null, hasWebp: false, placeholder: true };
});

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
