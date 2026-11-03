import type { z } from 'zod';
import type { Market, Technology } from '../schema';

/** Faixa de stack da home (duas linhas). `ai` mostra a faísca (no mockup v7, só no Claude Code); `highlight` destaca a primeira de cada linha. */
export const technologies: {
  rowA: z.input<typeof Technology>[];
  rowB: z.input<typeof Technology>[];
} = {
  rowA: [
    { name: 'React', highlight: true },
    { name: 'Angular' },
    { name: 'Vue.js' },
    { name: 'Node.js' },
    { name: 'TypeScript' },
    { name: 'JavaScript' },
    { name: 'Python' },
    { name: 'Java' },
    { name: '.NET' },
    { name: 'C#' },
    { name: 'PHP' },
    { name: 'Go' },
  ],
  rowB: [
    { name: 'Claude Code', ai: true, highlight: true },
    { name: 'Swift' },
    { name: 'Kotlin' },
    { name: 'Android' },
    { name: 'iOS' },
    { name: 'Cursor' },
    { name: 'AWS' },
    { name: 'Azure' },
    { name: 'Google Cloud' },
    { name: 'GitHub Copilot' },
    { name: 'Kubernetes' },
    { name: 'Docker' },
    { name: 'Terraform' },
    { name: 'OpenAI Codex' },
  ],
};

/**
 * Tecnologias agrupadas para o menu "Tecnologias" e a página /tecnologias/.
 * `id` é a âncora na página. Sem página própria por tecnologia até haver conteúdo (backlog).
 */
/**
 * Grupos do menu Tecnologias. Cada item é o id de uma stack em
 * content/technologies/stacks.ts; a página da stack é gerada pela máquina de conteúdo.
 * Ordem por procura: vagas Yellowipe no Pipefy (1.216 posições) cruzadas com o
 * Stack Overflow Developer Survey 2025. `menu` limita o mega-menu às mais procuradas;
 * a página Tecnologias mostra todas. Ver docs/14-tecnologias.md.
 * IA e machine learning é um grupo só da página Tecnologias (hubOnly): o menu é um resumo,
 * a página é o portefólio completo. Nas páginas de stack a IA continua discreta.
 */
export const technologyGroups: {
  id: string;
  name: { pt: string; br: string; en: string };
  stackIds: string[];
  menu?: string[];
  /** Só na página Tecnologias (portefólio completo), fora do mega-menu. */
  hubOnly?: boolean;
}[] = [
  {
    id: 'front-end',
    name: { pt: 'Front-end', br: 'Front-end', en: 'Front-end' },
    stackIds: ['react', 'angular', 'nextjs', 'vue', 'typescript'],
  },
  {
    id: 'mobile',
    name: { pt: 'Mobile', br: 'Mobile', en: 'Mobile' },
    stackIds: ['react-native', 'flutter', 'ios-swift', 'android-kotlin'],
  },
  {
    id: 'back-end',
    name: { pt: 'Back-end', br: 'Back-end', en: 'Back-end' },
    stackIds: ['java', 'python', 'dotnet', 'nodejs', 'php', 'go'],
  },
  {
    id: 'cloud-devops',
    name: { pt: 'Cloud e DevOps', br: 'Cloud e DevOps', en: 'Cloud and DevOps' },
    stackIds: ['aws', 'azure', 'google-cloud', 'kubernetes', 'docker', 'terraform'],
  },
  {
    id: 'dados',
    name: { pt: 'Dados', br: 'Dados', en: 'Data' },
    stackIds: [
      'power-bi',
      'databricks',
      'spark',
      'airflow',
      'kafka',
      'postgresql',
      'sql-server',
      'oracle',
      'mongodb',
    ],
    menu: ['power-bi', 'databricks', 'spark', 'airflow', 'kafka', 'postgresql'],
  },
  {
    id: 'ia',
    name: {
      pt: 'IA e machine learning',
      br: 'IA e machine learning',
      en: 'AI and machine learning',
    },
    stackIds: ['openai', 'claude', 'langchain', 'hugging-face', 'pytorch'],
    hubOnly: true,
  },
  {
    id: 'enterprise',
    name: { pt: 'ERP, CRM e low-code', br: 'ERP, CRM e low-code', en: 'ERP, CRM and low-code' },
    stackIds: ['salesforce', 'sap', 'outsystems'],
  },
  {
    id: 'qa',
    name: { pt: 'Qualidade e testes', br: 'Qualidade e testes', en: 'Quality and testing' },
    stackIds: ['playwright', 'selenium', 'cypress', 'appium', 'jmeter', 'postman'],
  },
];

export const markets: z.input<typeof Market>[] = [
  {
    id: 'PT',
    name: { pt: 'Portugal', br: 'Portugal', en: 'Portugal' },
    description: {
      pt: 'Recrutamento, equipas e entrega de projetos para empresas portuguesas e europeias.',
      br: 'Recrutamento, equipes e entrega de projetos para empresas portuguesas e europeias.',
      en: 'Recruitment, teams and project delivery for Portuguese and European companies.',
    },
    flag: '/images/flags/pt.png',
  },
  {
    id: 'BR',
    name: { pt: 'Brasil', br: 'Brasil', en: 'Brazil' },
    description: {
      pt: 'Talento e capacidade de entrega para empresas brasileiras, com casos como a Hapvida.',
      br: 'Talento e capacidade de entrega para empresas brasileiras, com cases como a Hapvida.',
      en: 'Talent and delivery capacity for Brazilian companies, with cases such as Hapvida.',
    },
    flag: '/images/flags/br.png',
  },
  {
    id: 'US',
    name: { pt: 'Estados Unidos', br: 'Estados Unidos', en: 'United States' },
    description: {
      pt: 'Equipas e projetos para empresas norte-americanas, com talento dos três mercados.',
      br: 'Equipes e projetos para empresas norte-americanas, com talento dos três mercados.',
      en: 'Nearshore teams and projects for US companies, with talent from Portugal and Brazil.',
    },
    flag: '/images/flags/us.png',
  },
];

/** Logos de clientes da home. `displayHeight` = altura em px no mockup v7 (equilíbrio ótico). Confirmar autorização de uso de marca de cada um (R-09). */
export const clientLogos = [
  {
    name: 'MC Sonae',
    src: '/images/clients/mc-sonae.png',
    width: 460,
    height: 160,
    displayHeight: 30,
  },
  { name: 'Sky', src: '/images/clients/sky.png', width: 240, height: 146, displayHeight: 30 },
  { name: 'Sword', src: '/images/clients/sword.png', width: 604, height: 160, displayHeight: 26 },
  { name: 'Efacec', src: '/images/clients/efacec.png', width: 500, height: 160, displayHeight: 26 },
  { name: 'Linde', src: '/images/clients/linde.png', width: 517, height: 160, displayHeight: 30 },
  { name: 'Xing', src: '/images/clients/xing.png', width: 420, height: 122, displayHeight: 24 },
  {
    name: 'Medicare',
    src: '/images/clients/medicare.png',
    width: 560,
    height: 130,
    displayHeight: 24,
  },
  { name: 'Zühlke', src: '/images/clients/zuhlke.png', width: 420, height: 160, displayHeight: 32 },
  {
    name: 'Clever Advertising',
    src: '/images/clients/clever-advertising.png',
    width: 500,
    height: 160,
    displayHeight: 28,
  },
] as const;

/**
 * Logótipos da secção "Tecnologias" das páginas de modelo (mockup modelo-v2): três linhas
 * em faixa contínua. `ai` marca as ferramentas de desenvolvimento com IA (faísca).
 */
export const modelStackLogos = [
  [
    { name: 'React', logo: '/images/tech/react.svg' },
    { name: 'Angular', logo: '/images/tech/angular.svg' },
    { name: 'Vue.js', logo: '/images/tech/vue.svg' },
    { name: 'TypeScript', logo: '/images/tech/typescript.svg' },
    { name: 'JavaScript', logo: '/images/tech/javascript.svg' },
    { name: 'Node.js', logo: '/images/tech/node.svg' },
    { name: 'Python', logo: '/images/tech/python.svg' },
    { name: 'Java', logo: '/images/tech/java.svg' },
  ],
  [
    { name: '.NET', logo: '/images/tech/dotnet.svg' },
    { name: 'C#', logo: '/images/tech/csharp.svg' },
    { name: 'Go', logo: '/images/tech/go.svg' },
    { name: 'Swift', logo: '/images/tech/swift.svg' },
    { name: 'Kotlin', logo: '/images/tech/kotlin.svg' },
    { name: 'iOS', logo: '/images/tech/ios.svg' },
    { name: 'Amazon Web Services', logo: '/images/tech/aws.svg' },
    { name: 'Azure', logo: '/images/tech/azure.svg' },
  ],
  [
    { name: 'Google Cloud', logo: '/images/tech/gcp.svg' },
    { name: 'Kubernetes', logo: '/images/tech/kubernetes.svg' },
    { name: 'Terraform', logo: '/images/tech/terraform.svg' },
    { name: 'Claude Code', logo: '/images/tech/claude.svg', ai: true },
    { name: 'Cursor', logo: '/images/tech/cursor.svg', ai: true },
    { name: 'GitHub Copilot', logo: '/images/tech/copilot.svg', ai: true },
    { name: 'OpenAI Codex', logo: '/images/tech/openai.svg', ai: true },
  ],
] as const;

/**
 * "Quem faz o quê": quem responde por cada tarefa em cada modelo.
 * y = Yellowipe, c = a empresa cliente. Igual nas três páginas de modelo.
 */
export const responsibilities = [
  {
    label: {
      pt: 'Encontrar e avaliar o profissional',
      br: 'Encontrar e avaliar o profissional',
      en: 'Finding and assessing the professional',
    },
    owner: { contrate: 'y', reforce: 'y', construa: 'y' },
  },
  {
    label: {
      pt: 'Contrato do profissional',
      br: 'Contrato do profissional',
      en: "The professional's contract",
    },
    owner: { contrate: 'c', reforce: 'y', construa: 'y' },
  },
  {
    label: { pt: 'Gestão do dia a dia', br: 'Gestão do dia a dia', en: 'Day-to-day management' },
    owner: { contrate: 'c', reforce: 'c', construa: 'y' },
  },
  {
    label: {
      pt: 'Responsabilidade pela entrega',
      br: 'Responsabilidade pela entrega',
      en: 'Accountability for delivery',
    },
    owner: { contrate: 'c', reforce: 'c', construa: 'y' },
  },
  {
    label: {
      pt: 'Acompanhamento e substituição',
      br: 'Acompanhamento e substituição',
      en: 'Follow-up and replacement',
    },
    owner: { contrate: 'y', reforce: 'y', construa: 'y' },
  },
] as const;
