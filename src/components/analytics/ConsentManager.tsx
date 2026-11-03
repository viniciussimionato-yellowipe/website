'use client';

import { useEffect, useState } from 'react';
import { rememberFirstTouch } from '@/lib/analytics/attribution';
import { applyClarityConsent } from '@/lib/analytics/clarity';
import type { Consent } from '@/lib/analytics/consent';
import {
  CONSENT_COOKIE,
  googleConsentState,
  parseConsent,
  serializeConsent,
} from '@/lib/analytics/consent';

/**
 * Banner de consentimento e carregamento do GTM (modo básico do Consent Mode) e do
 * Clarity: ambos só são carregados depois de o visitante aceitar análise.
 * Substituir por uma plataforma certificada pela Google quando for escolhida
 * (decisão aberta, docs/08-seguranca-e-privacidade.md) mantendo este contrato.
 */
export const OPEN_CONSENT_EVENT = 'yw:open-consent';

type Texts = { title: string; text: string; accept: string; reject: string };
type DataLayerWindow = Window & { dataLayer?: unknown[]; __ywGtmLoaded?: boolean };

function readConsent(): Consent | null {
  const raw = document.cookie
    .split('; ')
    .find((c) => c.startsWith(`${CONSENT_COOKIE}=`))
    ?.slice(CONSENT_COOKIE.length + 1);
  return parseConsent(raw);
}

function loadGtm(consent: Consent) {
  const id = process.env.NEXT_PUBLIC_GTM_ID;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer ?? [];
  const dl = w.dataLayer;
  const gtag = function (..._args: unknown[]) {
    // O GTM espera o objeto `arguments`, não um array.
    // eslint-disable-next-line prefer-rest-params
    dl.push(arguments);
  };
  if (w.__ywGtmLoaded) {
    gtag('consent', 'update', googleConsentState(consent));
    return;
  }
  gtag('consent', 'default', googleConsentState(null));
  gtag('consent', 'update', googleConsentState(consent));
  if (!id || !consent.analytics) return;
  dl.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
  w.__ywGtmLoaded = true;
}

export function ConsentManager({ texts }: { texts: Texts }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (existing) {
      if (existing.analytics) {
        rememberFirstTouch();
        loadGtm(existing);
        applyClarityConsent(true);
      }
    } else {
      // Mostrar depois da primeira pintura para não afetar o LCP.
      const t = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const open = () => setVisible(true);
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  const choose = (accepted: boolean) => {
    const value = serializeConsent({ analytics: accepted, ads: accepted });
    document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${60 * 60 * 24 * 180}; Path=/; SameSite=Lax; Secure`;
    const consent = readConsent();
    if (consent) {
      if (consent.analytics) rememberFirstTouch();
      loadGtm(consent);
      applyClarityConsent(consent.analytics);
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-[560px] rounded-[var(--radius-card)] border border-line bg-white p-5 text-ink shadow-[0_18px_48px_rgb(6_25_58/0.18)]"
    >
      <p id="consent-title" className="font-semibold">
        {texts.title}
      </p>
      <p className="mt-1.5 text-[14px] leading-relaxed text-body">{texts.text}</p>
      {/* Recusar e aceitar com o mesmo peso visual (exigência RGPD). */}
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => choose(false)}
          className="btn-navy flex-1 justify-center"
        >
          {texts.reject}
        </button>
        <button
          type="button"
          onClick={() => choose(true)}
          className="btn-navy flex-1 justify-center"
        >
          {texts.accept}
        </button>
      </div>
    </div>
  );
}
