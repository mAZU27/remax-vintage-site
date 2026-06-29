import { defineConfig } from 'astro/config';

// NOTE: replace `site` with the real production domain before launch
// (needed for canonical URLs + sitemap).
export default defineConfig({
  site: 'https://www.remax-collection-vintage.pt',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
