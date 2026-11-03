import { absoluteUrl } from '@/config/site';
import type { Locale } from '@/lib/i18n/locales';
import { defaultLocale, localeConfig } from '@/lib/i18n/locales';
import type { Route } from '@/lib/routing';
import { alternatesFor, pathFor } from '@/lib/routing';

/**
 * hreflang recíproco: cada página lista todas as versões que existem, incluindo ela
 * própria, e x-default aponta para a versão pt-PT (ou a primeira que exista).
 */
export function hreflangMap(route: Route): Record<string, string> {
  const alts = alternatesFor(route);
  const out: Record<string, string> = {};
  for (const [locale, path] of Object.entries(alts) as [Locale, string][]) {
    out[localeConfig[locale].hreflang] = absoluteUrl(path);
  }
  const fallback = alts[defaultLocale] ?? Object.values(alts)[0];
  if (fallback) out['x-default'] = absoluteUrl(fallback);
  return out;
}

export function canonicalUrl(locale: Locale, route: Route): string {
  const path = pathFor(locale, route);
  if (!path) throw new Error(`Rota sem caminho em ${locale}: ${JSON.stringify(route)}`);
  return absoluteUrl(path);
}
