/**
 * Proteções da rota de leads: anti-spam (Cloudflare Turnstile), limite de pedidos
 * e verificação de origem. O limite em memória é de melhor esforço (cada instância
 * serverless tem a sua memória); em produção, complementar com a firewall do
 * alojamento (docs/08-seguranca-e-privacidade.md).
 */

export async function verifyTurnstile(token: string | undefined, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Sem chave configurada só se aceita fora de produção.
    return process.env.NEXT_PUBLIC_APP_ENV !== 'production';
  }
  if (!token) return false;
  const form = new URLSearchParams({ secret, response: token });
  if (ip) form.set('remoteip', ip);
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: form,
      signal: AbortSignal.timeout(5000),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = Number(process.env.LEAD_RATE_LIMIT ?? 5);
const hits = new Map<string, number[]>();

export function rateLimited(key: string, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

/** Aceita só pedidos vindos do próprio site. */
export function sameOrigin(originHeader: string | null, siteUrl: string): boolean {
  if (!originHeader) return false;
  try {
    return new URL(originHeader).host === new URL(siteUrl).host;
  } catch {
    return false;
  }
}
