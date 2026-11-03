import type { z } from 'zod';
import type { Area } from '../schema';

/** As sete áreas de especialização (secção "O que fazemos" da home v7). A ordem é a das abas. */
export const areas: z.input<typeof Area>[] = [
  {
    id: 'software',
    name: { pt: 'Software à medida', br: 'Software sob medida', en: 'Custom software' },
    tabLabel: { pt: 'Software\nà medida', br: 'Software\nsob medida', en: 'Custom\nsoftware' },
    description: {
      pt: 'Software à medida do seu negócio, da primeira versão ao go-live, com uma equipa que fica até o produto estar estável.',
      br: 'Software sob medida para o seu negócio, da primeira versão ao go-live, com uma equipe que fica até o produto estar estável.',
      en: 'Software built around your business, from the first release to go-live, with a team that stays until the product is stable.',
    },
    ai: {
      pt: 'desenvolvimento acelerado com assistentes de código como Claude Code, Cursor e GitHub Copilot.',
      br: 'desenvolvimento acelerado com assistentes de código como Claude Code, Cursor e GitHub Copilot.',
      en: 'faster delivery with coding assistants such as Claude Code, Cursor and GitHub Copilot.',
    },
    serviceIds: [
      'aplicacoes-web',
      'aplicacoes-mobile',
      'aplicacoes-enterprise',
      'aplicacoes-cloud',
    ],
    models: ['contrate', 'reforce', 'construa'],
    proof: {
      pt: 'Hapvida: aplicação com teleconsulta para milhões de utilizadores.',
      br: 'Hapvida: aplicativo com teleconsulta para milhões de usuários.',
      en: 'Hapvida: a telehealth app for millions of users.',
    },
  },
  {
    id: 'ia',
    name: {
      pt: 'Inteligência artificial',
      br: 'Inteligência artificial',
      en: 'Artificial intelligence',
    },
    tabLabel: {
      pt: 'Inteligência\nartificial',
      br: 'Inteligência\nartificial',
      en: 'Artificial\nintelligence',
    },
    description: {
      pt: 'Da prova de conceito à IA em produção: agentes, modelos e automações ligados aos seus dados e processos.',
      br: 'Da prova de conceito à IA em produção: agentes, modelos e automações conectados aos seus dados e processos.',
      en: 'From proof of concept to AI in production: agents, models and automations connected to your data and processes.',
    },
    ai: {
      pt: 'IA generativa, RAG e agentes em produção, ligados aos seus sistemas por MCP, com OpenAI, Azure AI, SageMaker ou Vertex AI.',
      br: 'IA generativa, RAG e agentes em produção, conectados aos seus sistemas por MCP, com OpenAI, Azure AI, SageMaker ou Vertex AI.',
      en: 'generative AI, RAG and agents in production, connected to your systems via MCP, on OpenAI, Azure AI, SageMaker or Vertex AI.',
    },
    serviceIds: ['ia-generativa', 'agentes-de-ia', 'desenvolvimento-ia-ml', 'transformacao-com-ia'],
    models: ['contrate', 'reforce', 'construa'],
  },
  {
    id: 'emergentes',
    name: {
      pt: 'Tecnologias emergentes',
      br: 'Tecnologias emergentes',
      en: 'Emerging technologies',
    },
    tabLabel: {
      pt: 'Tecnologias\nemergentes',
      br: 'Tecnologias\nemergentes',
      en: 'Emerging\ntech',
    },
    description: {
      pt: 'Tecnologias emergentes aplicadas a problemas concretos, com protótipos rápidos para validar antes de investir.',
      br: 'Tecnologias emergentes aplicadas a problemas concretos, com protótipos rápidos para validar antes de investir.',
      en: 'Emerging technologies applied to concrete problems, with fast prototypes to validate before investing.',
    },
    ai: {
      pt: 'protótipos validados mais depressa com desenvolvimento assistido por IA.',
      br: 'protótipos validados mais rápido com desenvolvimento assistido por IA.',
      en: 'prototypes validated faster with AI-assisted development.',
    },
    serviceIds: ['realidade-aumentada-e-virtual', 'blockchain', 'iot'],
    models: ['reforce', 'construa'],
  },
  {
    id: 'cloud-devops',
    name: { pt: 'Cloud e DevOps', br: 'Cloud e DevOps', en: 'Cloud and DevOps' },
    tabLabel: { pt: 'Cloud e\nDevOps', br: 'Cloud e\nDevOps', en: 'Cloud and\nDevOps' },
    description: {
      pt: 'Infraestrutura que acelera as entregas: pipelines, cloud e sistemas modernizados sem parar a operação.',
      br: 'Infraestrutura que acelera as entregas: pipelines, cloud e sistemas modernizados sem parar a operação.',
      en: 'Infrastructure that speeds up delivery: pipelines, cloud and modernised systems without stopping operations.',
    },
    ai: {
      pt: 'infraestrutura como código e pipelines escritos e revistos com apoio de IA, e operações de modelos (MLOps).',
      br: 'infraestrutura como código e pipelines escritos e revisados com apoio de IA, e operações de modelos (MLOps).',
      en: 'infrastructure as code and pipelines written and reviewed with AI support, plus model operations (MLOps).',
    },
    serviceIds: [
      'devops-e-devsecops',
      'migracao-para-cloud',
      'modernizacao-de-sistemas',
      'pipelines-ci-cd',
    ],
    models: ['contrate', 'reforce', 'construa'],
    proof: {
      pt: 'Linde: −94% no tempo de regressão com CI/CD.',
      br: 'Linde: −94% no tempo de regressão com CI/CD.',
      en: 'Linde: 94% less regression time with CI/CD.',
    },
  },
  {
    id: 'qualidade',
    name: { pt: 'Qualidade e testes', br: 'Qualidade e testes', en: 'Quality and testing' },
    tabLabel: { pt: 'Qualidade\ne testes', br: 'Qualidade\ne testes', en: 'Quality and\ntesting' },
    description: {
      pt: 'Qualidade medida em cada entrega, com automação que cresce ao ritmo do produto.',
      br: 'Qualidade medida em cada entrega, com automação que cresce no ritmo do produto.',
      en: 'Quality measured in every release, with automation that grows with the product.',
    },
    ai: {
      pt: 'testes gerados e mantidos com apoio de IA, como no caso Clever.',
      br: 'testes gerados e mantidos com apoio de IA, como no case Clever.',
      en: 'tests generated and maintained with AI support, as in the Clever case.',
    },
    serviceIds: [
      'automacao-de-testes',
      'testes-de-performance',
      'testes-de-seguranca',
      'testes-manuais',
    ],
    models: ['contrate', 'reforce', 'construa'],
    proof: {
      pt: 'Clever: de 32 para 1.600+ testes automatizados em seis meses.',
      br: 'Clever: de 32 para 1.600+ testes automatizados em seis meses.',
      en: 'Clever: from 32 to 1,600+ automated tests in six months.',
    },
  },
  {
    id: 'design',
    name: { pt: 'Design de produto', br: 'Design de produto', en: 'Product design' },
    tabLabel: { pt: 'Design de\nproduto', br: 'Design de\nproduto', en: 'Product\ndesign' },
    description: {
      pt: 'Produtos fáceis de usar, desenhados com quem os vai usar e entregues prontos a desenvolver.',
      br: 'Produtos fáceis de usar, desenhados com quem vai usá-los e entregues prontos para desenvolver.',
      en: 'Easy-to-use products, designed with the people who will use them and handed over ready to build.',
    },
    ai: {
      pt: 'pesquisa, protótipos e variantes de interface produzidos mais depressa com IA.',
      br: 'pesquisa, protótipos e variantes de interface produzidos mais rápido com IA.',
      en: 'research, prototypes and interface variants produced faster with AI.',
    },
    serviceIds: ['ux-ui-design', 'web-design'],
    models: ['contrate', 'reforce', 'construa'],
    proof: {
      pt: 'Hapvida: experiência desenhada para milhões de utilizadores.',
      br: 'Hapvida: experiência desenhada para milhões de usuários.',
      en: 'Hapvida: an experience designed for millions of users.',
    },
  },
  {
    id: 'recrutamento',
    name: { pt: 'Recrutamento tech', br: 'Recrutamento tech', en: 'Tech recruitment' },
    tabLabel: { pt: 'Recrutamento\ntech', br: 'Recrutamento\ntech', en: 'Tech\nrecruitment' },
    description: {
      pt: 'Encontramos os perfis tecnológicos de que a sua equipa precisa, para contratação permanente, nos três mercados.',
      br: 'Encontramos os perfis de tecnologia de que a sua equipe precisa, para contratação efetiva, nos três mercados.',
      en: 'We find the tech profiles your team needs, for permanent hiring, across our three markets.',
    },
    ai: {
      pt: 'profissionais fluentes nas ferramentas de IA que a sua equipa usa, e especialistas em dados, machine learning e IA generativa.',
      br: 'profissionais fluentes nas ferramentas de IA que a sua equipe usa, e especialistas em dados, machine learning e IA generativa.',
      en: 'professionals fluent in the AI tools your team uses, plus data, machine learning and generative AI specialists.',
    },
    serviceIds: [
      'developers-e-engenharia',
      'recrutamento-dados-e-ia',
      'recrutamento-cloud-devops-qa',
      'liderancas-tecnologicas',
    ],
    models: ['contrate'],
  },
];
