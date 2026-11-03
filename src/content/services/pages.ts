import type { z } from 'zod';
import type { ServicePageFacts } from '../schema';

type Facts = z.input<typeof ServicePageFacts>;
type Offer = Facts['offerings'][number];

/** Oferta: título, problema do cliente, o que fazemos, etiquetas. */
const o = (title: string, pain: string, text: string, tags: string[]): Offer => ({
  title,
  pain,
  text,
  tags,
});

/**
 * Factos por serviço: o que muda de página para página. Perfis, processo, modelos e
 * perguntas comuns vêm da área (./templates.ts). Para acrescentar um serviço:
 * 1. Entrada em content/local/services.ts (nome, slug, resumo, modelos).
 * 2. Uma entrada aqui com pitch, seis ofertas, tecnologias e perguntas próprias.
 * 3. `npm run check` (valida comprimentos SEO, ligações e texto por resolver).
 * Sem números nem clientes inventados: casos só os que existem em content/local/cases.ts.
 */
export const servicePages: Record<string, Facts> = {
  // ---------- Software à medida ----------
  'aplicacoes-web': {
    pitch:
      'Portais, plataformas SaaS e dashboards rápidos no browser, construídos sobre APIs e prontos a crescer.',
    note: 'Web · APIs · SaaS',
    layers: [
      ['Descoberta', 'Roadmap'],
      ['React', 'Next.js', 'Angular'],
      ['Node.js', '.NET', 'PostgreSQL'],
      ['Playwright', 'Vitest'],
      ['CI/CD', 'AWS', 'Azure'],
    ],
    offerings: [
      o(
        'Plataformas SaaS',
        'O produto precisa de crescer e a base atual não aguenta.',
        'Arquitetura multi-cliente, faturação, permissões e observabilidade desde o início.',
        ['Multi-tenant', 'Stripe'],
      ),
      o(
        'Portais de cliente',
        'Os clientes ainda resolvem por email o que podiam fazer sozinhos.',
        'Áreas de cliente seguras, integradas com o ERP e o CRM, com autenticação única.',
        ['SSO', 'Integrações'],
      ),
      o(
        'Dashboards e back-offices',
        'A operação vive em folhas de cálculo partilhadas.',
        'Back-offices e painéis com dados em tempo real, permissões por perfil e exportação.',
        ['Dashboards', 'Tempo real'],
      ),
      o(
        'APIs e integrações',
        'Os sistemas não falam entre si e cada integração é feita à mão.',
        'APIs REST e GraphQL documentadas, com versões, limites e testes de contrato.',
        ['REST', 'GraphQL'],
      ),
      o(
        'Performance e Core Web Vitals',
        'As páginas são lentas e perdem posições no Google.',
        'Medimos, corrigimos o carregamento e deixamos alertas para não voltar a piorar.',
        ['Core Web Vitals', 'SSR'],
      ),
      o(
        'Modernização de front-end',
        'O front-end é antigo e cada alteração demora semanas.',
        'Migração por fases para React ou Angular modernos, sem parar o produto.',
        ['Migração', 'TypeScript'],
      ),
    ],
    stackIds: ['react', 'nextjs', 'angular', 'vue', 'typescript', 'nodejs', 'dotnet', 'postgresql'],
    tools: [
      ['Front-end', ['React', 'Next.js', 'Angular', 'Tailwind CSS']],
      ['Back-end', ['Node.js', '.NET', 'Java', 'GraphQL']],
      ['Qualidade', ['Playwright', 'Vitest', 'Storybook']],
      ['Entrega', ['GitHub Actions', 'Docker', 'Vercel', 'AWS']],
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'APIs REST', 'PostgreSQL'],
    faq: [
      {
        q: 'Que tecnologia recomendam para uma aplicação web nova?',
        a: 'Na maioria dos casos React com Next.js e TypeScript, com back-end em Node.js ou .NET. Mas escolhemos com a sua equipa, a pensar em quem vai manter a aplicação.',
      },
    ],
    related: ['aplicacoes-mobile', 'ux-ui-design', 'automacao-de-testes'],
  },

  'aplicacoes-mobile': {
    pitch:
      'Apps iOS e Android, nativas ou multiplataforma, desenhadas para milhões de utilizadores e testadas desde o primeiro dia.',
    note: 'iOS · Android · Multiplataforma',
    layers: [
      ['Descoberta', 'UX'],
      ['SwiftUI', 'Jetpack Compose'],
      ['APIs', 'Firebase'],
      ['Appium', 'XCTest'],
      ['App Store', 'Google Play'],
    ],
    offerings: [
      o(
        'Apps nativas',
        'A app precisa de tirar o máximo do dispositivo.',
        'Apps em Swift e Kotlin, com acesso a câmara, sensores, pagamentos e notificações.',
        ['Swift', 'Kotlin'],
      ),
      o(
        'Apps multiplataforma',
        'Manter duas apps separadas custa o dobro.',
        'Uma base de código em React Native ou Flutter para iOS e Android.',
        ['React Native', 'Flutter'],
      ),
      o(
        'Redesenho e modernização',
        'A app atual é lenta ou falha nas atualizações.',
        'Revemos arquitetura, UX e performance e modernizamos por fases.',
        ['Performance', 'UX'],
      ),
      o(
        'Back-end para mobile',
        'A app depende de serviços frágeis ou lentos.',
        'APIs, autenticação, notificações e sincronização offline preparadas para escala.',
        ['APIs', 'Offline'],
      ),
      o(
        'Testes e publicação automática',
        'Cada lançamento depende de testes manuais.',
        'Testes automáticos em dispositivos reais e publicação automática nas lojas.',
        ['Appium', 'Fastlane'],
      ),
      o(
        'Manutenção e evolução',
        'Ninguém acompanha a app depois do lançamento.',
        'Atualizações de sistema operativo, monitorização de erros e novas funcionalidades.',
        ['Crashlytics', 'Roadmap'],
      ),
    ],
    stackIds: ['ios-swift', 'android-kotlin', 'react-native', 'flutter', 'appium', 'nodejs'],
    tools: [
      ['Nativo', ['Swift', 'SwiftUI', 'Kotlin', 'Jetpack Compose']],
      ['Multiplataforma', ['React Native', 'Flutter', 'Expo']],
      ['Serviços', ['Firebase', 'APIs REST', 'GraphQL']],
      ['Qualidade e entrega', ['Appium', 'XCTest', 'Fastlane', 'Crashlytics']],
    ],
    skills: ['Swift', 'Kotlin', 'React Native', 'Flutter', 'Firebase'],
    faq: [
      {
        q: 'Nativa ou multiplataforma?',
        a: 'Depende do orçamento, da performance pedida e da equipa que vai manter a app. Recomendamos depois da descoberta.',
      },
      {
        q: 'Publicam nas lojas?',
        a: 'Sim, na conta da sua empresa na App Store e no Google Play.',
      },
    ],
    caseIds: ['hapvida'],
    related: ['aplicacoes-web', 'automacao-de-testes', 'ux-ui-design'],
  },

  'aplicacoes-enterprise': {
    pitch:
      'Sistemas internos integrados com o ERP e o CRM, que substituem folhas de cálculo e processos manuais.',
    note: 'ERP · CRM · Processos',
    layers: [
      ['Processos', 'Regras'],
      ['Angular', 'React'],
      ['Java', '.NET', 'SAP'],
      ['Testes de regressão'],
      ['On-premises', 'Cloud'],
    ],
    offerings: [
      o(
        'Sistemas à medida',
        'O processo crítico vive em folhas de cálculo e emails.',
        'Aplicações internas com regras de negócio, aprovações e auditoria.',
        ['Workflows', 'Auditoria'],
      ),
      o(
        'Integração com ERP e CRM',
        'Os dados são copiados à mão entre sistemas.',
        'Integrações com SAP, Salesforce e outros sistemas, com monitorização de falhas.',
        ['SAP', 'Salesforce'],
      ),
      o(
        'Portais internos',
        'Cada equipa tem a sua ferramenta e ninguém vê o todo.',
        'Portais com autenticação única, permissões por perfil e indicadores.',
        ['SSO', 'Permissões'],
      ),
      o(
        'Automação de processos',
        'Tarefas repetitivas ocupam horas da equipa.',
        'Automatizamos aprovações, documentos e notificações, com registo de cada passo.',
        ['Automação', 'Low-code'],
      ),
      o(
        'Low-code empresarial',
        'O negócio precisa de aplicações mais depressa do que a TI consegue entregar.',
        'Aplicações em OutSystems ou Power Platform, com governação e boas práticas.',
        ['OutSystems', 'Power Apps'],
      ),
      o(
        'Suporte e evolução',
        'Os sistemas internos não têm dono técnico.',
        'Equipa que mantém, corrige e evolui as aplicações com acordos de serviço.',
        ['Manutenção', 'SLA'],
      ),
    ],
    stackIds: [
      'java',
      'dotnet',
      'angular',
      'sap',
      'salesforce',
      'outsystems',
      'sql-server',
      'oracle',
    ],
    tools: [
      ['Plataformas', ['SAP', 'Salesforce', 'OutSystems', 'Power Platform']],
      ['Back-end', ['Java', 'Spring', '.NET', 'C#']],
      ['Dados', ['SQL Server', 'Oracle', 'PostgreSQL']],
      ['Integração', ['APIs REST', 'Kafka', 'Mulesoft']],
    ],
    skills: ['Java', '.NET', 'Angular', 'SAP', 'SQL'],
    faq: [
      {
        q: 'Trabalham com sistemas antigos?',
        a: 'Sim. Integramos com o que existe e modernizamos por fases, sem parar o negócio.',
      },
    ],
    related: ['modernizacao-de-sistemas', 'aplicacoes-cloud', 'automacao-de-testes'],
  },

  'aplicacoes-cloud': {
    pitch:
      'Aplicações cloud-native, preparadas para crescer sem reescrever a arquitetura e com custos sob controlo.',
    note: 'Cloud-native · Microsserviços · Serverless',
    layers: [
      ['Arquitetura', 'Domínios'],
      ['Web', 'Mobile'],
      ['Microsserviços', 'Serverless'],
      ['Testes', 'Observabilidade'],
      ['Kubernetes', 'AWS', 'Azure'],
    ],
    offerings: [
      o(
        'Arquitetura cloud-native',
        'A aplicação não aguenta picos de utilização.',
        'Desenho de arquitetura escalável, com serviços geridos e escalamento automático.',
        ['Escalabilidade', 'Serviços geridos'],
      ),
      o(
        'Microsserviços',
        'Um monólito obriga a lançar tudo de uma vez.',
        'Divisão por domínios, com serviços independentes, eventos e contratos claros.',
        ['Microsserviços', 'Eventos'],
      ),
      o(
        'Serverless',
        'Paga servidores ligados para cargas que só correm às vezes.',
        'Funções e filas serverless que custam só quando trabalham.',
        ['Lambda', 'Functions'],
      ),
      o(
        'Contentores e Kubernetes',
        'Cada ambiente é diferente e os deploys falham.',
        'Aplicações em contentores, com Kubernetes e ambientes iguais do teste à produção.',
        ['Docker', 'Kubernetes'],
      ),
      o(
        'Observabilidade',
        'Só sabe que algo falhou quando o cliente liga.',
        'Logs, métricas, traces e alertas que mostram o problema antes do cliente.',
        ['OpenTelemetry', 'Alertas'],
      ),
      o(
        'Otimização de custos',
        'A fatura da cloud cresce mais do que o negócio.',
        'Análise de consumo, dimensionamento certo e reservas, com relatórios mensais.',
        ['FinOps', 'Custos'],
      ),
    ],
    stackIds: ['aws', 'azure', 'google-cloud', 'kubernetes', 'docker', 'terraform', 'go', 'nodejs'],
    tools: [
      ['Cloud', ['AWS', 'Azure', 'Google Cloud']],
      ['Execução', ['Kubernetes', 'Docker', 'Lambda', 'Azure Functions']],
      ['Infraestrutura', ['Terraform', 'Helm', 'Bicep']],
      ['Observabilidade', ['OpenTelemetry', 'Grafana', 'Datadog']],
    ],
    skills: ['AWS', 'Kubernetes', 'Terraform', 'Go', 'Node.js'],
    faq: [
      {
        q: 'Microsserviços são sempre a melhor opção?',
        a: 'Não. Para muitos produtos um monólito bem organizado chega. Recomendamos microsserviços quando a escala ou as equipas o justificam.',
      },
    ],
    related: ['migracao-para-cloud', 'devops-e-devsecops', 'aplicacoes-web'],
  },

  // ---------- Inteligência artificial ----------
  'ia-generativa': {
    pitch:
      'Assistentes, pesquisa sobre documentos e geração de conteúdo com os dados da sua empresa, em produção e com custos medidos.',
    note: 'LLM · RAG · Assistentes',
    layers: [
      ['Documentos', 'Bases de dados'],
      ['Claude', 'GPT', 'Llama'],
      ['RAG', 'LangChain'],
      ['Avaliações', 'Guardrails'],
      ['APIs', 'Cloud privada'],
    ],
    offerings: [
      o(
        'Assistentes internos',
        'A equipa perde horas à procura de informação.',
        'Assistentes que respondem com base nos documentos da empresa, com fontes citadas.',
        ['RAG', 'Fontes'],
      ),
      o(
        'Pesquisa sobre documentos',
        'Contratos, manuais e processos estão espalhados e ninguém os encontra.',
        'Pesquisa semântica sobre milhares de documentos, com permissões por utilizador.',
        ['Pesquisa semântica', 'Vetores'],
      ),
      o(
        'Atendimento ao cliente',
        'O apoio ao cliente não acompanha o volume de pedidos.',
        'Assistentes que resolvem pedidos simples e passam os outros a uma pessoa.',
        ['Chat', 'Escalamento'],
      ),
      o(
        'Geração de conteúdo',
        'Descrições, resumos e relatórios são escritos à mão.',
        'Geração de texto e resumos com o tom da marca e revisão humana onde é preciso.',
        ['Resumos', 'Tom de marca'],
      ),
      o(
        'IA no seu produto',
        'Os clientes pedem funcionalidades de IA no produto.',
        'Integramos modelos de linguagem no seu produto, com limites de custo e qualidade.',
        ['APIs', 'Produto'],
      ),
      o(
        'Avaliação e segurança',
        'Não sabe se as respostas da IA estão certas.',
        'Conjuntos de avaliação, guardrails e monitorização de qualidade em produção.',
        ['Avaliações', 'Guardrails'],
      ),
    ],
    stackIds: ['openai', 'claude', 'langchain', 'hugging-face', 'python', 'azure'],
    tools: [
      ['Modelos', ['Claude', 'GPT', 'Llama', 'Mistral']],
      ['Orquestração', ['LangChain', 'LlamaIndex', 'Semantic Kernel']],
      ['Dados', ['pgvector', 'Pinecone', 'Elasticsearch']],
      ['Avaliação', ['Promptfoo', 'LangSmith', 'Ragas']],
    ],
    skills: ['Python', 'LLMs', 'RAG', 'LangChain', 'APIs'],
    faq: [
      {
        q: 'Que modelo de linguagem usam?',
        a: 'Escolhemos por caso, entre Claude, GPT e modelos abertos como Llama, a pensar em qualidade, custo e onde os dados podem estar.',
      },
    ],
    related: ['agentes-de-ia', 'desenvolvimento-ia-ml', 'transformacao-com-ia'],
  },

  'agentes-de-ia': {
    pitch:
      'Agentes que executam tarefas de ponta a ponta nos seus sistemas, com regras claras e supervisão humana.',
    note: 'Agentes · Ferramentas · Supervisão',
    layers: [
      ['Sistemas', 'Documentos'],
      ['Claude', 'GPT'],
      ['Ferramentas', 'Workflows'],
      ['Testes', 'Registos'],
      ['Aprovação humana'],
    ],
    offerings: [
      o(
        'Agentes de operações',
        'As mesmas tarefas de back-office voltam todos os dias.',
        'Agentes que leem pedidos, consultam sistemas e preparam a resposta para aprovação.',
        ['Back-office', 'Aprovação'],
      ),
      o(
        'Agentes de atendimento',
        'Os clientes esperam por respostas que estão nos sistemas.',
        'Agentes que consultam encomendas, faturas e estados e respondem com dados reais.',
        ['Atendimento', 'Integrações'],
      ),
      o(
        'Agentes de engenharia',
        'A equipa gasta tempo em revisões e tarefas repetitivas.',
        'Agentes que preparam testes, revisões e documentação no seu repositório.',
        ['Código', 'Revisões'],
      ),
      o(
        'Ligação a ferramentas',
        'O agente não tem acesso aos sistemas onde o trabalho acontece.',
        'Ligamos o agente ao ERP, CRM e APIs com permissões mínimas e registo de cada ação.',
        ['MCP', 'APIs'],
      ),
      o(
        'Supervisão humana',
        'Não pode deixar um agente decidir sozinho.',
        'Pontos de aprovação, limites e registo de auditoria em cada passo.',
        ['Aprovação', 'Auditoria'],
      ),
      o(
        'Avaliação contínua',
        'Não sabe quando o agente começa a errar.',
        'Testes de cenários, métricas de sucesso e alertas em produção.',
        ['Avaliações', 'Alertas'],
      ),
    ],
    stackIds: ['claude', 'openai', 'langchain', 'python', 'nodejs'],
    tools: [
      ['Modelos', ['Claude', 'GPT', 'Gemini']],
      ['Agentes', ['LangGraph', 'Claude Agent SDK', 'OpenAI Agents SDK']],
      ['Ligações', ['MCP', 'APIs REST', 'Webhooks']],
      ['Observação', ['LangSmith', 'OpenTelemetry']],
    ],
    skills: ['Python', 'Agentes', 'LLMs', 'APIs', 'Avaliações'],
    faq: [
      {
        q: 'O agente pode fazer alterações nos nossos sistemas?',
        a: 'Só as que definir. Cada ferramenta tem permissões mínimas e as ações sensíveis passam por aprovação humana.',
      },
    ],
    related: ['ia-generativa', 'transformacao-com-ia', 'aplicacoes-enterprise'],
  },

  'desenvolvimento-ia-ml': {
    pitch:
      'Modelos de previsão, classificação e recomendação treinados com os seus dados e levados para produção.',
    note: 'Machine learning · MLOps',
    layers: [
      ['Dados históricos', 'Eventos'],
      ['PyTorch', 'scikit-learn'],
      ['Pipelines', 'Airflow'],
      ['Métricas', 'Drift'],
      ['APIs', 'Batch'],
    ],
    offerings: [
      o(
        'Modelos de previsão',
        'As decisões de stock e procura são feitas por intuição.',
        'Previsões de procura, vendas e consumo com intervalos de confiança.',
        ['Previsão', 'Séries temporais'],
      ),
      o(
        'Classificação e deteção',
        'Fraude, falhas ou anomalias só são vistas tarde.',
        'Modelos que classificam e detetam casos anómalos, com explicação dos resultados.',
        ['Anomalias', 'Explicabilidade'],
      ),
      o(
        'Recomendação',
        'Todos os clientes veem a mesma oferta.',
        'Sistemas de recomendação personalizados, medidos com testes A/B.',
        ['Personalização', 'A/B'],
      ),
      o(
        'Visão computacional',
        'Inspeções e leituras são feitas à mão.',
        'Modelos que leem imagens e documentos para inspeção, contagem e extração.',
        ['Visão', 'OCR'],
      ),
      o(
        'MLOps',
        'Os modelos ficam em notebooks e nunca chegam à produção.',
        'Treino, versões, deploy e monitorização automáticos dos modelos.',
        ['MLflow', 'Pipelines'],
      ),
      o(
        'Dados para IA',
        'Os dados não estão prontos para treinar modelos.',
        'Pipelines de dados com qualidade, histórico e governação.',
        ['Engenharia de dados', 'Qualidade'],
      ),
    ],
    stackIds: ['python', 'pytorch', 'hugging-face', 'databricks', 'spark', 'airflow'],
    tools: [
      ['Modelação', ['PyTorch', 'scikit-learn', 'XGBoost']],
      ['Dados', ['Databricks', 'Spark', 'dbt', 'Airflow']],
      ['MLOps', ['MLflow', 'SageMaker', 'Azure ML', 'Vertex AI']],
      ['Visualização', ['Power BI', 'Streamlit']],
    ],
    skills: ['Python', 'PyTorch', 'scikit-learn', 'SQL', 'MLflow'],
    faq: [
      {
        q: 'Quantos dados são precisos?',
        a: 'Depende do problema. Começamos por analisar os dados que existem e dizemos com franqueza se chegam para um modelo útil.',
      },
    ],
    related: ['ia-generativa', 'transformacao-com-ia', 'aplicacoes-cloud'],
  },

  'transformacao-com-ia': {
    pitch:
      'Diagnóstico, priorização de casos de uso e roadmap de IA para toda a organização, com resultados medidos.',
    note: 'Estratégia · Casos de uso · Roadmap',
    layers: [
      ['Processos', 'Dados'],
      ['Casos de uso'],
      ['Pilotos'],
      ['Métricas', 'Governação'],
      ['Escala', 'Formação'],
    ],
    offerings: [
      o(
        'Diagnóstico de IA',
        'Há muitas ideias de IA e nenhuma prioridade.',
        'Mapeamos processos e dados e identificamos onde a IA traz retorno.',
        ['Diagnóstico', 'Processos'],
      ),
      o(
        'Priorização de casos de uso',
        'Não sabe por onde começar.',
        'Avaliamos valor, risco e esforço de cada caso de uso e escolhemos os primeiros.',
        ['Priorização', 'Valor'],
      ),
      o(
        'Pilotos com métricas',
        'Os pilotos de IA não passam de demonstrações.',
        'Pilotos curtos, com métricas de sucesso definidas antes de começar.',
        ['Pilotos', 'Métricas'],
      ),
      o(
        'Governação e segurança',
        'Não há regras para o uso de IA na empresa.',
        'Políticas de uso, proteção de dados e conformidade com o AI Act europeu.',
        ['AI Act', 'RGPD'],
      ),
      o(
        'IA no desenvolvimento',
        'As equipas de engenharia usam IA cada uma à sua maneira.',
        'Adoção de assistentes de código com regras, formação e medição de impacto.',
        ['Claude Code', 'Copilot'],
      ),
      o(
        'Formação de equipas',
        'As pessoas não sabem usar as ferramentas de IA no dia a dia.',
        'Formação prática por função, com casos da própria empresa.',
        ['Formação', 'Adoção'],
      ),
    ],
    stackIds: ['claude', 'openai', 'python', 'power-bi', 'azure'],
    tools: [
      ['Assistentes', ['Claude', 'ChatGPT Enterprise', 'Microsoft Copilot']],
      ['Desenvolvimento', ['Claude Code', 'Cursor', 'GitHub Copilot']],
      ['Dados', ['Power BI', 'Databricks', 'Fabric']],
      ['Governação', ['Políticas de uso', 'Registos de auditoria']],
    ],
    skills: ['Estratégia de IA', 'Processos', 'Dados', 'Gestão da mudança'],
    faq: [
      {
        q: 'Quanto tempo demora o diagnóstico?',
        a: '[Duração típica do diagnóstico a confirmar com a equipa de IA.]',
      },
    ],
    related: ['ia-generativa', 'agentes-de-ia', 'desenvolvimento-ia-ml'],
  },

  // ---------- Tecnologias emergentes ----------
  'realidade-aumentada-e-virtual': {
    pitch:
      'Experiências imersivas para formação, vendas e manutenção no terreno, em óculos, tablets e telemóveis.',
    note: 'AR · VR · 3D',
    layers: [
      ['Óculos', 'Tablets', 'Telemóveis'],
      ['Unity', 'Unreal'],
      ['Modelos 3D'],
      ['ERP', 'Manuais'],
      ['Distribuição', 'Suporte'],
    ],
    offerings: [
      o(
        'Formação imersiva',
        'Formar pessoas em equipamentos reais é caro e arriscado.',
        'Simulações em realidade virtual para treinar procedimentos sem riscos.',
        ['VR', 'Simulação'],
      ),
      o(
        'Apoio à manutenção',
        'Os técnicos no terreno dependem de manuais em papel.',
        'Instruções em realidade aumentada sobre o próprio equipamento.',
        ['AR', 'Terreno'],
      ),
      o(
        'Vendas e configuradores',
        'Os clientes não conseguem imaginar o produto.',
        'Configuradores 3D e visualização do produto no espaço do cliente.',
        ['3D', 'Configurador'],
      ),
      o(
        'Assistência remota',
        'Cada avaria obriga a deslocar um especialista.',
        'Chamadas com anotações em AR para orientar o técnico à distância.',
        ['Remoto', 'Anotações'],
      ),
      o(
        'Gémeos digitais',
        'Não há uma visão viva das instalações.',
        'Modelos 3D das instalações ligados a dados de sensores.',
        ['Gémeo digital', 'IoT'],
      ),
      o(
        'Prova de conceito',
        'Não sabe se a tecnologia serve o seu caso.',
        'Prova de conceito curta, testada com utilizadores reais.',
        ['PoC', 'Testes'],
      ),
    ],
    stackIds: ['ios-swift', 'android-kotlin', 'dotnet', 'azure'],
    tools: [
      ['Motores', ['Unity', 'Unreal Engine']],
      ['Plataformas', ['Apple Vision Pro', 'Meta Quest', 'ARKit', 'ARCore']],
      ['3D', ['Blender', 'glTF']],
      ['Serviços', ['Azure', 'Firebase']],
    ],
    skills: ['Unity', 'C#', 'ARKit', 'ARCore', '3D'],
    faq: [
      {
        q: 'Que dispositivos suportam?',
        a: 'Óculos como Meta Quest e Apple Vision Pro, e tablets e telemóveis iOS e Android.',
      },
    ],
    related: ['iot', 'aplicacoes-mobile', 'ux-ui-design'],
  },

  blockchain: {
    pitch:
      'Registos partilhados e contratos inteligentes onde a rastreabilidade e a confiança entre partes são críticas.',
    note: 'Contratos inteligentes · Rastreabilidade',
    layers: [
      ['Carteiras', 'Portais'],
      ['Ethereum', 'Hyperledger'],
      ['Eventos', 'Indexação'],
      ['ERP', 'APIs'],
      ['Auditoria', 'Monitorização'],
    ],
    offerings: [
      o(
        'Rastreabilidade',
        'Não consegue provar a origem e o percurso de um produto.',
        'Registos partilhados ao longo da cadeia de fornecimento.',
        ['Cadeia de valor', 'Origem'],
      ),
      o(
        'Contratos inteligentes',
        'Acordos entre partes dependem de verificações manuais.',
        'Contratos inteligentes testados e auditados, com regras claras.',
        ['Solidity', 'Auditoria'],
      ),
      o(
        'Tokenização',
        'Ativos e direitos são difíceis de transferir e verificar.',
        'Representação digital de ativos com controlo de acesso e conformidade.',
        ['Tokens', 'Conformidade'],
      ),
      o(
        'Certificados verificáveis',
        'Documentos e certificados podem ser falsificados.',
        'Emissão de certificados verificáveis por qualquer pessoa.',
        ['Credenciais', 'Verificação'],
      ),
      o(
        'Integração com sistemas',
        'O blockchain fica isolado do resto da empresa.',
        'Integração com ERP e APIs para que os dados fluam nos dois sentidos.',
        ['APIs', 'ERP'],
      ),
      o(
        'Avaliação de viabilidade',
        'Não sabe se precisa mesmo de blockchain.',
        'Análise honesta: muitas vezes uma base de dados chega, e dizemos isso com franqueza.',
        ['Viabilidade', 'Arquitetura'],
      ),
    ],
    stackIds: ['nodejs', 'go', 'typescript', 'postgresql', 'aws'],
    tools: [
      ['Redes', ['Ethereum', 'Polygon', 'Hyperledger Fabric']],
      ['Desenvolvimento', ['Solidity', 'Hardhat', 'Foundry']],
      ['Integração', ['Node.js', 'Go', 'The Graph']],
      ['Segurança', ['Slither', 'Auditorias externas']],
    ],
    skills: ['Solidity', 'Node.js', 'Go', 'Segurança'],
    faq: [
      {
        q: 'Precisamos mesmo de blockchain?',
        a: 'Só quando várias partes que não confiam entre si partilham registos. Nos outros casos recomendamos uma solução mais simples.',
      },
    ],
    related: ['aplicacoes-enterprise', 'iot', 'aplicacoes-cloud'],
  },

  iot: {
    pitch:
      'Sensores, equipamentos e plataformas ligados para monitorizar operações em tempo real e agir antes da falha.',
    note: 'Sensores · Edge · Tempo real',
    layers: [
      ['Sensores', 'Equipamentos'],
      ['Gateways', 'Edge'],
      ['Kafka', 'Séries temporais'],
      ['ERP', 'Manutenção'],
      ['Painéis', 'Alertas'],
    ],
    offerings: [
      o(
        'Monitorização de operações',
        'Só sabe que um equipamento parou quando a produção para.',
        'Sensores e painéis em tempo real com alertas configuráveis.',
        ['Tempo real', 'Alertas'],
      ),
      o(
        'Manutenção preditiva',
        'As avarias acontecem sempre na pior altura.',
        'Modelos que preveem falhas a partir dos dados dos equipamentos.',
        ['Preditivo', 'Machine learning'],
      ),
      o(
        'Plataformas IoT',
        'Cada fornecedor de equipamentos tem o seu sistema.',
        'Uma plataforma única que recolhe dados de equipamentos diferentes.',
        ['MQTT', 'Plataforma'],
      ),
      o(
        'Edge computing',
        'A ligação à internet nas instalações é instável.',
        'Processamento local nos gateways, com sincronização quando há rede.',
        ['Edge', 'Offline'],
      ),
      o(
        'Firmware e dispositivos',
        'Os dispositivos são difíceis de atualizar e proteger.',
        'Firmware, atualizações remotas e segurança dos dispositivos.',
        ['Firmware', 'OTA'],
      ),
      o(
        'Dados para decisão',
        'Os dados dos sensores ficam guardados e ninguém os usa.',
        'Pipelines de dados e painéis que ligam a operação ao negócio.',
        ['Power BI', 'Dados'],
      ),
    ],
    stackIds: ['kafka', 'aws', 'azure', 'python', 'go', 'power-bi'],
    tools: [
      ['Protocolos', ['MQTT', 'OPC UA', 'Modbus']],
      ['Cloud IoT', ['AWS IoT Core', 'Azure IoT Hub']],
      ['Dados', ['Kafka', 'InfluxDB', 'TimescaleDB']],
      ['Visualização', ['Grafana', 'Power BI']],
    ],
    skills: ['MQTT', 'Python', 'Kafka', 'AWS IoT', 'C'],
    faq: [
      {
        q: 'Trabalham com equipamentos que já temos?',
        a: 'Sim. Ligamos equipamentos existentes através de gateways e protocolos industriais.',
      },
    ],
    related: ['desenvolvimento-ia-ml', 'aplicacoes-cloud', 'realidade-aumentada-e-virtual'],
  },

  // ---------- Cloud e DevOps ----------
  'devops-e-devsecops': {
    pitch:
      'Pipelines, infraestrutura como código e segurança integrada no ciclo de entrega, para lançar mais vezes com menos risco.',
    note: 'DevOps · DevSecOps · IaC',
    layers: [
      ['Git', 'Revisões'],
      ['GitHub Actions', 'GitLab CI'],
      ['Terraform', 'Kubernetes'],
      ['SAST', 'Segredos'],
      ['Grafana', 'Alertas'],
    ],
    offerings: [
      o(
        'Infraestrutura como código',
        'Os ambientes são configurados à mão e ninguém sabe como.',
        'Toda a infraestrutura em Terraform, revista e versionada como o código.',
        ['Terraform', 'Ambientes'],
      ),
      o(
        'Segurança no pipeline',
        'As vulnerabilidades só aparecem em produção.',
        'Análise de código, dependências e segredos em cada alteração.',
        ['SAST', 'SCA'],
      ),
      o(
        'Plataforma para equipas',
        'Cada equipa reinventa a forma de fazer deploy.',
        'Uma plataforma interna com modelos prontos para as equipas lançarem sozinhas.',
        ['Platform engineering', 'Modelos'],
      ),
      o(
        'Kubernetes em produção',
        'O cluster é frágil e ninguém quer mexer nele.',
        'Clusters geridos, atualizados e com recuperação testada.',
        ['Kubernetes', 'Helm'],
      ),
      o(
        'Observabilidade e incidentes',
        'Os incidentes demoram horas a ser percebidos.',
        'Monitorização, alertas e processo de resposta a incidentes.',
        ['Grafana', 'On-call'],
      ),
      o(
        'Conformidade',
        'As auditorias pedem provas que não tem.',
        'Controlo de acessos, registos e evidências para ISO 27001 e NIS2.',
        ['ISO 27001', 'NIS2'],
      ),
    ],
    stackIds: ['terraform', 'kubernetes', 'docker', 'aws', 'azure', 'google-cloud'],
    tools: [
      ['CI/CD', ['GitHub Actions', 'GitLab CI', 'Azure DevOps', 'Argo CD']],
      ['Infraestrutura', ['Terraform', 'Helm', 'Ansible']],
      ['Segurança', ['SonarQube', 'Snyk', 'Trivy', 'Vault']],
      ['Observabilidade', ['Prometheus', 'Grafana', 'Datadog']],
    ],
    skills: ['Terraform', 'Kubernetes', 'CI/CD', 'AWS', 'Segurança'],
    faq: [
      {
        q: 'Qual a diferença entre DevOps e DevSecOps?',
        a: 'DevSecOps é DevOps com a segurança integrada em cada passo do pipeline, em vez de uma verificação no fim.',
      },
    ],
    related: ['pipelines-ci-cd', 'migracao-para-cloud', 'testes-de-seguranca'],
  },

  'migracao-para-cloud': {
    pitch:
      'Migração para AWS, Azure ou Google Cloud por fases, com o mínimo de interrupção e custos previstos à partida.',
    note: 'AWS · Azure · Google Cloud',
    layers: [
      ['Inventário', 'Dependências'],
      ['Plano por ondas'],
      ['Rehost', 'Replatform'],
      ['Segurança', 'Rede'],
      ['Operação', 'Custos'],
    ],
    offerings: [
      o(
        'Avaliação e plano',
        'Não sabe quanto vai custar nem por onde começar.',
        'Inventário das aplicações, dependências e custos, com plano por ondas.',
        ['Inventário', 'TCO'],
      ),
      o(
        'Migração de aplicações',
        'As aplicações críticas não podem parar.',
        'Migração por fases, com testes e plano de recuo em cada passo.',
        ['Rehost', 'Replatform'],
      ),
      o(
        'Migração de dados',
        'Bases de dados grandes e antigas assustam a equipa.',
        'Migração de dados com sincronização e validação antes da passagem.',
        ['Dados', 'Validação'],
      ),
      o(
        'Landing zone',
        'A conta cloud cresce sem regras.',
        'Contas, redes, identidades e políticas organizadas desde o início.',
        ['Landing zone', 'Governação'],
      ),
      o(
        'Modernização na cloud',
        'Mudar de servidor não resolve os problemas da aplicação.',
        'Serviços geridos, contentores e serverless onde trazem ganho real.',
        ['Serviços geridos', 'Contentores'],
      ),
      o(
        'Operação e custos',
        'Depois da migração, ninguém acompanha a fatura.',
        'Operação contínua, otimização de custos e relatórios mensais.',
        ['FinOps', 'Operação'],
      ),
    ],
    stackIds: ['aws', 'azure', 'google-cloud', 'terraform', 'kubernetes', 'sql-server'],
    tools: [
      ['Cloud', ['AWS', 'Azure', 'Google Cloud']],
      ['Migração', ['AWS MGN', 'Azure Migrate', 'Database Migration Service']],
      ['Infraestrutura', ['Terraform', 'Kubernetes']],
      ['Custos', ['AWS Cost Explorer', 'Azure Cost Management']],
    ],
    skills: ['AWS', 'Azure', 'Terraform', 'Redes', 'Bases de dados'],
    faq: [
      {
        q: 'Quanto tempo demora uma migração?',
        a: 'Depende do número de aplicações e das dependências. O plano por ondas, feito na avaliação, define as datas de cada fase.',
      },
    ],
    related: ['modernizacao-de-sistemas', 'devops-e-devsecops', 'aplicacoes-cloud'],
  },

  'modernizacao-de-sistemas': {
    pitch:
      'Sistemas legados reescritos ou decompostos por fases, sem parar o negócio e sem um big bang arriscado.',
    note: 'Legado · Migração por fases',
    layers: [
      ['Análise do legado'],
      ['Nova interface'],
      ['APIs', 'Microsserviços'],
      ['Testes de regressão'],
      ['Cloud', 'CI/CD'],
    ],
    offerings: [
      o(
        'Avaliação do legado',
        'Ninguém sabe ao certo o que o sistema antigo faz.',
        'Mapeamos código, dados e regras de negócio e propomos o caminho.',
        ['Análise', 'Roadmap'],
      ),
      o(
        'Modernização por fases',
        'Reescrever tudo de uma vez é demasiado arriscado.',
        'Substituição gradual, módulo a módulo, com o sistema antigo a funcionar.',
        ['Strangler fig', 'Fases'],
      ),
      o(
        'Migração de linguagem',
        'O sistema está numa tecnologia sem programadores no mercado.',
        'Migração para Java, .NET ou Node.js modernos, com testes de equivalência.',
        ['COBOL', '.NET', 'Java'],
      ),
      o(
        'APIs sobre o legado',
        'Os sistemas novos não conseguem falar com o antigo.',
        'APIs que expõem o legado de forma segura enquanto é modernizado.',
        ['APIs', 'Integração'],
      ),
      o(
        'Testes de regressão',
        'Cada mudança no legado parte alguma coisa.',
        'Rede de testes automáticos antes de mexer no código.',
        ['Regressão', 'Automação'],
      ),
      o(
        'Modernização com IA',
        'Documentar e migrar código antigo leva meses.',
        'Assistentes de IA para ler, documentar e converter código, com revisão sénior.',
        ['IA', 'Documentação'],
      ),
    ],
    stackIds: ['java', 'dotnet', 'nodejs', 'oracle', 'sql-server', 'kubernetes'],
    tools: [
      ['Destino', ['Java', 'Spring Boot', '.NET', 'Node.js']],
      ['Dados', ['Oracle', 'SQL Server', 'PostgreSQL']],
      ['Qualidade', ['Testes de regressão', 'SonarQube']],
      ['Entrega', ['Docker', 'Kubernetes', 'CI/CD']],
    ],
    skills: ['Java', '.NET', 'Arquitetura', 'SQL', 'Testes'],
    faq: [
      {
        q: 'É possível modernizar sem parar o sistema?',
        a: 'Sim. Substituímos por partes, com o sistema antigo e o novo a funcionar lado a lado até à passagem final.',
      },
    ],
    related: ['migracao-para-cloud', 'aplicacoes-enterprise', 'automacao-de-testes'],
  },

  'pipelines-ci-cd': {
    pitch:
      'Integração e entrega contínuas, com testes automáticos em cada alteração e lançamentos sem sustos.',
    note: 'CI/CD · Testes · Deploy',
    layers: [
      ['Git', 'Pull requests'],
      ['Build', 'Testes'],
      ['Artefactos'],
      ['Deploy', 'Rollback'],
      ['Métricas DORA'],
    ],
    offerings: [
      o(
        'Pipelines de integração',
        'Os erros só são descobertos dias depois.',
        'Build e testes automáticos em cada pull request.',
        ['CI', 'Pull requests'],
      ),
      o(
        'Entrega contínua',
        'Lançar uma versão é um evento que ocupa a equipa.',
        'Deploys automáticos por ambiente, com aprovação onde é preciso.',
        ['CD', 'Ambientes'],
      ),
      o(
        'Testes no pipeline',
        'Os testes existem mas ninguém os corre.',
        'Testes unitários, de integração e end-to-end ligados ao pipeline.',
        ['Playwright', 'Testes'],
      ),
      o(
        'Lançamentos seguros',
        'Um erro em produção afeta todos os clientes.',
        'Canary, feature flags e rollback automático.',
        ['Canary', 'Feature flags'],
      ),
      o(
        'Pipelines mais rápidos',
        'O pipeline demora tanto que a equipa o evita.',
        'Cache, paralelização e testes seletivos para respostas em minutos.',
        ['Cache', 'Paralelização'],
      ),
      o(
        'Métricas de entrega',
        'Não sabe se a equipa entrega mais depressa ou mais devagar.',
        'Métricas DORA: frequência, tempo de entrega, falhas e recuperação.',
        ['DORA', 'Métricas'],
      ),
    ],
    stackIds: ['docker', 'kubernetes', 'terraform', 'playwright', 'aws', 'azure'],
    tools: [
      ['CI/CD', ['GitHub Actions', 'GitLab CI', 'Jenkins', 'Azure DevOps']],
      ['Deploy', ['Argo CD', 'Helm', 'Flux']],
      ['Qualidade', ['Playwright', 'SonarQube', 'Snyk']],
      ['Lançamentos', ['LaunchDarkly', 'Unleash']],
    ],
    skills: ['GitHub Actions', 'Docker', 'Kubernetes', 'Testes', 'Bash'],
    faq: [
      {
        q: 'Usam a ferramenta de CI que já temos?',
        a: 'Sim. Trabalhamos com GitHub Actions, GitLab CI, Jenkins ou Azure DevOps e só recomendamos mudar quando compensa.',
      },
    ],
    caseIds: ['linde'],
    related: ['devops-e-devsecops', 'automacao-de-testes', 'testes-de-performance'],
  },

  // ---------- Qualidade e testes ----------
  'automacao-de-testes': {
    pitch:
      'Suites automáticas que crescem com o produto, correm em cada alteração e cortam o tempo de regressão.',
    note: 'Web · Mobile · APIs',
    layers: [
      ['Pirâmide de testes'],
      ['E2E', 'API', 'Unitários'],
      ['Playwright', 'Cypress', 'Selenium'],
      ['CI/CD', 'Paralelo'],
      ['Relatórios', 'Allure'],
    ],
    offerings: [
      o(
        'Automação web',
        'A regressão manual demora dias antes de cada lançamento.',
        'Testes end-to-end estáveis em Playwright, Cypress ou Selenium.',
        ['Playwright', 'Cypress'],
      ),
      o(
        'Automação mobile',
        'As apps são testadas à mão em poucos dispositivos.',
        'Testes automáticos em dispositivos reais e emuladores com Appium.',
        ['Appium', 'Dispositivos'],
      ),
      o(
        'Testes de API',
        'As integrações falham sem que ninguém perceba.',
        'Testes de API e de contrato em cada alteração.',
        ['Postman', 'REST Assured'],
      ),
      o(
        'Framework de testes',
        'Os testes existentes são frágeis e ninguém confia neles.',
        'Framework organizado, com padrões, dados de teste e relatórios claros.',
        ['Page Objects', 'Dados de teste'],
      ),
      o(
        'Testes no pipeline',
        'Os testes não correm automaticamente.',
        'Execução paralela no CI/CD, com resultados em minutos.',
        ['CI/CD', 'Paralelo'],
      ),
      o(
        'Testes com IA',
        'Escrever e manter testes consome demasiado tempo.',
        'Geração e manutenção de testes assistidas por IA, revistas por engenheiros.',
        ['IA', 'Manutenção'],
      ),
    ],
    stackIds: ['playwright', 'cypress', 'selenium', 'appium', 'postman'],
    tools: [
      ['Web', ['Playwright', 'Cypress', 'Selenium']],
      ['Mobile', ['Appium', 'XCUITest', 'Espresso']],
      ['API', ['Postman', 'REST Assured', 'Pact']],
      ['Execução', ['GitHub Actions', 'BrowserStack', 'Allure']],
    ],
    skills: ['Playwright', 'Cypress', 'TypeScript', 'Appium', 'CI/CD'],
    faq: [
      {
        q: 'Playwright, Cypress ou Selenium?',
        a: 'Para projetos novos recomendamos geralmente Playwright. Se já tem uma suite em Cypress ou Selenium, melhoramos o que existe antes de pensar em migrar.',
      },
    ],
    caseIds: ['clever', 'linde'],
    related: ['testes-de-performance', 'testes-manuais', 'pipelines-ci-cd'],
  },

  'testes-de-performance': {
    pitch:
      'Testes de carga e stress que mostram os limites do sistema antes dos utilizadores, com gargalos identificados.',
    note: 'Carga · Stress · Escalabilidade',
    layers: [
      ['Cenários', 'Volumes'],
      ['Carga', 'Stress', 'Picos'],
      ['JMeter', 'k6'],
      ['Ambientes', 'CI'],
      ['Gargalos', 'Recomendações'],
    ],
    offerings: [
      o(
        'Testes de carga',
        'Não sabe quantos utilizadores o sistema aguenta.',
        'Simulamos o volume esperado e medimos tempos de resposta e erros.',
        ['Carga', 'Tempos de resposta'],
      ),
      o(
        'Testes de stress e picos',
        'Campanhas e datas especiais derrubam o sistema.',
        'Levamos o sistema ao limite para saber onde e como falha.',
        ['Stress', 'Picos'],
      ),
      o(
        'Diagnóstico de gargalos',
        'O sistema está lento e ninguém sabe porquê.',
        'Análise da aplicação, base de dados e infraestrutura com recomendações.',
        ['APM', 'Base de dados'],
      ),
      o(
        'Performance no pipeline',
        'A performance piora a cada lançamento sem ninguém notar.',
        'Testes de performance automáticos no CI, com limites que bloqueiam regressões.',
        ['k6', 'CI/CD'],
      ),
      o(
        'Performance de front-end',
        'As páginas demoram a carregar no telemóvel.',
        'Medição de Core Web Vitals e correções no carregamento.',
        ['Lighthouse', 'Web Vitals'],
      ),
      o(
        'Planeamento de capacidade',
        'Não sabe que infraestrutura vai precisar para crescer.',
        'Projeções de capacidade e custos a partir dos testes.',
        ['Capacidade', 'Custos'],
      ),
    ],
    stackIds: ['jmeter', 'playwright', 'aws', 'kubernetes'],
    tools: [
      ['Carga', ['JMeter', 'k6', 'Gatling', 'Locust']],
      ['Observação', ['Grafana', 'Datadog', 'New Relic']],
      ['Front-end', ['Lighthouse', 'WebPageTest']],
      ['Execução', ['Azure Load Testing', 'GitHub Actions']],
    ],
    skills: ['JMeter', 'k6', 'Grafana', 'SQL', 'Linux'],
    faq: [
      {
        q: 'Testam em produção?',
        a: 'Preferimos um ambiente igual ao de produção. Quando não existe, combinamos consigo janelas e limites seguros.',
      },
    ],
    related: ['automacao-de-testes', 'aplicacoes-cloud', 'pipelines-ci-cd'],
  },

  'testes-de-seguranca': {
    pitch:
      'Análise de vulnerabilidades e testes de intrusão antes de cada lançamento, com correções priorizadas.',
    note: 'Pentest · OWASP · Conformidade',
    layers: [
      ['Âmbito', 'Riscos'],
      ['Web', 'APIs', 'Mobile'],
      ['Burp Suite', 'OWASP ZAP'],
      ['Pipeline', 'Dependências'],
      ['Relatório', 'Correções'],
    ],
    offerings: [
      o(
        'Testes de intrusão',
        'Não sabe se a aplicação resiste a um ataque.',
        'Testes de intrusão em aplicações web, APIs e mobile, com relatório priorizado.',
        ['Pentest', 'OWASP'],
      ),
      o(
        'Análise de vulnerabilidades',
        'Bibliotecas e servidores desatualizados passam despercebidos.',
        'Análise automática e manual de código, dependências e infraestrutura.',
        ['SAST', 'DAST'],
      ),
      o(
        'Segurança no pipeline',
        'A segurança só é verificada no fim do projeto.',
        'Verificações automáticas em cada alteração, antes de chegar a produção.',
        ['DevSecOps', 'CI/CD'],
      ),
      o(
        'Segurança de APIs',
        'As APIs expõem mais dados do que deviam.',
        'Testes de autenticação, autorização e exposição de dados nas APIs.',
        ['APIs', 'OWASP API'],
      ),
      o(
        'Apoio à correção',
        'O relatório chega e ninguém sabe por onde começar.',
        'Acompanhamos a equipa na correção e voltamos a testar.',
        ['Correção', 'Reteste'],
      ),
      o(
        'Conformidade',
        'Auditorias e clientes pedem provas de segurança.',
        'Evidências para ISO 27001, NIS2 e RGPD.',
        ['ISO 27001', 'NIS2'],
      ),
    ],
    stackIds: ['postman', 'kubernetes', 'aws', 'azure'],
    tools: [
      ['Testes', ['Burp Suite', 'OWASP ZAP', 'Nmap']],
      ['Código', ['SonarQube', 'Semgrep', 'Snyk']],
      ['Infraestrutura', ['Trivy', 'Prowler', 'Defender for Cloud']],
      ['Referências', ['OWASP Top 10', 'OWASP ASVS']],
    ],
    skills: ['OWASP', 'Burp Suite', 'APIs', 'Cloud', 'Redes'],
    faq: [
      {
        q: 'Com que frequência devemos fazer testes de intrusão?',
        a: 'Pelo menos uma vez por ano e antes de lançamentos importantes. As verificações automáticas correm em cada alteração.',
      },
    ],
    related: ['devops-e-devsecops', 'automacao-de-testes', 'testes-manuais'],
  },

  'testes-manuais': {
    pitch:
      'Testes exploratórios e de aceitação onde a automação não chega, feitos por analistas que conhecem o negócio.',
    note: 'Exploratórios · Aceitação · Acessibilidade',
    layers: [
      ['Plano de testes'],
      ['Exploratórios', 'Aceitação'],
      ['Jira', 'Xray'],
      ['Dispositivos reais'],
      ['Relatórios', 'Defeitos'],
    ],
    offerings: [
      o(
        'Testes exploratórios',
        'Os erros mais estranhos só aparecem com utilizadores reais.',
        'Analistas que exploram a aplicação como um utilizador e encontram o inesperado.',
        ['Exploratórios', 'Sessões'],
      ),
      o(
        'Testes de aceitação',
        'O negócio não tem tempo para validar cada entrega.',
        'Testes de aceitação com base nos requisitos, com evidências.',
        ['UAT', 'Requisitos'],
      ),
      o(
        'Fábrica de testes',
        'Picos de testes antes dos lançamentos sobrecarregam a equipa.',
        'Uma equipa de testes que escala com os lançamentos, manual e automática.',
        ['Escala', 'Lançamentos'],
      ),
      o(
        'Testes de acessibilidade',
        'A aplicação não cumpre as regras de acessibilidade.',
        'Verificação WCAG 2.2 com leitores de ecrã e teclado.',
        ['WCAG 2.2', 'Leitores de ecrã'],
      ),
      o(
        'Testes em dispositivos',
        'A app funciona num telemóvel e falha noutro.',
        'Testes em dispositivos e browsers reais, com a matriz dos seus clientes.',
        ['Dispositivos', 'Browsers'],
      ),
      o(
        'Casos de teste e documentação',
        'Não há registo do que foi testado.',
        'Casos de teste organizados, rastreáveis até aos requisitos.',
        ['Xray', 'Rastreabilidade'],
      ),
    ],
    stackIds: ['playwright', 'appium', 'postman'],
    tools: [
      ['Gestão', ['Jira', 'Xray', 'TestRail', 'Zephyr']],
      ['Dispositivos', ['BrowserStack', 'Sauce Labs']],
      ['Acessibilidade', ['axe', 'NVDA', 'VoiceOver']],
      ['Apoio', ['Postman', 'Charles Proxy']],
    ],
    skills: ['Testes exploratórios', 'Jira', 'Xray', 'Acessibilidade'],
    faq: [
      {
        q: 'Quando faz sentido testar manualmente?',
        a: 'Em funcionalidades novas, fluxos que mudam muito, usabilidade e acessibilidade. O que se repete deve ser automatizado.',
      },
    ],
    related: ['automacao-de-testes', 'testes-de-performance', 'ux-ui-design'],
  },

  // ---------- Design de produto ----------
  'ux-ui-design': {
    pitch:
      'Investigação, fluxos, protótipos e design system prontos para desenvolvimento, testados com utilizadores reais.',
    note: 'UX · UI · Design system',
    layers: [
      ['Entrevistas', 'Dados'],
      ['Jornadas', 'Fluxos'],
      ['Figma', 'Protótipos'],
      ['Design system'],
      ['Handoff', 'Acompanhamento'],
    ],
    offerings: [
      o(
        'Investigação com utilizadores',
        'O produto é desenhado a partir de suposições.',
        'Entrevistas, análise de dados e testes que mostram o que os utilizadores precisam.',
        ['Entrevistas', 'Dados'],
      ),
      o(
        'Fluxos e arquitetura de informação',
        'Os utilizadores desistem a meio do processo.',
        'Jornadas e fluxos simplificados, validados antes do desenho final.',
        ['Jornadas', 'Fluxos'],
      ),
      o(
        'Prototipagem',
        'As ideias só são testadas depois de desenvolvidas.',
        'Protótipos interativos em Figma testados com utilizadores.',
        ['Figma', 'Protótipos'],
      ),
      o(
        'Design system',
        'Cada ecrã tem botões e cores diferentes.',
        'Componentes reutilizáveis em Figma e código, com regras de uso.',
        ['Componentes', 'Tokens'],
      ),
      o(
        'Acessibilidade',
        'Parte dos utilizadores não consegue usar o produto.',
        'Desenho acessível desde o início, alinhado com a WCAG 2.2.',
        ['WCAG 2.2', 'Contraste'],
      ),
      o(
        'Acompanhamento do desenvolvimento',
        'O produto final não se parece com o desenho.',
        'Designers ao lado da equipa de desenvolvimento até ao lançamento.',
        ['Handoff', 'Revisão'],
      ),
    ],
    stackIds: ['react', 'typescript', 'nextjs'],
    tools: [
      ['Desenho', ['Figma', 'FigJam']],
      ['Investigação', ['Maze', 'Hotjar', 'Google Analytics']],
      ['Sistema', ['Storybook', 'Tokens Studio']],
      ['Acessibilidade', ['Stark', 'axe']],
    ],
    skills: ['Figma', 'Investigação', 'Prototipagem', 'Design system', 'Acessibilidade'],
    faq: [
      {
        q: 'Podem trabalhar só no design, com a nossa equipa a desenvolver?',
        a: 'Sim. Entregamos o design pronto para desenvolvimento e acompanhamos a sua equipa na implementação.',
      },
    ],
    related: ['web-design', 'aplicacoes-web', 'aplicacoes-mobile'],
  },

  'web-design': {
    pitch:
      'Sites institucionais e landing pages pensados para converter visitas em contactos, rápidos e fáceis de atualizar.',
    note: 'Sites · Landing pages · SEO',
    layers: [
      ['Objetivos', 'Público'],
      ['Estrutura', 'Conteúdo'],
      ['Figma', 'Next.js'],
      ['CMS'],
      ['SEO', 'Analytics'],
    ],
    offerings: [
      o(
        'Sites institucionais',
        'O site atual não explica o que a empresa faz.',
        'Estrutura, mensagens e desenho que levam o visitante ao contacto.',
        ['Estrutura', 'Mensagens'],
      ),
      o(
        'Landing pages',
        'As campanhas levam tráfego para páginas que não convertem.',
        'Páginas de campanha rápidas, com testes A/B e medição.',
        ['Conversão', 'A/B'],
      ),
      o(
        'SEO técnico',
        'O site não aparece na pesquisa do Google.',
        'Estrutura, velocidade e dados estruturados preparados para a pesquisa.',
        ['SEO', 'Dados estruturados'],
      ),
      o(
        'Gestão de conteúdos',
        'Cada alteração ao site depende de um programador.',
        'CMS para a equipa de marketing publicar sozinha.',
        ['CMS', 'Autonomia'],
      ),
      o(
        'Performance e acessibilidade',
        'O site é lento e difícil de usar no telemóvel.',
        'Core Web Vitals no verde e acessibilidade WCAG 2.2.',
        ['Core Web Vitals', 'WCAG'],
      ),
      o(
        'Sites multilingues',
        'O site não acompanha a expansão para outros mercados.',
        'Versões por idioma e mercado, com URLs e SEO próprios.',
        ['Multilingue', 'hreflang'],
      ),
    ],
    stackIds: ['nextjs', 'react', 'typescript'],
    tools: [
      ['Desenho', ['Figma', 'FigJam']],
      ['Construção', ['Next.js', 'Tailwind CSS', 'Webflow']],
      ['Conteúdo', ['Sanity', 'Storyblok', 'WordPress']],
      ['Medição', ['Google Analytics 4', 'Search Console', 'Hotjar']],
    ],
    skills: ['Figma', 'Next.js', 'SEO', 'CMS', 'Copywriting'],
    faq: [
      {
        q: 'Que CMS recomendam?',
        a: 'Depende da equipa que vai publicar. Usamos Sanity ou Storyblok em sites à medida e WordPress quando a equipa já o conhece.',
      },
    ],
    related: ['ux-ui-design', 'aplicacoes-web', 'testes-manuais'],
  },

  // ---------- Recrutamento tech ----------
  'developers-e-engenharia': {
    pitch:
      'Recrutamento de developers front-end, back-end, mobile e full-stack, de júnior a arquiteto, avaliados por engenheiros.',
    note: 'Contratação permanente',
    layers: [
      ['Front-end', 'Back-end', 'Mobile'],
      ['Java', '.NET', 'React'],
      ['Entrevista técnica'],
      ['Portugal', 'Brasil', 'EUA'],
      ['Onboarding'],
    ],
    offerings: [
      o(
        'Front-end',
        'Não encontra developers front-end com experiência real.',
        'Perfis React, Angular e Vue avaliados em exercícios práticos.',
        ['React', 'Angular'],
      ),
      o(
        'Back-end',
        'As vagas de back-end ficam meses abertas.',
        'Perfis Java, .NET, Node.js, Python e Go, com avaliação técnica.',
        ['Java', '.NET'],
      ),
      o(
        'Mobile',
        'Perfis mobile seniores são raros no mercado.',
        'Developers iOS, Android, React Native e Flutter.',
        ['iOS', 'Android'],
      ),
      o(
        'Full-stack',
        'Precisa de alguém que faça de tudo numa equipa pequena.',
        'Perfis full-stack avaliados nas duas pontas.',
        ['Full-stack', 'TypeScript'],
      ),
      o(
        'Arquitetos',
        'Faltam pessoas para decidir a arquitetura dos sistemas.',
        'Arquitetos de software com experiência em sistemas críticos.',
        ['Arquitetura', 'Sénior'],
      ),
      o(
        'Contratação em volume',
        'Precisa de várias pessoas ao mesmo tempo.',
        'Processos em paralelo para várias vagas, com pontos de situação semanais.',
        ['Volume', 'Paralelo'],
      ),
    ],
    stackIds: ['java', 'dotnet', 'react', 'nodejs', 'python', 'react-native'],
    tools: [
      ['Front-end', ['React', 'Angular', 'Vue.js', 'TypeScript']],
      ['Back-end', ['Java', '.NET', 'Node.js', 'Python', 'Go']],
      ['Mobile', ['Swift', 'Kotlin', 'React Native', 'Flutter']],
    ],
    skills: ['Java', 'React', '.NET', 'Node.js', 'Python'],
    faq: [
      {
        q: 'Quanto tempo demora a shortlist?',
        a: '[Prazo médio até à shortlist a confirmar com a equipa de recrutamento.]',
      },
    ],
    related: ['recrutamento-dados-e-ia', 'recrutamento-cloud-devops-qa', 'liderancas-tecnologicas'],
  },

  'recrutamento-dados-e-ia': {
    pitch:
      'Recrutamento de engenheiros de dados, cientistas de dados e especialistas em machine learning e IA, avaliados tecnicamente.',
    note: 'Contratação permanente',
    layers: [
      ['Dados', 'IA', 'BI'],
      ['Python', 'SQL', 'Spark'],
      ['Entrevista técnica'],
      ['Portugal', 'Brasil', 'EUA'],
      ['Onboarding'],
    ],
    offerings: [
      o(
        'Engenheiros de dados',
        'Os pipelines de dados dependem de uma só pessoa.',
        'Perfis com Spark, Airflow, Databricks e cloud, avaliados em casos reais.',
        ['Spark', 'Airflow'],
      ),
      o(
        'Cientistas de dados',
        'Os modelos não saem dos notebooks.',
        'Cientistas de dados com experiência em produção e comunicação com o negócio.',
        ['Python', 'Estatística'],
      ),
      o(
        'Engenheiros de IA',
        'Precisa de quem leve modelos de linguagem para produção.',
        'Perfis com LLMs, RAG e agentes, avaliados em projetos práticos.',
        ['LLMs', 'RAG'],
      ),
      o(
        'Engenheiros de MLOps',
        'Os modelos não são monitorizados depois de lançados.',
        'Perfis que automatizam treino, deploy e monitorização.',
        ['MLflow', 'Kubernetes'],
      ),
      o(
        'Analistas e BI',
        'Os relatórios demoram dias a preparar.',
        'Analistas com Power BI, SQL e modelação de dados.',
        ['Power BI', 'SQL'],
      ),
      o(
        'Lideranças de dados',
        'Falta quem defina a estratégia de dados.',
        'Heads of data e data leads com experiência de equipa.',
        ['Liderança', 'Estratégia'],
      ),
    ],
    stackIds: ['python', 'spark', 'databricks', 'airflow', 'power-bi', 'pytorch'],
    tools: [
      ['Dados', ['Python', 'SQL', 'Spark', 'dbt', 'Airflow']],
      ['IA', ['PyTorch', 'LangChain', 'Hugging Face']],
      ['Plataformas', ['Databricks', 'Snowflake', 'BigQuery', 'Power BI']],
    ],
    skills: ['Python', 'SQL', 'Spark', 'Machine learning', 'Power BI'],
    faq: [
      {
        q: 'Como avaliam perfis de IA?',
        a: 'Com um caso prático e uma conversa técnica com um engenheiro de IA da Yellowipe, para separar experiência real de interesse no tema.',
      },
    ],
    related: ['developers-e-engenharia', 'liderancas-tecnologicas', 'desenvolvimento-ia-ml'],
  },

  'recrutamento-cloud-devops-qa': {
    pitch:
      'Recrutamento de perfis de infraestrutura, automação e qualidade de software, avaliados nas ferramentas que a sua equipa usa.',
    note: 'Contratação permanente',
    layers: [
      ['Cloud', 'DevOps', 'QA'],
      ['AWS', 'Kubernetes', 'Playwright'],
      ['Entrevista técnica'],
      ['Portugal', 'Brasil', 'EUA'],
      ['Onboarding'],
    ],
    offerings: [
      o(
        'Engenheiros cloud',
        'Faltam pessoas certificadas em AWS ou Azure.',
        'Perfis cloud avaliados em arquitetura, redes e custos.',
        ['AWS', 'Azure'],
      ),
      o(
        'Engenheiros DevOps',
        'O pipeline depende de quem o montou e já saiu.',
        'Perfis com Terraform, Kubernetes e CI/CD.',
        ['Terraform', 'Kubernetes'],
      ),
      o(
        'Engenheiros de plataforma e SRE',
        'Os mesmos incidentes voltam a acontecer em produção.',
        'Perfis SRE com observabilidade, on-call e automação.',
        ['SRE', 'Observabilidade'],
      ),
      o(
        'Engenheiros de QA automation',
        'Os testes automáticos não avançam.',
        'Perfis com Playwright, Cypress, Selenium e Appium.',
        ['Playwright', 'Cypress'],
      ),
      o(
        'Analistas de testes',
        'Faltam pessoas para testar antes dos lançamentos.',
        'Analistas de testes manuais e de aceitação.',
        ['Testes manuais', 'UAT'],
      ),
      o(
        'Segurança',
        'Precisa de perfis de segurança e não tem como avaliar esses perfis.',
        'Perfis DevSecOps e de segurança cloud.',
        ['DevSecOps', 'Segurança'],
      ),
    ],
    stackIds: ['aws', 'azure', 'kubernetes', 'terraform', 'playwright', 'selenium'],
    tools: [
      ['Cloud', ['AWS', 'Azure', 'Google Cloud']],
      ['DevOps', ['Terraform', 'Kubernetes', 'Docker', 'GitHub Actions']],
      ['QA', ['Playwright', 'Cypress', 'Selenium', 'Appium', 'JMeter']],
    ],
    skills: ['AWS', 'Kubernetes', 'Terraform', 'Playwright', 'Linux'],
    faq: [
      {
        q: 'Avaliam certificações?',
        a: 'Consideramos as certificações, mas avaliamos sobretudo a experiência prática em entrevista técnica.',
      },
    ],
    related: ['developers-e-engenharia', 'liderancas-tecnologicas', 'devops-e-devsecops'],
  },

  'liderancas-tecnologicas': {
    pitch:
      'Recrutamento de tech leads, engineering managers e CTOs com pesquisa direta e confidencial.',
    note: 'Pesquisa direta · Confidencial',
    layers: [
      ['Tech lead', 'EM', 'CTO'],
      ['Arquitetura', 'Pessoas'],
      ['Avaliação de liderança'],
      ['Portugal', 'Brasil', 'EUA'],
      ['Integração acompanhada'],
    ],
    offerings: [
      o(
        'Tech leads',
        'As equipas crescem sem uma referência técnica.',
        'Tech leads avaliados em arquitetura, código e liderança de equipas.',
        ['Tech lead', 'Arquitetura'],
      ),
      o(
        'Engineering managers',
        'Os gestores técnicos não chegam para o número de equipas.',
        'Engineering managers com experiência em pessoas e entrega.',
        ['Gestão', 'Entrega'],
      ),
      o(
        'CTOs e heads of engineering',
        'Precisa de quem lidere a tecnologia da empresa.',
        'Pesquisa direta e discreta de lideranças de topo.',
        ['CTO', 'Executivo'],
      ),
      o(
        'Pesquisa confidencial',
        'A vaga não pode ser anunciada.',
        'Processos confidenciais, com abordagem direta aos candidatos.',
        ['Confidencial', 'Abordagem direta'],
      ),
      o(
        'Avaliação de liderança',
        'É difícil avaliar liderança numa entrevista.',
        'Avaliação técnica e de liderança, com casos e referências.',
        ['Avaliação', 'Referências'],
      ),
      o(
        'Acompanhamento da integração',
        'As lideranças novas saem nos primeiros meses.',
        'Acompanhamos a integração nos primeiros meses.',
        ['Integração', 'Retenção'],
      ),
    ],
    stackIds: ['java', 'aws', 'kubernetes', 'react'],
    tools: [
      ['Liderança', ['Gestão de equipas', 'Contratação', 'OKRs']],
      ['Técnico', ['Arquitetura', 'Cloud', 'Segurança']],
      ['Entrega', ['Agile', 'Métricas DORA', 'Roadmaps']],
    ],
    skills: ['Liderança', 'Arquitetura', 'Gestão de equipas', 'Cloud'],
    faq: [
      {
        q: 'Como garantem a confidencialidade?',
        a: 'O nome da empresa só é partilhado com candidatos qualificados e com o seu acordo.',
      },
    ],
    related: ['developers-e-engenharia', 'recrutamento-dados-e-ia', 'recrutamento-cloud-devops-qa'],
  },
};
