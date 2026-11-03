import type { Locale } from '@/lib/i18n/locales';
import type { ModelId, Service } from '../schema';
import { ptToBr } from '../technologies/templates';
import {
  BR_QUESTION_VERBS,
  BR_SERVICES,
  FAQ_AREA,
  FAQ_COMMON,
  LAYERS,
  MODELS,
  PROFILES,
  ROLE,
  STEPS,
  STEPS_RECRUITMENT,
} from './templates';
import type { AreaId } from './templates';

/**
 * Máquina de conteúdo dos serviços (docs/15-servicos.md): o mesmo mecanismo das
 * páginas de tecnologia (content/technologies), moldado ao serviço. Factos do serviço
 * (./pages.ts) + textos da área (./templates.ts) → ServicePageView.
 */
export type ServicePageView = {
  id: string;
  name: string;
  areaId: AreaId;
  keyword: string;
  pitch: string;
  note: string;
  seo: { title: string; description: string };
  layers: { label: string; chips: string[] }[];
  offerings: { title: string; pain: string; text: string; tags: string[] }[];
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
  stackIds: string[];
  tools: { name: string; items: string[] }[];
  steps: { title: string; text: string }[];
  faq: { q: string; a: string }[];
  caseIds: string[];
  relatedServiceIds: string[];
};

const SEO_TITLE_MAX = 60;
const SEO_DESC_MIN = 70;
const SEO_DESC_MAX = 160;

const DESC_TAIL = 'Especialistas avaliados em Portugal e no Brasil.';

/** "Aplicações web" → "aplicações web"; "IoT", "UX e UI Design" e "DevOps…" ficam como estão. */
export function inSentence(name: string): string {
  const first = name.split(' ')[0] ?? '';
  return /[A-Z]/.test(first.slice(1)) ? name : name.charAt(0).toLowerCase() + name.slice(1);
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Só há páginas de serviço em pt e br; outro idioma recebe a versão pt. */
export function buildServicePage(service: Service, locale: Locale): ServicePageView {
  const facts = service.page;
  if (!facts) throw new Error(`serviço sem página: ${service.id}`);
  const area = service.areaId as AreaId;
  const br = locale === 'br';
  const name = (br ? service.name.br : undefined) ?? service.name.pt;
  const vars: Record<string, string> = {
    name: inSentence(name),
    role: ROLE[area],
  };
  // Texto de modelo: resolve {name}/{role} e adapta a pt-BR.
  const p = (t: string) => {
    const filled = t.replace(/\{(\w+)\}/g, (m, k: string) => vars[k] ?? m);
    return br ? toBr(filled) : filled;
  };
  const q = (t: string) => {
    const out = p(t);
    const verb = out.split(' ')[0] ?? '';
    return br && BR_QUESTION_VERBS.includes(verb)
      ? `Vocês ${out.charAt(0).toLowerCase()}${out.slice(1)}`
      : out;
  };

  const keyword = cap((br ? service.keyword.br : undefined) ?? service.keyword.pt);
  const pitch = p(facts.pitch);
  let title = `${keyword} | Yellowipe`;
  if (title.length > SEO_TITLE_MAX) title = keyword.slice(0, SEO_TITLE_MAX);
  const withTail = `${pitch} ${p(DESC_TAIL)}`;
  const description = withTail.length <= SEO_DESC_MAX ? withTail : pitch;

  const steps = area === 'recrutamento' ? STEPS_RECRUITMENT : STEPS;
  return {
    id: service.id,
    name,
    areaId: area,
    keyword,
    pitch,
    note: facts.note,
    seo: { title, description },
    layers: LAYERS[area].map((label, i) => ({ label: p(label), chips: facts.layers[i]!.map(p) })),
    offerings: facts.offerings.map((o) => ({
      title: p(o.title),
      pain: p(o.pain),
      text: p(o.text),
      tags: o.tags.map(p),
    })),
    models: MODELS.filter((m) => service.models.includes(m.id)).map((m) => ({
      id: m.id,
      title: p(m.title),
      text: p(m.text),
      yw: p(m.yw),
      cl: p(m.cl),
      cta: p(m.cta),
    })),
    profiles: PROFILES[area].map((pr, i) => ({
      role: p(pr.role),
      bio: p(pr.bio),
      years: pr.years,
      city: pr.city,
      market: pr.market,
      model: service.models.includes(pr.model) ? pr.model : service.models[0]!,
      // Cada perfil roda as competências para não repetir o mesmo cartão.
      skills: rotate(facts.skills, i).slice(0, 4).map(p),
    })),
    stackIds: facts.stackIds,
    tools: facts.tools.map(([group, items]) => ({ name: p(group), items: items.map(p) })),
    steps: steps.map((s) => ({ title: p(s.t), text: p(s.x) })),
    faq: [...facts.faq, ...FAQ_AREA[area], ...FAQ_COMMON].map((f) => ({
      q: q(f.q),
      a: p(f.a),
    })),
    caseIds: facts.caseIds,
    relatedServiceIds: facts.related,
  };
}

const BR_SERVICES_RE = BR_SERVICES.map(
  ([from, to]) => [new RegExp(`(?<!\\p{L})${from}(?!\\p{L})`, 'gu'), to] as const,
);

/** pt-PT → pt-BR: glossário dos serviços e depois o partilhado. */
function toBr(text: string): string {
  return ptToBr(BR_SERVICES_RE.reduce((s, [re, to]) => s.replace(re, to), text));
}

function rotate<T>(arr: T[], n: number): T[] {
  if (arr.length === 0) return arr;
  const k = n % arr.length;
  return [...arr.slice(k), ...arr.slice(0, k)];
}

/** Problemas de qualidade de uma página gerada (usado em testes e no content:check). */
export function auditServicePage(view: ServicePageView): string[] {
  const issues: string[] = [];
  const all = JSON.stringify(view);
  const unresolved = all.match(/\{[a-z]+\}/g);
  if (unresolved) issues.push(`texto por resolver: ${[...new Set(unresolved)].join(', ')}`);
  if (view.seo.title.length > SEO_TITLE_MAX)
    issues.push(`título SEO com ${view.seo.title.length} caracteres`);
  const d = view.seo.description.length;
  if (d < SEO_DESC_MIN || d > SEO_DESC_MAX) issues.push(`descrição SEO com ${d} caracteres`);
  if (/\bsquads?\b/i.test(all)) issues.push('termo proibido: squad');
  if (view.models.length === 0) issues.push('sem modelos');
  return issues;
}
