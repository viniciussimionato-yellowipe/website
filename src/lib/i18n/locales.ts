import { britishDeep } from './british';

/**
 * Idiomas do site. O segmento do URL (`pt`, `br`, `en`, `en-gb`) é o que o visitante vê;
 * o código BCP 47 é o que vai para `lang`, `hreflang` e Open Graph.
 *
 * Regras:
 * - pt-PT e pt-BR são páginas diferentes, com termos e casos de cada mercado.
 * - en (inglês americano) é a fonte do inglês. en-GB deriva dele (ortografia britânica,
 *   ver `british.ts`); só se escreve um texto en-GB à mão quando a diferença não é de
 *   ortografia. Assim, um texto novo em inglês chega às duas versões sem trabalho a dobrar.
 * - Ver docs/adr/0009-ingles-americano-e-britanico.md.
 */
export const locales = ['pt', 'br', 'en', 'en-gb'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'pt';

/** Língua do conteúdo: en-GB lê o conteúdo inglês e converte a ortografia. */
export type ContentLang = 'pt' | 'br' | 'en';

export const localeConfig: Record<
  Locale,
  {
    hreflang: string;
    ogLocale: string;
    /** Código curto, para leitores de ecrã e analítica. */
    label: string;
    /** Mercado comercial (contactos, país pré-escolhido no formulário). */
    market: 'PT' | 'BR' | 'US';
    /** Bandeira do seletor (public/images/flags). */
    flag: 'pt' | 'br' | 'us' | 'gb';
    /** Língua e região, sempre no próprio idioma (convenção dos seletores de idioma). */
    language: string;
    region: string;
    contentLang: ContentLang;
  }
> = {
  pt: {
    hreflang: 'pt-PT',
    ogLocale: 'pt_PT',
    label: 'PT',
    market: 'PT',
    flag: 'pt',
    language: 'Português',
    region: 'Portugal',
    contentLang: 'pt',
  },
  br: {
    hreflang: 'pt-BR',
    ogLocale: 'pt_BR',
    label: 'BR',
    market: 'BR',
    flag: 'br',
    language: 'Português',
    region: 'Brasil',
    contentLang: 'br',
  },
  en: {
    hreflang: 'en-US',
    ogLocale: 'en_US',
    label: 'US',
    market: 'US',
    flag: 'us',
    language: 'English',
    region: 'United States',
    contentLang: 'en',
  },
  // Sem mercado próprio no Reino Unido: contactos e entrega a partir de Portugal.
  'en-gb': {
    hreflang: 'en-GB',
    ogLocale: 'en_GB',
    label: 'UK',
    market: 'PT',
    flag: 'gb',
    language: 'English',
    region: 'United Kingdom',
    contentLang: 'en',
  },
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** Inglês americano ou britânico. */
export function isEnglish(locale: Locale): boolean {
  return localeConfig[locale].contentLang === 'en';
}

/**
 * Texto ou valor com versão por idioma. Um idioma em falta = a página não existe nesse idioma.
 * `en-gb` quase nunca se escreve: a camada de conteúdo preenche-o a partir de `en`.
 */
export type Localized<T> = { pt: T; br?: T; en?: T; 'en-gb'?: T };

export function pick<T>(value: Localized<T>, locale: Locale): T | undefined {
  return value[locale];
}

/**
 * Valor no idioma pedido, com recurso: en-GB → en (com ortografia britânica, para
 * textos que não passaram pela camada de conteúdo) → pt.
 */
export function localize<T>(value: Localized<T>, locale: Locale): T {
  const own = value[locale];
  if (own !== undefined) return own;
  if (locale === 'en-gb' && value.en !== undefined) return britishDeep(value.en);
  return value.pt;
}

/** Países onde se fala inglês britânico (ortografia e datas). */
const BRITISH_COUNTRIES = new Set(['GB', 'IE', 'AU', 'NZ', 'ZA', 'IN', 'SG', 'MT', 'CY']);

/**
 * Escolhe o idioma a partir do país (cabeçalho do CDN) e do Accept-Language.
 * Brasil → br; Portugal → pt; Reino Unido e Commonwealth → en-gb; resto → en.
 * O browser decide entre pt/en quando o país não é PT/BR (um português no Reino Unido
 * continua a ver /pt/); o país só decide a variante do inglês quando o browser não a diz.
 */
export function detectLocale(acceptLanguage: string | null, country: string | null): Locale {
  const c = country?.toUpperCase();
  if (c === 'BR') return 'br';
  if (c === 'PT') return 'pt';
  const britishCountry = !!c && BRITISH_COUNTRIES.has(c);

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
    if (tag === 'en-us') return 'en';
    if (tag.startsWith('en-')) {
      const region = tag.slice(3).toUpperCase();
      return BRITISH_COUNTRIES.has(region) ? 'en-gb' : 'en';
    }
    if (tag === 'en') return britishCountry ? 'en-gb' : 'en';
  }
  if (britishCountry) return 'en-gb';
  return c ? 'en' : defaultLocale;
}
