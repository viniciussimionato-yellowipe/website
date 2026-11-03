import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { detectLocale, isLocale } from '@/lib/i18n/locales';

/**
 * Proxy (ex-middleware no Next.js 16): quem chega sem idioma no URL é
 * redirecionado para /pt/, /br/ ou /en/ conforme o país e o browser.
 * Redirecionamento 307 (temporário): a escolha depende do visitante.
 * Os motores de pesquisa descobrem as três versões pelo hreflang e pelo sitemap
 * (x-default aponta para /pt/), por isso o redirecionamento da raiz não afeta a indexação.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split('/')[1];
  if (isLocale(first)) return NextResponse.next();

  const locale = detectLocale(
    request.headers.get('accept-language'),
    request.headers.get('x-vercel-ip-country') ?? request.headers.get('cf-ipcountry'),
  );
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '/' : pathname}`;
  return NextResponse.redirect(url, 307);
}

export const config = {
  // Ignora caminhos que já têm idioma (quase todo o tráfego: sem salto extra antes da
  // cache), API, ficheiros do Next, ficheiros estáticos e ficheiros de SEO.
  matcher: [
    '/((?!(?:pt|br|en)(?:/|$)|api|_next|images|favicon.ico|robots.txt|sitemap.xml|llms.txt|.*\\..*).*)',
  ],
};
