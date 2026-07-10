// ============================================================
// Equipa — "A Nossa Equipa" showcase used in /sobre-nos.
//
// NAMES & ROLES: REAL — taken verbatim from the official RE/MAX Collection
// Vintage roster (the 4 source screenshots G provided). Roles keep the exact
// gender-neutral form used there, e.g. "Gestor(a) de Recursos Humanos".
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
  { name: 'Alexandrina Magalhães', role: 'Agente Associado' },
  { name: 'Alice Miranda', role: 'Gestor(a) Integrador(a)' },
  { name: 'Ana Paula Pereira', role: 'Agente Associado' },
  { name: 'Anabela Amaral', role: 'Agente Associado' },
  { name: 'Anabela Dinis', role: 'Agente Associado' },
  { name: 'André Mayer', role: 'Diretor(a) de Agência' },
  { name: 'António Pereira da Silva', role: 'Agente Associado' },
  { name: 'Bruno Afonso', role: 'Agente Associado' },
  { name: 'Charles Adrien', role: 'Agente Associado' },
  { name: 'Cristina Drumond', role: 'Agente Associado' },
  { name: 'Elsa Silva', role: 'Agente Associado' },
  { name: 'Filipe Vilela', role: 'Designer Gráfico' },
  { name: 'Frederico Pinto', role: 'Designer Gráfico' },
  { name: 'Graça Pinto', role: 'Agente Associado' },
  { name: 'Gualdino Carvalho', role: 'Agente Associado' },
  { name: 'Guilherme Machado', role: 'Agente Associado' },
  { name: 'Hugo Araújo', role: 'Agente Associado' },
  { name: 'Janete Macêdo', role: 'Agente Associado' },
  { name: 'Joana Silva', role: 'Agente Associado' },
  { name: 'José Braz', role: 'Agente Associado' },
  { name: 'José Cunha Lopes', role: 'Agente Associado' },
  { name: 'José Neto', role: 'Agente Associado' },
  { name: 'José Vieira', role: 'Agente Associado' },
  { name: 'Lígia Mofreita', role: 'Gestor(a) de Processos' },
  { name: 'Lua Dinis', role: 'Agente Associado' },
  { name: 'Lubna Braytih', role: 'Agente Associado' },
  { name: 'Luís Abreu', role: 'Agente Associado' },
  { name: 'Luís Guedes', role: 'Agente Associado' },
  { name: 'Luís Ribeiro', role: 'Agente Associado' },
  { name: 'Luís Velo', role: 'Agente Associado' },
  { name: 'Luísa Leal', role: 'Agente Associado' },
  { name: 'Luiz Souza', role: 'Agente Associado' },
  { name: 'Marcelo Silva', role: 'Agente Associado' },
  { name: 'Márcia Basto', role: 'Agente Associado' },
  { name: 'Maria Neves', role: 'Agente Associado' },
  { name: 'Mariana Mata', role: 'Diretor(a) Financeiro(a)' },
  { name: 'Martin Duran', role: 'Agente Associado' },
  { name: 'Maura Sampaio', role: 'Agente Associado' },
  { name: 'Nuno Macedo', role: 'Gestor(a) de Equipa Comercial' },
  { name: 'Nuno Silva', role: 'Agente Associado' },
  { name: 'Paulo Pinto', role: 'Diretor(a) de Agência' },
  { name: 'Pedro Brandão', role: 'Agente Associado' },
  { name: 'Rita Alçada Ramos', role: 'Agente Associado' },
  { name: 'Sandra Pimenta', role: 'Gestor(a) de Equipa Comercial' },
  { name: 'Sara Rodrigues', role: 'Coordenador(a)' },
  { name: 'Silvia Alves Pereira', role: 'Diretor(a) de Agência' },
  { name: 'Sónia Cerqueira', role: 'Coordenador(a)' },
  { name: 'Teresa Marques', role: 'Agente Associado' },
  { name: 'Teresa Mota', role: 'Agente Associado' },
  { name: 'Tiago Almeida', role: 'Agente Associado' },
  { name: 'Tiago Mogadouro Aguiar', role: 'Agente Associado' },
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
