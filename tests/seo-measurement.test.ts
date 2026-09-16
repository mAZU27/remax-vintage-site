import test from 'node:test';
import assert from 'node:assert/strict';
import { canonicalUrl, serializeSchema } from '../src/lib/seo';
import { leadOutcome, interactionDetail, recordLeadSuccess } from '../src/lib/measurement';
import { EXTERNAL_LISTINGS_URL } from '../src/lib/site.config';

test('query-bearing enquiry URLs retain the established production canonical', () => {
  for (const path of ['/contacto', '/contacto/', '/contacto?assunto=comprar#formulario']) {
    assert.equal(canonicalUrl(path, 'https://remaxcollectionvintage.pt'), 'https://remaxcollectionvintage.pt/contacto/');
  }
  assert.equal(canonicalUrl('/', 'https://remaxcollectionvintage.pt'), 'https://remaxcollectionvintage.pt/');
});

test('editorial text cannot terminate a JSON-LD script element', () => {
  const data = { description: '</script><script>alert(1)</script>' };
  const serialized = serializeSchema(data);
  assert.ok(!serialized.includes('<'));
  assert.deepEqual(JSON.parse(serialized), data);
});

test('outcomes distinguish enquiries and applications from interactions and unknown forms', () => {
  assert.equal(leadOutcome('careers-application'), 'recruitment_submission');
  assert.equal(leadOutcome('contacto', 'Comprar um imóvel'), 'buyer_enquiry');
  assert.equal(leadOutcome('contacto', 'Agendar uma visita'), 'viewing_request');
  assert.equal(leadOutcome('contacto', 'Estudo de mercado'), 'seller_enquiry');
  assert.equal(leadOutcome('value-simulator'), 'seller_enquiry');
  assert.equal(leadOutcome('valuation-form'), 'seller_enquiry');
  assert.equal(leadOutcome('unknown', 'personal@example.invalid'), undefined);
  assert.equal(leadOutcome('contacto', 'personal@example.invalid'), 'contact_enquiry');
  assert.deepEqual(interactionDetail(EXTERNAL_LISTINGS_URL), { event: 'property_search_click', inventory: 'buy' });
  assert.deepEqual(interactionDetail('tel:+351226181031'), { event: 'phone_click' });
  assert.equal(interactionDetail('https://example.invalid/?email=private'), undefined);
});

test('success hooks deduplicate retries and exclude personal fields and identifiers', () => {
  const events: unknown[] = [];
  const old = Object.getOwnPropertyDescriptor(globalThis, 'window');
  Object.defineProperty(globalThis, 'window', { configurable: true, value: { dispatchEvent: (event: CustomEvent) => events.push(event.detail) } });
  try {
    recordLeadSuccess('contacto', 'private-deduplication-id', 'personal@example.invalid');
    recordLeadSuccess('contacto', 'private-deduplication-id', 'personal@example.invalid');
    assert.deepEqual(events, [{ event: 'contact_enquiry', form: 'contacto' }]);
    assert.ok(!JSON.stringify(events).includes('private'));
    assert.ok(!JSON.stringify(events).includes('@'));
  } finally {
    if (old) Object.defineProperty(globalThis, 'window', old);
    else Reflect.deleteProperty(globalThis, 'window');
  }
});
