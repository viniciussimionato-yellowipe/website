'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import { ChevronDown, CloseIcon, MenuIcon } from '@/components/ui/icons';

type MobileLink = { label: string; href: string; tag?: string };
export type MobileSection = {
  title: string;
  groups: { title: string; links: MobileLink[] }[];
  all?: { label: string; href: string };
};

type Props = {
  openLabel: string;
  closeLabel: string;
  sections: MobileSection[];
  links: { label: string; href: string }[];
  cta: { label: string; href: string };
};

/**
 * Menu mobile: Serviços e Tecnologias em acordeão, o resto em links diretos.
 * Botão com aria-expanded; fecha com Escape e ao escolher um link.
 */
export function MobileMenu({ openLabel, closeLabel, sections, links, cta }: Props) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(0);
  const panelId = useId();
  const close = () => setOpen(false);
  const pathname = usePathname();

  // Mudou de página (incluindo voltar atrás): o menu fecha sempre.
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(false);
  }

  // Sem scroll da página por trás do menu aberto.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const row =
    'flex min-h-14 w-full items-center justify-between border-b border-white/10 text-left text-[17px] font-medium text-white no-underline hover:text-white';

  return (
    <div className="min-[961px]:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-11 items-center justify-center rounded-[10px] border border-white/[0.22] text-white"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>
      <div
        id={panelId}
        data-state={open ? 'open' : 'closed'}
        inert={!open}
        className="mobile-panel absolute inset-x-0 top-full max-h-[calc(100dvh-73px)] overflow-y-auto border-t border-white/[0.08] bg-navy px-6 pt-2 pb-8 shadow-[0_24px_40px_-20px_rgb(0_0_0/0.5)]"
      >
        {sections.map((s, i) => {
          const isOpen = expanded === i;
          const bodyId = `${panelId}-s${i}`;
          return (
            <div key={s.title}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={bodyId}
                onClick={() => setExpanded(isOpen ? null : i)}
                className={`${row} cursor-pointer bg-transparent`}
              >
                {s.title}
                <ChevronDown
                  size={16}
                  className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <div id={bodyId} hidden={!isOpen} className="border-b border-white/10 pt-1.5 pb-4">
                {s.groups.map((g) => (
                  <div key={g.title}>
                    <p className="mt-3.5 mb-1 font-mono text-[11.5px] tracking-[0.12em] text-on-navy-2 uppercase">
                      {g.title}
                    </p>
                    <ul className="m-0 list-none p-0">
                      {g.links.map((l) => (
                        <li key={l.href + l.label}>
                          <Link
                            href={l.href}
                            onClick={close}
                            className="flex min-h-11 items-center gap-2 text-[15px] text-on-navy no-underline hover:text-white"
                          >
                            {l.tag && (
                              <span className="rounded-[5px] bg-yellow/15 px-1.5 py-0.5 font-mono text-[11px] tracking-[0.08em] text-yellow uppercase">
                                {l.tag}
                              </span>
                            )}
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {s.all && (
                  <Link
                    href={s.all.href}
                    onClick={close}
                    className="mt-2 flex min-h-11 items-center text-[15px] text-yellow no-underline hover:text-yellow-hi"
                  >
                    {s.all.label} →
                  </Link>
                )}
              </div>
            </div>
          );
        })}
        <ul className="m-0 list-none p-0">
          {links.map((l) => (
            <li key={l.href + l.label}>
              <Link href={l.href} onClick={close} className={row}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={cta.href}
          onClick={close}
          className="mt-6 flex min-h-[50px] items-center justify-center rounded-full bg-yellow px-[18px] text-[15px] font-semibold text-navy no-underline hover:bg-yellow-hi hover:text-navy"
        >
          {cta.label}
        </Link>
      </div>
    </div>
  );
}
