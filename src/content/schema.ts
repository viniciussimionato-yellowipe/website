import { z } from 'zod';

/**
 * Modelo de conteúdo (docs/04-conteudo-e-cms.md). Estes esquemas são o contrato
 * entre o site e qualquer fonte de conteúdo: hoje ficheiros locais, amanhã o CMS
 * escolhido (Sanity ou Storyblok). O adaptador do CMS tem de devolver dados que
 * passem nestes esquemas.
 */

const text = z.string().min(1);
const localized = <T extends z.ZodTypeAny>(inner: T) =>
  z.object({
    pt: inner,
    br: inner.optional(),
    en: inner.optional(),
    'en-gb': inner.optional(),
  });

export const LocalizedText = localized(text);
export const LocalizedList = localized(z.array(text).min(1));

/** Slug: minúsculas, números e hífenes, sem acentos. */
export const Slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'slug inválido');
export const LocalizedSlug = localized(Slug);

export const Status = z.enum(['draft', 'published']);
export const ModelId = z.enum(['contrate', 'reforce', 'construa']);
export const MarketId = z.enum(['PT', 'BR', 'US']);

export const Seo = z.object({
  title: LocalizedText,
  description: LocalizedText,
  /** Força noindex (ex.: página programática sem dados suficientes). */
  noindex: z.boolean().optional(),
});

export const FaqItem = z.object({ q: LocalizedText, a: LocalizedText });

export const Metric = z.object({ value: text, label: LocalizedText });

export const CaseStudy = z.object({
  id: Slug,
  status: Status,
  client: text,
  sector: text,
  market: MarketId,
  slug: LocalizedSlug,
  headline: LocalizedText,
  summary: LocalizedText,
  challenge: LocalizedText.optional(),
  solution: LocalizedText.optional(),
  metrics: z.array(Metric).min(1),
  serviceIds: z.array(Slug),
  areaIds: z.array(Slug).min(1),
  models: z.array(ModelId).min(1),
  image: text,
  /** cover: captura de ecrã a encher o cartão; contain: imagem de app centrada em baixo (Hapvida). */
  imageFit: z.enum(['cover', 'contain']).default('cover'),
  logo: text,
  /** Autorização escrita do cliente para publicar (R-09). Sem isto, não publica. */
  clientApproved: z.boolean(),
  seo: Seo,
});

/** Ícones dos benefícios na página de modelo (desenhos em components/ui/icons.tsx). */
export const BenefitIcon = z.enum([
  'team',
  'puzzle',
  'scale',
  'clock',
  'swap',
  'chart',
  'search',
  'check',
  'globe',
  'target',
  'eye',
  'layers',
  'spark',
  'loop',
]);

const Person = z.object({ initials: text, name: text, meta: text, stage: text });

/**
 * Textos da ilustração do topo (v4): quem trabalha → o trabalho → o resultado.
 * É decorativa (aria-hidden), mas os textos são de conteúdo e diferem entre pt e br.
 */
const VizBase = { actor: text, actorNote: text, waiting: text, doneTitle: text, doneNote: text };
export const ModelViz = z.discriminatedUnion('scene', [
  z.object({
    scene: z.literal('contrate'),
    ...VizBase,
    working: text,
    ready: text,
    job: text,
    stages: z.array(text).length(3),
    /** O primeiro é o escolhido; o seu `stage` aparece como selo final. */
    candidates: z.array(Person).length(4),
  }),
  z.object({
    scene: z.literal('reforce'),
    ...VizBase,
    consultants: z.array(text).length(2),
    team: text,
    sprint: text,
    members: z.array(text).length(3),
    capacity: text,
    deliveries: text,
  }),
  z.object({
    scene: z.literal('construa'),
    ...VizBase,
    lead: text,
    product: text,
    disciplines: z.array(z.object({ initials: text, label: text })).length(4),
    live: text,
  }),
]);

const Tone = z.enum(['good', 'mid', 'bad']);

/** Textos da página de modelo (mockup modelo-v2, ilustração V4). */
export const ModelPageCopy = z.object({
  /** Frase curta para o cartão "Também disponível" das outras páginas. */
  tagline: text,
  hero: z.object({
    h1: text,
    h1Highlight: text,
    lead: text,
    badges: z.array(text).min(1),
    cta: text,
    vizLabel: text,
  }),
  viz: ModelViz,
  whoLead: text,
  why: z.object({
    eyebrow: text,
    title: text,
    lead: text,
    items: z.array(z.object({ icon: BenefitIcon, title: text, text: text })).min(3),
  }),
  formats: z.object({
    title: text,
    lead: text,
    items: z
      .array(z.object({ tag: text, title: text, text: text, ticks: z.array(text).min(1) }))
      .min(1),
  }),
  steps: z.object({ title: text, lead: text }),
  stack: z.object({ title: text, lead: text, cta: text }),
  comparison: z.object({
    title: text,
    columns: z.array(text).length(3),
    rows: z
      .array(z.object({ label: text, cells: z.array(z.object({ tone: Tone, text })).length(3) }))
      .min(1),
  }),
  faqTitle: text,
  finalTitle: text,
});

export const Model = z.object({
  id: ModelId,
  status: Status,
  name: LocalizedText,
  slug: LocalizedSlug,
  keyword: LocalizedText,
  promise: LocalizedText,
  idealFor: LocalizedText,
  howItWorks: localized(z.array(z.object({ title: text, text: text })).min(3)),
  caseIds: z.array(Slug),
  faq: z.array(FaqItem),
  page: localized(ModelPageCopy),
  seo: Seo,
});

/** Uma oferta do serviço: começa num problema do cliente e termina no que fazemos. */
const Offering = z.object({
  title: text,
  pain: text,
  text,
  tags: z.array(text).min(1).max(3),
});

export const ServicePageFacts = z.object({
  /** Uma frase própria do serviço para o topo da página. */
  pitch: text,
  /** Nota curta no cartão do topo (ex.: "Web · APIs · SaaS"). */
  note: text,
  /** Cinco camadas do cartão do topo, pela ordem das etiquetas da área. */
  layers: z.array(z.array(text).min(1).max(4)).length(5),
  offerings: z.array(Offering).length(6),
  /** Tecnologias com página própria (content/technologies): ligações cruzadas. */
  stackIds: z.array(Slug).min(3),
  /** Ferramentas por grupo: [nome do grupo, ferramentas]. */
  tools: z.array(z.tuple([text, z.array(text).min(2)])).min(3),
  /** Competências mostradas nos perfis. */
  skills: z.array(text).min(4),
  faq: z.array(z.object({ q: text, a: text })).min(1),
  caseIds: z.array(Slug).default([]),
  related: z.array(Slug).min(2),
});

export const Service = z.object({
  id: Slug,
  areaId: Slug,
  status: Status,
  name: LocalizedText,
  slug: LocalizedSlug,
  keyword: LocalizedText,
  summary: LocalizedText,
  models: z.array(ModelId).min(1),
  /**
   * Factos da página do serviço (máquina de conteúdo, docs/15-servicos.md). Só serviços
   * com página e status "published" são gerados. Texto em pt-PT; o pt-BR sai de ptToBr().
   */
  page: ServicePageFacts.optional(),
  seo: Seo,
});

export const Area = z.object({
  id: Slug,
  name: LocalizedText,
  tabLabel: LocalizedText,
  description: LocalizedText,
  ai: LocalizedText,
  serviceIds: z.array(Slug).min(1),
  models: z.array(ModelId).min(1),
  proof: LocalizedText.optional(),
});

export const Technology = z.object({
  name: text,
  ai: z.boolean().default(false),
  highlight: z.boolean().default(false),
});

/**
 * Página de tecnologia (máquina de conteúdo por stack, docs/14-tecnologias.md).
 * Cada stack guarda só os factos próprios; o texto das secções vem dos modelos
 * da categoria (content/technologies/templates.ts) e é montado em build.ts.
 */
export const TechCategory = z.enum([
  'front-end',
  'mobile',
  'back-end',
  'cloud',
  'devops',
  'data',
  'database',
  'enterprise',
  'ai',
  'qa',
]);
export const TechStack = z.object({
  id: Slug,
  status: Status,
  /** Nome como aparece no menu e no título (ex.: ".NET", "React"). */
  name: text,
  /** Nome curto para frases ("especialistas em {short}"); por omissão = name. */
  short: text.optional(),
  slug: Slug,
  category: TechCategory,
  /** Logótipo em public/images/tech (fontes e licenças no README da pasta). */
  logo: text.optional(),
  /** Como chamar quem trabalha com a stack (ex.: "especialistas Power BI"). Por omissão: modelo da categoria. */
  role: z.object({ pt: text, en: text }).optional(),
  /** Palavra-chave principal por idioma (H1 e título SEO). Por omissão: modelo da categoria. */
  keyword: z.object({ pt: text.optional(), en: text.optional() }).optional(),
  /** Uma frase própria da stack para o topo da página. */
  pitch: z.object({ pt: text, en: text }),
  /** Versão ou nota técnica curta no cartão do topo (ex.: ".NET 8 · C# 12"). */
  version: text,
  /** Cinco camadas do cartão do topo, pela ordem das etiquetas da categoria. */
  layers: z.array(z.array(text).min(1).max(4)).length(5),
  /** Ferramentas por grupo (ids de grupo em templates.ts). */
  tools: z.array(z.tuple([text, z.array(text).min(2)])).min(4),
  /** Etiquetas por serviço da categoria (id do serviço → 2 ou 3 etiquetas). */
  serviceTags: z.record(z.string(), z.array(text).min(1).max(3)),
  /**
   * Afinação de serviços da categoria para esta stack (ex.: JMeter troca "Automação de testes"
   * por "Testes de carga e stress"). Só se escreve o que muda.
   */
  serviceOverrides: z
    .record(
      z.string(),
      z.object({
        title: z.object({ pt: text, en: text }).optional(),
        pain: z.object({ pt: text, en: text }).optional(),
        text: z.object({ pt: text, en: text }).optional(),
      }),
    )
    .default({}),
  /** Competências mostradas nos perfis (a stack primeiro). */
  skills: z.array(text).min(4),
  /** Perguntas próprias da stack (aparecem antes das da categoria e das comuns). */
  faq: z
    .array(z.object({ q: z.object({ pt: text, en: text }), a: z.object({ pt: text, en: text }) }))
    .default([]),
  related: z.array(Slug),
  caseIds: z.array(Slug).default([]),
});

export const Market = z.object({
  id: MarketId,
  name: LocalizedText,
  description: LocalizedText,
  flag: text,
});

export type CaseStudy = z.infer<typeof CaseStudy>;
export type Model = z.infer<typeof Model>;
export type Service = z.infer<typeof Service>;
export type Area = z.infer<typeof Area>;
export type Technology = z.infer<typeof Technology>;
export type Market = z.infer<typeof Market>;
export type TechStack = z.infer<typeof TechStack>;
export type TechCategory = z.infer<typeof TechCategory>;
export type FaqItem = z.infer<typeof FaqItem>;
export type ModelId = z.infer<typeof ModelId>;
export type MarketId = z.infer<typeof MarketId>;
