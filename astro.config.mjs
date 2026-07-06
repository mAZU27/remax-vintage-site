import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// NOTE: replace `site` with the real production domain before launch
// (needed for canonical URLs + sitemap).
// Pages stay static (prerendered); only routes with `prerender = false`
// (e.g. src/pages/api/lead.ts) run on-demand as Vercel functions. This lets
// the lead proxy keep the ingest token server-side.
export default defineConfig({
  site: 'https://www.remax-collection-vintage.pt',
  adapter: vercel(),
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
    assets: 'assets',
  },
  vite: {
    build: {
      minify: 'esbuild',
      cssCodeSplit: true,
    },
  },
});
