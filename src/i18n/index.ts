/**
 * Traduções do site: um ficheiro JSON por idioma e por tipo de texto.
 * Como alimentar: src/i18n/README.md. Decisão: docs/adr/0010-traducoes-em-json.md.
 *
 *   pt/ui.json            interface (fonte, pt-PT)
 *   br|en/ui.json         interface traduzida (mesmas chaves que pt; o TypeScript obriga)
 *   en-gb/ui.json         só o que muda no Reino Unido; o resto deriva do en
 *   br|en/content.json    conteúdo (modelos, serviços, casos…) por id; o pt-PT fica em
 *                         src/content/local, junto da estrutura
 *   en/technologies.json  páginas geradas de tecnologias: texto pt-PT → inglês
 *   en/services.json      páginas geradas de serviços: texto pt-PT → inglês
 *   br/glossary.json      pt-PT → pt-BR automático nas páginas geradas
 *   en-gb/glossary.json   inglês americano → britânico (ortografia e vocabulário)
 */
import ptUi from './pt/ui.json' with { type: 'json' };
import brUi from './br/ui.json' with { type: 'json' };
import enUi from './en/ui.json' with { type: 'json' };
import enGbUi from './en-gb/ui.json' with { type: 'json' };
import brContent from './br/content.json' with { type: 'json' };
import enContent from './en/content.json' with { type: 'json' };
import enGbContent from './en-gb/content.json' with { type: 'json' };
import enTechnologies from './en/technologies.json' with { type: 'json' };
import enServices from './en/services.json' with { type: 'json' };

export type Messages = typeof ptUi;
type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };

/** Interface por idioma. en-gb traz só exceções; a camada de dicionários junta-as. */
export const ui: { pt: Messages; br: Messages; en: Messages; 'en-gb': DeepPartial<Messages> } = {
  pt: ptUi,
  br: brUi,
  en: enUi,
  'en-gb': enGbUi,
};

/** Conteúdo traduzido, com a forma do conteúdo pt-PT (arrays com id viram objetos por id). */
export const contentTranslations: Record<'br' | 'en' | 'en-gb', unknown> = {
  br: brContent,
  en: enContent,
  'en-gb': enGbContent,
};

const TECH_EN: Record<string, string> = enTechnologies;
const SERVICES_EN: Record<string, string> = enServices;

/**
 * Páginas geradas em inglês: tradução do texto pt-PT pelo catálogo. Termos que não
 * mudam (nomes de tecnologias, siglas) não estão no catálogo e passam iguais.
 */
export function technologyEn(pt: string): string {
  return TECH_EN[pt] ?? pt;
}
export function serviceEn(pt: string): string {
  return SERVICES_EN[pt] ?? pt;
}

export const catalogs = { technologies: TECH_EN, services: SERVICES_EN };
