/**
 * Idiomas do site. O segmento do URL (`pt`, `br`, `en`) é o que o visitante vê;
 * o código BCP 47 é o que vai para `lang`, `hreflang` e Open Graph.
 * Regra: pt-PT e pt-BR são páginas diferentes, com termos e casos de cada mercado.
 */
export const locales = ['pt', 'br', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'pt';

export const localeConfig: Record<
  Locale,
  { hreflang: string; ogLocale: string; label: string; market: 'PT' | 'BR' | 'US' }
> = {
  pt: { hreflang: 'pt-PT', ogLocale: 'pt_PT', label: 'PT', market: 'PT' },
  br: { hreflang: 'pt-BR', ogLocale: 'pt_BR', label: 'BR', market: 'BR' },
  en: { hreflang: 'en', ogLocale: 'en_US', label: 'EN', market: 'US' },
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** Texto ou valor com versão por idioma. Um idioma em falta = a página não existe nesse idioma. */
export type Localized<T> = { pt: T; br?: T; en?: T };

export function pick<T>(value: Localized<T>, locale: Locale): T | undefined {
  return value[locale];
}

/**
 * Escolhe o idioma a partir do país (cabeçalho do CDN) e do Accept-Language.
 * Brasil → br; Portugal ou português sem região → pt; resto → en.
 */
export function detectLocale(acceptLanguage: string | null, country: string | null): Locale {
  const c = country?.toUpperCase();
  if (c === 'BR') return 'br';
  if (c === 'PT') return 'pt';

  const langs = (acceptLanguage ?? '')
    .split(',')
    .map((part) => {
      const [tag = '', q] = part.trim().split(';q=');
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
    })
    .filter((l) => l.tag)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of langs) {
    if (tag.startsWith('pt-br')) return 'br';
    if (tag.startsWith('pt')) return 'pt';
    if (tag.startsWith('en')) return 'en';
  }
  return c ? 'en' : defaultLocale;
}
