import { absoluteUrl, site } from '@/config/site';
import type { FaqItem } from '@/content/schema';
import type { Locale } from '@/lib/i18n/locales';
import { localeConfig } from '@/lib/i18n/locales';

/**
 * Dados estruturados (schema.org) em JSON-LD. Regras:
 * - os factos vêm de config/site.ts, nunca escritos à mão aqui;
 * - só marcar o que está visível na página;
 * - FAQPage é permitido, mas o Google já não mostra resultados ricos de FAQ para este tipo de site.
 */
type JsonLd = Record<string, unknown>;

const ORG_ID = () => absoluteUrl('/#organization');

export function organizationLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID(),
    name: site.name,
    url: absoluteUrl('/'),
    logo: absoluteUrl(site.logo),
    sameAs: [site.social.linkedin],
    areaServed: ['PT', 'BR', 'US'],
    ...(site.foundingYear ? { foundingDate: String(site.foundingYear) } : {}),
  };
}

export function websiteLd(locale: Locale): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': absoluteUrl(`/${locale}/#website`),
    url: absoluteUrl(`/${locale}/`),
    name: site.name,
    inLanguage: localeConfig[locale].hreflang,
    publisher: { '@id': ORG_ID() },
  };
}

export function breadcrumbLd(items: { name: string; url: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function serviceLd(args: {
  name: string;
  description: string;
  url: string;
  locale: Locale;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: args.name,
    description: args.description,
    url: args.url,
    inLanguage: localeConfig[args.locale].hreflang,
    provider: { '@id': ORG_ID() },
    areaServed: ['PT', 'BR', 'US'],
  };
}

export function faqLd(items: { q: string; a: string }[]): JsonLd | null {
  const qa = items.filter((f) => f.q && f.a);
  if (qa.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qa.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** Pares pergunta/resposta de conteúdo localizado, só os que existem no idioma. */
export function localizeFaq(items: FaqItem[], locale: Locale): { q: string; a: string }[] {
  return items
    .map((f) => ({ q: f.q[locale], a: f.a[locale] }))
    .filter((f): f is { q: string; a: string } => Boolean(f.q && f.a));
}

/** Serializa para <script type="application/ld+json"> sem permitir fechar a tag. */
export function serializeJsonLd(data: JsonLd | JsonLd[]): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
