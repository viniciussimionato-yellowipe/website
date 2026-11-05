/**
 * npm run content:check — controlo de qualidade do conteúdo antes de cada build.
 *
 * Erros (falham sempre): esquemas, referências partidas, slugs duplicados,
 *   títulos > 60 ou descrições fora de 70–160 caracteres.
 * Avisos que passam a erro com CONTENT_STRICT=1 (definido no deploy de produção):
 *   textos pendentes [entre parênteses retos], casos sem autorização do cliente.
 */
import { existsSync } from 'node:fs';
import { site } from '@/config/site';
import { getContent, isAvailable } from '@/content';
import { auditServicePage, buildServicePage } from '@/content/services/build';
import { getJobs } from '@/lib/jobs';
import { auditTechPage, buildTechPage } from '@/content/technologies/build';
import br from '@/dictionaries/br';
import en from '@/dictionaries/en';
import enGb from '@/dictionaries/en-gb';
import pt from '@/dictionaries/pt';
import { locales } from '@/lib/i18n/locales';
import type { Locale } from '@/lib/i18n/locales';
import { allRoutes, isNoindexRoute, pathFor } from '@/lib/routing';
import { seoFor } from '@/lib/seo/page-seo';

const production = process.env.CONTENT_STRICT === '1';
const errors: string[] = [];
const warnings: string[] = [];
const prodBlock = (msg: string) => (production ? errors : warnings).push(msg);

const content = getContent(); // falha aqui se algum esquema não passar

// 1. Slugs únicos por idioma
for (const l of locales) {
  const paths = allRoutes(l).map((r) => pathFor(l, r));
  const dupes = paths.filter((p, i) => paths.indexOf(p) !== i);
  if (dupes.length) errors.push(`[${l}] URLs duplicados: ${dupes.join(', ')}`);
}

// 2. Limites de SEO
type SeoEntry = {
  id: string;
  slug: Partial<Record<Locale, string>>;
  seo: { title: Partial<Record<Locale, string>>; description: Partial<Record<Locale, string>> };
};
// Os serviços não entram: o título e a descrição saem de buildServicePage e são
// validados na auditoria das páginas de serviço (2b').
const seoEntries: SeoEntry[] = [...content.models, ...content.cases];
for (const e of seoEntries) {
  for (const l of locales) {
    if (!isAvailable(e, l)) continue;
    const title = e.seo.title[l] ?? '';
    const desc = e.seo.description[l] ?? '';
    if (title.length > 60)
      errors.push(`[${l}] ${e.id}: título com ${title.length} caracteres (máx. 60)`);
    if (desc.length < 70 || desc.length > 160)
      errors.push(`[${l}] ${e.id}: descrição com ${desc.length} caracteres (70–160)`);
  }
}
// 2c. Todas as rotas indexáveis, com o título e a descrição que vão para o HTML
// (dicionários, modelos, serviços, tecnologias e casos): a mesma função do generateMetadata.
const dicts = { pt, br, en, 'en-gb': enGb } as const;
for (const l of locales) {
  for (const route of allRoutes(l)) {
    if (isNoindexRoute(route)) continue;
    const { title, description, noindex } = seoFor(l, route, dicts[l]);
    if (noindex) continue;
    const where = `[${l}] ${pathFor(l, route)}`;
    if (title.length > 60) errors.push(`${where}: título com ${title.length} caracteres (máx. 60)`);
    else if (title.length < 30)
      warnings.push(
        `${where}: título curto (${title.length} caracteres), pouco texto para pesquisa`,
      );
    if (description.length < 70 || description.length > 160)
      errors.push(`${where}: descrição com ${description.length} caracteres (70–160)`);
  }
}

// 3. Autorização de casos (R-09)
for (const c of content.cases) {
  if (c.status === 'published' && !c.clientApproved)
    prodBlock(`caso ${c.id}: sem autorização escrita do cliente`);
}

// 4. Textos pendentes [ ... ]
const PLACEHOLDER = /\[[^\]]{1,80}\]/;
function scan(value: unknown, where: string) {
  if (typeof value === 'string') {
    if (PLACEHOLDER.test(value))
      prodBlock(`${where}: texto pendente "${value.match(PLACEHOLDER)![0]}"`);
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => scan(v, `${where}[${i}]`));
  } else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) scan(v, `${where}.${k}`);
  }
}
scan(site, 'site');
scan({ pt, br, en }, 'dicionário');
scan(content.models, 'modelos');
scan(
  content.services.filter((s) => s.status === 'published'),
  'serviços',
);
scan(content.cases, 'casos');

// 2b. Páginas de tecnologia geradas pela máquina de conteúdo (docs/14-tecnologias.md)
for (const t of content.stacks.filter((x) => x.status === 'published')) {
  for (const l of locales) {
    const view = buildTechPage(t, l);
    for (const issue of auditTechPage(view)) errors.push(`[${l}] tecnologia ${t.id}: ${issue}`);
    scan(view, `tecnologia ${t.id} [${l}]`);
  }
}

// 2b'. Páginas de serviço geradas pela máquina de conteúdo (só pt e br; ver docs/15-servicos.md)
for (const s of content.services) {
  for (const l of locales) {
    if (!pathFor(l, { kind: 'service', id: s.id })) continue;
    const view = buildServicePage(s, l);
    for (const issue of auditServicePage(view)) errors.push(`[${l}] serviço ${s.id}: ${issue}`);
    for (const id of view.stackIds)
      if (!pathFor(l, { kind: 'technology', id }))
        errors.push(`[${l}] serviço ${s.id}: tecnologia sem página (${id})`);
    for (const id of view.relatedServiceIds)
      if (!content.services.some((x) => x.id === id))
        errors.push(`serviço ${s.id}: serviço relacionado inexistente (${id})`);
    scan(view, `serviço ${s.id} [${l}]`);
  }
}

// 2c. Logótipos de tecnologias (sem ficheiro, a página mostra as iniciais)
for (const t of content.stacks)
  if (t.logo && !existsSync(`public${t.logo}`))
    warnings.push(`tecnologia ${t.id}: logótipo em falta (${t.logo})`);

// 2d. Vagas: exemplos só até a API do ATS chegar (a página de vagas fica noindex)
const jobsResult = await getJobs();
if (jobsResult.source === 'sample') {
  const msg = 'vagas: a mostrar exemplos (definir JOBS_API_URL com a API do ATS)';
  if (production) errors.push(msg);
  else warnings.push(msg);
}

// Relatório
for (const w of warnings) console.warn(`aviso  ${w}`);
for (const e of errors) console.error(`erro   ${e}`);
console.warn(
  `\n${errors.length} erro(s), ${warnings.length} aviso(s). ${production ? 'Modo estrito: pendentes e casos sem autorização bloqueiam.' : 'Corra com CONTENT_STRICT=1 para ver o que bloqueia o lançamento.'}`,
);
process.exit(errors.length ? 1 : 0);
