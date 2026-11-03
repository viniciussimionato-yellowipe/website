'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { track } from '@/lib/analytics/events';
import type { Locale } from '@/lib/i18n/locales';
import { localeConfig, locales } from '@/lib/i18n/locales';

/**
 * Seletor PT · BR · EN. Leva para a mesma página no outro idioma quando ela existe;
 * se não existir, leva para a home desse idioma.
 */
type Props = {
  locale: Locale;
  label: string;
  alternatesIndex: Record<string, Partial<Record<Locale, string>>>;
};

export function LanguageSwitcher({ locale, label, alternatesIndex }: Props) {
  const pathname = usePathname();
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const alternates = alternatesIndex[normalized] ?? {};

  return (
    <nav aria-label={label} className="hidden gap-0.5 font-mono text-[12.5px] min-[961px]:flex">
      {locales.map((l) => {
        const href = alternates[l] ?? `/${l}/`;
        const current = l === locale;
        return (
          <Link
            key={l}
            href={href}
            hrefLang={localeConfig[l].hreflang}
            lang={localeConfig[l].hreflang}
            aria-current={current ? 'true' : undefined}
            onClick={() => !current && track('language_switch', { de: locale, para: l })}
            className={
              current
                ? 'rounded-md border border-white/40 px-[7px] py-1 text-white no-underline'
                : 'px-[7px] py-1 text-on-navy no-underline hover:text-white'
            }
          >
            {localeConfig[l].label}
          </Link>
        );
      })}
    </nav>
  );
}
