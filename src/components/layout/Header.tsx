import Image from 'next/image';
import Link from 'next/link';
import { findArea, findCase, findService, getContent } from '@/content';
import type { Dictionary } from '@/dictionaries';
import type { Locale } from '@/lib/i18n/locales';
import { pathFor } from '@/lib/routing';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { ArrowRight, Sparkle } from '@/components/ui/icons';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MegaItem, MegaNav } from './MegaNav';
import { MobileMenu } from './MobileMenu';
import type { MobileSection } from './MobileMenu';

type Props = {
  locale: Locale;
  dict: Dictionary;
  alternatesIndex: Record<string, Partial<Record<Locale, string>>>;
};

type MenuLink = { label: string; href: string };
type MenuGroup = { id: string; name: string; ai: boolean; links: MenuLink[] };
type ModelLink = { tag: string; label: string; text?: string; href: string };
type Proof = { client: string; logo: string; text: string; href: string };

/** Colunas do mega-menu Serviços (mockup v7). O recrutamento tech fica no rodapé do painel. */
const SERVICE_COLUMNS = [
  ['software', 'design'],
  ['ia', 'emergentes'],
  ['cloud-devops', 'qualidade'],
];
/**
 * Colunas do mega-menu Tecnologias (ids de content/local/catalog.ts). Sem grupo de IA:
 * as ferramentas de IA aparecem de forma discreta dentro de cada página de tecnologia.
 */
const TECH_COLUMNS = [
  ['front-end', 'mobile', 'enterprise'],
  ['back-end', 'qa'],
  ['cloud-devops', 'dados'],
];

const L = <T,>(v: { pt: T; br?: T; en?: T }, locale: Locale): T => v[locale] ?? v.pt;

/**
 * Cabeçalho com mega-menus de Serviços e Tecnologias (estrutura inspirada na BairesDev,
 * identidade Yellowipe). Abrem com hover e com o foco do teclado, só com CSS;
 * o conteúdo está sempre no HTML, o que ajuda o SEO e a ligação interna.
 */
export function Header({ locale, dict, alternatesIndex }: Props) {
  const { models, technologyGroups, stacks } = getContent();
  const home = pathFor(locale, { kind: 'home' })!;
  const contact = pathFor(locale, { kind: 'contact' })!;
  const servicesHub = pathFor(locale, { kind: 'servicesHub' });
  const techHub = pathFor(locale, { kind: 'technologiesHub' });
  const casesHub = pathFor(locale, { kind: 'casesHub' });
  const careers = pathFor(locale, { kind: 'careers' });

  const modelLinks = models
    .map((m) => {
      const id = m.id as keyof Dictionary['nav']['modelShort'];
      return {
        tag: L(m.name, locale),
        label: L(m.keyword, locale),
        text: dict.nav.modelShort[id],
        tech: dict.nav.modelTech[id],
        href: pathFor(locale, { kind: 'model', id: m.id }),
      };
    })
    .filter((m): m is typeof m & { href: string } => m.href !== null);

  const areaGroup = (id: string): MenuGroup | null => {
    const a = findArea(id);
    if (!a) return null;
    const links = a.serviceIds
      .map((sid) => {
        const s = findService(sid);
        const href =
          pathFor(locale, { kind: 'service', id: sid }) ??
          (servicesHub ? `${servicesHub}#${a.id}` : null);
        return s && href ? { label: L(s.name, locale), href } : null;
      })
      .filter((l): l is MenuLink => l !== null);
    return { id, name: L(a.name, locale), ai: id === 'ia', links };
  };
  const stackLinks = (ids: string[]): MenuLink[] =>
    ids
      .map((sid) => {
        const t = stacks.find((x) => x.id === sid);
        const href = pathFor(locale, { kind: 'technology', id: sid });
        return t && href ? { label: t.name, href } : null;
      })
      .filter((l): l is MenuLink => l !== null);
  const techGroup = (id: string): MenuGroup | null => {
    const g = technologyGroups.find((x) => x.id === id);
    if (!g || !techHub) return null;
    return { id, name: L(g.name, locale), ai: false, links: stackLinks(g.menu ?? g.stackIds) };
  };
  const columns = (ids: string[][], pick: (id: string) => MenuGroup | null) =>
    ids.map((col) => col.map(pick).filter((g): g is MenuGroup => g !== null));

  const serviceCols = columns(SERVICE_COLUMNS, areaGroup);
  const techCols = columns(TECH_COLUMNS, techGroup);

  const proof = (caseId: string): Proof | null => {
    const c = findCase(caseId);
    const href = c ? pathFor(locale, { kind: 'case', id: c.id }) : null;
    return c && href ? { client: c.client, logo: c.logo, text: L(c.headline, locale), href } : null;
  };

  const plainItems = [
    { label: dict.nav.cases, href: casesHub },
    { label: dict.nav.insights, href: null },
    { label: dict.nav.careers, href: careers },
  ].filter((i): i is MenuLink => i.href !== null);

  const mobileSections: MobileSection[] = [];
  if (servicesHub)
    mobileSections.push({
      title: dict.nav.services,
      groups: [
        {
          title: dict.nav.models,
          links: modelLinks.map((m) => ({ label: m.label, tag: m.tag, href: m.href })),
        },
        {
          title: dict.nav.areas,
          links: serviceCols.flat().map((g) => ({ label: g.name, href: `${servicesHub}#${g.id}` })),
        },
      ],
      all: { label: dict.nav.allServices, href: servicesHub },
    });
  if (techHub)
    mobileSections.push({
      title: dict.nav.technologies,
      groups: technologyGroups
        .filter((g) => !g.hubOnly)
        .map((g) => ({
          title: L(g.name, locale),
          links: stackLinks(g.menu ?? g.stackIds),
        })),
      all: { label: dict.nav.allTechnologies, href: techHub },
    });

  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-navy/[0.96] backdrop-blur-[10px]">
      <div className="container-site flex items-center gap-7 py-3.5">
        <Link
          href={home}
          aria-label={`Yellowipe, ${dict.common.home}`}
          className="flex items-center"
        >
          <Image
            src="/images/logo-white.png"
            alt="Yellowipe"
            width={600}
            height={166}
            priority
            className="h-[30px] w-auto"
          />
        </Link>

        <MegaNav className="hidden flex-1 items-center justify-center gap-[26px] self-stretch text-[14.5px] font-medium min-[961px]:flex">
          {servicesHub && (
            <MegaMenu
              id="servicos"
              label={dict.nav.services}
              href={servicesHub}
              intro={dict.nav.servicesIntro}
              models={modelLinks}
              columns={serviceCols}
              proof={proof('clever')}
              readCase={dict.common.readCase}
              footer={[
                { label: dict.nav.allServices, href: servicesHub },
                { label: dict.nav.recruitProfiles, href: `${servicesHub}#recrutamento` },
              ]}
            />
          )}
          {techHub && (
            <MegaMenu
              id="tecnologias"
              label={dict.nav.technologies}
              href={techHub}
              intro={dict.nav.technologiesIntro}
              models={modelLinks.map((m) => ({ tag: m.tag, label: m.tech, href: m.href }))}
              columns={techCols}
              proof={proof('linde')}
              readCase={dict.common.readCase}
              footer={[{ label: dict.nav.allTechnologies, href: techHub }]}
            />
          )}
          {plainItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-on-navy no-underline hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </MegaNav>

        <div className="ml-auto flex items-center gap-3">
          <LanguageSwitcher
            locale={locale}
            label={dict.common.languages}
            alternatesIndex={alternatesIndex}
          />
          <TrackedLink
            href={contact}
            ctaId="header-agendar"
            position="header"
            pageType="global"
            className="hidden min-h-11 items-center rounded-[10px] bg-yellow px-[18px] py-2.5 text-sm font-semibold text-navy no-underline hover:bg-yellow-hi hover:text-navy min-[961px]:inline-flex"
          >
            {dict.common.bookCall}
          </TrackedLink>
          <TrackedLink
            href={contact}
            ctaId="header-falar-mobile"
            position="header-mobile"
            pageType="global"
            className="inline-flex min-h-11 items-center rounded-[10px] bg-yellow px-3.5 py-2.5 text-[13.5px] font-semibold text-navy no-underline hover:bg-yellow-hi hover:text-navy min-[961px]:hidden"
          >
            {dict.common.talkToUs}
          </TrackedLink>
          <MobileMenu
            openLabel={dict.common.openMenu}
            closeLabel={dict.common.closeMenu}
            sections={mobileSections}
            links={plainItems}
            cta={{ label: dict.common.bookCall, href: contact }}
          />
        </div>
      </div>
    </header>
  );
}

type MegaMenuProps = {
  id: string;
  label: string;
  href: string;
  intro: string;
  models: ModelLink[];
  columns: MenuGroup[][];
  proof: Proof | null;
  readCase: string;
  footer: MenuLink[];
};

/**
 * Painel a toda a largura: o <header> sticky é o bloco de contenção do `absolute`.
 * O gatilho ocupa a altura toda do cabeçalho para o hover não se perder a caminho do painel.
 */
function MegaMenu({
  id,
  label,
  href,
  intro,
  models,
  columns,
  proof,
  readCase,
  footer,
}: MegaMenuProps) {
  return (
    <MegaItem id={id} label={label} href={href}>
      <div className="mega-sheet">
        <div className="container-site grid grid-cols-[320px_minmax(0,1fr)]">
          <aside className="mega-in relative flex flex-col gap-3.5 bg-surface py-9 pr-8 before:absolute before:inset-y-0 before:right-full before:w-screen before:bg-surface">
            <p className="m-0 font-display text-[26px] font-semibold tracking-[-0.02em]">
              {label}
              <span className="text-yellow">.</span>
            </p>
            <p className="m-0 text-[14.5px] leading-[1.6] text-body">{intro}</p>
            <ul className="m-0 mt-1.5 flex list-none flex-col gap-1 p-0">
              {models.map((m) => (
                <li key={m.href}>
                  <Link
                    href={m.href}
                    className="-mx-3 flex flex-col items-start gap-1 rounded-[10px] px-3 py-2.5 text-ink no-underline transition-colors hover:bg-white hover:text-ink"
                  >
                    <span className="rounded-[5px] bg-warm px-1.5 py-0.5 font-mono text-[11px] tracking-[0.08em] text-gold uppercase">
                      {m.tag}
                    </span>
                    <span className="text-[14.5px] font-semibold">{m.label}</span>
                    {m.text && (
                      <span className="text-[13px] leading-normal text-muted">{m.text}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            {proof && (
              <div className="mt-auto flex flex-col gap-2.5 border-t border-line-strong pt-5">
                <Image
                  src={proof.logo}
                  alt={proof.client}
                  width={120}
                  height={36}
                  className="h-[22px] w-auto max-w-[140px] self-start object-contain object-left opacity-80 brightness-0"
                />
                <p className="m-0 text-[13.5px] leading-[1.55]">
                  {proof.client}: {proof.text}.{' '}
                  <Link href={proof.href} className="font-semibold text-ink hover:text-gold">
                    {readCase}
                  </Link>
                </p>
              </div>
            )}
          </aside>
          <div className="mega-in mega-in-2 flex flex-col gap-7 pt-9 pb-[30px] pl-12">
            <div className="grid grid-cols-3 gap-x-8">
              {columns.map((col, i) => (
                <div key={i} className="flex flex-col gap-[22px]">
                  {col.map((g) => (
                    <MenuGroupList key={g.id} group={g} />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-5">
              {footer.map((f) => (
                <Link
                  key={f.href}
                  href={f.href}
                  className="group/all inline-flex items-center gap-2 text-[14.5px] font-semibold text-ink no-underline hover:text-gold"
                >
                  {f.label}
                  <ArrowRight
                    size={14}
                    strokeWidth={2.2}
                    className="transition-transform group-hover/all:translate-x-[3px]"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MegaItem>
  );
}

function MenuGroupList({ group }: { group: MenuGroup }) {
  return (
    <div>
      <p className="m-0 mb-2 flex items-center gap-2 font-mono text-[11.5px] font-medium tracking-[0.12em] text-muted uppercase">
        <span aria-hidden="true" className="size-[7px] flex-none rounded-[1px] bg-yellow" />
        {group.name}
        {group.ai && <Sparkle className="size-2.5 self-start" />}
      </p>
      <ul className="m-0 flex list-none flex-col p-0">
        {group.links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="inline-block py-1.5 text-[14.5px] font-medium text-ink no-underline underline-offset-4 hover:text-gold hover:underline"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
