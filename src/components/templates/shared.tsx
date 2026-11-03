import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { absoluteUrl } from '@/config/site';
import { findArea, findCase } from '@/content';
import type { Locale } from '@/lib/i18n/locales';
import { pathFor } from '@/lib/routing';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import { JsonLd } from '@/components/seo/JsonLd';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { ArrowRight } from '@/components/ui/icons';

/** Blocos partilhados pelos templates: cabeçalho com breadcrumbs, casos, FAQ e CTA final. */

export type Crumb = { name: string; href: string };

export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  cta,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  lead?: string;
  cta?: { label: string; href: string; ctaId: string; pageType: string; model?: string };
}) {
  return (
    <section className="bg-navy text-white">
      <div className="container-site py-[clamp(56px,7vw,96px)]">
        <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-on-navy-2">
          <ol className="flex flex-wrap gap-2">
            {crumbs.map((c, i) => (
              <li key={c.href} className="flex items-center gap-2">
                {i < crumbs.length - 1 ? (
                  <>
                    <Link href={c.href} className="text-on-navy-2 no-underline hover:text-white">
                      {c.name}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                ) : (
                  <span aria-current="page">{c.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <JsonLd
          data={breadcrumbLd(crumbs.map((c) => ({ name: c.name, url: absoluteUrl(c.href) })))}
        />
        {eyebrow && <p className="eyebrow text-yellow">{eyebrow}</p>}
        <h1 className="mt-3 max-w-[860px] font-display text-[clamp(36px,4.6vw,60px)] leading-[1.06] font-semibold tracking-[-0.02em]">
          {title}
        </h1>
        {lead && (
          <p className="mt-5 max-w-[720px] text-[18px] leading-relaxed text-on-navy">{lead}</p>
        )}
        {cta && (
          <TrackedLink
            href={cta.href}
            ctaId={cta.ctaId}
            position="hero"
            pageType={cta.pageType}
            model={cta.model}
            className="btn-primary mt-8"
          >
            {cta.label} <ArrowRight />
          </TrackedLink>
        )}
      </div>
    </section>
  );
}

export function Section({
  title,
  children,
  tone = 'white',
}: {
  title: string;
  children: ReactNode;
  tone?: 'white' | 'surface';
}) {
  return (
    <section className={tone === 'surface' ? 'bg-surface' : 'bg-white'}>
      <div className="container-site py-[clamp(48px,6vw,80px)]">
        <h2 className="font-display text-[clamp(26px,3vw,36px)] leading-tight font-semibold">
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

export function CaseCards({ locale, caseIds }: { locale: Locale; caseIds: string[] }) {
  const items = caseIds
    .map((id) => findCase(id))
    .filter((c) => c !== undefined)
    .map((c) => ({ c, href: pathFor(locale, { kind: 'case', id: c.id }) }))
    .filter((x): x is typeof x & { href: string } => x.href !== null);
  if (items.length === 0) return null;
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {items.map(({ c, href }) => {
        const area = findArea(c.areaIds[0]!);
        return (
          <li key={c.id}>
            <Link
              href={href}
              className="group block h-full overflow-hidden rounded-[var(--radius-card)] border border-line no-underline hover:border-line-strong"
            >
              <Image
                src={c.image}
                alt=""
                width={1024}
                height={480}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="aspect-[16/8] w-full object-cover"
              />
              <div className="space-y-2 p-5">
                <p className="font-display text-[22px] font-semibold text-ink">
                  {c.headline[locale] ?? c.headline.pt}
                </p>
                <p className="text-[14.5px] leading-relaxed text-body">
                  {c.summary[locale] ?? c.summary.pt}
                </p>
                <p className="text-[13px] text-muted">
                  {c.client}
                  {area ? ` · ${area.name[locale] ?? area.name.pt}` : ''}
                </p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f, i) => (
        <details key={f.q} name="faq" open={i === 0} className="py-5">
          <summary className="cursor-pointer list-none">
            <h3 className="m-0 inline text-[17px] font-semibold">{f.q}</h3>
          </summary>
          <p className="mt-3 text-[15.5px] leading-relaxed text-body">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
