// Extract every translatable string exactly as apply.ts would see it:
// trimmed text nodes (outside SCRIPT/STYLE/...) + placeholder/title/aria-label/alt.
import { parse } from 'parse5';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const SKIP = new Set(['script','style','noscript','template','code','pre']);
const ATTRS = new Set(['placeholder','title','aria-label','alt']);
const strings = new Set();

function walk(node, skip) {
  if (node.nodeName === '#text') {
    if (!skip) {
      const t = node.value.replace(/\s+/g, ' ').trim();
      if (t && /[a-zA-ZÀ-ÿ]/.test(t)) strings.add(node.value.trim().replace(/\s+/g,' '));
    }
    return;
  }
  const tag = node.tagName;
  const nowSkip = skip || (tag && SKIP.has(tag));
  if (node.attrs) for (const a of node.attrs) {
    if (ATTRS.has(a.name) && a.value.trim() && /[a-zA-ZÀ-ÿ]/.test(a.value)) strings.add(a.value.trim());
  }
  // capture <title> too (we'll teach apply.ts to translate document.title)
  if (tag === 'title' && node.childNodes?.[0]?.value) strings.add(node.childNodes[0].value.trim());
  for (const c of node.childNodes ?? []) walk(c, nowSkip && tag !== 'title');
}

function htmlFiles(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) out.push(...htmlFiles(p));
    else if (e.endsWith('.html')) out.push(p);
  }
  return out;
}

for (const f of htmlFiles('dist/client')) walk(parse(readFileSync(f, 'utf8')), false);
console.log(JSON.stringify([...strings].sort(), null, 0));
