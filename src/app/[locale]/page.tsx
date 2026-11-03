import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/dictionaries';
import { isLocale } from '@/lib/i18n/locales';
import { faqLd } from '@/lib/seo/jsonld';
import { buildMetadata } from '@/lib/seo/metadata';
import {
  AreasSection,
  CasesSection,
  ContactSection,
  FaqSection,
  Hero,
  LogosStrip,
  MarketsSection,
  ModelsSection,
  ProcessSection,
  StackBand,
} from '@/components/home/HomeSections';
import { PageTransition } from '@/components/layout/PageTransition';
import { JsonLd } from '@/components/seo/JsonLd';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    route: { kind: 'home' },
    title: dict.meta.homeTitle,
    description: dict.meta.homeDescription,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <PageTransition route={{ kind: 'home' }}>
      <Hero locale={locale} dict={dict} />
      <LogosStrip />
      <ModelsSection locale={locale} dict={dict} />
      <StackBand locale={locale} dict={dict} />
      <AreasSection locale={locale} dict={dict} />
      <CasesSection locale={locale} dict={dict} />
      <MarketsSection locale={locale} dict={dict} />
      <ProcessSection locale={locale} dict={dict} />
      <FaqSection locale={locale} dict={dict} />
      <ContactSection locale={locale} dict={dict} />
      <JsonLd data={faqLd(dict.faq.items)} />
    </PageTransition>
  );
}
