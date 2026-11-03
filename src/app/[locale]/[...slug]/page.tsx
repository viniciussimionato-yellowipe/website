import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findCase, findService, findStack, getContent } from '@/content';
import { buildServicePage } from '@/content/services/build';
import { buildTechPage } from '@/content/technologies/build';
import { getDictionary } from '@/dictionaries';
import type { Dictionary } from '@/dictionaries';
import type { Locale } from '@/lib/i18n/locales';
import { isLocale, locales } from '@/lib/i18n/locales';
import type { Route } from '@/lib/routing';
import { allRoutes, pathFor, resolvePath } from '@/lib/routing';
import { buildMetadata } from '@/lib/seo/metadata';
import { getJobs } from '@/lib/jobs';
import {
  CasePage,
  CareersPage,
  JobsPage,
  CasesHubPage,
  ContactPage,
  ModelPage,
  ServicePage,
  ServicesHubPage,
  SimplePage,
  TechnologiesHubPage,
  TechnologyPage,
} from '@/components/templates/pages';
import { PageTransition } from '@/components/layout/PageTransition';

/**
 * Todas as páginas com slug traduzido passam por aqui. A rota resolve-se em
 * lib/routing.ts; páginas que não existem num idioma dão 404 (dynamicParams = false).
 */
type Props = { params: Promise<{ locale: string; slug: string[] }> };

export const dynamicParams = false;
/** As vagas (Carreiras) mudam: as páginas regeneram de hora a hora (lib/jobs JOBS_REVALIDATE). */
export const revalidate = 3600;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    allRoutes(locale)
      .filter((r) => r.kind !== 'home')
      .map((r) => ({ locale, slug: pathFor(locale, r)!.split('/').filter(Boolean).slice(1) })),
  );
}

async function resolve(
  props: Props,
): Promise<{ locale: Locale; route: Route; dict: Dictionary } | null> {
  const { locale, slug } = await props.params;
  if (!isLocale(locale)) return null;
  const route = resolvePath(locale, slug);
  return route ? { locale, route, dict: getDictionary(locale) } : null;
}

function seoFor(
  locale: Locale,
  route: Route,
  dict: Dictionary,
): { title: string; description: string; image?: string; noindex?: boolean } {
  const pickL = (v: { pt: string; br?: string; en?: string }) => v[locale] ?? v.pt;
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
      return {
        title: `${dict.templates.allServicesTitle} | Yellowipe`,
        description: dict.templates.allServicesLead,
      };
    case 'technologiesHub':
      return {
        title: `${dict.templates.technologiesTitle} | Yellowipe`,
        description: dict.templates.technologiesLead,
      };
    case 'technology':
      return buildTechPage(findStack(route.id)!, locale).seo;
    case 'careers':
      return { title: dict.careers.metaTitle, description: dict.careers.metaDescription };
    case 'jobs':
      return { title: dict.jobs.metaTitle, description: dict.jobs.metaDescription };
    case 'casesHub':
      return {
        title: `${dict.templates.casesTitle} | Yellowipe`,
        description: dict.templates.casesLead,
      };
    case 'contact':
      return {
        title: `${dict.templates.contactTitle} | Yellowipe`,
        description: dict.contact.lead,
      };
    case 'privacy':
      return {
        title: `${dict.templates.privacyTitle} | Yellowipe`,
        description: dict.templates.privacyTitle,
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

export async function generateMetadata(props: Props): Promise<Metadata> {
  const r = await resolve(props);
  if (!r) return {};
  const seo = seoFor(r.locale, r.route, r.dict);
  // Vagas de exemplo nunca são indexadas (lib/jobs).
  if (r.route.kind === 'jobs' && (await getJobs()).source === 'sample') seo.noindex = true;
  return buildMetadata({ locale: r.locale, route: r.route, ...seo });
}

export default async function SlugPage(props: Props) {
  const r = await resolve(props);
  if (!r) notFound();
  return <PageTransition route={r.route}>{renderRoute(r.locale, r.route, r.dict)}</PageTransition>;
}

function renderRoute(locale: Locale, route: Route, dict: Dictionary) {
  const base = { locale, dict };

  switch (route.kind) {
    case 'model':
      return <ModelPage {...base} model={getContent().models.find((m) => m.id === route.id)!} />;
    case 'service':
      return <ServicePage {...base} view={buildServicePage(findService(route.id)!, locale)} />;
    case 'servicesHub':
      return <ServicesHubPage {...base} />;
    case 'technologiesHub':
      return <TechnologiesHubPage {...base} />;
    case 'technology':
      return <TechnologyPage {...base} view={buildTechPage(findStack(route.id)!, locale)} />;
    case 'careers':
      return <CareersPage {...base} />;
    case 'jobs':
      return <JobsPage {...base} />;
    case 'casesHub':
      return <CasesHubPage {...base} />;
    case 'case':
      return <CasePage {...base} item={findCase(route.id)!} />;
    case 'contact':
      return <ContactPage {...base} />;
    case 'privacy':
      return (
        <SimplePage
          {...base}
          title={dict.templates.privacyTitle}
          text="[Texto da política de privacidade a fornecer pelo jurídico: RGPD (PT) e LGPD (BR).]"
          href={pathFor(locale, route)!}
        />
      );
    case 'thanks':
      return (
        <SimplePage
          {...base}
          title={dict.templates.thanksTitle}
          text={dict.templates.thanksText}
          href={pathFor(locale, route)!}
        />
      );
    default:
      notFound();
  }
}
