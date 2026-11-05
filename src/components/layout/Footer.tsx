import Image from 'next/image';
import Link from 'next/link';
import { absoluteUrl, site } from '@/config/site';
import { findService, getContent } from '@/content';
import type { Dictionary } from '@/dictionaries';
import type { Locale } from '@/lib/i18n/locales';
import { pathFor } from '@/lib/routing';
import { CookieSettingsButton } from '@/components/analytics/CookieSettingsButton';
import { AiAssistantLogo, LinkedInIcon, type AiAssistant } from '@/components/ui/icons';

type Props = { locale: Locale; dict: Dictionary };

/** Prompt dos botões "Resumir com IA" (como a BairesDev). O URL é o da home do idioma. */
function summarizeLinks(locale: Locale, template: string): { name: AiAssistant; href: string }[] {
  const url = absoluteUrl(`/${locale}/`);
  const text = template.replace('{url}', url);
  const prompt = encodeURIComponent(text);
  return [
    { name: 'ChatGPT', href: `https://chatgpt.com/?q=${prompt}` },
    { name: 'Claude', href: `https://claude.ai/new?q=${prompt}` },
    { name: 'Perplexity', href: `https://www.perplexity.ai/search?q=${prompt}` },
    { name: 'Gemini', href: `https://www.google.com/search?udm=50&q=${prompt}` },
  ];
}

export function Footer({ locale, dict }: Props) {
  const { models } = getContent();
  const home = pathFor(locale, { kind: 'home' })!;
  const link = (href: string | null, label: string) =>
    href ? (
      <Link href={href} className="text-on-navy-2 no-underline hover:text-white">
        {label}
      </Link>
    ) : (
      <span className="text-on-navy-2/70">{label}</span>
    );

  const testing = findService('automacao-de-testes');
  const serviceLinks = [
    ...models.map((m) => ({
      label: m.keyword[locale] ?? m.keyword.pt,
      href: pathFor(locale, { kind: 'model', id: m.id }),
    })),
    ...(testing
      ? [
          {
            label: testing.name[locale] ?? testing.name.pt,
            href: pathFor(locale, { kind: 'service', id: testing.id }),
          },
        ]
      : []),
    { label: dict.nav.allServices, href: pathFor(locale, { kind: 'servicesHub' }) },
  ];

  const columns = [
    { title: dict.footer.services, links: serviceLinks },
    {
      title: dict.footer.company,
      links: [
        { label: dict.footer.about, href: null },
        { label: dict.footer.careers, href: pathFor(locale, { kind: 'careers' }) },
        { label: dict.footer.marketsLink, href: `${home}#mercados` },
        { label: dict.nav.cases, href: pathFor(locale, { kind: 'casesHub' }) },
      ],
    },
    {
      title: dict.footer.resources,
      links: [
        { label: dict.nav.insights, href: null },
        { label: dict.footer.salaryGuide, href: null },
        { label: 'FAQ', href: `${home}#faq` },
        { label: dict.footer.contact, href: pathFor(locale, { kind: 'contact' }) },
      ],
    },
  ];

  return (
    <footer className="border-t border-white/[0.06] bg-[#041431] text-white">
      <div className="container-site flex flex-col gap-11 pt-14 pb-8">
        <div className="flex flex-wrap gap-10">
          <div className="flex min-w-0 flex-[1.4_1_260px] flex-col gap-3.5">
            <Image
              src="/images/logo-white.png"
              alt="Yellowipe"
              width={600}
              height={166}
              className="h-7 w-auto self-start"
            />
            <p className="m-0 max-w-[300px] text-[14px] leading-[1.65] text-on-navy-2">
              {dict.footer.tagline}
            </p>
          </div>
          {columns.map((col) => (
            <nav
              key={col.title}
              aria-label={col.title}
              className="flex min-w-0 flex-[1_1_160px] flex-col gap-2.5 text-[14px]"
            >
              <p className="m-0 mb-1.5 font-mono text-[12px] text-white">{col.title}</p>
              {col.links.map((l) => (
                <span key={l.label}>{link(l.href, l.label)}</span>
              ))}
            </nav>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-white/[0.08] pt-[22px] text-[13px] text-on-navy-2">
          <p className="m-0">
            © {new Date().getFullYear()} {site.name}. {dict.footer.rights}
          </p>
          <p className="m-0 flex flex-wrap items-center gap-x-3.5 gap-y-1.5">
            <span>{dict.footer.summarize}</span>
            {summarizeLinks(locale, dict.footer.summarizePrompt).map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-1.5 text-on-navy-2 no-underline hover:text-white"
              >
                <AiAssistantLogo name={s.name} />
                {s.name}
              </a>
            ))}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            {link(pathFor(locale, { kind: 'privacy' }), dict.footer.privacy)}
            <CookieSettingsButton label={dict.footer.cookies} />
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex min-h-11 items-center text-on-navy-2 hover:text-white"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
