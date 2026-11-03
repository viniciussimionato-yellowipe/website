import { ViewTransition } from 'react';
import type { ReactNode } from 'react';
import type { Route } from '@/lib/routing';

/**
 * Transição entre páginas (View Transitions do browser via React). A página que sai
 * desvanece e a que entra sobe 8 px; o cabeçalho fica parado. Só opacity e transform,
 * e nada com prefers-reduced-motion (globals.css). Sem suporte no browser, a troca é direta.
 *
 * O `key` por rota faz a troca entre duas páginas do mesmo segmento ([...slug]) contar como
 * saída e entrada. O `data-page-*` identifica a página para o tracking (RouteAnalytics).
 */
export function PageTransition({ route, children }: { route: Route; children: ReactNode }) {
  const id = 'id' in route ? route.id : undefined;
  return (
    <ViewTransition
      key={id ? `${route.kind}:${id}` : route.kind}
      enter="page-enter"
      exit="page-exit"
      default="none"
    >
      <div data-page-type={route.kind} data-page-id={id}>
        {children}
      </div>
    </ViewTransition>
  );
}
