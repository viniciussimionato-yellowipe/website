/**
 * Consentimento (RGPD/LGPD). Solução provisória até à escolha da plataforma de
 * consentimento certificada pela Google (decisão aberta). Regras:
 * - recusar é tão fácil como aceitar;
 * - nada de GTM, pixels ou cookies de atribuição antes de aceitar;
 * - Consent Mode do Google: tudo "denied" até haver escolha.
 */
export const CONSENT_COOKIE = 'yw_consent';
export const FIRST_TOUCH_COOKIE = 'yw_ft';
export const CONSENT_VERSION = 1;

export type Consent = { v: number; analytics: boolean; ads: boolean; at: string };

export function parseConsent(raw: string | undefined | null): Consent | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(decodeURIComponent(raw)) as Partial<Consent>;
    if (
      value.v !== CONSENT_VERSION ||
      typeof value.analytics !== 'boolean' ||
      typeof value.ads !== 'boolean'
    ) {
      return null;
    }
    return { v: value.v, analytics: value.analytics, ads: value.ads, at: String(value.at ?? '') };
  } catch {
    return null;
  }
}

export function serializeConsent(c: Omit<Consent, 'v' | 'at'>): string {
  return encodeURIComponent(
    JSON.stringify({ v: CONSENT_VERSION, ...c, at: new Date().toISOString() }),
  );
}

/** Estado para o Consent Mode do Google. */
export function googleConsentState(c: Consent | null) {
  const analytics = c?.analytics ? 'granted' : 'denied';
  const ads = c?.ads ? 'granted' : 'denied';
  return {
    analytics_storage: analytics,
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  } as const;
}
