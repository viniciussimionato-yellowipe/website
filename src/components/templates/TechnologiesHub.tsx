import { existsSync } from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import { absoluteUrl } from '@/config/site';
import { getContent } from '@/content';
import { AI_TOOLS, monogram } from '@/content/technologies/build';
import type { Dictionary } from '@/dictionaries';
import type { Locale } from '@/lib/i18n/locales';
import { pathFor } from '@/lib/routing';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import { JsonLd } from '@/components/seo/JsonLd';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { ArrowRight } from '@/components/ui/icons';
import { TechExplorer } from './TechExplorer';
import type { ExplorerItem } from './TechExplorer';

/**
 * Página Tecnologias (benchmark: bairesdev.com/technologies, "We cover them all. (AI included.)").
 * Versão Yellowipe: topo navy com logótipos a flutuar, pesquisa por stack, framework ou
 * ferramenta, filtros por grupo e, quando a pesquisa não encontra nada, um convite para falar.
 * Os números (stacks e ferramentas) são contados a partir do conteúdo, nunca escritos à mão.
 */
type Props = { locale: Locale; dict: Dictionary };

const fill = (s: string, vars: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (m, k: string) => String(vars[k] ?? m));
const hasFile = (logo?: string) =>
  Boolean(logo && existsSync(path.join(process.cwd(), 'public', logo)));

export function TechnologiesHub({ locale, dict }: Props) {
  const t = dict.techHub;
  const { technologyGroups, stacks } = getContent();
  const href = pathFor(locale, { kind: 'technologiesHub' })!;
  const contact = pathFor(locale, { kind: 'contact' })!;
  const crumbs = [
    { name: dict.common.home, href: pathFor(locale, { kind: 'home' })! },
    { name: dict.templates.technologiesTitle, href },
  ];

  const groupOf = new Map<string, { id: string; name: string }>();
  for (const g of technologyGroups)
    for (const id of g.stackIds) groupOf.set(id, { id: g.id, name: g.name[locale] ?? g.name.pt });

  const items: ExplorerItem[] = technologyGroups
    .flatMap((g) => g.stackIds)
    .map((id) => stacks.find((s) => s.id === id))
    .filter((s) => s !== undefined)
    .map((s) => ({
      id: s.id,
      name: s.name,
      href: pathFor(locale, { kind: 'technology', id: s.id }),
      logo: hasFile(s.logo) ? s.logo! : null,
      monogram: monogram(s.name),
      group: groupOf.get(s.id)!.id,
      groupName: groupOf.get(s.id)!.name,
      // Pesquisa também por frameworks e ferramentas: "Spring Boot" encontra Java, "k6" encontra JMeter.
      terms: [...new Set([...s.tools.flatMap(([, list]) => list), ...s.skills])],
    }))
    .filter((i): i is ExplorerItem & { href: string } => i.href !== null);

  const toolCount = new Set(stacks.flatMap((s) => s.tools.flatMap(([, list]) => list))).size;
  // Arredondado para baixo (múltiplos de 50): "mais de 450" em vez de um número exato que muda a cada edição.
  const vars = { stacks: items.length, tools: Math.floor(toolCount / 50) * 50 };

  // Logótipos a flutuar dos dois lados do título (só em ecrãs largos).
  // Um logótipo de cada grupo à vez, sem repetir ficheiros (React e React Native partilham o logótipo).
  const byGroup = technologyGroups.map((g) => items.filter((i) => i.group === g.id && i.logo));
  const seen = new Set<string>();
  const floating: ExplorerItem[] = [];
  for (let r = 0; floating.length < 14 && r < 12; r++)
    for (const list of byGroup) {
      const i = list[r];
      if (i && !seen.has(i.logo!) && floating.length < 14) {
        seen.add(i.logo!);
        floating.push(i);
      }
    }
  const left = floating.filter((_, i) => i % 2 === 0);
  const right = floating.filter((_, i) => i % 2 === 1);

  return (
    <>
      <section className="hub-hero relative overflow-hidden bg-navy text-white">
        <FloatColumn items={left} side="left" />
        <FloatColumn items={right} side="right" />
        <div className="container-site relative z-[1] flex flex-col items-center py-[clamp(56px,7vw,104px)] text-center">
          <p className="eyebrow text-yellow">{t.eyebrow}</p>
          <h1 className="mt-4 max-w-[900px] font-display text-[clamp(38px,5.4vw,72px)] leading-[1.04] font-semibold tracking-[-0.025em]">
            {t.title}
            <span className="hub-mark mt-2 block">
              <span>{t.titleMark}</span>
            </span>
            <span className="hub-ai mt-3 block">{t.ai}</span>
          </h1>
          <p className="mt-6 max-w-[640px] text-[18px] leading-relaxed text-on-navy">
            {fill(t.lead, vars)}
          </p>
        </div>
      </section>

      <TechExplorer
        items={items}
        groups={technologyGroups.map((g) => ({ id: g.id, name: g.name[locale] ?? g.name.pt }))}
        contactHref={contact}
        labels={{
          search: t.search,
          all: t.all,
          filter: t.filter,
          count: t.count,
          countOne: t.countOne,
          via: t.via,
          emptyTitle: t.emptyTitle,
          emptyText: t.emptyText,
          emptyCta: t.emptyCta,
        }}
      />

      {/* IA de forma discreta, como nas páginas de cada stack */}
      <section className="border-t border-line bg-white">
        <div className="container-site flex flex-wrap items-center gap-x-10 gap-y-4 py-8">
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
          <p className="m-0 text-[12.5px] text-muted lg:ml-auto">{dict.tech.aiNote}</p>
        </div>
      </section>

      {/* Não está na lista: o portefólio é maior do que a lista */}
      <section className="bg-surface">
        <div className="container-site grid items-center gap-8 py-[clamp(48px,6vw,80px)] md:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="m-0 font-display text-[clamp(26px,3vw,38px)] leading-tight font-semibold">
              {t.missingTitle}
            </h2>
            <p className="mt-4 max-w-[620px] text-[16.5px] leading-relaxed text-body">
              {t.missingText}
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <TrackedLink
              href={contact}
              ctaId="tecnologias-nao-encontrou"
              position="body"
              pageType="pilar"
              className="btn-primary"
            >
              {t.missingCta} <ArrowRight />
            </TrackedLink>
            <span className="text-[13px] text-muted">{t.missingNote}</span>
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
          name: dict.templates.technologiesTitle,
          itemListElement: items.map((i, n) => ({
            '@type': 'ListItem',
            position: n + 1,
            name: i.name,
            url: absoluteUrl(i.href!),
          })),
        }}
      />
    </>
  );
}

function FloatColumn({ items, side }: { items: ExplorerItem[]; side: 'left' | 'right' }) {
  return (
    <ul aria-hidden="true" className={`hub-float hub-float-${side}`}>
      {items.map((i, n) => (
        <li key={i.id} style={{ '--n': n } as CSSProperties}>
          <Image src={i.logo!} alt="" width={30} height={30} className="size-[30px]" />
        </li>
      ))}
    </ul>
  );
}
