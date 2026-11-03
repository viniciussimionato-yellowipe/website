import type { Metadata } from 'next';
import { isProduction, site } from '@/config/site';
import type { Locale } from '@/lib/i18n/locales';
import { localeConfig } from '@/lib/i18n/locales';
import type { Route } from '@/lib/routing';
import { isNoindexRoute } from '@/lib/routing';
import { canonicalUrl, hreflangMap } from './alternates';

/**
 * Metadados de qualquer página. Garante: canónico próprio, hreflang recíproco,
 * Open Graph por idioma e noindex fora de produção ou em páginas marcadas.
 * Limites validados pelo content:check: título ≤ 60, descrição 70–160 caracteres.
 */
export function buildMetadata(args: {
  locale: Locale;
  route: Route;
  title: string;
  description: string;
  image?: string;
  noindex?: boolean;
}): Metadata {
  const { locale, route, title, description } = args;
  const url = canonicalUrl(locale, route);
  const noindex = !isProduction || args.noindex || isNoindexRoute(route);
  const image = args.image ?? '/images/og-default.png';

  return {
    title,
    description,
    alternates: { canonical: url, languages: hreflangMap(route) },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: site.name,
      locale: localeConfig[locale].ogLocale,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}
