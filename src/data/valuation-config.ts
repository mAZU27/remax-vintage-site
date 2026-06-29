// ============================================================
// Value-simulator configuration (client-side estimate).
//
// ⚠️  INDICATIVE VALUES — NOT a professional appraisal.
// Every €/m² and multiplier below is a placeholder the agency
// must confirm. They produce a *ballpark range*, never a price.
// The UI always shows the "estimativa indicativa" disclaimer.
//
// How the estimate is built:
//   raw = basePricePerM2[zone]
//       × area(m²)
//       × typeMultiplier[type]
//       × conditionMultiplier[condition]
//       × typologyMultiplier[typology]
//       × (1 + Σ extraValue[selected extras])
//   range = raw ± rangeSpread, each bound rounded to `roundTo`.
//
// To tune the model, edit ONLY the numbers here — the modal and
// the formula read everything from this single source.
// ============================================================

/** Last time the numbers below were reviewed. Bump on every edit. */
export const valuationUpdatedAt = '2026-06-26';

export const valuationConfig = {
  /**
   * Base €/m² by neighbourhood (keys match `neighborhoods[].slug` in site.ts,
   * plus `outra` for "Outra zona do Porto").
   * TODO(agência): substituir por €/m² reais e defensáveis por bairro.
   */
  basePricePerM2: {
    'foz-do-douro': 5200,
    boavista: 3800,
    ribeira: 4400,
    cedofeita: 3700,
    outra: 3000,
  } as Record<string, number>,

  /** Property type. "outro" = atípico (loja/loft/terreno…) → ligeiramente abaixo. */
  typeMultiplier: {
    apartamento: 1.0,
    moradia: 1.08,
    outro: 0.95,
  } as Record<string, number>,

  /** Condition of the property. */
  conditionMultiplier: {
    'a-renovar': 0.8,
    bom: 1.0,
    renovado: 1.12,
    novo: 1.25,
  } as Record<string, number>,

  /**
   * Typology multiplier. Neutral (1.0) by default ON PURPOSE: the size is
   * already captured by area (m²), so multiplying by typology too would
   * double-count it. Kept here as an editable hook in case the agency wants
   * a small premium/discount for very small or very large units.
   */
  typologyMultiplier: {
    T0: 1.0,
    T1: 1.0,
    T2: 1.0,
    T3: 1.0,
    T4: 1.0,
    T5: 1.0,
    'T6+': 1.0,
  } as Record<string, number>,

  /** Additive bonuses (summed, then applied as 1 + Σ). */
  extraValue: {
    'vista-rio-mar': 0.12,
    'vista-cidade': 0.05,
    exterior: 0.06, // varanda / terraço / jardim
    garagem: 0.04,
    elevador: 0.03,
  } as Record<string, number>,

  /** Half-width of the indicative range (0.08 → ±8%). */
  rangeSpread: 0.08,

  /** Round each bound to the nearest … € for a clean, non-spurious figure. */
  roundTo: 5000,
} as const;

// ---------- Option metadata (shared by the modal UI + the formula) ----------

export interface Option {
  value: string;
  label: string;
}

export const typeOptions: Option[] = [
  { value: 'apartamento', label: 'Apartamento' },
  { value: 'moradia', label: 'Moradia' },
  { value: 'outro', label: 'Outro' },
];

export const typologyOptions: Option[] = [
  { value: 'T0', label: 'T0' },
  { value: 'T1', label: 'T1' },
  { value: 'T2', label: 'T2' },
  { value: 'T3', label: 'T3' },
  { value: 'T4', label: 'T4' },
  { value: 'T5', label: 'T5' },
  { value: 'T6+', label: 'T6+' },
];

export const conditionOptions: Option[] = [
  { value: 'a-renovar', label: 'A renovar' },
  { value: 'bom', label: 'Bom estado' },
  { value: 'renovado', label: 'Renovado' },
  { value: 'novo', label: 'Novo' },
];

/** Extras shown as toggle chips. `icon` is an Icon.astro name. */
export const extraOptions: { value: string; label: string; icon: string }[] = [
  { value: 'vista-rio-mar', label: 'Vista rio / mar', icon: 'eye' },
  { value: 'vista-cidade', label: 'Vista cidade', icon: 'building' },
  { value: 'exterior', label: 'Varanda / terraço / jardim', icon: 'sparkle' },
  { value: 'garagem', label: 'Garagem', icon: 'key' },
  { value: 'elevador', label: 'Elevador', icon: 'building' },
];

// ---------- Pure estimate (imported by the modal's client script) ----------

export interface ValuationInput {
  zone: string;
  type: string;
  area: number;
  typology: string;
  condition: string;
  extras: string[];
}

export interface ValuationRange {
  low: number;
  high: number;
  mid: number;
}

export function estimateRange(input: ValuationInput): ValuationRange {
  const c = valuationConfig;
  const base = c.basePricePerM2[input.zone] ?? c.basePricePerM2.outra;
  const typeM = c.typeMultiplier[input.type] ?? 1;
  const condM = c.conditionMultiplier[input.condition] ?? 1;
  const typoM = c.typologyMultiplier[input.typology] ?? 1;
  const extrasSum = input.extras.reduce((sum, key) => sum + (c.extraValue[key] ?? 0), 0);

  const raw = base * Math.max(0, input.area) * typeM * condM * typoM * (1 + extrasSum);
  const round = (n: number) => Math.round(n / c.roundTo) * c.roundTo;

  return {
    low: round(raw * (1 - c.rangeSpread)),
    high: round(raw * (1 + c.rangeSpread)),
    mid: round(raw),
  };
}

/** Locale-correct currency, no cents: "1.250.000 €". */
export function formatEUR(value: number): string {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}
