'use client';

import { useEffect, useRef, useState } from 'react';
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

type Category = { title: string; text: string };
type Texts = {
  title: string;
  text: string;
  accept: string;
  reject: string;
  customize: string;
  save: string;
  privacy: string;
  alwaysOn: string;
  necessary: Category;
  analytics: Category;
  ads: Category;
};
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

function CookieIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 12.5A9 9 0 1 1 11.5 3a3 3 0 0 0 3.5 3.5 3 3 0 0 0 3 3 3 3 0 0 0 3 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="8.5" cy="10" r="1.3" fill="currentColor" />
      <circle cx="13" cy="15" r="1.3" fill="currentColor" />
      <circle cx="8.5" cy="15.5" r="1" fill="currentColor" />
    </svg>
  );
}

function Toggle({
  id,
  checked,
  disabled,
  onChange,
  label,
}: {
  id: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 disabled:cursor-not-allowed ${
        checked ? 'bg-navy' : 'bg-line-strong'
      } ${disabled ? 'opacity-55' : ''}`}
    >
      <span
        className={`inline-block size-5 rounded-full bg-white shadow-[0_1px_3px_rgb(6_25_58/0.3)] transition-transform duration-200 ${
          checked ? 'translate-x-[24px]' : 'translate-x-[4px]'
        }`}
      />
    </button>
  );
}

export function ConsentManager({ texts, privacyHref }: { texts: Texts; privacyHref?: string }) {
  const [visible, setVisible] = useState(false);
  const [custom, setCustom] = useState(false);
  const [hasChoice, setHasChoice] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: false, ads: false });
  const titleRef = useRef<HTMLParagraphElement>(null);

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
    // Reaberto pelo link "Cookies" do rodapé: mostra as escolhas atuais e leva o foco.
    const open = () => {
      const existing = readConsent();
      setHasChoice(!!existing);
      setPrefs({ analytics: !!existing?.analytics, ads: !!existing?.ads });
      setCustom(!!existing);
      setVisible(true);
      window.setTimeout(() => titleRef.current?.focus(), 0);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  useEffect(() => {
    if (!visible || !hasChoice) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVisible(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible, hasChoice]);

  const save = (choice: { analytics: boolean; ads: boolean }) => {
    const value = serializeConsent(choice);
    document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${60 * 60 * 24 * 180}; Path=/; SameSite=Lax; Secure`;
    const consent = readConsent();
    if (consent) {
      if (consent.analytics) rememberFirstTouch();
      loadGtm(consent);
      applyClarityConsent(consent.analytics);
    }
    setVisible(false);
    setCustom(false);
  };

  if (!visible) return null;

  // Recusar e aceitar com o mesmo peso visual (exigência RGPD).
  const btn =
    'inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center rounded-[var(--radius-btn)] px-3 py-2.5 text-[14.5px] whitespace-nowrap font-semibold transition-[background-color,transform] duration-150 active:scale-[0.97]';
  const solid = `${btn} bg-navy text-white hover:bg-navy-hover`;

  const rows = [
    { key: 'necessary' as const, cat: texts.necessary },
    { key: 'analytics' as const, cat: texts.analytics },
    { key: 'ads' as const, cat: texts.ads },
  ];

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      aria-describedby="consent-text"
      className="consent-in fixed inset-x-3 bottom-3 z-40 max-h-[calc(100dvh-24px)] overflow-y-auto rounded-[20px] border border-line bg-white text-ink shadow-[0_24px_60px_-12px_rgb(6_25_58/0.35)] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[420px]"
    >
      <div className="h-1 rounded-t-[20px] bg-yellow" aria-hidden="true" />
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-warm text-navy">
            <CookieIcon />
          </span>
          <p
            id="consent-title"
            ref={titleRef}
            tabIndex={-1}
            className="m-0 font-display text-[18px] leading-tight font-semibold outline-none"
          >
            {texts.title}
          </p>
        </div>
        <p id="consent-text" className="mt-3 mb-0 text-[14px] leading-relaxed text-body">
          {texts.text}{' '}
          {privacyHref && (
            <a
              href={privacyHref}
              className="font-medium text-ink underline underline-offset-[3px] hover:text-gold"
            >
              {texts.privacy}
            </a>
          )}
        </p>

        {custom ? (
          <>
            <ul className="mt-4 mb-0 list-none divide-y divide-line rounded-2xl border border-line p-0">
              {rows.map(({ key, cat }) => {
                const fixed = key === 'necessary';
                const on = fixed ? true : prefs[key];
                return (
                  <li key={key} className="flex items-start gap-4 px-4 py-3.5">
                    <label htmlFor={`consent-${key}`} className="min-w-0 flex-1 cursor-pointer">
                      <span className="flex flex-wrap items-center gap-2 text-[14.5px] font-semibold">
                        {cat.title}
                        {fixed && (
                          <span className="rounded-full bg-surface px-2 py-0.5 font-mono text-[10.5px] font-medium tracking-[0.06em] text-muted uppercase">
                            {texts.alwaysOn}
                          </span>
                        )}
                      </span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-body">
                        {cat.text}
                      </span>
                    </label>
                    <Toggle
                      id={`consent-${key}`}
                      label={cat.title}
                      checked={on}
                      disabled={fixed}
                      onChange={fixed ? undefined : (v) => setPrefs((p) => ({ ...p, [key]: v }))}
                    />
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex gap-2.5">
              <button
                type="button"
                onClick={() => save({ analytics: false, ads: false })}
                className={solid}
              >
                {texts.reject}
              </button>
              <button type="button" onClick={() => save(prefs)} className={solid}>
                {texts.save}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mt-5 flex gap-2.5">
              <button
                type="button"
                onClick={() => save({ analytics: false, ads: false })}
                className={solid}
              >
                {texts.reject}
              </button>
              <button
                type="button"
                onClick={() => save({ analytics: true, ads: true })}
                className={solid}
              >
                {texts.accept}
              </button>
            </div>
            <button
              type="button"
              onClick={() => setCustom(true)}
              className="mt-3 inline-flex min-h-11 w-full cursor-pointer items-center justify-center text-[14px] font-semibold text-ink underline-offset-[3px] hover:underline"
            >
              {texts.customize}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
