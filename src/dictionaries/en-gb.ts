import { britishDeep } from '@/lib/i18n/british';
import en from './en';
import type { Dictionary } from './pt';

/**
 * Inglês britânico: o dicionário americano com a ortografia convertida
 * (src/lib/i18n/british.ts). Só se escreve aqui o que não é ortografia:
 * vocabulário ou formatos que mudam do outro lado do Atlântico.
 */
const overrides: DeepPartial<Dictionary> = {};

type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };

function merge<T>(base: T, patch: DeepPartial<T>): T {
  if (Array.isArray(base) || typeof base !== 'object' || base === null) return base;
  const out = { ...base } as Record<string, unknown>;
  for (const [k, v] of Object.entries(patch as Record<string, unknown>)) {
    const current = out[k];
    out[k] =
      v && typeof v === 'object' && !Array.isArray(v) && current && typeof current === 'object'
        ? merge(current, v as DeepPartial<typeof current>)
        : v;
  }
  return out as T;
}

const enGb: Dictionary = merge(britishDeep(en), overrides);

export default enGb;
