import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { site } from '@/config/site';
import { rateLimited, sameOrigin, verifyTurnstile } from '@/lib/leads/guard';
import { handleLead } from '@/lib/leads/handle';
import { LeadInput } from '@/lib/leads/schema';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 20_000;

export async function POST(request: NextRequest) {
  if (!sameOrigin(request.headers.get('origin'), site.url)) {
    return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: 'too_large' }, { status: 413 });
  }

  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  // Bots: a armadilha vem preenchida → respondemos como se tivesse corrido bem.
  if (raw && typeof raw === 'object' && 'website' in raw && (raw as { website?: string }).website) {
    return NextResponse.json({ ok: true, next: 'email', band: 'nurture' });
  }

  // Validar primeiro: o formulário mostra os campos com erro sem gastar o desafio anti-spam.
  const parsed = LeadInput.safeParse(raw);
  if (!parsed.success) {
    const fields = [...new Set(parsed.error.issues.map((i) => String(i.path[0] ?? 'form')))];
    return NextResponse.json({ ok: false, error: 'invalid', fields }, { status: 400 });
  }

  if (!(await verifyTurnstile(parsed.data.turnstileToken, ip))) {
    return NextResponse.json({ ok: false, error: 'captcha' }, { status: 400 });
  }

  const result = await handleLead(raw, {
    ip,
    userAgent: request.headers.get('user-agent') ?? undefined,
    hutk: request.cookies.get('hubspotutk')?.value,
  });
  return NextResponse.json(result.body, { status: result.status });
}
