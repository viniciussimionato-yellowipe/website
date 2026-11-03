import { assignLead } from './assign';
import type { NextStep } from './assign';
import { deliverToAts, deliverToCrm } from './destinations';
import { LeadInput, validateBusinessRules } from './schema';
import { scoreLead } from './scoring';
import type { ScoreBand } from './scoring';

/**
 * Fluxo completo de um envio, independente do Next.js (testável).
 * A resposta nunca devolve a pontuação nem dados pessoais: só o próximo passo.
 */
export type LeadResponse =
  | {
      status: 200;
      body: { ok: true; next: NextStep; band: ScoreBand | 'candidate'; meetingUrl?: string };
    }
  | { status: 400; body: { ok: false; error: 'invalid'; fields: string[] } }
  | { status: 502; body: { ok: false; error: 'delivery_failed' } };

type Deps = {
  deliverToCrm: typeof deliverToCrm;
  deliverToAts: typeof deliverToAts;
  meetingUrl: (country: string) => string | undefined;
};

const defaultDeps: Deps = {
  deliverToCrm,
  deliverToAts,
  meetingUrl: (country) =>
    country === 'PT'
      ? process.env.NEXT_PUBLIC_MEETING_URL_PT
      : country === 'BR'
        ? process.env.NEXT_PUBLIC_MEETING_URL_BR
        : process.env.NEXT_PUBLIC_MEETING_URL_US,
};

export async function handleLead(
  raw: unknown,
  ctx: { ip?: string; userAgent?: string; hutk?: string },
  deps: Deps = defaultDeps,
): Promise<LeadResponse> {
  const parsed = LeadInput.safeParse(raw);
  if (!parsed.success) {
    const fields = [...new Set(parsed.error.issues.map((i) => String(i.path[0] ?? 'form')))];
    return { status: 400, body: { ok: false, error: 'invalid', fields } };
  }
  const lead = parsed.data;
  const ruleErrors = validateBusinessRules(lead);
  if (ruleErrors.length)
    return { status: 400, body: { ok: false, error: 'invalid', fields: ruleErrors } };

  const score = scoreLead(lead);
  const { destination, next } = assignLead(lead, score);

  const delivery =
    destination.system === 'ats'
      ? await deps.deliverToAts(lead)
      : await deps.deliverToCrm(lead, score, destination, ctx);

  if (!delivery.ok) {
    console.error(
      JSON.stringify({
        evt: 'lead.delivery_failed',
        system: destination.system,
        error: delivery.error,
      }),
    );
    return { status: 502, body: { ok: false, error: 'delivery_failed' } };
  }

  const meetingUrl = next === 'calendar' ? deps.meetingUrl(lead.country) : undefined;
  return {
    status: 200,
    body: {
      ok: true,
      next: next === 'calendar' && !meetingUrl ? 'email' : next,
      band: destination.system === 'ats' ? 'candidate' : score.band,
      ...(meetingUrl ? { meetingUrl } : {}),
    },
  };
}
