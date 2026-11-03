/**
 * Plano de tracking (docs/06-tracking.md). Os eventos são tipados: um evento
 * novo entra aqui primeiro, com as suas propriedades, e depois no GTM.
 * Regra: nenhum dado pessoal (nome, email, telefone, empresa) vai para o dataLayer.
 */
export type AnalyticsEvents = {
  cta_click: {
    cta_id: string;
    cta_text: string;
    posicao: string;
    tipo_pagina: string;
    modelo?: string;
  };
  form_start: { form_id: string; pagina_conversao: string };
  form_step: { form_id: string; passo: number; intencao?: string };
  generate_lead: {
    form_id: string;
    intencao: string;
    mercado: string;
    idioma: string;
    faixa_pontuacao: string;
  };
  /** origem: formulário geral, candidatura a uma vaga ou CV espontâneo. vaga = id da vaga, nunca o nome do candidato. */
  candidate_submit: {
    idioma: string;
    origem?: 'formulario' | 'vaga' | 'espontanea';
    vaga?: string;
  };
  job_open: { vaga: string; area: string };
  job_alert_submit: { idioma: string };
  meeting_booked: { origem_cta: string; mercado: string };
  calculator_result: { perfis: string; mercado: string; modelo: string };
  calculator_email: { perfis: string; mercado: string };
  resource_download: { recurso_id: string };
  case_view: { caso_id: string; setor: string };
  whatsapp_click: { pagina: string };
  language_switch: { de: string; para: string };
};

export type EventName = keyof AnalyticsEvents;

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

export function track<E extends EventName>(event: E, params: AnalyticsEvents[E]): void {
  if (typeof window === 'undefined') return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...params });
}
