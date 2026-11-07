import type { ModelId, TechCategory } from '../schema';

/**
 * Modelos de texto da máquina de conteúdo por stack.
 *
 * Regras (docs/14-tecnologias.md):
 * - {name} é substituído pelo nome da stack. Nada mais é interpolado.
 * - Cada serviço começa num problema do cliente (pain) e termina no que fazemos (text).
 * - Escritos em pt-PT. O inglês está em src/i18n/en/technologies.json (chave = texto pt-PT);
 *   o pt-BR é gerado pelo glossário src/i18n/br/glossary.json (ptToBr).
 * - IA aparece de forma discreta: um bloco "Ferramentas de IA que usamos" em cada página e uma pergunta
 *   frequente. Não há páginas próprias para ferramentas de IA (decisão do benchmark BairesDev).
 */
/** Texto pt-PT (a tradução vem dos catálogos em src/i18n). */
export type Two = string;
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
  'front-end': 'Front-end',
  mobile: 'Mobile',
  'back-end': 'Back-end',
  cloud: 'Cloud',
  devops: 'DevOps',
  qa: 'Qualidade e testes',
  data: 'Dados',
  database: 'Bases de dados',
  enterprise: 'ERP, CRM e low-code',
  ai: 'IA e machine learning',
};

/** Palavra-chave por omissão (H1 e título SEO). A stack pode substituir. */
export const KEYWORD: Record<TechCategory, Two> = {
  'front-end': 'Desenvolvimento {name}',
  mobile: 'Desenvolvimento de apps {name}',
  'back-end': 'Desenvolvimento {name}',
  cloud: 'Consultoria {name}',
  devops: 'Consultoria {name}',
  qa: 'Automação de testes com {name}',
  data: 'Engenharia de dados com {name}',
  database: 'Consultoria {name}',
  enterprise: 'Consultoria {name}',
  ai: 'Desenvolvimento com {name}',
};

/** Quem procuramos/apresentamos (para frases e títulos de perfis). */
export const ROLE_NOUN: Record<TechCategory, Two> = {
  'front-end': 'programadores {name}',
  mobile: 'programadores {name}',
  'back-end': 'programadores {name}',
  cloud: 'engenheiros {name}',
  devops: 'engenheiros {name}',
  qa: 'engenheiros de QA com {name}',
  data: 'engenheiros de dados {name}',
  database: 'especialistas {name}',
  enterprise: 'consultores {name}',
  ai: 'engenheiros de IA com {name}',
};

/** Etiquetas das cinco camadas do cartão do topo. */
export const LAYERS: Record<TechCategory, Two[]> = {
  'front-end': ['Interface', 'Estado e dados', 'Build', 'Testes', 'Entrega'],
  mobile: ['App', 'Interface', 'Dados', 'Testes', 'Lojas'],
  'back-end': ['Interface', 'APIs', 'Dados', 'Cloud', 'Qualidade'],
  devops: ['Código', 'Build', 'Deploy', 'Runtime', 'Observabilidade'],
  cloud: ['Computação', 'Dados', 'Rede e segurança', 'Automação', 'Observabilidade'],
  qa: ['Testes', 'Linguagem', 'Execução', 'Relatórios', 'Integrações'],
  data: ['Fontes', 'Ingestão', 'Processamento', 'Armazenamento', 'Consumo'],
  database: ['Modelo', 'Consultas', 'Replicação', 'Backups', 'Monitorização'],
  enterprise: ['Processos', 'Plataforma', 'Integrações', 'Dados', 'Utilizadores'],
  ai: ['Dados', 'Modelos', 'Orquestração', 'Canais', 'Avaliação'],
};

/** Nomes dos grupos de ferramentas usados em stacks.ts (tools). */
export const TOOL_GROUP: Record<string, Two> = {
  frameworks: 'Frameworks',
  ui: 'Interface e design system',
  state: 'Estado e dados',
  data: 'Bases de dados',
  build: 'Build e qualidade de código',
  testing: 'Testes',
  cloud: 'Cloud',
  devops: 'DevOps e CI/CD',
  observability: 'Observabilidade',
  security: 'Segurança',
  messaging: 'Mensagens e integração',
  mobile: 'Mobile',
  iac: 'Infraestrutura como código',
  containers: 'Contentores',
  reporting: 'Relatórios',
  languages: 'Linguagens',
  performance: 'Performance e carga',
  management: 'Gestão de testes',
  devices: 'Dispositivos e browsers',
  bi: 'BI e visualização',
  orchestration: 'Orquestração',
  storage: 'Armazenamento',
  processing: 'Processamento',
  ml: 'Ciência de dados e ML',
  governance: 'Qualidade e governança',
  admin: 'Administração',
  replication: 'Alta disponibilidade',
  migration: 'Migração',
  modules: 'Módulos e produtos',
};

export const SERVICES: Record<TechCategory, ServiceTpl[]> = {
  'front-end': [
    {
      id: 'apps',
      title: 'Aplicações web em {name}',
      pain: 'A interface atual não acompanha o produto.',
      text: 'Portais, plataformas SaaS e back-offices em {name}, rápidos e fáceis de manter.',
    },
    {
      id: 'design-system',
      title: 'Design systems e componentes',
      pain: 'Cada ecrã é desenhado de raiz.',
      text: 'Bibliotecas de componentes {name} documentadas, acessíveis e partilhadas entre equipas.',
    },
    {
      id: 'performance',
      title: 'Performance e Core Web Vitals',
      pain: 'As páginas demoram e o Google penaliza.',
      text: 'Auditoria e otimização de carregamento, renderização e bundles em {name}.',
    },
    {
      id: 'modernization',
      title: 'Modernização de front-end',
      pain: 'O front-end legado trava cada nova funcionalidade.',
      text: 'Migração faseada para {name}, sem parar o produto, ecrã a ecrã.',
    },
    {
      id: 'accessibility',
      title: 'Acessibilidade',
      pain: 'Parte dos utilizadores não consegue usar o produto.',
      text: 'Interfaces {name} conformes com WCAG 2.2, testadas com leitores de ecrã.',
    },
    {
      id: 'qa',
      title: 'Testes de front-end',
      pain: 'Cada lançamento parte algo no browser.',
      text: 'Testes de componentes e end-to-end automáticos em cada alteração de {name}.',
    },
  ],
  mobile: [
    {
      id: 'apps',
      title: 'Apps {name} de raiz',
      pain: 'A ideia está validada, falta a app.',
      text: 'Desenho, desenvolvimento e publicação de apps {name}, da primeira versão às lojas.',
    },
    {
      id: 'modernization',
      title: 'Evolução de apps existentes',
      pain: 'A app tem más avaliações e ninguém lhe quer mexer.',
      text: 'Diagnóstico, estabilização e novas funcionalidades em apps {name}.',
    },
    {
      id: 'performance',
      title: 'Performance e estabilidade',
      pain: 'A app fecha sozinha e consome bateria.',
      text: 'Monitorização de falhas, otimização de arranque e consumo em {name}.',
    },
    {
      id: 'integrations',
      title: 'Integrações e APIs',
      pain: 'A app não fala com os sistemas da empresa.',
      text: 'Ligação segura a APIs, pagamentos, notificações e autenticação.',
    },
    {
      id: 'qa',
      title: 'Testes mobile',
      pain: 'Cada versão funciona num telemóvel e falha noutro.',
      text: 'Testes automáticos em dispositivos reais e emuladores para {name}.',
    },
    {
      id: 'release',
      title: 'Publicação e manutenção',
      pain: 'Publicar nas lojas é sempre uma corrida.',
      text: 'Pipelines de publicação, versões beta e manutenção contínua da app.',
    },
  ],
  'back-end': [
    {
      id: 'apis',
      title: 'APIs e microsserviços em {name}',
      pain: 'As APIs não aguentam o crescimento do produto.',
      text: 'APIs em {name} rápidas, documentadas e prontas a escalar.',
    },
    {
      id: 'modernization',
      title: 'Modernização de sistemas {name}',
      pain: 'O sistema legado trava cada nova funcionalidade.',
      text: 'Migração faseada para versões atuais de {name}, com testes antes de cada passo.',
    },
    {
      id: 'cloud',
      title: '{name} na cloud',
      pain: 'A infraestrutura custa mais do que entrega.',
      text: 'Aplicações {name} em contentores e serviços geridos, com custos visíveis.',
    },
    {
      id: 'integrations',
      title: 'Integrações enterprise',
      pain: 'O ERP e o CRM não falam um com o outro.',
      text: 'Integrações fiáveis e auditáveis entre sistemas, construídas em {name}.',
    },
    {
      id: 'data',
      title: 'Dados e performance',
      pain: 'As consultas lentas atrasam todo o produto.',
      text: 'Modelação de dados, caching e otimização de consultas em aplicações {name}.',
    },
    {
      id: 'qa',
      title: 'Testes e QA para {name}',
      pain: 'Cada lançamento é uma aposta.',
      text: 'Testes unitários, de integração e de contrato automáticos em cada alteração.',
    },
  ],
  devops: [
    {
      id: 'adoption',
      title: 'Adoção de {name}',
      pain: 'Cada ambiente é configurado à mão.',
      text: 'Introdução faseada de {name}, com padrões que as equipas conseguem manter.',
    },
    {
      id: 'platform',
      title: 'Plataforma {name}',
      pain: 'A configuração cresceu sem desenho.',
      text: 'Revisão e desenho da plataforma {name} com segurança, resiliência e custo em mente.',
    },
    {
      id: 'automation',
      title: 'CI/CD com {name}',
      pain: 'Publicar uma versão demora dias.',
      text: 'Pipelines que constroem, testam e publicam com {name} várias vezes por semana.',
    },
    {
      id: 'security',
      title: 'Segurança da cadeia de entrega',
      pain: 'Ninguém sabe o que corre em produção.',
      text: 'Imagens verificadas, segredos geridos e políticas aplicadas em {name}.',
    },
    {
      id: 'cost',
      title: 'Custos e performance',
      pain: 'A infraestrutura está sobredimensionada.',
      text: 'Dimensionamento, escalamento automático e redução de desperdício com {name}.',
    },
    {
      id: 'operations',
      title: 'Operação e observabilidade',
      pain: 'Os problemas são descobertos pelos clientes.',
      text: 'Monitorização, alertas e resposta a incidentes em ambientes {name}.',
    },
  ],
  cloud: [
    {
      id: 'migration',
      title: 'Migração para {name}',
      pain: 'O datacenter próprio já não compensa.',
      text: 'Migração planeada por fases para {name}, com o mínimo de interrupção.',
    },
    {
      id: 'architecture',
      title: 'Arquitetura e boas práticas',
      pain: 'A plataforma cresceu sem desenho.',
      text: 'Revisão e desenho de arquitetura {name} com segurança, resiliência e custo em mente.',
    },
    {
      id: 'cost',
      title: 'Otimização de custos',
      pain: 'A fatura cresce todos os meses.',
      text: 'Visibilidade de custos e redução de desperdício em {name}, sem perder performance.',
    },
    {
      id: 'automation',
      title: 'Automação e CI/CD',
      pain: 'Publicar uma versão demora dias.',
      text: 'Pipelines e infraestrutura como código para publicar várias vezes por semana.',
    },
    {
      id: 'security',
      title: 'Segurança e conformidade',
      pain: 'Ninguém sabe quem tem acesso a quê.',
      text: 'Identidades, segredos e políticas em {name}, prontos para auditoria.',
    },
    {
      id: 'operations',
      title: 'Operação e observabilidade',
      pain: 'Os problemas são descobertos pelos clientes.',
      text: 'Monitorização, alertas e resposta a incidentes para plataformas em {name}.',
    },
  ],
  qa: [
    {
      id: 'automation',
      title: 'Automação de testes com {name}',
      pain: 'A regressão manual atrasa cada lançamento.',
      text: 'Suites {name} que cobrem os fluxos críticos do produto.',
    },
    {
      id: 'framework',
      title: 'Framework de automação',
      pain: 'Os testes automáticos falham sem razão.',
      text: 'Estrutura {name} estável, com padrões, dados de teste e manutenção simples.',
    },
    {
      id: 'ci',
      title: 'Testes no pipeline',
      pain: 'Os testes só correm quando alguém se lembra.',
      text: 'Execução de {name} em cada alteração, com relatórios claros para a equipa.',
    },
    {
      id: 'factory',
      title: 'Fábrica de testes',
      pain: 'A equipa não tem tempo para testar.',
      text: 'Testes manuais, exploratórios e automáticos sob pedido, com {name} onde faz sentido.',
    },
    {
      id: 'team',
      title: 'QA na sua equipa',
      pain: 'Os bugs só aparecem em produção.',
      text: 'Engenheiros de QA com {name} integrados nas suas sprints e rituais.',
    },
    {
      id: 'strategy',
      title: 'Estratégia de qualidade',
      pain: 'Não se sabe o que está testado.',
      text: 'Pirâmide de testes, métricas e cobertura dos riscos que importam.',
    },
  ],
  data: [
    {
      id: 'platform',
      title: 'Plataformas de dados com {name}',
      pain: 'Os dados estão espalhados por vários sistemas.',
      text: 'Uma plataforma {name} que junta os dados da empresa num só lugar, pronta a crescer.',
    },
    {
      id: 'pipelines',
      title: 'Pipelines e ETL',
      pain: 'Os relatórios esperam por cargas feitas à mão.',
      text: 'Pipelines {name} automáticos, monitorizados e fáceis de manter.',
    },
    {
      id: 'analytics',
      title: 'Relatórios e dashboards',
      pain: 'As decisões esperam por folhas de Excel.',
      text: 'Indicadores atualizados e confiáveis, ligados aos dados tratados em {name}.',
    },
    {
      id: 'quality',
      title: 'Qualidade e governança de dados',
      pain: 'Ninguém confia nos números.',
      text: 'Testes de dados, linhagem e regras de acesso para que cada número tenha origem.',
    },
    {
      id: 'migration',
      title: 'Migração e modernização',
      pain: 'O data warehouse antigo já não escala.',
      text: 'Migração faseada para {name}, com validação de dados em cada etapa.',
    },
    {
      id: 'cost',
      title: 'Performance e custos',
      pain: 'As consultas demoram e a fatura cresce.',
      text: 'Otimização de processamento, armazenamento e custos em {name}.',
    },
  ],
  database: [
    {
      id: 'design',
      title: 'Modelação e arquitetura',
      pain: 'O modelo de dados cresceu sem regras.',
      text: 'Modelação, normalização e índices em {name} pensados para o produto.',
    },
    {
      id: 'performance',
      title: 'Performance e tuning',
      pain: 'As consultas lentas atrasam todo o produto.',
      text: 'Análise de planos de execução, índices e configuração de {name}.',
    },
    {
      id: 'migration',
      title: 'Migração para {name}',
      pain: 'A base de dados antiga custa caro e trava a cloud.',
      text: 'Migração planeada para {name}, na cloud ou on-premise, com validação de dados.',
    },
    {
      id: 'ha',
      title: 'Alta disponibilidade e backups',
      pain: 'Uma falha na base de dados para a empresa.',
      text: 'Replicação, failover e backups testados em {name}.',
    },
    {
      id: 'security',
      title: 'Segurança e conformidade',
      pain: 'Dados sensíveis sem controlo de acessos.',
      text: 'Acessos, cifragem e auditoria em {name}, alinhados com o RGPD e a LGPD.',
    },
    {
      id: 'operations',
      title: 'Administração (DBA)',
      pain: 'Ninguém é responsável pela base de dados.',
      text: 'Monitorização, manutenção e atualizações de {name} com um DBA dedicado.',
    },
  ],
  enterprise: [
    {
      id: 'implementation',
      title: 'Implementação {name}',
      pain: 'Os processos vivem em folhas de cálculo e emails.',
      text: 'Implementação de {name} por fases, alinhada com os processos e as prioridades da empresa.',
    },
    {
      id: 'customization',
      title: 'Desenvolvimento e personalização',
      pain: 'A solução standard não cobre o seu negócio.',
      text: 'Extensões e aplicações à medida em {name}, sem comprometer as atualizações.',
    },
    {
      id: 'integrations',
      title: 'Integrações',
      pain: '{name} não fala com o resto dos sistemas.',
      text: 'Integrações por APIs e middleware entre {name}, ERP, CRM e aplicações internas.',
    },
    {
      id: 'migration',
      title: 'Migração e upgrades',
      pain: 'A versão atual está a chegar ao fim do suporte.',
      text: 'Upgrades e migrações de {name} planeados, com dados validados e testes de regressão.',
    },
    {
      id: 'support',
      title: 'Sustentação (AMS)',
      pain: 'Os pedidos de suporte acumulam-se.',
      text: 'Suporte e evolução contínua de {name} com níveis de serviço acordados.',
    },
    {
      id: 'qa',
      title: 'Testes e qualidade',
      pain: 'Cada atualização obriga a semanas de testes manuais.',
      text: 'Testes funcionais e automáticos para cada release de {name}.',
    },
  ],
  ai: [
    {
      id: 'assistants',
      title: 'Assistentes e chatbots com {name}',
      pain: 'O apoio ao cliente e as equipas internas não escalam.',
      text: 'Assistentes ligados aos seus sistemas, que respondem com dados da empresa e passam para uma pessoa quando é preciso.',
    },
    {
      id: 'rag',
      title: 'Pesquisa nos seus documentos (RAG)',
      pain: 'A informação está presa em PDFs, wikis e emails.',
      text: 'Respostas com fonte a partir dos documentos da empresa, com {name} e pesquisa vetorial.',
    },
    {
      id: 'automation',
      title: 'Agentes e automação',
      pain: 'A equipa perde horas em tarefas repetitivas.',
      text: 'Agentes com {name} que leem, decidem e executam passos em ferramentas reais, com aprovação humana onde importa.',
    },
    {
      id: 'integration',
      title: 'IA no seu produto',
      pain: 'A IA fica numa demo e nunca chega ao produto.',
      text: 'Funcionalidades de IA integradas na sua aplicação, com APIs, testes e monitorização como o resto do código.',
    },
    {
      id: 'evaluation',
      title: 'Avaliação, custo e qualidade',
      pain: 'Ninguém sabe se as respostas estão certas nem quanto custam.',
      text: 'Conjuntos de avaliação e métricas de qualidade, latência e custo por pedido em cada versão.',
    },
    {
      id: 'security',
      title: 'Segurança e governança',
      pain: 'Há receio de que dados sensíveis saiam da empresa.',
      text: 'Controlo de dados, RGPD e LGPD, guardrails e registo de cada pedido ao modelo.',
    },
  ],
};

/** Perguntas comuns a todas as stacks. A pergunta de IA é a única menção explícita além do bloco de ferramentas. */
export const FAQ_COMMON: FaqTpl[] = [
  {
    q: 'A Yellowipe trabalha com {name} em Portugal e no Brasil?',
    a: 'Sim. Temos especialistas em {name} em Portugal e no Brasil e trabalhamos com empresas em Portugal, no Brasil e nos Estados Unidos, em português e em inglês.',
  },
  {
    q: 'Como avaliam um especialista em {name}?',
    a: 'Com entrevistas técnicas conduzidas por engenheiros que trabalham com {name} e, quando faz sentido, um exercício prático. Recebe as notas da avaliação com cada perfil.',
  },
  {
    q: 'Posso contratar o especialista em {name} diretamente?',
    a: 'Sim. No modelo Contrate o profissional passa a fazer parte da sua empresa. No Reforce, fica com contrato Yellowipe e trabalha na sua equipa. No Construa, a Yellowipe entrega o projeto.',
  },
  {
    q: 'Usam ferramentas de IA no desenvolvimento com {name}?',
    a: 'Sim, com assistentes como Claude Code, Cursor e GitHub Copilot, sempre com revisão por engenheiros seniores e dentro das regras de segurança da sua empresa.',
  },
];

export const FAQ_CATEGORY: Record<TechCategory, FaqTpl[]> = {
  'front-end': [
    {
      q: '{name} é uma boa escolha para SEO?',
      a: 'Sim, quando a renderização é pensada desde o início: renderização no servidor ou estática, metadados corretos e Core Web Vitals controlados.',
    },
    {
      q: 'Conseguem migrar o nosso front-end para {name}?',
      a: 'Sim, por fases: os ecrãs novos já em {name} e os antigos migrados ao ritmo do produto, sem uma reescrita de uma só vez.',
    },
  ],
  mobile: [
    {
      q: 'Nativo ou multiplataforma?',
      a: 'Depende do orçamento, da performance pedida e da equipa que vai manter a app. Recomendamos depois de uma descoberta curta.',
    },
    {
      q: 'Publicam a app nas lojas?',
      a: 'Sim, na conta da sua empresa na App Store e no Google Play, com versões beta antes de cada lançamento.',
    },
  ],
  'back-end': [
    {
      q: 'Conseguem migrar um sistema antigo em {name}?',
      a: 'Sim, por fases: avaliamos dependências, cobrimos o essencial com testes e migramos módulo a módulo, sem parar a operação.',
    },
    {
      q: 'Integram com o nosso ERP ou CRM?',
      a: 'Sim. Construímos integrações com filas de mensagens, retries e auditoria, para que nenhum dado se perca entre sistemas.',
    },
  ],
  devops: [
    {
      q: 'Conseguem introduzir {name} sem parar as entregas?',
      a: 'Sim. Começamos por um serviço ou ambiente piloto, medimos o resultado e alargamos por fases, com documentação para a sua equipa.',
    },
    {
      q: 'Trabalham em AWS, Azure e Google Cloud?',
      a: 'Sim, nas três e em infraestrutura própria. {name} funciona da mesma forma em todas.',
    },
  ],
  cloud: [
    {
      q: 'Ajudam a reduzir a fatura de {name}?',
      a: 'Sim. Começamos por dar visibilidade aos custos por equipa e serviço e depois eliminamos desperdício, com metas acordadas consigo.',
    },
    {
      q: 'Trabalham com outras clouds além de {name}?',
      a: 'Sim, AWS, Azure e Google Cloud, e também ambientes híbridos com infraestrutura própria.',
    },
  ],
  qa: [
    {
      q: 'Fazem testes manuais além da automação?',
      a: 'Sim. A nossa fábrica de testes cobre testes manuais, diagnóstico e automação sob pedido, e automatizamos primeiro o que se repete mais.',
    },
    {
      q: 'Quantos testes conseguem automatizar?',
      a: 'Depende do produto. No caso Clever passámos de 32 para mais de 1.600 testes automatizados em seis meses.',
    },
  ],
  data: [
    {
      q: 'Trabalham com dados na cloud e on-premise?',
      a: 'Sim: AWS, Azure e Google Cloud, e também bases de dados e servidores próprios. Muitas plataformas combinam os dois.',
    },
    {
      q: 'Ligam {name} aos nossos sistemas (ERP, CRM)?',
      a: 'Sim. Construímos a ingestão a partir do ERP, CRM, bases de dados e APIs, com cargas incrementais e alertas quando algo falha.',
    },
  ],
  database: [
    {
      q: 'Conseguem migrar a nossa base de dados para {name}?',
      a: 'Sim. Avaliamos esquema, procedimentos e dependências, migramos por fases e validamos os dados antes de mudar a aplicação.',
    },
    {
      q: 'Fazem administração contínua (DBA)?',
      a: 'Sim, com um DBA na sua equipa (Reforce) ou com o serviço gerido pela Yellowipe, incluindo monitorização e backups.',
    },
  ],
  enterprise: [
    {
      q: 'Fazem implementação de raiz ou só sustentação?',
      a: 'As duas coisas: implementação por fases, evolução e sustentação (AMS), em projeto ou com consultores na sua equipa.',
    },
    {
      q: 'Como garantem que as atualizações de {name} não partem nada?',
      a: 'Com ambientes de teste, testes de regressão automatizados e um plano de release acordado consigo.',
    },
  ],
  ai: [
    {
      q: 'Os nossos dados ficam privados?',
      a: 'Sim. Usamos contas empresariais que não treinam modelos com os seus dados, alojamento na região que escolher e, quando é preciso, modelos na sua própria infraestrutura.',
    },
    {
      q: 'Conseguem começar com uma prova de conceito?',
      a: 'Sim: uma prova de conceito curta, com dados reais e critérios de sucesso acordados antes de investir em produção.',
    },
  ],
};

export const PROFILES: Record<TechCategory, ProfileTpl[]> = {
  'front-end': [
    {
      role: 'Tech lead {name}',
      bio: 'Lidera equipas de front-end e define arquitetura, padrões e design system.',
      years: 11,
      city: 'Lisboa',
      market: 'PT',
      model: 'reforce',
    },
    {
      role: 'Front-end sénior {name}',
      bio: 'Interfaces rápidas e acessíveis para produtos com milhares de utilizadores.',
      years: 8,
      city: 'São Paulo',
      market: 'BR',
      model: 'construa',
    },
    {
      role: 'Full-stack {name}',
      bio: 'Da API ao ecrã, em produtos SaaS e portais de cliente.',
      years: 7,
      city: 'Porto',
      market: 'PT',
      model: 'contrate',
    },
    {
      role: 'QA automation front-end',
      bio: 'Testes de componentes e end-to-end em pipelines de entrega contínua.',
      years: 6,
      city: 'Recife',
      market: 'BR',
      model: 'reforce',
    },
  ],
  mobile: [
    {
      role: 'Tech lead mobile {name}',
      bio: 'Lançou apps com milhões de downloads e lidera equipas mobile.',
      years: 10,
      city: 'São Paulo',
      market: 'BR',
      model: 'construa',
    },
    {
      role: 'Programador {name} sénior',
      bio: 'Apps estáveis, com atenção ao arranque, à memória e à bateria.',
      years: 8,
      city: 'Lisboa',
      market: 'PT',
      model: 'reforce',
    },
    {
      role: 'Programador {name}',
      bio: 'Funcionalidades de ponta a ponta, da interface à integração com APIs.',
      years: 5,
      city: 'Braga',
      market: 'PT',
      model: 'contrate',
    },
    {
      role: 'QA mobile',
      bio: 'Testes automáticos em dispositivos reais antes de cada publicação.',
      years: 6,
      city: 'Curitiba',
      market: 'BR',
      model: 'reforce',
    },
  ],
  'back-end': [
    {
      role: 'Tech lead {name}',
      bio: 'Liderou modernizações de sistemas críticos sem parar a operação.',
      years: 12,
      city: 'Porto',
      market: 'PT',
      model: 'reforce',
    },
    {
      role: 'Back-end sénior {name}',
      bio: 'APIs de alto volume, com observabilidade e testes de contrato.',
      years: 9,
      city: 'São Paulo',
      market: 'BR',
      model: 'construa',
    },
    {
      role: 'Full-stack {name}',
      bio: 'Back-offices e portais, do modelo de dados ao front-end.',
      years: 7,
      city: 'Lisboa',
      market: 'PT',
      model: 'contrate',
    },
    {
      role: 'QA automation {name}',
      bio: 'Testes de integração e de API a correr em cada pull request.',
      years: 8,
      city: 'Recife',
      market: 'BR',
      model: 'reforce',
    },
  ],
  devops: [
    {
      role: 'Engenheiro de plataforma {name}',
      bio: 'Desenha plataformas internas que dão autonomia às equipas.',
      years: 11,
      city: 'Lisboa',
      market: 'PT',
      model: 'construa',
    },
    {
      role: 'Engenheiro DevOps {name}',
      bio: 'Pipelines e infraestrutura como código em ambientes de produção.',
      years: 8,
      city: 'São Paulo',
      market: 'BR',
      model: 'reforce',
    },
    {
      role: 'SRE {name}',
      bio: 'Fiabilidade, alertas e resposta a incidentes.',
      years: 9,
      city: 'Porto',
      market: 'PT',
      model: 'reforce',
    },
    {
      role: 'DevSecOps {name}',
      bio: 'Segurança integrada no pipeline, das imagens aos segredos.',
      years: 7,
      city: 'Curitiba',
      market: 'BR',
      model: 'contrate',
    },
  ],
  cloud: [
    {
      role: 'Arquiteto cloud {name}',
      bio: 'Desenha plataformas seguras e com custos sob controlo.',
      years: 12,
      city: 'Lisboa',
      market: 'PT',
      model: 'construa',
    },
    {
      role: 'Engenheiro DevOps {name}',
      bio: 'Pipelines, infraestrutura como código e publicação contínua.',
      years: 8,
      city: 'São Paulo',
      market: 'BR',
      model: 'reforce',
    },
    {
      role: 'SRE {name}',
      bio: 'Monitorização, alertas e resposta a incidentes em produção.',
      years: 9,
      city: 'Porto',
      market: 'PT',
      model: 'reforce',
    },
    {
      role: 'Engenheiro de plataforma {name}',
      bio: 'Ferramentas internas que dão autonomia às equipas de produto.',
      years: 7,
      city: 'Florianópolis',
      market: 'BR',
      model: 'contrate',
    },
  ],
  qa: [
    {
      role: 'QA lead {name}',
      bio: 'Define a estratégia de qualidade e lidera a automação.',
      years: 10,
      city: 'Lisboa',
      market: 'PT',
      model: 'construa',
    },
    {
      role: 'QA automation sénior {name}',
      bio: 'Suites estáveis e rápidas que correm em paralelo no pipeline.',
      years: 8,
      city: 'São Paulo',
      market: 'BR',
      model: 'reforce',
    },
    {
      role: 'SDET {name}',
      bio: 'Ferramentas de teste, dados de teste e ambientes efémeros.',
      years: 7,
      city: 'Porto',
      market: 'PT',
      model: 'reforce',
    },
    {
      role: 'QA automation {name}',
      bio: 'Testes end-to-end e de API para produtos web e mobile.',
      years: 5,
      city: 'Recife',
      market: 'BR',
      model: 'contrate',
    },
  ],
  data: [
    {
      role: 'Arquiteto de dados {name}',
      bio: 'Desenha plataformas de dados que crescem com o negócio.',
      years: 12,
      city: 'Lisboa',
      market: 'PT',
      model: 'construa',
    },
    {
      role: 'Engenheiro de dados sénior {name}',
      bio: 'Pipelines de alto volume, testados e monitorizados.',
      years: 8,
      city: 'São Paulo',
      market: 'BR',
      model: 'reforce',
    },
    {
      role: 'Analytics engineer {name}',
      bio: 'Modelos de dados prontos para relatórios e dashboards.',
      years: 6,
      city: 'Porto',
      market: 'PT',
      model: 'contrate',
    },
    {
      role: 'DataOps {name}',
      bio: 'Automação, observabilidade e custos da plataforma de dados.',
      years: 7,
      city: 'Recife',
      market: 'BR',
      model: 'reforce',
    },
  ],
  database: [
    {
      role: 'DBA sénior {name}',
      bio: 'Performance, replicação e recuperação em sistemas críticos.',
      years: 13,
      city: 'Lisboa',
      market: 'PT',
      model: 'reforce',
    },
    {
      role: 'Arquiteto de dados {name}',
      bio: 'Modelos de dados e migrações sem perda de informação.',
      years: 11,
      city: 'São Paulo',
      market: 'BR',
      model: 'construa',
    },
    {
      role: 'Programador SQL {name}',
      bio: 'Procedimentos, consultas e relatórios otimizados.',
      years: 7,
      city: 'Porto',
      market: 'PT',
      model: 'contrate',
    },
    {
      role: 'DBA cloud {name}',
      bio: 'Bases de dados geridas na cloud, com custos sob controlo.',
      years: 8,
      city: 'Curitiba',
      market: 'BR',
      model: 'reforce',
    },
  ],
  enterprise: [
    {
      role: 'Arquiteto de soluções {name}',
      bio: 'Desenha a solução e as integrações com o resto dos sistemas.',
      years: 13,
      city: 'Lisboa',
      market: 'PT',
      model: 'construa',
    },
    {
      role: 'Consultor funcional {name} sénior',
      bio: 'Traduz processos de negócio em configuração e requisitos.',
      years: 10,
      city: 'São Paulo',
      market: 'BR',
      model: 'reforce',
    },
    {
      role: 'Programador {name}',
      bio: 'Extensões, relatórios e integrações à medida.',
      years: 7,
      city: 'Porto',
      market: 'PT',
      model: 'contrate',
    },
    {
      role: 'Tester funcional {name}',
      bio: 'Testes de regressão e de aceitação em cada release.',
      years: 6,
      city: 'Recife',
      market: 'BR',
      model: 'reforce',
    },
  ],
  ai: [
    {
      role: 'Engenheiro de IA {name}',
      bio: 'Leva assistentes e agentes da prova de conceito à produção.',
      years: 9,
      city: 'Lisboa',
      market: 'PT',
      model: 'construa',
    },
    {
      role: 'Engenheiro de machine learning',
      bio: 'Treino, avaliação e serviço de modelos em produção.',
      years: 8,
      city: 'São Paulo',
      market: 'BR',
      model: 'reforce',
    },
    {
      role: 'Cientista de dados',
      bio: 'Transforma perguntas de negócio em modelos e métricas.',
      years: 7,
      city: 'Porto',
      market: 'PT',
      model: 'contrate',
    },
    {
      role: 'Engenheiro MLOps',
      bio: 'Pipelines, monitorização e custos de modelos em produção.',
      years: 7,
      city: 'Recife',
      market: 'BR',
      model: 'reforce',
    },
  ],
};

export const STEPS: { t: Two; x: Two }[] = [
  {
    t: 'Conversa',
    x: 'Percebemos a stack, o objetivo e o modelo que faz sentido.',
  },
  {
    t: 'Proposta',
    x: 'Perfis avaliados em {name} ou plano de projeto.',
  },
  {
    t: 'Arranque',
    x: 'Onboarding no seu repositório, pipelines e rituais.',
  },
  {
    t: 'Acompanhamento',
    x: 'Pontos de situação e métricas de entrega desde a primeira sprint.',
  },
];

/** Os três modelos aplicados à stack. */
export const MODELS: { id: ModelId; title: Two; text: Two; yw: Two; cl: Two; cta: Two }[] = [
  {
    id: 'contrate',
    title: 'Contratar {role}',
    text: 'Recrutamos para contratação permanente, com avaliação técnica em {name}.',
    yw: 'Encontra, avalia e apresenta',
    cl: 'Contrata e gere o profissional',
    cta: 'Abrir uma vaga',
  },
  {
    id: 'reforce',
    title: 'Consultores {name} na sua equipa',
    text: 'Especialistas seniores integrados na sua equipa, com as suas ferramentas e prioridades.',
    yw: 'Garante as pessoas e a substituição',
    cl: 'Gere o dia a dia',
    cta: 'Pedir perfis',
  },
  {
    id: 'construa',
    title: 'Projeto {name} de ponta a ponta',
    text: 'Uma equipa Yellowipe com gestor de projeto constrói ou moderniza a sua solução.',
    yw: 'Responde pela entrega',
    cl: 'Define objetivos e aprova',
    cta: 'Falar do projeto',
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
