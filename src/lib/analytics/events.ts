/**
 * Plano de tracking (docs/06-tracking.md). Os eventos são tipados: um evento
 * novo entra aqui primeiro, com as suas propriedades, e depois no GTM.
 * Regra: nenhum dado pessoal (nome, email, telefone, empresa) vai para o dataLayer.
 */
import { clarityTrack } from './clarity';

export type AnalyticsEvents = {
  /**
   * Página vista (carga inicial e cada navegação no cliente), com o tipo de página para
   * segmentar no GA4 e no Clarity. No GTM é o gatilho do page_view do GA4.
   * pagina_id = id do modelo, serviço, tecnologia ou caso.
   */
  page_context: { tipo_pagina: string; idioma: string; pagina_id?: string };
  /** Core Web Vitals reais (LCP, INP, CLS, FCP, TTFB) da página de entrada. CLS × 1000. */
  web_vitals: { metrica: string; valor: number; classificacao: string; tipo_pagina: string };
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
    /** CTA que levou ao formulário (último clicado na sessão) ou o próprio formulário. */
    cta_id?: string;
  };
  /** Validação falhou (no browser ou no servidor). campos = nomes dos campos, nunca valores. */
  form_error: { form_id: string; passo: number; campos: string };
  /** Clique em email ou telefone: também é um contacto comercial. canal = email | telefone. */
  contact_click: { canal: 'email' | 'telefone'; tipo_pagina: string };
  /** Pergunta frequente aberta: mostra as objeções que mais pesam em cada tipo de página. */
  faq_open: { pergunta: string; tipo_pagina: string };
  /** origem: formulário geral, candidatura a uma vaga ou CV espontâneo. vaga = id da vaga, nunca o nome do candidato. */
  candidate_submit: {
    idioma: string;
    origem?: 'formulario' | 'vaga' | 'espontanea';
    vaga?: string;
  };
  /**
   * Candidato encaminhado do formulário de clientes para Carreiras: escolheu "Procuro
   * emprego" (origem intencao) ou escreveu uma mensagem de candidato (origem mensagem).
   */
  candidate_redirect: {
    form_id: string;
    origem: 'intencao' | 'mensagem';
    destino: 'vagas' | 'cv';
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
  clarityTrack(event, params);
}
