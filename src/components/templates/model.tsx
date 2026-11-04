import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { absoluteUrl, site } from '@/config/site';
import { getContent, publishedCases } from '@/content';
import type { Model } from '@/content/schema';
import type { Dictionary } from '@/dictionaries';
import type { Locale } from '@/lib/i18n/locales';
import { pathFor } from '@/lib/routing';
import { breadcrumbLd, faqLd, localizeFaq, serviceLd } from '@/lib/seo/jsonld';
import { ContactBlock } from '@/components/forms/ContactBlock';
import { LogosStrip } from '@/components/home/HomeSections';
import { ModelViz } from '@/components/models/ModelViz';
import { JsonLd } from '@/components/seo/JsonLd';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { ArrowRight, BenefitIcon, CheckIcon, Sparkle } from '@/components/ui/icons';

/**
 * Página de modelo: Contrate, Reforce e Construa (mockup docs/design/modelo-v2.dc.html,
 * ilustração V4). Os textos vêm de `model.page` (camada de conteúdo) e do dicionário;
 * este ficheiro só decide a apresentação. Medidas copiadas do mockup.
 */
type Props = { locale: Locale; dict: Dictionary; model: Model };

const L = <T,>(v: { pt: T; br?: T; en?: T }, locale: Locale): T => v[locale] ?? v.pt;

const sectionPad = 'py-[clamp(72px,9vw,120px)]';
const h2Class =
  'm-0 font-display text-[clamp(30px,3.4vw,44px)] leading-[1.12] font-medium tracking-[-0.02em]';
const leadClass = 'm-0 max-w-[620px] text-[16.5px] leading-[1.7]';
const eyebrowClass = 'eyebrow m-0 text-[12.5px]';
const ctaClass =
  'btn-primary min-h-[52px] rounded-full px-[26px] [&_svg]:transition-transform hover:[&_svg]:translate-x-[3px]';
const linkClass =
  'inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold no-underline [&_svg]:transition-transform hover:[&_svg]:translate-x-[3px]';

export function ModelPage({ locale, dict, model }: Props) {
  const t = dict.modelPage;
  const page = L(model.page, locale);
  const { models, responsibilities, modelStackLogos } = getContent();
  const href = pathFor(locale, { kind: 'model', id: model.id })!;
  const home = pathFor(locale, { kind: 'home' })!;
  const hub = pathFor(locale, { kind: 'servicesHub' });
  const techHub = pathFor(locale, { kind: 'technologiesHub' });
  const casesHub = pathFor(locale, { kind: 'casesHub' });
  const name = L(model.name, locale);
  const steps = L(model.howItWorks, locale);
  const faq = localizeFaq(model.faq, locale);
  // Os CTAs levam ao formulário no fim da própria página (ContactBlock).
  const cta = (position: string) => ({
    href: '#contacto',
    ctaId: `modelo-${model.id}-${position}`,
    position,
    pageType: 'modelo',
    model: model.id,
  });

  const crumbs = [
    { name: dict.common.home, href: home },
    ...(hub ? [{ name: dict.templates.allServicesTitle, href: hub }] : []),
    { name, href },
  ];

  // Casos: primeiro os do modelo, depois os restantes, até três (como no mockup).
  const cases = [...publishedCases(locale)]
    .sort((a, b) => Number(model.caseIds.includes(b.id)) - Number(model.caseIds.includes(a.id)))
    .slice(0, 3)
    .map((c) => ({ c, href: pathFor(locale, { kind: 'case', id: c.id }) }));

  const others = models
    .filter((m) => m.id !== model.id)
    .map((m) => ({ m, href: pathFor(locale, { kind: 'model', id: m.id }) }))
    .filter((x): x is typeof x & { href: string } => x.href !== null);

  return (
    <>
      {/* Topo: promessa à esquerda, ilustração V4 à direita */}
      <section className="relative overflow-hidden bg-navy text-white">
        <Image
          src="/images/hero-tree.png"
          alt=""
          aria-hidden="true"
          width={1324}
          height={1500}
          className="pointer-events-none absolute -bottom-[60px] -left-[140px] h-auto w-[460px] opacity-[0.14]"
        />
        <div className="container-site relative grid grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-center gap-[clamp(40px,5vw,72px)] pt-[clamp(56px,7vw,96px)] pb-[clamp(64px,8vw,112px)] max-[960px]:grid-cols-1">
          <div>
            {/* Sem breadcrumb visível; o caminho fica só no JSON-LD (BreadcrumbList). */}
            <p className={`${eyebrowClass} text-yellow`}>
              {name} · {L(model.keyword, locale)}
            </p>
            <h1 className="mt-3.5 mb-0 font-display text-[clamp(38px,4.2vw,56px)] leading-[1.05] font-semibold tracking-[-0.03em]">
              {page.hero.h1} <span className="text-yellow">{page.hero.h1Highlight}</span>
            </h1>
            <p className="mt-[22px] mb-0 max-w-[560px] text-[17.5px] leading-[1.7] text-on-navy">
              {page.hero.lead}
            </p>
            <ul className="mt-[26px] mb-0 flex list-none flex-wrap gap-2 p-0">
              {page.hero.badges.map((b) => (
                <li
                  key={b}
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-[13px] py-[7px] text-[13px] text-on-navy"
                >
                  <i aria-hidden="true" className="size-1.5 flex-none rounded-full bg-yellow" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-[34px] flex flex-wrap items-center gap-x-7 gap-y-3">
              <TrackedLink {...cta('hero')} className={ctaClass}>
                {page.hero.cta} <ArrowRight strokeWidth={2.2} />
              </TrackedLink>
              <a href="#como-funciona" className={`${linkClass} text-white hover:text-yellow`}>
                {t.seeHow} <ArrowRight />
              </a>
            </div>
          </div>
          <ModelViz
            viz={page.viz}
            label={page.hero.vizLabel}
            texts={{ yellowipe: site.name, client: t.client }}
          />
        </div>
      </section>

      <LogosStrip />

      {/* Quem faz o quê: a mesma tabela nas três páginas, com a coluna do modelo em destaque */}
      <section className="bg-white pt-[clamp(56px,7vw,96px)] pb-[clamp(72px,9vw,120px)]">
        <div className="container-site flex flex-col gap-10">
          <Head eyebrow={t.whoEyebrow} title={t.whoTitle} lead={page.whoLead} />
          <div className="rv max-[960px]:-mx-6 max-[960px]:overflow-x-auto max-[960px]:px-6">
            <div
              role="table"
              aria-label={t.whoLabel}
              className="mp-table flex flex-col text-[14.5px] max-[960px]:min-w-[620px]"
            >
              <div role="row" className="grid grid-cols-[1.3fr_1fr_1fr_1fr]">
                <span role="columnheader" className={`${cell} ${headCell}`}>
                  {t.whoHeader}
                </span>
                {models.map((m) => {
                  const cur = m.id === model.id;
                  const mh = pathFor(locale, { kind: 'model', id: m.id });
                  return (
                    <span
                      key={m.id}
                      role="columnheader"
                      className={`${cell} ${headCell} ${cur ? 'is-cur border-b-navy! bg-navy text-yellow!' : ''}`}
                    >
                      {cur || !mh ? (
                        L(m.name, locale)
                      ) : (
                        <Link href={mh} className="text-inherit no-underline hover:text-ink">
                          {L(m.name, locale)}
                        </Link>
                      )}
                    </span>
                  );
                })}
              </div>
              {responsibilities.map((r) => (
                <div key={r.label.pt} role="row" className="grid grid-cols-[1.3fr_1fr_1fr_1fr]">
                  <span role="rowheader" className={`${cell} font-semibold`}>
                    {L(r.label, locale)}
                  </span>
                  {models.map((m) => {
                    const yw = r.owner[m.id] === 'y';
                    return (
                      <span
                        key={m.id}
                        role="cell"
                        className={`${cell} ${m.id === model.id ? 'is-cur bg-warm' : ''}`}
                      >
                        <span
                          className={`inline-flex items-center gap-[7px] rounded-full px-[11px] py-[5px] text-[13px] font-semibold ${
                            yw
                              ? 'bg-navy text-white'
                              : 'border border-line-strong bg-white text-ink'
                          }`}
                        >
                          <i
                            aria-hidden="true"
                            className={`size-[7px] rounded-[2px] ${yw ? 'bg-yellow' : 'bg-line-strong'}`}
                          />
                          {yw ? site.name : t.client}
                        </span>
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Porquê este modelo */}
      <section className="bg-white">
        <div className={`container-site flex flex-col gap-12 ${sectionPad}`}>
          <Head eyebrow={page.why.eyebrow} title={page.why.title} lead={page.why.lead} />
          <div className="grid grid-cols-3 gap-[18px] max-[960px]:grid-cols-1">
            {page.why.items.map((b) => (
              <article
                key={b.title}
                className="mp-card rv relative flex flex-col gap-3 overflow-hidden rounded-[18px] border border-line bg-white p-7"
              >
                <span className="inline-flex size-11 flex-none items-center justify-center rounded-xl bg-warm text-gold">
                  <BenefitIcon id={b.icon} />
                </span>
                <h3 className="mt-1.5 mb-0 font-display text-[19px] leading-[1.25] font-semibold">
                  {b.title}
                </h3>
                <p className="m-0 text-[14.5px] leading-[1.65] text-body">{b.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Formatos e os outros dois modelos */}
      <section className="bg-surface">
        <div className={`container-site flex flex-col gap-11 ${sectionPad}`}>
          <Head eyebrow={t.formatsEyebrow} title={page.formats.title} lead={page.formats.lead} />
          <div>
            <div className="grid grid-cols-2 gap-[18px] max-[960px]:grid-cols-1">
              {page.formats.items.map((f) => (
                <article
                  key={f.title}
                  className="mp-lift rv flex flex-col gap-3.5 rounded-[20px] border border-line bg-white p-8"
                >
                  <Tag>{f.tag}</Tag>
                  <h3 className="m-0 font-display text-[24px] font-semibold tracking-[-0.01em]">
                    {f.title}
                  </h3>
                  <p className="m-0 text-[15px] leading-[1.65] text-body">{f.text}</p>
                  <ul className="mt-1.5 mb-0 flex list-none flex-col gap-2.5 border-t border-line p-0 pt-4 text-[14.5px]">
                    {f.ticks.map((k) => (
                      <li key={k} className="flex items-start gap-2.5">
                        <CheckIcon className="mt-0.5 flex-none text-gold" />
                        {k}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            {others.length > 0 && (
              <div className="rv mt-[18px] grid grid-cols-[auto_repeat(2,minmax(0,1fr))] items-stretch gap-[18px] max-[960px]:grid-cols-1">
                <span className="self-center pr-3 font-mono text-[12px] tracking-[0.1em] text-muted uppercase">
                  {t.alsoAvailable}
                </span>
                {others.map(({ m, href: mh }) => (
                  <Link
                    key={m.id}
                    href={mh}
                    className="group flex items-center gap-4 rounded-2xl border border-line bg-white px-5 py-[18px] text-ink no-underline transition-colors duration-300 hover:border-navy hover:text-ink"
                  >
                    <Tag>{L(m.name, locale)}</Tag>
                    <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
                      <b className="text-[15px]">{L(m.keyword, locale)}</b>
                      <small className="text-[13px] text-muted">{L(m.page, locale).tagline}</small>
                    </span>
                    <ArrowRight
                      size={18}
                      className="flex-none transition-transform duration-[250ms] group-hover:translate-x-1"
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="bg-navy text-white">
        <div className={`container-site flex flex-col gap-12 ${sectionPad}`}>
          <Head
            eyebrow={dict.templates.howItWorks}
            title={page.steps.title}
            lead={page.steps.lead}
            dark
          />
          <ol className="m-0 grid list-none grid-cols-4 gap-[18px] p-0 max-[960px]:grid-cols-1">
            {steps.map((s, i) => (
              <li
                key={s.title}
                style={{ '--sd': `${i * 3}s` } as CSSProperties}
                className="mp-step rv relative flex flex-col gap-2.5 overflow-hidden rounded-[18px] border border-white/12 bg-white/[0.03] px-6 pt-[26px] pb-7"
              >
                <span className="font-mono text-[12px] text-yellow">0{i + 1}</span>
                <h3 className="m-0 font-display text-[20px] font-semibold">{s.title}</h3>
                <p className="m-0 text-[14.5px] leading-[1.65] text-on-navy">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Tecnologias: texto à esquerda, logótipos em faixa contínua à direita */}
      <section className="overflow-hidden bg-surface">
        <div
          className={`container-site grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] items-center gap-[clamp(40px,5vw,72px)] max-[960px]:grid-cols-1 ${sectionPad}`}
        >
          <div className="rv flex flex-col gap-4">
            <p className={`${eyebrowClass} text-gold`}>{dict.templates.technologies}</p>
            <h2 className={h2Class}>{page.stack.title}</h2>
            <p className={`${leadClass} text-body`}>{page.stack.lead}</p>
            <div className="mt-2.5 flex flex-wrap items-center gap-x-[26px] gap-y-3">
              <TrackedLink {...cta('tecnologias')} className={ctaClass}>
                {page.stack.cta} <ArrowRight strokeWidth={2.2} />
              </TrackedLink>
              {techHub && (
                <Link href={techHub} className={`${linkClass} text-ink hover:text-gold`}>
                  {t.allTechnologies}
                </Link>
              )}
            </div>
          </div>
          <div
            role="group"
            aria-label={dict.templates.technologies}
            className="mp-logos flex flex-col gap-3.5"
          >
            {modelStackLogos.map((row, r) => (
              <div key={r} className="overflow-hidden py-1.5">
                <ul
                  className="mp-logo-track m-0 flex w-max list-none gap-3.5 p-0"
                  style={{ '--dur': `${[52, 60, 48][r]}s` } as CSSProperties}
                >
                  {[...row, ...row].map((tech, i) => (
                    <li
                      key={`${tech.name}-${i}`}
                      aria-hidden={i >= row.length || undefined}
                      className="mp-logo-card box-border flex min-h-[66px] items-center gap-3 rounded-2xl border border-line bg-white py-3.5 pr-5 pl-4 text-[15.5px] font-medium whitespace-nowrap text-ink shadow-[0_1px_0_rgba(6,25,58,0.03)] max-[960px]:min-h-14 max-[960px]:py-2.5 max-[960px]:pr-4 max-[960px]:pl-3 max-[960px]:text-[14px]"
                    >
                      <Image
                        src={tech.logo}
                        alt=""
                        width={34}
                        height={34}
                        className="size-[34px] flex-none object-contain max-[960px]:size-7"
                      />
                      {tech.name}
                      {'ai' in tech && <Sparkle className="-mt-0.5 -ml-1.5 size-2.5 self-start" />}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Casos de sucesso */}
      {cases.length > 0 && (
        <section className="bg-navy text-white">
          <div className={`container-site flex flex-col gap-11 ${sectionPad}`}>
            <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
              <Head eyebrow={dict.cases.eyebrow} title={t.casesTitle} dark />
              {casesHub && (
                <Link href={casesHub} className={`rv ${linkClass} text-white hover:text-yellow`}>
                  {t.seeAllCases} <ArrowRight />
                </Link>
              )}
            </div>
            <div className="grid grid-cols-3 gap-[18px] max-[960px]:grid-cols-1">
              {cases.map(({ c, href: ch }) => {
                const body = (
                  <>
                    <div
                      className={`h-[180px] overflow-hidden bg-navy-2 ${
                        c.imageFit === 'contain'
                          ? 'box-border flex items-end justify-center pt-4'
                          : ''
                      }`}
                    >
                      <Image
                        src={c.image}
                        alt=""
                        width={1024}
                        height={480}
                        sizes="(min-width: 961px) 380px, 100vw"
                        className={
                          c.imageFit === 'contain'
                            ? 'h-auto w-[72%] object-contain'
                            : 'size-full object-cover object-left-top transition-transform duration-[800ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]'
                        }
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-2.5 p-6">
                      <Image
                        src={c.logo}
                        alt={c.client}
                        width={390}
                        height={120}
                        className="h-[22px] w-auto self-start"
                      />
                      <p className="m-0 font-display text-[24px] leading-[1.15] font-semibold text-yellow">
                        {L(c.headline, locale)}
                      </p>
                      <p className="m-0 text-[14.5px] leading-[1.6] text-on-navy">
                        {L(c.summary, locale)}
                      </p>
                    </div>
                  </>
                );
                const card =
                  'group rv flex flex-col overflow-hidden rounded-[18px] border border-white/12 bg-white/[0.04] text-white no-underline';
                return ch ? (
                  <Link
                    key={c.id}
                    href={ch}
                    className={`${card} transition-[transform,border-color] duration-[450ms] ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:border-white/[0.26] hover:text-white`}
                  >
                    {body}
                  </Link>
                ) : (
                  <div key={c.id} className={card}>
                    {body}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Comparação com as alternativas */}
      <section className="bg-white">
        <div className={`container-site flex flex-col gap-10 ${sectionPad}`}>
          <Head eyebrow={t.comparisonEyebrow} title={page.comparison.title} />
          <div className="rv max-[960px]:-mx-6 max-[960px]:overflow-x-auto max-[960px]:px-6">
            <div
              role="table"
              aria-label={page.comparison.title}
              className="mp-table flex flex-col text-[14.5px] max-[960px]:min-w-[640px]"
            >
              <div role="row" className="grid grid-cols-[1.1fr_1fr_1fr_1fr]">
                <span
                  role="columnheader"
                  className={`${cell} ${headCell} gap-2.5 text-transparent!`}
                >
                  {t.criterion}
                </span>
                {page.comparison.columns.map((col, i) => (
                  <span
                    key={col}
                    role="columnheader"
                    className={`${cell} ${headCell} gap-2.5 ${i === 0 ? 'is-cur border-b-navy! bg-navy text-yellow!' : ''}`}
                  >
                    {col}
                  </span>
                ))}
              </div>
              {page.comparison.rows.map((r) => (
                <div
                  key={r.label}
                  role="row"
                  className="grid grid-cols-[1.1fr_1fr_1fr_1fr] transition-colors duration-[250ms] hover:bg-surface"
                >
                  <span role="rowheader" className={`${cell} gap-2.5 font-semibold`}>
                    {r.label}
                  </span>
                  {r.cells.map((c, i) => (
                    <span
                      key={i}
                      role="cell"
                      className={`${cell} gap-2.5 ${i === 0 ? 'is-cur bg-warm font-semibold' : ''}`}
                    >
                      <span
                        aria-hidden="true"
                        className={`inline-flex size-[22px] flex-none items-center justify-center rounded-full text-[12px] font-bold ${MARK[c.tone].cls}`}
                      >
                        {MARK[c.tone].glyph}
                      </span>
                      {c.text}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Perguntas frequentes: todas as respostas no HTML (details) */}
      {faq.length > 0 && (
        <section className="bg-surface">
          <div className={`container-site flex flex-col gap-10 ${sectionPad}`}>
            <Head eyebrow={dict.templates.faq} title={page.faqTitle} />
            <div className="flex max-w-[860px] flex-col gap-2.5">
              {faq.map((f, i) => (
                <details
                  key={f.q}
                  name="faq-modelo"
                  open={i === 0}
                  className="group rounded-2xl border border-line bg-white"
                >
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-[22px] py-5 text-[16px] font-semibold text-ink hover:text-link-hover [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span
                      aria-hidden="true"
                      className="inline-flex size-7 flex-none items-center justify-center rounded-full bg-surface transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-open:rotate-45"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </summary>
                  <p className="m-0 px-[22px] pb-[22px] text-[15px] leading-[1.7] text-body">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Próximo passo: formulário na própria página */}
      <ContactBlock
        locale={locale}
        dict={dict}
        formId={`modelo-${model.id}`}
        ctaId={`modelo-${model.id}-formulario`}
        eyebrow={t.finalEyebrow}
        title={page.finalTitle}
        lead={t.finalLead}
        model={model.id}
      />

      <JsonLd
        data={breadcrumbLd(crumbs.map((c) => ({ name: c.name, url: absoluteUrl(c.href) })))}
      />
      <JsonLd
        data={serviceLd({
          name: L(model.keyword, locale),
          description: L(model.promise, locale),
          url: absoluteUrl(href),
          locale,
        })}
      />
      <JsonLd data={faqLd(faq)} />
    </>
  );
}

const cell = 'flex items-center border-b border-line px-[18px] py-[15px]';
const headCell =
  'border-b-line-strong font-mono text-[11.5px] font-medium tracking-[0.1em] text-muted uppercase';

const MARK = {
  good: { glyph: '✓', cls: 'bg-[#DDF3E8] text-[#12704A]' },
  mid: { glyph: '–', cls: 'bg-[#EEF1F5] text-[#5B6475]' },
  bad: { glyph: '✕', cls: 'bg-[#FBE5E2] text-[#A3271A]' },
} as const;

function Head({
  eyebrow,
  title,
  lead,
  dark = false,
  narrow = false,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  dark?: boolean;
  narrow?: boolean;
}) {
  return (
    <div className="rv flex max-w-[760px] flex-col gap-4">
      <p className={`${eyebrowClass} ${dark ? 'text-yellow' : 'text-gold'}`}>{eyebrow}</p>
      <h2 className={`${h2Class} ${narrow ? 'max-w-[640px]' : ''}`}>{title}</h2>
      {lead && <p className={`${leadClass} ${dark ? 'text-on-navy' : 'text-body'}`}>{lead}</p>}
    </div>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="flex-none self-start rounded-md bg-warm px-2 py-1 font-mono text-[11px] tracking-[0.1em] text-gold uppercase">
      {children}
    </span>
  );
}
