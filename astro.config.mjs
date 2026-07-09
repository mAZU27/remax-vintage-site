import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// `site` = the real production domain (apex; www 308s to it on Vercel).
// Pages stay static (prerendered); only routes with `prerender = false`
// (e.g. src/pages/api/lead.ts) run on-demand as Vercel functions. This lets
// the lead proxy keep the ingest token server-side.
export default defineConfig({
  site: 'https://remaxcollectionvintage.pt',
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
