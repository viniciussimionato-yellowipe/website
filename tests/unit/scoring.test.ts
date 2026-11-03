import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { assignLead } from '@/lib/leads/assign';
import { LeadInput } from '@/lib/leads/schema';
import { isPersonalEmail, scoreLead } from '@/lib/leads/scoring';

const base = {
  intent: 'augment',
  name: 'Ana Silva',
  email: 'ana@empresa.pt',
  company: 'Empresa SA',
  country: 'PT',
  locale: 'pt',
} as const;

const lead = (over: Record<string, unknown> = {}) => LeadInput.parse({ ...base, ...over });

describe('scoreLead', () => {
  it('lead forte vai para vendas (50+)', () => {
    const r = scoreLead(
      lead({ jobTitle: 'CTO', start: 'lt3m', companySize: '250+', headcount: 3 }),
    );
    // 15 email + 15 cargo + 15 prazo + 10 mercado + 10 dimensão + 10 perfis = 75
    assert.equal(r.score, 75);
    assert.equal(r.band, 'sales');
  });

  it('email pessoal sem outros sinais fica em nurturing', () => {
    const r = scoreLead(lead({ email: 'ana@gmail.com', country: 'OTHER' }));
    assert.equal(r.score, 0);
    assert.equal(r.band, 'nurture');
  });

  it('sinais de comportamento contam', () => {
    const r = scoreLead(lead({ signals: { pricingViewed: true, casesViewed: 2 } }));
    // 15 + 10 + 10 + 5 = 40
    assert.equal(r.score, 40);
    assert.equal(r.band, 'sdr');
  });

  it('pontuação nunca passa de 100 nem fica negativa', () => {
    const r = scoreLead(lead({ email: 'x@hotmail.com', country: 'OTHER' }));
    assert.ok(r.score >= 0 && r.score <= 100);
  });

  it('reconhece domínios pessoais', () => {
    assert.equal(isPersonalEmail('a@uol.com.br'), true);
    assert.equal(isPersonalEmail('a@yellowipe.io'), false);
  });
});

describe('assignLead', () => {
  it('candidatos vão sempre para o ATS', () => {
    const l = lead({ intent: 'job', company: undefined });
    const a = assignLead(l, scoreLead(l));
    assert.deepEqual(a.destination, { system: 'ats' });
    assert.equal(a.next, 'jobs');
  });

  it('vendas por mercado com SLA', () => {
    const strong = {
      jobTitle: 'Head of Engineering',
      start: 'now',
      companySize: '50-249',
      headcount: 2,
    };
    const br = lead({ ...strong, country: 'BR' });
    const us = lead({ ...strong, country: 'US' });
    assert.deepEqual(assignLead(br, scoreLead(br)).destination, {
      system: 'crm',
      queue: 'sales-br',
      slaHours: 4,
    });
    assert.deepEqual(assignLead(us, scoreLead(us)).destination, {
      system: 'crm',
      queue: 'sales-intl',
      slaHours: 24,
    });
    assert.equal(assignLead(br, scoreLead(br)).next, 'calendar');
  });
});
