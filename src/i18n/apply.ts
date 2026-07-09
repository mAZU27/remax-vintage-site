// Client-side language toggle for the RE/MAX Collection Vintage site.
// Site source is in Portuguese; when the user chooses EN we walk the DOM,
// swap known text nodes + a small allow-list of attributes, and remember the
// choice in localStorage. Unknown strings fall back to Portuguese.

import { en } from './dict';

export type Lang = 'pt' | 'en';

const STORAGE_KEY = 'rvc-lang';
const ATTRS = ['placeholder', 'title', 'aria-label', 'alt'] as const;

// Element tags whose text should never be translated (scripts/styles/etc.).
const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'CODE', 'PRE']);

const getStored = (): Lang | null => {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'pt' || v === 'en' ? v : null;
  } catch {
    return null;
  }
};

const setStored = (lang: Lang) => {
  try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* private mode */ }
};

const translate = (raw: string): string | null => {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const hit = en[trimmed];
  if (hit == null || hit === trimmed) return null;
  // Preserve leading/trailing whitespace so inline markup layout survives.
  const lead = raw.match(/^\s*/)?.[0] ?? '';
  const tail = raw.match(/\s*$/)?.[0] ?? '';
  return lead + hit + tail;
};

const walkText = (root: Node) => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (SKIP_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
      if (parent.closest('[data-i18n-skip]')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const nodes: Text[] = [];
  let cur: Node | null;
  while ((cur = walker.nextNode())) nodes.push(cur as Text);
  for (const t of nodes) {
    const original = (t as any).__i18nPt ?? t.nodeValue ?? '';
    if ((t as any).__i18nPt == null) (t as any).__i18nPt = original;
    const swapped = translate(original);
    if (swapped != null) t.nodeValue = swapped;
  }
};

const walkAttrs = (root: ParentNode) => {
  const selector = ATTRS.map((a) => `[${a}]`).join(',');
  root.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    if (el.closest('[data-i18n-skip]')) return;
    for (const attr of ATTRS) {
      const val = el.getAttribute(attr);
      if (val == null) continue;
      const memoKey = `__i18nPt_${attr}`;
      const original = (el as any)[memoKey] ?? val;
      if ((el as any)[memoKey] == null) (el as any)[memoKey] = original;
      const swapped = translate(original);
      if (swapped != null) el.setAttribute(attr, swapped);
    }
  });
};

const restoreText = (root: Node) => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let cur: Node | null;
  while ((cur = walker.nextNode())) {
    const t = cur as Text & { __i18nPt?: string };
    if (t.__i18nPt != null) t.nodeValue = t.__i18nPt;
  }
};

const restoreAttrs = (root: ParentNode) => {
  const selector = ATTRS.map((a) => `[${a}]`).join(',');
  root.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    for (const attr of ATTRS) {
      const memoKey = `__i18nPt_${attr}`;
      const original = (el as any)[memoKey];
      if (original != null) el.setAttribute(attr, original);
    }
  });
};

const syncToggleState = (lang: Lang) => {
  document.querySelectorAll<HTMLElement>('[data-lang-switch]').forEach((root) => {
    root.setAttribute('data-lang', lang);
    root.querySelectorAll<HTMLElement>('[data-lang-value]').forEach((btn) => {
      const val = btn.getAttribute('data-lang-value');
      btn.setAttribute('aria-pressed', String(val === lang));
    });
  });
};

const apply = (lang: Lang) => {
  const html = document.documentElement;
  if (lang === 'en') {
    walkText(document.body);
    walkAttrs(document.body);
    html.setAttribute('lang', 'en');
  } else {
    restoreText(document.body);
    restoreAttrs(document.body);
    html.setAttribute('lang', 'pt-PT');
  }
  syncToggleState(lang);
};

// Track the current lang so the MutationObserver knows whether to translate.
let currentLang: Lang = 'pt';

const translateNewNode = (node: Node) => {
  if (currentLang !== 'en') return;
  if (node.nodeType === Node.TEXT_NODE) {
    const parent = (node as Text).parentElement;
    if (!parent || SKIP_TAGS.has(parent.tagName) || parent.closest('[data-i18n-skip]')) return;
    const t = node as Text & { __i18nPt?: string };
    const original = t.__i18nPt ?? t.nodeValue ?? '';
    if (t.__i18nPt == null) t.__i18nPt = original;
    const swapped = translate(original);
    if (swapped != null) t.nodeValue = swapped;
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    const el = node as HTMLElement;
    if (SKIP_TAGS.has(el.tagName) || el.closest('[data-i18n-skip]')) return;
    walkText(el);
    walkAttrs(el);
  }
};

const observeDom = () => {
  const mo = new MutationObserver((mutations) => {
    if (currentLang !== 'en') return;
    for (const m of mutations) {
      m.addedNodes.forEach(translateNewNode);
    }
  });
  mo.observe(document.body, { childList: true, subtree: true });
};

export const initI18n = () => {
  const initial: Lang = getStored() ?? 'pt';
  currentLang = initial;
  apply(initial);
  observeDom();

  const onClick = (e: Event) => {
    const target = (e.target as HTMLElement).closest('[data-lang-value]') as HTMLElement | null;
    if (!target) return;
    e.preventDefault();
    const next = target.getAttribute('data-lang-value') as Lang | null;
    if (next !== 'pt' && next !== 'en') return;
    setStored(next);
    currentLang = next;
    apply(next);
  };
  document.addEventListener('click', onClick);
};
