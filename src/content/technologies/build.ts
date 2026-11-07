import { britishDeep } from '@/lib/i18n/british';
import type { Locale } from '@/lib/i18n/locales';
import { isEnglish } from '@/lib/i18n/locales';
import type { ModelId, TechCategory, TechStack } from '../schema';
import {
  CATEGORY_LABEL,
  FAQ_CATEGORY,
  FAQ_COMMON,
  KEYWORD,
  LAYERS,
  MODELS,
  PROFILES,
  RELATED_SERVICES,
  ROLE_NOUN,
  SERVICES,
  STEPS,
  TOOL_GROUP,
} from './templates';
import { technologyEn } from '@/i18n';
import { ptToBr } from '@/lib/i18n/brazilian';
import type { Two } from './templates';
import { programmaticTitle } from '@/lib/seo/titles';

/** Ferramentas de IA mostradas de forma discreta em todas as páginas de tecnologia. */
export const AI_TOOLS = [
  { name: 'Claude Code', logo: '/images/tech/claude.svg' },
  { name: 'Cursor', logo: '/images/tech/cursor.svg' },
  { name: 'GitHub Copilot', logo: '/images/tech/copilot.svg' },
  { name: 'OpenAI Codex', logo: '/images/tech/openai.svg' },
] as const;

export type TechPageView = {
  id: string;
  name: string;
  category: TechCategory;
  categoryLabel: string;
  logo?: string;
  /** Iniciais para quando não há logótipo. */
  monogram: string;
  keyword: string;
  pitch: string;
  version: string;
  seo: { title: string; description: string };
  layers: { label: string; chips: string[] }[];
  services: { id: string; title: string; pain: string; text: string; tags: string[] }[];
  models: { id: ModelId; title: string; text: string; yw: string; cl: string; cta: string }[];
  profiles: {
    role: string;
    bio: string;
    years: number;
    city: string;
    market: 'PT' | 'BR';
    model: ModelId;
    skills: string[];
  }[];
  tools: { name: string; items: string[] }[];
  steps: { title: string; text: string }[];
  faq: { q: string; a: string }[];
  relatedStackIds: string[];
  relatedServiceIds: string[];
  caseIds: string[];
};

const SEO_TITLE_MAX = 60;
const SEO_DESC_MIN = 70;
const SEO_DESC_MAX = 160;

/**
 * Texto pt-PT de um modelo (Two) ou da stack ({ pt, en? }) no idioma pedido, com
 * {name}/{role} resolvidos. Inglês: a tradução da stack ou o catálogo
 * src/i18n/en/technologies.json; pt-BR deriva do pt-PT pelo glossário.
 */
type Text = Two | { pt: string; en?: string };
function pick(t: Text, locale: Locale, vars: Record<string, string>): string {
  const base =
    typeof t === 'string'
      ? isEnglish(locale)
        ? technologyEn(t)
        : t
      : isEnglish(locale)
        ? (t.en ?? technologyEn(t.pt))
        : t.pt;
  const filled = base.replace(/\{(\w+)\}/g, (m, k: string) => vars[k] ?? m);
  return locale === 'br' ? ptToBr(filled) : filled;
}

const DESC_TAIL: Two = 'Especialistas avaliados em Portugal e no Brasil.';

/** Artigo indefinido inglês pelo som: "an Angular", "an AWS", "a React", "a .NET". */
export function article(name: string): 'a' | 'an' {
  if (/^(SAP|SQL|HTML|MS|XML|LLM|NLP|R)\b/.test(name)) return 'an';
  if (/^(Uni|Use|Ubu|One)/.test(name)) return 'a';
  return /^[aeiou]/i.test(name) ? 'an' : 'a';
}

/** Etiquetas (camadas e serviços) no idioma da página: as que não são nomes de tecnologia. */
function chip(text: string, locale: Locale): string {
  if (locale === 'br') return ptToBr(text);
  if (isEnglish(locale)) return technologyEn(text);
  return text;
}

/**
 * Página de uma tecnologia num idioma. en-GB é a página americana com a ortografia
 * britânica (ver src/lib/i18n/british.ts).
 */
export function buildTechPage(stack: TechStack, locale: Locale): TechPageView {
  if (locale === 'en-gb') {
    return britishDeep(buildTechPageIn(stack, 'en-gb'));
  }
  return buildTechPageIn(stack, locale);
}

function buildTechPageIn(stack: TechStack, locale: Locale): TechPageView {
  const c = stack.category;
  const name = stack.short ?? stack.name;
  const a = article(name);
  const vars = { name, role: '', a, A: a === 'an' ? 'An' : 'A' };
  vars.role = pick(stack.role ?? ROLE_NOUN[c], locale, vars);
  const p = (t: Text) => pick(t, locale, vars);

  const keyword = p({
    pt: stack.keyword?.pt ?? KEYWORD[c],
    en: stack.keyword?.en ?? technologyEn(KEYWORD[c]),
  });
  const pitch = p(stack.pitch);

  const title = programmaticTitle(keyword, locale);
  const withTail = `${pitch} ${p(DESC_TAIL)}`;
  const description = withTail.length <= SEO_DESC_MAX ? withTail : pitch;

  const labels = LAYERS[c];
  return {
    id: stack.id,
    name: stack.name,
    category: c,
    categoryLabel: p(CATEGORY_LABEL[c]),
    logo: stack.logo,
    monogram: monogram(stack.name),
    keyword,
    pitch,
    version: stack.version,
    seo: { title, description },
    layers: stack.layers.map((chips, i) => ({
      label: p(labels[i]!),
      chips: chips.map((x) => chip(x, locale)),
    })),
    services: SERVICES[c].map((s) => {
      const o = stack.serviceOverrides[s.id];
      return {
        id: s.id,
        title: p(o?.title ?? s.title),
        pain: p(o?.pain ?? s.pain),
        text: p(o?.text ?? s.text),
        tags: (stack.serviceTags[s.id] ?? []).map((x) => chip(x, locale)),
      };
    }),
    models: MODELS.map((m) => ({
      id: m.id,
      title: p(m.title),
      text: p(m.text),
      yw: p(m.yw),
      cl: p(m.cl),
      cta: p(m.cta),
    })),
    profiles: PROFILES[c].map((pr, i) => ({
      role: p(pr.role),
      bio: p(pr.bio),
      years: pr.years,
      city: pr.city,
      market: pr.market,
      model: pr.model,
      // A stack primeiro; cada perfil roda as competências para não repetir o mesmo cartão.
      skills: [stack.skills[0]!, ...rotate(stack.skills.slice(1), i)].slice(0, 4),
    })),
    tools: stack.tools.map(([group, items]) => ({
      name: TOOL_GROUP[group] ? p(TOOL_GROUP[group]) : group,
      items,
    })),
    steps: STEPS.map((s) => ({ title: p(s.t), text: p(s.x) })),
    faq: [
      ...stack.faq.map((f) => ({ q: p(f.q), a: p(f.a) })),
      ...FAQ_CATEGORY[c].map((f) => ({ q: p(f.q), a: p(f.a) })),
      ...FAQ_COMMON.map((f) => ({ q: p(f.q), a: p(f.a) })),
    ],
    relatedStackIds: stack.related,
    relatedServiceIds: RELATED_SERVICES[c],
    caseIds: stack.caseIds,
  };
}

/** "Apache Kafka" → "AK", "dbt" → "DB". */
export function monogram(name: string): string {
  const words = name
    .replace(/[^\p{L}\p{N} ]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean);
  const m = words.length > 1 ? words[0]![0]! + words[1]![0]! : (words[0] ?? '?').slice(0, 2);
  return m.toUpperCase();
}

function rotate<T>(arr: T[], n: number): T[] {
  if (arr.length === 0) return arr;
  const k = n % arr.length;
  return [...arr.slice(k), ...arr.slice(0, k)];
}

/** Problemas de qualidade de uma página gerada (usado em testes e no content:check). */
export function auditTechPage(view: TechPageView): string[] {
  const issues: string[] = [];
  const all = JSON.stringify(view);
  const unresolved = all.match(/\{[a-z]+\}/g);
  if (unresolved) issues.push(`texto por resolver: ${[...new Set(unresolved)].join(', ')}`);
  if (/\[[^\]]*confirmar[^\]]*\]/i.test(all)) issues.push('placeholder [a confirmar]');
  if (view.seo.title.length > SEO_TITLE_MAX)
    issues.push(`título SEO com ${view.seo.title.length} caracteres`);
  const d = view.seo.description.length;
  if (d < SEO_DESC_MIN || d > SEO_DESC_MAX) issues.push(`descrição SEO com ${d} caracteres`);
  if (/\bsquads?\b/i.test(all)) issues.push('termo proibido: squad');
  if (view.services.some((s) => s.tags.length === 0))
    issues.push(
      `serviços sem etiquetas: ${view.services
        .filter((s) => s.tags.length === 0)
        .map((s) => s.id)
        .join(', ')}`,
    );
  return issues;
}
