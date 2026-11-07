import type { z } from 'zod';
import type { Area } from '../schema';

/** As sete áreas de especialização (secção "O que fazemos" da home v7). A ordem é a das abas. */
export const areas: z.input<typeof Area>[] = [
  {
    id: 'software',
    name: { pt: 'Software à medida' },
    tabLabel: { pt: 'Software\nà medida' },
    description: {
      pt: 'Software à medida do seu negócio, da primeira versão ao go-live, com uma equipa que fica até o produto estar estável.',
    },
    ai: {
      pt: 'desenvolvimento acelerado com assistentes de código como Claude Code, Cursor e GitHub Copilot.',
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
    },
  },
  {
    id: 'ia',
    name: {
      pt: 'Inteligência artificial',
    },
    tabLabel: {
      pt: 'Inteligência\nartificial',
    },
    description: {
      pt: 'Da prova de conceito à IA em produção: agentes, modelos e automações ligados aos seus dados e processos.',
    },
    ai: {
      pt: 'IA generativa, RAG e agentes em produção, ligados aos seus sistemas por MCP, com OpenAI, Azure AI, SageMaker ou Vertex AI.',
    },
    serviceIds: ['ia-generativa', 'agentes-de-ia', 'desenvolvimento-ia-ml', 'transformacao-com-ia'],
    models: ['contrate', 'reforce', 'construa'],
  },
  {
    id: 'emergentes',
    name: {
      pt: 'Tecnologias emergentes',
    },
    tabLabel: {
      pt: 'Tecnologias\nemergentes',
    },
    description: {
      pt: 'Tecnologias emergentes aplicadas a problemas concretos, com protótipos rápidos para validar antes de investir.',
    },
    ai: {
      pt: 'protótipos validados mais depressa com desenvolvimento assistido por IA.',
    },
    serviceIds: ['realidade-aumentada-e-virtual', 'blockchain', 'iot'],
    models: ['reforce', 'construa'],
  },
  {
    id: 'cloud-devops',
    name: { pt: 'Cloud e DevOps' },
    tabLabel: { pt: 'Cloud e\nDevOps' },
    description: {
      pt: 'Infraestrutura que acelera as entregas: pipelines, cloud e sistemas modernizados sem parar a operação.',
    },
    ai: {
      pt: 'infraestrutura como código e pipelines escritos e revistos com apoio de IA, e operações de modelos (MLOps).',
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
    },
  },
  {
    id: 'qualidade',
    name: { pt: 'Qualidade e testes' },
    tabLabel: { pt: 'Qualidade\ne testes' },
    description: {
      pt: 'Qualidade medida em cada entrega, com automação que cresce ao ritmo do produto.',
    },
    ai: {
      pt: 'testes gerados e mantidos com apoio de IA, como no caso Clever.',
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
    },
  },
  {
    id: 'design',
    name: { pt: 'Design de produto' },
    tabLabel: { pt: 'Design de\nproduto' },
    description: {
      pt: 'Produtos fáceis de usar, desenhados com quem os vai usar e entregues prontos a desenvolver.',
    },
    ai: {
      pt: 'pesquisa, protótipos e variantes de interface produzidos mais depressa com IA.',
    },
    serviceIds: ['ux-ui-design', 'web-design'],
    models: ['contrate', 'reforce', 'construa'],
    proof: {
      pt: 'Hapvida: experiência desenhada para milhões de utilizadores.',
    },
  },
  {
    id: 'recrutamento',
    name: { pt: 'Recrutamento tech' },
    tabLabel: { pt: 'Recrutamento\ntech' },
    description: {
      pt: 'Encontramos os perfis tecnológicos de que a sua equipa precisa, para contratação permanente, nos três mercados.',
    },
    ai: {
      pt: 'profissionais fluentes nas ferramentas de IA que a sua equipa usa, e especialistas em dados, machine learning e IA generativa.',
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
