import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getContent } from '@/content';
import { auditServicePage, buildServicePage, inSentence } from '@/content/services/build';
import { locales } from '@/lib/i18n/locales';
import { pathFor } from '@/lib/routing';

describe('máquina de conteúdo de serviços', () => {
  const { services, areas } = getContent();

  it('cada serviço do menu (todas as áreas) tem página em todos os idiomas', () => {
    for (const a of areas)
      for (const id of a.serviceIds)
        for (const l of locales) assert.ok(pathFor(l, { kind: 'service', id }), `${id} ${l}`);
  });

  it('todas as páginas geradas passam na auditoria', () => {
    for (const s of services.filter((x) => x.page))
      for (const l of locales)
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
    assert.equal(
      pathFor('en', { kind: 'service', id: 'aplicacoes-web' }),
      '/en/services/web-applications/',
    );
    assert.equal(
      pathFor('en-gb', { kind: 'service', id: 'aplicacoes-web' }),
      '/en-gb/services/web-applications/',
    );
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

  // Cobertura do catálogo inglês (em falta, órfãs, marcadores): tests/unit/i18n.test.ts.
  it('páginas em inglês sem português', () => {
    const PT = /[ãõçáéíóúâêô]|(?<!\p{L})(de|para|com|não|testes|dados|equipa)(?!\p{L})/u;
    const NAMES =
      /São Paulo|Florianópolis|Belo Horizonte|Brasília|Lisboa|Porto|Braga|Coimbra|Curitiba|Recife/g;
    for (const s of services.filter((x) => x.page))
      for (const l of ['en', 'en-gb'] as const) {
        const v = buildServicePage(s, l);
        const all = JSON.stringify({
          ...v,
          id: '',
          relatedServiceIds: [],
          caseIds: [],
          stackIds: [],
        }).replace(NAMES, '');
        assert.ok(!PT.test(all), `${s.id} ${l}: ${all.match(PT)?.[0]}`);
      }
  });
});
