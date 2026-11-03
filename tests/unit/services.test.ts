import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getContent } from '@/content';
import { auditServicePage, buildServicePage, inSentence } from '@/content/services/build';
import { pathFor } from '@/lib/routing';

describe('máquina de conteúdo de serviços', () => {
  const { services, areas } = getContent();

  it('cada serviço do menu (todas as áreas) tem página em pt e br', () => {
    for (const a of areas)
      for (const id of a.serviceIds)
        for (const l of ['pt', 'br'] as const)
          assert.ok(pathFor(l, { kind: 'service', id }), `${id} ${l}`);
  });

  it('todas as páginas geradas passam na auditoria', () => {
    for (const s of services.filter((x) => x.page))
      for (const l of ['pt', 'br'] as const)
        assert.deepEqual(auditServicePage(buildServicePage(s, l)), [], `${s.id} ${l}`);
  });

  it('URLs por idioma', () => {
    assert.equal(
      pathFor('pt', { kind: 'service', id: 'aplicacoes-web' }),
      '/pt/servicos/aplicacoes-web/',
    );
    assert.equal(
      pathFor('br', { kind: 'service', id: 'aplicacoes-web' }),
      '/br/servicos/aplicacoes-web/',
    );
    assert.equal(pathFor('en', { kind: 'service', id: 'aplicacoes-web' }), null);
  });

  it('o conteúdo é moldado pelo serviço (páginas diferentes na mesma área)', () => {
    const web = buildServicePage(
      services.find((s) => s.id === 'aplicacoes-web')!,
      'pt',
    );
    const mobile = buildServicePage(
      services.find((s) => s.id === 'aplicacoes-mobile')!,
      'pt',
    );
    assert.notEqual(web.pitch, mobile.pitch);
    assert.notDeepEqual(web.offerings, mobile.offerings);
    assert.deepEqual(
      web.layers.map((l) => l.label),
      mobile.layers.map((l) => l.label),
    );
  });

  it('recrutamento só oferece o modelo Contrate', () => {
    const v = buildServicePage(
      services.find((s) => s.id === 'liderancas-tecnologicas')!,
      'pt',
    );
    assert.deepEqual(
      v.models.map((m) => m.id),
      ['contrate'],
    );
  });

  it('pt-BR é adaptado, não copiado', () => {
    const v = buildServicePage(
      services.find((s) => s.id === 'aplicacoes-web')!,
      'br',
    );
    const all = JSON.stringify(v);
    for (const w of ['equipa', 'utilizador', 'no browser', 'faturação'])
      assert.ok(!all.includes(w), `"${w}" em pt-BR`);
  });

  it('nome a meio da frase', () => {
    assert.equal(inSentence('Aplicações web'), 'aplicações web');
    assert.equal(inSentence('IoT'), 'IoT');
    assert.equal(inSentence('DevOps e DevSecOps'), 'DevOps e DevSecOps');
  });
});
