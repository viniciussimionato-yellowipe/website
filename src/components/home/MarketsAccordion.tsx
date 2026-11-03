'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from '@/components/ui/icons';
import { MarketsMap } from './MarketsMap';

/**
 * "Três mercados" (v7): um cartão aberto e os outros como faixas verticais com bandeira.
 * Abaixo de 960 px as faixas ficam horizontais. O texto de todos os mercados está no
 * HTML; os cartões fechados ficam com `hidden`.
 */
export type MarketItem = {
  id: string;
  name: string;
  linkLabel: string;
  flag: string;
  description: string;
  contact: string;
  href: string | null;
};

type Props = { items: MarketItem[]; initial: string; showLabel: string };

export function MarketsAccordion({ items, initial, showLabel }: Props) {
  const [open, setOpen] = useState(initial);
  // O zoom só começa quando a secção entra no ecrã; depois, cada mudança de mercado
  // volta a tocar a animação (o cartão passa de hidden a visível).
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="flex h-[440px] gap-2.5 max-[960px]:h-auto max-[960px]:flex-col">
      {items.map((m) => {
        const isOpen = m.id === open;
        return (
          <div key={m.id} className={isOpen ? 'flex min-w-0 flex-1' : 'contents'}>
            {!isOpen && (
              <button
                type="button"
                onClick={() => setOpen(m.id)}
                aria-label={`${showLabel} ${m.name}`}
                aria-expanded={false}
                aria-controls={`mercado-${m.id}`}
                className="box-border flex w-[92px] flex-none cursor-pointer flex-col items-center justify-between gap-3.5 rounded-[18px] border border-line bg-white px-0 py-6 text-ink transition-[border-color,transform] duration-[180ms] hover:border-navy active:scale-[0.97] max-[960px]:h-16 max-[960px]:w-full max-[960px]:flex-row max-[960px]:justify-start max-[960px]:px-5 max-[960px]:py-0"
              >
                <Image src={m.flag} alt="" width={128} height={128} className="size-7" />
                <span className="rotate-180 font-mono text-[14px] tracking-[0.06em] [writing-mode:vertical-rl] max-[960px]:rotate-0 max-[960px]:[writing-mode:horizontal-tb]">
                  {m.name}
                </span>
              </button>
            )}
            <div
              id={`mercado-${m.id}`}
              hidden={!isOpen}
              className="relative box-border flex min-h-[360px] min-w-0 flex-1 flex-col justify-end gap-3.5 overflow-hidden rounded-[18px] border border-line bg-white p-[clamp(24px,3vw,40px)] max-[960px]:pt-[200px]"
            >
              {/* Mapa vetorial com zoom no país do cartão (MarketsMap.tsx). */}
              <MarketsMap market={m.id} zoom={inView} />
              <Image src={m.flag} alt="" width={128} height={128} className="relative size-9" />
              <h3 className="relative m-0 font-display text-[32px] font-semibold">{m.name}</h3>
              <p className="relative m-0 max-w-[460px] text-[15.5px] leading-[1.65] text-body">
                {m.description}
              </p>
              <p className="relative m-0 text-[14px] text-muted">{m.contact}</p>
              {m.href && (
                <Link
                  href={m.href}
                  className="relative inline-flex min-h-11 items-center gap-2 self-start text-[15px] font-semibold text-ink no-underline"
                >
                  {m.linkLabel} <ArrowRight />
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
