import type { z } from 'zod';
import type { Model } from '../schema';
import { construa, contrate, reforce } from './model-pages';
import { construaEn, contrateEn, reforceEn } from './model-pages.en';
import type { ModelEn } from './model-pages.en';

type Extra = Pick<z.input<typeof Model>, 'page' | 'howItWorks' | 'faq'>;

/** Junta a versão inglesa (model-pages.en.ts) aos textos pt/br de cada modelo. */
function withEnglish(base: Extra, en: ModelEn): Extra {
  if (en.faq.length !== base.faq.length)
    throw new Error('FAQ en com número de perguntas diferente');
  return {
    page: { ...base.page, en: en.page },
    howItWorks: { ...base.howItWorks, en: en.howItWorks },
    faq: base.faq.map((f, i) => ({
      q: { ...f.q, en: en.faq[i]!.q },
      a: { ...f.a, en: en.faq[i]!.a },
    })),
  };
}

const hire = withEnglish(contrate, contrateEn);
const augment = withEnglish(reforce, reforceEn);
const build = withEnglish(construa, construaEn);

/**
 * Os três modelos de colaboração. Textos da v3/v7 aprovada; os da página de cada
 * modelo (v4) estão em ./model-pages.
 * en: páginas completas (model-pages.en.ts); en-GB deriva do en.
 */
export const models: z.input<typeof Model>[] = [
  {
    id: 'contrate',
    status: 'published',
    name: { pt: 'Contrate', br: 'Contrate', en: 'Hire' },
    slug: { pt: 'recrutamento-de-ti', br: 'recrutamento-de-ti', en: 'it-recruitment' },
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
    howItWorks: hire.howItWorks,
    caseIds: [],
    faq: hire.faq,
    page: hire.page,
    seo: {
      title: {
        pt: 'Recrutamento de TI | Yellowipe',
        br: 'Recrutamento de TI | Yellowipe',
        en: 'IT recruitment and tech hiring | Yellowipe',
      },
      description: {
        pt: 'Recrutamento tech especializado em Portugal: developers, dados, cloud e lideranças, com shortlist em prazo definido.',
        br: 'Recrutamento tech especializado: desenvolvedores, dados, cloud e lideranças, com shortlist em prazo definido.',
        en: 'Specialized tech recruitment for US and European teams: developers, data, cloud and leadership roles, with a technically assessed shortlist.',
      },
    },
  },
  {
    id: 'reforce',
    status: 'published',
    name: { pt: 'Reforce', br: 'Reforce', en: 'Augment' },
    slug: { pt: 'outsourcing-de-ti', br: 'alocacao-de-profissionais-ti', en: 'staff-augmentation' },
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
    howItWorks: augment.howItWorks,
    caseIds: ['linde'],
    faq: augment.faq,
    page: augment.page,
    seo: {
      title: {
        pt: 'Outsourcing de TI e equipas dedicadas | Yellowipe',
        br: 'Alocação de profissionais de TI | Yellowipe',
        en: 'Nearshore staff augmentation | Yellowipe',
      },
      description: {
        pt: 'Especialistas de TI integrados na sua equipa, com as suas ferramentas. Software, cloud, QA e IA em Portugal.',
        br: 'Alocação de desenvolvedores e especialistas de TI integrados à sua equipe. Software, cloud, QA e IA.',
        en: 'Nearshore developers and IT specialists from Portugal and Brazil who join your team and tools. Software, cloud, QA and AI.',
      },
    },
  },
  {
    id: 'construa',
    status: 'published',
    name: { pt: 'Construa', br: 'Construa', en: 'Build' },
    slug: {
      pt: 'desenvolvimento-de-software',
      br: 'desenvolvimento-de-software',
      en: 'software-development',
    },
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
      en: 'Ideal for launching new products or modernizing systems with a team that owns delivery.',
    },
    howItWorks: build.howItWorks,
    caseIds: ['clever', 'hapvida'],
    faq: build.faq,
    page: build.page,
    seo: {
      title: {
        pt: 'Desenvolvimento de software à medida | Yellowipe',
        br: 'Desenvolvimento de software sob medida | Yellowipe',
        en: 'Custom software development | Yellowipe',
      },
      description: {
        pt: 'Equipas que constroem o seu produto do MVP ao go-live: web, mobile, cloud e IA, com casos reais.',
        br: 'Equipes que constroem o seu produto do MVP ao go-live: web, mobile, cloud e IA, com cases reais.',
        en: 'Nearshore teams that build your product from MVP to go-live: web, mobile, cloud and AI, backed by real case studies.',
      },
    },
  },
];
