import Image from 'next/image';
import { site } from '@/config/site';
import type { Dictionary } from '@/dictionaries';
import type { Locale } from '@/lib/i18n/locales';
import { localeConfig } from '@/lib/i18n/locales';
import { pathFor } from '@/lib/routing';
import { LeadForm } from './LeadForm';

/**
 * Secção "Fale connosco" com o formulário na própria página (home, modelos, serviços,
 * tecnologias e casos). Converter onde a decisão é tomada, sem mandar o visitante para
 * /contacto/: os CTAs da página apontam para #contacto.
 *
 * Sem `title`, usa o título da home ("Contratar. Reforçar. Construir.") com a última
 * frase noutra linha; com `title`, a última palavra fica a amarelo na mesma linha.
 */
type Props = {
  locale: Locale;
  dict: Dictionary;
  /** Identifica o formulário no GA4 (`form_id`), ex.: `servico-agentes-de-ia`. */
  formId: string;
  /** CTA atribuído quando o visitante chega ao formulário sem clicar em nenhum CTA. */
  ctaId: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  /** Página de modelo: a intenção correspondente já vem escolhida. */
  model?: string;
};

/** Vagas abertas e envio de CV (secção #cv de Carreiras), para onde o formulário leva os candidatos. */
export function careerLinks(locale: Locale) {
  const careers = pathFor(locale, { kind: 'careers' });
  return { jobs: pathFor(locale, { kind: 'jobs' }), cv: careers ? `${careers}#cv` : null };
}

function splitLast(text: string): [string, string] {
  const i = text.lastIndexOf(' ');
  return i < 0 ? ['', text] : [text.slice(0, i), text.slice(i + 1)];
}

export function ContactBlock({ locale, dict, formId, ctaId, eyebrow, title, lead, model }: Props) {
  const contact = site.contacts[localeConfig[locale].market];
  const [titleHead, titleLast] = splitLast(title ?? dict.contact.title);

  return (
    <section
      id="contacto"
      aria-labelledby="contacto-title"
      className="relative overflow-hidden bg-navy text-white"
    >
      <Image
        src="/images/hero-tree.png"
        alt=""
        aria-hidden="true"
        width={1324}
        height={1500}
        sizes="420px"
        className="pointer-events-none absolute -top-[30px] -left-[120px] h-auto w-[420px] max-w-none opacity-20"
      />
      <div className="container-site relative grid items-start gap-[clamp(40px,6vw,88px)] py-[clamp(72px,9vw,120px)] min-[961px]:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div className="flex flex-col gap-[22px] min-[961px]:sticky min-[961px]:top-[120px]">
          <p className="eyebrow m-0 inline-flex items-center gap-2.5 text-[12.5px] text-yellow">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-yellow" />
            {eyebrow ?? dict.contact.eyebrow}
          </p>
          <h2
            id="contacto-title"
            className={`m-0 font-display leading-[1.04] font-medium tracking-[-0.035em] ${
              title ? 'text-[clamp(34px,3.6vw,52px)]' : 'text-[clamp(40px,4.2vw,60px)]'
            }`}
          >
            {titleHead}
            {title ? ' ' : <br />}
            <span className="text-yellow">{titleLast}</span>
          </h2>
          <p className="m-0 max-w-[460px] text-[17px] leading-[1.7] text-on-navy">
            {lead ?? `${dict.contact.leadIntro} ${dict.contact.lead}`}
          </p>
          <p className="m-0 mt-1.5 font-mono text-[12px] tracking-[0.1em] text-on-navy-2 uppercase">
            {dict.contact.markets}
          </p>
          <a
            href={`mailto:${contact.email}`}
            className="self-start font-mono text-[14px] break-words text-white underline decoration-white/40 decoration-1 underline-offset-[5px] transition-colors hover:text-white hover:decoration-yellow"
          >
            {dict.contact.emailCta} {contact.email}
          </a>
        </div>
        <LeadForm
          locale={locale}
          t={dict.form}
          privacyHref={pathFor(locale, { kind: 'privacy' })}
          formId={formId}
          ctaId={ctaId}
          model={model}
          careers={careerLinks(locale)}
          tone="dark"
        />
      </div>
    </section>
  );
}
