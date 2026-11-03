'use client';

import { usePathname } from 'next/navigation';
import { useReportWebVitals } from 'next/web-vitals';
import { useEffect } from 'react';
import { track } from '@/lib/analytics/events';

/**
 * Contexto de cada página vista (`page_context`), Core Web Vitals reais (`web_vitals`) e
 * cliques que não passam por componentes próprios: email, telefone, WhatsApp e perguntas
 * frequentes (um só listener delegado no documento, sem tocar em cada link).
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

const WHATSAPP = /^https:\/\/(wa\.me|api\.whatsapp\.com)\//;

function onDocumentClick(e: MouseEvent) {
  const target = e.target instanceof Element ? e.target : null;
  const href = target?.closest('a[href]')?.getAttribute('href');
  if (href) {
    const { tipo_pagina } = currentPage();
    // Só o canal: o endereço e o número nunca vão para o tracking.
    if (href.startsWith('mailto:')) track('contact_click', { canal: 'email', tipo_pagina });
    else if (href.startsWith('tel:')) track('contact_click', { canal: 'telefone', tipo_pagina });
    else if (WHATSAPP.test(href)) track('whatsapp_click', { pagina: location.pathname });
    return;
  }
  const summary = target?.closest('details[name^="faq"] > summary');
  const details = summary?.parentElement;
  // O clique ainda não mudou o estado: fechado agora = vai abrir.
  if (summary && details instanceof HTMLDetailsElement && !details.open) {
    track('faq_open', {
      pergunta: (summary.textContent ?? '').trim().slice(0, 100),
      tipo_pagina: currentPage().tipo_pagina,
    });
  }
}

export function RouteAnalytics({ locale }: { locale: string }) {
  const pathname = usePathname();

  useEffect(() => {
    const page = currentPage();
    landing ??= page;
    track('page_context', { ...page, idioma: locale });
  }, [pathname, locale]);

  useEffect(() => {
    document.addEventListener('click', onDocumentClick);
    return () => document.removeEventListener('click', onDocumentClick);
  }, []);

  useReportWebVitals(reportVital);
  return null;
}
