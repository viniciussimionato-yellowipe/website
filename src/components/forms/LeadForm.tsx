'use client';

import Script from 'next/script';
import Link from 'next/link';
import { useId, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import type { FormEvent } from 'react';
import type { Dictionary } from '@/dictionaries';
import { getAttribution } from '@/lib/analytics/attribution';
import { parseCta, readCtaRaw } from '@/lib/analytics/cta-context';
import { track } from '@/lib/analytics/events';
import type { Locale } from '@/lib/i18n/locales';
import { localeConfig } from '@/lib/i18n/locales';
import { ArrowRight } from '@/components/ui/icons';

/**
 * Formulário em três passos (R-06): intenção → contacto → pedido.
 * - Envia JSON para /api/lead; a pontuação e o encaminhamento são feitos no servidor.
 * - Campos escondidos de atribuição vêm de getAttribution() no momento do envio.
 * - Sinais de comportamento (preços, casos vistos) vêm do sessionStorage, se existirem.
 * - O último CTA da sessão (cta-context.ts) vai para o CRM e, se veio de uma página de
 *   modelo, pré-escolhe a intenção (o visitante pode mudar).
 */
type Intent = 'hire' | 'augment' | 'build' | 'unsure' | 'job';
type Status = 'idle' | 'sending' | 'done-calendar' | 'done-email' | 'error';

type Props = {
  locale: Locale;
  t: Dictionary['form'];
  privacyHref: string | null;
  formId: string;
  ctaId?: string;
  /** `dark`: cartão escuro sobre fundo navy (secção Fale connosco da home). */
  tone?: 'light' | 'dark';
};

const INTENTS: Intent[] = ['hire', 'augment', 'build', 'unsure', 'job'];
/** Modelo da página do CTA → intenção sugerida no passo 1. */
const MODEL_INTENT: Record<string, Intent> = {
  contrate: 'hire',
  reforce: 'augment',
  construa: 'build',
};
const noSubscribe = () => () => {};

function readSignals() {
  try {
    return {
      pricingViewed: sessionStorage.getItem('yw_pricing_viewed') === '1',
      casesViewed: Number(sessionStorage.getItem('yw_cases_viewed') ?? 0) || 0,
    };
  } catch {
    return { pricingViewed: false, casesViewed: 0 };
  }
}

const styles = {
  light: {
    card: 'rounded-[20px] bg-white text-ink',
    field:
      'box-border min-h-12 w-full rounded-[10px] border border-line-strong bg-white px-3.5 py-3 font-sans text-[15px] font-normal text-ink outline-none focus:border-navy',
    label: 'mb-1.5 block text-[14px] font-semibold text-ink',
    legend: 'mb-3 p-0 text-[15px] font-semibold',
    option: 'border border-[#D5DBE4] hover:border-navy',
    optionOn: 'border-[1.5px] border-navy bg-warm',
    radio: 'accent-navy',
    submit: 'btn-primary min-h-[52px] flex-1 cursor-pointer justify-center border-0 font-sans',
    note: 'text-muted',
    noteLink: 'text-ink underline hover:text-link-hover',
    soft: 'text-body',
  },
  dark: {
    card: 'rounded-[20px] border border-white/12 bg-navy-2 text-white',
    field:
      'box-border min-h-12 w-full rounded-[10px] border border-white/14 bg-navy px-3.5 py-3 font-sans text-[15px] font-normal text-white outline-none transition-colors placeholder:text-[#7f8fad] hover:border-white/30 focus:border-yellow',
    label: 'mb-2 block font-mono text-[12px] font-medium tracking-[0.1em] text-on-navy uppercase',
    legend: 'mb-3 p-0 font-mono text-[12px] font-medium tracking-[0.1em] text-on-navy uppercase',
    option: 'border border-white/14 bg-navy text-white hover:border-white/30',
    optionOn: 'border border-yellow bg-yellow/8 text-white',
    radio: 'accent-yellow',
    submit:
      'btn-primary min-h-[52px] cursor-pointer justify-center rounded-full border-0 px-7 font-sans max-[960px]:flex-1',
    note: 'text-on-navy-2',
    noteLink: 'text-white underline hover:text-yellow',
    soft: 'text-on-navy',
  },
} as const;

export function LeadForm({ locale, t, privacyHref, formId, ctaId, tone = 'light' }: Props) {
  const c = styles[tone];
  const dark = tone === 'dark';
  const field = c.field;
  const label = c.label;
  const legend = c.legend;
  const submitClass = c.submit;
  /** Asterisco visual; a obrigatoriedade real vem do atributo `required`. */
  const req = dark ? (
    <span aria-hidden="true" className="text-yellow">
      {' '}
      *
    </span>
  ) : null;
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const started = useRef(false);
  const [step, setStep] = useState(1);
  const [chosen, setChosen] = useState<Intent | null>(null);
  // Lido depois da hidratação (o servidor não tem sessionStorage): sem diferenças no HTML.
  const ctaRaw = useSyncExternalStore(noSubscribe, readCtaRaw, () => null);
  const lastCta = useMemo(() => parseCta(ctaRaw), [ctaRaw]);
  const intent = chosen ?? (lastCta?.model ? MODEL_INTENT[lastCta.model] : undefined) ?? null;
  const sourceCta = lastCta?.ctaId ?? ctaId ?? formId;
  const [status, setStatus] = useState<Status>('idle');
  const [meetingUrl, setMeetingUrl] = useState<string | null>(null);
  const [badFields, setBadFields] = useState<string[]>([]);
  const turnstileKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const isJob = intent === 'job';

  const onFirstInteraction = () => {
    if (started.current) return;
    started.current = true;
    track('form_start', { form_id: formId, pagina_conversao: location.pathname });
  };

  const goTo = (next: number) => {
    const form = formRef.current;
    if (next > step && form) {
      const current = form.querySelector<HTMLFieldSetElement>(`fieldset[data-step="${step}"]`);
      const invalid = current
        ? Array.from(current.querySelectorAll<HTMLInputElement>('input,select,textarea')).find(
            (el) => !el.checkValidity(),
          )
        : undefined;
      if (invalid) {
        invalid.reportValidity();
        track('form_error', { form_id: formId, passo: step, campos: invalid.name || 'sem-nome' });
        return;
      }
      track('form_step', { form_id: formId, passo: step, ...(intent ? { intencao: intent } : {}) });
    }
    setStep(next);
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const str = (k: string) => {
      const v = data.get(k);
      return typeof v === 'string' && v.trim() ? v.trim() : undefined;
    };
    const headcount = Number(str('headcount'));
    const payload = {
      intent,
      name: str('name'),
      email: str('email'),
      company: str('company'),
      jobTitle: str('jobTitle'),
      country: str('country'),
      areas: str('areas'),
      headcount: Number.isFinite(headcount) && headcount > 0 ? headcount : undefined,
      companySize: str('companySize'),
      start: str('start'),
      message: str('message'),
      locale,
      consentMarketing: data.get('consentMarketing') === 'on',
      attribution: {
        ...getAttribution(sourceCta),
        ...(lastCta ? { ctaPage: lastCta.page } : {}),
      },
      signals: readSignals(),
      turnstileToken: str('cf-turnstile-response'),
      website: str('website') ?? '',
    };

    setStatus('sending');
    setBadFields([]);
    try {
      const res = await fetch('/api/lead/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const body = (await res.json()) as {
        ok: boolean;
        next?: 'calendar' | 'email' | 'jobs';
        band?: string;
        meetingUrl?: string;
        fields?: string[];
      };
      if (!res.ok || !body.ok) {
        setBadFields(body.fields ?? []);
        if (body.fields?.length)
          track('form_error', { form_id: formId, passo: step, campos: body.fields.join(',') });
        setStatus('error');
        return;
      }
      if (isJob) {
        track('candidate_submit', { idioma: locale });
      } else {
        track('generate_lead', {
          form_id: formId,
          intencao: intent ?? 'unsure',
          mercado: payload.country ?? localeConfig[locale].market,
          idioma: locale,
          faixa_pontuacao: body.band ?? 'unknown',
          cta_id: sourceCta,
        });
      }
      if (body.next === 'calendar' && body.meetingUrl) {
        setMeetingUrl(body.meetingUrl);
        setStatus('done-calendar');
      } else {
        setStatus('done-email');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done-calendar' || status === 'done-email') {
    return (
      <div role="status" className={`${c.card} p-[clamp(24px,3vw,36px)]`}>
        <p className="text-[16px] leading-relaxed">
          {status === 'done-calendar' ? t.successCalendar : t.successEmail}
        </p>
        {status === 'done-calendar' && meetingUrl && (
          <a
            href={meetingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-4"
          >
            {t.openCalendar} <ArrowRight />
          </a>
        )}
      </div>
    );
  }

  const steps = isJob ? 2 : 3;

  return (
    <form
      data-clarity-mask="True"
      ref={formRef}
      onSubmit={onSubmit}
      onFocusCapture={onFirstInteraction}
      aria-describedby={`${uid}-progress`}
      className={`relative box-border flex min-w-0 flex-col gap-5 ${c.card} ${dark ? 'gap-[22px] p-[clamp(24px,3.2vw,40px)]' : 'p-[clamp(24px,3vw,36px)]'}`}
    >
      {dark && (
        <div className="flex flex-col gap-2 border-b border-white/12 pb-[22px]">
          <p className="m-0 font-mono text-[13px] tracking-[0.1em] text-white uppercase">
            {t.formTitle}
          </p>
          <p className="m-0 text-[14.5px] leading-[1.6] text-on-navy">{t.formIntro}</p>
          <p className="m-0 text-[13px] text-on-navy-2">
            <span aria-hidden="true" className="text-yellow">
              *
            </span>{' '}
            {t.requiredNote}
          </p>
        </div>
      )}
      <p id={`${uid}-progress`} className="sr-only">
        {t.stepOf.replace('{n}', String(Math.min(step, steps))).replace('{total}', String(steps))}
      </p>

      {/* Armadilha para bots: invisível para pessoas e leitores de ecrã. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset data-step="1" hidden={step !== 1} className="m-0 border-0 p-0">
        <legend className={legend}>
          {t.step1Title}
          {req}
        </legend>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-2">
          {INTENTS.map((value) => (
            <label
              key={value}
              className={`box-border flex min-h-12 cursor-pointer items-center gap-2.5 rounded-xl px-3.5 py-3 text-[14.5px] font-medium ${
                intent === value ? c.optionOn : c.option
              } transition-colors`}
            >
              <input
                type="radio"
                name="intent"
                value={value}
                required
                checked={intent === value}
                onChange={() => setChosen(value)}
                className={`m-0 size-[18px] ${c.radio}`}
              />
              {t.intents[value]}
            </label>
          ))}
        </div>
        {isJob && <p className={`mt-3 mb-0 text-[14px] ${c.soft}`}>{t.jobRedirect}</p>}
      </fieldset>

      <fieldset
        data-step="2"
        hidden={step !== 2}
        className="m-0 grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-3.5 border-0 p-0"
      >
        <legend className={legend}>{t.step2Title}</legend>
        <div>
          <label htmlFor={`${uid}-name`} className={label}>
            {t.name}
            {req}
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            required
            minLength={2}
            maxLength={120}
            autoComplete="name"
            className={field}
          />
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className={label}>
            {t.email}
            {req}
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            aria-invalid={badFields.includes('email') || undefined}
            className={field}
          />
        </div>
        {!isJob && (
          <>
            <div>
              <label htmlFor={`${uid}-company`} className={label}>
                {t.company}
                {req}
              </label>
              <input
                id={`${uid}-company`}
                name="company"
                required
                maxLength={160}
                autoComplete="organization"
                aria-invalid={badFields.includes('company') || undefined}
                className={field}
              />
            </div>
            <div>
              <label htmlFor={`${uid}-title`} className={label}>
                {t.jobTitle}
              </label>
              <input
                id={`${uid}-title`}
                name="jobTitle"
                maxLength={120}
                autoComplete="organization-title"
                className={field}
              />
            </div>
          </>
        )}
        <div>
          <label htmlFor={`${uid}-country`} className={label}>
            {t.country}
            {req}
          </label>
          <select
            id={`${uid}-country`}
            name="country"
            required
            defaultValue={localeConfig[locale].market}
            className={field}
          >
            {(['PT', 'BR', 'US', 'OTHER'] as const).map((c) => (
              <option key={c} value={c}>
                {t.countries[c]}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <fieldset
        data-step="3"
        hidden={step !== 3}
        className="m-0 grid gap-3.5 border-0 p-0 sm:grid-cols-2"
      >
        <legend className={legend}>{t.step3Title}</legend>
        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-areas`} className={label}>
            {t.areas}
          </label>
          <input id={`${uid}-areas`} name="areas" maxLength={300} className={field} />
        </div>
        {!isJob && (
          <>
            <div>
              <label htmlFor={`${uid}-headcount`} className={label}>
                {t.headcount}
              </label>
              <input
                id={`${uid}-headcount`}
                name="headcount"
                type="number"
                min={1}
                max={500}
                inputMode="numeric"
                className={field}
              />
            </div>
            <div>
              <label htmlFor={`${uid}-size`} className={label}>
                {t.companySize}
              </label>
              <select id={`${uid}-size`} name="companySize" defaultValue="" className={field}>
                <option value="">—</option>
                {(Object.keys(t.sizes) as (keyof typeof t.sizes)[]).map((k) => (
                  <option key={k} value={k}>
                    {t.sizes[k]}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={`${uid}-start`} className={label}>
                {t.start}
              </label>
              <select id={`${uid}-start`} name="start" defaultValue="" className={field}>
                <option value="">—</option>
                {(Object.keys(t.starts) as (keyof typeof t.starts)[]).map((k) => (
                  <option key={k} value={k}>
                    {t.starts[k]}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-message`} className={label}>
            {t.message}
          </label>
          <textarea
            id={`${uid}-message`}
            name="message"
            rows={4}
            maxLength={2000}
            className={field}
          />
        </div>
        <label className={`flex items-start gap-3 text-[14px] sm:col-span-2 ${c.soft}`}>
          <input type="checkbox" name="consentMarketing" className={`mt-1 ${c.radio}`} />
          {t.marketing}
        </label>
      </fieldset>

      {turnstileKey && (
        <div hidden={step !== steps}>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="lazyOnload"
          />
          <div className="cf-turnstile" data-sitekey={turnstileKey} />
        </div>
      )}

      {status === 'error' && (
        <p
          role="alert"
          className={`text-[14px] font-medium ${dark ? 'text-[#ffb4ab]' : 'text-danger'}`}
        >
          {t.error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        {step > 1 && (
          <button
            type="button"
            onClick={() => goTo(step - 1)}
            className={`min-h-[52px] cursor-pointer px-2 text-[15px] font-medium underline-offset-4 hover:underline ${c.soft}`}
          >
            {t.back}
          </button>
        )}
        {/* Keys diferentes: sem elas o React reutiliza o mesmo <button> e muda-lhe o type
            para submit durante o clique em "Continuar", e o browser envia o formulário
            antes de mostrar o último passo. */}
        {step < steps ? (
          <button key="next" type="button" onClick={() => goTo(step + 1)} className={submitClass}>
            {t.next} <ArrowRight strokeWidth={2.2} />
          </button>
        ) : (
          <button
            key="submit"
            type="submit"
            disabled={status === 'sending'}
            className={`${submitClass} disabled:opacity-60`}
          >
            {status === 'sending' ? t.sending : t.submit} <ArrowRight strokeWidth={2.2} />
          </button>
        )}
      </div>

      <p className={`m-0 text-[13px] leading-[1.55] ${c.note}`}>
        {privacyHref ? (
          <>
            {t.privacyStart}{' '}
            <Link href={privacyHref} className={c.noteLink}>
              {t.privacyLink}
            </Link>
            .
          </>
        ) : (
          t.privacy
        )}
      </p>
    </form>
  );
}
