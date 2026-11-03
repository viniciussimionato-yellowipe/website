import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { site } from '@/config/site';
import {
  CV_MAX_BYTES,
  CandidateInput,
  checkCv,
  deliverCandidate,
  needsCvOrLinkedin,
} from '@/lib/leads/candidate';
import type { CvFile } from '@/lib/leads/candidate';
import { rateLimited, sameOrigin, verifyTurnstile } from '@/lib/leads/guard';

/**
 * Candidaturas (vaga, CV espontâneo, alerta de vagas). multipart/form-data por causa do CV.
 * Destino: sempre o ATS. A resposta não devolve dados pessoais.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = CV_MAX_BYTES + 50_000;

export async function POST(request: NextRequest) {
  if (!sameOrigin(request.headers.get('origin'), site.url))
    return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (rateLimited(`cand:${ip}`))
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });

  if (Number(request.headers.get('content-length') ?? 0) > MAX_BODY_BYTES)
    return NextResponse.json({ ok: false, error: 'too_large', fields: ['cv'] }, { status: 413 });

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  const str = (k: string) => {
    const v = form.get(k);
    return typeof v === 'string' ? v : undefined;
  };

  // Bots: a armadilha vem preenchida → respondemos como se tivesse corrido bem.
  if (str('website')) return NextResponse.json({ ok: true });

  const parsed = CandidateInput.safeParse({
    kind: str('kind'),
    name: str('name'),
    email: str('email'),
    linkedin: str('linkedin'),
    jobId: str('jobId'),
    jobTitle: str('jobTitle'),
    filters: str('filters'),
    locale: str('locale'),
    turnstileToken: str('cf-turnstile-response'),
  });
  const file = form.get('cv');
  const upload = file instanceof File && file.size > 0 ? file : null;
  const cvError = checkCv(upload);

  if (!parsed.success || cvError) {
    const fields = [
      ...new Set([
        ...(parsed.success ? [] : parsed.error.issues.map((i) => String(i.path[0] ?? 'form'))),
        ...(cvError ? ['cv'] : []),
      ]),
    ];
    return NextResponse.json({ ok: false, error: 'invalid', fields }, { status: 400 });
  }

  const cv: CvFile | null = upload
    ? { name: upload.name, type: upload.type, bytes: new Uint8Array(await upload.arrayBuffer()) }
    : null;
  if (needsCvOrLinkedin(parsed.data, cv))
    return NextResponse.json(
      { ok: false, error: 'invalid', fields: ['cv', 'linkedin'] },
      { status: 400 },
    );

  if (!(await verifyTurnstile(parsed.data.turnstileToken, ip)))
    return NextResponse.json({ ok: false, error: 'captcha' }, { status: 400 });

  const delivery = await deliverCandidate(parsed.data, cv);
  if (!delivery.ok) {
    console.error(JSON.stringify({ evt: 'candidate.delivery_failed', error: delivery.error }));
    return NextResponse.json({ ok: false, error: 'delivery_failed' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
