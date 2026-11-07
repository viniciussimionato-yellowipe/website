import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getContent } from '@/content';
import { serializeJsonLd } from '@/lib/seo/jsonld';
import { getDictionary } from '@/dictionaries';

const pt = getDictionary('pt');

describe('conteúdo', () => {
  it('todo o conteúdo local passa nos esquemas', () => {
    assert.doesNotThrow(() => getContent());
  });

  it('referências entre conteúdos existem', () => {
    const c = getContent();
    const serviceIds = new Set(c.services.map((s) => s.id));
    const caseIds = new Set(c.cases.map((x) => x.id));
    const areaIds = new Set(c.areas.map((a) => a.id));
    for (const a of c.areas)
      for (const id of a.serviceIds) assert.ok(serviceIds.has(id), `área ${a.id} → ${id}`);
    for (const s of c.services) {
      assert.ok(areaIds.has(s.areaId), `serviço ${s.id} → área ${s.areaId}`);
      for (const id of s.page?.caseIds ?? [])
        assert.ok(caseIds.has(id), `serviço ${s.id} → caso ${id}`);
      for (const id of s.page?.related ?? [])
        assert.ok(serviceIds.has(id), `serviço ${s.id} → ${id}`);
    }
    for (const m of c.models)
      for (const id of m.caseIds) assert.ok(caseIds.has(id), `modelo ${m.id} → ${id}`);
    for (const id of pt.hero.rotation) assert.ok(areaIds.has(id), `rotação → ${id}`);
  });

  it('JSON-LD não deixa fechar a tag script', () => {
    assert.ok(!serializeJsonLd({ x: '</script><script>' }).includes('</script>'));
  });
});
