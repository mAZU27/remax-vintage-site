/** Preserve the production trailing-slash canonicals; discard queries/fragments. */
export function canonicalUrl(pathname: string, origin: string): string {
  const path = pathname.split(/[?#]/, 1)[0];
  return new URL(path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`, origin).href;
}

export const pageLabels: Record<string, string> = {
  '/comprar/': 'Comprar casa no Porto',
  '/vender/': 'Vender casa no Porto',
  '/carreiras/': 'Carreiras no Porto',
  '/sobre-nos/': 'Sobre a agência',
  '/contacto/': 'Contacto',
  '/alugar/': 'Arrendar',
  '/apoio/': 'Apoio ao cliente',
  '/privacidade/': 'Política de Privacidade',
};

/** Safe for a script element even if future editorial content contains HTML. */
export const serializeSchema = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');
