import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans, Montserrat } from 'next/font/google';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { site } from '@/config/site';
import { getDictionary } from '@/dictionaries';
import { isLocale, localeConfig, locales } from '@/lib/i18n/locales';
import type { Locale } from '@/lib/i18n/locales';
import { allRoutes, alternatesFor, pathFor } from '@/lib/routing';
import { organizationLd, websiteLd } from '@/lib/seo/jsonld';
import { ConsentManager } from '@/components/analytics/ConsentManager';
import { RouteAnalytics } from '@/components/analytics/RouteAnalytics';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { JsonLd } from '@/components/seo/JsonLd';
import '../globals.css';

/* Fontes alojadas pelo próprio site (next/font): sem pedidos ao Google no browser. */
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});
const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-plex-sans',
});
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-plex-mono',
  preload: false,
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  // Ícone da marca (só a árvore), do Drive de assets: ICON POSITIVO.svg
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#06193A',
  width: 'device-width',
  initialScale: 1,
};

/** Índice caminho → versões noutros idiomas, para o seletor de idioma. */
function buildAlternatesIndex(locale: Locale) {
  const index: Record<string, Partial<Record<Locale, string>>> = {};
  for (const route of allRoutes(locale)) {
    const path = pathFor(locale, route);
    if (path) index[path] = alternatesFor(route);
  }
  return index;
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html
      lang={localeConfig[locale].hreflang}
      // Scroll suave só nas âncoras: ao mudar de página o Next volta ao topo sem animação.
      data-scroll-behavior="smooth"
      // Extensões do browser mexem nos atributos do <html> (ex.: style) antes da hidratação.
      // Só cobre os atributos deste elemento; diferenças no resto da árvore continuam a avisar.
      suppressHydrationWarning
      className={`${montserrat.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body>
        <a href="#conteudo" className="skip-link">
          {dict.common.skip}
        </a>
        <Header locale={locale} dict={dict} alternatesIndex={buildAlternatesIndex(locale)} />
        <main id="conteudo" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer locale={locale} dict={dict} />
        <ConsentManager
          texts={dict.consent}
          privacyHref={pathFor(locale, { kind: 'privacy' }) ?? undefined}
        />
        <RouteAnalytics locale={locale} />
        <JsonLd data={[organizationLd(), websiteLd(locale)]} />
      </body>
    </html>
  );
}
