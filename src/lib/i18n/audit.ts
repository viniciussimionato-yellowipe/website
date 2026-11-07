/**
 * Auditoria das traduções (src/i18n). Usada por `npm run i18n:check` e pelos testes.
 * Erros partem o check; avisos aparecem no relatório para alguém rever.
 */
import { getContent } from '@/content';
import { buildServicePage } from '@/content/services/build';
import { servicePages } from '@/content/services/pages';
import * as serviceTemplates from '@/content/services/templates';
import { buildTechPage } from '@/content/technologies/build';
import * as techTemplates from '@/content/technologies/templates';
import { getDictionary } from '@/dictionaries';
import { catalogs, contentTranslations, ui } from '@/i18n';
import type { Locale } from './locales';

export type Issue = { locale: Locale | 'all'; where: string; message: string };
export type Report = { errors: Issue[]; warnings: Issue[]; stats: Record<string, number> };

type Tree = Record<string, unknown>;
const LOCALE_KEYS = new Set(['pt', 'br', 'en', 'en-gb']);
const isLocalized = (o: unknown): o is Tree =>
  !!o &&
  typeof o === 'object' &&
  !Array.isArray(o) &&
  'pt' in o &&
  Object.keys(o).every((k) => LOCALE_KEYS.has(k));
/** Marcadores {x} de um texto; {a}/{A} (artigo inglês) só existem em inglês. */
const placeholders = (s: string) =>
  [...s.matchAll(/\{(\w+)\}/g)]
    .map((m) => m[1]!)
    .filter((k) => k !== 'a' && k !== 'A')
    .sort();
const sameSet = (a: string[], b: string[]) => a.join(',') === b.join(',');

/** Todas as strings de um valor, com o caminho. */
function strings(v: unknown, path: string, out: [string, string][] = []): [string, string][] {
  if (typeof v === 'string') out.push([path, v]);
  else if (Array.isArray(v)) v.forEach((x, i) => strings(x, `${path}[${i}]`, out));
  else if (v && typeof v === 'object')
    for (const [k, x] of Object.entries(v)) strings(x, path ? `${path}.${k}` : k, out);
  return out;
}

// ---------------------------------------------------------------- regras de idioma

/** Termos de pt-PT que não podem aparecer em pt-BR. */
const PT_PT =
  /(?<!\p{L})(equipas?|ecrãs?|utilizador(?:es|as?)?|registos?|telemóve(?:l|is)|contacto|contactos|contactar|ficheiros?|monitorização|modelação|controlo|deteção|connosco|bases? de dados|consigo|planeamento|partilha(?:r|do|da|dos|das)?|aceder|está a \p{L}+r|estão a \p{L}+r|sénior|guardar|facto|receção|secção|percentagem)(?!\p{L})/iu;
/** Português num texto em inglês (acentos ou palavras muito frequentes). */
const PORTUGUESE =
  /[ãõçáíóúâêôàé]|(?<!\p{L})(de|das|dos|para|não|uma|testes|dados|equipa|equipe|serviços)(?!\p{L})/u;
/** Nomes próprios com acentos que podem aparecer em inglês. */
const PROPER_NAMES =
  /São Paulo|Florianópolis|Belo Horizonte|Brasília|Goiânia|Maceió|Vitória|Linköping|Pokémon|Café|Hapvida|Sêmaco|Clínica/g;
/** Ortografia britânica que não pode ficar no inglês americano. */
const BRITISH =
  /\b(optimis|organis|customis|prioritis|summaris|visualis|standardis|recognis|modernis|normalis|stabilis|parallelis|authoris|utilis|centralis|finalis|categoris|digitalis|monetis|personalis|synchronis|tokenis|minimis|maximis|containeris)\w*|\banalys(e|ed|es|ing)\b|\b(colour|behaviour|favourite|centre|catalogue|modelling|modelled|labelled|cancelled|travelling|licences|whilst|amongst)\b/i;
/** Ortografia americana que não pode ficar em en-GB (nomes de produtos à parte). */
const AMERICAN =
  /\b(?!(?:size|sizes|sized|sizing|resiz\w*|oversized|prize|prizes|seize\w*|citizens?|Kustomize|Optimizely)\b)\w+(iz|yz)(e|es|ed|ing|ation|ations|er|ers)\b|\b(color|behavior|favorite|center|catalog|modeling|modeled|labeled|canceled|traveling)s?\b/;
/** Texto pendente de confirmação. */
const PENDING = /\[[^\]]*\]/;

/** Campos que não são texto para o visitante. */
const NOT_TEXT = /(^|\.)(id|slug|monogram|logo|href|city|related|stackIds|caseIds)(\[\d+\])?$/;

function lint(locale: Locale, where: string, text: string, report: Report) {
  if (NOT_TEXT.test(where)) return;
  const warn = (message: string) => report.warnings.push({ locale, where, message });
  const err = (message: string) => report.errors.push({ locale, where, message });
  if (PENDING.test(text)) warn(`pendente: ${text.match(PENDING)![0]}`);
  if (locale === 'br') {
    const m = text.match(PT_PT);
    if (m) err(`termo de pt-PT em pt-BR: "${m[0]}"`);
  }
  if (locale === 'en' || locale === 'en-gb') {
    const clean = text.replace(PROPER_NAMES, '');
    const m = clean.match(PORTUGUESE);
    if (m) err(`português em inglês: "${m[0]}"`);
  }
  if (locale === 'en') {
    const m = text.match(BRITISH);
    if (m) err(`ortografia britânica em inglês americano: "${m[0]}"`);
  }
  if (locale === 'en-gb') {
    const m = text.match(AMERICAN);
    if (m) err(`ortografia americana em en-GB: "${m[0]}"`);
  }
}

// ---------------------------------------------------------------- interface

function auditUi(report: Report) {
  const pt = strings(ui.pt, '');
  const ptMap = new Map(pt);
  report.stats['ui.pt'] = pt.length;
  for (const l of ['br', 'en'] as const) {
    const own = new Map(strings(ui[l], ''));
    report.stats[`ui.${l}`] = own.size;
    for (const [path, src] of pt) {
      const t = own.get(path);
      if (t === undefined) {
        report.errors.push({ locale: l, where: `ui.${path}`, message: 'falta tradução' });
        continue;
      }
      if (!sameSet(placeholders(src), placeholders(t)))
        report.errors.push({
          locale: l,
          where: `ui.${path}`,
          message: `marcadores diferentes do pt: ${placeholders(src)} ≠ ${placeholders(t)}`,
        });
      if (l === 'en' && t === src && /\p{L}{4,}/u.test(src) && PORTUGUESE.test(src))
        report.warnings.push({ locale: l, where: `ui.${path}`, message: `igual ao pt: "${t}"` });
    }
    for (const path of own.keys())
      if (!ptMap.has(path))
        // Listas (ex.: palavras-chave) podem ter mais itens num idioma; chaves novas não.
        (/\[\d+\]$/.test(path) ? report.warnings : report.errors).push({
          locale: l,
          where: `ui.${path}`,
          message: 'chave que não existe em pt',
        });
  }
  for (const [path] of strings(ui['en-gb'], ''))
    if (!ptMap.has(path))
      report.errors.push({
        locale: 'en-gb',
        where: `ui.${path}`,
        message: 'chave que não existe em pt',
      });
  for (const l of ['br', 'en', 'en-gb'] as const)
    for (const [path, t] of strings(getDictionary(l), '')) lint(l, `ui.${path}`, t, report);
}

// ---------------------------------------------------------------- conteúdo

function auditContent(report: Report) {
  const content = getContent();
  const missing: Record<'br' | 'en', number> = { br: 0, en: 0 };
  let nodes = 0;

  const walk = (node: unknown, path: string, published: boolean) => {
    if (Array.isArray(node)) {
      node.forEach((item, i) => {
        const id =
          item && typeof item === 'object' && typeof (item as Tree).id === 'string'
            ? ((item as Tree).id as string)
            : String(i);
        const status = item && typeof item === 'object' ? (item as Tree).status : undefined;
        walk(item, `${path}.${id}`, published && status !== 'draft');
      });
      return;
    }
    if (!node || typeof node !== 'object') return;
    if (isLocalized(node)) {
      nodes++;
      for (const l of ['br', 'en'] as const) {
        // Tecnologias em pt-BR: geradas do pt-PT pelo glossário, salvo tradução própria.
        if (l === 'br' && path.startsWith('.stacks')) continue;
        if (node[l] === undefined) {
          missing[l]++;
          if (published)
            report.warnings.push({ locale: l, where: `content${path}`, message: 'falta tradução' });
        }
      }
      for (const l of ['br', 'en', 'en-gb'] as const)
        if (node[l] !== undefined && !path.endsWith('.slug'))
          for (const [p, t] of strings(node[l], ''))
            lint(l, `content${path}${p ? '.' + p : ''}`, t, report);
      return;
    }
    for (const [k, v] of Object.entries(node)) walk(v, `${path}.${k}`, published);
  };
  walk(content, '', true);
  report.stats['content.textos'] = nodes;
  report.stats['content.sem-br'] = missing.br;
  report.stats['content.sem-en'] = missing.en;

  // Traduções que não correspondem a nenhum texto (id ou campo mudou de nome).
  const orphans = (node: unknown, tree: unknown, path: string, l: Locale) => {
    if (tree === undefined) return;
    if (node === undefined) {
      report.errors.push({
        locale: l,
        where: `content${path}`,
        message: 'tradução órfã (não existe em pt)',
      });
      return;
    }
    if (isLocalized(node) || !tree || typeof tree !== 'object') return;
    const t = tree as Tree;
    if (Array.isArray(node)) {
      const byKey = new Map(
        node.map((item, i) => [
          item && typeof item === 'object' && typeof (item as Tree).id === 'string'
            ? ((item as Tree).id as string)
            : String(i),
          item,
        ]),
      );
      for (const k of Object.keys(t)) orphans(byKey.get(k), t[k], `${path}.${k}`, l);
      return;
    }
    for (const k of Object.keys(t)) orphans((node as Tree)[k], t[k], `${path}.${k}`, l);
  };
  for (const l of ['br', 'en', 'en-gb'] as const) orphans(content, contentTranslations[l], '', l);
}

// ---------------------------------------------------------------- páginas geradas

/** Texto sem marcas de português (nomes de tecnologias, siglas): não precisa de tradução. */
const NEUTRAL = (s: string) =>
  !/[ãõçáéíóúâêôàÁÉÍÓÚ]|(?<!\p{L})(de|da|do|das|dos|para|com|e|em|um|uma|o|a|os|as|no|na|que|não|por|sem|seu|sua)(?!\p{L})/u.test(
    s,
  );

function auditGenerated(report: Report) {
  const sources: Record<'technologies' | 'services', Set<string>> = {
    technologies: new Set(),
    services: new Set(),
  };
  const collect = (v: unknown, into: Set<string>) =>
    strings(v, '').forEach(([p, s]) => {
      if (!NOT_TEXT.test(p)) into.add(s);
    });
  for (const [k, v] of Object.entries(techTemplates))
    if (k !== 'RELATED_SERVICES') collect(v, sources.technologies);
  sources.technologies.add('Especialistas avaliados em Portugal e no Brasil.');
  for (const s of getContent().stacks) {
    s.layers.forEach((l) => collect(l, sources.technologies));
    collect(s.serviceTags, sources.technologies);
    for (const o of Object.values(s.serviceOverrides)) collect(o, sources.technologies);
  }
  collect(servicePages, sources.services);
  collect(serviceTemplates, sources.services);
  sources.services.add('Especialistas avaliados em Portugal e no Brasil.');

  for (const name of ['technologies', 'services'] as const) {
    const cat = catalogs[name];
    report.stats[`${name}.catálogo`] = Object.keys(cat).length;
    for (const k of Object.keys(cat))
      if (!sources[name].has(k))
        report.errors.push({
          locale: 'en',
          where: `${name}.json`,
          message: `tradução órfã: "${k}"`,
        });
    for (const k of Object.keys(cat))
      if (!sameSet(placeholders(k), placeholders(cat[k]!)))
        report.errors.push({
          locale: 'en',
          where: `${name}.json`,
          message: `marcadores diferentes: "${k}"`,
        });
  }
  // Textos de serviços (pt-PT) sem tradução que não sejam termos neutros.
  for (const s of sources.services)
    if (catalogs.services[s] === undefined && !NEUTRAL(s))
      report.errors.push({ locale: 'en', where: 'services.json', message: `sem tradução: "${s}"` });

  // O que o visitante vê nas páginas geradas.
  const { stacks, services } = getContent();
  for (const l of ['br', 'en', 'en-gb'] as const) {
    for (const s of stacks.filter((x) => x.status === 'published')) {
      const v = buildTechPage(s, l);
      for (const [p, t] of strings(
        { ...v, id: '', logo: '', relatedServiceIds: [], caseIds: [] },
        '',
      ))
        lint(l, `tecnologia ${s.id}.${p}`, t, report);
    }
    for (const s of services.filter((x) => x.page)) {
      const v = buildServicePage(s, l);
      for (const [p, t] of strings(
        { ...v, id: '', relatedServiceIds: [], caseIds: [], stackIds: [] },
        '',
      ))
        lint(l, `serviço ${s.id}.${p}`, t, report);
    }
  }
}

export function auditTranslations(): Report {
  const report: Report = { errors: [], warnings: [], stats: {} };
  auditUi(report);
  auditContent(report);
  auditGenerated(report);
  // A mesma frase repetida em várias páginas conta uma vez.
  const uniq = (list: Issue[]) => {
    const seen = new Set<string>();
    return list.filter((i) => {
      const key = i.message.includes('"')
        ? `${i.locale}|${i.message}`
        : `${i.locale}|${i.where}|${i.message}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };
  report.errors = uniq(report.errors);
  report.warnings = uniq(report.warnings);
  return report;
}
