import { buildLlmsTxt } from '@/lib/seo/llms';

/** /llms.txt gerado a partir do conteúdo (R-20). Estático no build. */
export const dynamic = 'force-static';

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
