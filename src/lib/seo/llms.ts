import { absoluteUrl, site } from '@/config/site';
import { getContent } from '@/content';
import { buildTechPage } from '@/content/technologies/build';
import { pathFor } from '@/lib/routing';

/**
 * Conteúdo do /llms.txt (formato llmstxt.org): resumo da empresa e links para as
 * páginas principais em pt-PT, com os mesmos factos do resto do site.
 * Não há garantia de que os motores o usem; custa pouco e mantém-se sozinho.
 */
export function buildLlmsTxt(): string {
  const { models, services, cases, stacks } = getContent();
  const locale = 'pt' as const;
  const lines: string[] = [];
  const link = (title: string, path: string | null, note?: string) => {
    if (path) lines.push(`- [${title}](${absoluteUrl(path)})${note ? `: ${note}` : ''}`);
  };

  lines.push(`# ${site.name}`, '');
  lines.push(
    `> ${site.tagline.pt}. Recrutamento tech, outsourcing de TI (alocação de profissionais) e desenvolvimento de software, com equipas em Portugal e no Brasil, para empresas de Portugal, do Brasil e dos EUA. ${site.facts.years} anos, ${site.facts.companies} empresas clientes, ${site.facts.products} produtos entregues.`,
    '',
  );
  lines.push('Versões: pt-PT em /pt/, pt-BR em /br/, inglês em /en/.', '');

  lines.push('## Modelos');
  for (const m of models)
    link(m.keyword.pt, pathFor(locale, { kind: 'model', id: m.id }), m.promise.pt);
  lines.push('');

  lines.push('## Serviços');
  link('Todos os serviços', pathFor(locale, { kind: 'servicesHub' }));
  for (const s of services)
    link(s.name.pt, pathFor(locale, { kind: 'service', id: s.id }), s.summary.pt);
  lines.push('');

  lines.push('## Tecnologias');
  link('Todas as tecnologias', pathFor(locale, { kind: 'technologiesHub' }));
  for (const t of stacks) {
    const v = buildTechPage(t, locale);
    link(v.keyword, pathFor(locale, { kind: 'technology', id: t.id }), v.pitch);
  }
  lines.push('');

  lines.push('## Casos de sucesso');
  for (const c of cases)
    link(
      `${c.client}: ${c.headline.pt}`,
      pathFor(locale, { kind: 'case', id: c.id }),
      c.summary.pt,
    );
  lines.push('');

  lines.push('## Contacto');
  link('Contacto', pathFor(locale, { kind: 'contact' }));
  lines.push('');
  return lines.join('\n');
}
