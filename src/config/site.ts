import type { Localized } from '@/lib/i18n/locales';

/**
 * Fonte única dos factos da empresa. Rodapé, JSON-LD, llms.txt e textos de prova
 * leem daqui, para os números serem iguais em todo o lado.
 *
 * Regra (docs/04-conteudo-e-cms.md): só entram números que se possam provar.
 * "1.000+ profissionais" fica de fora até haver confirmação.
 * Valores entre [ ] são pendentes: o content:check bloqueia o build de produção (CONTENT_STRICT=1).
 */
export const site = {
  name: 'Yellowipe',
  legalName: '[Denominação social]',
  foundingYear: null as number | null, // [confirmar] — o deck só diz "15+ anos"
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, ''),
  logo: '/images/logo-dark.png',
  tagline: {
    pt: 'Parceiro de Capacidade Tecnológica',
    br: 'Parceiro de Capacidade Tecnológica',
    en: 'Technology Capability Partner',
  } satisfies Localized<string>,
  facts: {
    years: '15+',
    companies: '200+',
    products: '100+',
    /** Vagas geridas com clientes: 1.216 posições no Pipefy (docs/14-tecnologias.md). */
    jobsManaged: '1.200+',
  },
  markets: ['PT', 'BR', 'US'] as const,
  contacts: {
    PT: {
      email: '[email comercial]@yellowipe.io',
      phone: '+351 925 375 805',
      address: '[Morada em Portugal]',
    },
    BR: {
      email: '[email comercial]@yellowipe.io',
      phone: '[Telefone Brasil]',
      address: '[Endereço no Brasil]',
      whatsapp: '',
    },
    US: { email: '[email comercial]@yellowipe.io', phone: '[US phone]', address: '[US address]' },
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/yellowipe',
  },
  /** Decisão R-10 / robots.txt: deixar os rastreadores de IA ler o site. */
  allowAiCrawlers: true,
} as const;

export const isProduction = process.env.NEXT_PUBLIC_APP_ENV === 'production';

export function absoluteUrl(path: string): string {
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`;
}
