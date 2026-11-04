import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/config/site';
import { ptToBr } from '@/content/technologies/templates';
import type { Dictionary } from '@/dictionaries';
import { daysSince, getJobs } from '@/lib/jobs';
import type { Job } from '@/lib/jobs';
import type { Locale } from '@/lib/i18n/locales';
import { pathFor } from '@/lib/routing';
import { faqLd } from '@/lib/seo/jsonld';
import { JsonLd } from '@/components/seo/JsonLd';
import { ArrowRight, CareerIcon } from '@/components/ui/icons';
import { CvDrop } from './CvDrop';
import { JobsBoard } from './JobsBoard';
import type { JobView } from './JobsBoard';

/**
 * Carreiras v3 e Vagas v1 (docs/design/carreiras-v3.dc.html, vagas-v1.dc.html).
 * Textos em dict.careers e dict.jobs; vagas de lib/jobs (exemplos até a API do ATS chegar).
 * Medidas copiadas dos mockups.
 */
type Base = { locale: Locale; dict: Dictionary };

/** Etiquetas do mapa: posição em % do mapa (public/images/careers/map-zoom.svg). */
const MAP_LABELS = [
  { id: 'us', left: 35.45, top: 31.45 },
  { id: 'br', left: 57.27, top: 65.2 },
  { id: 'pt', left: 75.77, top: 30.61 },
] as const;

const sec = 'py-[clamp(64px,8vw,112px)]';
const h2 =
  'm-0 font-display text-[clamp(30px,3.4vw,44px)] leading-[1.1] font-semibold tracking-[-0.02em]';
const eyebrow = 'eyebrow m-0 text-[12.5px]';
const lead = 'm-0 max-w-[620px] text-[16.5px] leading-[1.7]';

export async function CareersPage({ locale, dict }: Base) {
  const t = dict.careers;
  const { jobs } = await getJobs();
  const jobsHref = pathFor(locale, { kind: 'jobs' });
  const featured = jobs.slice(0, 6).map((j) => toView(j, locale, dict));
  const labels = dict.jobs;

  return (
    <>
      {/* Topo: promessa sobre um mapa de pontos em zoom (Américas e Península Ibérica),
          com EUA, Brasil e Portugal em destaque (mockup "Carreiras · topo com mapa em zoom") */}
      <section className="crz relative overflow-hidden bg-navy text-white">
        <div className="crz-map" aria-hidden="true">
          <Image
            src="/images/careers/map-zoom.svg"
            alt=""
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
          {MAP_LABELS.map((m) => (
            <span
              key={m.id}
              className={`crz-lab crz-${m.id}`}
              style={{ left: `${m.left}%`, top: `${m.top}%` }}
            >
              {t.mapLabels[m.id]}
            </span>
          ))}
        </div>
        <div className="container-site relative z-[2] w-full">
          <div className="max-w-[540px] py-[clamp(56px,7vw,104px)] max-[960px]:pb-0">
            <p className={`${eyebrow} text-yellow`}>{t.eyebrow}</p>
            <h1 className="mt-3.5 mb-0 font-display text-[clamp(40px,4.6vw,62px)] leading-[1.04] font-semibold tracking-[-0.03em]">
              {t.titleStart}
              <br />
              <span className="cr-mark">{t.titleMark}</span>
            </h1>
            <p className="mt-[22px] mb-0 max-w-[520px] text-[17.5px] leading-[1.7] text-on-navy">
              {t.lead}
            </p>
            <div className="mt-[34px] flex flex-wrap items-center gap-x-7 gap-y-3">
              {jobsHref && (
                <Link href={jobsHref} className="btn-primary min-h-[52px] rounded-full px-[26px]">
                  {t.ctaJobs} <ArrowRight strokeWidth={2.2} />
                </Link>
              )}
              <a
                href="#cv"
                className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-white no-underline hover:text-yellow"
              >
                {t.ctaCv} <ArrowRight />
              </a>
            </div>
            <ul className="mt-10 mb-0 flex max-w-[540px] list-none overflow-hidden rounded-2xl border border-white/12 bg-navy/60 p-0 backdrop-blur-[2px] max-[560px]:flex-col">
              {[
                { b: site.facts.jobsManaged, s: t.factJobs, y: true },
                { b: String(site.markets.length), s: t.factMarkets },
                { b: t.factRemote, s: t.factRemoteLabel },
              ].map((f) => (
                <li
                  key={f.s}
                  className="flex min-w-0 flex-1 flex-col gap-1 border-r border-white/12 px-5 py-4 last:border-r-0 max-[560px]:border-r-0 max-[560px]:border-b max-[560px]:last:border-b-0"
                >
                  <b
                    className={`font-display text-[24px] font-semibold ${f.y ? 'text-yellow' : ''}`}
                  >
                    {f.b}
                  </b>
                  <span className="text-[12.5px] text-on-navy-2">{f.s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Porquê a Yellowipe */}
      <section className="bg-white">
        <div className={`container-site ${sec}`}>
          <Head eyebrow={t.whyEyebrow} title={t.whyTitle} />
          <div className="mt-11 grid grid-cols-3 gap-[18px] max-[960px]:grid-cols-1">
            {t.why.map((w) => (
              <article
                key={w.title}
                className="rv flex flex-col gap-2.5 rounded-[20px] border border-line bg-white p-[26px] transition-[transform,box-shadow] duration-[450ms] ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:shadow-[0_22px_44px_-24px_rgba(6,25,58,0.3)]"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-[14px] bg-warm text-navy">
                  <CareerIcon id={w.icon} />
                </span>
                <h3 className="mt-1 mb-0 font-display text-[19px] font-semibold">{w.title}</h3>
                <p className="m-0 text-[14.5px] leading-[1.65] text-body">
                  <Pending text={w.text} />
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Duas formas de trabalhar */}
      <section className="bg-navy text-white">
        <div className={`container-site ${sec}`}>
          <Head eyebrow={t.pathsEyebrow} title={t.pathsTitle} lead={t.pathsLead} dark />
          <div className="mt-11 grid grid-cols-2 gap-[18px] max-[960px]:grid-cols-1">
            {t.paths.map((p) => (
              <article
                key={p.title}
                className="rv flex flex-col gap-3.5 rounded-[20px] border border-white/12 bg-white/[0.04] p-7"
              >
                <span className="self-start rounded-full bg-yellow px-2.5 py-1 font-mono text-[11px] font-semibold tracking-[0.08em] text-navy uppercase">
                  {p.tag}
                </span>
                <h3 className="m-0 font-display text-[22px] font-semibold">{p.title}</h3>
                <p className="m-0 text-[14.5px] leading-[1.65] text-on-navy">{p.text}</p>
                <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[14px]">
                  {p.items.map((x) => (
                    <li key={x} className="flex gap-2.5">
                      <i
                        aria-hidden="true"
                        className="mt-2 size-1.5 flex-none rounded-[2px] bg-yellow"
                      />
                      <span>
                        <Pending text={x} />
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="bg-surface">
        <div className={`container-site ${sec}`}>
          <Head eyebrow={t.stepsEyebrow} title={t.stepsTitle} />
          <ol className="m-0 mt-11 grid list-none grid-cols-4 gap-4 p-0 max-[960px]:grid-cols-2 max-[560px]:grid-cols-1">
            {t.steps.map((s, i) => (
              <li
                key={s.title}
                className="cr-step rv relative rounded-[18px] border border-line bg-white p-6"
              >
                <span className="font-mono text-[13px] text-gold">0{i + 1}</span>
                <h3 className="mt-2 mb-1.5 text-[17px] font-semibold">{s.title}</h3>
                <p className="m-0 text-[14px] leading-[1.6] text-body">
                  <Pending text={s.text} />
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Vagas em destaque */}
      {featured.length > 0 && (
        <section id="vagas" className="bg-white">
          <div className={`container-site ${sec}`}>
            <div className="flex flex-wrap items-end justify-between gap-5">
              <Head eyebrow={t.jobsEyebrow} title={t.jobsTitle} />
              {jobsHref && (
                <Link
                  href={jobsHref}
                  className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-ink no-underline hover:text-gold"
                >
                  {t.seeAllJobs.replace('{n}', String(jobs.length))}{' '}
                  <ArrowRight size={15} strokeWidth={2.2} />
                </Link>
              )}
            </div>
            <ul className="m-0 mt-9 grid list-none grid-cols-3 gap-4 p-0 max-[960px]:grid-cols-1">
              {featured.map((j) => (
                <li key={j.id}>
                  <Link
                    href={jobsHref ? `${jobsHref}#vaga-${j.id}` : '#'}
                    className="rv flex h-full flex-col gap-3 rounded-[18px] border border-line p-[22px] text-ink no-underline transition-[transform,border-color,box-shadow] duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-[3px] hover:border-line-strong hover:text-ink hover:shadow-[0_18px_36px_-24px_rgba(6,25,58,0.35)]"
                  >
                    <span className="flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-warm px-2.5 py-1 text-[12px] font-semibold text-gold">
                        {labels.contract[j.contract]}
                      </span>
                      <span className="rounded-full bg-surface px-2.5 py-1 text-[12px] font-medium text-body">
                        {labels.seniority[j.seniority as Job['seniority']]}
                      </span>
                      <span className="rounded-full bg-surface px-2.5 py-1 text-[12px] font-medium text-body">
                        {labels.mode[j.mode as Job['mode']]}
                      </span>
                    </span>
                    <h3 className="m-0 font-display text-[19px] font-semibold">{j.title}</h3>
                    <span className="text-[13.5px] text-muted">{j.location}</span>
                    <span className="mt-auto flex flex-wrap gap-1.5">
                      {j.tech.map((x) => (
                        <i
                          key={x}
                          className="rounded-md border border-line px-[7px] py-[3px] font-mono text-[11px] text-muted not-italic"
                        >
                          {x}
                        </i>
                      ))}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Depoimentos */}
      <section className="bg-white">
        <div className={`container-site ${sec} ${featured.length > 0 ? 'pt-0' : ''}`}>
          <Head eyebrow={t.quotesEyebrow} title={t.quotesTitle} />
          <div className="mt-10 grid grid-cols-3 gap-[18px] max-[960px]:grid-cols-1">
            {t.quotes.map((q, i) => (
              <figure
                key={i}
                className="rv m-0 flex flex-col gap-4 rounded-[20px] bg-surface p-[26px]"
              >
                <p className="m-0 font-display text-[17px] leading-[1.5]">“{q.text}”</p>
                <figcaption className="flex items-center gap-2.5 text-[13px] text-muted">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-9 items-center justify-center rounded-full bg-line font-mono text-[11px] text-[#3A4558]"
                  >
                    {q.initials}
                  </span>
                  <span>
                    <b className="text-ink">{q.name}</b> · {q.role}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Perguntas frequentes */}
      <section className="bg-surface">
        <div
          className={`container-site grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] items-start gap-12 max-[960px]:grid-cols-1 ${sec}`}
        >
          <div className="sticky top-[110px] max-[960px]:static">
            <Head eyebrow={t.faqEyebrow} title={t.faqTitle} />
          </div>
          <div className="border-t border-line">
            {t.faq.map((f, i) => (
              <details
                key={f.q}
                name="faq-carreiras"
                open={i === 0}
                className="group border-b border-line"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[16.5px] font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="text-[22px] transition-transform duration-[350ms] ease-[cubic-bezier(.22,1,.36,1)] group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="m-0 mb-5 max-w-[640px] text-[15px] leading-[1.7] text-body">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CV espontâneo */}
      <section id="cv" className="scroll-mt-24 bg-white">
        <div className={`container-site ${sec}`}>
          <div className="rv grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center gap-10 rounded-3xl bg-warm p-[clamp(28px,4vw,48px)] max-[960px]:grid-cols-1">
            <Head eyebrow={t.cvEyebrow} title={t.cvTitle} lead={t.cvLead} />
            <CvDrop
              locale={locale}
              privacyHref={pathFor(locale, { kind: 'privacy' })}
              texts={{
                drop: t.cvDrop,
                hint: t.cvHint,
                choose: t.cvChoose,
                submit: t.cvSubmit,
                name: labels.name,
                email: labels.email,
                linkedin: labels.linkedin,
                sending: labels.sending,
                done: labels.done,
                error: labels.error,
                cvOrLinkedin: labels.cvOrLinkedin,
                cvInvalid: labels.cvInvalid,
                privacyStart: labels.privacyStart,
                privacyLink: labels.privacyLink,
              }}
            />
          </div>
        </div>
      </section>

      <JsonLd data={faqLd(t.faq)} />
    </>
  );
}

export async function JobsPage({ locale, dict }: Base) {
  const t = dict.jobs;
  const { jobs } = await getJobs();
  const views = jobs.map((j) => toView(j, locale, dict));
  const careers = pathFor(locale, { kind: 'careers' });

  // Só mostra opções que existem nas vagas (ex.: "Presencial" desaparece sem vagas presenciais).
  const opts = <K extends 'area' | 'seniority' | 'region' | 'mode' | 'contract'>(
    key: K,
    names: Record<string, string>,
  ) =>
    Object.entries(names)
      .filter(([value]) => views.some((v) => v[key] === value))
      .map(([value, label]) => ({ value, label }));

  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-site pt-[clamp(48px,6vw,80px)] pb-[clamp(72px,8vw,104px)] text-center">
          <p className={`${eyebrow} text-yellow`}>{t.count.replace('{n}', String(jobs.length))}</p>
          <h1 className="mt-3 mb-0 font-display text-[clamp(38px,4.6vw,60px)] leading-[1.05] font-semibold tracking-[-0.03em]">
            {t.titleStart} <span className="cr-mark">{t.titleMark}</span>
          </h1>
          <p className={`${lead} mx-auto mt-[18px] text-center text-on-navy`}>{t.lead}</p>
        </div>
      </section>
      <JobsBoard
        locale={locale}
        jobs={views}
        groups={[
          { key: 'area', title: t.groupArea, options: opts('area', t.area) },
          { key: 'seniority', title: t.groupSeniority, options: opts('seniority', t.seniority) },
          { key: 'region', title: t.groupRegion, options: opts('region', t.region) },
          { key: 'mode', title: t.groupMode, options: opts('mode', t.mode) },
          { key: 'contract', title: t.groupContract, options: opts('contract', t.contract) },
        ]}
        labels={{
          area: t.area,
          seniority: t.seniority,
          region: t.region,
          mode: t.mode,
          contract: t.contract,
        }}
        contractText={t.contractText}
        cvHref={careers ? `${careers}#cv` : null}
        privacyHref={pathFor(locale, { kind: 'privacy' })}
        texts={t}
      />
    </>
  );
}

/** Vaga → dados para o quadro (idade e texto de pesquisa calculados no servidor). */
function toView(j: Job, locale: Locale, dict: Dictionary): JobView {
  const t = dict.jobs;
  const d = daysSince(j.publishedAt);
  const age =
    d === 0
      ? t.today
      : d === 1
        ? t.day
        : d < 7
          ? t.days.replace('{n}', String(d))
          : d < 14
            ? t.week
            : t.weeks.replace('{n}', String(Math.floor(d / 7)));
  // Os exemplos estão em pt-PT; em pt-BR adaptam-se. As vagas da API vêm no idioma do ATS.
  const tr = (s: string) => (locale === 'br' ? ptToBr(s) : s);
  return {
    id: j.id,
    title: j.title,
    area: j.area,
    seniority: j.seniority,
    region: j.region,
    mode: j.mode,
    contract: j.contract,
    location: j.location,
    tech: j.tech,
    english: j.english,
    age,
    about: tr(j.about),
    requirements: j.requirements.map(tr),
    search: [j.title, j.location, ...j.tech, t.area[j.area]].join(' ').toLowerCase(),
  };
}

function Head({
  eyebrow: e,
  title,
  lead: l,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  dark?: boolean;
}) {
  return (
    <div className="rv flex max-w-[760px] flex-col gap-3.5">
      <p className={`${eyebrow} ${dark ? 'text-yellow' : 'text-gold'}`}>{e}</p>
      <h2 className={h2}>{title}</h2>
      {l && <p className={`${lead} ${dark ? 'text-on-navy' : 'text-body'}`}>{l}</p>}
    </div>
  );
}

/** Pendentes [ ] em destaque, como no mockup (o content:check também os apanha). */
function Pending({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('[') ? (
          <span key={i} className="rounded bg-warm px-1 font-mono text-[0.86em] text-gold">
            {p}
          </span>
        ) : (
          p
        ),
      )}
    </>
  );
}
