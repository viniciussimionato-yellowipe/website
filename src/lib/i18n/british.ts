/**
 * Inglês americano → inglês britânico (en-GB).
 *
 * O inglês do site escreve-se em americano (en, a fonte). A versão britânica deriva
 * daqui: só muda a ortografia, porque o vocabulário de tecnologia e de negócio é o mesmo
 * nos dois mercados. Diferenças que não são de ortografia escrevem-se à mão em
 * `src/dictionaries/en-gb.ts` (dicionário) ou no campo `en-gb` do conteúdo.
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

/** Palavras com -iz- que não são o sufixo -ize (ou que são nomes próprios). */
const IZE_KEEP = new Set([
  'size',
  'sizes',
  'sized',
  'sizing',
  'resize',
  'resized',
  'resizing',
  'oversize',
  'oversized',
  'downsize',
  'downsizing',
  'right-size',
  'right-sizing',
  'prize',
  'prizes',
  'seize',
  'seized',
  'capsize',
  'citizen',
  'citizens',
  'kustomize',
  'optimizely',
  'bizagi',
]);

/** Termos que nunca se tocam: nomes de produtos, bibliotecas e marcas. */
const KEEP = [
  'Kustomize',
  'Optimizely',
  'Harbor',
  'Vapor',
  'Azure Monitor',
  'Unity Catalog',
  'AWS Glue Data Catalog',
  'Data Catalog',
  'Service Catalog',
  'Partner Center',
  'Security Center',
  'Defender for Cloud',
  'Hugging Face Tokenizers',
];

/** Pares US → GB que não seguem as regras gerais (formas em minúsculas). */
const WORDS: Record<string, string> = {
  // -or → -our
  color: 'colour',
  colors: 'colours',
  colored: 'coloured',
  behavior: 'behaviour',
  behaviors: 'behaviours',
  behavioral: 'behavioural',
  favor: 'favour',
  favors: 'favours',
  favorite: 'favourite',
  favorites: 'favourites',
  favorable: 'favourable',
  honor: 'honour',
  labor: 'labour',
  neighbor: 'neighbour',
  neighbors: 'neighbours',
  flavor: 'flavour',
  flavors: 'flavours',
  rumor: 'rumour',
  humor: 'humour',
  endeavor: 'endeavour',
  endeavors: 'endeavours',
  // -er → -re
  center: 'centre',
  centers: 'centres',
  centered: 'centred',
  datacenter: 'datacentre',
  datacenters: 'datacentres',
  fiber: 'fibre',
  theater: 'theatre',
  liter: 'litre',
  // -og → -ogue
  catalog: 'catalogue',
  catalogs: 'catalogues',
  // -ense → -ence (substantivos)
  license: 'licence',
  licenses: 'licences',
  defense: 'defence',
  offense: 'offence',
  // consoante dobrada
  modeling: 'modelling',
  modeled: 'modelled',
  modeler: 'modeller',
  labeled: 'labelled',
  labeling: 'labelling',
  traveling: 'travelling',
  traveled: 'travelled',
  traveler: 'traveller',
  travelers: 'travellers',
  canceled: 'cancelled',
  canceling: 'cancelling',
  fueled: 'fuelled',
  signaling: 'signalling',
  leveled: 'levelled',
  leveling: 'levelling',
  enroll: 'enrol',
  enrollment: 'enrolment',
  fulfill: 'fulfil',
  fulfillment: 'fulfilment',
  skillful: 'skilful',
  // outras
  gray: 'grey',
  mold: 'mould',
  aging: 'ageing',
  toward: 'towards',
  judgment: 'judgement',
};

function matchCase(source: string, target: string): string {
  if (source === source.toUpperCase() && source.length > 1) return target.toUpperCase();
  if (source[0] === source[0]!.toUpperCase()) return target[0]!.toUpperCase() + target.slice(1);
  return target;
}

const IZE = /\b([A-Za-z-]*?[a-z])(i|y)z(e|es|ed|ing|er|ers|able|ation|ations|ational)\b/g;
const WORD = /\b[A-Za-z]+\b/g;

/** Vocabulário que muda no Reino Unido (não é ortografia). */
const PHRASES: [RegExp, string][] = [
  [/\bbusiness day(s?)\b/g, 'working day$1'],
  [/\bBusiness day(s?)\b/g, 'Working day$1'],
];

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
