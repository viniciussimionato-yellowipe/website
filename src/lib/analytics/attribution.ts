import { FIRST_TOUCH_COOKIE } from './consent';

/**
 * Atribuição da primeira visita (R-08). Com consentimento, guarda num cookie
 * próprio a página de entrada, a origem e as UTMs durante 90 dias. Sem
 * consentimento, o formulário envia apenas a página atual e o referrer.
 */
export type FirstTouch = {
  landingPage: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  liFatId?: string;
};

const MAX_AGE = 60 * 60 * 24 * 90;

export function readUtm(search: string): Omit<FirstTouch, 'landingPage' | 'referrer'> {
  const p = new URLSearchParams(search);
  const get = (k: string) => p.get(k)?.slice(0, 200) || undefined;
  return {
    utmSource: get('utm_source'),
    utmMedium: get('utm_medium'),
    utmCampaign: get('utm_campaign'),
    utmTerm: get('utm_term'),
    utmContent: get('utm_content'),
    gclid: get('gclid'),
    liFatId: get('li_fat_id'),
  };
}

function readCookie(name: string): string | undefined {
  return document.cookie
    .split('; ')
    .find((c) => c.startsWith(`${name}=`))
    ?.split('=')
    .slice(1)
    .join('=');
}

/** Chamar só depois de haver consentimento de análise. */
export function rememberFirstTouch(): void {
  if (readCookie(FIRST_TOUCH_COOKIE)) return;
  const ft: FirstTouch = {
    landingPage: location.pathname,
    referrer: document.referrer || undefined,
    ...readUtm(location.search),
  };
  document.cookie = `${FIRST_TOUCH_COOKIE}=${encodeURIComponent(JSON.stringify(ft))}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax; Secure`;
}

export function getAttribution(
  ctaId?: string,
): FirstTouch & { conversionPage: string; ctaId?: string } {
  let ft: FirstTouch | undefined;
  const raw = readCookie(FIRST_TOUCH_COOKIE);
  if (raw) {
    try {
      ft = JSON.parse(decodeURIComponent(raw)) as FirstTouch;
    } catch {
      ft = undefined;
    }
  }
  return {
    ...(ft ?? {
      landingPage: location.pathname,
      referrer: document.referrer || undefined,
      ...readUtm(location.search),
    }),
    conversionPage: location.pathname,
    ctaId,
  };
}
