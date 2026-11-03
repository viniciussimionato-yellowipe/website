import type { LeadInput } from './schema';
import type { ScoreResult } from './scoring';

/**
 * Encaminhamento e tempos de resposta (R-07).
 * Candidatos vão sempre para o ATS e nunca entram no CRM.
 */
export type Destination =
  | { system: 'ats' }
  | {
      system: 'crm';
      queue: 'sales-pt' | 'sales-br' | 'sales-intl' | 'sdr' | 'nurture';
      slaHours: number | null;
    };

export type NextStep = 'calendar' | 'email' | 'jobs';

export function assignLead(
  lead: LeadInput,
  result: ScoreResult,
): { destination: Destination; next: NextStep } {
  if (lead.intent === 'job') return { destination: { system: 'ats' }, next: 'jobs' };

  if (result.band === 'sales') {
    const queue =
      lead.country === 'PT' ? 'sales-pt' : lead.country === 'BR' ? 'sales-br' : 'sales-intl';
    const slaHours = queue === 'sales-intl' ? 24 : 4;
    return { destination: { system: 'crm', queue, slaHours }, next: 'calendar' };
  }
  if (result.band === 'sdr') {
    return { destination: { system: 'crm', queue: 'sdr', slaHours: 24 }, next: 'email' };
  }
  return { destination: { system: 'crm', queue: 'nurture', slaHours: null }, next: 'email' };
}
