import { z } from 'zod';
import { SAMPLE_JOBS } from './sample';

/**
 * Vagas abertas. Hoje vêm de exemplos (mockup Vagas v1, a partir de posições reais
 * do Pipefy, sem clientes). Quando a API chegar, define-se JOBS_API_URL e escreve-se
 * o mapeamento em `fromApi`: as páginas não mudam.
 *
 * Regras:
 * - Vagas de exemplo nunca são indexadas (a página fica noindex e sem JobPosting).
 * - Se a API falhar, a lista fica vazia: nunca se mostram exemplos no lugar de vagas reais.
 * - As candidaturas vão sempre para o ATS (app/api/candidatura), nunca para o CRM.
 */
export const JobArea = z.enum(['dev', 'dados', 'cloud', 'qa', 'erp', 'gestao']);
export const Seniority = z.enum(['junior', 'mid', 'senior']);
export const WorkMode = z.enum(['remote', 'hybrid', 'onsite']);
/** consultant = Consultor Yellowipe (outsourcing); direct = contratação direta (placement). */
export const Contract = z.enum(['consultant', 'direct']);
/** Filtro de localização: Portugal, Brasil ou remoto internacional. */
export const Region = z.enum(['PT', 'BR', 'INTL']);

export const Job = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(2),
  area: JobArea,
  seniority: Seniority,
  mode: WorkMode,
  contract: Contract,
  location: z.string().min(2),
  region: Region,
  tech: z.array(z.string()).min(1).max(6),
  /** Nível de inglês (CEFR). */
  english: z.string().max(4),
  publishedAt: z.string(),
  about: z.string(),
  requirements: z.array(z.string()).min(1),
});

export type Job = z.infer<typeof Job>;
export type JobArea = z.infer<typeof JobArea>;
export type Seniority = z.infer<typeof Seniority>;
export type WorkMode = z.infer<typeof WorkMode>;
export type Contract = z.infer<typeof Contract>;
export type Region = z.infer<typeof Region>;

export type JobsResult = { source: 'sample' | 'api'; jobs: Job[] };

/** Revalidação das páginas que mostram vagas (segundos). */
export const JOBS_REVALIDATE = 3600;

export async function getJobs(): Promise<JobsResult> {
  const url = process.env.JOBS_API_URL;
  if (!url) return { source: 'sample', jobs: sampleJobs() };
  try {
    const res = await fetch(url, {
      headers: process.env.JOBS_API_TOKEN
        ? { Authorization: `Bearer ${process.env.JOBS_API_TOKEN}` }
        : undefined,
      next: { revalidate: JOBS_REVALIDATE },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`jobs_${res.status}`);
    const jobs = fromApi(await res.json());
    return { source: 'api', jobs: jobs.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)) };
  } catch (e) {
    console.error(JSON.stringify({ evt: 'jobs.fetch_failed', error: String(e) }));
    return { source: 'api', jobs: [] };
  }
}

/**
 * Mapeamento da resposta da API para `Job`. [Formato da API do ATS a confirmar.]
 * Por agora aceita uma lista já no formato `Job`; as entradas inválidas são ignoradas.
 */
export function fromApi(raw: unknown): Job[] {
  const list = Array.isArray(raw) ? raw : [];
  return list.flatMap((item) => {
    const parsed = Job.safeParse(item);
    return parsed.success ? [parsed.data] : [];
  });
}

/** Exemplos com datas relativas a hoje, para a idade ("há 2 dias") fazer sentido. */
function sampleJobs(now = Date.now()): Job[] {
  return SAMPLE_JOBS.map(({ daysAgo, ...j }) =>
    Job.parse({ ...j, publishedAt: new Date(now - daysAgo * 86_400_000).toISOString() }),
  );
}

/** Dias desde a publicação (0 = hoje). */
export function daysSince(iso: string, now = Date.now()): number {
  return Math.max(0, Math.floor((now - Date.parse(iso)) / 86_400_000));
}
