import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getContent } from '@/content';
import { auditServicePage, buildServicePage, inSentence } from '@/content/services/build';
import { SERVICES_EN } from '@/content/services/en';
import { servicePages } from '@/content/services/pages';
import * as T from '@/content/services/templates';
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

  it('inglês: cada texto pt-PT tem tradução ou é um termo igual em inglês', () => {
    // Termos sem acentos nem palavras portuguesas (nomes de tecnologias, siglas…).
    const PT =
      /[ãõçáéíóúâêôàÁÉÍÓÚ]|(?<!\p{L})(de|da|do|das|dos|para|com|e|em|um|uma|o|a|os|as|no|na|que|não|por|sem|seu|sua|Dados|Testes|Qualidade|Entrega|Processos|Regras|Fontes|Agentes|Sistemas|Ferramentas|Registos|Modelos|Produto|Custos|Alertas|Eventos|Suporte|Manuais|Terreno|Valor|Escala|Pilotos)(?!\p{L})/u;
    const texts: string[] = [];
    const walk = (v: unknown, key?: string) => {
      if (
        key &&
        ['id', 'model', 'market', 'city', 'years', 'stackIds', 'caseIds', 'related'].includes(key)
      )
        return;
      if (typeof v === 'string') texts.push(v);
      else if (Array.isArray(v)) v.forEach((x) => walk(x));
      else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) walk(x, k);
    };
    walk(servicePages);
    for (const k of [
      'ROLE',
      'LAYERS',
      'PROFILES',
      'FAQ_AREA',
      'FAQ_COMMON',
      'STEPS',
      'STEPS_RECRUITMENT',
      'MODELS',
    ] as const)
      walk((T as Record<string, unknown>)[k]);
    for (const t of texts)
      assert.ok(SERVICES_EN[t] !== undefined || !PT.test(t), `sem tradução: ${t}`);
  });

  it('inglês: o catálogo não guarda traduções de textos que já não existem', () => {
    const used = new Set<string>();
    const walk = (v: unknown) => {
      if (typeof v === 'string') used.add(v);
      else if (Array.isArray(v)) v.forEach(walk);
      else if (v && typeof v === 'object') Object.values(v).forEach(walk);
    };
    walk(servicePages);
    walk(T);
    for (const k of Object.keys(SERVICES_EN)) assert.ok(used.has(k), `tradução órfã: ${k}`);
  });

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
