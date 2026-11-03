import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { absoluteUrl } from '@/config/site';
import { findArea, findService, findStack, getContent } from '@/content';
import { inSentence } from '@/content/services/build';
import type { ServicePageView } from '@/content/services/build';
import { AI_TOOLS } from '@/content/technologies/build';
import type { Dictionary } from '@/dictionaries';
import type { Locale } from '@/lib/i18n/locales';
import { pathFor } from '@/lib/routing';
import { breadcrumbLd, faqLd, serviceLd } from '@/lib/seo/jsonld';
import { LogosStrip } from '@/components/home/HomeSections';
import { JsonLd } from '@/components/seo/JsonLd';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { AreaIcon, ArrowRight } from '@/components/ui/icons';
import { TechLogo } from '@/components/ui/TechLogo';
import { CaseCards, FaqList, FinalCta } from './shared';

/**
 * Página por serviço (benchmark BairesDev /technologies/ai/): a mesma estrutura e o mesmo
 * desenho das páginas de tecnologia, com o conteúdo moldado ao serviço. Todo o texto vem
 * de `buildServicePage` (content/services); este ficheiro só decide a apresentação.
 */
type Props = { locale: Locale; dict: Dictionary; view: ServicePageView };

const fill = (s: string, vars: Record<string, string>) =>
  s.replace(/\{(\w+)\}/g, (m, k: string) => vars[k] ?? m);

const MODEL_TAG: Record<string, { pt: string; en: string }> = {
  contrate: { pt: 'Contrate', en: 'Hire' },
  reforce: { pt: 'Reforce', en: 'Augment' },
  construa: { pt: 'Construa', en: 'Build' },
};

export function ServicePage({ locale, dict, view }: Props) {
  const t = dict.svc;
  const tt = dict.tech;
  const area = findArea(view.areaId);
  const areaName = area ? (area.name[locale] ?? area.name.pt) : '';
  const v = { name: inSentence(view.name), area: areaName };
  const href = pathFor(locale, { kind: 'service', id: view.id })!;
  const hub = pathFor(locale, { kind: 'servicesHub' });
  const home = pathFor(locale, { kind: 'home' })!;
  const contact = pathFor(locale, { kind: 'contact' })!;
  const tag = (id: string) => (locale === 'en' ? MODEL_TAG[id]!.en : MODEL_TAG[id]!.pt);
  const crumbs = [
    { name: dict.common.home, href: home },
    ...(hub ? [{ name: dict.templates.allServicesTitle, href: hub }] : []),
    { name: view.name, href },
  ];
  const ctaId = (pos: string) => `servico-${view.id}-${pos}`;

  const stacks = view.stackIds
    .map((id) => ({ s: findStack(id), h: pathFor(locale, { kind: 'technology', id }) }))
    .filter((x) => x.s && x.h)
    .map((x) => ({ id: x.s!.id, name: x.s!.name, logo: x.s!.logo, href: x.h! }));
  const related = view.relatedServiceIds
    .map((id) => ({ s: findService(id), h: pathFor(locale, { kind: 'service', id }) }))
    .filter((x) => x.s && x.h)
    .map((x) => ({ label: x.s!.name[locale] ?? x.s!.name.pt, href: x.h! }));
  const hasCases = view.caseIds.some((id) => pathFor(locale, { kind: 'case', id }) !== null);
  const marketName = (m: 'PT' | 'BR') =>
    getContent().markets.find((x) => x.id === m)?.name[locale] ?? m;

  return (
    <>
      {/* Topo: palavra-chave, promessa e o cartão do serviço que se monta camada a camada.
          Sem breadcrumb visível; o caminho fica só no JSON-LD (BreadcrumbList). */}
      <section className="bg-navy text-white">
        <div className="container-site grid grid-cols-[minmax(0,1fr)] items-center gap-12 py-[clamp(48px,6vw,88px)] lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="eyebrow text-yellow">{fill(t.eyebrow, v)}</p>
            <h1 className="mt-3 font-display text-[clamp(36px,4.6vw,60px)] leading-[1.06] font-semibold tracking-[-0.02em]">
              {view.keyword}
            </h1>
            <p className="mt-5 max-w-[620px] text-[18px] leading-relaxed text-on-navy">
              {view.pitch}
            </p>
            <TrackedLink
              href={contact}
              ctaId={ctaId('hero')}
              position="hero"
              pageType="servico"
              className="btn-primary mt-8"
            >
              {fill(t.cta, v)} <ArrowRight />
            </TrackedLink>
          </div>

          <div className="tcard" aria-hidden="true">
            <div className="flex items-center gap-3 border-b border-line pb-3.5">
              <span className="inline-flex size-11 flex-none items-center justify-center rounded-xl bg-surface text-navy">
                <AreaIcon id={view.areaId} size={26} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <b className="text-[15px]">{view.name}</b>
                <small className="text-[12px] text-muted">{areaName}</small>
              </span>
              <span className="max-w-[150px] rounded-md bg-surface px-2 py-1 text-right font-mono text-[11px] leading-snug text-muted">
                {view.note}
              </span>
            </div>
            <ul className="tc-layers">
              {view.layers.map((l, i) => (
                <li key={l.label} style={{ '--i': i } as CSSProperties}>
                  <span className="tc-l">{l.label}</span>
                  <span className="flex flex-wrap gap-1.5">
                    {l.chips.map((c) => (
                      <i key={c} className="tc-chip">
                        {c}
                      </i>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
            <div className="tc-who">
              <Image
                src="/images/brand/icon-positivo.svg"
                alt=""
                width={30}
                height={30}
                className="size-[30px] flex-none rounded-full bg-white p-1"
              />
              <span className="flex min-w-0 flex-1 flex-col">
                <b className="text-[13px]">{t.team}</b>
                <small className="text-[11.5px] text-on-navy-2">{t.teamNote}</small>
              </span>
              <span className="tc-ok">✓</span>
            </div>
          </div>
        </div>
      </section>

      <LogosStrip />

      <Section id="servicos" title={fill(t.offeringsTitle, v)} lead={t.offeringsLead}>
        <ul className="grid list-none gap-[18px] p-0 sm:grid-cols-2 lg:grid-cols-3">
          {view.offerings.map((s, i) => (
            <li key={s.title} className="tech-card rv flex flex-col gap-2.5 p-6">
              <span className="font-mono text-[12px] text-gold">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="m-0 text-[18px] font-semibold">{s.title}</h3>
              <p className="m-0 text-[14px] font-semibold text-ink">{s.pain}</p>
              <p className="m-0 text-[14.5px] leading-relaxed text-body">{s.text}</p>
              <ul className="mt-auto flex list-none flex-wrap gap-1.5 p-0 pt-2.5">
                {s.tags.map((x) => (
                  <li
                    key={x}
                    className="rounded-md bg-surface px-[7px] py-[3px] font-mono text-[10.5px] text-muted"
                  >
                    {x}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="modelos" title={t.modelsTitle} tone="surface">
        <ul
          className={`grid list-none gap-[18px] p-0 ${view.models.length > 1 ? 'lg:grid-cols-3' : 'max-w-[560px]'}`}
        >
          {view.models.map((m) => {
            const mh = pathFor(locale, { kind: 'model', id: m.id }) ?? contact;
            return (
              <li key={m.id} className="tech-card rv flex flex-col gap-3 p-7">
                <span className="self-start rounded-full bg-yellow px-2.5 py-0.5 font-mono text-[11px] font-semibold tracking-[0.08em] text-navy uppercase">
                  {tag(m.id)}
                </span>
                <h3 className="m-0 font-display text-[22px] font-semibold">{m.title}</h3>
                <p className="m-0 text-[14.5px] leading-relaxed text-body">{m.text}</p>
                <dl className="m-0 mt-1 flex flex-col gap-2 border-t border-line pt-3.5 text-[13.5px]">
                  <div className="grid grid-cols-[110px_1fr] gap-2.5">
                    <dt className="pt-0.5 font-mono text-[10.5px] tracking-[0.08em] text-muted uppercase">
                      {tt.yellowipe}
                    </dt>
                    <dd className="m-0 text-ink">{m.yw}</dd>
                  </div>
                  <div className="grid grid-cols-[110px_1fr] gap-2.5">
                    <dt className="pt-0.5 font-mono text-[10.5px] tracking-[0.08em] text-muted uppercase">
                      {tt.client}
                    </dt>
                    <dd className="m-0 text-ink">{m.cl}</dd>
                  </div>
                </dl>
                <Link
                  href={mh}
                  className="mt-auto inline-flex items-center gap-2 pt-2 text-[14.5px] font-semibold text-ink no-underline hover:text-gold"
                >
                  {m.cta} <ArrowRight size={14} />
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <section id="perfis" className="scroll-mt-24 bg-navy text-white">
        <div className="container-site py-[clamp(48px,6vw,80px)]">
          <h2 className="font-display text-[clamp(26px,3vw,36px)] leading-tight font-semibold">
            {t.profilesTitle}
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] text-on-navy-2">{tt.profilesNote}</p>
          <ul className="mt-8 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {view.profiles.map((p) => (
              <li key={p.role} className="tech-prof rv flex flex-col gap-3.5 p-5">
                <span className="flex min-w-0 flex-col gap-0.5">
                  <b className="text-[14.5px]">{p.role}</b>
                  <small className="text-[12px] text-on-navy-2">
                    {p.years} {tt.years} · {p.city}, {marketName(p.market)}
                  </small>
                </span>
                <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
                  {p.skills.map((s, i) => (
                    <li
                      key={s}
                      className={`rounded-full px-[9px] py-[3px] text-[12px] font-semibold ${
                        i === 0 ? 'bg-yellow text-navy' : 'bg-white/[0.08] text-white'
                      }`}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="m-0 text-[13.5px] leading-relaxed text-on-navy">{p.bio}</p>
                <div className="mt-auto flex justify-between gap-2 border-t border-white/12 pt-3 text-[11.5px]">
                  <span className="font-semibold text-[#7CD3A8]">✓ {tt.assessed}</span>
                  <span className="font-mono text-[10.5px] tracking-[0.06em] text-on-navy-2 uppercase">
                    {tag(p.model)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tecnologias: ligações às páginas de cada stack, ferramentas e IA de forma discreta */}
      <Section id="tecnologias" title={fill(t.techTitle, v)} lead={t.techLead}>
        {stacks.length > 0 && (
          <ul className="grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 lg:grid-cols-4">
            {stacks.map((s) => (
              <li key={s.id}>
                <Link
                  href={s.href}
                  className="tech-card group flex items-center gap-3 px-4 py-3.5 text-[15px] font-medium text-ink no-underline hover:text-ink"
                >
                  <TechLogo name={s.name} logo={s.logo} size={28} />
                  <span className="min-w-0 flex-1 truncate">{s.name}</span>
                  <ArrowRight
                    size={14}
                    className="flex-none text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-ink"
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-8 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {view.tools.map((g) => (
            <div key={g.name} className="tech-card rv p-5">
              <h3 className="m-0 font-mono text-[11.5px] font-medium tracking-[0.1em] text-muted uppercase">
                {g.name}
              </h3>
              <ul className="mt-3 flex list-none flex-wrap gap-1.5 p-0">
                {g.items.map((x) => (
                  <li
                    key={x}
                    className="rounded-full border border-line px-3 py-1 text-[13px] font-medium"
                  >
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-line pt-6">
          <p className="m-0 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
            {tt.aiTitle}
          </p>
          <ul className="m-0 flex list-none flex-wrap items-center gap-x-8 gap-y-3 p-0">
            {AI_TOOLS.map((a) => (
              <li
                key={a.name}
                className="ai-tool flex items-center gap-2 text-[13.5px] font-medium text-body"
              >
                <Image src={a.logo} alt="" width={18} height={18} className="size-[18px]" />
                {a.name}
              </li>
            ))}
          </ul>
          <p className="m-0 text-[12.5px] text-muted lg:ml-auto">{tt.aiNote}</p>
        </div>
      </Section>

      {hasCases && (
        <Section id="casos" title={dict.templates.casesTitle} tone="surface">
          <CaseCards locale={locale} caseIds={view.caseIds} />
        </Section>
      )}

      <Section id="processo" title={tt.processTitle} tone={hasCases ? 'white' : 'surface'}>
        <ol className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {view.steps.map((s, i) => (
            <li key={s.title} className="tech-card rv p-6">
              <span className="font-mono text-[13px] text-gold">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 text-[18px] font-semibold">{s.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-body">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <section id="faq" className={`scroll-mt-24 ${hasCases ? 'bg-surface' : 'bg-white'}`}>
        <div className="container-site grid gap-12 py-[clamp(48px,6vw,80px)] lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="font-display text-[clamp(26px,3vw,36px)] leading-tight font-semibold lg:sticky lg:top-40 lg:self-start">
            {fill(t.faqTitle, v)}
          </h2>
          <FaqList items={view.faq} />
        </div>
      </section>

      {related.length > 0 && (
        <section className={hasCases ? 'bg-white' : 'bg-surface'}>
          <div className="container-site py-14">
            <h2 className="m-0 text-[18px] font-semibold">{tt.relatedServices}</h2>
            <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
              {related.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex rounded-full border border-line bg-white px-3.5 py-2 text-[14px] font-medium text-ink no-underline hover:border-navy"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FinalCta
        title={fill(t.finalTitle, v)}
        label={fill(t.cta, v)}
        href={contact}
        ctaId={ctaId('final')}
        pageType="servico"
      />
      <JsonLd
        data={breadcrumbLd(crumbs.map((c) => ({ name: c.name, url: absoluteUrl(c.href) })))}
      />
      <JsonLd
        data={serviceLd({
          name: view.keyword,
          description: view.seo.description,
          url: absoluteUrl(href),
          locale,
        })}
      />
      <JsonLd data={faqLd(view.faq)} />
    </>
  );
}

function Section({
  id,
  title,
  lead,
  tone = 'white',
  children,
}: {
  id: string;
  title: string;
  lead?: string;
  tone?: 'white' | 'surface';
  children: ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-24 ${tone === 'surface' ? 'bg-surface' : 'bg-white'}`}>
      <div className="container-site py-[clamp(48px,6vw,80px)]">
        <h2 className="font-display text-[clamp(26px,3vw,36px)] leading-tight font-semibold">
          {title}
        </h2>
        {lead && <p className="mt-3 max-w-[640px] text-[16px] text-body">{lead}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
