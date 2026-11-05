'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { track } from '@/lib/analytics/events';
import type { Locale } from '@/lib/i18n/locales';
import { localeConfig, locales } from '@/lib/i18n/locales';
import { ChevronDown } from '@/components/ui/icons';

/**
 * Seletor de idioma (proposta "C sem globo", canvas "Seletor de idioma com bandeiras").
 * No header só a bandeira do idioma atual; o menu agrupa as versões por língua:
 * Português (Portugal, Brasil) e English (United States, United Kingdom).
 * Leva para a mesma página no outro idioma quando ela existe; senão, para a home.
 * Nomes de língua e país sempre no próprio idioma (convenção dos seletores de idioma).
 */
type Alternates = Record<string, Partial<Record<Locale, string>>>;
type Props = { locale: Locale; label: string; alternatesIndex: Alternates };

/** Línguas e as suas variantes, pela ordem do menu. */
const GROUPS: { language: string; items: Locale[] }[] = (() => {
  const out: { language: string; items: Locale[] }[] = [];
  for (const l of locales) {
    const language = localeConfig[l].language;
    const g = out.find((x) => x.language === language);
    if (g) g.items.push(l);
    else out.push({ language, items: [l] });
  }
  return out;
})();

function useAlternates(alternatesIndex: Alternates) {
  const pathname = usePathname();
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const alternates = alternatesIndex[normalized] ?? {};
  return (l: Locale) => alternates[l] ?? `/${l}/`;
}

export function Flag({ locale, size = 20 }: { locale: Locale; size?: number }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block shrink-0 overflow-hidden rounded-full shadow-[0_0_0_1px_rgb(6_25_58/0.14)]"
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- SVG de 1 KB: sem otimização. */}
      <img
        src={`/images/flags/${localeConfig[locale].flag}.svg`}
        alt=""
        width={size}
        height={size}
        className="block size-full object-cover"
      />
    </span>
  );
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12.5l4.5 4.5L19 7.5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const name = (l: Locale) => `${localeConfig[l].language} (${localeConfig[l].region})`;

export function LanguageSwitcher({ locale, label, alternatesIndex }: Props) {
  const hrefFor = useAlternates(alternatesIndex);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Mudou de página: o menu fecha.
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={root} className="relative hidden min-[961px]:block">
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${label}: ${name(locale)}`}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-[10px] border border-white/18 bg-white/[0.04] px-2.5 text-white transition-colors hover:border-white/40"
      >
        <Flag locale={locale} />
        <ChevronDown
          className={`size-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <nav
          id={menuId}
          aria-label={label}
          className="lang-menu absolute top-[calc(100%+10px)] right-0 z-50 w-[248px] rounded-[14px] bg-white p-1.5 text-ink shadow-[0_24px_50px_-14px_rgb(0_0_0/0.55)]"
        >
          {GROUPS.map((g) => (
            <div key={g.language} lang={localeConfig[g.items[0]!].hreflang}>
              <p className="m-0 px-3 pt-2.5 pb-1 font-mono text-[10.5px] tracking-[0.1em] text-muted uppercase">
                {g.language}
              </p>
              <ul className="m-0 list-none p-0">
                {g.items.map((l) => {
                  const current = l === locale;
                  return (
                    <li key={l}>
                      <Link
                        href={hrefFor(l)}
                        // Mudar de idioma é raro: sem pré-carregar páginas noutros idiomas.
                        prefetch={false}
                        hrefLang={localeConfig[l].hreflang}
                        lang={localeConfig[l].hreflang}
                        aria-current={current ? 'true' : undefined}
                        onClick={() => {
                          if (!current) track('language_switch', { de: locale, para: l });
                          setOpen(false);
                        }}
                        className={`flex min-h-11 items-center gap-3 rounded-[9px] px-3 py-2 text-[14px] font-semibold text-ink no-underline hover:bg-surface hover:text-ink ${
                          current ? 'bg-surface' : ''
                        }`}
                      >
                        <Flag locale={l} />
                        <span className="flex-1">{localeConfig[l].region}</span>
                        {current && (
                          <span className="text-gold">
                            <Check />
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      )}
    </div>
  );
}

/** Versão do menu mobile: grelha 2×2 com bandeira, país e língua. */
export function LanguageGrid({ locale, label, alternatesIndex }: Props) {
  const hrefFor = useAlternates(alternatesIndex);
  return (
    <nav aria-label={label} className="mt-8">
      <p className="m-0 mb-3 font-mono text-[11px] tracking-[0.1em] text-on-navy-2 uppercase">
        {label}
      </p>
      <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0">
        {locales.map((l) => {
          const current = l === locale;
          return (
            <li key={l}>
              <Link
                href={hrefFor(l)}
                prefetch={false}
                hrefLang={localeConfig[l].hreflang}
                lang={localeConfig[l].hreflang}
                aria-current={current ? 'true' : undefined}
                onClick={() => !current && track('language_switch', { de: locale, para: l })}
                className={`flex min-h-14 items-center gap-2.5 rounded-xl border px-3 py-2.5 text-white no-underline hover:text-white ${
                  current
                    ? 'border-yellow bg-yellow/[0.08]'
                    : 'border-white/12 hover:border-white/30'
                }`}
              >
                <Flag locale={l} />
                <span className="flex min-w-0 flex-col leading-tight">
                  <span className="truncate text-[14px] font-semibold">
                    {localeConfig[l].region}
                  </span>
                  <span className="text-[12px] text-on-navy-2">{localeConfig[l].language}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
