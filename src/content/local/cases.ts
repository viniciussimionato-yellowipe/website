import type { z } from 'zod';
import type { CaseStudy } from '../schema';

/**
 * Casos de sucesso (R-09). `clientApproved: false` bloqueia o build de produção
 * (npm run content:check) até haver autorização escrita do cliente.
 * Mercado, setor e textos longos marcados com [confirmar] vêm do deck e têm de ser validados.
 */
export const cases: z.input<typeof CaseStudy>[] = [
  {
    id: 'clever',
    status: 'published',
    client: 'Clever Advertising',
    sector: 'Marketing e publicidade',
    market: 'PT', // [confirmar]
    slug: {
      pt: 'clever-automacao-de-testes',
    },
    headline: { pt: '32 → 1.600+ testes' },
    summary: {
      pt: 'Uma suíte de testes estagnada transformada num processo de QA escalável em seis meses, com automação assistida por IA.',
    },
    metrics: [
      {
        value: '32 → 1.600+',
        label: { pt: 'testes automatizados' },
      },
      { value: '6', label: { pt: 'meses' } },
    ],
    serviceIds: ['automacao-de-testes'],
    areaIds: ['qualidade'],
    models: ['construa'],
    image: '/images/cases/clever.png',
    logo: '/images/cases/clever-logo.png',
    clientApproved: false,
    seo: {
      title: {
        pt: 'Clever: de 32 para 1.600+ testes | Caso Yellowipe',
      },
      description: {
        pt: 'Como a Yellowipe transformou uma suíte estagnada num processo de QA escalável em seis meses, com automação assistida por IA.',
      },
    },
  },
  {
    id: 'linde',
    status: 'published',
    client: 'Linde',
    sector: 'Indústria',
    market: 'PT', // [confirmar]
    slug: {
      pt: 'linde-tempo-de-regressao',
    },
    headline: {
      pt: '−94% no tempo de regressão',
    },
    summary: {
      pt: 'Uma suíte com 88% de falhas recuperada numa semana, com 128 testes automatizados e CI/CD.',
    },
    metrics: [
      {
        value: '−94%',
        label: { pt: 'tempo de regressão' },
      },
      {
        value: '128',
        label: { pt: 'testes automatizados' },
      },
    ],
    serviceIds: ['automacao-de-testes', 'pipelines-ci-cd'],
    areaIds: ['qualidade', 'cloud-devops'],
    models: ['reforce'],
    image: '/images/cases/linde.png',
    logo: '/images/cases/linde-logo.png',
    clientApproved: false,
    seo: {
      title: {
        pt: 'Linde: −94% no tempo de regressão | Caso Yellowipe',
      },
      description: {
        pt: 'Suíte com 88% de falhas recuperada numa semana: 128 testes automatizados e CI/CD.',
      },
    },
  },
  {
    id: 'hapvida',
    status: 'published',
    client: 'Hapvida',
    sector: 'Saúde',
    market: 'BR',
    slug: { pt: 'hapvida-teleconsulta' },
    headline: {
      pt: 'Teleconsulta para milhões',
    },
    summary: {
      pt: 'Desenvolvimento end-to-end da aplicação Hapvida, com acesso remoto a cuidados de saúde.',
    },
    metrics: [{ value: '[X] milhões', label: { pt: 'utilizadores' } }],
    serviceIds: ['aplicacoes-mobile'],
    areaIds: ['software', 'design'],
    models: ['construa'],
    image: '/images/cases/hapvida.png',
    imageFit: 'contain',
    logo: '/images/cases/hapvida-logo.png',
    clientApproved: false,
    seo: {
      title: {
        pt: 'Hapvida: teleconsulta para milhões | Caso Yellowipe',
      },
      description: {
        pt: 'Desenvolvimento end-to-end da aplicação Hapvida, com acesso remoto a cuidados de saúde para milhões de pessoas.',
      },
    },
  },
];
