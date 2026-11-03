'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import type { DragEvent, FormEvent } from 'react';
import { track } from '@/lib/analytics/events';
import type { Locale } from '@/lib/i18n/locales';
import { UploadIcon } from '@/components/ui/icons';
import { AntiSpam, submitCandidate } from './candidate';

/**
 * Candidatura espontânea (Carreiras v3, "Não encontrou a vaga certa?").
 * Arrastar ou escolher o CV; depois pede nome e email. Vai para o ATS.
 */
type Texts = {
  drop: string;
  hint: string;
  choose: string;
  submit: string;
  name: string;
  email: string;
  linkedin: string;
  sending: string;
  done: string;
  error: string;
  cvOrLinkedin: string;
  cvInvalid: string;
  privacyStart: string;
  privacyLink: string;
};

const ACCEPT =
  '.pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document';

export function CvDrop({
  locale,
  texts: t,
  privacyHref,
}: {
  locale: Locale;
  texts: Texts;
  privacyHref: string | null;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<string | null>(null);
  const [over, setOver] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [bad, setBad] = useState<string[]>([]);

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setOver(false);
    const f = e.dataTransfer.files[0];
    if (!f || !input.current) return;
    const dt = new DataTransfer();
    dt.items.add(f);
    input.current.files = dt.files;
    setFile(f.name);
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const r = await submitCandidate(e.currentTarget);
    if (r.ok) {
      track('candidate_submit', { idioma: locale, origem: 'espontanea' });
      setStatus('done');
    } else {
      setBad(r.fields);
      setStatus('error');
    }
  }

  if (status === 'done')
    return (
      <p
        role="status"
        className="m-0 rounded-[18px] border border-line bg-white p-7 text-[15px] leading-relaxed text-ink"
      >
        {t.done}
      </p>
    );

  const field =
    'min-h-11 w-full min-w-0 rounded-[10px] border border-line-strong bg-white px-3 py-2.5 font-sans text-[14px] text-ink';
  const cvBad = bad.includes('cv');
  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
      <input type="hidden" name="kind" value="spontaneous" />
      <input type="hidden" name="locale" value={locale} />
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={onDrop}
        className={`flex cursor-pointer flex-col items-center gap-2.5 rounded-[18px] border-[1.5px] border-dashed bg-white p-7 text-center text-[14px] text-body transition-colors focus-within:outline-2 focus-within:outline-offset-3 focus-within:outline-yellow ${
          over ? 'border-navy' : cvBad ? 'border-danger' : 'border-line-strong'
        }`}
      >
        <UploadIcon className="text-ink" />
        <b className="text-ink">{file ?? t.drop}</b>
        <span>{t.hint}</span>
        <span className="mt-1.5 text-[13.5px] font-semibold text-ink underline underline-offset-4">
          {t.choose}
        </span>
        <input
          ref={input}
          type="file"
          name="cv"
          accept={ACCEPT}
          onChange={(e) => setFile(e.target.files?.[0]?.name ?? null)}
          className="sr-only"
        />
      </label>
      {cvBad && (
        <p className="m-0 text-[13px] font-medium text-danger">
          {bad.includes('linkedin') ? t.cvOrLinkedin : t.cvInvalid}
        </p>
      )}
      <div className="grid gap-2 sm:grid-cols-2">
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
      <input
        name="linkedin"
        type="url"
        placeholder={t.linkedin}
        aria-label={t.linkedin}
        aria-invalid={bad.includes('linkedin') || undefined}
        className={field}
      />
      <AntiSpam />
      {status === 'error' && !cvBad && (
        <p role="alert" className="m-0 text-[13px] font-medium text-danger">
          {t.error}
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-primary min-h-[52px] cursor-pointer justify-center rounded-full border-0 font-sans disabled:opacity-60"
      >
        {status === 'sending' ? t.sending : t.submit}
      </button>
      <p className="m-0 text-[12.5px] text-muted">
        {t.privacyStart}{' '}
        {privacyHref ? (
          <Link href={privacyHref} className="text-ink underline">
            {t.privacyLink}
          </Link>
        ) : (
          t.privacyLink
        )}
        .
      </p>
    </form>
  );
}
