'use client';

import Script from 'next/script';

/**
 * Envio de candidaturas para /api/candidatura (sempre o ATS). O anti-spam é o mesmo
 * do formulário de contacto (Turnstile), só quando a chave existe.
 */
export type SubmitResult = { ok: true } | { ok: false; fields: string[] };

export async function submitCandidate(form: HTMLFormElement): Promise<SubmitResult> {
  try {
    const res = await fetch('/api/candidatura/', { method: 'POST', body: new FormData(form) });
    const body = (await res.json()) as { ok: boolean; fields?: string[] };
    return res.ok && body.ok ? { ok: true } : { ok: false, fields: body.fields ?? [] };
  } catch {
    return { ok: false, fields: [] };
  }
}

/** Campo escondido para bots (tem de vir vazio) e desafio Turnstile, quando configurado. */
export function AntiSpam() {
  const key = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  return (
    <>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px opacity-0"
      />
      {key && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="lazyOnload"
          />
          <div className="cf-turnstile" data-sitekey={key} />
        </>
      )}
    </>
  );
}
