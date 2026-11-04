import { existsSync } from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { absoluteUrl } from '@/config/site';
import { getContent, publishedCases } from '@/content';
import { AI_TOOLS } from '@/content/technologies/build';
import type { Dictionary } from '@/dictionaries';
import type { Locale } from '@/lib/i18n/locales';
import { pathFor } from '@/lib/routing';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import { JsonLd } from '@/components/seo/JsonLd';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { AreaIcon, ArrowRight } from '@/components/ui/icons';
import { CaseCards } from './shared';
import { ServiceExplorer } from './ServiceExplorer';
import type { ServiceArea, ServiceItem } from './ServiceExplorer';

/**
 * Página Serviços. Mesma linguagem da página Tecnologias (topo navy, título com marcador,
 * pesquisa e filtros) e estrutura inspirada em bairesdev.com/solutions (serviços agrupados por área).
 * O que é nosso: cada área mostra como usamos IA e uma prova com número, os três modelos
 * (Contrate, Reforce, Construa) têm secção própria e a stack liga às páginas de tecnologia.
 * Os ids das áreas mantêm-se como âncoras (o mega-menu aponta para /servicos/#area).
 */
type Props = { locale: Locale; dict: Dictionary };

const L = <T,>(v: { pt: T; br?: T; en?: T }, locale: Locale): T => v[locale] ?? v.pt;
const fill = (s: string, vars: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (m, k: string) => String(vars[k] ?? m));
const hasFile = (logo?: string) =>
  Boolean(logo && existsSync(path.join(process.cwd(), 'public', logo)));

export function ServicesHub({ locale, dict }: Props) {
  const t = dict.servicesHub;
  const { areas, services, models, stacks, technologyGroups } = getContent();
  const href = pathFor(locale, { kind: 'servicesHub' })!;
  const contact = pathFor(locale, { kind: 'contact' })!;
  const techHub = pathFor(locale, { kind: 'technologiesHub' });
  const crumbs = [
    { name: dict.common.home, href: pathFor(locale, { kind: 'home' })! },
    { name: dict.templates.allServicesTitle, href },
  ];

  const areaList: ServiceArea[] = areas.map((a) => ({
    id: a.id,
    name: L(a.name, locale),
    description: L(a.description, locale),
    ai: L(a.ai, locale),
    proof: a.proof ? L(a.proof, locale) : null,
  }));
  const items: ServiceItem[] = areas.flatMap((a) =>
    a.serviceIds
      .map((id) => services.find((s) => s.id === id))
      .filter((s) => s !== undefined)
      .map((s) => ({
        id: s.id,
        name: L(s.name, locale),
        summary: L(s.summary, locale),
        area: a.id,
        areaName: L(a.name, locale),
        href: pathFor(locale, { kind: 'service', id: s.id }),
        terms: [
          ...(s.page?.stackIds ?? []).map((id) => stacks.find((x) => x.id === id)?.name ?? id),
          L(s.keyword, locale),
        ],
      })),
  );

  // Uma stack de cada grupo à vez, para a faixa "trabalhamos na stack que já usa".
  const byGroup = technologyGroups.map((g) =>
    g.stackIds.map((id) => stacks.find((s) => s.id === id)).filter((s) => s && hasFile(s.logo)),
  );
  const stackBand: { id: string; name: string; logo: string; href: string }[] = [];
  for (let r = 0; stackBand.length < 16 && r < 12; r++)
    for (const list of byGroup) {
      const s = list[r];
      const h = s ? pathFor(locale, { kind: 'technology', id: s.id }) : null;
      if (s && h && stackBand.length < 16 && !stackBand.some((x) => x.logo === s.logo))
        stackBand.push({ id: s.id, name: s.name, logo: s.logo!, href: h });
    }

  const caseIds = publishedCases(locale)
    .map((c) => c.id)
    .slice(0, 3);
  const left = areas.filter((_, i) => i % 2 === 0);
  const right = areas.filter((_, i) => i % 2 === 1);

  return (
    <>
      <section className="hub-hero relative overflow-hidden bg-navy text-white">
        <FloatIcons ids={left.map((a) => a.id)} side="left" />
        <FloatIcons ids={right.map((a) => a.id)} side="right" />
        <div className="container-site relative z-[1] flex flex-col items-center py-[clamp(56px,7vw,104px)] text-center">
          <p className="eyebrow text-yellow">{t.eyebrow}</p>
          <h1 className="mt-4 max-w-[920px] font-display text-[clamp(38px,5.4vw,72px)] leading-[1.04] font-semibold tracking-[-0.025em]">
            {t.title}
            <span className="hub-mark mt-2 block">
              <span>{t.titleMark}</span>
            </span>
            <span className="hub-ai mt-3 block">{t.ai}</span>
          </h1>
          <p className="mt-6 max-w-[660px] text-[18px] leading-relaxed text-on-navy">
            {fill(t.lead, { services: items.length, areas: areas.length })}
          </p>
        </div>
      </section>

      <ServiceExplorer
        areas={areaList}
        items={items}
        contactHref={contact}
        labels={{
          search: t.search,
          all: t.all,
          filter: t.filter,
          count: t.count,
          countOne: t.countOne,
          withAi: t.withAi,
          see: t.see,
          emptyTitle: t.emptyTitle,
          emptyText: t.emptyText,
          emptyCta: t.emptyCta,
        }}
      />

      {/* Três modelos: o que nos distingue */}
      <section className="bg-surface">
        <div className="container-site py-[clamp(48px,6vw,80px)]">
          <h2 className="m-0 font-display text-[clamp(26px,3vw,38px)] leading-tight font-semibold">
            {t.modelsTitle}
          </h2>
          <p className="mt-3 max-w-[640px] text-[16px] text-body">{t.modelsLead}</p>
          <ul className="mt-8 grid list-none gap-[18px] p-0 lg:grid-cols-3">
            {models.map((m) => {
              const mh = pathFor(locale, { kind: 'model', id: m.id }) ?? contact;
              const id = m.id as keyof Dictionary['nav']['modelShort'];
              return (
                <li key={m.id}>
                  <Link
                    href={mh}
                    className="tech-card group flex h-full flex-col gap-3 p-7 no-underline"
                  >
                    <span className="self-start rounded-full bg-yellow px-2.5 py-0.5 font-mono text-[11px] font-semibold tracking-[0.08em] text-navy uppercase">
                      {L(m.name, locale)}
                    </span>
                    <h3 className="m-0 font-display text-[22px] font-semibold text-ink">
                      {L(m.keyword, locale)}
                    </h3>
                    <p className="m-0 text-[14.5px] leading-relaxed text-body">
                      {dict.nav.modelShort[id]}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-2 text-[14.5px] font-semibold text-ink group-hover:text-gold">
                      {t.modelCta} <ArrowRight size={14} />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* A stack que já usa, com ligação às páginas de tecnologia */}
      {techHub && stackBand.length > 0 && (
        <section className="bg-white">
          <div className="container-site py-[clamp(48px,6vw,80px)]">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <h2 className="m-0 font-display text-[clamp(26px,3vw,38px)] leading-tight font-semibold">
                  {t.stackTitle}
                </h2>
                <p className="mt-3 max-w-[640px] text-[16px] text-body">{t.stackLead}</p>
              </div>
              <Link
                href={techHub}
                className="inline-flex items-center gap-2 text-[15px] font-semibold text-ink no-underline hover:text-gold"
              >
                {t.stackCta} <ArrowRight size={14} />
              </Link>
            </div>
            <ul className="mt-8 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-4 lg:grid-cols-8">
              {stackBand.map((s) => (
                <li key={s.id}>
                  <Link
                    href={s.href}
                    className="hub-card flex-col !items-center !gap-2 !py-5 text-center"
                  >
                    <Image src={s.logo} alt="" width={30} height={30} className="size-[30px]" />
                    <span className="text-[13px] font-medium text-ink">{s.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-6">
              <p className="m-0 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
                {dict.tech.aiTitle}
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
            </div>
          </div>
        </section>
      )}

      {caseIds.length > 0 && (
        <section className="bg-surface">
          <div className="container-site py-[clamp(48px,6vw,80px)]">
            <h2 className="m-0 mb-8 font-display text-[clamp(26px,3vw,38px)] leading-tight font-semibold">
              {t.casesTitle}
            </h2>
            <CaseCards locale={locale} caseIds={caseIds} />
          </div>
        </section>
      )}

      <section className="bg-navy text-white">
        <div className="container-site grid items-center gap-8 py-[clamp(48px,6vw,80px)] md:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="m-0 font-display text-[clamp(26px,3vw,38px)] leading-tight font-semibold">
              {t.missingTitle}
            </h2>
            <p className="mt-4 max-w-[620px] text-[16.5px] leading-relaxed text-on-navy">
              {t.missingText}
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <TrackedLink
              href={contact}
              ctaId="servicos-nao-encontrou"
              position="final"
              pageType="pilar"
              className="btn-primary"
            >
              {t.missingCta} <ArrowRight />
            </TrackedLink>
            <span className="text-[13px] text-on-navy-2">{t.missingNote}</span>
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbLd(crumbs.map((c) => ({ name: c.name, url: absoluteUrl(c.href) })))}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: dict.templates.allServicesTitle,
          itemListElement: items.map((i, n) => ({
            '@type': 'ListItem',
            position: n + 1,
            name: i.name,
            ...(i.href ? { url: absoluteUrl(i.href) } : {}),
          })),
        }}
      />
    </>
  );
}

function FloatIcons({ ids, side }: { ids: string[]; side: 'left' | 'right' }) {
  return (
    <ul aria-hidden="true" className={`hub-float hub-float-${side}`}>
      {ids.map((id, n) => (
        <li key={id} style={{ '--n': n } as CSSProperties} className="text-navy">
          <AreaIcon id={id} size={30} />
        </li>
      ))}
    </ul>
  );
}
