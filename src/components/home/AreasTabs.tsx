'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { AreaIcon, ArrowRight, ChevronRight, Sparkle, TrendUp } from '@/components/ui/icons';

/**
 * "Sete áreas de especialização": mosaicos com ícone (abas acessíveis: setas, Home, End)
 * e painel com serviços. Todos os painéis estão no HTML; os inativos ficam com `hidden`.
 */
export type AreaTab = {
  id: string;
  /** Rótulo do mosaico; `\n` marca a quebra de linha da v7. */
  tabLabel: string;
  name: string;
  /** Nome em minúscula para "Ver todos os serviços de …". */
  short: string;
  description: string;
  ai: string;
  proof?: string;
  models: { label: string; active: boolean }[];
  services: { id: string; name: string; summary: string; href: string | null }[];
};

type Texts = { withAi: string; availableAs: string; seeServices: string };

type Props = { areas: AreaTab[]; label: string; seeAllHref: string | null; texts: Texts };

export function AreasTabs({ areas, label, seeAllHref, texts }: Props) {
  const [active, setActive] = useState(areas[0]?.id ?? '');
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = areas.length - 1;
    const next =
      e.key === 'ArrowRight' || e.key === 'ArrowDown'
        ? (i + 1) % areas.length
        : e.key === 'ArrowLeft' || e.key === 'ArrowUp'
          ? (i + last) % areas.length
          : e.key === 'Home'
            ? 0
            : e.key === 'End'
              ? last
              : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(areas[next]!.id);
    tabs.current[next]?.focus();
  };

  return (
    <div className="flex flex-col gap-11">
      <div
        role="tablist"
        aria-label={label}
        aria-orientation="horizontal"
        className="grid grid-cols-7 gap-3 max-[960px]:flex max-[960px]:snap-x max-[960px]:snap-mandatory max-[960px]:overflow-x-auto max-[960px]:pb-1.5"
      >
        {areas.map((a, i) => {
          const selected = a.id === active;
          return (
            <button
              key={a.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`tab-${a.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`painel-${a.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(a.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`box-border flex aspect-square min-h-[108px] cursor-pointer flex-col items-center justify-center gap-3 rounded-[14px] border px-2 py-3 transition-[border-color,background-color,color,transform] duration-[180ms] active:scale-[0.97] max-[960px]:flex-[0_0_118px] max-[960px]:snap-start ${
                selected
                  ? 'border-navy bg-navy text-white'
                  : 'border-line bg-surface text-navy hover:border-navy'
              }`}
            >
              <span className={`flex ${selected ? 'text-yellow' : 'text-body'}`}>
                <AreaIcon id={a.id} />
              </span>
              <span className="text-center font-mono text-[12.5px] leading-[1.35] font-medium whitespace-pre-line">
                {a.tabLabel}
              </span>
            </button>
          );
        })}
      </div>

      {areas.map((a) => (
        <div
          key={a.id}
          id={`painel-${a.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${a.id}`}
          tabIndex={0}
          hidden={a.id !== active}
          className="rounded-[20px] border border-line bg-surface p-[clamp(24px,3.4vw,44px)]"
        >
          <div className="flex flex-wrap gap-10">
            <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-[18px]">
              <h3 className="m-0 font-display text-[26px] font-semibold tracking-[-0.01em]">
                {a.name}
              </h3>
              <p className="m-0 text-[16px] leading-[1.7] text-body">{a.description}</p>
              <p className="m-0 flex items-start gap-2.5 text-[15px] leading-[1.6] text-ink">
                <Sparkle
                  width={18}
                  height={18}
                  stroke="#8A6600"
                  strokeWidth={0.8}
                  className="mt-[3px] flex-none"
                />
                <span>
                  <strong className="font-semibold">{texts.withAi}</strong> {a.ai}
                </span>
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 text-[13px] text-muted">{texts.availableAs}</span>
                {a.models.map((m) => (
                  <span
                    key={m.label}
                    className={`rounded-full border px-[11px] py-[5px] font-mono text-[12px] ${
                      m.active
                        ? 'border-solid border-navy bg-navy text-white'
                        : 'border-dashed border-[#C9CFD8] bg-transparent text-[#6B7486]'
                    }`}
                  >
                    {m.label}
                  </span>
                ))}
              </div>
              {a.proof && (
                <div className="flex items-start gap-3 rounded-xl border border-line bg-white p-4">
                  <span className="flex size-7 flex-none items-center justify-center rounded-lg bg-warm text-gold">
                    <TrendUp />
                  </span>
                  <p className="m-0 text-[14.5px] leading-[1.55] font-medium text-ink">{a.proof}</p>
                </div>
              )}
              {seeAllHref && (
                <Link
                  href={seeAllHref}
                  className="inline-flex min-h-11 items-center gap-2 self-start text-[15px] font-semibold text-ink no-underline"
                >
                  {texts.seeServices} {a.short} <ArrowRight />
                </Link>
              )}
            </div>
            <ul className="m-0 flex min-w-0 flex-[1.25_1_380px] list-none flex-col self-start rounded-2xl border border-line bg-white px-2.5 py-1.5">
              {a.services.map((s) => {
                const body = (
                  <>
                    <span className="flex min-w-0 flex-1 flex-col gap-[5px]">
                      <span className="font-display text-[17px] font-semibold">{s.name}</span>
                      <span className="text-[14px] leading-[1.55] text-muted">{s.summary}</span>
                    </span>
                    <ChevronRight className="flex-none text-[#7A8496] transition-[transform,color] duration-200 group-hover:translate-x-[3px] group-hover:text-navy" />
                  </>
                );
                const row =
                  'flex items-center gap-4 rounded-[10px] border-b border-[#EEF1F5] px-3 py-[18px] text-ink no-underline';
                return (
                  <li key={s.id}>
                    {s.href ? (
                      <Link
                        href={s.href}
                        className={`group ${row} transition-colors hover:bg-surface hover:text-ink`}
                      >
                        {body}
                      </Link>
                    ) : (
                      <div className={row}>{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
