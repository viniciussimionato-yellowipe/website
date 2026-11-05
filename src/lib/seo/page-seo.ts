import { findCase, findService, findStack, getContent } from '@/content';
import { buildServicePage } from '@/content/services/build';
import { buildTechPage } from '@/content/technologies/build';
import type { Dictionary } from '@/dictionaries';
import type { Localized, Locale } from '@/lib/i18n/locales';
import { localize } from '@/lib/i18n/locales';
import type { Route } from '@/lib/routing';

export type PageSeo = { title: string; description: string; image?: string; noindex?: boolean };

/**
 * Título e descrição de cada rota. Fonte única para generateMetadata e para o
 * content:check, que valida todas as rotas dos três idiomas (título ≤ 60, descrição 70–160).
 */
export function seoFor(locale: Locale, route: Route, dict: Dictionary): PageSeo {
  const pickL = (v: Localized<string>) => localize(v, locale);
  switch (route.kind) {
    case 'model': {
      const m = getContent().models.find((x) => x.id === route.id)!;
      return {
        title: pickL(m.seo.title),
        description: pickL(m.seo.description),
        noindex: m.seo.noindex,
      };
    }
    case 'service': {
      const s = findService(route.id)!;
      return { ...buildServicePage(s, locale).seo, noindex: s.seo.noindex };
    }
    case 'case': {
      const c = findCase(route.id)!;
      return {
        title: pickL(c.seo.title),
        description: pickL(c.seo.description),
        image: c.image,
        noindex: c.seo.noindex,
      };
    }
    case 'servicesHub':
      return { title: dict.meta.servicesTitle, description: dict.meta.servicesDescription };
    case 'technologiesHub':
      return { title: dict.meta.technologiesTitle, description: dict.templates.technologiesLead };
    case 'technology':
      return buildTechPage(findStack(route.id)!, locale).seo;
    case 'careers':
      return { title: dict.careers.metaTitle, description: dict.careers.metaDescription };
    case 'jobs':
      return { title: dict.jobs.metaTitle, description: dict.jobs.metaDescription };
    case 'casesHub':
      return { title: dict.meta.casesTitle, description: dict.meta.casesDescription };
    case 'contact':
      return { title: dict.meta.contactTitle, description: dict.meta.contactDescription };
    case 'privacy':
      return {
        title: `${dict.templates.privacyTitle} | Yellowipe`,
        description: dict.meta.privacyDescription,
      };
    case 'thanks':
      return {
        title: `${dict.templates.thanksTitle} | Yellowipe`,
        description: dict.templates.thanksText,
        noindex: true,
      };
    default:
      return { title: dict.meta.homeTitle, description: dict.meta.homeDescription };
  }
}
