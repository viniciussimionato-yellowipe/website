import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getContent } from '@/content';
import { buildTechPage } from '@/content/technologies/build';
import { getDictionary } from '@/dictionaries';
import { britishDeep, toBritish } from '@/lib/i18n/british';

/** Ortografia americana que não pode ficar em en-GB (exceto nomes de produtos). */
const US =
  /\b(?!(?:size|sizes|sized|sizing|resiz\w*|oversized|prize|prizes|seize\w*|citizens?|Kustomize|Optimizely)\b)\w+(iz|yz)(e|es|ed|ing|ation|ations|er|ers)\b|\b(color|behavior|favorite|center|catalog|modeling|modeled|labeled|canceled|traveling)s?\b/;
/** Ortografia britânica que não pode ficar no inglês americano. */
const GB =
  /\b(optimis|organis|customis|prioritis|summaris|visualis|standardis|recognis|modernis|normalis|stabilis|parallelis|specialis(e|ed|es|ing|ation)|authoris|utilis|centralis|finalis|categoris|digitalis|monetis|personalis|synchronis|tokenis|minimis|maximis|containeris|realis(e|ed|es|ing))\w*|\banalys(e|ed|es|ing)\b|\b(colour|behaviour|favourite|centre|catalogue|modelling|modelled|labelled|cancelled|travelling|licences)\b/i;

function texts(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) for (const v of value) texts(v, out);
  else if (value && typeof value === 'object')
    for (const [k, v] of Object.entries(value))
      if (
        !['id', 'slug', 'href', 'logo', 'caseIds', 'relatedStackIds', 'relatedServiceIds'].includes(
          k,
        )
      )
        texts(v, out);
  return out;
}

/** Valores `en` / `en-gb` de todo o conteúdo localizado. */
function localizedTexts(node: unknown, lang: 'en' | 'en-gb', out: string[] = []): string[] {
  if (Array.isArray(node)) for (const n of node) localizedTexts(n, lang, out);
  else if (node && typeof node === 'object') {
    const obj = node as Record<string, unknown>;
    if ('pt' in obj && lang in obj) texts(obj[lang], out);
    for (const [k, v] of Object.entries(obj))
      if (k !== 'en' && k !== 'en-gb' && k !== 'slug') localizedTexts(v, lang, out);
  }
  return out;
}

describe('inglês americano e britânico', () => {
  it('converte a ortografia e preserva nomes de produtos e URLs', () => {
    assert.equal(
      toBritish('We optimize, analyze and modernize the organization.'),
      'We optimise, analyse and modernise the organisation.',
    );
    assert.equal(
      toBritish('Customize the color of the data center'),
      'Customise the colour of the data centre',
    );
    assert.equal(
      toBritish('Right-sizing and Kustomize with Unity Catalog'),
      'Right-sizing and Kustomize with Unity Catalog',
    );
    assert.equal(toBritish('/en/technologies/optimize/'), '/en/technologies/optimize/');
    assert.equal(
      toBritish('Data modeling for a labeled dataset'),
      'Data modelling for a labelled dataset',
    );
    assert.equal(toBritish('Optimization'), 'Optimisation');
  });

  it('dicionário: en sem ortografia britânica, en-GB sem americana', () => {
    for (const t of texts(getDictionary('en'))) assert.ok(!GB.test(t), `en: ${t}`);
    for (const t of texts(getDictionary('en-gb'))) assert.ok(!US.test(t), `en-gb: ${t}`);
  });

  it('conteúdo: en sem ortografia britânica, en-GB sem americana', () => {
    const c = getContent();
    for (const t of localizedTexts(c, 'en')) assert.ok(!GB.test(t), `en: ${t}`);
    for (const t of localizedTexts(c, 'en-gb')) assert.ok(!US.test(t), `en-gb: ${t}`);
  });

  it('páginas de tecnologia: en-GB é a americana com ortografia britânica', () => {
    for (const s of getContent().stacks.filter((x) => x.status === 'published')) {
      const us = buildTechPage(s, 'en');
      const gb = buildTechPage(s, 'en-gb');
      assert.deepEqual(gb, britishDeep(us), s.id);
      for (const t of texts(us)) assert.ok(!GB.test(t), `${s.id} en: ${t}`);
      for (const t of texts(gb)) assert.ok(!US.test(t), `${s.id} en-gb: ${t}`);
    }
  });

  it('tudo o que existe em inglês existe também em en-GB, com o mesmo slug', () => {
    for (const m of getContent().models) assert.equal(m.slug['en-gb'], m.slug.en, m.id);
  });
});
