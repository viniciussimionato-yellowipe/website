import type { ModelId } from '../schema';

/**
 * Modelos de texto da máquina de conteúdo por serviço (mesmo mecanismo de
 * content/technologies; ver docs/15-servicos.md).
 *
 * - {name} = nome do serviço em minúscula quando é um nome comum ("aplicações web",
 *   mas "IoT" e "DevOps e DevSecOps" mantêm-se); {role} = quem trabalha na área.
 * - Escrito em pt-PT; o pt-BR é gerado por ptToBr() e revisto por amostragem.
 *   Não há páginas de serviço em inglês (não existe /en/services).
 * - O que muda de serviço para serviço está em ./pages.ts; aqui fica o que é da área.
 */
export type AreaId =
  'software' | 'ia' | 'emergentes' | 'cloud-devops' | 'qualidade' | 'design' | 'recrutamento';

type ProfileTpl = {
  role: string;
  bio: string;
  years: number;
  city: string;
  market: 'PT' | 'BR';
  model: ModelId;
};
type FaqTpl = { q: string; a: string };

/** Quem trabalha em cada área (para frases dos modelos). */
export const ROLE: Record<AreaId, string> = {
  software: 'engenheiros de software',
  ia: 'engenheiros de IA',
  emergentes: 'engenheiros especializados',
  'cloud-devops': 'engenheiros cloud e DevOps',
  qualidade: 'engenheiros de QA',
  design: 'designers de produto',
  recrutamento: 'profissionais de tecnologia',
};

/** Etiquetas das cinco camadas do cartão do topo. */
export const LAYERS: Record<AreaId, string[]> = {
  software: ['Produto', 'Interface', 'APIs e dados', 'Qualidade', 'Entrega'],
  ia: ['Dados', 'Modelos', 'Orquestração', 'Avaliação', 'Produção'],
  emergentes: ['Dispositivos', 'Plataforma', 'Dados', 'Integrações', 'Operação'],
  'cloud-devops': ['Código', 'Pipeline', 'Infraestrutura', 'Segurança', 'Observabilidade'],
  qualidade: ['Estratégia', 'Testes', 'Ferramentas', 'Execução', 'Relatórios'],
  design: ['Investigação', 'Fluxos', 'Interface', 'Sistema', 'Entrega'],
  recrutamento: ['Perfis', 'Stack', 'Avaliação', 'Mercados', 'Integração'],
};

/** Perfis ilustrativos por área (a página diz que são ilustrativos). */
export const PROFILES: Record<AreaId, ProfileTpl[]> = {
  software: [
    {
      role: 'Engenheiro full-stack sénior',
      bio: 'Constrói produtos web de ponta a ponta, da API ao front-end, com testes em cada alteração.',
      years: 9,
      city: 'Lisboa',
      market: 'PT',
      model: 'reforce',
    },
    {
      role: 'Tech lead',
      bio: 'Lidera equipas de produto, define a arquitetura e mantém o ritmo de entrega.',
      years: 12,
      city: 'São Paulo',
      market: 'BR',
      model: 'construa',
    },
    {
      role: 'Engenheira back-end',
      bio: 'Desenha APIs e integrações com sistemas existentes, com atenção à performance.',
      years: 7,
      city: 'Porto',
      market: 'PT',
      model: 'reforce',
    },
    {
      role: 'Engenheiro mobile',
      bio: 'Entrega apps iOS e Android estáveis, com publicação automatizada nas lojas.',
      years: 6,
      city: 'Recife',
      market: 'BR',
      model: 'construa',
    },
  ],
  ia: [
    {
      role: 'Engenheira de IA sénior',
      bio: 'Leva assistentes e agentes para produção, com avaliação contínua e controlo de custos.',
      years: 8,
      city: 'Lisboa',
      market: 'PT',
      model: 'construa',
    },
    {
      role: 'Cientista de dados',
      bio: 'Treina modelos de previsão e classificação e explica os resultados ao negócio.',
      years: 7,
      city: 'Florianópolis',
      market: 'BR',
      model: 'reforce',
    },
    {
      role: 'Engenheiro de MLOps',
      bio: 'Automatiza treino, versões e monitorização dos modelos em cloud.',
      years: 6,
      city: 'Porto',
      market: 'PT',
      model: 'reforce',
    },
    {
      role: 'Engenheiro de dados',
      bio: 'Prepara os dados que alimentam os modelos, com qualidade e governação.',
      years: 9,
      city: 'São Paulo',
      market: 'BR',
      model: 'construa',
    },
  ],
  emergentes: [
    {
      role: 'Engenheiro de sistemas embebidos',
      bio: 'Liga sensores e equipamentos à cloud, com firmware e comunicações fiáveis.',
      years: 10,
      city: 'Braga',
      market: 'PT',
      model: 'construa',
    },
    {
      role: 'Programador de realidade aumentada',
      bio: 'Cria experiências imersivas em Unity para formação e apoio técnico no terreno.',
      years: 6,
      city: 'Lisboa',
      market: 'PT',
      model: 'reforce',
    },
    {
      role: 'Engenheira de blockchain',
      bio: 'Desenha contratos inteligentes auditáveis e integrações com sistemas existentes.',
      years: 7,
      city: 'São Paulo',
      market: 'BR',
      model: 'construa',
    },
    {
      role: 'Engenheiro de plataformas de dados',
      bio: 'Recolhe e processa dados em tempo real e converte esses dados em painéis de operação.',
      years: 8,
      city: 'Campinas',
      market: 'BR',
      model: 'reforce',
    },
  ],
  'cloud-devops': [
    {
      role: 'Engenheiro DevOps sénior',
      bio: 'Automatiza pipelines e infraestrutura como código, do repositório à produção.',
      years: 9,
      city: 'Porto',
      market: 'PT',
      model: 'reforce',
    },
    {
      role: 'Arquiteta cloud',
      bio: 'Planeia migrações e arquiteturas na AWS e na Azure, com custos sob controlo.',
      years: 12,
      city: 'Lisboa',
      market: 'PT',
      model: 'construa',
    },
    {
      role: 'Engenheiro de plataforma',
      bio: 'Opera Kubernetes em produção, com observabilidade e recuperação testada.',
      years: 8,
      city: 'Belo Horizonte',
      market: 'BR',
      model: 'reforce',
    },
    {
      role: 'Engenheiro de segurança cloud',
      bio: 'Integra a segurança no pipeline: análise de código, segredos e conformidade.',
      years: 7,
      city: 'São Paulo',
      market: 'BR',
      model: 'construa',
    },
  ],
  qualidade: [
    {
      role: 'Engenheira de QA automation',
      bio: 'Cria suites automáticas estáveis, ligadas ao pipeline de cada equipa.',
      years: 8,
      city: 'Lisboa',
      market: 'PT',
      model: 'reforce',
    },
    {
      role: 'QA lead',
      bio: 'Define a estratégia de testes e mede a qualidade de cada lançamento.',
      years: 11,
      city: 'São Paulo',
      market: 'BR',
      model: 'construa',
    },
    {
      role: 'Engenheiro de testes de performance',
      bio: 'Simula picos de utilização e encontra os gargalos antes dos utilizadores.',
      years: 7,
      city: 'Porto',
      market: 'PT',
      model: 'reforce',
    },
    {
      role: 'Analista de testes',
      bio: 'Faz testes exploratórios e de aceitação com o negócio, com casos documentados.',
      years: 5,
      city: 'Curitiba',
      market: 'BR',
      model: 'reforce',
    },
  ],
  design: [
    {
      role: 'Designer de produto sénior',
      bio: 'Conduz investigação com utilizadores e traduz os resultados em fluxos e protótipos testados.',
      years: 9,
      city: 'Lisboa',
      market: 'PT',
      model: 'construa',
    },
    {
      role: 'Designer de interface',
      bio: 'Desenha interfaces acessíveis e mantém o design system em Figma.',
      years: 6,
      city: 'São Paulo',
      market: 'BR',
      model: 'reforce',
    },
    {
      role: 'Investigadora de UX',
      bio: 'Planeia entrevistas e testes de usabilidade e mede o impacto das mudanças.',
      years: 7,
      city: 'Porto',
      market: 'PT',
      model: 'reforce',
    },
    {
      role: 'Web designer',
      bio: 'Cria sites e landing pages rápidos, pensados para converter visitas em contactos.',
      years: 5,
      city: 'Recife',
      market: 'BR',
      model: 'construa',
    },
  ],
  recrutamento: [
    {
      role: 'Engenheiro back-end sénior',
      bio: 'Perfil apresentado após entrevista técnica com um engenheiro da Yellowipe.',
      years: 8,
      city: 'Lisboa',
      market: 'PT',
      model: 'contrate',
    },
    {
      role: 'Engenheira de dados',
      bio: 'Perfil apresentado com notas da avaliação técnica e das condições pretendidas.',
      years: 6,
      city: 'São Paulo',
      market: 'BR',
      model: 'contrate',
    },
    {
      role: 'Engineering manager',
      bio: 'Perfil de liderança avaliado em competências técnicas e de gestão de equipas.',
      years: 13,
      city: 'Porto',
      market: 'PT',
      model: 'contrate',
    },
    {
      role: 'Engenheiro DevOps',
      bio: 'Perfil avaliado em infraestrutura como código, pipelines e operação em cloud.',
      years: 7,
      city: 'Belo Horizonte',
      market: 'BR',
      model: 'contrate',
    },
  ],
};

/** Duas perguntas próprias de cada área. */
export const FAQ_AREA: Record<AreaId, FaqTpl[]> = {
  software: [
    {
      q: 'Trabalham com o código e a equipa que já temos?',
      a: 'Sim. Podemos reforçar a sua equipa com especialistas ou assumir um módulo inteiro, sempre no seu repositório e com as suas regras.',
    },
    {
      q: 'Quem é dono do código?',
      a: 'A sua empresa. O código fica no seu repositório desde o primeiro dia.',
    },
  ],
  ia: [
    {
      q: 'Os nossos dados ficam protegidos?',
      a: 'Sim. Usamos modelos com garantias de privacidade ou alojados na sua cloud, e os dados não são usados para treinar modelos de terceiros.',
    },
    {
      q: 'Como medem se a solução de IA funciona?',
      a: 'Com conjuntos de avaliação definidos consigo antes de construir, e com métricas de qualidade e custo em produção.',
    },
  ],
  emergentes: [
    {
      q: 'Começam com uma prova de conceito?',
      a: 'Sim, quando o risco técnico é alto. Uma prova de conceito curta mostra se a tecnologia resolve o problema antes de investir no projeto completo.',
    },
    {
      q: 'Integram com os sistemas que já usamos?',
      a: 'Sim. Ligamos a solução ao ERP, ao CRM ou às plataformas de dados que a sua empresa já tem.',
    },
  ],
  'cloud-devops': [
    {
      q: 'Trabalham com AWS, Azure e Google Cloud?',
      a: 'Sim, com as três. Recomendamos a que melhor serve o seu caso e a que a sua equipa consegue manter.',
    },
    {
      q: 'A infraestrutura fica documentada?',
      a: 'Sim. Toda a infraestrutura fica descrita em código, no seu repositório, com a documentação de operação.',
    },
  ],
  qualidade: [
    {
      q: 'Os testes ficam ligados ao nosso pipeline?',
      a: 'Sim. Os testes correm automaticamente em cada alteração e os resultados aparecem onde a equipa já trabalha.',
    },
    {
      q: 'Combinam testes manuais e automáticos?',
      a: 'Sim. Automatizamos o que se repete e mantemos testes manuais onde o olhar humano faz diferença.',
    },
  ],
  design: [
    {
      q: 'Entregam ficheiros prontos para desenvolvimento?',
      a: 'Sim. Entregamos em Figma, com componentes, estados e especificações, e acompanhamos a implementação.',
    },
    {
      q: 'Testam com utilizadores reais?',
      a: 'Sim. Validamos os fluxos com utilizadores antes de passar para desenvolvimento.',
    },
  ],
  recrutamento: [
    {
      q: 'Como avaliam os candidatos?',
      a: 'Com entrevistas técnicas conduzidas por engenheiros e, quando faz sentido, exercícios práticos. Recebe as notas da avaliação com a shortlist.',
    },
    {
      q: 'Recrutam para Portugal e para o Brasil?',
      a: 'Sim, nos dois mercados, e também para equipas nos Estados Unidos.',
    },
  ],
};

/** Perguntas comuns a todas as páginas de serviço (a da IA fica aqui, de forma discreta). */
export const FAQ_COMMON: FaqTpl[] = [
  {
    q: 'Usam ferramentas de IA no trabalho de {name}?',
    a: 'Sim. Usamos assistentes como Claude Code, Cursor e GitHub Copilot para acelerar o trabalho, sempre com revisão por engenheiros seniores e dentro das regras de segurança da sua empresa.',
  },
  {
    q: 'Quanto custa?',
    a: 'Depende do modelo, dos perfis e do âmbito. Enviamos uma proposta depois da primeira conversa.',
  },
];

/** Como começamos: igual em todas as áreas, exceto no recrutamento. */
export const STEPS: { t: string; x: string }[] = [
  { t: 'Conversa', x: 'Percebemos o objetivo, o contexto e o modelo que faz sentido.' },
  { t: 'Proposta', x: 'Perfis avaliados ou plano de projeto para {name}.' },
  { t: 'Arranque', x: 'Onboarding nas suas ferramentas, repositórios e rituais.' },
  {
    t: 'Acompanhamento',
    x: 'Pontos de situação e métricas de entrega desde a primeira semana.',
  },
];

export const STEPS_RECRUITMENT: { t: string; x: string }[] = [
  { t: 'Briefing', x: 'Definimos perfil, stack, senioridade e condições.' },
  { t: 'Pesquisa', x: 'Sourcing ativo e triagem dos candidatos.' },
  { t: 'Shortlist', x: 'Candidatos avaliados tecnicamente, com notas da avaliação.' },
  { t: 'Contratação', x: 'Apoiamos entrevistas, proposta e integração.' },
];

/** Os três modelos aplicados ao serviço (só os modelos em que o serviço existe). */
export const MODELS: {
  id: ModelId;
  title: string;
  text: string;
  yw: string;
  cl: string;
  cta: string;
}[] = [
  {
    id: 'contrate',
    title: 'Contratar {role}',
    text: 'Recrutamos para contratação permanente, com avaliação técnica feita por engenheiros.',
    yw: 'Encontra, avalia e apresenta',
    cl: 'Contrata e gere o profissional',
    cta: 'Abrir uma vaga',
  },
  {
    id: 'reforce',
    title: 'Especialistas na sua equipa',
    text: 'Especialistas em {name} integrados na sua equipa, com as suas ferramentas e prioridades.',
    yw: 'Garante as pessoas e a substituição',
    cl: 'Gere o dia a dia',
    cta: 'Pedir perfis',
  },
  {
    id: 'construa',
    title: 'Projeto de ponta a ponta',
    text: 'Uma equipa Yellowipe com gestor de projeto entrega {name} e responde pelo resultado.',
    yw: 'Responde pela entrega',
    cl: 'Define objetivos e aprova',
    cta: 'Falar do projeto',
  },
];

/**
 * pt-PT → pt-BR próprio dos serviços, aplicado antes do glossário partilhado (ptToBr).
 * Frases primeiro; cada entrada só troca palavras inteiras.
 */
export const BR_SERVICES: [string, string][] = [
  ['Quanto tempo demora', 'Quanto tempo leva'],
  ['Que tecnologia recomendam', 'Que tecnologia vocês recomendam'],
  ['Que CMS recomendam', 'Que CMS vocês recomendam'],
  ['Gestão de equipas', 'Gestão de equipes'],
  ['pontos de situação', 'reuniões de status'],
  ['Pontos de situação', 'Reuniões de status'],
  ['testes automáticos', 'testes automatizados'],
  ['Testes automáticos', 'Testes automatizados'],
  ['suites automáticas', 'suítes automatizadas'],
  ['Suites automáticas', 'Suítes automatizadas'],
  ['publicação automática', 'publicação automatizada'],
  ['sistema operativo', 'sistema operacional'],
  ['autenticação única', 'login único'],
  ['à medida', 'sob medida'],
  ['à partida', 'no início'],
  ['a meio do', 'no meio do'],
  ['no browser', 'no navegador'],
  ['browsers', 'navegadores'],
  ['faturação', 'faturamento'],
  ['partilhados', 'compartilhados'],
  ['partilhadas', 'compartilhadas'],
  ['partilhado', 'compartilhado'],
  ['partilhada', 'compartilhada'],
  ['partilham', 'compartilham'],
  ['consigo', 'com você'],
  ['utilizador', 'usuário'],
  ['Telemóveis', 'Celulares'],
  ['telemóveis', 'celulares'],
  ['registos', 'registros'],
  ['Controlo', 'Controle'],
  ['monitorizar', 'monitorar'],
  ['Monitorização', 'Monitoramento'],
  ['planeamento', 'planejamento'],
  ['Planeamento', 'Planejamento'],
  ['artefactos', 'artefatos'],
  ['Artefactos', 'Artefatos'],
  ['contactos', 'contatos'],
  ['Sénior', 'Sênior'],
  ['Recolhe', 'Coleta'],
  ['recolhe', 'coleta'],
  ['equipa', 'equipe'],
  ['ecrã', 'tela'],
];

/** Perguntas que em pt-BR pedem sujeito ("Vocês usam…?"). */
export const BR_QUESTION_VERBS = [
  'Usam',
  'Trabalham',
  'Recrutam',
  'Podem',
  'Integram',
  'Começam',
  'Avaliam',
  'Testam',
  'Entregam',
  'Publicam',
  'Combinam',
];
