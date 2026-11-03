'use client';

import { usePathname } from 'next/navigation';
import { useReportWebVitals } from 'next/web-vitals';
import { useEffect } from 'react';
import { track } from '@/lib/analytics/events';

/**
 * Contexto de cada página vista (`page_context`) e Core Web Vitals reais (`web_vitals`).
 * O tipo de página vem do `data-page-type` do PageTransition, renderizado no servidor.
 * Os eventos ficam no dataLayer; o GTM só os lê depois do consentimento.
 */
type PageData = { tipo_pagina: string; pagina_id?: string };

/** As Web Vitals medem a carga do documento, por isso pertencem à página de entrada. */
let landing: PageData | null = null;

function currentPage(): PageData {
  const el = document.querySelector<HTMLElement>('[data-page-type]');
  const id = el?.dataset.pageId;
  return { tipo_pagina: el?.dataset.pageType ?? 'desconhecida', ...(id ? { pagina_id: id } : {}) };
}

function reportVital(metric: { name: string; value: number; rating: string }) {
  track('web_vitals', {
    metrica: metric.name,
    valor: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    classificacao: metric.rating,
    tipo_pagina: (landing ?? currentPage()).tipo_pagina,
  });
}

export function RouteAnalytics({ locale }: { locale: string }) {
  const pathname = usePathname();

  useEffect(() => {
    const page = currentPage();
    landing ??= page;
    track('page_context', { ...page, idioma: locale });
  }, [pathname, locale]);

  useReportWebVitals(reportVital);
  return null;
}
