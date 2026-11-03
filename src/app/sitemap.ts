import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/config/site';
import { getJobs } from '@/lib/jobs';
import { locales } from '@/lib/i18n/locales';
import { allRoutes, isNoindexRoute, pathFor } from '@/lib/routing';
import { hreflangMap } from '@/lib/seo/alternates';

/**
 * Sitemap com todas as páginas indexáveis dos três idiomas e as alternativas hreflang.
 * lastModified: quando houver CMS, usar a data real de atualização de cada entrada.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  // Vagas de exemplo não entram (a página fica noindex até a API do ATS chegar).
  const sampleJobs = (await getJobs()).source === 'sample';
  for (const locale of locales) {
    for (const route of allRoutes(locale)) {
      if (isNoindexRoute(route) || (route.kind === 'jobs' && sampleJobs)) continue;
      const path = pathFor(locale, route);
      if (!path) continue;
      const languages = hreflangMap(route);
      entries.push({
        url: absoluteUrl(path),
        changeFrequency: route.kind === 'home' ? 'weekly' : 'monthly',
        priority:
          route.kind === 'home'
            ? 1
            : route.kind === 'model' || route.kind === 'service'
              ? 0.9
              : 0.6,
        alternates: { languages },
      });
    }
  }
  return entries;
}
