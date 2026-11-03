import type { ReactNode, SVGProps } from 'react';

/** Ícones em SVG com o mesmo traço (2px, cantos redondos). Decorativos: aria-hidden por omissão. */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number, props: IconProps) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...props,
});

export function ArrowRight({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ChevronDown({ size = 12, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function MenuIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/** A faísca da IA (sempre amarela). */
export function Sparkle({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...props}>
      <path
        d="M12 1.5C12.7 7.6 16.4 11.3 22.5 12 16.4 12.7 12.7 16.4 12 22.5 11.3 16.4 7.6 12.7 1.5 12 7.6 11.3 11.3 7.6 12 1.5Z"
        fill="#F4BE14"
      />
    </svg>
  );
}

export function ChevronRight({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size, { strokeWidth: 1.8, ...props })}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function TrendUp({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />
    </svg>
  );
}

/* Ícones dos três modelos (cartões "Como trabalhamos consigo"). */
const MODEL_PATHS: Record<string, ReactNode> = {
  contrate: (
    <>
      <circle cx="9" cy="8" r="4" />
      <path d="M2 21c0-3.9 3.1-7 7-7s7 3.1 7 7M19 8v6M16 11h6" />
    </>
  ),
  reforce: (
    <>
      <circle cx="9" cy="8" r="4" />
      <path d="M2 21c0-3.9 3.1-7 7-7s7 3.1 7 7M16 4.5a4 4 0 0 1 0 7M22 21c0-3-1.8-5.6-4.5-6.6" />
    </>
  ),
  construa: (
    <>
      <path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" />
      <path d="M3 8l9 5 9-5M12 13v8" />
    </>
  ),
};

export function ModelIcon({ id, size = 26, ...props }: IconProps & { id: string }) {
  return <svg {...base(size, { strokeWidth: 1.6, ...props })}>{MODEL_PATHS[id]}</svg>;
}

/* Ícones das sete áreas de especialização (abas da home). */
const AREA_PATHS: Record<string, ReactNode> = {
  software: (
    <>
      <rect x="2.5" y="4" width="19" height="16" rx="2" />
      <path d="M2.5 8h19M9.5 12.5L7.5 14.5l2 2M14.5 12.5l2 2-2 2" />
    </>
  ),
  ia: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    </>
  ),
  emergentes: (
    <>
      <circle cx="12" cy="12" r="1.6" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </>
  ),
  'cloud-devops': (
    <>
      <path d="M7 18a4.5 4.5 0 0 1-.5-9 6 6 0 0 1 11.6 1.5A3.75 3.75 0 0 1 17.5 18H7z" />
      <path d="M3 21h18" />
    </>
  ),
  qualidade: (
    <>
      <path d="M12 2.5l8 3v6c0 4.7-3.4 8.6-8 10-4.6-1.4-8-5.3-8-10v-6l8-3z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </>
  ),
  design: (
    <>
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="5" rx="1.5" />
      <rect x="13" y="10" width="8" height="11" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
    </>
  ),
  recrutamento: (
    <>
      <circle cx="10" cy="8" r="4" />
      <path d="M3 21c0-3.9 3.1-7 7-7 1.4 0 2.6.4 3.7 1" />
      <circle cx="17.5" cy="17.5" r="3" />
      <path d="M19.7 19.7L22 22" />
    </>
  ),
};

export function AreaIcon({ id, size = 30, ...props }: IconProps & { id: string }) {
  return <svg {...base(size, { strokeWidth: 1.5, ...props })}>{AREA_PATHS[id]}</svg>;
}

/* Ícones das linhas de contacto (secção "Fale connosco"). */
const CONTACT_PATHS: Record<string, ReactNode> = {
  email: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="M21.5 7l-9.5 6L2.5 7" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  ),
  careers: (
    <>
      <rect x="2.5" y="7" width="19" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M2.5 12.5h19" />
    </>
  ),
  address: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
};

export function ContactIcon({ id, size = 28, ...props }: IconProps & { id: string }) {
  return <svg {...base(size, { strokeWidth: 1.5, ...props })}>{CONTACT_PATHS[id]}</svg>;
}

export function LinkedInIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z" />
    </svg>
  );
}

/* Ícones dos benefícios nas páginas de modelo (mockup modelo-v2): traço 1,7. */
const BENEFIT_PATHS: Record<string, string> = {
  team: 'M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6M22 19v-1a4 4 0 0 0-3-3.9M16 4.1a3 3 0 0 1 0 5.8',
  puzzle: 'M4 7h4a2 2 0 1 1 4 0h4v4a2 2 0 1 1 0 4v4H4v-4a2 2 0 1 0 0-4z',
  scale: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18M12 7v5l3 2',
  swap: 'M7 4L3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7',
  chart: 'M3 3v18h18M7 15l4-4 3 3 5-6',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16M21 21l-4.3-4.3',
  check: 'M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18',
  target: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8M12 12h.01',
  eye: 'M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6',
  layers: 'M12 3l9 5-9 5-9-5 9-5M3 13l9 5 9-5',
  spark: 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6',
  loop: 'M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5',
};

export function BenefitIcon({ id, size = 22, ...props }: IconProps & { id: string }) {
  return (
    <svg {...base(size, { strokeWidth: 1.7, ...props })}>
      <path d={BENEFIT_PATHS[id]} />
    </svg>
  );
}

export function CheckIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size, { strokeWidth: 2.4, ...props })}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

/* Ícones de "Porquê a Yellowipe" em Carreiras (mockup carreiras-v3): traço 1,8. */
const CAREER_PATHS: Record<string, string> = {
  projects: 'M3 7h18v13H3zM8 7V4h8v3',
  career: 'M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.6 7.1 18.2l.9-5.5-4-3.9 5.5-.8z',
  training: 'M4 19V5l8 4 8-4v14l-8-4z',
  ai: 'M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.8 2.8M16.2 16.2 19 19M5 19l2.8-2.8M16.2 7.8 19 5',
  remote: 'M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18',
  community:
    'M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M10 7a4 4 0 1 1 0 .1M21 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
};

export function CareerIcon({ id, size = 22, ...props }: IconProps & { id: string }) {
  return (
    <svg {...base(size, { strokeWidth: 1.8, ...props })}>
      <path d={CAREER_PATHS[id]} />
    </svg>
  );
}

export function SearchIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function PinIcon({ size = 14, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M12 21s7-6.1 7-11a7 7 0 0 0-14 0c0 4.9 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function UploadIcon({ size = 28, ...props }: IconProps) {
  return (
    <svg {...base(size, { strokeWidth: 1.8, ...props })}>
      <path d="M12 16V4M7 9l5-5 5 5M4 20h16" />
    </svg>
  );
}
