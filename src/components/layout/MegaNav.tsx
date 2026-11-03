'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ChevronDown } from '@/components/ui/icons';

/**
 * Comportamento dos mega-menus do cabeçalho. O conteúdo dos painéis continua a ser
 * renderizado no servidor (SEO e ligação interna); aqui só se decide quando abre e fecha.
 *
 * - Hover com intenção: abre após 90 ms, fecha após 180 ms (o rato pode atravessar a margem).
 * - Passar de Serviços para Tecnologias troca o painel sem fechar e reabrir.
 * - Fecha ao clicar num link, ao mudar de página, com Escape, ao clicar fora ou no fundo.
 * - Toque: o primeiro toque abre, o segundo segue o link.
 * - Teclado: abre com o foco, fecha quando o foco sai.
 */
type Ctx = {
  openId: string | null;
  instant: boolean;
  request: (id: string | null, delay?: number) => void;
  closeNow: () => void;
};
const MegaCtx = createContext<Ctx | null>(null);

const OPEN_DELAY = 90;
const CLOSE_DELAY = 180;

export function MegaNav({ children, className }: { children: ReactNode; className?: string }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [instant, setInstant] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const current = useRef<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  const apply = useCallback((id: string | null) => {
    // Troca direta entre painéis: sem animação de entrada, para não piscar.
    setInstant(current.current !== null && id !== null && current.current !== id);
    current.current = id;
    setOpenId(id);
  }, []);

  const request = useCallback(
    (id: string | null, delay?: number) => {
      if (timer.current) clearTimeout(timer.current);
      const wait = delay ?? (id === null ? CLOSE_DELAY : current.current ? 0 : OPEN_DELAY);
      if (wait === 0) apply(id);
      else timer.current = setTimeout(() => apply(id), wait);
    },
    [apply],
  );

  const closeNow = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    apply(null);
    // O foco no link clicado manteria o painel "aberto" para o teclado.
    if (navRef.current?.contains(document.activeElement))
      (document.activeElement as HTMLElement).blur();
  }, [apply]);

  // Mudou de página: fecha sempre (ajuste durante o render, sem efeito em cascata).
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpenId(null);
  }
  useEffect(() => {
    current.current = openId;
  }, [openId]);

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      const trigger = navRef.current?.querySelector<HTMLElement>(`[data-mega-trigger="${openId}"]`);
      closeNow();
      trigger?.focus({ preventScroll: true });
    };
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) closeNow();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [openId, closeNow]);

  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  return (
    <MegaCtx.Provider value={{ openId, instant, request, closeNow }}>
      <nav ref={navRef} aria-label="Principal" className={className}>
        {children}
      </nav>
      <div
        aria-hidden="true"
        data-state={openId ? 'open' : 'closed'}
        className="mega-scrim"
        onPointerEnter={() => request(null)}
        onClick={closeNow}
      />
    </MegaCtx.Provider>
  );
}

export function MegaItem({
  id,
  label,
  href,
  children,
}: {
  id: string;
  label: string;
  href: string;
  children: ReactNode;
}) {
  const ctx = useContext(MegaCtx)!;
  const open = ctx.openId === id;
  const panelId = `mega-${id}`;
  const touchOpened = useRef(false);

  return (
    <div
      className="-my-3.5 flex items-center self-stretch py-3.5"
      data-state={open ? 'open' : 'closed'}
      onPointerEnter={(e) => e.pointerType === 'mouse' && ctx.request(id)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && ctx.request(null)}
      onFocus={() => ctx.request(id, 0)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) ctx.request(null, 0);
      }}
    >
      <Link
        href={href}
        data-mega-trigger={id}
        aria-expanded={open}
        aria-controls={panelId}
        className="mega-trigger"
        onPointerDown={(e) => {
          touchOpened.current = e.pointerType !== 'mouse' && !open;
        }}
        onClick={(e) => {
          // Toque: o primeiro toque só abre o painel.
          if (touchOpened.current) {
            e.preventDefault();
            touchOpened.current = false;
            ctx.request(id, 0);
            return;
          }
          ctx.closeNow();
        }}
      >
        {label}
        <ChevronDown className="mega-chev" />
      </Link>
      <div
        id={panelId}
        className="mega-panel"
        data-state={open ? 'open' : 'closed'}
        data-instant={open && ctx.instant ? '' : undefined}
        inert={!open}
        onClick={(e) => {
          if ((e.target as Element).closest('a')) ctx.closeNow();
        }}
      >
        {children}
      </div>
    </div>
  );
}
