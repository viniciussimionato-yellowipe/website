import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { handleLead } from '@/lib/leads/handle';

const ok = async () => ({ ok: true as const });
const deps = (over = {}) => ({
  deliverToCrm: ok,
  deliverToAts: ok,
  meetingUrl: () => undefined,
  ...over,
});

const valid = {
  intent: 'build',
  name: 'Rui Costa',
  email: 'rui@cliente.com',
  company: 'Cliente',
  jobTitle: 'CTO',
  country: 'PT',
  start: 'now',
  companySize: '250+',
  locale: 'pt',
};

describe('handleLead', () => {
  it('rejeita dados inválidos e indica os campos', async () => {
    const r = await handleLead({ ...valid, email: 'nao-e-email' }, {}, deps());
    assert.equal(r.status, 400);
    assert.ok(r.body.ok === false && 'fields' in r.body && r.body.fields.includes('email'));
  });

  it('cliente sem empresa é inválido', async () => {
    const r = await handleLead({ ...valid, company: '' }, {}, deps());
    assert.equal(r.status, 400);
  });

  it('lead forte com calendário configurado recebe o link', async () => {
    const r = await handleLead(valid, {}, deps({ meetingUrl: () => 'https://cal.example/pt' }));
    assert.equal(r.status, 200);
    assert.deepEqual(r.body, {
      ok: true,
      next: 'calendar',
      band: 'sales',
      meetingUrl: 'https://cal.example/pt',
    });
  });

  it('sem calendário configurado cai para email', async () => {
    const r = await handleLead(valid, {}, deps());
    assert.equal(r.status, 200);
    assert.equal(r.body.ok && r.body.next, 'email');
  });

  it('falha de entrega devolve 502 sem expor detalhes', async () => {
    const r = await handleLead(
      valid,
      {},
      deps({ deliverToCrm: async () => ({ ok: false as const, error: 'x' }) }),
    );
    assert.equal(r.status, 502);
  });

  it('candidato nunca vai para o CRM', async () => {
    let crmCalled = false;
    const r = await handleLead(
      { ...valid, intent: 'job', company: undefined },
      {},
      deps({ deliverToCrm: async () => ((crmCalled = true), { ok: true as const }) }),
    );
    assert.equal(crmCalled, false);
    assert.equal(r.body.ok && r.body.band, 'candidate');
  });
});
