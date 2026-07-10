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
  | 'zona_foz'
  | 'zona_boavista'
  | 'zona_ribeira'
  | 'zona_cedofeita'
  | 'zona_nevogilde'
  | 'zona_lordelo'
  | 'zona_bonfim'
  | 'zona_baixa'
  | 'tipo_moradia'
  | 'tipo_apartamento'
  | 'tipo_t1_t2'
  | 'tipo_t3_t4'
  | 'lifestyle_privacidade'
  | 'lifestyle_centralidade'
  | 'lifestyle_investimento'
  | 'lifestyle_reforma'
  | 'lifestyle_historia'
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
// Each intent carries PT keywords AND their EN counterparts so the assistant
// also understands visitors browsing the site in English (replies stay PT at
// the source — the i18n layer swaps them to EN in the DOM).
export const intents: Intent[] = [
  { id: 'agradecimento', keywords: ['obrigado', 'obrigada', 'agradecido', 'grato', 'thanks', 'thank'], phrases: ['muito obrigado', 'obrigada', 'thank you'] },
  { id: 'saudacao', keywords: ['ola', 'bom dia', 'boa tarde', 'boa noite', 'hello', 'hey', 'viva', 'oi'], phrases: ['good morning', 'good afternoon', 'good evening'] },
  { id: 'humano', keywords: ['humano', 'pessoa', 'alguem', 'consultor', 'equipa', 'atendimento', 'falar', 'human', 'someone', 'agent'], phrases: ['falar com alguem', 'falar com a equipa', 'falar com um consultor', 'preciso de falar', 'falar com um humano', 'talk to someone', 'speak to someone', 'talk to the team', 'speak with an agent', 'real person'] },

  { id: 'urgente', keywords: ['urgente', 'rapido', 'pressa', 'ja', 'hoje', 'amanha', 'imediato', 'asap', 'urgent', 'hurry'], phrases: ['preciso urgente', 'nao tenho tempo', 'e urgente', 'as soon as possible'] },
  { id: 'problema', keywords: ['problema', 'problemas', 'erro', 'nao funciona', 'quebrado', 'falha', 'nao consigo', 'ajuda', 'socorro', 'problem', 'issue', 'complaint', 'help'], phrases: ['tem um problema', 'nao esta a funcionar', 'preciso de ajuda', 'pode ajudar', 'not working', 'i need help', 'can you help'] },

  { id: 'processo_venda', keywords: [], phrases: ['processo de venda', 'como funciona a venda', 'como vendo', 'passos para vender', 'como vender', 'selling process', 'how to sell', 'how do i sell', 'steps to sell'] },
  { id: 'processo_compra', keywords: [], phrases: ['processo de compra', 'como funciona a compra', 'como comprar', 'passos para comprar', 'buying process', 'how to buy', 'how do i buy', 'steps to buy'] },
  { id: 'processo_arrendamento', keywords: [], phrases: ['processo de arrendamento', 'como funciona o arrendamento', 'como arrendo', 'rental process', 'renting process', 'how to rent'] },

  { id: 'pedir_avaliacao', keywords: [], phrases: ['pedir avaliacao', 'como pedir avaliacao', 'quero avaliacao', 'solicitar avaliacao', 'marcar avaliacao', 'avaliar imovel', 'request a valuation', 'request valuation', 'want a valuation', 'book a valuation', 'value my property', 'value my home', 'value my house'] },
  { id: 'avaliacao', keywords: ['avaliacao', 'avaliar', 'valor', 'vale', 'quanto vale', 'estimativa', 'preco do imovel', 'valuation', 'appraisal', 'worth', 'estimate'], phrases: ['avaliar o meu imovel', 'quanto vale a minha casa', 'how much is my house worth', 'what is my property worth', 'how much is my property worth'] },

  { id: 'preco', keywords: ['preco', 'precos', 'valor', 'custa', 'custam', 'quanto', 'investimento', 'custo', 'price', 'prices', 'cost', 'costs'], phrases: ['quanto custa', 'qual o preco', 'qual e o preco', 'preço de venda', 'how much does it cost', 'what is the price', 'how much is it'] },
  { id: 'comissao', keywords: ['comissao', 'comissoes', 'honorarios', 'percentagem', 'taxa', 'commission', 'fee', 'fees', 'percentage'], phrases: ['quanto custa vender', 'custo de vender', 'quanto cobram', 'taxa de mediacao', 'how much do you charge', 'cost of selling', 'agency fee'] },
  { id: 'documentos', keywords: ['documentos', 'documentacao', 'papeis', 'caderneta', 'certidao', 'licenca', 'certificado', 'documents', 'paperwork', 'certificate'], phrases: ['documentos para vender', 'que documentos', 'documents to sell', 'what documents', 'which documents'] },
  { id: 'confidencialidade', keywords: ['confidencial', 'confidencialidade', 'discricao', 'privacidade', 'discreto', 'sigilo', 'confidential', 'confidentiality', 'discreet', 'discretion'] },

  { id: 'vender', keywords: ['vender', 'venda', 'vendo', 'vendedor', 'sell', 'selling', 'seller'], phrases: ['vender o meu imovel', 'vender a minha casa', 'quero vender', 'interessado em vender', 'sell my property', 'sell my house', 'sell my home', 'want to sell'] },
  { id: 'comprar', keywords: ['comprar', 'compra', 'adquirir', 'comprador', 'procuro', 'buy', 'buying', 'buyer', 'purchase'], phrases: ['comprar casa', 'comprar um imovel', 'quero comprar', 'procuro casa', 'estou a procura', 'buy a house', 'buy a property', 'buy a home', 'want to buy', 'looking for a house', 'looking for a home'] },
  { id: 'alugar', keywords: ['alugar', 'arrendar', 'arrendamento', 'aluguel', 'renda', 'inquilino', 'senhorio', 'rent', 'renting', 'rental', 'lease', 'tenant', 'landlord'], phrases: ['alugar casa', 'quero arrendar', 'procuro para arrendar', 'rent a house', 'rent an apartment', 'want to rent', 'looking to rent'] },

  { id: 'visita', keywords: ['visita', 'visitar', 'agendar', 'agendamento', 'marcacao', 'ver', 'visit', 'viewing', 'tour', 'appointment'], phrases: ['marcar visita', 'marcar uma visita', 'agendar visita', 'ver o imovel', 'agendar visita', 'book a viewing', 'schedule a visit', 'schedule a viewing', 'arrange a viewing', 'see the property'] },

  { id: 'contacto', keywords: ['contacto', 'contactos', 'telefone', 'telemovel', 'email', 'mail', 'whatsapp', 'numero', 'como contactar', 'contact', 'phone', 'number'], phrases: ['como vos contacto', 'qual o contacto', 'qual e o contacto', 'dados de contacto', 'how do i contact you', 'how can i contact you', 'contact details', 'phone number'] },
  { id: 'localizacao', keywords: ['onde', 'morada', 'localizacao', 'endereco', 'escritorio', 'sede', 'ficam', 'ficais', 'mapa', 'address', 'location', 'office', 'map'], phrases: ['onde ficam', 'onde estao', 'onde fica', 'qual a morada', 'where are you', 'where is your office', 'your address'] },
  { id: 'horario', keywords: ['horario', 'horarios', 'aberto', 'abrem', 'fecham', 'funciona', 'atende', 'hours', 'open', 'opening', 'closing'], phrases: ['a que horas', 'horario de funcionamento', 'quando abrem', 'opening hours', 'what time', 'when are you open'] },

  // Specific zones — deeper intent matching for zone-aware responses.
  { id: 'zona_foz', keywords: ['foz', 'douro', 'atlantico', 'mar', 'privacidade', 'isolado'], phrases: ['foz do douro', 'em foz', 'zona de foz', 'foz me interessa'] },
  { id: 'zona_boavista', keywords: ['boavista', 'aliados', 'central', 'centro'], phrases: ['boavista', 'em boavista', 'zona de boavista', 'boavista me interessa'] },
  { id: 'zona_ribeira', keywords: ['ribeira', 'historico', 'patrimonio', 'rio', 'turismo'], phrases: ['ribeira', 'em ribeira', 'zona de ribeira', 'ribeira me interessa'] },
  { id: 'zona_cedofeita', keywords: ['cedofeita', 'lapa', 'bairro', 'convivio'], phrases: ['cedofeita', 'em cedofeita', 'zona de cedofeita', 'cedofeita me interessa'] },
  { id: 'zona_nevogilde', keywords: ['nevogilde', 'verde', 'espaco', 'familia'], phrases: ['nevogilde', 'em nevogilde', 'zona de nevogilde', 'nevogilde me interessa'] },
  { id: 'zona_lordelo', keywords: ['lordelo', 'solares', 'tradicao', 'arquitectura'], phrases: ['lordelo', 'em lordelo', 'zona de lordelo', 'lordelo me interessa'] },
  { id: 'zona_bonfim', keywords: ['bonfim', 'potencial', 'investimento', 'regeneracao'], phrases: ['bonfim', 'em bonfim', 'zona de bonfim', 'bonfim me interessa'] },
  { id: 'zona_baixa', keywords: ['baixa', 'aliados', 'historico', 'centro', 'cidade'], phrases: ['baixa', 'em baixa', 'zona de baixa', 'baixa me interessa'] },

  // Property types — helps narrow down recommendations.
  { id: 'tipo_moradia', keywords: ['moradia', 'moradias', 'house', 'isolada', 'garden', 'terreno', 'quintal'], phrases: ['uma moradia', 'procuro moradia', 'casa isolada', 'com terreno'] },
  { id: 'tipo_apartamento', keywords: ['apartamento', 'apartamentos', 'apto', 'flat', 'studio'], phrases: ['um apartamento', 'procuro apartamento', 'apartamento centro'] },
  { id: 'tipo_t1_t2', keywords: ['t1', 't2', 'pequeno', 'minimo'], phrases: ['t1', 't2', 'apartamento pequeno'] },
  { id: 'tipo_t3_t4', keywords: ['t3', 't4', 't5', 'grande', 'familiar'], phrases: ['t3', 't4', 't5', 'apartamento grande', 'para familia'] },

  // Lifestyle and investment intent — informs recommendations.
  { id: 'lifestyle_privacidade', keywords: ['privacidade', 'discreto', 'isolado', 'tranquilo', 'sossego', 'isolamento'], phrases: ['preciso de privacidade', 'zona tranquila', 'sem vizinhos proximos'] },
  { id: 'lifestyle_centralidade', keywords: ['central', 'centro', 'perto', 'proximidade', 'conveniencia', 'infrastructura'], phrases: ['perto de tudo', 'no centro', 'zona central', 'muito central'] },
  { id: 'lifestyle_investimento', keywords: ['investimento', 'investidor', 'rentavel', 'valorizacao', 'apreciacao', 'retorno'], phrases: ['investimento imobiliario', 'imobiliario', 'como investimento', 'valor de investimento'] },
  { id: 'lifestyle_reforma', keywords: ['reforma', 'renovacao', 'construcao', 'projeto', 'obra', 'potencial'], phrases: ['para reformar', 'precisa reforma', 'em estado bruto', 'potencial de obra'] },
  { id: 'lifestyle_historia', keywords: ['historia', 'caractér', 'autentico', 'original', 'classico', 'artístico', 'archi'], phrases: ['com historia', 'com caracter', 'edificio classico', 'patrimonio'] },

  { id: 'zonas', keywords: ['zona', 'zonas', 'foz', 'boavista', 'ribeira', 'cedofeita', 'area', 'areas', 'neighbourhood', 'neighbourhoods', 'neighborhood', 'neighborhoods', 'zones', 'district', 'districts'], phrases: ['que zonas', 'em que zonas', 'quais sao as zonas', 'which areas', 'what areas', 'which neighbourhoods', 'which neighborhoods'] },
  { id: 'imoveis', keywords: ['imoveis', 'imovel', 'casas', 'casa', 'apartamento', 'apartamentos', 'moradia', 'moradias', 'catalogo', 'listagem', 'disponivel', 'disponiveis', 't2', 't3', 't4', 'properties', 'property', 'houses', 'house', 'apartment', 'apartments', 'listings', 'listing', 'catalogue', 'catalog', 'available'], phrases: ['imoveis disponiveis', 'que imoveis', 'tem casas', 'tem apartamentos', 'ver imoveis', 'available properties', 'what properties', 'do you have houses', 'do you have apartments', 'see properties', 'view properties'] },

  { id: 'servicos', keywords: ['servico', 'servicos', 'ajudam', 'fazem', 'prestam', 'oferecem', 'services', 'service'], phrases: ['que servicos', 'o que fazem', 'que servicos oferecem', 'what services', 'what do you do', 'what do you offer'] },
  { id: 'blog', keywords: ['blog', 'artigo', 'artigos', 'insights', 'noticias', 'guia', 'guias', 'mercado', 'conteudo', 'articles', 'article', 'news', 'guide', 'guides', 'market'], phrases: ['artigos', 'blog de', 'ver artigos', 'read articles', 'market analysis'] },
  { id: 'carreiras', keywords: ['carreira', 'carreiras', 'emprego', 'trabalhar', 'vaga', 'vagas', 'recrutamento', 'candidatura', 'consultora', 'consultor', 'job', 'career', 'careers', 'jobs', 'work', 'recruitment', 'vacancy', 'vacancies', 'apply'], phrases: ['trabalhar convosco', 'quero trabalhar', 'candidatar', 'oportunidades de trabalho', 'work with you', 'join the team', 'job openings', 'open positions'] },
  { id: 'equipa', keywords: ['equipa', 'consultores', 'quem sao', 'agentes', 'team', 'staff', 'consultants', 'agents'], phrases: ['quem e a equipa', 'a vossa equipa', 'conhecer equipa', 'who is the team', 'meet the team', 'your team'] },
  { id: 'reconhecimento', keywords: ['premio', 'premios', 'reconhecimento', 'experiencia', 'galardao', 'distincao', 'award', 'awards', 'recognition', 'prize', 'prizes'], phrases: ['premios recebidos', 'reconhecimento', 'awards received'] },
  { id: 'empresa', keywords: ['remax', 'collection', 'vintage', 'agencia', 'empresa', 'marca', 'quem', 'agency', 'company', 'brand'], phrases: ['quem sao voces', 'o que e a', 're max', 'sobre vos', 'historia da', 'who are you', 'about you', 'what is remax', 'tell me about'] },
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
  // EN stopwords — keeps the FAQ search from matching on filler words.
  'what', 'which', 'where', 'when', 'how', 'can', 'you', 'your', 'are', 'for', 'with',
  'have', 'does', 'much', 'many', 'this', 'that', 'want', 'need', 'would', 'like', 'about',
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
