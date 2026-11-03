import type { z } from 'zod';
import type { Model } from '../schema';
import { construa, contrate, reforce } from './model-pages';

/**
 * Os três modelos de colaboração. Textos da v3/v7 aprovada; os da página de cada
 * modelo (v4) estão em ./model-pages.
 * en: só nome, promessa e palavra-chave (para a home); as páginas en chegam no sprint 4.
 */
export const models: z.input<typeof Model>[] = [
  {
    id: 'contrate',
    status: 'published',
    name: { pt: 'Contrate', br: 'Contrate', en: 'Hire' },
    slug: { pt: 'recrutamento-de-ti', br: 'recrutamento-de-ti' },
    keyword: { pt: 'Recrutamento de TI', br: 'Recrutamento de TI', en: 'IT recruitment' },
    promise: {
      pt: 'Os nossos recrutadores encontram o talento certo para a sua equipa, em contratação permanente.',
      br: 'Nossos recrutadores encontram o talento certo para a sua equipe, em contratação efetiva.',
      en: 'Our recruiters find the right talent for your team, for permanent hiring.',
    },
    idealFor: {
      pt: 'Ideal para perfis difíceis de encontrar e equipas a crescer de forma estável.',
      br: 'Ideal para perfis difíceis de encontrar e equipes crescendo de forma estável.',
      en: 'Ideal for hard-to-find profiles and teams growing steadily.',
    },
    howItWorks: contrate.howItWorks,
    caseIds: [],
    faq: contrate.faq,
    page: contrate.page,
    seo: {
      title: { pt: 'Recrutamento de TI | Yellowipe', br: 'Recrutamento de TI | Yellowipe' },
      description: {
        pt: 'Recrutamento tech especializado em Portugal: developers, dados, cloud e lideranças, com shortlist em prazo definido.',
        br: 'Recrutamento tech especializado: desenvolvedores, dados, cloud e lideranças, com shortlist em prazo definido.',
      },
    },
  },
  {
    id: 'reforce',
    status: 'published',
    name: { pt: 'Reforce', br: 'Reforce', en: 'Augment' },
    slug: { pt: 'outsourcing-de-ti', br: 'alocacao-de-profissionais-ti' },
    keyword: {
      pt: 'Outsourcing de TI',
      br: 'Alocação de profissionais de TI',
      en: 'Staff augmentation',
    },
    promise: {
      pt: 'Os nossos especialistas integram-se na sua equipa e trabalham com as suas ferramentas e processos.',
      br: 'Nossos especialistas se integram à sua equipe e trabalham com as suas ferramentas e processos.',
      en: 'Our specialists join your team and work with your tools and processes.',
    },
    idealFor: {
      pt: 'Ideal para ganhar capacidade já, sem aumentar o quadro de pessoal.',
      br: 'Ideal para ganhar capacidade já, sem aumentar o quadro de funcionários.',
      en: 'Ideal for adding capacity now, without growing headcount.',
    },
    howItWorks: reforce.howItWorks,
    caseIds: ['linde'],
    faq: reforce.faq,
    page: reforce.page,
    seo: {
      title: {
        pt: 'Outsourcing de TI e equipas dedicadas | Yellowipe',
        br: 'Alocação de profissionais de TI | Yellowipe',
      },
      description: {
        pt: 'Especialistas de TI integrados na sua equipa, com as suas ferramentas. Software, cloud, QA e IA em Portugal.',
        br: 'Alocação de desenvolvedores e especialistas de TI integrados à sua equipe. Software, cloud, QA e IA.',
      },
    },
  },
  {
    id: 'construa',
    status: 'published',
    name: { pt: 'Construa', br: 'Construa', en: 'Build' },
    slug: { pt: 'desenvolvimento-de-software', br: 'desenvolvimento-de-software' },
    keyword: {
      pt: 'Desenvolvimento de software',
      br: 'Desenvolvimento de software',
      en: 'Software development',
    },
    promise: {
      pt: 'As nossas equipas constroem a solução para si, da definição do produto ao go-live.',
      br: 'Nossas equipes constroem a solução para você, da definição do produto ao go-live.',
      en: 'Our teams build the solution for you, from product definition to go-live.',
    },
    idealFor: {
      pt: 'Ideal para lançar produtos novos ou modernizar sistemas com uma equipa que assume a entrega.',
      br: 'Ideal para lançar produtos novos ou modernizar sistemas com uma equipe que assume a entrega.',
      en: 'Ideal for launching new products or modernising systems with a team that owns delivery.',
    },
    howItWorks: construa.howItWorks,
    caseIds: ['clever', 'hapvida'],
    faq: construa.faq,
    page: construa.page,
    seo: {
      title: {
        pt: 'Desenvolvimento de software à medida | Yellowipe',
        br: 'Desenvolvimento de software sob medida | Yellowipe',
      },
      description: {
        pt: 'Equipas que constroem o seu produto do MVP ao go-live: web, mobile, cloud e IA, com casos reais.',
        br: 'Equipes que constroem o seu produto do MVP ao go-live: web, mobile, cloud e IA, com cases reais.',
      },
    },
  },
];
