import { z } from 'zod';

/**
 * Contrato do formulário em três passos (R-06).
 * Passo 1: intenção · Passo 2: contacto · Passo 3: pedido (opcional).
 * Campos escondidos: origem e atribuição, preenchidos pelo browser.
 */
export const Intent = z.enum(['hire', 'augment', 'build', 'unsure', 'job']);
export const Country = z.enum(['PT', 'BR', 'US', 'OTHER']);
export const StartWindow = z.enum(['now', 'lt3m', '3to6m', 'gt6m', 'unknown']);
export const CompanySize = z.enum(['1-9', '10-49', '50-249', '250+', 'unknown']);

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

export const Attribution = z.object({
  landingPage: optionalText(500),
  conversionPage: optionalText(500),
  ctaId: optionalText(100),
  /** Página onde estava o CTA que levou ao formulário (ex.: página de serviço → /contacto/). */
  ctaPage: optionalText(500),
  referrer: optionalText(500),
  utmSource: optionalText(200),
  utmMedium: optionalText(200),
  utmCampaign: optionalText(200),
  utmTerm: optionalText(200),
  utmContent: optionalText(200),
  gclid: optionalText(200),
  liFatId: optionalText(200),
});

export const Signals = z.object({
  pricingViewed: z.boolean().default(false),
  casesViewed: z.number().int().min(0).max(100).default(0),
});

export const LeadInput = z.object({
  intent: Intent,
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email().max(200),
  company: optionalText(160),
  jobTitle: optionalText(120),
  country: Country,
  areas: optionalText(300),
  headcount: z.number().int().min(1).max(500).optional(),
  companySize: CompanySize.optional(),
  start: StartWindow.optional(),
  message: optionalText(2000),
  locale: z.enum(['pt', 'br', 'en']),
  consentMarketing: z.boolean().default(false),
  attribution: Attribution.prefault({}),
  signals: Signals.default({ pricingViewed: false, casesViewed: 0 }),
  turnstileToken: optionalText(4096),
  /** Armadilha para bots: campo invisível que tem de vir vazio. */
  website: z.string().max(0).optional(),
});

export type LeadInput = z.infer<typeof LeadInput>;
export type Intent = z.infer<typeof Intent>;

/** Clientes precisam de empresa; candidatos não. */
export function validateBusinessRules(lead: LeadInput): string[] {
  const errors: string[] = [];
  if (lead.intent !== 'job' && !lead.company) errors.push('company');
  return errors;
}
