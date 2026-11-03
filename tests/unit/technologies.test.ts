import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getContent } from '@/content';
import { auditTechPage, buildTechPage } from '@/content/technologies/build';
import { ptToBr } from '@/content/technologies/templates';
import { locales } from '@/lib/i18n/locales';
import { pathFor } from '@/lib/routing';

describe('máquina de conteúdo de tecnologias', () => {
  const { stacks, technologyGroups } = getContent();

  it('todas as stacks publicadas geram páginas sem problemas em todos os idiomas', () => {
    for (const t of stacks.filter((s) => s.status === 'published'))
      for (const l of locales)
        assert.deepEqual(auditTechPage(buildTechPage(t, l)), [], `${t.id} ${l}`);
  });

  it('cada item do menu aponta para uma página de tecnologia', () => {
    for (const g of technologyGroups)
      for (const id of g.stackIds)
        for (const l of locales) assert.ok(pathFor(l, { kind: 'technology', id }), `${id} ${l}`);
  });

  it('URLs por idioma', () => {
    assert.equal(pathFor('pt', { kind: 'technology', id: 'dotnet' }), '/pt/tecnologias/dotnet/');
    assert.equal(pathFor('br', { kind: 'technology', id: 'dotnet' }), '/br/tecnologias/dotnet/');
    assert.equal(pathFor('en', { kind: 'technology', id: 'dotnet' }), '/en/technologies/dotnet/');
  });

  it('o conteúdo é moldado pela stack (páginas diferentes na mesma categoria)', () => {
    const a = buildTechPage(
      stacks.find((s) => s.id === 'java')!,
      'pt',
    );
    const b = buildTechPage(
      stacks.find((s) => s.id === 'python')!,
      'pt',
    );
    assert.notEqual(a.keyword, b.keyword);
    assert.notDeepEqual(
      a.services.map((s) => s.tags),
      b.services.map((s) => s.tags),
    );
    assert.notDeepEqual(a.tools, b.tools);
  });

  it('o grupo de IA só aparece na página Tecnologias, não no menu', () => {
    const ai = technologyGroups.filter((g) => g.id === 'ia');
    assert.equal(ai.length, 1);
    assert.ok(ai.every((g) => g.hubOnly));
  });

  it('pt-BR: glossário respeita palavras inteiras e acentos', () => {
    assert.equal(ptToBr('A equipa usa o telemóvel.'), 'A equipe usa o celular.');
    assert.equal(ptToBr('Cada ecrã é desenhado de raiz.'), 'Cada tela é desenhada do zero.');
    assert.equal(ptToBr('equipamento'), 'equipamento');
    assert.equal(ptToBr('programadores sénior'), 'desenvolvedores sênior');
  });
});
