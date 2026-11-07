/**
 * npm run i18n:check            relatório das traduções (falha se houver erros)
 * npm run i18n:missing -- en    textos de conteúdo sem tradução num idioma, com o pt-PT
 *
 * Como alimentar as traduções: src/i18n/README.md.
 */
import { getContent } from '@/content';
import { auditTranslations } from '@/lib/i18n/audit';

const [cmd = 'check', locale] = process.argv.slice(2);

if (cmd === 'missing') {
  if (locale !== 'br' && locale !== 'en') {
    console.error('Uso: npm run i18n:missing -- <br|en>');
    process.exit(1);
  }
  // Mesma forma de src/i18n/<idioma>/content.json: copiar, traduzir e colar.
  const out: Record<string, unknown> = {};
  const set = (path: string[], v: unknown) => {
    let t = out;
    for (const p of path.slice(0, -1)) t = (t[p] ??= {}) as Record<string, unknown>;
    t[path.at(-1)!] = v;
  };
  const walk = (node: unknown, path: string[]) => {
    if (Array.isArray(node))
      return node.forEach((item, i) =>
        walk(item, [...path, typeof item?.id === 'string' ? item.id : String(i)]),
      );
    if (!node || typeof node !== 'object') return;
    const o = node as Record<string, unknown>;
    if ('pt' in o && Object.keys(o).every((k) => ['pt', 'br', 'en', 'en-gb'].includes(k))) {
      if (o[locale] === undefined) set(path, `TODO ${JSON.stringify(o.pt)}`);
      return;
    }
    for (const [k, v] of Object.entries(o)) walk(v, [...path, k]);
  };
  walk(getContent(), []);
  process.stdout.write(`${JSON.stringify(out, null, 2)}
`);
  process.exit(0);
}

const r = auditTranslations();
const byLocale = (list: typeof r.errors) =>
  list.reduce<Record<string, number>>(
    (acc, i) => ((acc[i.locale] = (acc[i.locale] ?? 0) + 1), acc),
    {},
  );

console.warn('Traduções');
for (const [k, v] of Object.entries(r.stats)) console.warn(`  ${k.padEnd(24)} ${v}`);
for (const w of r.warnings) console.warn(`aviso  [${w.locale}] ${w.where}: ${w.message}`);
for (const e of r.errors) console.error(`ERRO   [${e.locale}] ${e.where}: ${e.message}`);
console.warn(
  `\n${r.errors.length} erro(s) ${JSON.stringify(byLocale(r.errors))}, ${r.warnings.length} aviso(s) ${JSON.stringify(byLocale(r.warnings))}.`,
);
process.exit(r.errors.length ? 1 : 0);
