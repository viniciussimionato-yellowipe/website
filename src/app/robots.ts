import type { MetadataRoute } from 'next';
import { absoluteUrl, isProduction, site } from '@/config/site';

/**
 * Fora de produção: nada indexável. Em produção: tudo menos a API.
 * Rastreadores de IA: decisão em config/site.ts (allowAiCrawlers).
 */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-SearchBot',
  'PerplexityBot',
  'Google-Extended',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      ...(site.allowAiCrawlers ? [] : [{ userAgent: AI_CRAWLERS, disallow: '/' }]),
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: site.url,
  };
}
