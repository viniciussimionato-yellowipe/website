import { getContent, isAvailable } from '@/content';
import type { Locale } from '@/lib/i18n/locales';
import { locales } from '@/lib/i18n/locales';

/**
 * Rotas com slugs traduzidos. Um único sítio decide o URL de cada página em cada
 * idioma; links, hreflang, sitemap e llms.txt usam todos `pathFor`.
 * Nunca escrever URLs à mão em componentes.
 */
export type Route =
  | { kind: 'home' }
  | { kind: 'model'; id: string }
  | { kind: 'servicesHub' }
  | { kind: 'service'; id: string }
  | { kind: 'technologiesHub' }
  | { kind: 'technology'; id: string }
  | { kind: 'casesHub' }
  | { kind: 'case'; id: string }
  | { kind: 'careers' }
  | { kind: 'jobs' }
  | { kind: 'contact' }
  | { kind: 'privacy' }
  | { kind: 'thanks' };

type StaticKind =
  | 'servicesHub'
  | 'technologiesHub'
  | 'casesHub'
  | 'careers'
  | 'jobs'
  | 'contact'
  | 'privacy'
  | 'thanks';

const staticSegments: Record<StaticKind, Partial<Record<Locale, string>>> = {
  servicesHub: { pt: 'servicos', br: 'servicos' },
  technologiesHub: { pt: 'tecnologias', br: 'tecnologias', en: 'technologies' },
  casesHub: { pt: 'casos', br: 'cases', en: 'case-studies' },
  careers: { pt: 'carreiras', br: 'carreiras', en: 'careers' },
  jobs: { pt: 'carreiras/vagas', br: 'carreiras/vagas', en: 'careers/jobs' },
  contact: { pt: 'contacto', br: 'contato', en: 'contact' },
  privacy: { pt: 'politica-de-privacidade', br: 'politica-de-privacidade', en: 'privacy-policy' },
  thanks: { pt: 'obrigado', br: 'obrigado', en: 'thank-you' },
};

const join = (locale: Locale, ...parts: string[]) => `/${[locale, ...parts].join('/')}/`;

export function pathFor(locale: Locale, route: Route): string | null {
  const { models, services, cases, stacks } = getContent();
  switch (route.kind) {
    case 'home':
      return `/${locale}/`;
    case 'model': {
      const m = models.find((x) => x.id === route.id);
      return m && m.status === 'published' && isAvailable(m, locale)
        ? join(locale, m.slug[locale]!)
        : null;
    }
    case 'service': {
      const s = services.find((x) => x.id === route.id);
      const hub = staticSegments.servicesHub[locale];
      return s && hub && s.status === 'published' && s.page && isAvailable(s, locale)
        ? join(locale, hub, s.slug[locale]!)
        : null;
    }
    case 'technology': {
      const t = stacks.find((x) => x.id === route.id);
      const hub = staticSegments.technologiesHub[locale];
      return t && hub && t.status === 'published' ? join(locale, hub, t.slug) : null;
    }
    case 'case': {
      const c = cases.find((x) => x.id === route.id);
      const hub = staticSegments.casesHub[locale];
      return c && hub && c.status === 'published' && isAvailable(c, locale)
        ? join(locale, hub, c.slug[locale]!)
        : null;
    }
    default: {
      const seg = staticSegments[route.kind][locale];
      return seg ? join(locale, seg) : null;
    }
  }
}

/** Caminho do segmento `[...slug]` para a rota correspondente, ou null (404). */
export function resolvePath(locale: Locale, segments: string[]): Route | null {
  const candidates = allRoutes(locale);
  const target = join(locale, ...segments);
  return candidates.find((r) => pathFor(locale, r) === target) ?? null;
}

/** Todas as rotas que existem num idioma (home incluída). */
export function allRoutes(locale: Locale): Route[] {
  const { models, services, cases, stacks } = getContent();
  const routes: Route[] = [
    { kind: 'home' },
    ...models.map((m) => ({ kind: 'model' as const, id: m.id })),
    { kind: 'servicesHub' },
    ...services.map((s) => ({ kind: 'service' as const, id: s.id })),
    { kind: 'technologiesHub' },
    ...stacks.map((t) => ({ kind: 'technology' as const, id: t.id })),
    { kind: 'casesHub' },
    ...cases.map((c) => ({ kind: 'case' as const, id: c.id })),
    { kind: 'careers' },
    { kind: 'jobs' },
    { kind: 'contact' },
    { kind: 'privacy' },
    { kind: 'thanks' },
  ];
  return routes.filter((r) => pathFor(locale, r) !== null);
}

/** Versões da mesma página noutros idiomas (para hreflang e para o seletor de idioma). */
export function alternatesFor(route: Route): Partial<Record<Locale, string>> {
  const out: Partial<Record<Locale, string>> = {};
  for (const l of locales) {
    const p = pathFor(l, route);
    if (p) out[l] = p;
  }
  return out;
}

/** Páginas que nunca devem ser indexadas. */
export function isNoindexRoute(route: Route): boolean {
  return route.kind === 'thanks';
}
