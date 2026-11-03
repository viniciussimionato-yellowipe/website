/**
 * Último CTA clicado na sessão (sessionStorage, sem dados pessoais). O formulário pode
 * estar na mesma página (#contacto, ContactBlock) ou noutra (/contacto/, cabeçalho);
 * este contexto diz ao CRM que página e que CTA levaram ao contacto e pré-escolhe a
 * intenção quando o CTA vem de uma página de modelo.
 */
const KEY = 'yw_last_cta';
/** Avisa o formulário da mesma página (CTA → #contacto) de que o contexto mudou. */
const CHANGE_EVENT = 'yw:cta';

export type CtaContext = { ctaId: string; page: string; model?: string };

export function rememberCta(context: CtaContext): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(context));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // Sem sessionStorage (modo privado, bloqueado): o formulário usa o seu próprio CTA.
  }
}

/** Subscrição para useSyncExternalStore. */
export function subscribeCta(onChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}

/** Valor bruto (string estável) para useSyncExternalStore. */
export function readCtaRaw(): string | null {
  try {
    return sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function parseCta(raw: string | null): CtaContext | null {
  if (!raw) return null;
  try {
    const v = JSON.parse(raw) as Partial<CtaContext>;
    if (typeof v.ctaId !== 'string' || typeof v.page !== 'string') return null;
    return {
      ctaId: v.ctaId.slice(0, 100),
      page: v.page.slice(0, 500),
      ...(typeof v.model === 'string' ? { model: v.model } : {}),
    };
  } catch {
    return null;
  }
}
