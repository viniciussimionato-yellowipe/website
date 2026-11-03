import { z } from 'zod';
import type { Locale } from '@/lib/i18n/locales';
import { Area, CaseStudy, Market, Model, Service, TechStack, Technology } from './schema';
import type {
  Area as AreaT,
  CaseStudy as CaseT,
  Market as MarketT,
  Model as ModelT,
  Service as ServiceT,
  TechStack as TechStackT,
  Technology as TechnologyT,
} from './schema';
import { areas } from './local/areas';
import { cases } from './local/cases';
import {
  clientLogos,
  markets,
  modelStackLogos,
  responsibilities,
  technologies,
  technologyGroups,
} from './local/catalog';
import { models } from './local/models';
import { services } from './local/services';
import { stacks } from './technologies/stacks';

/**
 * Camada de conteúdo. Os componentes só importam daqui, nunca de ./local.
 * Trocar para o CMS = escrever um adaptador que devolve o mesmo `Content`
 * (ver docs/adr/0003-camada-de-conteudo.md). Tudo é validado ao carregar:
 * conteúdo inválido parte o build em vez de chegar ao site.
 */
export type Content = {
  models: ModelT[];
  areas: AreaT[];
  services: ServiceT[];
  cases: CaseT[];
  markets: MarketT[];
  technologies: { rowA: TechnologyT[]; rowB: TechnologyT[] };
  clientLogos: typeof clientLogos;
  technologyGroups: typeof technologyGroups;
  modelStackLogos: typeof modelStackLogos;
  responsibilities: typeof responsibilities;
  stacks: TechStackT[];
};

let cache: Content | undefined;

export function getContent(): Content {
  if (cache) return cache;
  cache = {
    models: z.array(Model).parse(models),
    areas: z.array(Area).parse(areas),
    services: z.array(Service).parse(services),
    cases: z.array(CaseStudy).parse(cases),
    markets: z.array(Market).parse(markets),
    technologies: {
      rowA: z.array(Technology).parse(technologies.rowA),
      rowB: z.array(Technology).parse(technologies.rowB),
    },
    clientLogos,
    technologyGroups,
    modelStackLogos,
    responsibilities,
    stacks: z.array(TechStack).parse(stacks),
  };
  assertStackLinks(cache);
  return cache;
}

type WithSlug = {
  slug: Partial<Record<Locale, string>>;
  seo: { title: Partial<Record<Locale, string>> };
};

/** Uma entrada existe num idioma quando tem slug e título SEO nesse idioma. */
export function isAvailable(entry: WithSlug, locale: Locale): boolean {
  return Boolean(entry.slug[locale] && entry.seo.title[locale]);
}

export function publishedModels(locale: Locale): ModelT[] {
  return getContent().models.filter((m) => m.status === 'published' && isAvailable(m, locale));
}

export function publishedServices(locale: Locale): ServiceT[] {
  return getContent().services.filter(
    (s) => s.status === 'published' && s.page !== undefined && isAvailable(s, locale),
  );
}

export function publishedCases(locale: Locale): CaseT[] {
  return getContent().cases.filter((c) => c.status === 'published' && isAvailable(c, locale));
}

export function findService(id: string): ServiceT | undefined {
  return getContent().services.find((s) => s.id === id);
}

export function findCase(id: string): CaseT | undefined {
  return getContent().cases.find((c) => c.id === id);
}

export function findArea(id: string): AreaT | undefined {
  return getContent().areas.find((a) => a.id === id);
}

export function findStack(id: string): TechStackT | undefined {
  return getContent().stacks.find((s) => s.id === id);
}

/** Ligações entre stacks e grupos do menu têm de apontar para stacks que existem. */
function assertStackLinks(c: Content): void {
  const ids = new Set(c.stacks.map((s) => s.id));
  const slugs = new Set<string>();
  for (const s of c.stacks) {
    if (slugs.has(s.slug)) throw new Error(`stack com slug repetido: ${s.slug}`);
    slugs.add(s.slug);
    for (const r of s.related)
      if (!ids.has(r)) throw new Error(`${s.id}: related "${r}" não existe`);
  }
  for (const g of c.technologyGroups)
    for (const id of g.stackIds)
      if (!ids.has(id)) throw new Error(`menu ${g.id}: stack "${id}" não existe`);
}
