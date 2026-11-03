import type { z } from 'zod';
import type { Service } from '../schema';
import { servicePages } from '../services/pages';

type ServiceInput = z.input<typeof Service>;
type ModelIds = ServiceInput['models'];
type L = { pt: string; br: string; en: string };

/**
 * Serviço com nome, slug e resumo. Ganha página quando tem factos em
 * content/services/pages.ts (máquina de conteúdo, docs/15-servicos.md); sem factos
 * fica em rascunho: aparece na home e no mega-menu, mas sem ligação.
 */
function draft(
  id: string,
  areaId: string,
  models: ModelIds,
  name: L,
  summary: L,
  slugBr: string = id,
): ServiceInput {
  return {
    id,
    areaId,
    status: servicePages[id] ? 'published' : 'draft',
    name,
    slug: { pt: id, br: slugBr },
    keyword: { pt: name.pt, br: name.br, en: name.en },
    summary,
    models,
    page: servicePages[id],
    seo: {
      title: { pt: `${name.pt} | Yellowipe`, br: `${name.br} | Yellowipe` },
      description: { pt: summary.pt, br: summary.br },
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
    { pt: 'Aplicações web', br: 'Aplicações web', en: 'Web applications' },
    {
      pt: 'Portais, plataformas SaaS e dashboards rápidos no browser, construídos sobre APIs.',
      br: 'Portais, plataformas SaaS e dashboards rápidos no navegador, construídos sobre APIs.',
      en: 'Portals, SaaS platforms and fast dashboards in the browser, built on APIs.',
    },
  ),
  {
    id: 'aplicacoes-mobile',
    areaId: 'software',
    status: 'published',
    name: { pt: 'Aplicações mobile', br: 'Desenvolvimento de aplicativos', en: 'Mobile apps' },
    slug: { pt: 'desenvolvimento-de-aplicacoes-mobile', br: 'desenvolvimento-de-aplicativos' },
    keyword: {
      pt: 'desenvolvimento de aplicações mobile',
      br: 'desenvolvimento de aplicativos',
      en: 'mobile app development',
    },
    summary: {
      pt: 'Apps iOS e Android, nativas ou multiplataforma, da conceção à publicação nas lojas.',
      br: 'Apps iOS e Android, nativos ou multiplataforma, da concepção à publicação nas lojas.',
      en: 'iOS and Android apps, native or cross-platform, from concept to store release.',
    },
    models: all,
    page: servicePages['aplicacoes-mobile'],
    seo: {
      title: {
        pt: 'Desenvolvimento de aplicações mobile | Yellowipe',
        br: 'Desenvolvimento de aplicativos | Yellowipe',
      },
      description: {
        pt: 'Apps iOS e Android do desenho à publicação, com testes automáticos. Caso Hapvida: teleconsulta para milhões.',
        br: 'Aplicativos iOS e Android do desenho à publicação, com testes automatizados. Case Hapvida: teleconsulta para milhões.',
      },
    },
  },
  draft(
    'aplicacoes-enterprise',
    'software',
    all,
    { pt: 'Aplicações enterprise', br: 'Aplicações corporativas', en: 'Enterprise applications' },
    {
      pt: 'Sistemas internos integrados com o ERP e o CRM, no lugar de folhas de cálculo.',
      br: 'Sistemas internos integrados ao ERP e ao CRM, no lugar de planilhas.',
      en: 'Internal systems integrated with your ERP and CRM, instead of spreadsheets.',
    },
    'aplicacoes-corporativas',
  ),
  draft(
    'aplicacoes-cloud',
    'software',
    all,
    { pt: 'Aplicações cloud', br: 'Aplicações cloud', en: 'Cloud applications' },
    {
      pt: 'Aplicações cloud-native, preparadas para crescer sem reescrever a arquitetura.',
      br: 'Aplicações cloud-native, preparadas para crescer sem reescrever a arquitetura.',
      en: 'Cloud-native applications built to scale without rewriting the architecture.',
    },
  ),

  // Inteligência artificial
  draft(
    'ia-generativa',
    'ia',
    all,
    { pt: 'IA generativa', br: 'IA generativa', en: 'Generative AI' },
    {
      pt: 'Assistentes, pesquisa sobre documentos e geração de conteúdo com os dados da empresa.',
      br: 'Assistentes, busca em documentos e geração de conteúdo com os dados da empresa.',
      en: 'Assistants, document search and content generation on company data.',
    },
  ),
  draft(
    'agentes-de-ia',
    'ia',
    build,
    { pt: 'Agentes de IA', br: 'Agentes de IA', en: 'AI agents' },
    {
      pt: 'Agentes que executam tarefas de ponta a ponta, com regras e supervisão humana.',
      br: 'Agentes que executam tarefas de ponta a ponta, com regras e supervisão humana.',
      en: 'Agents that run tasks end to end, with rules and human oversight.',
    },
  ),
  draft(
    'desenvolvimento-ia-ml',
    'ia',
    all,
    { pt: 'Desenvolvimento de IA/ML', br: 'Desenvolvimento de IA/ML', en: 'AI/ML development' },
    {
      pt: 'Modelos de previsão, classificação e recomendação treinados com os seus dados.',
      br: 'Modelos de previsão, classificação e recomendação treinados com os seus dados.',
      en: 'Forecasting, classification and recommendation models trained on your data.',
    },
  ),
  draft(
    'transformacao-com-ia',
    'ia',
    build,
    { pt: 'Transformação com IA', br: 'Transformação com IA', en: 'AI transformation' },
    {
      pt: 'Diagnóstico, priorização de casos de uso e roadmap para toda a organização.',
      br: 'Diagnóstico, priorização de casos de uso e roadmap para toda a organização.',
      en: 'Assessment, use-case prioritisation and a roadmap for the whole organisation.',
    },
  ),

  // Tecnologias emergentes
  draft(
    'realidade-aumentada-e-virtual',
    'emergentes',
    build,
    { pt: 'Realidade aumentada e virtual', br: 'Realidade aumentada e virtual', en: 'AR and VR' },
    {
      pt: 'Experiências imersivas para formação, vendas e manutenção no terreno.',
      br: 'Experiências imersivas para treinamento, vendas e manutenção em campo.',
      en: 'Immersive experiences for training, sales and field maintenance.',
    },
  ),
  draft(
    'blockchain',
    'emergentes',
    build,
    { pt: 'Blockchain', br: 'Blockchain', en: 'Blockchain' },
    {
      pt: 'Registos partilhados e contratos inteligentes onde a rastreabilidade é crítica.',
      br: 'Registros compartilhados e contratos inteligentes onde a rastreabilidade é crítica.',
      en: 'Shared ledgers and smart contracts where traceability is critical.',
    },
  ),
  draft(
    'iot',
    'emergentes',
    build,
    { pt: 'IoT', br: 'IoT', en: 'IoT' },
    {
      pt: 'Sensores e plataformas ligados para monitorizar operações em tempo real.',
      br: 'Sensores e plataformas conectados para monitorar operações em tempo real.',
      en: 'Connected sensors and platforms to monitor operations in real time.',
    },
  ),

  // Cloud e DevOps
  draft(
    'devops-e-devsecops',
    'cloud-devops',
    all,
    { pt: 'DevOps e DevSecOps', br: 'DevOps e DevSecOps', en: 'DevOps and DevSecOps' },
    {
      pt: 'Pipelines, infraestrutura como código e segurança integrada no ciclo de entrega.',
      br: 'Pipelines, infraestrutura como código e segurança integrada ao ciclo de entrega.',
      en: 'Pipelines, infrastructure as code and security built into delivery.',
    },
  ),
  draft(
    'migracao-para-cloud',
    'cloud-devops',
    build,
    { pt: 'Migração para cloud', br: 'Migração para cloud', en: 'Cloud migration' },
    {
      pt: 'Migração para AWS, Azure ou Google Cloud com o mínimo de interrupção.',
      br: 'Migração para AWS, Azure ou Google Cloud com o mínimo de interrupção.',
      en: 'Migration to AWS, Azure or Google Cloud with minimal disruption.',
    },
  ),
  draft(
    'modernizacao-de-sistemas',
    'cloud-devops',
    build,
    { pt: 'Modernização de sistemas', br: 'Modernização de sistemas', en: 'Legacy modernisation' },
    {
      pt: 'Sistemas legados reescritos ou decompostos por fases, sem parar o negócio.',
      br: 'Sistemas legados reescritos ou decompostos por fases, sem parar o negócio.',
      en: 'Legacy systems rewritten or broken up in phases, without stopping the business.',
    },
  ),
  draft(
    'pipelines-ci-cd',
    'cloud-devops',
    all,
    { pt: 'Pipelines CI/CD', br: 'Pipelines CI/CD', en: 'CI/CD pipelines' },
    {
      pt: 'Integração e entrega contínuas, com testes automáticos em cada alteração.',
      br: 'Integração e entrega contínuas, com testes automatizados a cada alteração.',
      en: 'Continuous integration and delivery, with automated tests on every change.',
    },
  ),

  // Qualidade e testes
  {
    id: 'automacao-de-testes',
    areaId: 'qualidade',
    status: 'published',
    name: { pt: 'Automação de testes', br: 'Automação de testes', en: 'Test automation' },
    slug: { pt: 'automacao-de-testes', br: 'automacao-de-testes' },
    keyword: { pt: 'automação de testes', br: 'automação de testes', en: 'test automation' },
    summary: {
      pt: 'Suites automáticas que crescem com o produto e cortam o tempo de regressão.',
      br: 'Suítes automatizadas que crescem com o produto e cortam o tempo de regressão.',
      en: 'Automated suites that grow with the product and cut regression time.',
    },
    models: all,
    page: servicePages['automacao-de-testes'],
    seo: {
      title: { pt: 'Automação de testes | Yellowipe', br: 'Automação de testes | Yellowipe' },
      description: {
        pt: 'Testes automáticos integrados no CI/CD. Clever: de 32 para 1.600+ testes em seis meses. Linde: −94% na regressão.',
        br: 'Testes automatizados integrados ao CI/CD. Clever: de 32 para 1.600+ testes em seis meses. Linde: −94% na regressão.',
      },
    },
  },
  draft(
    'testes-de-performance',
    'qualidade',
    all,
    { pt: 'Testes de performance', br: 'Testes de performance', en: 'Performance testing' },
    {
      pt: 'Testes de carga e stress que mostram os limites antes dos utilizadores.',
      br: 'Testes de carga e estresse que mostram os limites antes dos usuários.',
      en: 'Load and stress tests that find the limits before your users do.',
    },
  ),
  draft(
    'testes-de-seguranca',
    'qualidade',
    all,
    { pt: 'Testes de segurança', br: 'Testes de segurança', en: 'Security testing' },
    {
      pt: 'Análise de vulnerabilidades e testes de intrusão antes de cada lançamento.',
      br: 'Análise de vulnerabilidades e testes de invasão antes de cada lançamento.',
      en: 'Vulnerability scans and penetration tests before each release.',
    },
  ),
  draft(
    'testes-manuais',
    'qualidade',
    all,
    { pt: 'Testes manuais', br: 'Testes manuais', en: 'Manual testing' },
    {
      pt: 'Testes exploratórios e de aceitação onde a automação não chega.',
      br: 'Testes exploratórios e de aceitação onde a automação não chega.',
      en: 'Exploratory and acceptance testing where automation falls short.',
    },
  ),

  // Design de produto
  draft(
    'ux-ui-design',
    'design',
    all,
    { pt: 'UX e UI Design', br: 'UX e UI Design', en: 'UX and UI design' },
    {
      pt: 'Investigação, fluxos, protótipos e design system prontos para desenvolvimento.',
      br: 'Pesquisa, fluxos, protótipos e design system prontos para desenvolvimento.',
      en: 'Research, flows, prototypes and a design system ready to build.',
    },
  ),
  draft(
    'web-design',
    'design',
    build,
    { pt: 'Web design', br: 'Web design', en: 'Web design' },
    {
      pt: 'Sites institucionais e landing pages pensados para converter.',
      br: 'Sites institucionais e landing pages pensados para converter.',
      en: 'Corporate sites and landing pages built to convert.',
    },
  ),

  // Recrutamento tech
  draft(
    'developers-e-engenharia',
    'recrutamento',
    hire,
    {
      pt: 'Developers e engenharia',
      br: 'Desenvolvedores e engenharia',
      en: 'Developers and engineering',
    },
    {
      pt: 'Front-end, back-end, mobile e full-stack, de júnior a arquiteto.',
      br: 'Front-end, back-end, mobile e full-stack, de júnior a arquiteto.',
      en: 'Front-end, back-end, mobile and full-stack, from junior to architect.',
    },
    'desenvolvedores-e-engenharia',
  ),
  draft(
    'recrutamento-dados-e-ia',
    'recrutamento',
    hire,
    { pt: 'Dados e IA', br: 'Dados e IA', en: 'Data and AI' },
    {
      pt: 'Engenheiros de dados, cientistas de dados e especialistas em machine learning.',
      br: 'Engenheiros de dados, cientistas de dados e especialistas em machine learning.',
      en: 'Data engineers, data scientists and machine learning specialists.',
    },
  ),
  draft(
    'recrutamento-cloud-devops-qa',
    'recrutamento',
    hire,
    { pt: 'Cloud, DevOps e QA', br: 'Cloud, DevOps e QA', en: 'Cloud, DevOps and QA' },
    {
      pt: 'Perfis de infraestrutura, automação e qualidade de software.',
      br: 'Perfis de infraestrutura, automação e qualidade de software.',
      en: 'Infrastructure, automation and software quality profiles.',
    },
  ),
  draft(
    'liderancas-tecnologicas',
    'recrutamento',
    hire,
    { pt: 'Lideranças tecnológicas', br: 'Lideranças de tecnologia', en: 'Tech leadership' },
    {
      pt: 'Tech leads, engineering managers e CTOs.',
      br: 'Tech leads, engineering managers e CTOs.',
      en: 'Tech leads, engineering managers and CTOs.',
    },
    'liderancas-de-tecnologia',
  ),
];
