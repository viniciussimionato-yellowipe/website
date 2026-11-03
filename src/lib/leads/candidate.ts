import { createHmac } from 'node:crypto';
import { z } from 'zod';

/**
 * Candidaturas de Carreiras e Vagas: candidatura a uma vaga, CV espontâneo e alerta
 * de vagas por email. Vão sempre para o ATS, nunca para o CRM (regra 6), e os logs
 * não levam dados pessoais (regra 5).
 */
export const CV_MAX_BYTES = 5 * 1024 * 1024;
export const CV_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

export const CandidateInput = z
  .object({
    kind: z.enum(['application', 'spontaneous', 'alert']),
    name: optionalText(120),
    email: z.string().trim().toLowerCase().email().max(200),
    linkedin: optionalText(300).refine(
      (v) => !v || /^https?:\/\/([a-z]{2,3}\.)?linkedin\.com\//i.test(v),
      'linkedin',
    ),
    jobId: optionalText(80),
    jobTitle: optionalText(160),
    /** Filtros escolhidos no alerta de vagas (ex.: "Área: Dados · Remoto"). */
    filters: optionalText(300),
    locale: z.enum(['pt', 'br', 'en']),
    turnstileToken: optionalText(4096),
    website: z.string().max(0).optional(),
  })
  .superRefine((v, ctx) => {
    if (v.kind !== 'alert' && (!v.name || v.name.length < 2))
      ctx.addIssue({ code: 'custom', path: ['name'], message: 'name' });
  });

export type CandidateInput = z.infer<typeof CandidateInput>;
export type CvFile = { name: string; type: string; bytes: Uint8Array };

/** Erros do ficheiro de CV (tipo e tamanho). */
export function checkCv(file: { type: string; size: number } | null): string | null {
  if (!file) return null;
  if (!CV_TYPES.includes(file.type as (typeof CV_TYPES)[number])) return 'cv_type';
  if (file.size > CV_MAX_BYTES) return 'cv_size';
  return null;
}

/** Candidatura e CV espontâneo pedem um CV ou um perfil LinkedIn. */
export function needsCvOrLinkedin(input: CandidateInput, cv: CvFile | null): boolean {
  return input.kind !== 'alert' && !cv && !input.linkedin;
}

export async function deliverCandidate(
  input: CandidateInput,
  cv: CvFile | null,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const provider = process.env.ATS_PROVIDER ?? 'log';

  if (provider === 'log') {
    console.warn(
      JSON.stringify({ evt: 'candidate.ats', kind: input.kind, locale: input.locale, cv: !!cv }),
    );
    return { ok: true };
  }

  if (provider === 'webhook') {
    const url = process.env.ATS_WEBHOOK_URL;
    const secret = process.env.ATS_WEBHOOK_SECRET;
    if (!url || !secret) return { ok: false, error: 'ats_not_configured' };
    const payload = JSON.stringify({
      type: input.kind,
      name: input.name,
      email: input.email,
      linkedin: input.linkedin,
      jobId: input.jobId,
      jobTitle: input.jobTitle,
      filters: input.filters,
      locale: input.locale,
      source: 'website',
      cv: cv
        ? { name: cv.name, type: cv.type, base64: Buffer.from(cv.bytes).toString('base64') }
        : undefined,
    });
    const signature = createHmac('sha256', secret).update(payload).digest('hex');
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Yellowipe-Signature': `sha256=${signature}`,
      },
      body: payload,
      signal: AbortSignal.timeout(15000),
    });
    return res.ok ? { ok: true } : { ok: false, error: `ats_${res.status}` };
  }

  return { ok: false, error: `unknown_ats_provider_${provider}` };
}
