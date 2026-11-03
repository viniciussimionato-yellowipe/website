'use client';

import { OPEN_CONSENT_EVENT } from './ConsentManager';

/** Reabre o banner de consentimento (link "Cookies" no rodapé). */
export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className="cursor-pointer text-on-navy-2 underline-offset-[3px] hover:text-white hover:underline"
    >
      {label}
    </button>
  );
}
