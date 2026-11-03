'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { rememberCta } from '@/lib/analytics/cta-context';
import { track } from '@/lib/analytics/events';

/**
 * Link de CTA com o evento `cta_click`. Todos os CTAs do site usam este
 * componente para a escada de CTAs ser medida (docs/06-tracking.md). Guarda também
 * o CTA na sessão, para o formulário saber de onde veio o contacto (cta-context.ts).
 */
type Props = ComponentProps<typeof Link> & {
  ctaId: string;
  position: string;
  pageType: string;
  model?: string;
};

export function TrackedLink({
  ctaId,
  position,
  pageType,
  model,
  onClick,
  children,
  ...props
}: Props) {
  return (
    <Link
      {...props}
      data-cta-id={ctaId}
      onClick={(e) => {
        track('cta_click', {
          cta_id: ctaId,
          cta_text: e.currentTarget.textContent?.trim() ?? '',
          posicao: position,
          tipo_pagina: pageType,
          ...(model ? { modelo: model } : {}),
        });
        rememberCta({ ctaId, page: location.pathname, ...(model ? { model } : {}) });
        onClick?.(e);
      }}
    >
      {children}
    </Link>
  );
}
