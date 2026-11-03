import type { LeadInput } from './schema';

/**
 * Pontuação do lead (aba Requisitos revistos, "Pontuação do lead").
 * Função pura e testada: mudar pesos = mudar aqui e nos testes, e rever ao fim de 90 dias.
 */
export const SCORE_RULES = {
  businessEmail: 15,
  decisionTitle: 15,
  startUnder3Months: 15,
  servedMarket: 10,
  companyOver50: 10,
  multiRoleOrProject: 10,
  pricingViewed: 10,
  casesViewed: 5,
  personalEmail: -10,
} as const;

export const BAND_THRESHOLDS = { sales: 50, sdr: 25 } as const;

export type ScoreBand = 'sales' | 'sdr' | 'nurture';

const PERSONAL_DOMAINS = new Set([
  'gmail.com',
  'googlemail.com',
  'hotmail.com',
  'hotmail.pt',
  'outlook.com',
  'outlook.pt',
  'live.com',
  'msn.com',
  'yahoo.com',
  'yahoo.com.br',
  'icloud.com',
  'me.com',
  'proton.me',
  'protonmail.com',
  'sapo.pt',
  'bol.com.br',
  'uol.com.br',
  'terra.com.br',
]);

const DECISION_TITLE =
  /\b(cto|cio|ceo|coo|cfo|founder|co-?founder|fundador|s[oó]cio|diretor|diretora|director|head|vp|vice|chief|gerente|manager|respons[aá]vel|lead|l[ií]der)\b/i;

export function isPersonalEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase() ?? '';
  return PERSONAL_DOMAINS.has(domain);
}

export type ScoreResult = { score: number; band: ScoreBand; reasons: (keyof typeof SCORE_RULES)[] };

export function scoreLead(lead: LeadInput): ScoreResult {
  const reasons: (keyof typeof SCORE_RULES)[] = [];
  const add = (rule: keyof typeof SCORE_RULES, when: boolean) => {
    if (when) reasons.push(rule);
  };

  const personal = isPersonalEmail(lead.email);
  add('businessEmail', !personal);
  add('personalEmail', personal);
  add('decisionTitle', !!lead.jobTitle && DECISION_TITLE.test(lead.jobTitle));
  add('startUnder3Months', lead.start === 'now' || lead.start === 'lt3m');
  add('servedMarket', lead.country !== 'OTHER');
  add('companyOver50', lead.companySize === '50-249' || lead.companySize === '250+');
  add('multiRoleOrProject', lead.intent === 'build' || (lead.headcount ?? 0) >= 2);
  add('pricingViewed', lead.signals.pricingViewed);
  add('casesViewed', lead.signals.casesViewed >= 2);

  const raw = reasons.reduce((sum, r) => sum + SCORE_RULES[r], 0);
  const score = Math.max(0, Math.min(100, raw));
  const band: ScoreBand =
    score >= BAND_THRESHOLDS.sales ? 'sales' : score >= BAND_THRESHOLDS.sdr ? 'sdr' : 'nurture';
  return { score, band, reasons };
}
