'use client';

import Link from 'next/link';
import { useDeferredValue, useId, useMemo, useState } from 'react';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { AreaIcon, ArrowRight, Sparkle } from '@/components/ui/icons';

export type ServiceArea = {
  id: string;
  name: string;
  description: string;
  ai: string;
  proof: string | null;
};
export type ServiceItem = {
  id: string;
  name: string;
  summary: string;
  area: string;
  areaName: string;
  href: string | null;
  terms: string[];
};
type Labels = {
  search: string;
  all: string;
  filter: string;
  count: string;
  countOne: string;
  withAi: string;
  see: string;
  emptyTitle: string;
  emptyText: string;
  emptyCta: string;
};

const norm = (s: string) =>
  s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9#+]+/g, ' ')
    .trim();

/**
 * Serviços agrupados por área (como bairesdev.com/solutions), com pesquisa e filtros como na
 * página Tecnologias. Sem pesquisa, cada área aparece com descrição, uso de IA e prova; com
 * pesquisa ou filtro, os resultados aparecem numa grelha única. Tudo é renderizado no servidor.
 */
export function ServiceExplorer({
  areas,
  items,
  contactHref,
  labels,
}: {
  areas: ServiceArea[];
  items: ServiceItem[];
  contactHref: string;
  labels: Labels;
}) {
  const [query, setQuery] = useState('');
  const [area, setArea] = useState('all');
  const q = useDeferredValue(query);
  const inputId = useId();
  const nq = norm(q);

  const visible = useMemo(() => {
    const ids = new Set<string>();
    for (const i of items) {
      if (area !== 'all' && i.area !== area) continue;
      if (nq && ![i.name, i.summary, i.areaName, ...i.terms].some((t) => norm(t).includes(nq)))
        continue;
      ids.add(i.id);
    }
    return ids;
  }, [items, area, nq]);

  const count = visible.size;
  const shownAreas = areas.filter((a) => items.some((i) => i.area === a.id && visible.has(i.id)));

  return (
    <section className="bg-white">
      <div className="container-site py-[clamp(40px,5vw,64px)]">
        <div className="hub-search mx-auto max-w-[760px]">
          <label htmlFor={inputId} className="sr-only">
            {labels.search}
          </label>
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.search}
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        <div className="mt-6 flex items-center gap-3 overflow-x-auto pb-1 [scrollbar-width:none] md:flex-wrap md:justify-center md:overflow-visible">
          <span className="flex-none text-[14px] font-medium text-muted">{labels.filter}</span>
          {[{ id: 'all', name: labels.all }, ...areas].map((a) => (
            <button
              key={a.id}
              type="button"
              aria-pressed={area === a.id}
              onClick={() => setArea(a.id)}
              className="hub-chip"
            >
              {a.name}
            </button>
          ))}
        </div>

        <p aria-live="polite" className="mt-8 mb-2 text-[13.5px] text-muted">
          {count === 1 ? labels.countOne : labels.count.replace('{n}', String(count))}
        </p>

        {/* Áreas: sempre no HTML (âncoras do mega-menu); as que não têm resultados ficam escondidas */}
        <div className="flex flex-col">
          {areas.map((a) => {
            const list = items.filter((i) => i.area === a.id);
            const on = shownAreas.some((x) => x.id === a.id);
            return (
              <section
                key={a.id}
                id={a.id}
                hidden={!on}
                aria-labelledby={`${a.id}-t`}
                className="svc-area scroll-mt-28 border-t border-line py-10 first:border-t-0"
              >
                <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2fr)]">
                  <header className="flex flex-col gap-3 lg:sticky lg:top-28 lg:self-start">
                    <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-warm text-navy">
                      <AreaIcon id={a.id} size={26} />
                    </span>
                    <h2
                      id={`${a.id}-t`}
                      className="m-0 font-display text-[26px] leading-tight font-semibold"
                    >
                      {a.name}
                    </h2>
                    <p className="m-0 text-[15px] leading-relaxed text-body">{a.description}</p>
                    <p className="m-0 flex gap-2 text-[13.5px] leading-relaxed text-body">
                      <Sparkle className="mt-1 size-3 flex-none text-gold" />
                      <span>
                        <strong className="font-semibold text-ink">{labels.withAi}</strong> {a.ai}
                      </span>
                    </p>
                    {a.proof && (
                      <p className="m-0 self-start rounded-lg bg-surface px-3 py-2 text-[13px] font-medium text-ink">
                        {a.proof}
                      </p>
                    )}
                  </header>
                  <ul className="grid list-none content-start gap-3 p-0 sm:grid-cols-2">
                    {list.map((i) => (
                      <li key={i.id} hidden={!visible.has(i.id)}>
                        <ServiceCard item={i} contactHref={contactHref} labels={labels} />
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            );
          })}
        </div>

        {count === 0 && (
          <div className="hub-empty mx-auto mt-2 max-w-[760px]">
            <p className="m-0 font-display text-[22px] font-semibold text-ink">
              {labels.emptyTitle.replace('{q}', query.trim())}
            </p>
            <p className="mt-2 text-[15.5px] leading-relaxed text-body">{labels.emptyText}</p>
            <TrackedLink
              href={contactHref}
              ctaId="servicos-pesquisa-sem-resultado"
              position="body"
              pageType="pilar"
              className="btn-primary mt-5"
            >
              {labels.emptyCta} <ArrowRight />
            </TrackedLink>
          </div>
        )}
      </div>
    </section>
  );
}

function ServiceCard({
  item,
  contactHref,
  labels,
}: {
  item: ServiceItem;
  contactHref: string;
  labels: Labels;
}) {
  const body = (
    <>
      <span className="flex flex-col gap-1.5">
        <b className="text-[16.5px] font-semibold text-ink">{item.name}</b>
        <span className="text-[14px] leading-relaxed text-body">{item.summary}</span>
      </span>
      {item.href && (
        <span className="mt-auto inline-flex items-center gap-2 pt-3 text-[13.5px] font-semibold text-ink group-hover:text-gold">
          {labels.see} <ArrowRight size={13} />
        </span>
      )}
    </>
  );
  return (
    <Link
      href={item.href ?? contactHref}
      className="hub-card group !flex-col !items-start !gap-0 h-full !p-5"
    >
      {body}
    </Link>
  );
}
