import { createHmac } from 'node:crypto';
import type { Destination } from './assign';
import type { LeadInput } from './schema';
import type { ScoreResult } from './scoring';

/**
 * Envio para o CRM ou o ATS. Os fornecedores escolhem-se por variável de ambiente
 * (CRM_PROVIDER, ATS_PROVIDER). "log" serve para desenvolvimento e CI:
 * regista o encaminhamento sem dados pessoais.
 *
 * HubSpot: as propriedades yw_* têm de existir no portal (docs/05-leads-e-crm.md).
 */
export type DeliveryResult = { ok: true } | { ok: false; error: string };

type Context = { ip?: string; userAgent?: string; hutk?: string };

const crmIntentLabel: Record<LeadInput['intent'], string> = {
  hire: 'contrate',
  augment: 'reforce',
  build: 'construa',
  unsure: 'indefinido',
  job: 'candidato',
};

function splitName(full: string): { first: string; last: string } {
  const parts = full.trim().split(/\s+/);
  return { first: parts[0] ?? full, last: parts.slice(1).join(' ') };
}

export async function deliverToCrm(
  lead: LeadInput,
  score: ScoreResult,
  destination: Extract<Destination, { system: 'crm' }>,
  ctx: Context,
): Promise<DeliveryResult> {
  const provider = process.env.CRM_PROVIDER ?? 'log';

  if (provider === 'log') {
    console.warn(
      JSON.stringify({
        evt: 'lead.crm',
        queue: destination.queue,
        band: score.band,
        intent: lead.intent,
        locale: lead.locale,
      }),
    );
    return { ok: true };
  }

  if (provider === 'hubspot') {
    const portalId = process.env.HUBSPOT_PORTAL_ID;
    const formId = process.env.HUBSPOT_FORM_ID_CLIENT;
    const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
    if (!portalId || !formId) return { ok: false, error: 'hubspot_not_configured' };

    const { first, last } = splitName(lead.name);
    const a = lead.attribution;
    const fields: [string, string | number | undefined][] = [
      ['email', lead.email],
      ['firstname', first],
      ['lastname', last],
      ['company', lead.company],
      ['jobtitle', lead.jobTitle],
      ['country', lead.country],
      ['message', lead.message],
      ['yw_intent', crmIntentLabel[lead.intent]],
      ['yw_areas', lead.areas],
      ['yw_headcount', lead.headcount],
      ['yw_company_size', lead.companySize],
      ['yw_start', lead.start],
      ['yw_locale', lead.locale],
      ['yw_lead_score', score.score],
      ['yw_lead_band', score.band],
      ['yw_queue', destination.queue],
      ['yw_landing_page', a.landingPage],
      ['yw_conversion_page', a.conversionPage],
      ['yw_cta_id', a.ctaId],
      ['yw_cta_page', a.ctaPage],
      ['utm_source', a.utmSource],
      ['utm_medium', a.utmMedium],
      ['utm_campaign', a.utmCampaign],
      ['utm_term', a.utmTerm],
      ['utm_content', a.utmContent],
      ['yw_gclid', a.gclid],
      ['yw_li_fat_id', a.liFatId],
    ];

    const body = {
      fields: fields
        .filter(([, v]) => v !== undefined && v !== '')
        .map(([name, value]) => ({ objectTypeId: '0-1', name, value: String(value) })),
      context: { hutk: ctx.hutk, pageUri: a.conversionPage, ipAddress: ctx.ip },
      legalConsentOptions: {
        consent: {
          consentToProcess: true,
          text: 'Aceito o tratamento dos meus dados para responder ao pedido.',
          communications:
            lead.consentMarketing && process.env.HUBSPOT_SUBSCRIPTION_ID
              ? [
                  {
                    value: true,
                    subscriptionTypeId: Number(process.env.HUBSPOT_SUBSCRIPTION_ID),
                    text: 'Comunicações de marketing',
                  },
                ]
              : [],
        },
      },
    };

    const base = token
      ? `https://api.hsforms.com/submissions/v3/integration/secure/submit/${portalId}/${formId}`
      : `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

    const res = await fetch(base, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
    });
    return res.ok ? { ok: true } : { ok: false, error: `hubspot_${res.status}` };
  }

  return { ok: false, error: `unknown_crm_provider_${provider}` };
}

export async function deliverToAts(lead: LeadInput): Promise<DeliveryResult> {
  const provider = process.env.ATS_PROVIDER ?? 'log';

  if (provider === 'log') {
    console.warn(JSON.stringify({ evt: 'lead.ats', locale: lead.locale }));
    return { ok: true };
  }

  if (provider === 'webhook') {
    const url = process.env.ATS_WEBHOOK_URL;
    const secret = process.env.ATS_WEBHOOK_SECRET;
    if (!url || !secret) return { ok: false, error: 'ats_not_configured' };
    const payload = JSON.stringify({
      name: lead.name,
      email: lead.email,
      country: lead.country,
      areas: lead.areas,
      message: lead.message,
      locale: lead.locale,
      source: 'website',
      landingPage: lead.attribution.landingPage,
    });
    const signature = createHmac('sha256', secret).update(payload).digest('hex');
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Yellowipe-Signature': `sha256=${signature}`,
      },
      body: payload,
      signal: AbortSignal.timeout(8000),
    });
    return res.ok ? { ok: true } : { ok: false, error: `ats_${res.status}` };
  }

  return { ok: false, error: `unknown_ats_provider_${provider}` };
}
