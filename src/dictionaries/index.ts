import { ui } from '@/i18n';
import type { Messages } from '@/i18n';
import { britishDeep } from '@/lib/i18n/british';
import type { Locale } from '@/lib/i18n/locales';

/**
 * Textos de interface por idioma. Vêm de src/i18n/<idioma>/ui.json (como alimentar:
 * src/i18n/README.md). O inglês britânico é o americano com a ortografia convertida,
 * mais as exceções de src/i18n/en-gb/ui.json.
 */
export type Dictionary = Messages;

function merge<T>(base: T, patch: unknown): T {
  if (!patch || typeof patch !== 'object' || Array.isArray(patch)) return base;
  const out = { ...(base as Record<string, unknown>) };
  for (const [k, v] of Object.entries(patch as Record<string, unknown>)) {
    const current = out[k];
    out[k] =
      v && typeof v === 'object' && !Array.isArray(v) && current && typeof current === 'object'
        ? merge(current, v)
        : v;
  }
  return out as T;
}

const dictionaries: Record<Locale, Dictionary> = {
  pt: ui.pt,
  br: ui.br,
  en: ui.en,
  'en-gb': merge(britishDeep(ui.en), ui['en-gb']),
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
