// Static sitemap endpoint — prerendered at build time.
// Public, indexable routes only (no /api, no /mobile-preview). URLs use the
// trailing-slash form to match the canonical tags emitted by Base.astro.
// /insights/* excluído (2026-07-10): artigos placeholder com noindex — repor
// aqui (e reimportar `articles` de ../data/insights) quando forem reais.
import type { APIRoute } from 'astro';

const STATIC_ROUTES = [
  '/',
  '/comprar/',
  '/vender/',
  '/alugar/',
  '/sobre-nos/',
  '/contacto/',
  '/apoio/',
  '/carreiras/',
  '/privacidade/',
];

export const GET: APIRoute = ({ site }) => {
  const origin = site?.href.replace(/\/$/, '') ?? '';
  const urls = STATIC_ROUTES.map((path) => `  <url><loc>${origin}${path}</loc></url>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
