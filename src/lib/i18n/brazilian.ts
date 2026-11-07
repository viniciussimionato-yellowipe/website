import glossary from '@/i18n/br/glossary.json' with { type: 'json' };

/**
 * pt-PT → pt-BR nas páginas geradas (tecnologias e serviços), a partir do glossário em
 * src/i18n/br/glossary.json. O pt-BR escrito à mão não passa por aqui.
 */
type Pair = [string, string];
const toRe = (pairs: Pair[]) =>
  pairs.map(([from, to]) => [new RegExp(`(?<!\\p{L})${from}(?!\\p{L})`, 'gu'), to] as const);

const GENERAL = toRe(glossary.general as Pair[]);
const SERVICES = toRe(glossary.services as Pair[]);

/** Perguntas que em pt-BR pedem sujeito ("Vocês usam…?"). */
export const BR_QUESTION_VERBS: readonly string[] = glossary.questionVerbs;

/** "está a chegar" → "está chegando": em pt-BR o progressivo usa o gerúndio. */
const PROGRESSIVE =
  /(?<!\p{L})(est(?:á|ão|amos|ou|ava|avam|ar|eja|ejam)|continua(?:m)?|anda(?:m)?|fica(?:m)?) a (\p{L}+?)(ar|er|ir)(?!\p{L})/gu;

export function ptToBr(text: string): string {
  const out = GENERAL.reduce((s, [re, to]) => s.replace(re, to), text);
  return out.replace(
    PROGRESSIVE,
    (_m, aux: string, stem: string, end: string) =>
      `${aux} ${stem}${end === 'ar' ? 'ando' : end === 'er' ? 'endo' : 'indo'}`,
  );
}

/** Serviços: glossário próprio dos serviços e depois o geral. */
export function ptToBrServices(text: string): string {
  return ptToBr(SERVICES.reduce((s, [re, to]) => s.replace(re, to), text));
}
