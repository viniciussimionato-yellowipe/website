/**
 * Microsoft Clarity: mapas de calor e gravações de sessão (ADR 0008, docs/06-tracking.md).
 * - Só carrega depois de o visitante aceitar análise; recusar depois para a gravação.
 * - Nenhum dado pessoal: os formulários têm `data-clarity-mask`, nunca se chama `identify`
 *   e as etiquetas vêm só das propriedades dos eventos tipados (que já não têm dados pessoais).
 */
type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[] };
type ClarityWindow = Window & { clarity?: ClarityFn; __ywClarityLoaded?: boolean };

/** Propriedades dos eventos que viram etiquetas do Clarity (filtros das gravações). */
const TAGS = [
  'tipo_pagina',
  'pagina_id',
  'idioma',
  'modelo',
  'intencao',
  'mercado',
  'faixa_pontuacao',
] as const;
/** Sessões guardadas sempre, mesmo com amostragem: as que geram procura. */
const UPGRADE = new Set(['generate_lead', 'meeting_booked', 'calculator_result']);
/** Eventos técnicos que não interessam como evento no Clarity. */
const SKIP = new Set(['web_vitals']);

function clarity(...args: unknown[]) {
  (window as ClarityWindow).clarity?.(...args);
}

function consentState(analytics: boolean) {
  const state = analytics ? 'granted' : 'denied';
  return { analytics_Storage: state, ad_Storage: 'denied' };
}

/** Carrega o Clarity (com análise aceite) ou para-o (análise recusada depois de aceite). */
export function applyClarityConsent(analytics: boolean) {
  const id = process.env.NEXT_PUBLIC_CLARITY_ID;
  const w = window as ClarityWindow;

  if (w.__ywClarityLoaded) {
    clarity('consentv2', consentState(analytics));
    clarity(analytics ? 'start' : 'stop');
    return;
  }
  if (!id || !analytics) return;

  const fn: ClarityFn = function () {
    // O Clarity espera o objeto `arguments`, como no snippet oficial.
    // eslint-disable-next-line prefer-rest-params
    (fn.q = fn.q ?? []).push(arguments);
  };
  w.clarity = fn;
  clarity('consentv2', consentState(true));
  // O page_context da página de entrada saiu antes do consentimento: etiquetar agora.
  const page = document.querySelector<HTMLElement>('[data-page-type]');
  if (page?.dataset.pageType) clarity('set', 'tipo_pagina', page.dataset.pageType);
  if (page?.dataset.pageId) clarity('set', 'pagina_id', page.dataset.pageId);
  clarity('set', 'idioma', document.documentElement.lang);

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.clarity.ms/tag/${encodeURIComponent(id)}`;
  document.head.appendChild(s);
  w.__ywClarityLoaded = true;
}

/** Espelha um evento tipado no Clarity (chamado por `track`). Sem Clarity carregado, nada. */
export function clarityTrack(event: string, params: object) {
  if (SKIP.has(event)) return;
  const values = params as Record<string, unknown>;
  for (const key of TAGS) {
    const v = values[key];
    if (typeof v === 'string' && v) clarity('set', key, v);
  }
  if (event !== 'page_context') clarity('event', event);
  if (UPGRADE.has(event)) clarity('upgrade', event);
}
