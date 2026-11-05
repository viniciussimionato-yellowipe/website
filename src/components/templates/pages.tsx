import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/config/site';
import { findService, publishedCases } from '@/content';
import type { CaseStudy, Service } from '@/content/schema';
import type { Dictionary } from '@/dictionaries';
import type { Locale } from '@/lib/i18n/locales';
import { localeConfig, localize } from '@/lib/i18n/locales';
import { pathFor } from '@/lib/routing';
import { CaseViewTracker } from '@/components/analytics/CaseViewTracker';
import { LeadForm } from '@/components/forms/LeadForm';
import { ContactBlock, careerLinks } from '@/components/forms/ContactBlock';
import { CaseCards, PageHero, Section } from './shared';
import { ServicesHub } from './ServicesHub';
import { TechnologiesHub } from './TechnologiesHub';
import type { Crumb } from './shared';

/**
 * Templates (aba Planeamento > Templates). Um template por tipo de página;
 * o conteúdo vem da camada de conteúdo, nunca escrito aqui.
 */
type Base = { locale: Locale; dict: Dictionary };

const L = localize;
const homeCrumb = (locale: Locale, dict: Dictionary): Crumb => ({
  name: dict.common.home,
  href: pathFor(locale, { kind: 'home' })!,
});
const contactHref = (locale: Locale) => pathFor(locale, { kind: 'contact' })!;

export { ModelPage } from './model';

export { ServicePage } from './service';

export function ServicesHubPage({ locale, dict }: Base) {
  return <ServicesHub locale={locale} dict={dict} />;
}

export function TechnologiesHubPage({ locale, dict }: Base) {
  return <TechnologiesHub locale={locale} dict={dict} />;
}

export { TechnologyPage } from './technology';

export { CareersPage, JobsPage } from '@/components/careers/pages';

export function CasesHubPage({ locale, dict }: Base) {
  const href = pathFor(locale, { kind: 'casesHub' })!;
  return (
    <>
      <PageHero
        crumbs={[homeCrumb(locale, dict), { name: dict.templates.casesTitle, href }]}
        title={dict.templates.casesTitle}
        lead={dict.templates.casesLead}
      />
      <Section title={dict.cases.title}>
        <CaseCards locale={locale} caseIds={publishedCases(locale).map((c) => c.id)} />
      </Section>
    </>
  );
}

export function CasePage({ locale, dict, item }: Base & { item: CaseStudy }) {
  const href = pathFor(locale, { kind: 'case', id: item.id })!;
  const hub = pathFor(locale, { kind: 'casesHub' })!;
  const services = item.serviceIds
    .map((id) => ({ s: findService(id), href: pathFor(locale, { kind: 'service', id }) }))
    .filter((x): x is { s: Service; href: string | null } => !!x.s);
  return (
    <>
      <PageHero
        crumbs={[
          homeCrumb(locale, dict),
          { name: dict.templates.casesTitle, href: hub },
          { name: item.client, href },
        ]}
        eyebrow={item.client}
        title={L(item.headline, locale)}
        lead={L(item.summary, locale)}
      />
      <section className="bg-white">
        <div className="container-site grid gap-10 py-16 md:grid-cols-[1.3fr_1fr]">
          <Image
            src={item.image}
            alt=""
            width={1024}
            height={480}
            className="w-full rounded-[var(--radius-card)] object-cover"
          />
          <div className="grid content-start gap-6">
            <ul className="grid gap-6">
              {item.metrics.map((m) => (
                <li key={m.value}>
                  <p className="m-0 font-display text-[40px] font-semibold text-navy">{m.value}</p>
                  <p className="text-[15px] text-body">{L(m.label, locale)}</p>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {services.map(({ s, href: sh }) =>
                sh ? (
                  <Link
                    key={s.id}
                    href={sh}
                    className="rounded-full border border-line px-3 py-1 text-[14px] text-ink no-underline hover:border-navy"
                  >
                    {L(s.name, locale)}
                  </Link>
                ) : (
                  <span
                    key={s.id}
                    className="rounded-full border border-line px-3 py-1 text-[14px] text-body"
                  >
                    {L(s.name, locale)}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>
      <ContactBlock
        locale={locale}
        dict={dict}
        formId={`caso-${item.id}`}
        ctaId={`caso-${item.id}-formulario`}
      />
      <CaseViewTracker caseId={item.id} sector={item.sector} />
    </>
  );
}

export function ContactPage({ locale, dict }: Base) {
  const href = contactHref(locale);
  const contact = site.contacts[localeConfig[locale].market];
  return (
    <>
      <PageHero
        crumbs={[homeCrumb(locale, dict), { name: dict.templates.contactTitle, href }]}
        title={dict.contact.title}
        lead={dict.contact.lead}
      />
      <section className="bg-surface">
        <div className="container-site grid gap-10 py-16 md:grid-cols-[1fr_1.4fr]">
          <div className="space-y-2 text-[15.5px]">
            <p>
              <strong>{dict.contact.emailLabel}:</strong>{' '}
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
            <p>
              <strong>{dict.contact.phoneLabel}:</strong>{' '}
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
            </p>
            <p className="text-body">{contact.address}</p>
          </div>
          <LeadForm
            locale={locale}
            t={dict.form}
            privacyHref={pathFor(locale, { kind: 'privacy' })}
            formId="pagina-contacto"
            ctaId="contacto-formulario"
            careers={careerLinks(locale)}
          />
        </div>
      </section>
    </>
  );
}

export function SimplePage({
  locale,
  dict,
  title,
  text,
  href,
}: Base & { title: string; text: string; href: string }) {
  return (
    <>
      <PageHero crumbs={[homeCrumb(locale, dict), { name: title, href }]} title={title} />
      <Section title={title}>
        <p className="max-w-[720px] text-[16px] leading-relaxed text-body">{text}</p>
      </Section>
    </>
  );
}
