// ============================================================
// Centro de apoio (/apoio) — conteúdo editável fora do markup.
//
// FAQs, tópicos e canais são conteúdo real e relevante para o negócio.
// Itens com PLACEHOLDER aguardam dados reais do cliente (ver comentários).
// Os contactos são lidos de site.ts (fonte única) — quando lá forem
// atualizados, atualizam aqui automaticamente.
// ============================================================
import { site } from './site';

/* ---------- Pesquisa (visual por agora) ---------- */
// TODO: ligar a pesquisa real quando houver conteúdo suficiente.
export const supportSearchPlaceholder = 'Pesquisar por dúvidas, serviços ou tópicos…';

/* ---------- Secção 2 — Tópicos ---------- */
export interface SupportTopic {
  icon: string;
  title: string;
  text: string;
  href: string;
}

// `href` aponta para destinos reais já existentes no site; tópicos sem página
// dedicada enviam para a FAQ (#faq) ou para o contacto.
export const supportTopics: SupportTopic[] = [
  { icon: 'key', title: 'Comprar imóvel', text: 'Processo de compra, visitas, propostas e documentação.', href: '/comprar' },
  { icon: 'target', title: 'Vender imóvel', text: 'Avaliação, angariação, divulgação e venda.', href: '/#vender' },
  { icon: 'document', title: 'Documentação', text: 'Contratos, certidões e requisitos legais.', href: '#faq' },
  { icon: 'briefcase', title: 'Financiamento', text: 'Crédito habitação, parcerias e simulações.', href: '#faq' },
  { icon: 'handshake', title: 'Pós-venda', text: 'Escritura, registo e acompanhamento.', href: '#faq' },
  { icon: 'clock', title: 'Visitas e agendamentos', text: 'Marcar, reagendar e preparar a visita.', href: '/contacto' },
  { icon: 'scale', title: 'Avaliação de imóveis', text: 'Como funciona, prazos e o que inclui.', href: '/#vender' },
  { icon: 'compass', title: 'Outros assuntos', text: 'Outras dúvidas ou pedidos gerais.', href: '/contacto' },
];

/* ---------- Secção 3 — Perguntas frequentes ---------- */
export interface Faq {
  q: string;
  a: string;
}

// Conteúdo real e relevante para o negócio (fornecido pelo cliente).
export const faqs: Faq[] = [
  {
    q: 'Quais os documentos necessários para vender um imóvel?',
    a: 'Para iniciar o processo de venda, são geralmente necessários: caderneta predial, certidão de teor do registo predial, licença de utilização (para imóveis posteriores a 1951), certificado energético e documentos de identificação do proprietário. A nossa equipa orienta-o em cada passo.',
  },
  {
    q: 'O que inclui a avaliação gratuita?',
    a: 'A nossa avaliação é uma análise estratégica confidencial que inclui: estudo do imóvel e da zona, análise de comparáveis de mercado, posicionamento recomendado e estratégia de apresentação. Não é apenas um número — é uma visão do potencial real do seu imóvel.',
  },
  {
    q: 'Quanto tempo demora a vender um imóvel com a RE/MAX Collection Vintage?',
    a: 'Depende do tipo de imóvel, da zona e das condições de mercado. Imóveis bem posicionados e apresentados com estratégia tendem a vender mais rápido e com melhores condições. Na primeira reunião, damos-lhe uma estimativa realista para o seu caso concreto.',
  },
  {
    q: 'A avaliação é mesmo confidencial?',
    a: 'Sim, totalmente. Toda a informação partilhada connosco é tratada com total discrição. Não partilhamos dados com terceiros sem autorização. O processo é confidencial desde a primeira conversa.',
  },
  {
    q: 'Trabalham apenas no Porto?',
    a: 'Somos especializados em imóveis de carácter no Porto — em oito zonas de eleição, da Foz do Douro à Baixa e Aliados. Para imóveis fora destas zonas, a rede RE/MAX Collection® tem representação a nível nacional e internacional.',
  },
  {
    q: 'Posso agendar uma visita a um imóvel sem compromisso?',
    a: 'Sim. Pode contactar-nos por telefone ou através do formulário de contacto. As visitas são sem compromisso e organizadas com total discrição.',
  },
  {
    q: 'Como funciona a comissão de mediação?',
    a: 'A comissão é paga pelo vendedor e apenas na conclusão da venda. Não há custos iniciais nem taxas de avaliação. Na primeira reunião explicamos tudo de forma clara e transparente.',
  },
  {
    q: 'O que é o RE/MAX Collection®?',
    a: "O RE/MAX Collection® é a linha premium da rede RE/MAX, dedicada a imóveis de alto valor e carácter. O sub-brand 'Vintage' identifica a nossa agência no Porto, especializada em imóveis com história, arquitetura e localização distintas.",
  },
];

/* ---------- Secção 4 — Contacto rápido ---------- */
export interface ContactChannel {
  icon: string;
  label: string;
  detail: string;
  sub?: string;
  cta: { label: string; href: string };
  external?: boolean;
}

// Morada → pesquisa no Google Maps (funciona assim que a morada real for definida em site.ts).
const mapsHref =
  'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(site.address.join(', '));

// PLACEHOLDER(contacto): número, email e morada vêm de site.ts e estão
// marcados lá como TODO(contacto) — substituir pelos reais antes de publicar.
export const contactChannels: ContactChannel[] = [
  { icon: 'phone', label: 'Telefone', detail: site.phone, sub: 'Chamada para a rede fixa nacional', cta: { label: 'Ligar', href: site.phoneHref } },
  { icon: 'mail', label: 'Formulário', detail: 'Escreva-nos em qualquer momento', sub: 'Resposta com a discrição de sempre', cta: { label: 'Abrir formulário', href: '/contacto' } },
  { icon: 'pin', label: 'Visita', detail: site.address.join(', '), sub: 'Com marcação prévia', cta: { label: 'Ver no mapa', href: mapsHref }, external: true },
];

/* ---------- Secção 5 — Compromisso de qualidade ---------- */
export interface QualityCommitment {
  icon: string;
  value: string;
  label: string;
}

// NOTE(apoio-stats): apenas factos verificados ou compromissos qualitativos.
// "Até 4h úteis" e "7 dias/semana" foram REMOVIDOS (2026-07-10): eram
// compromissos por validar e contradiziam-se — repor apenas com confirmação
// escrita da agência. "Desde 2014" é facto verificado (perfil oficial remax.pt).
export const qualityCommitments: QualityCommitment[] = [
  { icon: 'shield-check', value: '100% confidencial', label: 'Segurança e privacidade' },
  { icon: 'award', value: 'Desde 2014', label: 'Presença no Porto' },
  { icon: 'users', value: 'Equipa dedicada', label: 'Acompanhamento próximo' },
  { icon: 'diamond', value: 'Segmento premium', label: 'Especialistas no Porto' },
];

/* ---------- Secção 6 — Guias úteis ---------- */
export interface Guide {
  title: string;
  image: string;
  href: string;
  kicker: string;
}

// Guias: apontam para as páginas de método REAIS (/comprar e /vender, com
// conteúdo dos guias oficiais impressos) e para a avaliação na homepage.
// O cartão «Mercado» foi removido (2026-07-10): apontava para o hub /insights,
// que só tem artigos placeholder (noindex) — repor quando houver conteúdo real.
export const guides: Guide[] = [
  { title: 'Guia do Comprador', kicker: 'Comprar', image: '/images/porto/editorial-visita.webp', href: '/comprar' },
  { title: 'Guia do Vendedor', kicker: 'Vender', image: '/images/porto/editorial-fotografia.webp', href: '/vender' },
  { title: 'Como funciona a Avaliação', kicker: 'Avaliação', image: '/images/porto/editorial-consultoria.webp', href: '/#vender' },
];

/* ---------- Secção 7 — Concierge ---------- */
export const concierge = {
  eyebrow: 'Apoio personalizado',
  title: 'Precisa de apoio personalizado? Fale com o nosso Concierge.',
  text: 'Para questões mais complexas ou apoio exclusivo, a nossa equipa está pronta para ajudar.',
  cta: { label: 'Solicitar atendimento', href: '/contacto' },
} as const;
