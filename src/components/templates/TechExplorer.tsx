'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useDeferredValue, useId, useMemo, useState } from 'react';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { ArrowRight } from '@/components/ui/icons';

export type ExplorerItem = {
  id: string;
  name: string;
  href: string | null;
  logo: string | null;
  monogram: string;
  group: string;
  groupName: string;
  terms: string[];
};

type Labels = {
  search: string;
  all: string;
  filter: string;
  count: string;
  countOne: string;
  via: string;
  emptyTitle: string;
  emptyText: string;
  emptyCta: string;
};

/** Sem acentos e em minúsculas: "Gestão" encontra "gestao", "NODE" encontra "Node.js". */
const norm = (s: string) =>
  s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9#+]+/g, ' ')
    .trim();

/**
 * Pesquisa e filtros da página Tecnologias. Todos os links estão no HTML do servidor
 * (bom para SEO); a pesquisa só esconde o que não corresponde. Sem resultados, a página
 * convida a falar connosco em vez de mostrar uma lista vazia.
 */
export function TechExplorer({
  items,
  groups,
  contactHref,
  labels,
}: {
  items: ExplorerItem[];
  groups: { id: string; name: string }[];
  contactHref: string;
  labels: Labels;
}) {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState<string>('all');
  const q = useDeferredValue(query);
  const inputId = useId();

  const results = useMemo(() => {
    const nq = norm(q);
    return items
      .filter((i) => group === 'all' || i.group === group)
      .map((i) => {
        if (!nq) return { item: i, via: null as string | null, rank: 0 };
        const name = norm(i.name);
        if (name.startsWith(nq)) return { item: i, via: null, rank: 0 };
        if (name.includes(nq)) return { item: i, via: null, rank: 1 };
        const hit = i.terms.find((t) => norm(t).includes(nq));
        return hit ? { item: i, via: hit, rank: 2 } : null;
      })
      .filter((r) => r !== null)
      .sort((a, b) => a.rank - b.rank);
  }, [items, group, q]);

  const visible = new Set(results.map((r) => r.item.id));
  const viaOf = new Map(results.map((r) => [r.item.id, r.via]));
  const empty = results.length === 0;

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
          {[{ id: 'all', name: labels.all }, ...groups].map((g) => (
            <button
              key={g.id}
              type="button"
              aria-pressed={group === g.id}
              onClick={() => setGroup(g.id)}
              className="hub-chip"
            >
              {g.name}
            </button>
          ))}
        </div>

        <p aria-live="polite" className="mt-8 mb-4 text-[13.5px] text-muted">
          {results.length === 1
            ? labels.countOne
            : labels.count.replace('{n}', String(results.length))}
        </p>

        <ul className="grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((i) => {
            const via = viaOf.get(i.id);
            return (
              <li key={i.id} hidden={!visible.has(i.id)}>
                <Link href={i.href!} className="hub-card group">
                  {i.logo ? (
                    <Image
                      src={i.logo}
                      alt=""
                      width={30}
                      height={30}
                      className="size-[30px] flex-none"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="inline-flex size-[30px] flex-none items-center justify-center rounded-md bg-navy font-mono text-[12px] font-semibold text-white"
                    >
                      {i.monogram}
                    </span>
                  )}
                  <span className="flex min-w-0 flex-1 flex-col">
                    <b className="truncate text-[15.5px] font-semibold text-ink">{i.name}</b>
                    <small className="truncate text-[12.5px] text-muted">
                      {via ? labels.via.replace('{term}', via) : i.groupName}
                    </small>
                  </span>
                  <ArrowRight
                    size={15}
                    className="flex-none text-muted transition-transform group-hover:translate-x-[3px] group-hover:text-ink"
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {empty && (
          <div className="hub-empty mx-auto mt-2 max-w-[760px]">
            <p className="m-0 font-display text-[22px] font-semibold text-ink">
              {labels.emptyTitle.replace('{q}', query.trim())}
            </p>
            <p className="mt-2 text-[15.5px] leading-relaxed text-body">{labels.emptyText}</p>
            <TrackedLink
              href={contactHref}
              ctaId="tecnologias-pesquisa-sem-resultado"
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
