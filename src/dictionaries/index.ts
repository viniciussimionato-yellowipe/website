import type { Locale } from '@/lib/i18n/locales';
import br from './br';
import en from './en';
import pt from './pt';
import type { Dictionary } from './pt';

const dictionaries: Record<Locale, Dictionary> = { pt, br, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
