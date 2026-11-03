'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import type { FormEvent } from 'react';
import { track } from '@/lib/analytics/events';
import type { Locale } from '@/lib/i18n/locales';
import { ArrowRight, PinIcon, SearchIcon } from '@/components/ui/icons';
import { AntiSpam, submitCandidate } from './candidate';

/**
 * Vagas v1 (docs/design/vagas-v1.dc.html): pesquisa, filtros com contagens, lista e
 * painel de detalhe com candidatura. Os detalhes de todas as vagas estão no HTML
 * (cada um com `hidden` até ser aberto). O painel abre também por #vaga-{id}.
 */
export type JobView = {
  id: string;
  title: string;
  area: string;
  seniority: string;
  region: string;
  mode: string;
  contract: 'consultant' | 'direct';
  location: string;
  tech: string[];
  english: string;
  age: string;
  about: string;
  requirements: string[];
  search: string;
};

type Option = { value: string; label: string };
type Group = { key: FilterKey; title: string; options: Option[] };
type FilterKey = 'area' | 'seniority' | 'region' | 'mode' | 'contract';

type Texts = {
  searchLabel: string;
  searchPlaceholder: string;
  searchHint: string;
  filters: string;
  clear: string;
  alertTitle: string;
  alertText: string;
  alertPlaceholder: string;
  alertSubmit: string;
  alertDone: string;
  shown: string;
  sorted: string;
  emptyTitle: string;
  emptyText: string;
  emptyCta: string;
  detail: string;
  close: string;
  english: string;
  about: string;
  requirements: string;
  contractTitle: string;
  apply: string;
  name: string;
  email: string;
  linkedin: string;
  attach: string;
  submit: string;
  note: string;
  sending: string;
  done: string;
  error: string;
  cvOrLinkedin: string;
  cvInvalid: string;
  privacyStart: string;
  privacyLink: string;
};

type Props = {
  locale: Locale;
  jobs: JobView[];
  groups: Group[];
  labels: Record<FilterKey, Record<string, string>>;
  contractText: Record<'consultant' | 'direct', string>;
  texts: Texts;
  cvHref: string | null;
  privacyHref: string | null;
};

const EMPTY: Record<FilterKey, string> = {
  area: '',
  seniority: '',
  region: '',
  mode: '',
  contract: '',
};

function subscribeHash(cb: () => void) {
  window.addEventListener('hashchange', cb);
  return () => window.removeEventListener('hashchange', cb);
}
const readHash = () => window.location.hash;

const ACCEPT =
  '.pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document';

export function JobsBoard({
  locale,
  jobs,
  groups,
  labels,
  contractText,
  texts: t,
  cvHref,
  privacyHref,
}: Props) {
  const [q, setQ] = useState('');
  const [f, setF] = useState(EMPTY);
  // A vaga aberta vive no URL (#vaga-{id}): os cartões de Carreiras e as ligações partilhadas abrem-na.
  const hash = useSyncExternalStore(subscribeHash, readHash, () => '');
  const fromHash = hash.replace(/^#vaga-/, '');
  const open = jobs.some((j) => j.id === fromHash) ? fromHash : null;
  const opener = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const match = useCallback(
    (j: JobView, skip?: FilterKey) => {
      const query = q.trim().toLowerCase();
      if (query && !j.search.includes(query)) return false;
      return (Object.keys(f) as FilterKey[]).every((k) => k === skip || !f[k] || j[k] === f[k]);
    },
    [q, f],
  );
  const list = useMemo(() => jobs.filter((j) => match(j)), [jobs, match]);

  const show = useCallback(
    (id: string | null, from?: HTMLElement | null, restoreFocus = true) => {
      if (from) opener.current = from;
      const url = id ? `#vaga-${id}` : window.location.pathname + window.location.search;
      window.history.replaceState(null, '', url);
      // replaceState não emite hashchange: avisa a store do hash.
      window.dispatchEvent(new HashChangeEvent('hashchange'));
      if (id) {
        const j = jobs.find((x) => x.id === id);
        if (j) track('job_open', { vaga: j.id, area: j.area });
      } else if (restoreFocus) opener.current?.focus();
    },
    [jobs],
  );

  useEffect(() => {
    if (!open) return;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && show(null);
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, show]);

  const pill = 'rounded-full bg-surface px-2.5 py-1 text-[12px] font-medium text-body';
  const contractPill = (c: JobView['contract']) =>
    c === 'consultant'
      ? 'rounded-full bg-warm px-2.5 py-1 text-[12px] font-semibold text-gold'
      : 'rounded-full bg-[#E8EEF8] px-2.5 py-1 text-[12px] font-semibold text-navy';
  const techTag =
    'rounded-md border border-line px-[7px] py-[3px] font-mono text-[11px] text-muted not-italic';

  const activeFilters = (Object.keys(f) as FilterKey[])
    .filter((k) => f[k])
    .map((k) => labels[k][f[k]])
    .concat(q.trim() ? [q.trim()] : [])
    .join(' · ');

  return (
    <>
      <div className="container-site">
        <div className="relative z-[2] mx-auto -mt-[34px] flex max-w-[820px] items-center gap-3 rounded-2xl border border-line-strong bg-white px-5 shadow-[0_24px_48px_-28px_rgba(6,25,58,0.45)] focus-within:border-navy focus-within:shadow-[0_0_0_4px_rgba(244,190,20,0.35),0_24px_48px_-28px_rgba(6,25,58,0.45)]">
          <SearchIcon className="flex-none text-muted" />
          <input
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              if (open) show(null, null, false);
            }}
            placeholder={t.searchPlaceholder}
            aria-label={t.searchLabel}
            className="min-h-[66px] min-w-0 flex-1 border-0 bg-transparent font-sans text-[17px] text-ink outline-none"
          />
          <span className="font-mono text-[11.5px] whitespace-nowrap text-muted max-[960px]:hidden">
            {t.searchHint}
          </span>
        </div>
      </div>

      <section className="container-site grid grid-cols-[280px_minmax(0,1fr)] items-start gap-10 pt-11 pb-24 max-[960px]:grid-cols-[minmax(0,1fr)] max-[960px]:gap-6">
        <aside
          aria-label={t.filters}
          className="sticky top-24 flex min-w-0 flex-col gap-[22px] max-[960px]:static"
        >
          {groups.map((g) => (
            <div key={g.key} role="group" aria-labelledby={`f-${g.key}`}>
              <p
                id={`f-${g.key}`}
                className="m-0 mb-2.5 font-mono text-[11.5px] tracking-[0.12em] text-muted uppercase"
              >
                {g.title}
              </p>
              <div className="flex flex-wrap gap-1.5 max-[960px]:flex-nowrap max-[960px]:overflow-x-auto max-[960px]:[scrollbar-width:none]">
                {g.options.map((o) => {
                  const on = f[g.key] === o.value;
                  const n = jobs.filter((j) => match(j, g.key) && j[g.key] === o.value).length;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      aria-pressed={on}
                      onClick={() => {
                        setF({ ...f, [g.key]: on ? '' : o.value });
                        if (open) show(null, null, false);
                      }}
                      className={`flex-none cursor-pointer rounded-full border px-3 py-[7px] font-sans text-[13.5px] font-medium transition-colors duration-200 ${
                        on
                          ? 'border-navy bg-navy text-white'
                          : 'border-line bg-surface text-body hover:border-line-strong hover:text-ink'
                      }`}
                    >
                      {o.label}{' '}
                      <span
                        className={`ml-0.5 font-mono text-[11px] ${on ? 'text-on-navy-2' : 'text-muted'}`}
                      >
                        {n}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              setF(EMPTY);
              setQ('');
              if (open) show(null, null, false);
            }}
            className="cursor-pointer self-start border-0 bg-transparent p-0 font-sans text-[13.5px] font-semibold text-ink underline underline-offset-4"
          >
            {t.clear}
          </button>
          <JobAlert locale={locale} texts={t} filters={activeFilters} />
        </aside>

        <div className="flex min-w-0 flex-col gap-2.5">
          <div className="mb-1.5 flex items-baseline justify-between text-[13.5px] text-muted">
            <b className="text-[15px] text-ink" aria-live="polite">
              {t.shown.replace('{n}', String(list.length))}
            </b>
            <span>{t.sorted}</span>
          </div>
          {list.map((j) => (
            <button
              key={j.id}
              type="button"
              onClick={(e) => show(j.id, e.currentTarget)}
              aria-haspopup="dialog"
              className={`group box-border grid cursor-pointer grid-cols-[minmax(0,1fr)_auto_24px] items-center gap-5 rounded-[18px] border bg-white px-[22px] py-5 text-left font-sans transition-[transform,border-color,box-shadow] duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-26px_rgba(6,25,58,0.35)] max-[960px]:grid-cols-1 max-[960px]:gap-3 ${
                open === j.id
                  ? 'border-yellow shadow-[inset_0_0_0_1px_var(--color-yellow)]'
                  : 'border-line hover:border-line-strong'
              }`}
            >
              <span className="flex min-w-0 flex-col gap-2">
                <span className="flex flex-wrap items-center gap-1.5">
                  <span className={contractPill(j.contract)}>{labels.contract[j.contract]}</span>
                  <span className={pill}>{labels.seniority[j.seniority]}</span>
                  <span className={pill}>{labels.mode[j.mode]}</span>
                  <span className="ml-1 font-mono text-[11px] text-muted">{j.age}</span>
                </span>
                <b className="font-display text-[19px] font-semibold text-ink">{j.title}</b>
                <span className="inline-flex items-center gap-1.5 text-[13.5px] text-muted">
                  <PinIcon />
                  {j.location}
                </span>
              </span>
              <span className="flex max-w-[260px] flex-wrap justify-end gap-1.5 max-[960px]:max-w-none max-[960px]:justify-start">
                {j.tech.map((x) => (
                  <i key={x} className={techTag}>
                    {x}
                  </i>
                ))}
              </span>
              <ArrowRight
                size={18}
                strokeWidth={2.2}
                className="text-muted transition-[transform,color] duration-300 group-hover:translate-x-[3px] group-hover:text-ink max-[960px]:hidden"
              />
            </button>
          ))}
          {list.length === 0 && (
            <div className="flex flex-col items-start gap-1.5 rounded-[18px] border-[1.5px] border-dashed border-line-strong bg-warm p-7 text-[14.5px] text-body">
              <b className="text-[18px] text-ink">{t.emptyTitle}</b>
              <span>{t.emptyText}</span>
              {cvHref && (
                <Link href={cvHref} className="btn-primary mt-2 rounded-full">
                  {t.emptyCta}
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Painel de detalhe: todas as vagas no HTML; só a aberta fica visível */}
      <div hidden={!open}>
        <div
          className="jb-scrim fixed inset-0 z-40 bg-navy/35"
          onClick={() => show(null)}
          aria-hidden="true"
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.detail}
          className="jb-panel fixed inset-y-0 right-0 z-[41] box-border w-[min(560px,100%)] overflow-y-auto bg-white px-9 pt-9 pb-10 shadow-[-30px_0_60px_-30px_rgba(6,25,58,0.5)] max-[960px]:px-5 max-[960px]:pt-7"
        >
          <button
            ref={closeBtn}
            type="button"
            onClick={() => show(null)}
            aria-label={t.close}
            className="absolute top-[18px] right-[18px] size-10 cursor-pointer rounded-full border border-line bg-white text-[22px] leading-none text-ink"
          >
            ×
          </button>
          {jobs.map((j) => (
            <article
              key={j.id}
              id={`vaga-${j.id}`}
              hidden={open !== j.id}
              className="flex flex-col gap-3"
            >
              <span className="flex flex-wrap items-center gap-1.5 pr-12">
                <span className={contractPill(j.contract)}>{labels.contract[j.contract]}</span>
                <span className={pill}>{labels.seniority[j.seniority]}</span>
                <span className={pill}>{labels.mode[j.mode]}</span>
              </span>
              <h2 className="mt-1 mb-0 font-display text-[28px] font-semibold tracking-[-0.02em]">
                {j.title}
              </h2>
              <p className="m-0 text-[14px] text-muted">
                {j.location} · {labels.area[j.area]} · {t.english} {j.english}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {j.tech.map((x) => (
                  <i key={x} className={techTag}>
                    {x}
                  </i>
                ))}
              </div>
              <h3 className="mt-3.5 mb-0 font-mono text-[11.5px] font-medium tracking-[0.12em] text-gold uppercase">
                {t.about}
              </h3>
              <p className="m-0 text-[15px] leading-[1.65] text-body">{j.about}</p>
              <h3 className="mt-3.5 mb-0 font-mono text-[11.5px] font-medium tracking-[0.12em] text-gold uppercase">
                {t.requirements}
              </h3>
              <ul className="m-0 flex list-disc flex-col gap-1 pl-[18px] text-[15px] leading-[1.65] text-body">
                {j.requirements.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <h3 className="mt-3.5 mb-0 font-mono text-[11.5px] font-medium tracking-[0.12em] text-gold uppercase">
                {t.contractTitle}
              </h3>
              <p className="m-0 text-[15px] leading-[1.65] text-body">{contractText[j.contract]}</p>
              {open === j.id && (
                <ApplyForm locale={locale} job={j} texts={t} privacyHref={privacyHref} />
              )}
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

function ApplyForm({
  locale,
  job,
  texts: t,
  privacyHref,
}: {
  locale: Locale;
  job: JobView;
  texts: Texts;
  privacyHref: string | null;
}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [bad, setBad] = useState<string[]>([]);
  const [file, setFile] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const r = await submitCandidate(e.currentTarget);
    if (r.ok) {
      track('candidate_submit', { idioma: locale, origem: 'vaga', vaga: job.id });
      setStatus('done');
    } else {
      setBad(r.fields);
      setStatus('error');
    }
  }

  const box = 'mt-[18px] flex flex-col gap-2.5 rounded-[18px] bg-surface p-5';
  if (status === 'done')
    return (
      <p role="status" className={`${box} m-0 text-[15px] text-ink`}>
        {t.done}
      </p>
    );

  const field =
    'min-h-11 min-w-0 rounded-[10px] border border-line-strong bg-white px-3 py-[11px] font-sans text-[14px] text-ink';
  return (
    <form data-clarity-mask="True" onSubmit={onSubmit} noValidate className={box}>
      <b className="text-[16px]">{t.apply}</b>
      <input type="hidden" name="kind" value="application" />
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="jobId" value={job.id} />
      <input type="hidden" name="jobTitle" value={job.title} />
      <div className="grid grid-cols-2 gap-2 max-[960px]:grid-cols-1">
        <input
          name="name"
          required
          autoComplete="name"
          placeholder={t.name}
          aria-label={t.name}
          aria-invalid={bad.includes('name') || undefined}
          className={field}
        />
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={t.email}
          aria-label={t.email}
          aria-invalid={bad.includes('email') || undefined}
          className={field}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 max-[960px]:grid-cols-1">
        <input
          name="linkedin"
          type="url"
          placeholder={t.linkedin}
          aria-label={t.linkedin}
          aria-invalid={bad.includes('linkedin') || undefined}
          className={field}
        />
        <label
          className={`${field} flex cursor-pointer items-center justify-center truncate border-dashed font-semibold focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-yellow ${bad.includes('cv') ? 'border-danger' : ''}`}
        >
          {file ?? t.attach}
          <input
            type="file"
            name="cv"
            accept={ACCEPT}
            onChange={(e) => setFile(e.target.files?.[0]?.name ?? null)}
            className="sr-only"
          />
        </label>
      </div>
      <AntiSpam />
      {status === 'error' && (
        <p role="alert" className="m-0 text-[13px] font-medium text-danger">
          {bad.includes('cv') && bad.includes('linkedin')
            ? t.cvOrLinkedin
            : bad.includes('cv')
              ? t.cvInvalid
              : t.error}
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-primary min-h-[52px] cursor-pointer justify-center rounded-full border-0 font-sans disabled:opacity-60"
      >
        {status === 'sending' ? t.sending : t.submit}
      </button>
      <span className="text-[12.5px] text-muted">{t.note}</span>
      <span className="text-[12.5px] text-muted">
        {t.privacyStart}{' '}
        {privacyHref ? (
          <Link href={privacyHref} className="text-ink underline">
            {t.privacyLink}
          </Link>
        ) : (
          t.privacyLink
        )}
        .
      </span>
    </form>
  );
}

function JobAlert({
  locale,
  texts: t,
  filters,
}: {
  locale: Locale;
  texts: Texts;
  filters: string;
}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const r = await submitCandidate(e.currentTarget);
    if (r.ok) {
      track('job_alert_submit', { idioma: locale });
      setStatus('done');
    } else setStatus('error');
  }

  return (
    <form
      data-clarity-mask="True"
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-1.5 rounded-2xl bg-warm p-[18px] text-[13px] text-body"
    >
      <b className="text-[14px] text-ink">{t.alertTitle}</b>
      {status === 'done' ? (
        <span role="status">{t.alertDone}</span>
      ) : (
        <>
          <span>{t.alertText}</span>
          <input type="hidden" name="kind" value="alert" />
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" name="filters" value={filters} />
          <div className="mt-1.5 flex gap-1.5">
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder={t.alertPlaceholder}
              aria-label={t.email}
              aria-invalid={status === 'error' || undefined}
              className="min-h-10 min-w-0 flex-1 rounded-[10px] border border-line-strong bg-white px-2.5 py-[9px] font-sans text-[13px] text-ink"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="cursor-pointer rounded-[10px] border-0 bg-navy px-3 font-sans text-[13px] font-semibold text-white disabled:opacity-60"
            >
              {t.alertSubmit}
            </button>
          </div>
          <AntiSpam />
          {status === 'error' && (
            <span role="alert" className="font-medium text-danger">
              {t.error}
            </span>
          )}
        </>
      )}
    </form>
  );
}
