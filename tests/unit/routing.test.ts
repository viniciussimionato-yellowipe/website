import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getContent } from '@/content';
import { detectLocale, locales } from '@/lib/i18n/locales';
import { hreflangMap } from '@/lib/seo/alternates';
import { allRoutes, pathFor, resolvePath } from '@/lib/routing';

describe('routing', () => {
  it('cada rota resolve para si própria em cada idioma', () => {
    for (const l of locales) {
      for (const r of allRoutes(l)) {
        const path = pathFor(l, r)!;
        const segments = path.split('/').filter(Boolean).slice(1);
        if (segments.length === 0) continue;
        assert.deepEqual(resolvePath(l, segments), r, path);
      }
    }
  });

  it('não há URLs duplicados num idioma', () => {
    for (const l of locales) {
      const paths = allRoutes(l).map((r) => pathFor(l, r));
      assert.equal(new Set(paths).size, paths.length, l);
    }
  });

  it('slugs traduzidos por mercado', () => {
    assert.equal(pathFor('pt', { kind: 'model', id: 'reforce' }), '/pt/outsourcing-de-ti/');
    assert.equal(
      pathFor('br', { kind: 'model', id: 'reforce' }),
      '/br/alocacao-de-profissionais-ti/',
    );
    assert.equal(pathFor('en', { kind: 'model', id: 'reforce' }), null);
  });

  it('só serviços publicados e com página têm URL', () => {
    for (const s of getContent().services)
      assert.equal(
        pathFor('pt', { kind: 'service', id: s.id }) !== null,
        s.status === 'published' && s.page !== undefined,
        s.id,
      );
    assert.equal(
      pathFor('pt', { kind: 'service', id: 'automacao-de-testes' }),
      '/pt/servicos/automacao-de-testes/',
    );
  });

  it('hreflang recíproco com x-default', () => {
    const map = hreflangMap({ kind: 'home' });
    assert.deepEqual(Object.keys(map).sort(), ['en-GB', 'en-US', 'pt-BR', 'pt-PT', 'x-default']);
    assert.ok(map['en-GB']!.endsWith('/en-gb/'));
    assert.ok(map['x-default']!.endsWith('/pt/'));
  });

  it('deteta o idioma pelo país e pelo browser', () => {
    assert.equal(detectLocale('en-US,en;q=0.9', 'BR'), 'br');
    assert.equal(detectLocale('pt-BR,pt;q=0.9', null), 'br');
    assert.equal(detectLocale('pt-PT', null), 'pt');
    assert.equal(detectLocale('de-DE', 'DE'), 'en');
    assert.equal(detectLocale(null, null), 'pt');
  });

  it('distingue inglês americano e britânico', () => {
    assert.equal(detectLocale('en-GB,en;q=0.9', 'US'), 'en-gb');
    assert.equal(detectLocale('en-US,en;q=0.9', 'GB'), 'en');
    assert.equal(detectLocale('en', 'GB'), 'en-gb');
    assert.equal(detectLocale('en', 'US'), 'en');
    assert.equal(detectLocale('en-AU', null), 'en-gb');
    assert.equal(detectLocale('de-DE', 'IE'), 'en-gb');
    assert.equal(detectLocale('pt-PT,en-GB;q=0.8', 'GB'), 'pt');
  });
});
