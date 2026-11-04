import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { site } from '@/config/site';
import { findArea, findService, getContent, publishedCases } from '@/content';
import type { Dictionary } from '@/dictionaries';
import type { Locale } from '@/lib/i18n/locales';
import { localeConfig } from '@/lib/i18n/locales';
import { pathFor } from '@/lib/routing';
import { ContactBlock } from '@/components/forms/ContactBlock';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { ArrowRight, ModelIcon, Sparkle } from '@/components/ui/icons';
import { AreasTabs } from './AreasTabs';
import type { AreaTab } from './AreasTabs';
import { MarketsAccordion } from './MarketsAccordion';
import { MarketsMapDefs } from './MarketsMapDefs';
import { RotatingAreas } from './RotatingAreas';

/**
 * Secções da home, pela ordem e com as medidas da v7 (docs/design/home-v7.dc.html).
 * Cada secção é um componente de servidor; só as partes interativas (rotação, abas,
 * mercados, formulário) correm no browser.
 */
type P = { locale: Locale; dict: Dictionary };

const sectionPad = 'py-[clamp(72px,9vw,120px)]';
const h2Class =
  'm-0 font-display text-[clamp(30px,3.4vw,42px)] leading-[1.15] font-medium tracking-[-0.02em]';
const leadClass = 'm-0 text-[16.5px] leading-[1.7]';

/** Cabeçalho centrado das secções (eyebrow mono, título e texto de apoio). */
function SectionHead({
  id,
  eyebrow,
  title,
  lead,
  dark = false,
  titleMax,
  leadMax = 'max-w-[680px]',
}: {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  dark?: boolean;
  titleMax?: string;
  leadMax?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      {eyebrow && (
        <p className={`eyebrow m-0 text-[12.5px] ${dark ? 'text-yellow' : 'text-gold'}`}>
          {eyebrow}
        </p>
      )}
      <h2 id={id} className={`${h2Class} ${titleMax ?? ''}`}>
        {title}
      </h2>
      {lead && (
        <p className={`${leadClass} ${leadMax} ${dark ? 'text-on-navy' : 'text-body'}`}>{lead}</p>
      )}
    </div>
  );
}

/** Separa a última palavra de uma frase (para a destacar a amarelo ou lhe pôr a faísca). */
function splitLast(text: string): [string, string] {
  const i = text.lastIndexOf(' ');
  return i < 0 ? ['', text] : [text.slice(0, i), text.slice(i + 1)];
}

export function Hero({ locale, dict }: P) {
  const contact = pathFor(locale, { kind: 'contact' })!;
  const rotation = dict.hero.rotation
    .map((id) => findArea(id))
    .filter((a) => a !== undefined)
    .map((a) => a.name[locale] ?? a.name.pt);

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-navy text-white">
      <Image
        src="/images/hero-tree.png"
        alt=""
        aria-hidden="true"
        width={1324}
        height={1500}
        priority
        sizes="560px"
        className="pointer-events-none absolute top-6 -right-[100px] h-auto w-[560px] max-w-none opacity-[0.26]"
      />
      <div className="relative mx-auto flex max-w-[940px] flex-col items-center gap-7 px-6 py-[clamp(88px,11vw,148px)] text-center">
        <p className="eyebrow m-0 text-yellow">{dict.hero.eyebrow}</p>
        <h1
          id="hero-title"
          className="m-0 font-display text-[clamp(40px,5.8vw,74px)] leading-[1.04] font-semibold tracking-[-0.025em]"
        >
          {dict.hero.titleStart} <span className="text-yellow">{dict.hero.titleHighlight}</span>
        </h1>
        <div className="flex max-w-[680px] flex-col items-center gap-0.5 text-[clamp(16px,1.5vw,19px)] leading-[1.7] text-on-navy">
          <p className="m-0">{dict.hero.lead}</p>
          <RotatingAreas items={rotation} />
        </div>
        <div className="mt-1 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          <TrackedLink
            href={contact}
            ctaId="hero-agendar"
            position="hero"
            pageType="home"
            className="btn-outline-light"
          >
            {dict.common.bookCall} <ArrowRight strokeWidth={2.2} className="text-yellow" />
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}

export function LogosStrip() {
  const { clientLogos } = getContent();
  // Faixa contínua a toda a largura: a animação desliza metade da faixa, e cada metade tem
  // duas cópias da lista (~2.800 px) para cobrir ecrãs largos sem emendas. Só a primeira
  // cópia é lida pelos leitores de ecrã.
  const loop = [0, 1, 2, 3].flatMap((copy) => clientLogos.map((l) => ({ ...l, dup: copy > 0 })));
  return (
    <section
      aria-label="Clientes"
      className="clients overflow-hidden border-b border-line bg-white py-10"
    >
      <div className="clients-mq">
        <ul className="clients-track m-0 flex list-none items-center p-0">
          {loop.map((l, i) => (
            <li
              key={`${l.name}-${i}`}
              className="flex h-10 items-center"
              aria-hidden={l.dup || undefined}
            >
              <Image
                src={l.src}
                alt={l.dup ? '' : l.name}
                width={l.width}
                height={l.height}
                className="w-auto"
                style={{ height: l.displayHeight }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ModelsSection({ locale, dict }: P) {
  const { models } = getContent();
  return (
    <section id="modelos" aria-labelledby="modelos-title" className="bg-white">
      <div className={`container-site flex flex-col gap-[52px] ${sectionPad}`}>
        <SectionHead
          id="modelos-title"
          eyebrow={dict.models.eyebrow}
          title={dict.models.title}
          titleMax="max-w-[760px]"
          lead={dict.models.lead}
        />
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-[18px] p-0">
          {models.map((m) => {
            const href = pathFor(locale, { kind: 'model', id: m.id });
            const card =
              'flex h-full flex-col gap-4 rounded-[18px] border border-line bg-white p-8 text-ink no-underline';
            const body = (
              <>
                <span className="flex size-[52px] items-center justify-center rounded-[14px] bg-navy text-yellow">
                  <ModelIcon id={m.id} />
                </span>
                <h3 className="m-0 font-display text-[23px] font-semibold">
                  {m.name[locale] ?? m.name.pt}
                </h3>
                <p className="m-0 text-[15px] leading-[1.65] text-body">
                  {m.promise[locale] ?? m.promise.pt}
                </p>
                <p className="m-0 text-[14px] leading-[1.6] text-muted">
                  {m.idealFor[locale] ?? m.idealFor.pt}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-2 text-[15px] font-semibold">
                  {m.keyword[locale] ?? m.keyword.pt} {href && <ArrowRight />}
                </span>
              </>
            );
            return (
              <li key={m.id}>
                {href ? (
                  <Link
                    href={href}
                    className={`${card} transition-[box-shadow,border-color] duration-200 hover:border-line-strong hover:text-ink hover:shadow-[0_10px_28px_rgb(6_25_58/0.08)]`}
                  >
                    {body}
                  </Link>
                ) : (
                  <div className={card}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function StackBand({ locale, dict }: P) {
  const { technologies } = getContent();
  const servicesHub = pathFor(locale, { kind: 'servicesHub' });
  const [titleHead, titleLast] = splitLast(dict.stack.titleStart);
  const row = (items: typeof technologies.rowA, reverse: boolean) => (
    <div className="marquee marquee-mask overflow-hidden">
      <ul
        className={`marquee-track m-0 flex w-max list-none gap-14 p-0 font-display text-[clamp(32px,4vw,56px)] leading-[1.25] font-semibold ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
      >
        {[...items, ...items].map((t, i) => {
          const duplicate = i >= items.length;
          return (
            <li
              key={`${t.name}-${i}`}
              {...(duplicate ? { 'data-duplicate': '', 'aria-hidden': true } : {})}
              className={`whitespace-nowrap transition-colors duration-[250ms] ${
                t.highlight ? 'text-navy' : 'text-[#B4BCC8] hover:text-navy'
              }`}
            >
              {t.name}
              {t.ai && <Sparkle className="ml-[0.08em] inline size-[0.42em] align-[0.9em]" />}
            </li>
          );
        })}
      </ul>
    </div>
  );
  return (
    <section aria-labelledby="stack-title" className="overflow-hidden bg-surface">
      <div className="container-site flex flex-col items-center gap-4 pt-[clamp(72px,9vw,112px)] pb-9 text-center">
        <h2 id="stack-title" className={`${h2Class} max-w-[900px]`}>
          {titleHead}{' '}
          <span className="relative inline-block">
            {titleLast}
            <Sparkle className="absolute -top-[0.12em] -right-[0.42em] size-[0.4em]" />
          </span>
          &nbsp; {dict.stack.titleEnd}
        </h2>
        <p className={`${leadClass} max-w-[660px] text-body`}>{dict.stack.lead}</p>
      </div>
      <div className="flex flex-col gap-1 pt-2 pb-5">
        {row(technologies.rowA, false)}
        {row(technologies.rowB, true)}
      </div>
      {servicesHub && (
        <div className="flex justify-center px-6 pt-2 pb-[clamp(64px,8vw,96px)]">
          <Link
            href={servicesHub}
            className="inline-flex min-h-11 items-center gap-2 border-b-[1.5px] border-navy text-[15px] font-semibold text-ink no-underline"
          >
            {dict.stack.link} <ArrowRight />
          </Link>
        </div>
      )}
    </section>
  );
}

export function AreasSection({ locale, dict }: P) {
  const { areas, models } = getContent();
  const servicesHub = pathFor(locale, { kind: 'servicesHub' });
  const tabs: AreaTab[] = areas.map((a) => {
    const name = a.name[locale] ?? a.name.pt;
    return {
      id: a.id,
      tabLabel: a.tabLabel[locale] ?? a.tabLabel.pt,
      name,
      short: name.charAt(0).toLocaleLowerCase(localeConfig[locale].hreflang) + name.slice(1),
      description: a.description[locale] ?? a.description.pt,
      ai: a.ai[locale] ?? a.ai.pt,
      proof: a.proof ? (a.proof[locale] ?? a.proof.pt) : undefined,
      models: models.map((m) => ({
        label: m.name[locale] ?? m.name.pt,
        active: a.models.includes(m.id),
      })),
      services: a.serviceIds
        .map((id) => findService(id))
        .filter((s) => s !== undefined)
        .map((s) => ({
          id: s.id,
          name: s.name[locale] ?? s.name.pt,
          summary: s.summary[locale] ?? s.summary.pt,
          href: pathFor(locale, { kind: 'service', id: s.id }),
        })),
    };
  });

  return (
    <section id="areas" aria-labelledby="areas-title" className="bg-white">
      <div className={`container-site flex flex-col gap-11 ${sectionPad}`}>
        <SectionHead
          id="areas-title"
          eyebrow={dict.areas.eyebrow}
          title={dict.areas.title}
          leadMax="max-w-[700px]"
          lead={
            <>
              {dict.areas.leadStart}{' '}
              <strong className="font-semibold text-ink">{dict.areas.leadStrong}</strong>{' '}
              {dict.areas.leadEnd}
            </>
          }
        />
        <AreasTabs
          areas={tabs}
          label={dict.areas.eyebrow}
          seeAllHref={servicesHub}
          texts={{
            withAi: dict.areas.withAi,
            availableAs: dict.areas.availableAs,
            seeServices: dict.areas.seeServices,
          }}
        />
      </div>
    </section>
  );
}

export function CasesSection({ locale, dict }: P) {
  const { models } = getContent();
  const cases = publishedCases(locale).slice(0, 3);
  const hub = pathFor(locale, { kind: 'casesHub' });
  const modelName = (id: string) => {
    const m = models.find((x) => x.id === id);
    return m ? (m.name[locale] ?? m.name.pt) : undefined;
  };
  return (
    <section id="casos" aria-labelledby="casos-title" className="bg-navy text-white">
      <div className={`container-site flex flex-col gap-12 ${sectionPad}`}>
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
          <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
            <p className="eyebrow m-0 text-[12.5px] text-yellow">{dict.cases.eyebrow}</p>
            <h2 id="casos-title" className={h2Class}>
              {dict.cases.title}
            </h2>
          </div>
          <dl className="m-0 flex overflow-hidden rounded-2xl border border-white/12">
            <div className="flex flex-col-reverse gap-1 border-r border-white/12 px-7 py-[18px]">
              <dt className="text-[13.5px] text-on-navy-2">{dict.cases.yearsLabel}</dt>
              <dd className="m-0 font-display text-[34px] leading-none font-semibold text-white">
                {site.facts.years}
              </dd>
            </div>
            <div className="flex flex-col-reverse gap-1 px-7 py-[18px]">
              <dt className="text-[13.5px] text-on-navy-2">{dict.cases.productsLabel}</dt>
              <dd className="m-0 font-display text-[34px] leading-none font-semibold text-yellow">
                {site.facts.products}
              </dd>
            </div>
          </dl>
        </div>
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[18px] p-0">
          {cases.map((c) => {
            const href = pathFor(locale, { kind: 'case', id: c.id });
            const area = findArea(c.areaIds[0]!);
            const tags = [area && (area.name[locale] ?? area.name.pt), modelName(c.models[0]!)]
              .filter(Boolean)
              .join(' · ');
            const contain = c.imageFit === 'contain';
            return (
              <li key={c.id}>
                <Link
                  href={href ?? '#'}
                  className="flex h-full flex-col overflow-hidden rounded-[18px] border border-white/12 bg-white/[0.04] text-white no-underline transition-colors hover:border-white/25 hover:text-white"
                >
                  <div
                    className={`h-[190px] overflow-hidden bg-navy-2 ${
                      contain ? 'box-border flex items-end justify-center pt-4' : ''
                    }`}
                  >
                    <Image
                      src={c.image}
                      alt=""
                      width={contain ? 800 : 1024}
                      height={480}
                      sizes="(min-width: 960px) 400px, 100vw"
                      className={
                        contain
                          ? 'block h-auto w-[74%]'
                          : 'block size-full object-cover object-top-left'
                      }
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-[26px]">
                    <Image
                      src={c.logo}
                      alt={c.client}
                      width={390}
                      height={120}
                      className="h-6 w-auto self-start"
                    />
                    <p className="m-0 font-display text-[26px] leading-[1.15] font-semibold text-yellow">
                      {c.headline[locale] ?? c.headline.pt}
                    </p>
                    <p className="m-0 text-[14.5px] leading-[1.65] text-on-navy">
                      {c.summary[locale] ?? c.summary.pt}
                    </p>
                    <p className="m-0 mt-auto pt-2 font-mono text-[12px] text-on-navy-2">{tags}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        {hub && (
          <div className="flex justify-center">
            <Link
              href={hub}
              className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-yellow no-underline hover:text-yellow-hi"
            >
              {dict.cases.seeAll} <ArrowRight />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export function MarketsSection({ locale, dict }: P) {
  const { markets } = getContent();
  const contact = pathFor(locale, { kind: 'contact' });
  return (
    <section id="mercados" aria-labelledby="mercados-title" className="bg-surface">
      <div className={`container-site flex flex-col gap-11 ${sectionPad}`}>
        <SectionHead
          id="mercados-title"
          eyebrow={dict.markets.eyebrow}
          title={dict.markets.title}
          lead={dict.markets.lead}
        />
        <MarketsMapDefs />
        <MarketsAccordion
          initial={localeConfig[locale].market}
          showLabel={dict.markets.show}
          items={markets.map((m) => ({
            id: m.id,
            name: m.name[locale] ?? m.name.pt,
            linkLabel: `Yellowipe ${dict.markets.short[m.id]}`,
            flag: m.flag,
            description: m.description[locale] ?? m.description.pt,
            contact: site.contacts[m.id].address,
            href: contact,
          }))}
        />
      </div>
    </section>
  );
}

export function ProcessSection({ locale, dict }: P) {
  const contact = pathFor(locale, { kind: 'contact' })!;
  return (
    <section aria-labelledby="processo-title" className="bg-white">
      <div className={`container-site flex flex-col gap-[52px] ${sectionPad}`}>
        <SectionHead
          id="processo-title"
          eyebrow={dict.process.eyebrow}
          title={dict.process.title}
        />
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute top-[22px] right-[12.5%] left-[12.5%] h-px bg-[#D5DBE4] max-[960px]:hidden"
          />
          <ol className="relative m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-8 p-0">
            {dict.process.steps.map((s, i) => (
              <li key={s.title} className="flex flex-col items-center gap-3.5 text-center">
                <span
                  className={`box-border flex size-11 items-center justify-center rounded-full font-mono text-[14px] ${
                    i === 0
                      ? 'bg-navy font-semibold text-yellow'
                      : 'border border-navy bg-white text-navy'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="m-0 font-display text-[19px] font-semibold">{s.title}</h3>
                <p className="m-0 max-w-[240px] text-[14.5px] leading-[1.65] text-muted">
                  {s.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex justify-center">
          <TrackedLink
            href={contact}
            ctaId="processo-agendar"
            position="processo"
            pageType="home"
            className="btn-primary"
          >
            {dict.common.bookCall} <ArrowRight strokeWidth={2.2} />
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}

export function FaqSection({ dict }: P) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-surface">
      <div className={`mx-auto flex max-w-[880px] flex-col gap-10 px-6 ${sectionPad}`}>
        <SectionHead id="faq-title" eyebrow={dict.faq.eyebrow} title={dict.faq.title} />
        <div className="flex flex-col gap-2.5">
          {dict.faq.items.map((f, i) => (
            // <details name> = acordeão exclusivo nativo, sem JavaScript e com o texto no HTML.
            <details
              key={f.q}
              name="faq"
              open={i === 0}
              className="group rounded-[14px] border border-line bg-white px-5"
            >
              <summary className="flex min-h-16 cursor-pointer list-none items-center gap-4 py-5 text-ink hover:text-link-hover [&::-webkit-details-marker]:hidden">
                <h3 className="m-0 flex-1 font-display text-[18px] font-medium">{f.q}</h3>
                <span
                  aria-hidden="true"
                  className="flex size-7 flex-none items-center justify-center rounded-full bg-surface font-mono text-[16px] text-navy group-open:bg-navy group-open:text-yellow"
                >
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>
              <p className="m-0 max-w-[68ch] pr-11 pb-[22px] text-[15.5px] leading-[1.7] text-body">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection({ locale, dict }: P) {
  return (
    <ContactBlock locale={locale} dict={dict} formId="home-contacto" ctaId="home-formulario" />
  );
}
