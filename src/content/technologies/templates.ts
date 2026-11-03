import type { ModelId, TechCategory } from '../schema';

/**
 * Modelos de texto da máquina de conteúdo por stack.
 *
 * Regras (docs/14-tecnologias.md):
 * - {name} é substituído pelo nome da stack. Nada mais é interpolado.
 * - Cada serviço começa num problema do cliente (pain) e termina no que fazemos (text).
 * - pt-PT e inglês escritos à mão; pt-BR gerado por ptToBr() a partir do pt-PT e revisto por amostragem.
 * - IA aparece de forma discreta: um bloco "Ferramentas de IA que usamos" em cada página e uma pergunta
 *   frequente. Não há páginas próprias para ferramentas de IA (decisão do benchmark BairesDev).
 */
export type Two = { pt: string; en: string };
type ServiceTpl = { id: string; title: Two; pain: Two; text: Two };
type FaqTpl = { q: Two; a: Two };
type ProfileTpl = {
  role: Two;
  bio: Two;
  years: number;
  city: string;
  market: 'PT' | 'BR';
  model: ModelId;
};

export const CATEGORY_LABEL: Record<TechCategory, Two> = {
  'front-end': { pt: 'Front-end', en: 'Front-end' },
  mobile: { pt: 'Mobile', en: 'Mobile' },
  'back-end': { pt: 'Back-end', en: 'Back-end' },
  cloud: { pt: 'Cloud', en: 'Cloud' },
  devops: { pt: 'DevOps', en: 'DevOps' },
  qa: { pt: 'Qualidade e testes', en: 'Quality and testing' },
  data: { pt: 'Dados', en: 'Data' },
  database: { pt: 'Bases de dados', en: 'Databases' },
  enterprise: { pt: 'ERP, CRM e low-code', en: 'ERP, CRM and low-code' },
  ai: { pt: 'IA e machine learning', en: 'AI and machine learning' },
};

/** Palavra-chave por omissão (H1 e título SEO). A stack pode substituir. */
export const KEYWORD: Record<TechCategory, Two> = {
  'front-end': { pt: 'Desenvolvimento {name}', en: '{name} development' },
  mobile: { pt: 'Desenvolvimento de apps {name}', en: '{name} app development' },
  'back-end': { pt: 'Desenvolvimento {name}', en: '{name} development' },
  cloud: { pt: 'Consultoria {name}', en: '{name} consulting' },
  devops: { pt: 'Consultoria {name}', en: '{name} consulting' },
  qa: { pt: 'Automação de testes com {name}', en: 'Test automation with {name}' },
  data: { pt: 'Engenharia de dados com {name}', en: '{name} data engineering' },
  database: { pt: 'Consultoria {name}', en: '{name} consulting' },
  enterprise: { pt: 'Consultoria {name}', en: '{name} consulting' },
  ai: { pt: 'Desenvolvimento com {name}', en: '{name} development' },
};

/** Quem procuramos/apresentamos (para frases e títulos de perfis). */
export const ROLE_NOUN: Record<TechCategory, Two> = {
  'front-end': { pt: 'programadores {name}', en: '{name} developers' },
  mobile: { pt: 'programadores {name}', en: '{name} developers' },
  'back-end': { pt: 'programadores {name}', en: '{name} developers' },
  cloud: { pt: 'engenheiros {name}', en: '{name} engineers' },
  devops: { pt: 'engenheiros {name}', en: '{name} engineers' },
  qa: { pt: 'engenheiros de QA com {name}', en: 'QA engineers with {name}' },
  data: { pt: 'engenheiros de dados {name}', en: '{name} data engineers' },
  database: { pt: 'especialistas {name}', en: '{name} specialists' },
  enterprise: { pt: 'consultores {name}', en: '{name} consultants' },
  ai: { pt: 'engenheiros de IA com {name}', en: '{name} AI engineers' },
};

/** Etiquetas das cinco camadas do cartão do topo. */
export const LAYERS: Record<TechCategory, Two[]> = {
  'front-end': [
    { pt: 'Interface', en: 'Interface' },
    { pt: 'Estado e dados', en: 'State and data' },
    { pt: 'Build', en: 'Build' },
    { pt: 'Testes', en: 'Testing' },
    { pt: 'Entrega', en: 'Delivery' },
  ],
  mobile: [
    { pt: 'App', en: 'App' },
    { pt: 'Interface', en: 'UI' },
    { pt: 'Dados', en: 'Data' },
    { pt: 'Testes', en: 'Testing' },
    { pt: 'Lojas', en: 'Stores' },
  ],
  'back-end': [
    { pt: 'Interface', en: 'Interface' },
    { pt: 'APIs', en: 'APIs' },
    { pt: 'Dados', en: 'Data' },
    { pt: 'Cloud', en: 'Cloud' },
    { pt: 'Qualidade', en: 'Quality' },
  ],
  devops: [
    { pt: 'Código', en: 'Code' },
    { pt: 'Build', en: 'Build' },
    { pt: 'Deploy', en: 'Deploy' },
    { pt: 'Runtime', en: 'Runtime' },
    { pt: 'Observabilidade', en: 'Observability' },
  ],
  cloud: [
    { pt: 'Computação', en: 'Compute' },
    { pt: 'Dados', en: 'Data' },
    { pt: 'Rede e segurança', en: 'Network and security' },
    { pt: 'Automação', en: 'Automation' },
    { pt: 'Observabilidade', en: 'Observability' },
  ],
  qa: [
    { pt: 'Testes', en: 'Tests' },
    { pt: 'Linguagem', en: 'Language' },
    { pt: 'Execução', en: 'Execution' },
    { pt: 'Relatórios', en: 'Reports' },
    { pt: 'Integrações', en: 'Integrations' },
  ],
  data: [
    { pt: 'Fontes', en: 'Sources' },
    { pt: 'Ingestão', en: 'Ingestion' },
    { pt: 'Processamento', en: 'Processing' },
    { pt: 'Armazenamento', en: 'Storage' },
    { pt: 'Consumo', en: 'Consumption' },
  ],
  database: [
    { pt: 'Modelo', en: 'Model' },
    { pt: 'Consultas', en: 'Queries' },
    { pt: 'Replicação', en: 'Replication' },
    { pt: 'Backups', en: 'Backups' },
    { pt: 'Monitorização', en: 'Monitoring' },
  ],
  enterprise: [
    { pt: 'Processos', en: 'Processes' },
    { pt: 'Plataforma', en: 'Platform' },
    { pt: 'Integrações', en: 'Integrations' },
    { pt: 'Dados', en: 'Data' },
    { pt: 'Utilizadores', en: 'Users' },
  ],
  ai: [
    { pt: 'Dados', en: 'Data' },
    { pt: 'Modelos', en: 'Models' },
    { pt: 'Orquestração', en: 'Orchestration' },
    { pt: 'Canais', en: 'Channels' },
    { pt: 'Avaliação', en: 'Evaluation' },
  ],
};

/** Nomes dos grupos de ferramentas usados em stacks.ts (tools). */
export const TOOL_GROUP: Record<string, Two> = {
  frameworks: { pt: 'Frameworks', en: 'Frameworks' },
  ui: { pt: 'Interface e design system', en: 'UI and design system' },
  state: { pt: 'Estado e dados', en: 'State and data' },
  data: { pt: 'Bases de dados', en: 'Databases' },
  build: { pt: 'Build e qualidade de código', en: 'Build and code quality' },
  testing: { pt: 'Testes', en: 'Testing' },
  cloud: { pt: 'Cloud', en: 'Cloud' },
  devops: { pt: 'DevOps e CI/CD', en: 'DevOps and CI/CD' },
  observability: { pt: 'Observabilidade', en: 'Observability' },
  security: { pt: 'Segurança', en: 'Security' },
  messaging: { pt: 'Mensagens e integração', en: 'Messaging and integration' },
  mobile: { pt: 'Mobile', en: 'Mobile' },
  iac: { pt: 'Infraestrutura como código', en: 'Infrastructure as code' },
  containers: { pt: 'Contentores', en: 'Containers' },
  reporting: { pt: 'Relatórios', en: 'Reporting' },
  languages: { pt: 'Linguagens', en: 'Languages' },
  performance: { pt: 'Performance e carga', en: 'Performance and load' },
  management: { pt: 'Gestão de testes', en: 'Test management' },
  devices: { pt: 'Dispositivos e browsers', en: 'Devices and browsers' },
  bi: { pt: 'BI e visualização', en: 'BI and visualisation' },
  orchestration: { pt: 'Orquestração', en: 'Orchestration' },
  storage: { pt: 'Armazenamento', en: 'Storage' },
  processing: { pt: 'Processamento', en: 'Processing' },
  ml: { pt: 'Ciência de dados e ML', en: 'Data science and ML' },
  governance: { pt: 'Qualidade e governança', en: 'Quality and governance' },
  admin: { pt: 'Administração', en: 'Administration' },
  replication: { pt: 'Alta disponibilidade', en: 'High availability' },
  migration: { pt: 'Migração', en: 'Migration' },
  modules: { pt: 'Módulos e produtos', en: 'Modules and products' },
};

export const SERVICES: Record<TechCategory, ServiceTpl[]> = {
  'front-end': [
    {
      id: 'apps',
      title: { pt: 'Aplicações web em {name}', en: '{name} web applications' },
      pain: {
        pt: 'A interface atual não acompanha o produto.',
        en: 'Your current UI cannot keep up with the product.',
      },
      text: {
        pt: 'Portais, plataformas SaaS e back-offices em {name}, rápidos e fáceis de manter.',
        en: 'Portals, SaaS platforms and back-offices in {name}, fast and easy to maintain.',
      },
    },
    {
      id: 'design-system',
      title: { pt: 'Design systems e componentes', en: 'Design systems and components' },
      pain: { pt: 'Cada ecrã é desenhado de raiz.', en: 'Every screen is built from scratch.' },
      text: {
        pt: 'Bibliotecas de componentes {name} documentadas, acessíveis e partilhadas entre equipas.',
        en: 'Documented, accessible {name} component libraries shared across teams.',
      },
    },
    {
      id: 'performance',
      title: { pt: 'Performance e Core Web Vitals', en: 'Performance and Core Web Vitals' },
      pain: {
        pt: 'As páginas demoram e o Google penaliza.',
        en: 'Pages are slow and Google notices.',
      },
      text: {
        pt: 'Auditoria e otimização de carregamento, renderização e bundles em {name}.',
        en: 'Audits and optimisation of loading, rendering and bundles in {name}.',
      },
    },
    {
      id: 'modernization',
      title: { pt: 'Modernização de front-end', en: 'Front-end modernisation' },
      pain: {
        pt: 'O front-end legado trava cada nova funcionalidade.',
        en: 'The legacy front-end slows every new feature.',
      },
      text: {
        pt: 'Migração faseada para {name}, sem parar o produto, ecrã a ecrã.',
        en: 'Phased migration to {name}, screen by screen, without stopping the product.',
      },
    },
    {
      id: 'accessibility',
      title: { pt: 'Acessibilidade', en: 'Accessibility' },
      pain: {
        pt: 'Parte dos utilizadores não consegue usar o produto.',
        en: 'Some users cannot use the product.',
      },
      text: {
        pt: 'Interfaces {name} conformes com WCAG 2.2, testadas com leitores de ecrã.',
        en: '{name} interfaces that meet WCAG 2.2, tested with screen readers.',
      },
    },
    {
      id: 'qa',
      title: { pt: 'Testes de front-end', en: 'Front-end testing' },
      pain: {
        pt: 'Cada lançamento parte algo no browser.',
        en: 'Every release breaks something in the browser.',
      },
      text: {
        pt: 'Testes de componentes e end-to-end automáticos em cada alteração de {name}.',
        en: 'Automated component and end-to-end tests on every {name} change.',
      },
    },
  ],
  mobile: [
    {
      id: 'apps',
      title: { pt: 'Apps {name} de raiz', en: '{name} apps from scratch' },
      pain: {
        pt: 'A ideia está validada, falta a app.',
        en: 'The idea is validated; the app is missing.',
      },
      text: {
        pt: 'Desenho, desenvolvimento e publicação de apps {name}, da primeira versão às lojas.',
        en: 'Design, development and release of {name} apps, from first version to the stores.',
      },
    },
    {
      id: 'modernization',
      title: { pt: 'Evolução de apps existentes', en: 'Evolving existing apps' },
      pain: {
        pt: 'A app tem más avaliações e ninguém lhe quer mexer.',
        en: 'The app has poor reviews and nobody wants to touch it.',
      },
      text: {
        pt: 'Diagnóstico, estabilização e novas funcionalidades em apps {name}.',
        en: 'Diagnosis, stabilisation and new features for {name} apps.',
      },
    },
    {
      id: 'performance',
      title: { pt: 'Performance e estabilidade', en: 'Performance and stability' },
      pain: {
        pt: 'A app fecha sozinha e consome bateria.',
        en: 'The app crashes and drains the battery.',
      },
      text: {
        pt: 'Monitorização de falhas, otimização de arranque e consumo em {name}.',
        en: 'Crash monitoring and start-up and battery optimisation in {name}.',
      },
    },
    {
      id: 'integrations',
      title: { pt: 'Integrações e APIs', en: 'Integrations and APIs' },
      pain: {
        pt: 'A app não fala com os sistemas da empresa.',
        en: 'The app does not talk to your systems.',
      },
      text: {
        pt: 'Ligação segura a APIs, pagamentos, notificações e autenticação.',
        en: 'Secure connection to APIs, payments, notifications and authentication.',
      },
    },
    {
      id: 'qa',
      title: { pt: 'Testes mobile', en: 'Mobile testing' },
      pain: {
        pt: 'Cada versão funciona num telemóvel e falha noutro.',
        en: 'Each release works on one phone and fails on another.',
      },
      text: {
        pt: 'Testes automáticos em dispositivos reais e emuladores para {name}.',
        en: 'Automated tests on real devices and emulators for {name}.',
      },
    },
    {
      id: 'release',
      title: { pt: 'Publicação e manutenção', en: 'Release and maintenance' },
      pain: {
        pt: 'Publicar nas lojas é sempre uma corrida.',
        en: 'Every store release is a scramble.',
      },
      text: {
        pt: 'Pipelines de publicação, versões beta e manutenção contínua da app.',
        en: 'Release pipelines, beta builds and ongoing maintenance.',
      },
    },
  ],
  'back-end': [
    {
      id: 'apis',
      title: { pt: 'APIs e microsserviços em {name}', en: '{name} APIs and microservices' },
      pain: {
        pt: 'As APIs não aguentam o crescimento do produto.',
        en: 'Your APIs cannot keep up with growth.',
      },
      text: {
        pt: 'APIs em {name} rápidas, documentadas e prontas a escalar.',
        en: 'Fast, documented {name} APIs ready to scale.',
      },
    },
    {
      id: 'modernization',
      title: { pt: 'Modernização de sistemas {name}', en: '{name} system modernisation' },
      pain: {
        pt: 'O sistema legado trava cada nova funcionalidade.',
        en: 'The legacy system blocks every new feature.',
      },
      text: {
        pt: 'Migração faseada para versões atuais de {name}, com testes antes de cada passo.',
        en: 'Phased migration to current {name} versions, with tests before every step.',
      },
    },
    {
      id: 'cloud',
      title: { pt: '{name} na cloud', en: '{name} in the cloud' },
      pain: {
        pt: 'A infraestrutura custa mais do que entrega.',
        en: 'Infrastructure costs more than it delivers.',
      },
      text: {
        pt: 'Aplicações {name} em contentores e serviços geridos, com custos visíveis.',
        en: '{name} applications on containers and managed services, with visible costs.',
      },
    },
    {
      id: 'integrations',
      title: { pt: 'Integrações enterprise', en: 'Enterprise integrations' },
      pain: {
        pt: 'O ERP e o CRM não falam um com o outro.',
        en: 'Your ERP and CRM do not talk to each other.',
      },
      text: {
        pt: 'Integrações fiáveis e auditáveis entre sistemas, construídas em {name}.',
        en: 'Reliable, auditable integrations between systems, built in {name}.',
      },
    },
    {
      id: 'data',
      title: { pt: 'Dados e performance', en: 'Data and performance' },
      pain: {
        pt: 'As consultas lentas atrasam todo o produto.',
        en: 'Slow queries hold back the whole product.',
      },
      text: {
        pt: 'Modelação de dados, caching e otimização de consultas em aplicações {name}.',
        en: 'Data modelling, caching and query optimisation in {name} applications.',
      },
    },
    {
      id: 'qa',
      title: { pt: 'Testes e QA para {name}', en: 'Testing and QA for {name}' },
      pain: { pt: 'Cada lançamento é uma aposta.', en: 'Every release is a gamble.' },
      text: {
        pt: 'Testes unitários, de integração e de contrato automáticos em cada alteração.',
        en: 'Automated unit, integration and contract tests on every change.',
      },
    },
  ],
  devops: [
    {
      id: 'adoption',
      title: { pt: 'Adoção de {name}', en: '{name} adoption' },
      pain: {
        pt: 'Cada ambiente é configurado à mão.',
        en: 'Every environment is set up by hand.',
      },
      text: {
        pt: 'Introdução faseada de {name}, com padrões que as equipas conseguem manter.',
        en: 'Phased {name} adoption with standards your teams can maintain.',
      },
    },
    {
      id: 'platform',
      title: { pt: 'Plataforma {name}', en: '{name} platform' },
      pain: { pt: 'A configuração cresceu sem desenho.', en: 'The set-up grew without a design.' },
      text: {
        pt: 'Revisão e desenho da plataforma {name} com segurança, resiliência e custo em mente.',
        en: '{name} platform review and design with security, resilience and cost in mind.',
      },
    },
    {
      id: 'automation',
      title: { pt: 'CI/CD com {name}', en: 'CI/CD with {name}' },
      pain: { pt: 'Publicar uma versão demora dias.', en: 'Shipping a release takes days.' },
      text: {
        pt: 'Pipelines que constroem, testam e publicam com {name} várias vezes por semana.',
        en: 'Pipelines that build, test and ship with {name} several times a week.',
      },
    },
    {
      id: 'security',
      title: { pt: 'Segurança da cadeia de entrega', en: 'Supply chain security' },
      pain: {
        pt: 'Ninguém sabe o que corre em produção.',
        en: 'Nobody knows what runs in production.',
      },
      text: {
        pt: 'Imagens verificadas, segredos geridos e políticas aplicadas em {name}.',
        en: 'Verified images, managed secrets and enforced policies in {name}.',
      },
    },
    {
      id: 'cost',
      title: { pt: 'Custos e performance', en: 'Cost and performance' },
      pain: {
        pt: 'A infraestrutura está sobredimensionada.',
        en: 'The infrastructure is oversized.',
      },
      text: {
        pt: 'Dimensionamento, escalamento automático e redução de desperdício com {name}.',
        en: 'Right-sizing, autoscaling and waste reduction with {name}.',
      },
    },
    {
      id: 'operations',
      title: { pt: 'Operação e observabilidade', en: 'Operations and observability' },
      pain: {
        pt: 'Os problemas são descobertos pelos clientes.',
        en: 'Customers find the problems first.',
      },
      text: {
        pt: 'Monitorização, alertas e resposta a incidentes em ambientes {name}.',
        en: 'Monitoring, alerting and incident response for {name} environments.',
      },
    },
  ],
  cloud: [
    {
      id: 'migration',
      title: { pt: 'Migração para {name}', en: 'Migration to {name}' },
      pain: {
        pt: 'O datacenter próprio já não compensa.',
        en: 'Your own datacenter no longer pays off.',
      },
      text: {
        pt: 'Migração planeada por fases para {name}, com o mínimo de interrupção.',
        en: 'Phased migration to {name} with minimal disruption.',
      },
    },
    {
      id: 'architecture',
      title: { pt: 'Arquitetura e boas práticas', en: 'Architecture and best practices' },
      pain: { pt: 'A plataforma cresceu sem desenho.', en: 'The platform grew without a design.' },
      text: {
        pt: 'Revisão e desenho de arquitetura {name} com segurança, resiliência e custo em mente.',
        en: '{name} architecture reviews and design with security, resilience and cost in mind.',
      },
    },
    {
      id: 'cost',
      title: { pt: 'Otimização de custos', en: 'Cost optimisation' },
      pain: { pt: 'A fatura cresce todos os meses.', en: 'The bill grows every month.' },
      text: {
        pt: 'Visibilidade de custos e redução de desperdício em {name}, sem perder performance.',
        en: 'Cost visibility and waste reduction in {name}, without losing performance.',
      },
    },
    {
      id: 'automation',
      title: { pt: 'Automação e CI/CD', en: 'Automation and CI/CD' },
      pain: { pt: 'Publicar uma versão demora dias.', en: 'Shipping a release takes days.' },
      text: {
        pt: 'Pipelines e infraestrutura como código para publicar várias vezes por semana.',
        en: 'Pipelines and infrastructure as code to ship several times a week.',
      },
    },
    {
      id: 'security',
      title: { pt: 'Segurança e conformidade', en: 'Security and compliance' },
      pain: { pt: 'Ninguém sabe quem tem acesso a quê.', en: 'Nobody knows who can access what.' },
      text: {
        pt: 'Identidades, segredos e políticas em {name}, prontos para auditoria.',
        en: 'Identities, secrets and policies in {name}, ready for audit.',
      },
    },
    {
      id: 'operations',
      title: { pt: 'Operação e observabilidade', en: 'Operations and observability' },
      pain: {
        pt: 'Os problemas são descobertos pelos clientes.',
        en: 'Customers find the problems first.',
      },
      text: {
        pt: 'Monitorização, alertas e resposta a incidentes para plataformas em {name}.',
        en: 'Monitoring, alerting and incident response for {name} platforms.',
      },
    },
  ],
  qa: [
    {
      id: 'automation',
      title: { pt: 'Automação de testes com {name}', en: 'Test automation with {name}' },
      pain: {
        pt: 'A regressão manual atrasa cada lançamento.',
        en: 'Manual regression delays every release.',
      },
      text: {
        pt: 'Suites {name} que cobrem os fluxos críticos do produto.',
        en: '{name} suites covering the critical product flows.',
      },
    },
    {
      id: 'framework',
      title: { pt: 'Framework de automação', en: 'Automation framework' },
      pain: {
        pt: 'Os testes automáticos falham sem razão.',
        en: 'Automated tests fail for no reason.',
      },
      text: {
        pt: 'Estrutura {name} estável, com padrões, dados de teste e manutenção simples.',
        en: 'A stable {name} structure with patterns, test data and simple maintenance.',
      },
    },
    {
      id: 'ci',
      title: { pt: 'Testes no pipeline', en: 'Tests in the pipeline' },
      pain: {
        pt: 'Os testes só correm quando alguém se lembra.',
        en: 'Tests only run when someone remembers.',
      },
      text: {
        pt: 'Execução de {name} em cada alteração, com relatórios claros para a equipa.',
        en: '{name} runs on every change, with clear reports for the team.',
      },
    },
    {
      id: 'factory',
      title: { pt: 'Fábrica de testes', en: 'Testing factory' },
      pain: { pt: 'A equipa não tem tempo para testar.', en: 'Your team has no time to test.' },
      text: {
        pt: 'Testes manuais, exploratórios e automáticos sob pedido, com {name} onde faz sentido.',
        en: 'On-demand manual, exploratory and automated testing, with {name} where it fits.',
      },
    },
    {
      id: 'team',
      title: { pt: 'QA na sua equipa', en: 'QA in your team' },
      pain: { pt: 'Os bugs só aparecem em produção.', en: 'Bugs only show up in production.' },
      text: {
        pt: 'Engenheiros de QA com {name} integrados nas suas sprints e rituais.',
        en: 'QA engineers with {name} embedded in your sprints and rituals.',
      },
    },
    {
      id: 'strategy',
      title: { pt: 'Estratégia de qualidade', en: 'Quality strategy' },
      pain: { pt: 'Não se sabe o que está testado.', en: 'Nobody knows what is tested.' },
      text: {
        pt: 'Pirâmide de testes, métricas e cobertura dos riscos que importam.',
        en: 'Test pyramid, metrics and coverage of the risks that matter.',
      },
    },
  ],
  data: [
    {
      id: 'platform',
      title: { pt: 'Plataformas de dados com {name}', en: '{name} data platforms' },
      pain: {
        pt: 'Os dados estão espalhados por vários sistemas.',
        en: 'Your data is scattered across systems.',
      },
      text: {
        pt: 'Uma plataforma {name} que junta os dados da empresa num só lugar, pronta a crescer.',
        en: 'A {name} platform that brings company data into one place, ready to grow.',
      },
    },
    {
      id: 'pipelines',
      title: { pt: 'Pipelines e ETL', en: 'Pipelines and ETL' },
      pain: {
        pt: 'Os relatórios esperam por cargas feitas à mão.',
        en: 'Reports wait for manual loads.',
      },
      text: {
        pt: 'Pipelines {name} automáticos, monitorizados e fáceis de manter.',
        en: 'Automated, monitored {name} pipelines that are easy to maintain.',
      },
    },
    {
      id: 'analytics',
      title: { pt: 'Relatórios e dashboards', en: 'Reports and dashboards' },
      pain: {
        pt: 'As decisões esperam por folhas de Excel.',
        en: 'Decisions wait for spreadsheets.',
      },
      text: {
        pt: 'Indicadores atualizados e confiáveis, ligados aos dados tratados em {name}.',
        en: 'Up-to-date, trusted KPIs on top of data prepared in {name}.',
      },
    },
    {
      id: 'quality',
      title: { pt: 'Qualidade e governança de dados', en: 'Data quality and governance' },
      pain: { pt: 'Ninguém confia nos números.', en: 'Nobody trusts the numbers.' },
      text: {
        pt: 'Testes de dados, linhagem e regras de acesso para que cada número tenha origem.',
        en: 'Data tests, lineage and access rules so every number has a source.',
      },
    },
    {
      id: 'migration',
      title: { pt: 'Migração e modernização', en: 'Migration and modernisation' },
      pain: {
        pt: 'O data warehouse antigo já não escala.',
        en: 'The old data warehouse no longer scales.',
      },
      text: {
        pt: 'Migração faseada para {name}, com validação de dados em cada etapa.',
        en: 'Phased migration to {name}, with data validation at every step.',
      },
    },
    {
      id: 'cost',
      title: { pt: 'Performance e custos', en: 'Performance and cost' },
      pain: {
        pt: 'As consultas demoram e a fatura cresce.',
        en: 'Queries are slow and the bill keeps growing.',
      },
      text: {
        pt: 'Otimização de processamento, armazenamento e custos em {name}.',
        en: 'Processing, storage and cost optimisation in {name}.',
      },
    },
  ],
  database: [
    {
      id: 'design',
      title: { pt: 'Modelação e arquitetura', en: 'Modelling and architecture' },
      pain: {
        pt: 'O modelo de dados cresceu sem regras.',
        en: 'The data model grew without rules.',
      },
      text: {
        pt: 'Modelação, normalização e índices em {name} pensados para o produto.',
        en: '{name} modelling, normalisation and indexes designed for the product.',
      },
    },
    {
      id: 'performance',
      title: { pt: 'Performance e tuning', en: 'Performance and tuning' },
      pain: {
        pt: 'As consultas lentas atrasam todo o produto.',
        en: 'Slow queries hold back the whole product.',
      },
      text: {
        pt: 'Análise de planos de execução, índices e configuração de {name}.',
        en: 'Execution plan analysis, indexing and {name} configuration.',
      },
    },
    {
      id: 'migration',
      title: { pt: 'Migração para {name}', en: 'Migration to {name}' },
      pain: {
        pt: 'A base de dados antiga custa caro e trava a cloud.',
        en: 'The old database is expensive and blocks the cloud.',
      },
      text: {
        pt: 'Migração planeada para {name}, na cloud ou on-premise, com validação de dados.',
        en: 'Planned migration to {name}, in the cloud or on-premise, with data validation.',
      },
    },
    {
      id: 'ha',
      title: { pt: 'Alta disponibilidade e backups', en: 'High availability and backups' },
      pain: {
        pt: 'Uma falha na base de dados para a empresa.',
        en: 'A database failure stops the business.',
      },
      text: {
        pt: 'Replicação, failover e backups testados em {name}.',
        en: 'Replication, failover and tested backups in {name}.',
      },
    },
    {
      id: 'security',
      title: { pt: 'Segurança e conformidade', en: 'Security and compliance' },
      pain: {
        pt: 'Dados sensíveis sem controlo de acessos.',
        en: 'Sensitive data without access control.',
      },
      text: {
        pt: 'Acessos, cifragem e auditoria em {name}, alinhados com o RGPD e a LGPD.',
        en: 'Access control, encryption and auditing in {name}, aligned with GDPR and LGPD.',
      },
    },
    {
      id: 'operations',
      title: { pt: 'Administração (DBA)', en: 'Administration (DBA)' },
      pain: { pt: 'Ninguém é responsável pela base de dados.', en: 'Nobody owns the database.' },
      text: {
        pt: 'Monitorização, manutenção e atualizações de {name} com um DBA dedicado.',
        en: 'Monitoring, maintenance and upgrades of {name} with a dedicated DBA.',
      },
    },
  ],
  enterprise: [
    {
      id: 'implementation',
      title: { pt: 'Implementação {name}', en: '{name} implementation' },
      pain: {
        pt: 'Os processos vivem em folhas de cálculo e emails.',
        en: 'Processes live in spreadsheets and emails.',
      },
      text: {
        pt: 'Implementação de {name} por fases, alinhada com os processos e as prioridades da empresa.',
        en: 'Phased {name} implementation, aligned with your processes and priorities.',
      },
    },
    {
      id: 'customization',
      title: { pt: 'Desenvolvimento e personalização', en: 'Development and customisation' },
      pain: {
        pt: 'A solução standard não cobre o seu negócio.',
        en: 'The standard solution does not cover your business.',
      },
      text: {
        pt: 'Extensões e aplicações à medida em {name}, sem comprometer as atualizações.',
        en: 'Custom extensions and apps in {name}, without compromising upgrades.',
      },
    },
    {
      id: 'integrations',
      title: { pt: 'Integrações', en: 'Integrations' },
      pain: {
        pt: '{name} não fala com o resto dos sistemas.',
        en: '{name} does not talk to your other systems.',
      },
      text: {
        pt: 'Integrações por APIs e middleware entre {name}, ERP, CRM e aplicações internas.',
        en: 'API and middleware integrations between {name}, ERP, CRM and internal apps.',
      },
    },
    {
      id: 'migration',
      title: { pt: 'Migração e upgrades', en: 'Migration and upgrades' },
      pain: {
        pt: 'A versão atual está a chegar ao fim do suporte.',
        en: 'Your current version is reaching end of support.',
      },
      text: {
        pt: 'Upgrades e migrações de {name} planeados, com dados validados e testes de regressão.',
        en: 'Planned {name} upgrades and migrations, with validated data and regression tests.',
      },
    },
    {
      id: 'support',
      title: { pt: 'Sustentação (AMS)', en: 'Application support (AMS)' },
      pain: { pt: 'Os pedidos de suporte acumulam-se.', en: 'Support tickets keep piling up.' },
      text: {
        pt: 'Suporte e evolução contínua de {name} com níveis de serviço acordados.',
        en: 'Ongoing {name} support and evolution with agreed service levels.',
      },
    },
    {
      id: 'qa',
      title: { pt: 'Testes e qualidade', en: 'Testing and quality' },
      pain: {
        pt: 'Cada atualização obriga a semanas de testes manuais.',
        en: 'Every update means weeks of manual testing.',
      },
      text: {
        pt: 'Testes funcionais e automáticos para cada release de {name}.',
        en: 'Functional and automated tests for every {name} release.',
      },
    },
  ],
  ai: [
    {
      id: 'assistants',
      title: { pt: 'Assistentes e chatbots com {name}', en: '{name} assistants and chatbots' },
      pain: {
        pt: 'O apoio ao cliente e as equipas internas não escalam.',
        en: 'Customer support and internal teams cannot scale.',
      },
      text: {
        pt: 'Assistentes ligados aos seus sistemas, que respondem com dados da empresa e passam para uma pessoa quando é preciso.',
        en: 'Assistants connected to your systems that answer with company data and hand over to a person when needed.',
      },
    },
    {
      id: 'rag',
      title: { pt: 'Pesquisa nos seus documentos (RAG)', en: 'Search over your documents (RAG)' },
      pain: {
        pt: 'A informação está presa em PDFs, wikis e emails.',
        en: 'Knowledge is stuck in PDFs, wikis and emails.',
      },
      text: {
        pt: 'Respostas com fonte a partir dos documentos da empresa, com {name} e pesquisa vetorial.',
        en: 'Sourced answers from company documents, with {name} and vector search.',
      },
    },
    {
      id: 'automation',
      title: { pt: 'Agentes e automação', en: 'Agents and automation' },
      pain: {
        pt: 'A equipa perde horas em tarefas repetitivas.',
        en: 'Your team loses hours on repetitive tasks.',
      },
      text: {
        pt: 'Agentes com {name} que leem, decidem e executam passos em ferramentas reais, com aprovação humana onde importa.',
        en: '{name} agents that read, decide and act in real tools, with human approval where it matters.',
      },
    },
    {
      id: 'integration',
      title: { pt: 'IA no seu produto', en: 'AI in your product' },
      pain: {
        pt: 'A IA fica numa demo e nunca chega ao produto.',
        en: 'AI stays in a demo and never reaches the product.',
      },
      text: {
        pt: 'Funcionalidades de IA integradas na sua aplicação, com APIs, testes e monitorização como o resto do código.',
        en: 'AI features built into your application, with APIs, tests and monitoring like the rest of the code.',
      },
    },
    {
      id: 'evaluation',
      title: { pt: 'Avaliação, custo e qualidade', en: 'Evaluation, cost and quality' },
      pain: {
        pt: 'Ninguém sabe se as respostas estão certas nem quanto custam.',
        en: 'Nobody knows if answers are right or what they cost.',
      },
      text: {
        pt: 'Conjuntos de avaliação e métricas de qualidade, latência e custo por pedido em cada versão.',
        en: 'Evaluation sets and quality, latency and cost-per-request metrics for every release.',
      },
    },
    {
      id: 'security',
      title: { pt: 'Segurança e governança', en: 'Security and governance' },
      pain: {
        pt: 'Há receio de que dados sensíveis saiam da empresa.',
        en: 'There is concern that sensitive data leaves the company.',
      },
      text: {
        pt: 'Controlo de dados, RGPD e LGPD, guardrails e registo de cada pedido ao modelo.',
        en: 'Data control, GDPR and LGPD, guardrails and logging of every model request.',
      },
    },
  ],
};

/** Perguntas comuns a todas as stacks. A pergunta de IA é a única menção explícita além do bloco de ferramentas. */
export const FAQ_COMMON: FaqTpl[] = [
  {
    q: {
      pt: 'A Yellowipe trabalha com {name} em Portugal e no Brasil?',
      en: 'Does Yellowipe work with {name} in Portugal and Brazil?',
    },
    a: {
      pt: 'Sim. Temos especialistas em {name} em Portugal e no Brasil e trabalhamos com empresas em Portugal, no Brasil e nos Estados Unidos, em português e em inglês.',
      en: 'Yes. We have {name} specialists in Portugal and Brazil and work with companies in Portugal, Brazil and the United States, in Portuguese and English.',
    },
  },
  {
    q: {
      pt: 'Como avaliam um especialista em {name}?',
      en: 'How do you assess a {name} specialist?',
    },
    a: {
      pt: 'Com entrevistas técnicas conduzidas por engenheiros que trabalham com {name} e, quando faz sentido, um exercício prático. Recebe as notas da avaliação com cada perfil.',
      en: 'Through technical interviews run by engineers who work with {name} and, when useful, a practical exercise. You receive the assessment notes with each profile.',
    },
  },
  {
    q: {
      pt: 'Posso contratar o especialista em {name} diretamente?',
      en: 'Can I hire the {name} specialist directly?',
    },
    a: {
      pt: 'Sim. No modelo Contrate o profissional passa a fazer parte da sua empresa. No Reforce, fica com contrato Yellowipe e trabalha na sua equipa. No Construa, a Yellowipe entrega o projeto.',
      en: 'Yes. With Hire, the professional joins your company. With Augment, they stay on a Yellowipe contract and work in your team. With Build, Yellowipe delivers the project.',
    },
  },
  {
    q: {
      pt: 'Usam ferramentas de IA no desenvolvimento com {name}?',
      en: 'Do you use AI tools when working with {name}?',
    },
    a: {
      pt: 'Sim, com assistentes como Claude Code, Cursor e GitHub Copilot, sempre com revisão por engenheiros seniores e dentro das regras de segurança da sua empresa.',
      en: 'Yes, with assistants such as Claude Code, Cursor and GitHub Copilot, always reviewed by senior engineers and within your security rules.',
    },
  },
];

export const FAQ_CATEGORY: Record<TechCategory, FaqTpl[]> = {
  'front-end': [
    {
      q: { pt: '{name} é uma boa escolha para SEO?', en: 'Is {name} good for SEO?' },
      a: {
        pt: 'Sim, quando a renderização é pensada desde o início: renderização no servidor ou estática, metadados corretos e Core Web Vitals controlados.',
        en: 'Yes, when rendering is planned from day one: server or static rendering, correct metadata and controlled Core Web Vitals.',
      },
    },
    {
      q: {
        pt: 'Conseguem migrar o nosso front-end para {name}?',
        en: 'Can you migrate our front-end to {name}?',
      },
      a: {
        pt: 'Sim, por fases: os ecrãs novos já em {name} e os antigos migrados ao ritmo do produto, sem uma reescrita de uma só vez.',
        en: 'Yes, in phases: new screens in {name} and old ones migrated at the product pace, with no big-bang rewrite.',
      },
    },
  ],
  mobile: [
    {
      q: { pt: 'Nativo ou multiplataforma?', en: 'Native or cross-platform?' },
      a: {
        pt: 'Depende do orçamento, da performance pedida e da equipa que vai manter a app. Recomendamos depois de uma descoberta curta.',
        en: 'It depends on budget, required performance and who will maintain the app. We recommend after a short discovery.',
      },
    },
    {
      q: { pt: 'Publicam a app nas lojas?', en: 'Do you publish the app to the stores?' },
      a: {
        pt: 'Sim, na conta da sua empresa na App Store e no Google Play, com versões beta antes de cada lançamento.',
        en: 'Yes, in your company account on the App Store and Google Play, with beta builds before each release.',
      },
    },
  ],
  'back-end': [
    {
      q: {
        pt: 'Conseguem migrar um sistema antigo em {name}?',
        en: 'Can you migrate a legacy {name} system?',
      },
      a: {
        pt: 'Sim, por fases: avaliamos dependências, cobrimos o essencial com testes e migramos módulo a módulo, sem parar a operação.',
        en: 'Yes, in phases: we map dependencies, cover the essentials with tests and migrate module by module without stopping operations.',
      },
    },
    {
      q: { pt: 'Integram com o nosso ERP ou CRM?', en: 'Can you integrate with our ERP or CRM?' },
      a: {
        pt: 'Sim. Construímos integrações com filas de mensagens, retries e auditoria, para que nenhum dado se perca entre sistemas.',
        en: 'Yes. We build integrations with message queues, retries and audit trails so no data is lost between systems.',
      },
    },
  ],
  devops: [
    {
      q: {
        pt: 'Conseguem introduzir {name} sem parar as entregas?',
        en: 'Can you introduce {name} without stopping delivery?',
      },
      a: {
        pt: 'Sim. Começamos por um serviço ou ambiente piloto, medimos o resultado e alargamos por fases, com documentação para a sua equipa.',
        en: 'Yes. We start with one pilot service or environment, measure the result and expand in phases, with documentation for your team.',
      },
    },
    {
      q: {
        pt: 'Trabalham em AWS, Azure e Google Cloud?',
        en: 'Do you work on AWS, Azure and Google Cloud?',
      },
      a: {
        pt: 'Sim, nas três e em infraestrutura própria. {name} funciona da mesma forma em todas.',
        en: 'Yes, on all three and on-premise. {name} works the same way across them.',
      },
    },
  ],
  cloud: [
    {
      q: { pt: 'Ajudam a reduzir a fatura de {name}?', en: 'Can you reduce our {name} bill?' },
      a: {
        pt: 'Sim. Começamos por dar visibilidade aos custos por equipa e serviço e depois eliminamos desperdício, com metas acordadas consigo.',
        en: 'Yes. We first make costs visible by team and service, then remove waste against targets agreed with you.',
      },
    },
    {
      q: {
        pt: 'Trabalham com outras clouds além de {name}?',
        en: 'Do you work with other clouds besides {name}?',
      },
      a: {
        pt: 'Sim, AWS, Azure e Google Cloud, e também ambientes híbridos com infraestrutura própria.',
        en: 'Yes: AWS, Azure and Google Cloud, plus hybrid set-ups with on-premise infrastructure.',
      },
    },
  ],
  qa: [
    {
      q: {
        pt: 'Fazem testes manuais além da automação?',
        en: 'Do you do manual testing as well as automation?',
      },
      a: {
        pt: 'Sim. A nossa fábrica de testes cobre testes manuais, diagnóstico e automação sob pedido, e automatizamos primeiro o que se repete mais.',
        en: 'Yes. Our testing factory covers manual testing, diagnostics and automation on demand, and we automate what repeats most first.',
      },
    },
    {
      q: { pt: 'Quantos testes conseguem automatizar?', en: 'How many tests can you automate?' },
      a: {
        pt: 'Depende do produto. No caso Clever passámos de 32 para mais de 1.600 testes automatizados em seis meses.',
        en: 'It depends on the product. At Clever we went from 32 to more than 1,600 automated tests in six months.',
      },
    },
  ],
  data: [
    {
      q: {
        pt: 'Trabalham com dados na cloud e on-premise?',
        en: 'Do you work with cloud and on-premise data?',
      },
      a: {
        pt: 'Sim: AWS, Azure e Google Cloud, e também bases de dados e servidores próprios. Muitas plataformas combinam os dois.',
        en: 'Yes: AWS, Azure and Google Cloud, plus your own databases and servers. Many platforms combine both.',
      },
    },
    {
      q: {
        pt: 'Ligam {name} aos nossos sistemas (ERP, CRM)?',
        en: 'Can you connect {name} to our systems (ERP, CRM)?',
      },
      a: {
        pt: 'Sim. Construímos a ingestão a partir do ERP, CRM, bases de dados e APIs, com cargas incrementais e alertas quando algo falha.',
        en: 'Yes. We build ingestion from your ERP, CRM, databases and APIs, with incremental loads and alerts when something fails.',
      },
    },
  ],
  database: [
    {
      q: {
        pt: 'Conseguem migrar a nossa base de dados para {name}?',
        en: 'Can you migrate our database to {name}?',
      },
      a: {
        pt: 'Sim. Avaliamos esquema, procedimentos e dependências, migramos por fases e validamos os dados antes de mudar a aplicação.',
        en: 'Yes. We assess schema, procedures and dependencies, migrate in phases and validate data before switching the application.',
      },
    },
    {
      q: {
        pt: 'Fazem administração contínua (DBA)?',
        en: 'Do you provide ongoing database administration?',
      },
      a: {
        pt: 'Sim, com um DBA na sua equipa (Reforce) ou com o serviço gerido pela Yellowipe, incluindo monitorização e backups.',
        en: 'Yes, with a DBA in your team (Augment) or as a service managed by Yellowipe, including monitoring and backups.',
      },
    },
  ],
  enterprise: [
    {
      q: {
        pt: 'Fazem implementação de raiz ou só sustentação?',
        en: 'Do you implement from scratch or only provide support?',
      },
      a: {
        pt: 'As duas coisas: implementação por fases, evolução e sustentação (AMS), em projeto ou com consultores na sua equipa.',
        en: 'Both: phased implementation, evolution and support (AMS), as a project or with consultants in your team.',
      },
    },
    {
      q: {
        pt: 'Como garantem que as atualizações de {name} não partem nada?',
        en: 'How do you make sure {name} updates do not break anything?',
      },
      a: {
        pt: 'Com ambientes de teste, testes de regressão automatizados e um plano de release acordado consigo.',
        en: 'With test environments, automated regression tests and a release plan agreed with you.',
      },
    },
  ],
  ai: [
    {
      q: { pt: 'Os nossos dados ficam privados?', en: 'Does our data stay private?' },
      a: {
        pt: 'Sim. Usamos contas empresariais que não treinam modelos com os seus dados, alojamento na região que escolher e, quando é preciso, modelos na sua própria infraestrutura.',
        en: 'Yes. We use business accounts that do not train models on your data, hosting in the region you choose and, when needed, models on your own infrastructure.',
      },
    },
    {
      q: {
        pt: 'Conseguem começar com uma prova de conceito?',
        en: 'Can you start with a proof of concept?',
      },
      a: {
        pt: 'Sim: uma prova de conceito curta, com dados reais e critérios de sucesso acordados antes de investir em produção.',
        en: 'Yes: a short proof of concept with real data and success criteria agreed before investing in production.',
      },
    },
  ],
};

export const PROFILES: Record<TechCategory, ProfileTpl[]> = {
  'front-end': [
    {
      role: { pt: 'Tech lead {name}', en: '{name} tech lead' },
      bio: {
        pt: 'Lidera equipas de front-end e define arquitetura, padrões e design system.',
        en: 'Leads front-end teams and sets architecture, standards and design system.',
      },
      years: 11,
      city: 'Lisboa',
      market: 'PT',
      model: 'reforce',
    },
    {
      role: { pt: 'Front-end sénior {name}', en: 'Senior {name} front-end developer' },
      bio: {
        pt: 'Interfaces rápidas e acessíveis para produtos com milhares de utilizadores.',
        en: 'Fast, accessible interfaces for products with thousands of users.',
      },
      years: 8,
      city: 'São Paulo',
      market: 'BR',
      model: 'construa',
    },
    {
      role: { pt: 'Full-stack {name}', en: 'Full-stack {name} developer' },
      bio: {
        pt: 'Da API ao ecrã, em produtos SaaS e portais de cliente.',
        en: 'From API to screen, on SaaS products and customer portals.',
      },
      years: 7,
      city: 'Porto',
      market: 'PT',
      model: 'contrate',
    },
    {
      role: { pt: 'QA automation front-end', en: 'Front-end QA automation engineer' },
      bio: {
        pt: 'Testes de componentes e end-to-end em pipelines de entrega contínua.',
        en: 'Component and end-to-end tests in continuous delivery pipelines.',
      },
      years: 6,
      city: 'Recife',
      market: 'BR',
      model: 'reforce',
    },
  ],
  mobile: [
    {
      role: { pt: 'Tech lead mobile {name}', en: '{name} mobile tech lead' },
      bio: {
        pt: 'Lançou apps com milhões de downloads e lidera equipas mobile.',
        en: 'Shipped apps with millions of downloads and leads mobile teams.',
      },
      years: 10,
      city: 'São Paulo',
      market: 'BR',
      model: 'construa',
    },
    {
      role: { pt: 'Programador {name} sénior', en: 'Senior {name} developer' },
      bio: {
        pt: 'Apps estáveis, com atenção ao arranque, à memória e à bateria.',
        en: 'Stable apps with attention to start-up, memory and battery.',
      },
      years: 8,
      city: 'Lisboa',
      market: 'PT',
      model: 'reforce',
    },
    {
      role: { pt: 'Programador {name}', en: '{name} developer' },
      bio: {
        pt: 'Funcionalidades de ponta a ponta, da interface à integração com APIs.',
        en: 'End-to-end features, from UI to API integration.',
      },
      years: 5,
      city: 'Braga',
      market: 'PT',
      model: 'contrate',
    },
    {
      role: { pt: 'QA mobile', en: 'Mobile QA engineer' },
      bio: {
        pt: 'Testes automáticos em dispositivos reais antes de cada publicação.',
        en: 'Automated tests on real devices before every release.',
      },
      years: 6,
      city: 'Curitiba',
      market: 'BR',
      model: 'reforce',
    },
  ],
  'back-end': [
    {
      role: { pt: 'Tech lead {name}', en: '{name} tech lead' },
      bio: {
        pt: 'Liderou modernizações de sistemas críticos sem parar a operação.',
        en: 'Led critical system modernisations without stopping operations.',
      },
      years: 12,
      city: 'Porto',
      market: 'PT',
      model: 'reforce',
    },
    {
      role: { pt: 'Back-end sénior {name}', en: 'Senior {name} back-end developer' },
      bio: {
        pt: 'APIs de alto volume, com observabilidade e testes de contrato.',
        en: 'High-volume APIs with observability and contract tests.',
      },
      years: 9,
      city: 'São Paulo',
      market: 'BR',
      model: 'construa',
    },
    {
      role: { pt: 'Full-stack {name}', en: 'Full-stack {name} developer' },
      bio: {
        pt: 'Back-offices e portais, do modelo de dados ao front-end.',
        en: 'Back-offices and portals, from data model to front-end.',
      },
      years: 7,
      city: 'Lisboa',
      market: 'PT',
      model: 'contrate',
    },
    {
      role: { pt: 'QA automation {name}', en: '{name} QA automation engineer' },
      bio: {
        pt: 'Testes de integração e de API a correr em cada pull request.',
        en: 'Integration and API tests running on every pull request.',
      },
      years: 8,
      city: 'Recife',
      market: 'BR',
      model: 'reforce',
    },
  ],
  devops: [
    {
      role: { pt: 'Engenheiro de plataforma {name}', en: '{name} platform engineer' },
      bio: {
        pt: 'Desenha plataformas internas que dão autonomia às equipas.',
        en: 'Designs internal platforms that give teams autonomy.',
      },
      years: 11,
      city: 'Lisboa',
      market: 'PT',
      model: 'construa',
    },
    {
      role: { pt: 'Engenheiro DevOps {name}', en: '{name} DevOps engineer' },
      bio: {
        pt: 'Pipelines e infraestrutura como código em ambientes de produção.',
        en: 'Pipelines and infrastructure as code in production environments.',
      },
      years: 8,
      city: 'São Paulo',
      market: 'BR',
      model: 'reforce',
    },
    {
      role: { pt: 'SRE {name}', en: '{name} SRE' },
      bio: {
        pt: 'Fiabilidade, alertas e resposta a incidentes.',
        en: 'Reliability, alerting and incident response.',
      },
      years: 9,
      city: 'Porto',
      market: 'PT',
      model: 'reforce',
    },
    {
      role: { pt: 'DevSecOps {name}', en: '{name} DevSecOps engineer' },
      bio: {
        pt: 'Segurança integrada no pipeline, das imagens aos segredos.',
        en: 'Security built into the pipeline, from images to secrets.',
      },
      years: 7,
      city: 'Curitiba',
      market: 'BR',
      model: 'contrate',
    },
  ],
  cloud: [
    {
      role: { pt: 'Arquiteto cloud {name}', en: '{name} cloud architect' },
      bio: {
        pt: 'Desenha plataformas seguras e com custos sob controlo.',
        en: 'Designs secure platforms with costs under control.',
      },
      years: 12,
      city: 'Lisboa',
      market: 'PT',
      model: 'construa',
    },
    {
      role: { pt: 'Engenheiro DevOps {name}', en: '{name} DevOps engineer' },
      bio: {
        pt: 'Pipelines, infraestrutura como código e publicação contínua.',
        en: 'Pipelines, infrastructure as code and continuous delivery.',
      },
      years: 8,
      city: 'São Paulo',
      market: 'BR',
      model: 'reforce',
    },
    {
      role: { pt: 'SRE {name}', en: '{name} SRE' },
      bio: {
        pt: 'Monitorização, alertas e resposta a incidentes em produção.',
        en: 'Monitoring, alerting and incident response in production.',
      },
      years: 9,
      city: 'Porto',
      market: 'PT',
      model: 'reforce',
    },
    {
      role: { pt: 'Engenheiro de plataforma {name}', en: '{name} platform engineer' },
      bio: {
        pt: 'Ferramentas internas que dão autonomia às equipas de produto.',
        en: 'Internal tooling that gives product teams autonomy.',
      },
      years: 7,
      city: 'Florianópolis',
      market: 'BR',
      model: 'contrate',
    },
  ],
  qa: [
    {
      role: { pt: 'QA lead {name}', en: '{name} QA lead' },
      bio: {
        pt: 'Define a estratégia de qualidade e lidera a automação.',
        en: 'Sets the quality strategy and leads automation.',
      },
      years: 10,
      city: 'Lisboa',
      market: 'PT',
      model: 'construa',
    },
    {
      role: { pt: 'QA automation sénior {name}', en: 'Senior {name} QA automation engineer' },
      bio: {
        pt: 'Suites estáveis e rápidas que correm em paralelo no pipeline.',
        en: 'Stable, fast suites running in parallel in the pipeline.',
      },
      years: 8,
      city: 'São Paulo',
      market: 'BR',
      model: 'reforce',
    },
    {
      role: { pt: 'SDET {name}', en: '{name} SDET' },
      bio: {
        pt: 'Ferramentas de teste, dados de teste e ambientes efémeros.',
        en: 'Test tooling, test data and ephemeral environments.',
      },
      years: 7,
      city: 'Porto',
      market: 'PT',
      model: 'reforce',
    },
    {
      role: { pt: 'QA automation {name}', en: '{name} QA automation engineer' },
      bio: {
        pt: 'Testes end-to-end e de API para produtos web e mobile.',
        en: 'End-to-end and API tests for web and mobile products.',
      },
      years: 5,
      city: 'Recife',
      market: 'BR',
      model: 'contrate',
    },
  ],
  data: [
    {
      role: { pt: 'Arquiteto de dados {name}', en: '{name} data architect' },
      bio: {
        pt: 'Desenha plataformas de dados que crescem com o negócio.',
        en: 'Designs data platforms that grow with the business.',
      },
      years: 12,
      city: 'Lisboa',
      market: 'PT',
      model: 'construa',
    },
    {
      role: { pt: 'Engenheiro de dados sénior {name}', en: 'Senior {name} data engineer' },
      bio: {
        pt: 'Pipelines de alto volume, testados e monitorizados.',
        en: 'High-volume pipelines, tested and monitored.',
      },
      years: 8,
      city: 'São Paulo',
      market: 'BR',
      model: 'reforce',
    },
    {
      role: { pt: 'Analytics engineer {name}', en: '{name} analytics engineer' },
      bio: {
        pt: 'Modelos de dados prontos para relatórios e dashboards.',
        en: 'Data models ready for reports and dashboards.',
      },
      years: 6,
      city: 'Porto',
      market: 'PT',
      model: 'contrate',
    },
    {
      role: { pt: 'DataOps {name}', en: '{name} DataOps engineer' },
      bio: {
        pt: 'Automação, observabilidade e custos da plataforma de dados.',
        en: 'Automation, observability and cost of the data platform.',
      },
      years: 7,
      city: 'Recife',
      market: 'BR',
      model: 'reforce',
    },
  ],
  database: [
    {
      role: { pt: 'DBA sénior {name}', en: 'Senior {name} DBA' },
      bio: {
        pt: 'Performance, replicação e recuperação em sistemas críticos.',
        en: 'Performance, replication and recovery on critical systems.',
      },
      years: 13,
      city: 'Lisboa',
      market: 'PT',
      model: 'reforce',
    },
    {
      role: { pt: 'Arquiteto de dados {name}', en: '{name} data architect' },
      bio: {
        pt: 'Modelos de dados e migrações sem perda de informação.',
        en: 'Data models and migrations without data loss.',
      },
      years: 11,
      city: 'São Paulo',
      market: 'BR',
      model: 'construa',
    },
    {
      role: { pt: 'Programador SQL {name}', en: '{name} SQL developer' },
      bio: {
        pt: 'Procedimentos, consultas e relatórios otimizados.',
        en: 'Optimised procedures, queries and reports.',
      },
      years: 7,
      city: 'Porto',
      market: 'PT',
      model: 'contrate',
    },
    {
      role: { pt: 'DBA cloud {name}', en: '{name} cloud DBA' },
      bio: {
        pt: 'Bases de dados geridas na cloud, com custos sob controlo.',
        en: 'Managed cloud databases with costs under control.',
      },
      years: 8,
      city: 'Curitiba',
      market: 'BR',
      model: 'reforce',
    },
  ],
  enterprise: [
    {
      role: { pt: 'Arquiteto de soluções {name}', en: '{name} solution architect' },
      bio: {
        pt: 'Desenha a solução e as integrações com o resto dos sistemas.',
        en: 'Designs the solution and its integrations with other systems.',
      },
      years: 13,
      city: 'Lisboa',
      market: 'PT',
      model: 'construa',
    },
    {
      role: { pt: 'Consultor funcional {name} sénior', en: 'Senior {name} functional consultant' },
      bio: {
        pt: 'Traduz processos de negócio em configuração e requisitos.',
        en: 'Turns business processes into configuration and requirements.',
      },
      years: 10,
      city: 'São Paulo',
      market: 'BR',
      model: 'reforce',
    },
    {
      role: { pt: 'Programador {name}', en: '{name} developer' },
      bio: {
        pt: 'Extensões, relatórios e integrações à medida.',
        en: 'Custom extensions, reports and integrations.',
      },
      years: 7,
      city: 'Porto',
      market: 'PT',
      model: 'contrate',
    },
    {
      role: { pt: 'Tester funcional {name}', en: '{name} functional tester' },
      bio: {
        pt: 'Testes de regressão e de aceitação em cada release.',
        en: 'Regression and acceptance testing on every release.',
      },
      years: 6,
      city: 'Recife',
      market: 'BR',
      model: 'reforce',
    },
  ],
  ai: [
    {
      role: { pt: 'Engenheiro de IA {name}', en: '{name} AI engineer' },
      bio: {
        pt: 'Leva assistentes e agentes da prova de conceito à produção.',
        en: 'Takes assistants and agents from proof of concept to production.',
      },
      years: 9,
      city: 'Lisboa',
      market: 'PT',
      model: 'construa',
    },
    {
      role: { pt: 'Engenheiro de machine learning', en: 'Machine learning engineer' },
      bio: {
        pt: 'Treino, avaliação e serviço de modelos em produção.',
        en: 'Training, evaluation and serving of models in production.',
      },
      years: 8,
      city: 'São Paulo',
      market: 'BR',
      model: 'reforce',
    },
    {
      role: { pt: 'Cientista de dados', en: 'Data scientist' },
      bio: {
        pt: 'Transforma perguntas de negócio em modelos e métricas.',
        en: 'Turns business questions into models and metrics.',
      },
      years: 7,
      city: 'Porto',
      market: 'PT',
      model: 'contrate',
    },
    {
      role: { pt: 'Engenheiro MLOps', en: 'MLOps engineer' },
      bio: {
        pt: 'Pipelines, monitorização e custos de modelos em produção.',
        en: 'Pipelines, monitoring and cost of models in production.',
      },
      years: 7,
      city: 'Recife',
      market: 'BR',
      model: 'reforce',
    },
  ],
};

export const STEPS: { t: Two; x: Two }[] = [
  {
    t: { pt: 'Conversa', en: 'Call' },
    x: {
      pt: 'Percebemos a stack, o objetivo e o modelo que faz sentido.',
      en: 'We understand the stack, the goal and the right model.',
    },
  },
  {
    t: { pt: 'Proposta', en: 'Proposal' },
    x: {
      pt: 'Perfis avaliados em {name} ou plano de projeto.',
      en: 'Profiles assessed in {name}, or a project plan.',
    },
  },
  {
    t: { pt: 'Arranque', en: 'Kick-off' },
    x: {
      pt: 'Onboarding no seu repositório, pipelines e rituais.',
      en: 'Onboarding into your repository, pipelines and rituals.',
    },
  },
  {
    t: { pt: 'Acompanhamento', en: 'Follow-up' },
    x: {
      pt: 'Pontos de situação e métricas de entrega desde a primeira sprint.',
      en: 'Status checks and delivery metrics from the first sprint.',
    },
  },
];

/** Os três modelos aplicados à stack. */
export const MODELS: { id: ModelId; title: Two; text: Two; yw: Two; cl: Two; cta: Two }[] = [
  {
    id: 'contrate',
    title: { pt: 'Contratar {role}', en: 'Hire {role}' },
    text: {
      pt: 'Recrutamos para contratação permanente, com avaliação técnica em {name}.',
      en: 'We recruit for permanent roles, with a technical assessment in {name}.',
    },
    yw: { pt: 'Encontra, avalia e apresenta', en: 'Finds, assesses and presents' },
    cl: { pt: 'Contrata e gere o profissional', en: 'Hires and manages the professional' },
    cta: { pt: 'Abrir uma vaga', en: 'Open a role' },
  },
  {
    id: 'reforce',
    title: { pt: 'Consultores {name} na sua equipa', en: '{name} consultants in your team' },
    text: {
      pt: 'Especialistas seniores integrados na sua equipa, com as suas ferramentas e prioridades.',
      en: 'Senior specialists embedded in your team, with your tools and priorities.',
    },
    yw: { pt: 'Garante as pessoas e a substituição', en: 'Guarantees people and replacement' },
    cl: { pt: 'Gere o dia a dia', en: 'Runs the day to day' },
    cta: { pt: 'Pedir perfis', en: 'Request profiles' },
  },
  {
    id: 'construa',
    title: { pt: 'Projeto {name} de ponta a ponta', en: 'End-to-end {name} project' },
    text: {
      pt: 'Uma equipa Yellowipe com gestor de projeto constrói ou moderniza a sua solução.',
      en: 'A Yellowipe team with a project manager builds or modernises your solution.',
    },
    yw: { pt: 'Responde pela entrega', en: 'Owns delivery' },
    cl: { pt: 'Define objetivos e aprova', en: 'Sets goals and approves' },
    cta: { pt: 'Falar do projeto', en: 'Discuss the project' },
  },
];

/** Serviços do catálogo ligados a cada categoria (ligações internas). */
export const RELATED_SERVICES: Record<TechCategory, string[]> = {
  'front-end': ['aplicacoes-web', 'ux-ui-design', 'automacao-de-testes'],
  mobile: ['aplicacoes-mobile', 'ux-ui-design', 'automacao-de-testes'],
  'back-end': ['aplicacoes-enterprise', 'modernizacao-de-sistemas', 'aplicacoes-cloud'],
  cloud: ['migracao-para-cloud', 'aplicacoes-cloud', 'devops-e-devsecops'],
  devops: ['devops-e-devsecops', 'pipelines-ci-cd', 'migracao-para-cloud'],
  qa: ['automacao-de-testes', 'testes-de-performance', 'testes-manuais'],
  data: ['desenvolvimento-ia-ml', 'migracao-para-cloud', 'aplicacoes-cloud'],
  database: ['modernizacao-de-sistemas', 'migracao-para-cloud', 'aplicacoes-enterprise'],
  enterprise: ['aplicacoes-enterprise', 'modernizacao-de-sistemas', 'automacao-de-testes'],
  ai: ['ia-generativa', 'agentes-de-ia', 'desenvolvimento-ia-ml'],
};

/**
 * pt-PT → pt-BR. Glossário curado; o resultado é revisto por amostragem
 * (docs/14-tecnologias.md, "Revisão pt-BR"). Aplica-se só a texto de modelos.
 */
const BR: [string, string][] = [
  // Frases primeiro: "ecrã" é masculino e "tela" feminino.
  ['Cada ecrã é desenhado de raiz', 'Cada tela é desenhada do zero'],
  ['os ecrãs novos já em', 'as telas novas já em'],
  ['e os antigos migrados', 'e as antigas migradas'],
  ['Da API ao ecrã', 'Da API à tela'],
  [
    'A app tem más avaliações e ninguém lhe quer mexer',
    'O app tem avaliações ruins e ninguém quer mexer nele',
  ],
  ['A app fecha sozinha', 'O app fecha sozinho'],
  ['A app não fala com', 'O app não conversa com'],
  ['falta a app', 'falta o app'],
  ['Publicam a app', 'Vocês publicam o app'],
  ['manutenção contínua da app', 'manutenção contínua do app'],
  [
    'Cada versão funciona num telemóvel e falha noutro',
    'Cada versão funciona em um celular e falha em outro',
  ],
  ['No caso Clever', 'No case da Clever'],
  ['sob controlo', 'sob controle'],
  ['de raiz', 'do zero'],
  ['folhas de cálculo', 'planilhas'],
  ['Os pedidos de suporte acumulam-se', 'Os chamados de suporte se acumulam'],
  ['sob pedido', 'sob demanda'],
  ['cifragem', 'criptografia'],
  ['controlo', 'controle'],
  ['monitorizados', 'monitorados'],
  ['folhas de Excel', 'planilhas de Excel'],
  ['Bases de dados geridas', 'Bancos de dados gerenciados'],
  ['A base de dados antiga', 'O banco de dados antigo'],
  ['Uma falha na base de dados', 'Uma falha no banco de dados'],
  ['pela base de dados', 'pelo banco de dados'],
  ['a nossa base de dados', 'o nosso banco de dados'],
  ['bases de dados', 'bancos de dados'],
  ['Bases de dados', 'Bancos de dados'],
  ['sem desenho', 'sem planejamento'],
  ['Desenho', 'Design'],
  ['desenho', 'design'],
  ['Desenha', 'Projeta'],
  ['Arranque', 'Início'],
  ['arranque', 'inicialização'],
  ['Percebemos', 'Entendemos'],
  ['portátil', 'notebook'],
  ['ficheiros', 'arquivos'],
  ['ficheiro', 'arquivo'],
  ['num', 'em um'],
  ['numa', 'em uma'],
  ['equipas', 'equipes'],
  ['equipa', 'equipe'],
  ['Equipas', 'Equipes'],
  ['Equipa', 'Equipe'],
  ['programadores', 'desenvolvedores'],
  ['programador', 'desenvolvedor'],
  ['Programador', 'Desenvolvedor'],
  ['utilizadores', 'usuários'],
  ['ecrãs', 'telas'],
  ['ecrã', 'tela'],
  ['telemóvel', 'celular'],
  ['e gere', 'e gerencia'],
  ['Gere o dia a dia', 'Gerencia o dia a dia'],
  ['geridos', 'gerenciados'],
  ['contacto', 'contato'],
  ['registo', 'registro'],
  ['facto', 'fato'],
  ['Contentores', 'Contêineres'],
  ['contentores', 'contêineres'],
  ['A sua empresa', 'Sua empresa'],
  ['passámos', 'passamos'],
  ['partem', 'quebram'],
  ['parte algo', 'quebra algo'],
  ['conformes com', 'em conformidade com'],
  ['sénior', 'sênior'],
  ['monitorização', 'monitoramento'],
  ['Monitorização', 'Monitoramento'],
  ['sobredimensionada', 'superdimensionada'],
  ['fatura', 'conta'],
  ['Pontos de situação', 'Reuniões de status'],
  ['descoberta', 'discovery'],
];
const BR_RE = BR.map(
  ([from, to]) => [new RegExp(`(?<!\\p{L})${from}(?!\\p{L})`, 'gu'), to] as const,
);
export function ptToBr(text: string): string {
  return BR_RE.reduce((s, [re, to]) => s.replace(re, to), text);
}
