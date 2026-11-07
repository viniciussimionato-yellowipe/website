import glossary from '@/i18n/en-gb/glossary.json' with { type: 'json' };

/**
 * Inglês americano → inglês britânico (en-GB).
 *
 * O inglês do site escreve-se em americano (en, a fonte). A versão britânica deriva
 * daqui: só muda a ortografia, porque o vocabulário de tecnologia e de negócio é o mesmo
 * nos dois mercados. As listas de palavras estão em src/i18n/en-gb/glossary.json;
 * frases que mudam de outra forma escrevem-se à mão em src/i18n/en-gb/ui.json ou
 * src/i18n/en-gb/content.json.
 *
 * Regras (Oxford/Cambridge, o uso mais comum na imprensa e nas empresas do Reino Unido):
 * - -ize/-ization → -ise/-isation; -yze → -yse;
 * - -or → -our só nas palavras da lista (color, behavior…), nunca em agentes (vendor, monitor);
 * - -er → -re (center, fiber) e -og → -ogue (catalog), só em minúsculas: em maiúsculas
 *   são nomes de produtos (Unity Catalog, Partner Center);
 * - consoante dobrada antes de -ed/-ing (modeling → modelling, canceled → cancelled);
 * - nomes de produtos e de código nunca mudam (KEEP);
 * - "program" fica igual: no Reino Unido também se usa para software.
 * Coberto por tests/unit/british.test.ts: nenhum texto en-GB pode ficar com ortografia
 * americana nem um texto en com ortografia britânica.
 */

const IZE_KEEP = new Set(glossary.izeKeep);
/** Termos que nunca se tocam: nomes de produtos, bibliotecas e marcas. */
const KEEP: readonly string[] = glossary.keep;
/** Pares US → GB que não seguem as regras gerais (formas em minúsculas). */
const WORDS: Record<string, string> = glossary.words;

function matchCase(source: string, target: string): string {
  if (source === source.toUpperCase() && source.length > 1) return target.toUpperCase();
  if (source[0] === source[0]!.toUpperCase()) return target[0]!.toUpperCase() + target.slice(1);
  return target;
}

const IZE = /\b([A-Za-z-]*?[a-z])(i|y)z(e|es|ed|ing|er|ers|able|ation|ations|ational)\b/g;
const WORD = /\b[A-Za-z]+\b/g;

/** Vocabulário que muda no Reino Unido (não é ortografia): "business day" → "working day". */
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const PHRASES: [RegExp, string][] = Object.entries(
  glossary.phrases as Record<string, string>,
).flatMap(([us, gb]): [RegExp, string][] => [
  [new RegExp(`\\b${us}\\b`, 'g'), gb],
  [new RegExp(`\\b${cap(us)}\\b`, 'g'), cap(gb)],
]);

function convertSegment(text: string): string {
  let out = PHRASES.reduce((s, [re, to]) => s.replace(re, to), text);
  out = out.replace(IZE, (whole: string, stem: string, vowel: string, suffix: string) => {
    if (IZE_KEEP.has(whole.toLowerCase())) return whole;
    // "Capitalized" a meio da frase quase sempre é um nome de produto (Optimizely…).
    return `${stem}${vowel}s${suffix}`;
  });
  out = out.replace(WORD, (w) => {
    const lower = w.toLowerCase();
    const gb = WORDS[lower];
    if (!gb) return w;
    // -er/-og em maiúsculas a meio da frase: nome de produto (Partner Center).
    if (/^(center|centers|catalog|catalogs)$/.test(lower) && w[0] === w[0]!.toUpperCase()) {
      return w;
    }
    return matchCase(w, gb);
  });
  return out;
}

/** Converte um texto en-US para en-GB, preservando nomes de produtos e URLs. */
export function toBritish(text: string): string {
  if (!text || text.startsWith('/') || /^https?:\/\//.test(text)) return text;
  return protect(text, convertSegment);
}

/** Aplica `fn` só fora dos termos protegidos (KEEP). */
function protect(text: string, fn: (s: string) => string): string {
  const parts: string[] = [];
  let rest = text;
  for (;;) {
    let hit: { i: number; term: string } | null = null;
    for (const term of KEEP) {
      const i = rest.indexOf(term);
      if (i >= 0 && (!hit || i < hit.i)) hit = { i, term };
    }
    if (!hit) break;
    parts.push(fn(rest.slice(0, hit.i)), hit.term);
    rest = rest.slice(hit.i + hit.term.length);
  }
  parts.push(fn(rest));
  return parts.join('');
}

/** Chaves que nunca são texto para o visitante (ids, URLs, imagens). */
const SKIP_KEYS = new Set([
  'id',
  'ids',
  'slug',
  'href',
  'url',
  'src',
  'logo',
  'image',
  'icon',
  'caseIds',
  'relatedStackIds',
  'relatedServiceIds',
  'stackIds',
]);

/** Converte em profundidade todos os textos de um objeto (dicionário ou vista de página). */
export function britishDeep<T>(value: T, key?: string): T {
  if (key && SKIP_KEYS.has(key)) return value;
  if (typeof value === 'string') return toBritish(value) as T;
  if (Array.isArray(value)) return value.map((v) => britishDeep(v)) as T;
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = britishDeep(v, k);
    return out as T;
  }
  return value;
}
