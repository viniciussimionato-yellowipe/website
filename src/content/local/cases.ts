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
      br: 'clever-automacao-de-testes',
      en: 'clever-test-automation',
    },
    headline: { pt: '32 → 1.600+ testes', br: '32 → 1.600+ testes', en: '32 → 1,600+ tests' },
    summary: {
      pt: 'Uma suíte de testes estagnada transformada num processo de QA escalável em seis meses, com automação assistida por IA.',
      br: 'Uma suíte de testes estagnada transformada em um processo de QA escalável em seis meses, com automação assistida por IA.',
      en: 'A stalled test suite turned into a scalable QA process in six months, with AI-assisted automation.',
    },
    metrics: [
      {
        value: '32 → 1.600+',
        label: { pt: 'testes automatizados', br: 'testes automatizados', en: 'automated tests' },
      },
      { value: '6', label: { pt: 'meses', br: 'meses', en: 'months' } },
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
        br: 'Clever: de 32 para 1.600+ testes | Case Yellowipe',
        en: 'Clever: from 32 to 1,600+ tests | Yellowipe',
      },
      description: {
        pt: 'Como a Yellowipe transformou uma suíte estagnada num processo de QA escalável em seis meses, com automação assistida por IA.',
        br: 'Como a Yellowipe transformou uma suíte estagnada em um processo de QA escalável em seis meses, com automação assistida por IA.',
        en: 'How Yellowipe turned a stalled suite into a scalable QA process in six months, with AI-assisted automation.',
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
      br: 'linde-tempo-de-regressao',
      en: 'linde-regression-time',
    },
    headline: {
      pt: '−94% no tempo de regressão',
      br: '−94% no tempo de regressão',
      en: '−94% regression time',
    },
    summary: {
      pt: 'Uma suíte com 88% de falhas recuperada numa semana, com 128 testes automatizados e CI/CD.',
      br: 'Uma suíte com 88% de falhas recuperada em uma semana, com 128 testes automatizados e CI/CD.',
      en: 'A suite with an 88% failure rate recovered in one week, with 128 automated tests and CI/CD.',
    },
    metrics: [
      {
        value: '−94%',
        label: { pt: 'tempo de regressão', br: 'tempo de regressão', en: 'regression time' },
      },
      {
        value: '128',
        label: { pt: 'testes automatizados', br: 'testes automatizados', en: 'automated tests' },
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
        br: 'Linde: −94% no tempo de regressão | Case Yellowipe',
        en: 'Linde: 94% less regression time | Yellowipe',
      },
      description: {
        pt: 'Suíte com 88% de falhas recuperada numa semana: 128 testes automatizados e CI/CD.',
        br: 'Suíte com 88% de falhas recuperada em uma semana: 128 testes automatizados e CI/CD.',
        en: 'A suite with 88% failures recovered in a week: 128 automated tests and CI/CD.',
      },
    },
  },
  {
    id: 'hapvida',
    status: 'published',
    client: 'Hapvida',
    sector: 'Saúde',
    market: 'BR',
    slug: { pt: 'hapvida-teleconsulta', br: 'hapvida-teleconsulta', en: 'hapvida-telehealth' },
    headline: {
      pt: 'Teleconsulta para milhões',
      br: 'Teleconsulta para milhões',
      en: 'Telehealth for millions',
    },
    summary: {
      pt: 'Desenvolvimento end-to-end da aplicação Hapvida, com acesso remoto a cuidados de saúde.',
      br: 'Desenvolvimento end-to-end do aplicativo Hapvida, com acesso remoto a cuidados de saúde.',
      en: 'End-to-end development of the Hapvida app, with remote access to healthcare.',
    },
    metrics: [{ value: '[X] milhões', label: { pt: 'utilizadores', br: 'usuários', en: 'users' } }],
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
        br: 'Hapvida: teleconsulta para milhões | Case Yellowipe',
        en: 'Hapvida: telehealth for millions | Yellowipe',
      },
      description: {
        pt: 'Desenvolvimento end-to-end da aplicação Hapvida, com acesso remoto a cuidados de saúde para milhões de pessoas.',
        br: 'Desenvolvimento end-to-end do aplicativo Hapvida, com acesso remoto a cuidados de saúde para milhões de pessoas.',
        en: 'End-to-end development of the Hapvida app, giving millions remote access to healthcare.',
      },
    },
  },
];
