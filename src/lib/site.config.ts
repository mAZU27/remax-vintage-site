// Single source of truth for cross-cutting site config.

// Property search moved OFF this site: listings now live on the official RE/MAX
// search, pre-filtered to this agency's portfolio (newest first). Every "explore properties / ver imóveis" CTA points here and
// opens in a new tab. Defined ONCE — import it, never inline the URL.
export const EXTERNAL_LISTINGS_URL =
  'https://www.remax.pt/pt/comprar/imoveis/h/r/r/r/t?s=%7B%22of%22%3A%2212382%22%2C%22nm%22%3A%22RE%2FMAX%20Collection%20Vintage%22%2C%22os%22%3A%22false%22%7D&p=1&o=-PublishDate';

// Official agency page positioned on the team ("Equipa") section. The team
// cards + "Ver equipa completa" CTA navigate here IN THE SAME TAB (owner
// brief 2026-07-10). Verified 2026-07-10: the official page has NO native id
// anchor for the team section (only data-id="details-team-section", which URL
// fragments cannot target), so a text fragment is the best available deep
// link — browsers without support simply land at the top of the page.
export const EXTERNAL_TEAM_URL =
  'https://www.remax.pt/pt/agencia/remax-collection-vintage/12382#:~:text=Equipa';
