import { EXTERNAL_LISTINGS_URL, EXTERNAL_RENTALS_URL } from './site.config';

export type Outcome = 'recruitment_submission' | 'buyer_enquiry' | 'seller_enquiry' | 'viewing_request' | 'contact_enquiry';

/** Only controlled categories may reach measurement; never pass field values. */
export function leadOutcome(form: string, subject = ''): Outcome | undefined {
  if (form === 'careers-application') return 'recruitment_submission';
  if (form === 'valuation-form' || form === 'value-simulator') return 'seller_enquiry';
  if (form !== 'contacto') return undefined;
  if (subject === 'Comprar um imóvel') return 'buyer_enquiry';
  if (subject === 'Vender / avaliação' || subject === 'Estudo de mercado') return 'seller_enquiry';
  if (subject === 'Agendar uma visita') return 'viewing_request';
  return 'contact_enquiry';
}

const recorded = new Set<string>();
/** Call only after HTTP success AND delivered:true. No storage, cookies or network.
 * A future analytics consumer must enforce its own consent gate before forwarding.
 * The dedupe key stays in memory and is never included in the event detail. */
export function recordLeadSuccess(form: string, submissionId: string, subject = ''): void {
  const event = leadOutcome(form, subject);
  if (!event || typeof window === 'undefined' || recorded.has(submissionId)) return;
  recorded.add(submissionId);
  window.dispatchEvent(new CustomEvent('vintage:measurement', { detail: { event, form } }));
}

export function interactionDetail(href: string) {
  if (href === EXTERNAL_LISTINGS_URL) return { event: 'property_search_click', inventory: 'buy' };
  if (href === EXTERNAL_RENTALS_URL) return { event: 'property_search_click', inventory: 'rent' };
  if (href.startsWith('tel:')) return { event: 'phone_click' };
  return undefined;
}

export function initInteractionEvents(): void {
  document.addEventListener('click', (event) => {
    const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
    const detail = anchor ? interactionDetail(anchor.href) : undefined;
    if (detail) window.dispatchEvent(new CustomEvent('vintage:measurement', { detail }));
  });
}
