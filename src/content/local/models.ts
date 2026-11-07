import type { z } from 'zod';
import type { Model } from '../schema';
import { construa, contrate, reforce } from './model-pages';

const hire = contrate;
const augment = reforce;
const build = construa;

/**
 * Os três modelos de colaboração. Textos da v3/v7 aprovada; os da página de cada
 * modelo (v4) estão em ./model-pages.
 * Só pt-PT: as traduções estão em src/i18n/<idioma>/content.json (models.<id>).
 */
export const models: z.input<typeof Model>[] = [
  {
    id: 'contrate',
    status: 'published',
    name: { pt: 'Contrate' },
    slug: { pt: 'recrutamento-de-ti' },
    keyword: { pt: 'Recrutamento de TI' },
    promise: {
      pt: 'Os nossos recrutadores encontram o talento certo para a sua equipa, em contratação permanente.',
    },
    idealFor: {
      pt: 'Ideal para perfis difíceis de encontrar e equipas a crescer de forma estável.',
    },
    howItWorks: hire.howItWorks,
    caseIds: [],
    faq: hire.faq,
    page: hire.page,
    seo: {
      title: {
        pt: 'Recrutamento de TI | Yellowipe',
      },
      description: {
        pt: 'Recrutamento tech especializado em Portugal: developers, dados, cloud e lideranças, com shortlist em prazo definido.',
      },
    },
  },
  {
    id: 'reforce',
    status: 'published',
    name: { pt: 'Reforce' },
    slug: { pt: 'outsourcing-de-ti' },
    keyword: {
      pt: 'Outsourcing de TI',
    },
    promise: {
      pt: 'Os nossos especialistas integram-se na sua equipa e trabalham com as suas ferramentas e processos.',
    },
    idealFor: {
      pt: 'Ideal para ganhar capacidade já, sem aumentar o quadro de pessoal.',
    },
    howItWorks: augment.howItWorks,
    caseIds: ['linde'],
    faq: augment.faq,
    page: augment.page,
    seo: {
      title: {
        pt: 'Outsourcing de TI e equipas dedicadas | Yellowipe',
      },
      description: {
        pt: 'Especialistas de TI integrados na sua equipa, com as suas ferramentas. Software, cloud, QA e IA em Portugal.',
      },
    },
  },
  {
    id: 'construa',
    status: 'published',
    name: { pt: 'Construa' },
    slug: {
      pt: 'desenvolvimento-de-software',
    },
    keyword: {
      pt: 'Desenvolvimento de software',
    },
    promise: {
      pt: 'As nossas equipas constroem a solução para si, da definição do produto ao go-live.',
    },
    idealFor: {
      pt: 'Ideal para lançar produtos novos ou modernizar sistemas com uma equipa que assume a entrega.',
    },
    howItWorks: build.howItWorks,
    caseIds: ['clever', 'hapvida'],
    faq: build.faq,
    page: build.page,
    seo: {
      title: {
        pt: 'Desenvolvimento de software à medida | Yellowipe',
      },
      description: {
        pt: 'Equipas que constroem o seu produto do MVP ao go-live: web, mobile, cloud e IA, com casos reais.',
      },
    },
  },
];
