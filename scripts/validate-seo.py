"""Validate the generated HTML and sitemap. Run after npm run build.
Use --preview after VERCEL_ENV=preview npm run build.
"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import json
import sys
import xml.etree.ElementTree as ET

ROOT = Path('dist/client')
ORIGIN = 'https://remaxcollectionvintage.pt'
PREVIEW = '--preview' in sys.argv

class Page(HTMLParser):
    def __init__(self, file):
        super().__init__()
        self.file = file
        self.tags = []
        self.schemas = []
        self.script = None
        self.feed(file.read_text())
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if tag == 'script' and attrs.get('type') == 'application/ld+json': self.script = ''
    def handle_data(self, text):
        if self.script is not None: self.script += text
    def handle_endtag(self, tag):
        if tag == 'script' and self.script is not None:
            self.schemas.append(json.loads(self.script)); self.script = None
    def attrs(self, tag): return [a for t, a in self.tags if t == tag]
    def ids(self): return {a['id'] for _, a in self.tags if 'id' in a}

pages = {p: Page(p) for p in ROOT.rglob('*.html')}
errors = []
def require(ok, message):
    if not ok: errors.append(message)
def route_file(path):
    path = unquote(path).lstrip('/')
    f = ROOT / path
    if f.is_dir(): f /= 'index.html'
    return f

urls = [x.text for x in ET.parse(ROOT / 'sitemap.xml').getroot().iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
require(len(urls) == len(set(urls)) == 9, 'sitemap must contain 9 distinct approved public URLs')
for url in urls:
    require(url.startswith(ORIGIN + '/'), f'foreign sitemap URL {url}')
    f = route_file(urlsplit(url).path)
    require(f in pages, f'missing sitemap page {url}')
    if f not in pages: continue
    p = pages[f]
    canonicals = [a.get('href') for a in p.attrs('link') if a.get('rel') == 'canonical']
    require(canonicals == [url], f'canonical mismatch {url}: {canonicals}')
    robots = ' '.join(a.get('content', '') for a in p.attrs('meta') if a.get('name') == 'robots')
    require(('noindex' in robots) == PREVIEW, f'indexing directive {url}: {robots}')
    require(len(p.attrs('h1')) == 1, f'H1 count {url}')
    require(len(p.attrs('title')) == 1, f'title count {url}')
    require(len([a for a in p.attrs('meta') if a.get('name') == 'description' and a.get('content')]) == 1, f'description {url}')
    require(p.attrs('html')[0].get('lang') == 'pt-PT', f'language {url}')
    graph = p.schemas[0]['@graph']
    agency = next(n for n in graph if n['@type'] == 'RealEstateAgent')
    require(agency['@id'] == ORIGIN + '/#agency', f'entity id {url}')
    require('12382' in agency['sameAs'][0], f'wrong official office {url}')
    if url != ORIGIN + '/':
        crumb = next(n for n in graph if n['@type'] == 'BreadcrumbList')
        require(crumb['itemListElement'][-1]['item'] == url, f'breadcrumb {url}')

links = 0
for f, p in pages.items():
    if f.parent.name == 'mobile-preview': continue  # QA controls are not commercial content.
    if f.name == '404.html' or 'insights' in f.parts:
        require(any('noindex' in a.get('content','') for a in p.attrs('meta') if a.get('name') == 'robots'), f'placeholder/error page not noindex: {f}')
    for a in p.attrs('a'):
        href = a.get('href', '')
        target = urlsplit(href)
        if target.scheme or target.netloc or not href: continue
        links += 1
        linked = route_file(target.path) if target.path.startswith('/') else (f if not target.path else f.parent / target.path)
        require(linked.exists(), f'broken internal link {f}: {href}')
        if target.fragment and linked in pages:
            require(unquote(target.fragment) in pages[linked].ids(), f'broken fragment {f}: {href}')
    for schema in p.schemas:
        require('JobPosting' not in json.dumps(schema), f'evergreen vacancy markup: {f}')

print(json.dumps({'mode': 'preview' if PREVIEW else 'production', 'html_pages': len(pages), 'sitemap_urls': len(urls), 'internal_links_checked': links, 'errors': errors}, ensure_ascii=False, indent=2))
sys.exit(bool(errors))
