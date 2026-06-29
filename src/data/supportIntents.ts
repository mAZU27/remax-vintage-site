// ============================================================
// Intent detection for the Collection Vintage assistant.
//
// Lightweight, dependency-free keyword matching: the user's text is normalized
// (lowercased, accent-stripped) and scored against each intent's keywords. The
// best-scoring intent wins; ties break by definition order (more specific
// intents are listed first). A separate FAQ search lets the engine answer
// concrete questions directly from the real FAQ content.
// ============================================================
import { faqList } from './supportKnowledge';

export type IntentId =
  | 'saudacao'
  | 'agradecimento'
  | 'vender'
  | 'comprar'
  | 'alugar'
  | 'avaliacao'
  | 'pedir_avaliacao'
  | 'visita'
  | 'contacto'
  | 'localizacao'
  | 'horario'
  | 'zonas'
  | 'imoveis'
  | 'processo_compra'
  | 'processo_venda'
  | 'processo_arrendamento'
  | 'servicos'
  | 'comissao'
  | 'documentos'
  | 'confidencialidade'
  | 'blog'
  | 'carreiras'
  | 'equipa'
  | 'empresa'
  | 'reconhecimento'
  | 'humano'
  | 'preco'
  | 'urgente'
  | 'problema';

export interface Intent {
  id: IntentId;
  keywords: string[];
  /** Multi-word phrases that strongly signal this intent (weighted higher). */
  phrases?: string[];
}

export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip accents
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Order matters: more specific intents first so they win ties.
export const intents: Intent[] = [
  { id: 'agradecimento', keywords: ['obrigado', 'obrigada', 'agradecido', 'grato'], phrases: ['muito obrigado', 'obrigada'] },
  { id: 'saudacao', keywords: ['ola', 'bom dia', 'boa tarde', 'boa noite', 'hello', 'hey', 'viva', 'oi'] },
  { id: 'humano', keywords: ['humano', 'pessoa', 'alguem', 'consultor', 'equipa', 'atendimento', 'falar'], phrases: ['falar com alguem', 'falar com a equipa', 'falar com um consultor', 'preciso de falar', 'falar com um humano'] },

  { id: 'urgente', keywords: ['urgente', 'rapido', 'pressa', 'ja', 'hoje', 'amanha', 'imediato', 'asap'], phrases: ['preciso urgente', 'nao tenho tempo', 'e urgente'] },
  { id: 'problema', keywords: ['problema', 'problemas', 'erro', 'nao funciona', 'quebrado', 'falha', 'nao consigo', 'ajuda', 'socorro'], phrases: ['tem um problema', 'nao esta a funcionar', 'preciso de ajuda', 'pode ajudar'] },

  { id: 'processo_venda', keywords: [], phrases: ['processo de venda', 'como funciona a venda', 'como vendo', 'passos para vender', 'como vender'] },
  { id: 'processo_compra', keywords: [], phrases: ['processo de compra', 'como funciona a compra', 'como comprar', 'passos para comprar'] },
  { id: 'processo_arrendamento', keywords: [], phrases: ['processo de arrendamento', 'como funciona o arrendamento', 'como arrendo'] },

  { id: 'pedir_avaliacao', keywords: [], phrases: ['pedir avaliacao', 'como pedir avaliacao', 'quero avaliacao', 'solicitar avaliacao', 'marcar avaliacao', 'avaliar imovel'] },
  { id: 'avaliacao', keywords: ['avaliacao', 'avaliar', 'valor', 'vale', 'quanto vale', 'estimativa', 'preco do imovel'], phrases: ['avaliar o meu imovel', 'quanto vale a minha casa'] },

  { id: 'preco', keywords: ['preco', 'precos', 'valor', 'custa', 'custam', 'quanto', 'investimento', 'custo'], phrases: ['quanto custa', 'qual o preco', 'qual e o preco', 'preço de venda'] },
  { id: 'comissao', keywords: ['comissao', 'comissoes', 'honorarios', 'percentagem', 'taxa'], phrases: ['quanto custa vender', 'custo de vender', 'quanto cobram', 'taxa de mediacao'] },
  { id: 'documentos', keywords: ['documentos', 'documentacao', 'papeis', 'caderneta', 'certidao', 'licenca', 'certificado'], phrases: ['documentos para vender', 'que documentos'] },
  { id: 'confidencialidade', keywords: ['confidencial', 'confidencialidade', 'discricao', 'privacidade', 'discreto', 'sigilo'] },

  { id: 'vender', keywords: ['vender', 'venda', 'vendo', 'vendedor'], phrases: ['vender o meu imovel', 'vender a minha casa', 'quero vender', 'interessado em vender'] },
  { id: 'comprar', keywords: ['comprar', 'compra', 'adquirir', 'comprador', 'procuro'], phrases: ['comprar casa', 'comprar um imovel', 'quero comprar', 'procuro casa', 'estou a procura'] },
  { id: 'alugar', keywords: ['alugar', 'arrendar', 'arrendamento', 'aluguel', 'renda', 'inquilino', 'senhorio'], phrases: ['alugar casa', 'quero arrendar', 'procuro para arrendar'] },

  { id: 'visita', keywords: ['visita', 'visitar', 'agendar', 'agendamento', 'marcacao', 'ver'], phrases: ['marcar visita', 'marcar uma visita', 'agendar visita', 'ver o imovel', 'agendar visita'] },

  { id: 'contacto', keywords: ['contacto', 'contactos', 'telefone', 'telemovel', 'email', 'mail', 'whatsapp', 'numero', 'como contactar'], phrases: ['como vos contacto', 'qual o contacto', 'qual e o contacto', 'dados de contacto'] },
  { id: 'localizacao', keywords: ['onde', 'morada', 'localizacao', 'endereco', 'escritorio', 'sede', 'ficam', 'ficais', 'mapa'], phrases: ['onde ficam', 'onde estao', 'onde fica', 'qual a morada'] },
  { id: 'horario', keywords: ['horario', 'horarios', 'aberto', 'abrem', 'fecham', 'funciona', 'atende'], phrases: ['a que horas', 'horario de funcionamento', 'quando abrem'] },

  { id: 'zonas', keywords: ['zona', 'zonas', 'foz', 'boavista', 'ribeira', 'cedofeita', 'area', 'areas'], phrases: ['que zonas', 'em que zonas', 'quais sao as zonas'] },
  { id: 'imoveis', keywords: ['imoveis', 'imovel', 'casas', 'casa', 'apartamento', 'apartamentos', 'moradia', 'moradias', 'catalogo', 'listagem', 'disponivel', 'disponiveis', 't2', 't3', 't4'], phrases: ['imoveis disponiveis', 'que imoveis', 'tem casas', 'tem apartamentos', 'ver imoveis'] },

  { id: 'servicos', keywords: ['servico', 'servicos', 'ajudam', 'fazem', 'prestam', 'oferecem'], phrases: ['que servicos', 'o que fazem', 'que servicos oferecem'] },
  { id: 'blog', keywords: ['blog', 'artigo', 'artigos', 'insights', 'noticias', 'guia', 'guias', 'mercado', 'conteudo'], phrases: ['artigos', 'blog de', 'ver artigos'] },
  { id: 'carreiras', keywords: ['carreira', 'carreiras', 'emprego', 'trabalhar', 'vaga', 'vagas', 'recrutamento', 'candidatura', 'consultora', 'consultor', 'job'], phrases: ['trabalhar convosco', 'quero trabalhar', 'candidatar', 'oportunidades de trabalho'] },
  { id: 'equipa', keywords: ['equipa', 'consultores', 'quem sao', 'agentes', 'team', 'staff'], phrases: ['quem e a equipa', 'a vossa equipa', 'conhecer equipa'] },
  { id: 'reconhecimento', keywords: ['premio', 'premios', 'reconhecimento', 'experiencia', 'galardao', 'distincao', 'award'], phrases: ['premios recebidos', 'reconhecimento'] },
  { id: 'empresa', keywords: ['remax', 'collection', 'vintage', 'agencia', 'empresa', 'marca', 'quem'], phrases: ['quem sao voces', 'o que e a', 're max', 'sobre vos', 'historia da'] },
];

export function detectIntent(text: string): IntentId | null {
  const t = ` ${normalize(text)} `;
  let best: { id: IntentId; score: number } | null = null;

  for (const intent of intents) {
    let score = 0;
    for (const p of intent.phrases ?? []) {
      if (t.includes(` ${normalize(p)} `) || t.includes(normalize(p))) score += 3;
    }
    for (const k of intent.keywords) {
      // whole-word / whole-phrase match (t is space-padded) to avoid substring noise
      if (t.includes(` ${normalize(k)} `)) score += 1;
    }
    if (score > 0 && (!best || score > best.score)) best = { id: intent.id, score };
  }
  return best ? best.id : null;
}

export interface FaqHit {
  q: string;
  a: string;
  score: number;
}

const STOP = new Set([
  'que', 'qual', 'quais', 'como', 'para', 'com', 'uma', 'umas', 'uns', 'dos', 'das', 'por',
  'meu', 'minha', 'sua', 'seu', 'mais', 'menos', 'tem', 'sao', 'esta', 'estao', 'pode', 'posso',
  'the', 'and', 'sobre', 'numa', 'num', 'aos', 'nas', 'nos', 'ser', 'sem', 'vos', 'voces',
]);

// Lightweight FAQ search by token overlap. Returns the best hit above threshold.
export function searchFaq(text: string): FaqHit | null {
  const tokens = normalize(text).split(' ').filter((w) => w.length > 2 && !STOP.has(w));
  if (!tokens.length) return null;

  let best: FaqHit | null = null;
  for (const f of faqList) {
    const hay = normalize(`${f.q} ${f.a}`);
    let score = 0;
    for (const tok of tokens) if (hay.includes(tok)) score += 1;
    const ratio = score / tokens.length;
    if (ratio >= 0.5 && score >= 2 && (!best || score > best.score)) {
      best = { q: f.q, a: f.a, score };
    }
  }
  return best;
}
