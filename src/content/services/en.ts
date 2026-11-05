/**
 * Serviços em inglês americano: tradução de cada texto pt-PT usado nas páginas de
 * serviço (factos em ./pages.ts e textos da área em ./templates.ts), chave = texto pt-PT,
 * como um catálogo gettext. Nomes de tecnologias e termos iguais em inglês não entram.
 *
 * Mudou um texto pt-PT? A chave deixa de existir e tests/unit/services.test.ts falha
 * até a tradução ser atualizada aqui. O en-GB deriva do en (src/lib/i18n/british.ts).
 */
export const SERVICES_EN: Record<string, string> = {
  'Portais, plataformas SaaS e dashboards rápidos no browser, construídos sobre APIs e prontos a crescer.':
    'Portals, SaaS platforms and fast dashboards in the browser, built on APIs and ready to grow.',
  Descoberta: 'Discovery',
  'Plataformas SaaS': 'SaaS platforms',
  'O produto precisa de crescer e a base atual não aguenta.':
    "The product needs to grow and the current foundation can't keep up.",
  'Arquitetura multi-cliente, faturação, permissões e observabilidade desde o início.':
    'Multi-tenant architecture, billing, permissions and observability from the start.',
  'Portais de cliente': 'Customer portals',
  'Os clientes ainda resolvem por email o que podiam fazer sozinhos.':
    'Customers still handle by email what they could do on their own.',
  'Áreas de cliente seguras, integradas com o ERP e o CRM, com autenticação única.':
    'Secure customer areas, integrated with your ERP and CRM, with single sign-on.',
  Integrações: 'Integrations',
  'Dashboards e back-offices': 'Dashboards and back offices',
  'A operação vive em folhas de cálculo partilhadas.': 'Operations run on shared spreadsheets.',
  'Back-offices e painéis com dados em tempo real, permissões por perfil e exportação.':
    'Back offices and dashboards with real-time data, role-based permissions and export.',
  'Tempo real': 'Real time',
  'APIs e integrações': 'APIs and integrations',
  'Os sistemas não falam entre si e cada integração é feita à mão.':
    "Systems don't talk to each other and every integration is done by hand.",
  'APIs REST e GraphQL documentadas, com versões, limites e testes de contrato.':
    'Documented REST and GraphQL APIs, with versioning, rate limits and contract tests.',
  'Performance e Core Web Vitals': 'Performance and Core Web Vitals',
  'As páginas são lentas e perdem posições no Google.':
    'Pages are slow and lose rankings on Google.',
  'Medimos, corrigimos o carregamento e deixamos alertas para não voltar a piorar.':
    "We measure, fix loading and set up alerts so it doesn't get worse again.",
  'Modernização de front-end': 'Front-end modernization',
  'O front-end é antigo e cada alteração demora semanas.':
    'The front end is outdated and every change takes weeks.',
  'Migração por fases para React ou Angular modernos, sem parar o produto.':
    'Phased migration to modern React or Angular, without stopping the product.',
  Migração: 'Migration',
  Qualidade: 'Quality',
  Entrega: 'Delivery',
  'APIs REST': 'REST APIs',
  'Que tecnologia recomendam para uma aplicação web nova?':
    'Which technology do you recommend for a new web application?',
  'Na maioria dos casos React com Next.js e TypeScript, com back-end em Node.js ou .NET. Mas escolhemos com a sua equipa, a pensar em quem vai manter a aplicação.':
    'In most cases React with Next.js and TypeScript, with a Node.js or .NET back end. But we choose with your team, thinking about who will maintain the application.',
  'Apps iOS e Android, nativas ou multiplataforma, desenhadas para milhões de utilizadores e testadas desde o primeiro dia.':
    'Native or cross-platform iOS and Android apps, designed for millions of users and tested from day one.',
  'iOS · Android · Multiplataforma': 'iOS · Android · Cross-platform',
  'Apps nativas': 'Native apps',
  'A app precisa de tirar o máximo do dispositivo.':
    'The app needs to get the most out of the device.',
  'Apps em Swift e Kotlin, com acesso a câmara, sensores, pagamentos e notificações.':
    'Apps in Swift and Kotlin, with access to the camera, sensors, payments and notifications.',
  'Apps multiplataforma': 'Cross-platform apps',
  'Manter duas apps separadas custa o dobro.': 'Maintaining two separate apps costs twice as much.',
  'Uma base de código em React Native ou Flutter para iOS e Android.':
    'One codebase in React Native or Flutter for iOS and Android.',
  'Redesenho e modernização': 'Redesign and modernization',
  'A app atual é lenta ou falha nas atualizações.':
    'The current app is slow or breaks with updates.',
  'Revemos arquitetura, UX e performance e modernizamos por fases.':
    'We review architecture, UX and performance and modernize in phases.',
  'Back-end para mobile': 'Mobile back end',
  'A app depende de serviços frágeis ou lentos.': 'The app depends on fragile or slow services.',
  'APIs, autenticação, notificações e sincronização offline preparadas para escala.':
    'APIs, authentication, notifications and offline sync built for scale.',
  'Testes e publicação automática': 'Testing and automated release',
  'Cada lançamento depende de testes manuais.': 'Every release depends on manual testing.',
  'Testes automáticos em dispositivos reais e publicação automática nas lojas.':
    'Automated tests on real devices and automated publishing to the stores.',
  'Manutenção e evolução': 'Maintenance and evolution',
  'Ninguém acompanha a app depois do lançamento.': 'Nobody looks after the app after launch.',
  'Atualizações de sistema operativo, monitorização de erros e novas funcionalidades.':
    'Operating system updates, error monitoring and new features.',
  Nativo: 'Native',
  Multiplataforma: 'Cross-platform',
  Serviços: 'Services',
  'Qualidade e entrega': 'Quality and delivery',
  'Nativa ou multiplataforma?': 'Native or cross-platform?',
  'Depende do orçamento, da performance pedida e da equipa que vai manter a app. Recomendamos depois da descoberta.':
    'It depends on the budget, the performance required and the team that will maintain the app. We make a recommendation after discovery.',
  'Publicam nas lojas?': 'Do you publish to the stores?',
  'Sim, na conta da sua empresa na App Store e no Google Play.':
    "Yes, under your company's account on the App Store and Google Play.",
  'Sistemas internos integrados com o ERP e o CRM, que substituem folhas de cálculo e processos manuais.':
    'Internal systems integrated with your ERP and CRM that replace spreadsheets and manual processes.',
  'ERP · CRM · Processos': 'ERP · CRM · Processes',
  Processos: 'Processes',
  Regras: 'Rules',
  'Testes de regressão': 'Regression testing',
  'Sistemas à medida': 'Custom systems',
  'O processo crítico vive em folhas de cálculo e emails.':
    'A critical process lives in spreadsheets and email.',
  'Aplicações internas com regras de negócio, aprovações e auditoria.':
    'Internal applications with business rules, approvals and audit trails.',
  Auditoria: 'Audit',
  'Integração com ERP e CRM': 'ERP and CRM integration',
  'Os dados são copiados à mão entre sistemas.': 'Data is copied by hand between systems.',
  'Integrações com SAP, Salesforce e outros sistemas, com monitorização de falhas.':
    'Integrations with SAP, Salesforce and other systems, with failure monitoring.',
  'Portais internos': 'Internal portals',
  'Cada equipa tem a sua ferramenta e ninguém vê o todo.':
    'Every team has its own tool and nobody sees the whole picture.',
  'Portais com autenticação única, permissões por perfil e indicadores.':
    'Portals with single sign-on, role-based permissions and KPIs.',
  Permissões: 'Permissions',
  'Automação de processos': 'Process automation',
  'Tarefas repetitivas ocupam horas da equipa.':
    "Repetitive tasks take up hours of your team's time.",
  'Automatizamos aprovações, documentos e notificações, com registo de cada passo.':
    'We automate approvals, documents and notifications, with every step logged.',
  Automação: 'Automation',
  'Low-code empresarial': 'Enterprise low-code',
  'O negócio precisa de aplicações mais depressa do que a TI consegue entregar.':
    'The business needs applications faster than IT can deliver them.',
  'Aplicações em OutSystems ou Power Platform, com governação e boas práticas.':
    'Applications in OutSystems or Power Platform, with governance and best practices.',
  'Suporte e evolução': 'Support and evolution',
  'Os sistemas internos não têm dono técnico.': 'Internal systems have no technical owner.',
  'Equipa que mantém, corrige e evolui as aplicações com acordos de serviço.':
    'A team that maintains, fixes and evolves the applications under service-level agreements.',
  Manutenção: 'Maintenance',
  Plataformas: 'Platforms',
  Dados: 'Data',
  Integração: 'Integration',
  'Trabalham com sistemas antigos?': 'Do you work with legacy systems?',
  'Sim. Integramos com o que existe e modernizamos por fases, sem parar o negócio.':
    'Yes. We integrate with what exists and modernize in phases, without stopping the business.',
  'Aplicações cloud-native, preparadas para crescer sem reescrever a arquitetura e com custos sob controlo.':
    'Cloud-native applications, ready to grow without rewriting the architecture and with costs under control.',
  'Cloud-native · Microsserviços · Serverless': 'Cloud-native · Microservices · Serverless',
  Arquitetura: 'Architecture',
  Domínios: 'Domains',
  Microsserviços: 'Microservices',
  Testes: 'Testing',
  Observabilidade: 'Observability',
  'Arquitetura cloud-native': 'Cloud-native architecture',
  'A aplicação não aguenta picos de utilização.': "The application can't handle usage peaks.",
  'Desenho de arquitetura escalável, com serviços geridos e escalamento automático.':
    'Scalable architecture design, with managed services and autoscaling.',
  Escalabilidade: 'Scalability',
  'Serviços geridos': 'Managed services',
  'Um monólito obriga a lançar tudo de uma vez.':
    'A monolith forces you to release everything at once.',
  'Divisão por domínios, com serviços independentes, eventos e contratos claros.':
    'Split by domain, with independent services, events and clear contracts.',
  Eventos: 'Events',
  'Paga servidores ligados para cargas que só correm às vezes.':
    'You pay for servers that stay on for workloads that only run occasionally.',
  'Funções e filas serverless que custam só quando trabalham.':
    'Serverless functions and queues that only cost money when they run.',
  'Contentores e Kubernetes': 'Containers and Kubernetes',
  'Cada ambiente é diferente e os deploys falham.':
    'Every environment is different and deployments fail.',
  'Aplicações em contentores, com Kubernetes e ambientes iguais do teste à produção.':
    'Containerized applications, with Kubernetes and identical environments from testing to production.',
  'Só sabe que algo falhou quando o cliente liga.':
    'You only find out something failed when a customer calls.',
  'Logs, métricas, traces e alertas que mostram o problema antes do cliente.':
    'Logs, metrics, traces and alerts that show the problem before the customer does.',
  Alertas: 'Alerts',
  'Otimização de custos': 'Cost optimization',
  'A fatura da cloud cresce mais do que o negócio.':
    'The cloud bill grows faster than the business.',
  'Análise de consumo, dimensionamento certo e reservas, com relatórios mensais.':
    'Usage analysis, right-sizing and reservations, with monthly reports.',
  Custos: 'Costs',
  Execução: 'Runtime',
  Infraestrutura: 'Infrastructure',
  'Microsserviços são sempre a melhor opção?': 'Are microservices always the best option?',
  'Não. Para muitos produtos um monólito bem organizado chega. Recomendamos microsserviços quando a escala ou as equipas o justificam.':
    'No. For many products a well-organized monolith is enough. We recommend microservices when scale or the number of teams justifies them.',
  'Assistentes, pesquisa sobre documentos e geração de conteúdo com os dados da sua empresa, em produção e com custos medidos.':
    "Assistants, document search and content generation using your company's data, in production and with measured costs.",
  'LLM · RAG · Assistentes': 'LLM · RAG · Assistants',
  Documentos: 'Documents',
  'Bases de dados': 'Databases',
  Avaliações: 'Evaluations',
  'Cloud privada': 'Private cloud',
  'Assistentes internos': 'Internal assistants',
  'A equipa perde horas à procura de informação.':
    'Your team loses hours searching for information.',
  'Assistentes que respondem com base nos documentos da empresa, com fontes citadas.':
    'Assistants that answer based on company documents, with sources cited.',
  Fontes: 'Sources',
  'Pesquisa sobre documentos': 'Document search',
  'Contratos, manuais e processos estão espalhados e ninguém os encontra.':
    'Contracts, manuals and processes are scattered and nobody can find them.',
  'Pesquisa semântica sobre milhares de documentos, com permissões por utilizador.':
    'Semantic search across thousands of documents, with per-user permissions.',
  'Pesquisa semântica': 'Semantic search',
  Vetores: 'Vectors',
  'Atendimento ao cliente': 'Customer service',
  'O apoio ao cliente não acompanha o volume de pedidos.':
    "Customer support can't keep up with the volume of requests.",
  'Assistentes que resolvem pedidos simples e passam os outros a uma pessoa.':
    'Assistants that resolve simple requests and hand the rest to a person.',
  Escalamento: 'Escalation',
  'Geração de conteúdo': 'Content generation',
  'Descrições, resumos e relatórios são escritos à mão.':
    'Descriptions, summaries and reports are written by hand.',
  'Geração de texto e resumos com o tom da marca e revisão humana onde é preciso.':
    'Text generation and summaries in your brand voice, with human review where needed.',
  Resumos: 'Summaries',
  'Tom de marca': 'Brand voice',
  'IA no seu produto': 'AI in your product',
  'Os clientes pedem funcionalidades de IA no produto.':
    'Customers are asking for AI features in the product.',
  'Integramos modelos de linguagem no seu produto, com limites de custo e qualidade.':
    'We integrate language models into your product, with cost and quality limits.',
  Produto: 'Product',
  'Avaliação e segurança': 'Evaluation and safety',
  'Não sabe se as respostas da IA estão certas.':
    "You don't know whether the AI's answers are right.",
  'Conjuntos de avaliação, guardrails e monitorização de qualidade em produção.':
    'Evaluation sets, guardrails and quality monitoring in production.',
  Modelos: 'Models',
  Orquestração: 'Orchestration',
  Avaliação: 'Evaluation',
  'Que modelo de linguagem usam?': 'Which language model do you use?',
  'Escolhemos por caso, entre Claude, GPT e modelos abertos como Llama, a pensar em qualidade, custo e onde os dados podem estar.':
    'We choose case by case, among Claude, GPT and open models such as Llama, weighing quality, cost and where the data can live.',
  'Agentes que executam tarefas de ponta a ponta nos seus sistemas, com regras claras e supervisão humana.':
    'Agents that carry out tasks end to end in your systems, with clear rules and human oversight.',
  'Agentes · Ferramentas · Supervisão': 'Agents · Tools · Oversight',
  Sistemas: 'Systems',
  Ferramentas: 'Tools',
  Registos: 'Logs',
  'Aprovação humana': 'Human approval',
  'Agentes de operações': 'Operations agents',
  'As mesmas tarefas de back-office voltam todos os dias.':
    'The same back-office tasks come back every day.',
  'Agentes que leem pedidos, consultam sistemas e preparam a resposta para aprovação.':
    'Agents that read requests, query systems and prepare the response for approval.',
  Aprovação: 'Approval',
  'Agentes de atendimento': 'Customer service agents',
  'Os clientes esperam por respostas que estão nos sistemas.':
    'Customers wait for answers that are already in your systems.',
  'Agentes que consultam encomendas, faturas e estados e respondem com dados reais.':
    'Agents that look up orders, invoices and statuses and answer with real data.',
  Atendimento: 'Customer service',
  'Agentes de engenharia': 'Engineering agents',
  'A equipa gasta tempo em revisões e tarefas repetitivas.':
    'The team spends time on reviews and repetitive tasks.',
  'Agentes que preparam testes, revisões e documentação no seu repositório.':
    'Agents that prepare tests, reviews and documentation in your repository.',
  Código: 'Code',
  Revisões: 'Reviews',
  'Ligação a ferramentas': 'Tool connections',
  'O agente não tem acesso aos sistemas onde o trabalho acontece.':
    'The agent has no access to the systems where the work happens.',
  'Ligamos o agente ao ERP, CRM e APIs com permissões mínimas e registo de cada ação.':
    'We connect the agent to your ERP, CRM and APIs with least-privilege permissions and a log of every action.',
  'Supervisão humana': 'Human oversight',
  'Não pode deixar um agente decidir sozinho.': "You can't let an agent decide on its own.",
  'Pontos de aprovação, limites e registo de auditoria em cada passo.':
    'Approval checkpoints, limits and an audit log at every step.',
  'Avaliação contínua': 'Continuous evaluation',
  'Não sabe quando o agente começa a errar.':
    "You don't know when the agent starts getting things wrong.",
  'Testes de cenários, métricas de sucesso e alertas em produção.':
    'Scenario tests, success metrics and alerts in production.',
  Agentes: 'Agents',
  Ligações: 'Connections',
  Observação: 'Observation',
  'O agente pode fazer alterações nos nossos sistemas?':
    'Can the agent make changes to our systems?',
  'Só as que definir. Cada ferramenta tem permissões mínimas e as ações sensíveis passam por aprovação humana.':
    'Only the ones you define. Each tool has least-privilege permissions and sensitive actions go through human approval.',
  'Modelos de previsão, classificação e recomendação treinados com os seus dados e levados para produção.':
    'Forecasting, classification and recommendation models trained on your data and taken to production.',
  'Dados históricos': 'Historical data',
  Métricas: 'Metrics',
  'Modelos de previsão': 'Forecasting models',
  'As decisões de stock e procura são feitas por intuição.':
    'Inventory and demand decisions are made on gut feeling.',
  'Previsões de procura, vendas e consumo com intervalos de confiança.':
    'Demand, sales and consumption forecasts with confidence intervals.',
  Previsão: 'Forecasting',
  'Séries temporais': 'Time series',
  'Classificação e deteção': 'Classification and detection',
  'Fraude, falhas ou anomalias só são vistas tarde.':
    'Fraud, failures or anomalies are only spotted late.',
  'Modelos que classificam e detetam casos anómalos, com explicação dos resultados.':
    'Models that classify and detect anomalies, with explainable results.',
  Anomalias: 'Anomalies',
  Explicabilidade: 'Explainability',
  Recomendação: 'Recommendation',
  'Todos os clientes veem a mesma oferta.': 'Every customer sees the same offer.',
  'Sistemas de recomendação personalizados, medidos com testes A/B.':
    'Personalized recommendation systems, measured with A/B tests.',
  Personalização: 'Personalization',
  'Visão computacional': 'Computer vision',
  'Inspeções e leituras são feitas à mão.': 'Inspections and readings are done by hand.',
  'Modelos que leem imagens e documentos para inspeção, contagem e extração.':
    'Models that read images and documents for inspection, counting and extraction.',
  Visão: 'Vision',
  'Os modelos ficam em notebooks e nunca chegam à produção.':
    'Models stay in notebooks and never reach production.',
  'Treino, versões, deploy e monitorização automáticos dos modelos.':
    'Automated training, versioning, deployment and monitoring of models.',
  'Dados para IA': 'Data for AI',
  'Os dados não estão prontos para treinar modelos.': "The data isn't ready to train models.",
  'Pipelines de dados com qualidade, histórico e governação.':
    'Data pipelines with quality, history and governance.',
  'Engenharia de dados': 'Data engineering',
  Modelação: 'Modeling',
  Visualização: 'Visualization',
  'Quantos dados são precisos?': 'How much data is needed?',
  'Depende do problema. Começamos por analisar os dados que existem e dizemos com franqueza se chegam para um modelo útil.':
    "It depends on the problem. We start by analyzing the data you have and tell you frankly whether it's enough for a useful model.",
  'Diagnóstico, priorização de casos de uso e roadmap de IA para toda a organização, com resultados medidos.':
    'Assessment, use-case prioritization and an AI roadmap for the whole organization, with measured results.',
  'Estratégia · Casos de uso · Roadmap': 'Strategy · Use cases · Roadmap',
  'Casos de uso': 'Use cases',
  Pilotos: 'Pilots',
  Governação: 'Governance',
  Escala: 'Scale',
  Formação: 'Training',
  'Diagnóstico de IA': 'AI assessment',
  'Há muitas ideias de IA e nenhuma prioridade.': 'There are lots of AI ideas and no priorities.',
  'Mapeamos processos e dados e identificamos onde a IA traz retorno.':
    'We map processes and data and identify where AI pays off.',
  Diagnóstico: 'Assessment',
  'Priorização de casos de uso': 'Use-case prioritization',
  'Não sabe por onde começar.': "You don't know where to start.",
  'Avaliamos valor, risco e esforço de cada caso de uso e escolhemos os primeiros.':
    'We assess the value, risk and effort of each use case and pick the first ones.',
  Priorização: 'Prioritization',
  Valor: 'Value',
  'Pilotos com métricas': 'Pilots with metrics',
  'Os pilotos de IA não passam de demonstrações.': 'AI pilots never get past the demo stage.',
  'Pilotos curtos, com métricas de sucesso definidas antes de começar.':
    'Short pilots, with success metrics defined before they start.',
  'Governação e segurança': 'Governance and security',
  'Não há regras para o uso de IA na empresa.': 'There are no rules for using AI in the company.',
  'Políticas de uso, proteção de dados e conformidade com o AI Act europeu.':
    'Usage policies, data protection and compliance with the EU AI Act.',
  RGPD: 'GDPR',
  'IA no desenvolvimento': 'AI in software development',
  'As equipas de engenharia usam IA cada uma à sua maneira.':
    'Each engineering team uses AI in its own way.',
  'Adoção de assistentes de código com regras, formação e medição de impacto.':
    'Adoption of coding assistants with rules, training and impact measurement.',
  'Formação de equipas': 'Team training',
  'As pessoas não sabem usar as ferramentas de IA no dia a dia.':
    "People don't know how to use AI tools in their daily work.",
  'Formação prática por função, com casos da própria empresa.':
    "Hands-on training by role, using the company's own cases.",
  Adoção: 'Adoption',
  Assistentes: 'Assistants',
  Desenvolvimento: 'Development',
  'Políticas de uso': 'Usage policies',
  'Registos de auditoria': 'Audit logs',
  'Estratégia de IA': 'AI strategy',
  'Gestão da mudança': 'Change management',
  'Quanto tempo demora o diagnóstico?': 'How long does the assessment take?',
  '[Duração típica do diagnóstico a confirmar com a equipa de IA.]':
    '[Typical assessment duration to be confirmed with the AI team.]',
  'Experiências imersivas para formação, vendas e manutenção no terreno, em óculos, tablets e telemóveis.':
    'Immersive experiences for training, sales and field maintenance, on headsets, tablets and phones.',
  Óculos: 'Headsets',
  Telemóveis: 'Phones',
  'Modelos 3D': '3D models',
  Manuais: 'Manuals',
  Distribuição: 'Distribution',
  Suporte: 'Support',
  'Formação imersiva': 'Immersive training',
  'Formar pessoas em equipamentos reais é caro e arriscado.':
    'Training people on real equipment is expensive and risky.',
  'Simulações em realidade virtual para treinar procedimentos sem riscos.':
    'Virtual reality simulations to practice procedures with no risk.',
  Simulação: 'Simulation',
  'Apoio à manutenção': 'Maintenance support',
  'Os técnicos no terreno dependem de manuais em papel.':
    'Field technicians rely on paper manuals.',
  'Instruções em realidade aumentada sobre o próprio equipamento.':
    'Augmented reality instructions overlaid on the equipment itself.',
  Terreno: 'Field',
  'Vendas e configuradores': 'Sales and configurators',
  'Os clientes não conseguem imaginar o produto.': "Customers can't picture the product.",
  'Configuradores 3D e visualização do produto no espaço do cliente.':
    "3D configurators and product visualization in the customer's own space.",
  Configurador: 'Configurator',
  'Assistência remota': 'Remote assistance',
  'Cada avaria obriga a deslocar um especialista.':
    'Every breakdown means sending a specialist on site.',
  'Chamadas com anotações em AR para orientar o técnico à distância.':
    'Calls with AR annotations to guide the technician remotely.',
  Remoto: 'Remote',
  Anotações: 'Annotations',
  'Gémeos digitais': 'Digital twins',
  'Não há uma visão viva das instalações.': 'There is no live view of your facilities.',
  'Modelos 3D das instalações ligados a dados de sensores.':
    '3D models of your facilities connected to sensor data.',
  'Gémeo digital': 'Digital twin',
  'Prova de conceito': 'Proof of concept',
  'Não sabe se a tecnologia serve o seu caso.':
    "You don't know whether the technology fits your case.",
  'Prova de conceito curta, testada com utilizadores reais.':
    'A short proof of concept, tested with real users.',
  Motores: 'Engines',
  'Que dispositivos suportam?': 'Which devices do you support?',
  'Óculos como Meta Quest e Apple Vision Pro, e tablets e telemóveis iOS e Android.':
    'Headsets such as Meta Quest and Apple Vision Pro, plus iOS and Android tablets and phones.',
  'Registos partilhados e contratos inteligentes onde a rastreabilidade e a confiança entre partes são críticas.':
    'Shared ledgers and smart contracts where traceability and trust between parties are critical.',
  'Contratos inteligentes · Rastreabilidade': 'Smart contracts · Traceability',
  Carteiras: 'Wallets',
  Portais: 'Portals',
  Indexação: 'Indexing',
  Monitorização: 'Monitoring',
  Rastreabilidade: 'Traceability',
  'Não consegue provar a origem e o percurso de um produto.':
    "You can't prove where a product came from and the path it took.",
  'Registos partilhados ao longo da cadeia de fornecimento.':
    'Shared ledgers across the supply chain.',
  'Cadeia de valor': 'Value chain',
  Origem: 'Origin',
  'Contratos inteligentes': 'Smart contracts',
  'Acordos entre partes dependem de verificações manuais.':
    'Agreements between parties depend on manual checks.',
  'Contratos inteligentes testados e auditados, com regras claras.':
    'Tested and audited smart contracts, with clear rules.',
  Tokenização: 'Tokenization',
  'Ativos e direitos são difíceis de transferir e verificar.':
    'Assets and rights are hard to transfer and verify.',
  'Representação digital de ativos com controlo de acesso e conformidade.':
    'Digital representation of assets with access control and compliance.',
  Conformidade: 'Compliance',
  'Certificados verificáveis': 'Verifiable credentials',
  'Documentos e certificados podem ser falsificados.': 'Documents and certificates can be forged.',
  'Emissão de certificados verificáveis por qualquer pessoa.':
    'Issuing certificates that anyone can verify.',
  Credenciais: 'Credentials',
  Verificação: 'Verification',
  'Integração com sistemas': 'Systems integration',
  'O blockchain fica isolado do resto da empresa.':
    'The blockchain sits isolated from the rest of the company.',
  'Integração com ERP e APIs para que os dados fluam nos dois sentidos.':
    'Integration with your ERP and APIs so data flows both ways.',
  'Avaliação de viabilidade': 'Feasibility assessment',
  'Não sabe se precisa mesmo de blockchain.': "You don't know whether you really need blockchain.",
  'Análise honesta: muitas vezes uma base de dados chega, e dizemos isso com franqueza.':
    'An honest analysis: often a database is enough, and we tell you so frankly.',
  Viabilidade: 'Feasibility',
  Redes: 'Networks',
  Segurança: 'Security',
  'Auditorias externas': 'External audits',
  'Precisamos mesmo de blockchain?': 'Do we really need blockchain?',
  'Só quando várias partes que não confiam entre si partilham registos. Nos outros casos recomendamos uma solução mais simples.':
    "Only when several parties that don't trust each other share records. In other cases we recommend a simpler solution.",
  'Sensores, equipamentos e plataformas ligados para monitorizar operações em tempo real e agir antes da falha.':
    'Sensors, equipment and platforms connected to monitor operations in real time and act before failures happen.',
  'Sensores · Edge · Tempo real': 'Sensors · Edge · Real time',
  Sensores: 'Sensors',
  Equipamentos: 'Equipment',
  Painéis: 'Dashboards',
  'Monitorização de operações': 'Operations monitoring',
  'Só sabe que um equipamento parou quando a produção para.':
    'You only find out a machine stopped when production stops.',
  'Sensores e painéis em tempo real com alertas configuráveis.':
    'Real-time sensors and dashboards with configurable alerts.',
  'Manutenção preditiva': 'Predictive maintenance',
  'As avarias acontecem sempre na pior altura.': 'Breakdowns always happen at the worst time.',
  'Modelos que preveem falhas a partir dos dados dos equipamentos.':
    'Models that predict failures from equipment data.',
  Preditivo: 'Predictive',
  'Plataformas IoT': 'IoT platforms',
  'Cada fornecedor de equipamentos tem o seu sistema.':
    'Every equipment vendor has its own system.',
  'Uma plataforma única que recolhe dados de equipamentos diferentes.':
    'A single platform that collects data from different equipment.',
  Plataforma: 'Platform',
  'A ligação à internet nas instalações é instável.':
    'The internet connection at your facilities is unreliable.',
  'Processamento local nos gateways, com sincronização quando há rede.':
    'Local processing on gateways, syncing when the network is available.',
  'Firmware e dispositivos': 'Firmware and devices',
  'Os dispositivos são difíceis de atualizar e proteger.': 'Devices are hard to update and secure.',
  'Firmware, atualizações remotas e segurança dos dispositivos.':
    'Firmware, over-the-air updates and device security.',
  'Dados para decisão': 'Data for decision-making',
  'Os dados dos sensores ficam guardados e ninguém os usa.':
    'Sensor data gets stored and nobody uses it.',
  'Pipelines de dados e painéis que ligam a operação ao negócio.':
    'Data pipelines and dashboards that connect operations to the business.',
  Protocolos: 'Protocols',
  'Trabalham com equipamentos que já temos?': 'Do you work with equipment we already have?',
  'Sim. Ligamos equipamentos existentes através de gateways e protocolos industriais.':
    'Yes. We connect existing equipment through gateways and industrial protocols.',
  'Pipelines, infraestrutura como código e segurança integrada no ciclo de entrega, para lançar mais vezes com menos risco.':
    'Pipelines, infrastructure as code and security built into the delivery cycle, to release more often with less risk.',
  Segredos: 'Secrets',
  'Infraestrutura como código': 'Infrastructure as code',
  'Os ambientes são configurados à mão e ninguém sabe como.':
    'Environments are configured by hand and nobody knows how.',
  'Toda a infraestrutura em Terraform, revista e versionada como o código.':
    'All infrastructure in Terraform, reviewed and versioned like code.',
  Ambientes: 'Environments',
  'Segurança no pipeline': 'Pipeline security',
  'As vulnerabilidades só aparecem em produção.': 'Vulnerabilities only show up in production.',
  'Análise de código, dependências e segredos em cada alteração.':
    'Code, dependency and secret scanning on every change.',
  'Plataforma para equipas': 'A platform for your teams',
  'Cada equipa reinventa a forma de fazer deploy.': 'Every team reinvents how to deploy.',
  'Uma plataforma interna com modelos prontos para as equipas lançarem sozinhas.':
    'An internal platform with ready-made templates so teams can ship on their own.',
  'Kubernetes em produção': 'Kubernetes in production',
  'O cluster é frágil e ninguém quer mexer nele.':
    'The cluster is fragile and nobody wants to touch it.',
  'Clusters geridos, atualizados e com recuperação testada.':
    'Managed, up-to-date clusters with tested recovery.',
  'Observabilidade e incidentes': 'Observability and incidents',
  'Os incidentes demoram horas a ser percebidos.': 'Incidents take hours to be noticed.',
  'Monitorização, alertas e processo de resposta a incidentes.':
    'Monitoring, alerts and an incident response process.',
  'As auditorias pedem provas que não tem.': "Audits ask for evidence you don't have.",
  'Controlo de acessos, registos e evidências para ISO 27001 e NIS2.':
    'Access control, logs and evidence for ISO 27001 and NIS2.',
  'Qual a diferença entre DevOps e DevSecOps?':
    'What is the difference between DevOps and DevSecOps?',
  'DevSecOps é DevOps com a segurança integrada em cada passo do pipeline, em vez de uma verificação no fim.':
    'DevSecOps is DevOps with security built into every step of the pipeline, instead of a check at the end.',
  'Migração para AWS, Azure ou Google Cloud por fases, com o mínimo de interrupção e custos previstos à partida.':
    'Phased migration to AWS, Azure or Google Cloud, with minimal disruption and costs estimated up front.',
  Inventário: 'Inventory',
  Dependências: 'Dependencies',
  'Plano por ondas': 'Migration waves',
  Rede: 'Network',
  Operação: 'Operations',
  'Avaliação e plano': 'Assessment and plan',
  'Não sabe quanto vai custar nem por onde começar.':
    "You don't know how much it will cost or where to start.",
  'Inventário das aplicações, dependências e custos, com plano por ondas.':
    'An inventory of applications, dependencies and costs, with a plan in migration waves.',
  'Migração de aplicações': 'Application migration',
  'As aplicações críticas não podem parar.': "Critical applications can't go down.",
  'Migração por fases, com testes e plano de recuo em cada passo.':
    'Phased migration, with testing and a rollback plan at every step.',
  'Migração de dados': 'Data migration',
  'Bases de dados grandes e antigas assustam a equipa.': 'Large, old databases scare the team.',
  'Migração de dados com sincronização e validação antes da passagem.':
    'Data migration with synchronization and validation before cutover.',
  Validação: 'Validation',
  'A conta cloud cresce sem regras.': 'The cloud account grows without rules.',
  'Contas, redes, identidades e políticas organizadas desde o início.':
    'Accounts, networks, identities and policies organized from the start.',
  'Modernização na cloud': 'Cloud modernization',
  'Mudar de servidor não resolve os problemas da aplicação.':
    "Moving servers doesn't fix the application's problems.",
  'Serviços geridos, contentores e serverless onde trazem ganho real.':
    'Managed services, containers and serverless where they bring real gains.',
  Contentores: 'Containers',
  'Operação e custos': 'Operations and costs',
  'Depois da migração, ninguém acompanha a fatura.':
    'After the migration, nobody keeps an eye on the bill.',
  'Operação contínua, otimização de custos e relatórios mensais.':
    'Ongoing operations, cost optimization and monthly reports.',
  'Quanto tempo demora uma migração?': 'How long does a migration take?',
  'Depende do número de aplicações e das dependências. O plano por ondas, feito na avaliação, define as datas de cada fase.':
    'It depends on the number of applications and their dependencies. The migration-wave plan, built during the assessment, sets the dates for each phase.',
  'Sistemas legados reescritos ou decompostos por fases, sem parar o negócio e sem um big bang arriscado.':
    'Legacy systems rewritten or broken down in phases, without stopping the business and without a risky big bang.',
  'Legado · Migração por fases': 'Legacy · Phased migration',
  'Análise do legado': 'Legacy analysis',
  'Nova interface': 'New interface',
  'Avaliação do legado': 'Legacy assessment',
  'Ninguém sabe ao certo o que o sistema antigo faz.':
    'Nobody knows exactly what the old system does.',
  'Mapeamos código, dados e regras de negócio e propomos o caminho.':
    'We map code, data and business rules and propose the way forward.',
  Análise: 'Analysis',
  'Modernização por fases': 'Phased modernization',
  'Reescrever tudo de uma vez é demasiado arriscado.': 'Rewriting everything at once is too risky.',
  'Substituição gradual, módulo a módulo, com o sistema antigo a funcionar.':
    'Gradual replacement, module by module, with the old system still running.',
  Fases: 'Phases',
  'Migração de linguagem': 'Language migration',
  'O sistema está numa tecnologia sem programadores no mercado.':
    'The system runs on a technology with no developers left on the market.',
  'Migração para Java, .NET ou Node.js modernos, com testes de equivalência.':
    'Migration to modern Java, .NET or Node.js, with equivalence testing.',
  'APIs sobre o legado': 'APIs over the legacy system',
  'Os sistemas novos não conseguem falar com o antigo.': "New systems can't talk to the old one.",
  'APIs que expõem o legado de forma segura enquanto é modernizado.':
    'APIs that expose the legacy system securely while it is modernized.',
  'Cada mudança no legado parte alguma coisa.':
    'Every change to the legacy system breaks something.',
  'Rede de testes automáticos antes de mexer no código.':
    'A safety net of automated tests before touching the code.',
  Regressão: 'Regression',
  'Modernização com IA': 'AI-assisted modernization',
  'Documentar e migrar código antigo leva meses.':
    'Documenting and migrating old code takes months.',
  'Assistentes de IA para ler, documentar e converter código, com revisão sénior.':
    'AI assistants to read, document and convert code, with senior review.',
  IA: 'AI',
  Documentação: 'Documentation',
  Destino: 'Target',
  'É possível modernizar sem parar o sistema?':
    'Is it possible to modernize without stopping the system?',
  'Sim. Substituímos por partes, com o sistema antigo e o novo a funcionar lado a lado até à passagem final.':
    'Yes. We replace it piece by piece, with the old and new systems running side by side until the final cutover.',
  'Integração e entrega contínuas, com testes automáticos em cada alteração e lançamentos sem sustos.':
    'Continuous integration and delivery, with automated tests on every change and releases without surprises.',
  'CI/CD · Testes · Deploy': 'CI/CD · Testing · Deployment',
  Artefactos: 'Artifacts',
  'Métricas DORA': 'DORA metrics',
  'Pipelines de integração': 'Integration pipelines',
  'Os erros só são descobertos dias depois.': 'Bugs are only discovered days later.',
  'Build e testes automáticos em cada pull request.':
    'Automated builds and tests on every pull request.',
  'Entrega contínua': 'Continuous delivery',
  'Lançar uma versão é um evento que ocupa a equipa.':
    'Shipping a release is an event that ties up the team.',
  'Deploys automáticos por ambiente, com aprovação onde é preciso.':
    'Automated deployments per environment, with approval where needed.',
  'Testes no pipeline': 'Tests in the pipeline',
  'Os testes existem mas ninguém os corre.': 'The tests exist but nobody runs them.',
  'Testes unitários, de integração e end-to-end ligados ao pipeline.':
    'Unit, integration and end-to-end tests wired into the pipeline.',
  'Lançamentos seguros': 'Safe releases',
  'Um erro em produção afeta todos os clientes.': 'A bug in production affects every customer.',
  'Canary, feature flags e rollback automático.':
    'Canary releases, feature flags and automatic rollback.',
  'Pipelines mais rápidos': 'Faster pipelines',
  'O pipeline demora tanto que a equipa o evita.': 'The pipeline takes so long the team avoids it.',
  'Cache, paralelização e testes seletivos para respostas em minutos.':
    'Caching, parallelization and selective tests for feedback in minutes.',
  Paralelização: 'Parallelization',
  'Métricas de entrega': 'Delivery metrics',
  'Não sabe se a equipa entrega mais depressa ou mais devagar.':
    "You don't know whether the team is shipping faster or slower.",
  'Métricas DORA: frequência, tempo de entrega, falhas e recuperação.':
    'DORA metrics: frequency, lead time, failures and recovery.',
  Lançamentos: 'Releases',
  'Usam a ferramenta de CI que já temos?': 'Do you use the CI tool we already have?',
  'Sim. Trabalhamos com GitHub Actions, GitLab CI, Jenkins ou Azure DevOps e só recomendamos mudar quando compensa.':
    'Yes. We work with GitHub Actions, GitLab CI, Jenkins or Azure DevOps and only recommend switching when it pays off.',
  'Suites automáticas que crescem com o produto, correm em cada alteração e cortam o tempo de regressão.':
    'Automated suites that grow with the product, run on every change and cut regression time.',
  'Pirâmide de testes': 'Test pyramid',
  Unitários: 'Unit',
  Paralelo: 'Parallel',
  Relatórios: 'Reports',
  'Automação web': 'Web automation',
  'A regressão manual demora dias antes de cada lançamento.':
    'Manual regression takes days before every release.',
  'Testes end-to-end estáveis em Playwright, Cypress ou Selenium.':
    'Stable end-to-end tests in Playwright, Cypress or Selenium.',
  'Automação mobile': 'Mobile automation',
  'As apps são testadas à mão em poucos dispositivos.':
    'Apps are tested by hand on a handful of devices.',
  'Testes automáticos em dispositivos reais e emuladores com Appium.':
    'Automated tests on real devices and emulators with Appium.',
  Dispositivos: 'Devices',
  'Testes de API': 'API testing',
  'As integrações falham sem que ninguém perceba.': 'Integrations fail without anyone noticing.',
  'Testes de API e de contrato em cada alteração.': 'API and contract tests on every change.',
  'Framework de testes': 'Test framework',
  'Os testes existentes são frágeis e ninguém confia neles.':
    'The existing tests are flaky and nobody trusts them.',
  'Framework organizado, com padrões, dados de teste e relatórios claros.':
    'A well-organized framework, with patterns, test data and clear reports.',
  'Dados de teste': 'Test data',
  'Os testes não correm automaticamente.': "Tests don't run automatically.",
  'Execução paralela no CI/CD, com resultados em minutos.':
    'Parallel execution in CI/CD, with results in minutes.',
  'Testes com IA': 'AI-assisted testing',
  'Escrever e manter testes consome demasiado tempo.':
    'Writing and maintaining tests takes too much time.',
  'Geração e manutenção de testes assistidas por IA, revistas por engenheiros.':
    'AI-assisted test generation and maintenance, reviewed by engineers.',
  'Playwright, Cypress ou Selenium?': 'Playwright, Cypress or Selenium?',
  'Para projetos novos recomendamos geralmente Playwright. Se já tem uma suite em Cypress ou Selenium, melhoramos o que existe antes de pensar em migrar.':
    'For new projects we usually recommend Playwright. If you already have a Cypress or Selenium suite, we improve what exists before thinking about migrating.',
  'Testes de carga e stress que mostram os limites do sistema antes dos utilizadores, com gargalos identificados.':
    "Load and stress tests that show your system's limits before your users do, with bottlenecks identified.",
  'Carga · Stress · Escalabilidade': 'Load · Stress · Scalability',
  Cenários: 'Scenarios',
  Carga: 'Load',
  Picos: 'Peaks',
  Gargalos: 'Bottlenecks',
  Recomendações: 'Recommendations',
  'Testes de carga': 'Load testing',
  'Não sabe quantos utilizadores o sistema aguenta.':
    "You don't know how many users the system can handle.",
  'Simulamos o volume esperado e medimos tempos de resposta e erros.':
    'We simulate the expected volume and measure response times and errors.',
  'Tempos de resposta': 'Response times',
  'Testes de stress e picos': 'Stress and spike testing',
  'Campanhas e datas especiais derrubam o sistema.':
    'Campaigns and special dates bring the system down.',
  'Levamos o sistema ao limite para saber onde e como falha.':
    'We push the system to its limit to learn where and how it fails.',
  'Diagnóstico de gargalos': 'Bottleneck diagnosis',
  'O sistema está lento e ninguém sabe porquê.': 'The system is slow and nobody knows why.',
  'Análise da aplicação, base de dados e infraestrutura com recomendações.':
    'Analysis of the application, database and infrastructure, with recommendations.',
  'Base de dados': 'Database',
  'Performance no pipeline': 'Performance in the pipeline',
  'A performance piora a cada lançamento sem ninguém notar.':
    'Performance gets worse with every release and nobody notices.',
  'Testes de performance automáticos no CI, com limites que bloqueiam regressões.':
    'Automated performance tests in CI, with thresholds that block regressions.',
  'Performance de front-end': 'Front-end performance',
  'As páginas demoram a carregar no telemóvel.': 'Pages are slow to load on mobile.',
  'Medição de Core Web Vitals e correções no carregamento.':
    'Core Web Vitals measurement and loading fixes.',
  'Planeamento de capacidade': 'Capacity planning',
  'Não sabe que infraestrutura vai precisar para crescer.':
    "You don't know what infrastructure you'll need to grow.",
  'Projeções de capacidade e custos a partir dos testes.':
    'Capacity and cost projections based on the tests.',
  Capacidade: 'Capacity',
  'Testam em produção?': 'Do you test in production?',
  'Preferimos um ambiente igual ao de produção. Quando não existe, combinamos consigo janelas e limites seguros.':
    "We prefer an environment identical to production. When there isn't one, we agree safe windows and limits with you.",
  'Análise de vulnerabilidades e testes de intrusão antes de cada lançamento, com correções priorizadas.':
    'Vulnerability assessments and penetration tests before every release, with prioritized fixes.',
  'Pentest · OWASP · Conformidade': 'Pen testing · OWASP · Compliance',
  Âmbito: 'Scope',
  Riscos: 'Risks',
  Relatório: 'Report',
  Correções: 'Fixes',
  'Testes de intrusão': 'Penetration testing',
  'Não sabe se a aplicação resiste a um ataque.':
    "You don't know whether the application can withstand an attack.",
  'Testes de intrusão em aplicações web, APIs e mobile, com relatório priorizado.':
    'Penetration tests on web applications, APIs and mobile apps, with a prioritized report.',
  Pentest: 'Pen testing',
  'Análise de vulnerabilidades': 'Vulnerability assessment',
  'Bibliotecas e servidores desatualizados passam despercebidos.':
    'Outdated libraries and servers go unnoticed.',
  'Análise automática e manual de código, dependências e infraestrutura.':
    'Automated and manual analysis of code, dependencies and infrastructure.',
  'A segurança só é verificada no fim do projeto.':
    'Security is only checked at the end of the project.',
  'Verificações automáticas em cada alteração, antes de chegar a produção.':
    'Automated checks on every change, before it reaches production.',
  'Segurança de APIs': 'API security',
  'As APIs expõem mais dados do que deviam.': 'APIs expose more data than they should.',
  'Testes de autenticação, autorização e exposição de dados nas APIs.':
    'Authentication, authorization and data exposure testing on your APIs.',
  'Apoio à correção': 'Remediation support',
  'O relatório chega e ninguém sabe por onde começar.':
    'The report arrives and nobody knows where to start.',
  'Acompanhamos a equipa na correção e voltamos a testar.':
    'We support the team through the fixes and retest.',
  Correção: 'Remediation',
  Reteste: 'Retest',
  'Auditorias e clientes pedem provas de segurança.':
    'Auditors and customers ask for proof of security.',
  'Evidências para ISO 27001, NIS2 e RGPD.': 'Evidence for ISO 27001, NIS2 and GDPR.',
  Referências: 'References',
  'Com que frequência devemos fazer testes de intrusão?':
    'How often should we run penetration tests?',
  'Pelo menos uma vez por ano e antes de lançamentos importantes. As verificações automáticas correm em cada alteração.':
    'At least once a year and before major releases. Automated checks run on every change.',
  'Testes exploratórios e de aceitação onde a automação não chega, feitos por analistas que conhecem o negócio.':
    'Exploratory and acceptance testing where automation falls short, by analysts who know the business.',
  'Exploratórios · Aceitação · Acessibilidade': 'Exploratory · Acceptance · Accessibility',
  'Plano de testes': 'Test plan',
  Exploratórios: 'Exploratory',
  Aceitação: 'Acceptance',
  'Dispositivos reais': 'Real devices',
  Defeitos: 'Defects',
  'Testes exploratórios': 'Exploratory testing',
  'Os erros mais estranhos só aparecem com utilizadores reais.':
    'The strangest bugs only show up with real users.',
  'Analistas que exploram a aplicação como um utilizador e encontram o inesperado.':
    'Analysts who explore the application the way a user would and find the unexpected.',
  Sessões: 'Sessions',
  'Testes de aceitação': 'Acceptance testing',
  'O negócio não tem tempo para validar cada entrega.':
    'The business has no time to validate every delivery.',
  'Testes de aceitação com base nos requisitos, com evidências.':
    'Acceptance tests based on the requirements, with evidence.',
  Requisitos: 'Requirements',
  'Fábrica de testes': 'Testing factory',
  'Picos de testes antes dos lançamentos sobrecarregam a equipa.':
    'Testing peaks before releases overload the team.',
  'Uma equipa de testes que escala com os lançamentos, manual e automática.':
    'A testing team that scales with your releases, manual and automated.',
  'Testes de acessibilidade': 'Accessibility testing',
  'A aplicação não cumpre as regras de acessibilidade.':
    "The application doesn't meet accessibility rules.",
  'Verificação WCAG 2.2 com leitores de ecrã e teclado.':
    'WCAG 2.2 checks with screen readers and keyboard.',
  'Leitores de ecrã': 'Screen readers',
  'Testes em dispositivos': 'Device testing',
  'A app funciona num telemóvel e falha noutro.':
    'The app works on one phone and breaks on another.',
  'Testes em dispositivos e browsers reais, com a matriz dos seus clientes.':
    "Testing on real devices and browsers, using your customers' device matrix.",
  'Casos de teste e documentação': 'Test cases and documentation',
  'Não há registo do que foi testado.': "There's no record of what was tested.",
  'Casos de teste organizados, rastreáveis até aos requisitos.':
    'Organized test cases, traceable back to requirements.',
  Gestão: 'Management',
  Acessibilidade: 'Accessibility',
  Apoio: 'Support',
  'Quando faz sentido testar manualmente?': 'When does manual testing make sense?',
  'Em funcionalidades novas, fluxos que mudam muito, usabilidade e acessibilidade. O que se repete deve ser automatizado.':
    'For new features, flows that change a lot, usability and accessibility. Anything repetitive should be automated.',
  'Investigação, fluxos, protótipos e design system prontos para desenvolvimento, testados com utilizadores reais.':
    'Research, flows, prototypes and a design system ready for development, tested with real users.',
  Entrevistas: 'Interviews',
  Jornadas: 'Journeys',
  Fluxos: 'Flows',
  Protótipos: 'Prototypes',
  Acompanhamento: 'Follow-through',
  'Investigação com utilizadores': 'User research',
  'O produto é desenhado a partir de suposições.': 'The product is designed based on assumptions.',
  'Entrevistas, análise de dados e testes que mostram o que os utilizadores precisam.':
    'Interviews, data analysis and tests that show what users need.',
  'Fluxos e arquitetura de informação': 'Flows and information architecture',
  'Os utilizadores desistem a meio do processo.': 'Users give up halfway through.',
  'Jornadas e fluxos simplificados, validados antes do desenho final.':
    'Simplified journeys and flows, validated before the final design.',
  Prototipagem: 'Prototyping',
  'As ideias só são testadas depois de desenvolvidas.':
    "Ideas are only tested after they're built.",
  'Protótipos interativos em Figma testados com utilizadores.':
    'Interactive Figma prototypes tested with users.',
  'Cada ecrã tem botões e cores diferentes.': 'Every screen has different buttons and colors.',
  'Componentes reutilizáveis em Figma e código, com regras de uso.':
    'Reusable components in Figma and code, with usage guidelines.',
  Componentes: 'Components',
  'Parte dos utilizadores não consegue usar o produto.': "Some users can't use the product.",
  'Desenho acessível desde o início, alinhado com a WCAG 2.2.':
    'Accessible design from the start, aligned with WCAG 2.2.',
  Contraste: 'Contrast',
  'Acompanhamento do desenvolvimento': 'Development support',
  'O produto final não se parece com o desenho.':
    "The finished product doesn't look like the design.",
  'Designers ao lado da equipa de desenvolvimento até ao lançamento.':
    'Designers working alongside the development team through launch.',
  Revisão: 'Review',
  Desenho: 'Design',
  Investigação: 'Research',
  Sistema: 'System',
  'Podem trabalhar só no design, com a nossa equipa a desenvolver?':
    'Can you handle just the design, with our team doing the development?',
  'Sim. Entregamos o design pronto para desenvolvimento e acompanhamos a sua equipa na implementação.':
    'Yes. We deliver a development-ready design and support your team during implementation.',
  'Sites institucionais e landing pages pensados para converter visitas em contactos, rápidos e fáceis de atualizar.':
    'Corporate websites and landing pages built to turn visits into leads, fast and easy to update.',
  'Sites · Landing pages · SEO': 'Websites · Landing pages · SEO',
  Objetivos: 'Goals',
  Público: 'Audience',
  Estrutura: 'Structure',
  Conteúdo: 'Content',
  'Sites institucionais': 'Corporate websites',
  'O site atual não explica o que a empresa faz.':
    "Your current website doesn't explain what the company does.",
  'Estrutura, mensagens e desenho que levam o visitante ao contacto.':
    'Structure, messaging and design that lead visitors to get in touch.',
  Mensagens: 'Messaging',
  'As campanhas levam tráfego para páginas que não convertem.':
    "Campaigns send traffic to pages that don't convert.",
  'Páginas de campanha rápidas, com testes A/B e medição.':
    'Fast campaign pages, with A/B testing and measurement.',
  Conversão: 'Conversion',
  'SEO técnico': 'Technical SEO',
  'O site não aparece na pesquisa do Google.': "The website doesn't show up in Google search.",
  'Estrutura, velocidade e dados estruturados preparados para a pesquisa.':
    'Structure, speed and structured data built for search.',
  'Dados estruturados': 'Structured data',
  'Gestão de conteúdos': 'Content management',
  'Cada alteração ao site depende de um programador.':
    'Every change to the website depends on a developer.',
  'CMS para a equipa de marketing publicar sozinha.':
    'A CMS so the marketing team can publish on its own.',
  Autonomia: 'Autonomy',
  'Performance e acessibilidade': 'Performance and accessibility',
  'O site é lento e difícil de usar no telemóvel.':
    'The website is slow and hard to use on mobile.',
  'Core Web Vitals no verde e acessibilidade WCAG 2.2.':
    'Core Web Vitals in the green and WCAG 2.2 accessibility.',
  'Sites multilingues': 'Multilingual websites',
  'O site não acompanha a expansão para outros mercados.':
    "The website isn't keeping up with expansion into other markets.",
  'Versões por idioma e mercado, com URLs e SEO próprios.':
    'Versions by language and market, with their own URLs and SEO.',
  Multilingue: 'Multilingual',
  Construção: 'Build',
  Medição: 'Measurement',
  'Que CMS recomendam?': 'Which CMS do you recommend?',
  'Depende da equipa que vai publicar. Usamos Sanity ou Storyblok em sites à medida e WordPress quando a equipa já o conhece.':
    'It depends on the team that will publish. We use Sanity or Storyblok for custom websites and WordPress when the team already knows it.',
  'Recrutamento de developers front-end, back-end, mobile e full-stack, de júnior a arquiteto, avaliados por engenheiros.':
    'Recruitment of front-end, back-end, mobile and full-stack developers, from junior to architect, assessed by engineers.',
  'Contratação permanente': 'Permanent hiring',
  'Entrevista técnica': 'Technical interview',
  Brasil: 'Brazil',
  EUA: 'US',
  'Não encontra developers front-end com experiência real.':
    "You can't find front-end developers with real experience.",
  'Perfis React, Angular e Vue avaliados em exercícios práticos.':
    'React, Angular and Vue profiles assessed through hands-on exercises.',
  'As vagas de back-end ficam meses abertas.': 'Back-end roles stay open for months.',
  'Perfis Java, .NET, Node.js, Python e Go, com avaliação técnica.':
    'Java, .NET, Node.js, Python and Go profiles, with technical assessment.',
  'Perfis mobile seniores são raros no mercado.':
    'Senior mobile profiles are scarce on the market.',
  'Developers iOS, Android, React Native e Flutter.':
    'iOS, Android, React Native and Flutter developers.',
  'Precisa de alguém que faça de tudo numa equipa pequena.':
    'You need someone who can do a bit of everything on a small team.',
  'Perfis full-stack avaliados nas duas pontas.': 'Full-stack profiles assessed on both ends.',
  Arquitetos: 'Architects',
  'Faltam pessoas para decidir a arquitetura dos sistemas.':
    "You lack people to decide your systems' architecture.",
  'Arquitetos de software com experiência em sistemas críticos.':
    'Software architects with experience in critical systems.',
  Sénior: 'Senior',
  'Contratação em volume': 'Volume hiring',
  'Precisa de várias pessoas ao mesmo tempo.': 'You need several people at the same time.',
  'Processos em paralelo para várias vagas, com pontos de situação semanais.':
    'Parallel processes for multiple roles, with weekly status updates.',
  'Quanto tempo demora a shortlist?': 'How long does the shortlist take?',
  '[Prazo médio até à shortlist a confirmar com a equipa de recrutamento.]':
    '[Average time to shortlist to be confirmed with the recruitment team.]',
  'Recrutamento de engenheiros de dados, cientistas de dados e especialistas em machine learning e IA, avaliados tecnicamente.':
    'Recruitment of data engineers, data scientists and machine learning and AI specialists, technically assessed.',
  'Engenheiros de dados': 'Data engineers',
  'Os pipelines de dados dependem de uma só pessoa.':
    'Your data pipelines depend on a single person.',
  'Perfis com Spark, Airflow, Databricks e cloud, avaliados em casos reais.':
    'Profiles with Spark, Airflow, Databricks and cloud, assessed on real cases.',
  'Cientistas de dados': 'Data scientists',
  'Os modelos não saem dos notebooks.': 'Models never leave the notebooks.',
  'Cientistas de dados com experiência em produção e comunicação com o negócio.':
    'Data scientists with production experience who can talk to the business.',
  Estatística: 'Statistics',
  'Engenheiros de IA': 'AI engineers',
  'Precisa de quem leve modelos de linguagem para produção.':
    'You need someone who can take language models to production.',
  'Perfis com LLMs, RAG e agentes, avaliados em projetos práticos.':
    'Profiles with LLMs, RAG and agents, assessed on hands-on projects.',
  'Engenheiros de MLOps': 'MLOps engineers',
  'Os modelos não são monitorizados depois de lançados.': "Models aren't monitored after launch.",
  'Perfis que automatizam treino, deploy e monitorização.':
    'Profiles who automate training, deployment and monitoring.',
  'Analistas e BI': 'Analysts and BI',
  'Os relatórios demoram dias a preparar.': 'Reports take days to prepare.',
  'Analistas com Power BI, SQL e modelação de dados.':
    'Analysts with Power BI, SQL and data modeling.',
  'Lideranças de dados': 'Data leaders',
  'Falta quem defina a estratégia de dados.': 'Nobody owns the data strategy.',
  'Heads of data e data leads com experiência de equipa.':
    'Heads of data and data leads with team experience.',
  Liderança: 'Leadership',
  Estratégia: 'Strategy',
  'Como avaliam perfis de IA?': 'How do you assess AI profiles?',
  'Com um caso prático e uma conversa técnica com um engenheiro de IA da Yellowipe, para separar experiência real de interesse no tema.':
    'With a practical case and a technical conversation with a Yellowipe AI engineer, to tell real experience apart from interest in the topic.',
  'Recrutamento de perfis de infraestrutura, automação e qualidade de software, avaliados nas ferramentas que a sua equipa usa.':
    'Recruitment of infrastructure, automation and software quality profiles, assessed on the tools your team uses.',
  'Engenheiros cloud': 'Cloud engineers',
  'Faltam pessoas certificadas em AWS ou Azure.': 'You lack people certified in AWS or Azure.',
  'Perfis cloud avaliados em arquitetura, redes e custos.':
    'Cloud profiles assessed on architecture, networking and costs.',
  'Engenheiros DevOps': 'DevOps engineers',
  'O pipeline depende de quem o montou e já saiu.':
    'The pipeline depends on someone who built it and has already left.',
  'Perfis com Terraform, Kubernetes e CI/CD.': 'Profiles with Terraform, Kubernetes and CI/CD.',
  'Engenheiros de plataforma e SRE': 'Platform engineers and SRE',
  'Os mesmos incidentes voltam a acontecer em produção.':
    'The same incidents keep happening in production.',
  'Perfis SRE com observabilidade, on-call e automação.':
    'SRE profiles with observability, on-call and automation experience.',
  'Engenheiros de QA automation': 'QA automation engineers',
  'Os testes automáticos não avançam.': "Test automation isn't moving forward.",
  'Perfis com Playwright, Cypress, Selenium e Appium.':
    'Profiles with Playwright, Cypress, Selenium and Appium.',
  'Analistas de testes': 'Test analysts',
  'Faltam pessoas para testar antes dos lançamentos.': 'You lack people to test before releases.',
  'Analistas de testes manuais e de aceitação.': 'Manual and acceptance test analysts.',
  'Testes manuais': 'Manual testing',
  'Precisa de perfis de segurança e não tem como avaliar esses perfis.':
    'You need security profiles and have no way to assess them.',
  'Perfis DevSecOps e de segurança cloud.': 'DevSecOps and cloud security profiles.',
  'Avaliam certificações?': 'Do you assess certifications?',
  'Consideramos as certificações, mas avaliamos sobretudo a experiência prática em entrevista técnica.':
    'We take certifications into account, but we mainly assess hands-on experience in a technical interview.',
  'Recrutamento de tech leads, engineering managers e CTOs com pesquisa direta e confidencial.':
    'Recruitment of tech leads, engineering managers and CTOs through direct, confidential search.',
  'Pesquisa direta · Confidencial': 'Direct search · Confidential',
  Pessoas: 'People',
  'Avaliação de liderança': 'Leadership assessment',
  'Integração acompanhada': 'Supported onboarding',
  'As equipas crescem sem uma referência técnica.':
    'Teams grow without a technical reference point.',
  'Tech leads avaliados em arquitetura, código e liderança de equipas.':
    'Tech leads assessed on architecture, code and team leadership.',
  'Os gestores técnicos não chegam para o número de equipas.':
    "There aren't enough engineering managers for the number of teams.",
  'Engineering managers com experiência em pessoas e entrega.':
    'Engineering managers with experience in people and delivery.',
  'CTOs e heads of engineering': 'CTOs and heads of engineering',
  'Precisa de quem lidere a tecnologia da empresa.':
    "You need someone to lead the company's technology.",
  'Pesquisa direta e discreta de lideranças de topo.': 'Direct, discreet search for top leaders.',
  Executivo: 'Executive',
  'Pesquisa confidencial': 'Confidential search',
  'A vaga não pode ser anunciada.': "The role can't be advertised.",
  'Processos confidenciais, com abordagem direta aos candidatos.':
    'Confidential processes, with direct approach to candidates.',
  Confidencial: 'Confidential',
  'Abordagem direta': 'Direct approach',
  'É difícil avaliar liderança numa entrevista.': 'Leadership is hard to assess in an interview.',
  'Avaliação técnica e de liderança, com casos e referências.':
    'Technical and leadership assessment, with case studies and references.',
  'Acompanhamento da integração': 'Onboarding follow-up',
  'As lideranças novas saem nos primeiros meses.': 'New leaders leave within the first months.',
  'Acompanhamos a integração nos primeiros meses.': 'We follow onboarding during the first months.',
  Retenção: 'Retention',
  'Gestão de equipas': 'Team management',
  Contratação: 'Hiring',
  Técnico: 'Technical',
  'Como garantem a confidencialidade?': 'How do you guarantee confidentiality?',
  'O nome da empresa só é partilhado com candidatos qualificados e com o seu acordo.':
    "The company's name is only shared with qualified candidates and with your consent.",
  'engenheiros de software': 'software engineers',
  'engenheiros de IA': 'AI engineers',
  'engenheiros especializados': 'specialized engineers',
  'engenheiros cloud e DevOps': 'cloud and DevOps engineers',
  'engenheiros de QA': 'QA engineers',
  'designers de produto': 'product designers',
  'profissionais de tecnologia': 'tech professionals',
  'APIs e dados': 'APIs and data',
  Produção: 'Production',
  Perfis: 'Profiles',
  Mercados: 'Markets',
  'Engenheiro full-stack sénior': 'Senior full-stack engineer',
  'Constrói produtos web de ponta a ponta, da API ao front-end, com testes em cada alteração.':
    'Builds web products end to end, from the API to the front end, with tests on every change.',
  'Lidera equipas de produto, define a arquitetura e mantém o ritmo de entrega.':
    'Leads product teams, defines the architecture and keeps delivery on pace.',
  'Engenheira back-end': 'Back-end engineer',
  'Desenha APIs e integrações com sistemas existentes, com atenção à performance.':
    'Designs APIs and integrations with existing systems, with a focus on performance.',
  'Engenheiro mobile': 'Mobile engineer',
  'Entrega apps iOS e Android estáveis, com publicação automatizada nas lojas.':
    'Ships stable iOS and Android apps, with automated publishing to the stores.',
  'Engenheira de IA sénior': 'Senior AI engineer',
  'Leva assistentes e agentes para produção, com avaliação contínua e controlo de custos.':
    'Takes assistants and agents to production, with continuous evaluation and cost control.',
  'Cientista de dados': 'Data scientist',
  'Treina modelos de previsão e classificação e explica os resultados ao negócio.':
    'Trains forecasting and classification models and explains the results to the business.',
  'Engenheiro de MLOps': 'MLOps engineer',
  'Automatiza treino, versões e monitorização dos modelos em cloud.':
    'Automates model training, versioning and monitoring in the cloud.',
  'Engenheiro de dados': 'Data engineer',
  'Prepara os dados que alimentam os modelos, com qualidade e governação.':
    'Prepares the data that feeds the models, with quality and governance.',
  'Engenheiro de sistemas embebidos': 'Embedded systems engineer',
  'Liga sensores e equipamentos à cloud, com firmware e comunicações fiáveis.':
    'Connects sensors and equipment to the cloud, with reliable firmware and communications.',
  'Programador de realidade aumentada': 'Augmented reality developer',
  'Cria experiências imersivas em Unity para formação e apoio técnico no terreno.':
    'Builds immersive experiences in Unity for training and field support.',
  'Engenheira de blockchain': 'Blockchain engineer',
  'Desenha contratos inteligentes auditáveis e integrações com sistemas existentes.':
    'Designs auditable smart contracts and integrations with existing systems.',
  'Engenheiro de plataformas de dados': 'Data platform engineer',
  'Recolhe e processa dados em tempo real e converte esses dados em painéis de operação.':
    'Collects and processes real-time data and turns it into operations dashboards.',
  'Engenheiro DevOps sénior': 'Senior DevOps engineer',
  'Automatiza pipelines e infraestrutura como código, do repositório à produção.':
    'Automates pipelines and infrastructure as code, from repository to production.',
  'Arquiteta cloud': 'Cloud architect',
  'Planeia migrações e arquiteturas na AWS e na Azure, com custos sob controlo.':
    'Plans migrations and architectures on AWS and Azure, with costs under control.',
  'Engenheiro de plataforma': 'Platform engineer',
  'Opera Kubernetes em produção, com observabilidade e recuperação testada.':
    'Runs Kubernetes in production, with observability and tested recovery.',
  'Engenheiro de segurança cloud': 'Cloud security engineer',
  'Integra a segurança no pipeline: análise de código, segredos e conformidade.':
    'Builds security into the pipeline: code analysis, secrets and compliance.',
  'Engenheira de QA automation': 'QA automation engineer',
  'Cria suites automáticas estáveis, ligadas ao pipeline de cada equipa.':
    "Builds stable automated suites wired into each team's pipeline.",
  'Define a estratégia de testes e mede a qualidade de cada lançamento.':
    'Defines the testing strategy and measures the quality of every release.',
  'Engenheiro de testes de performance': 'Performance test engineer',
  'Simula picos de utilização e encontra os gargalos antes dos utilizadores.':
    'Simulates usage peaks and finds bottlenecks before users do.',
  'Analista de testes': 'Test analyst',
  'Faz testes exploratórios e de aceitação com o negócio, com casos documentados.':
    'Runs exploratory and acceptance tests with the business, with documented cases.',
  'Designer de produto sénior': 'Senior product designer',
  'Conduz investigação com utilizadores e traduz os resultados em fluxos e protótipos testados.':
    'Runs user research and turns the findings into tested flows and prototypes.',
  'Designer de interface': 'UI designer',
  'Desenha interfaces acessíveis e mantém o design system em Figma.':
    'Designs accessible interfaces and maintains the design system in Figma.',
  'Investigadora de UX': 'UX researcher',
  'Planeia entrevistas e testes de usabilidade e mede o impacto das mudanças.':
    'Plans interviews and usability tests and measures the impact of changes.',
  'Cria sites e landing pages rápidos, pensados para converter visitas em contactos.':
    'Builds fast websites and landing pages designed to turn visits into leads.',
  'Engenheiro back-end sénior': 'Senior back-end engineer',
  'Perfil apresentado após entrevista técnica com um engenheiro da Yellowipe.':
    'Profile presented after a technical interview with a Yellowipe engineer.',
  'Engenheira de dados': 'Data engineer',
  'Perfil apresentado com notas da avaliação técnica e das condições pretendidas.':
    'Profile presented with technical assessment notes and expected terms.',
  'Perfil de liderança avaliado em competências técnicas e de gestão de equipas.':
    'Leadership profile assessed on technical and team management skills.',
  'Engenheiro DevOps': 'DevOps engineer',
  'Perfil avaliado em infraestrutura como código, pipelines e operação em cloud.':
    'Profile assessed on infrastructure as code, pipelines and cloud operations.',
  'Trabalham com o código e a equipa que já temos?': 'Do you work with our existing code and team?',
  'Sim. Podemos reforçar a sua equipa com especialistas ou assumir um módulo inteiro, sempre no seu repositório e com as suas regras.':
    'Yes. We can augment your team with specialists or take over an entire module, always in your repository and under your rules.',
  'Quem é dono do código?': 'Who owns the code?',
  'A sua empresa. O código fica no seu repositório desde o primeiro dia.':
    'Your company. The code lives in your repository from day one.',
  'Os nossos dados ficam protegidos?': 'Is our data protected?',
  'Sim. Usamos modelos com garantias de privacidade ou alojados na sua cloud, e os dados não são usados para treinar modelos de terceiros.':
    'Yes. We use models with privacy guarantees or hosted in your cloud, and your data is not used to train third-party models.',
  'Como medem se a solução de IA funciona?': 'How do you measure whether the AI solution works?',
  'Com conjuntos de avaliação definidos consigo antes de construir, e com métricas de qualidade e custo em produção.':
    'With evaluation sets defined with you before we build, and with quality and cost metrics in production.',
  'Começam com uma prova de conceito?': 'Do you start with a proof of concept?',
  'Sim, quando o risco técnico é alto. Uma prova de conceito curta mostra se a tecnologia resolve o problema antes de investir no projeto completo.':
    'Yes, when the technical risk is high. A short proof of concept shows whether the technology solves the problem before you invest in the full project.',
  'Integram com os sistemas que já usamos?': 'Do you integrate with the systems we already use?',
  'Sim. Ligamos a solução ao ERP, ao CRM ou às plataformas de dados que a sua empresa já tem.':
    'Yes. We connect the solution to the ERP, CRM or data platforms your company already has.',
  'Trabalham com AWS, Azure e Google Cloud?': 'Do you work with AWS, Azure and Google Cloud?',
  'Sim, com as três. Recomendamos a que melhor serve o seu caso e a que a sua equipa consegue manter.':
    'Yes, with all three. We recommend the one that best fits your case and that your team can maintain.',
  'A infraestrutura fica documentada?': 'Is the infrastructure documented?',
  'Sim. Toda a infraestrutura fica descrita em código, no seu repositório, com a documentação de operação.':
    'Yes. All infrastructure is described in code, in your repository, along with the operations documentation.',
  'Os testes ficam ligados ao nosso pipeline?': 'Are the tests wired into our pipeline?',
  'Sim. Os testes correm automaticamente em cada alteração e os resultados aparecem onde a equipa já trabalha.':
    'Yes. Tests run automatically on every change and the results show up where your team already works.',
  'Combinam testes manuais e automáticos?': 'Do you combine manual and automated testing?',
  'Sim. Automatizamos o que se repete e mantemos testes manuais onde o olhar humano faz diferença.':
    'Yes. We automate what repeats and keep manual testing where a human eye makes a difference.',
  'Entregam ficheiros prontos para desenvolvimento?': 'Do you deliver development-ready files?',
  'Sim. Entregamos em Figma, com componentes, estados e especificações, e acompanhamos a implementação.':
    'Yes. We deliver in Figma, with components, states and specs, and support the implementation.',
  'Testam com utilizadores reais?': 'Do you test with real users?',
  'Sim. Validamos os fluxos com utilizadores antes de passar para desenvolvimento.':
    'Yes. We validate the flows with users before moving to development.',
  'Como avaliam os candidatos?': 'How do you assess candidates?',
  'Com entrevistas técnicas conduzidas por engenheiros e, quando faz sentido, exercícios práticos. Recebe as notas da avaliação com a shortlist.':
    'With technical interviews run by engineers and, when it makes sense, hands-on exercises. You receive the assessment notes with the shortlist.',
  'Recrutam para Portugal e para o Brasil?': 'Do you recruit for Portugal and Brazil?',
  'Sim, nos dois mercados, e também para equipas nos Estados Unidos.':
    'Yes, in both markets, and also for teams in the United States.',
  'Usam ferramentas de IA no trabalho de {name}?': 'Do you use AI tools when working on {name}?',
  'Sim. Usamos assistentes como Claude Code, Cursor e GitHub Copilot para acelerar o trabalho, sempre com revisão por engenheiros seniores e dentro das regras de segurança da sua empresa.':
    "Yes. We use assistants such as Claude Code, Cursor and GitHub Copilot to speed up the work, always with review by senior engineers and within your company's security rules.",
  'Quanto custa?': 'How much does it cost?',
  'Depende do modelo, dos perfis e do âmbito. Enviamos uma proposta depois da primeira conversa.':
    'It depends on the model, the profiles and the scope. We send a proposal after the first call.',
  Conversa: 'First call',
  'Percebemos o objetivo, o contexto e o modelo que faz sentido.':
    'We understand the goal, the context and the model that makes sense.',
  Proposta: 'Proposal',
  'Perfis avaliados ou plano de projeto para {name}.':
    'Assessed profiles or a project plan for {name}.',
  Arranque: 'Kickoff',
  'Onboarding nas suas ferramentas, repositórios e rituais.':
    'Onboarding into your tools, repositories and rituals.',
  'Pontos de situação e métricas de entrega desde a primeira semana.':
    'Status updates and delivery metrics from the first week.',
  'Definimos perfil, stack, senioridade e condições.':
    'We define the profile, stack, seniority and terms.',
  Pesquisa: 'Search',
  'Sourcing ativo e triagem dos candidatos.': 'Active sourcing and candidate screening.',
  'Candidatos avaliados tecnicamente, com notas da avaliação.':
    'Technically assessed candidates, with assessment notes.',
  'Apoiamos entrevistas, proposta e integração.':
    'We support interviews, the offer and onboarding.',
  'Contratar {role}': 'Hire {role}',
  'Recrutamos para contratação permanente, com avaliação técnica feita por engenheiros.':
    'We recruit for permanent hiring, with technical assessment done by engineers.',
  'Encontra, avalia e apresenta': 'Finds, assesses and presents',
  'Contrata e gere o profissional': 'Hires and manages the professional',
  'Abrir uma vaga': 'Open a role',
  'Especialistas na sua equipa': 'Specialists in your team',
  'Especialistas em {name} integrados na sua equipa, com as suas ferramentas e prioridades.':
    '{name} specialists embedded in your team, with your tools and priorities.',
  'Garante as pessoas e a substituição': 'Stands behind the people and replacements',
  'Gere o dia a dia': 'Manages the day-to-day',
  'Pedir perfis': 'Request profiles',
  'Projeto de ponta a ponta': 'End-to-end project',
  'Uma equipa Yellowipe com gestor de projeto entrega {name} e responde pelo resultado.':
    'A Yellowipe team with a project manager delivers {name} and is accountable for the result.',
  'Responde pela entrega': 'Is accountable for delivery',
  'Define objetivos e aprova': 'Sets goals and approves',
  'Falar do projeto': 'Talk about your project',
};
