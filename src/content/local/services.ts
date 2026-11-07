import type { z } from 'zod';
import type { Service } from '../schema';
import { servicePages } from '../services/pages';

type ServiceInput = z.input<typeof Service>;
type ModelIds = ServiceInput['models'];
type L = { pt: string };

/**
 * Serviço com nome, slug e resumo. Ganha página quando tem factos em
 * content/services/pages.ts (máquina de conteúdo, docs/15-servicos.md); sem factos
 * fica em rascunho: aparece na home e no mega-menu, mas sem ligação.
 * Só pt-PT: as traduções (nome, slug, SEO…) estão em src/i18n/<idioma>/content.json.
 */
function draft(id: string, areaId: string, models: ModelIds, name: L, summary: L): ServiceInput {
  return {
    id,
    areaId,
    status: servicePages[id] ? 'published' : 'draft',
    name,
    slug: { pt: id },
    keyword: { pt: name.pt },
    summary,
    models,
    page: servicePages[id],
    seo: {
      title: {
        pt: `${name.pt} | Yellowipe`,
      },
      description: { pt: summary.pt },
    },
  };
}

const all: ModelIds = ['contrate', 'reforce', 'construa'];
const build: ModelIds = ['reforce', 'construa'];
const hire: ModelIds = ['contrate'];

export const services: ServiceInput[] = [
  // Software à medida
  draft(
    'aplicacoes-web',
    'software',
    all,
    { pt: 'Aplicações web' },
    {
      pt: 'Portais, plataformas SaaS e dashboards rápidos no browser, construídos sobre APIs.',
    },
  ),
  {
    id: 'aplicacoes-mobile',
    areaId: 'software',
    status: 'published',
    name: { pt: 'Aplicações mobile' },
    slug: {
      pt: 'desenvolvimento-de-aplicacoes-mobile',
    },
    keyword: {
      pt: 'desenvolvimento de aplicações mobile',
    },
    summary: {
      pt: 'Apps iOS e Android, nativas ou multiplataforma, da conceção à publicação nas lojas.',
    },
    models: all,
    page: servicePages['aplicacoes-mobile'],
    seo: {
      title: {
        pt: 'Desenvolvimento de aplicações mobile | Yellowipe',
      },
      description: {
        pt: 'Apps iOS e Android do desenho à publicação, com testes automáticos. Caso Hapvida: teleconsulta para milhões.',
      },
    },
  },
  draft(
    'aplicacoes-enterprise',
    'software',
    all,
    { pt: 'Aplicações enterprise' },
    {
      pt: 'Sistemas internos integrados com o ERP e o CRM, no lugar de folhas de cálculo.',
    },
  ),
  draft(
    'aplicacoes-cloud',
    'software',
    all,
    { pt: 'Aplicações cloud' },
    {
      pt: 'Aplicações cloud-native, preparadas para crescer sem reescrever a arquitetura.',
    },
  ),

  // Inteligência artificial
  draft(
    'ia-generativa',
    'ia',
    all,
    { pt: 'IA generativa' },
    {
      pt: 'Assistentes, pesquisa sobre documentos e geração de conteúdo com os dados da empresa.',
    },
  ),
  draft(
    'agentes-de-ia',
    'ia',
    build,
    { pt: 'Agentes de IA' },
    {
      pt: 'Agentes que executam tarefas de ponta a ponta, com regras e supervisão humana.',
    },
  ),
  draft(
    'desenvolvimento-ia-ml',
    'ia',
    all,
    { pt: 'Desenvolvimento de IA/ML' },
    {
      pt: 'Modelos de previsão, classificação e recomendação treinados com os seus dados.',
    },
  ),
  draft(
    'transformacao-com-ia',
    'ia',
    build,
    { pt: 'Transformação com IA' },
    {
      pt: 'Diagnóstico, priorização de casos de uso e roadmap para toda a organização.',
    },
  ),

  // Tecnologias emergentes
  draft(
    'realidade-aumentada-e-virtual',
    'emergentes',
    build,
    { pt: 'Realidade aumentada e virtual' },
    {
      pt: 'Experiências imersivas para formação, vendas e manutenção no terreno.',
    },
  ),
  draft(
    'blockchain',
    'emergentes',
    build,
    { pt: 'Blockchain' },
    {
      pt: 'Registos partilhados e contratos inteligentes onde a rastreabilidade é crítica.',
    },
  ),
  draft(
    'iot',
    'emergentes',
    build,
    { pt: 'IoT' },
    {
      pt: 'Sensores e plataformas ligados para monitorizar operações em tempo real.',
    },
  ),

  // Cloud e DevOps
  draft(
    'devops-e-devsecops',
    'cloud-devops',
    all,
    { pt: 'DevOps e DevSecOps' },
    {
      pt: 'Pipelines, infraestrutura como código e segurança integrada no ciclo de entrega.',
    },
  ),
  draft(
    'migracao-para-cloud',
    'cloud-devops',
    build,
    { pt: 'Migração para cloud' },
    {
      pt: 'Migração para AWS, Azure ou Google Cloud com o mínimo de interrupção.',
    },
  ),
  draft(
    'modernizacao-de-sistemas',
    'cloud-devops',
    build,
    { pt: 'Modernização de sistemas' },
    {
      pt: 'Sistemas legados reescritos ou decompostos por fases, sem parar o negócio.',
    },
  ),
  draft(
    'pipelines-ci-cd',
    'cloud-devops',
    all,
    { pt: 'Pipelines CI/CD' },
    {
      pt: 'Integração e entrega contínuas, com testes automáticos em cada alteração.',
    },
  ),

  // Qualidade e testes
  {
    id: 'automacao-de-testes',
    areaId: 'qualidade',
    status: 'published',
    name: { pt: 'Automação de testes' },
    slug: { pt: 'automacao-de-testes' },
    keyword: {
      pt: 'automação de testes',
    },
    summary: {
      pt: 'Suites automáticas que crescem com o produto e cortam o tempo de regressão.',
    },
    models: all,
    page: servicePages['automacao-de-testes'],
    seo: {
      title: {
        pt: 'Automação de testes | Yellowipe',
      },
      description: {
        pt: 'Testes automáticos integrados no CI/CD. Clever: de 32 para 1.600+ testes em seis meses. Linde: −94% na regressão.',
      },
    },
  },
  draft(
    'testes-de-performance',
    'qualidade',
    all,
    { pt: 'Testes de performance' },
    {
      pt: 'Testes de carga e stress que mostram os limites antes dos utilizadores.',
    },
  ),
  draft(
    'testes-de-seguranca',
    'qualidade',
    all,
    { pt: 'Testes de segurança' },
    {
      pt: 'Análise de vulnerabilidades e testes de intrusão antes de cada lançamento.',
    },
  ),
  draft(
    'testes-manuais',
    'qualidade',
    all,
    { pt: 'Testes manuais' },
    {
      pt: 'Testes exploratórios e de aceitação onde a automação não chega.',
    },
  ),

  // Design de produto
  draft(
    'ux-ui-design',
    'design',
    all,
    { pt: 'UX e UI Design' },
    {
      pt: 'Investigação, fluxos, protótipos e design system prontos para desenvolvimento.',
    },
  ),
  draft(
    'web-design',
    'design',
    build,
    { pt: 'Web design' },
    {
      pt: 'Sites institucionais e landing pages pensados para converter.',
    },
  ),

  // Recrutamento tech
  draft(
    'developers-e-engenharia',
    'recrutamento',
    hire,
    {
      pt: 'Developers e engenharia',
    },
    {
      pt: 'Front-end, back-end, mobile e full-stack, de júnior a arquiteto.',
    },
  ),
  draft(
    'recrutamento-dados-e-ia',
    'recrutamento',
    hire,
    { pt: 'Dados e IA' },
    {
      pt: 'Engenheiros de dados, cientistas de dados e especialistas em machine learning.',
    },
  ),
  draft(
    'recrutamento-cloud-devops-qa',
    'recrutamento',
    hire,
    { pt: 'Cloud, DevOps e QA' },
    {
      pt: 'Perfis de infraestrutura, automação e qualidade de software.',
    },
  ),
  draft(
    'liderancas-tecnologicas',
    'recrutamento',
    hire,
    { pt: 'Lideranças tecnológicas' },
    {
      pt: 'Tech leads, engineering managers e CTOs.',
    },
  ),
];
