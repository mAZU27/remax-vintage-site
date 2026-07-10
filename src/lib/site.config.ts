// Single source of truth for cross-cutting site config.

// Property search moved OFF this site: listings now live on the official RE/MAX
// search, pre-filtered to this agency's portfolio (newest first). Every "explore properties / ver imóveis" CTA points here and
// opens in a new tab. Defined ONCE — import it, never inline the URL.
export const EXTERNAL_LISTINGS_URL =
  'https://www.remax.pt/pt/comprar/imoveis/h/r/r/r/t?s=%7B%22of%22%3A%2212382%22%2C%22nm%22%3A%22RE%2FMAX%20Collection%20Vintage%22%2C%22os%22%3A%22false%22%7D&p=1&o=-PublishDate';

// RENTAL listings for THIS agency on the official RE/MAX site (same agency
// filter as EXTERNAL_LISTINGS_URL, but the /arrendar/ business type). Verified
// 2026-07-10: HTTP 200, canonical /pt/arrendar/…, "listings para arrendar".
// The «Arrendar» page CTAs point here — they previously (wrongly) reused the
// buy URL.
export const EXTERNAL_RENTALS_URL =
  'https://www.remax.pt/pt/arrendar/imoveis/h/r/r/r/t?s=%7B%22of%22%3A%2212382%22%2C%22nm%22%3A%22RE%2FMAX%20Collection%20Vintage%22%2C%22os%22%3A%22false%22%7D&p=1&o=-PublishDate';

// Official agency page, deep-linked to the START of the team roster. The team
// section is CLIENT-RENDERED and lazy-loaded (IntersectionObserver, rootMargin
// 1000px) into an empty `data-id="details-team-section"` div, and there is NO
// native id anchor — so a plain `#…` or a `#:~:text=Equipa` fragment lands at
// the top (the team isn't in the DOM yet, and "Equipa" also matches the nav).
// Fix (verified headless 2026-07-10): target the STATIC regulatory note that
// sits immediately AFTER the team div. The browser scrolls there, which brings
// the team container within 1000px → it lazy-loads (52 agents) and reflows into
// view, landing on the first consultant. Same-tab per owner brief.
export const EXTERNAL_TEAM_URL =
  'https://www.remax.pt/pt/agencia/remax-collection-vintage/12382#:~:text=Todas%20as%20ag%C3%AAncias%20s%C3%A3o%20de%20gest%C3%A3o%20aut%C3%B3noma';
