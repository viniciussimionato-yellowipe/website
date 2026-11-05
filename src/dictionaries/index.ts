import type { Locale } from '@/lib/i18n/locales';
import br from './br';
import en from './en';
import enGb from './en-gb';
import pt from './pt';
import type { Dictionary } from './pt';

const dictionaries: Record<Locale, Dictionary> = { pt, br, en, 'en-gb': enGb };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
