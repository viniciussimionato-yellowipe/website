import type { Locale } from '@/lib/i18n/locales';

const TITLE_MAX = 60;
const BRAND = ' | Yellowipe';

/**
 * Mercado no título das páginas programáticas (serviços e tecnologias): responde a
 * pesquisas com país ("outsourcing de TI em Portugal"), dá mais cliques no mercado
 * certo e evita títulos iguais entre /pt/ e /br/. Em inglês não há mercado único.
 */
const MARKET: Partial<Record<Locale, string>> = { pt: ' em Portugal', br: ' no Brasil' };

/** "<keyword> em Portugal | Yellowipe", encurtado até caber em 60 caracteres. */
export function programmaticTitle(keyword: string, locale: Locale): string {
  const candidates = [`${keyword}${MARKET[locale] ?? ''}${BRAND}`, `${keyword}${BRAND}`];
  return candidates.find((t) => t.length <= TITLE_MAX) ?? keyword.slice(0, TITLE_MAX);
}
