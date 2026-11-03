import { existsSync } from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import { monogram } from '@/content/technologies/build';

/**
 * Logótipo de uma tecnologia (public/images/tech). Sem ficheiro, mostra as iniciais
 * num quadrado neutro: nunca se desenha uma versão própria do logótipo de outra marca.
 * Componente de servidor: confirma que o ficheiro existe em public/ antes de o usar.
 */
export function TechLogo({
  name,
  logo,
  size,
  className = '',
}: {
  name: string;
  logo?: string;
  size: number;
  className?: string;
}) {
  if (logo && existsSync(path.join(process.cwd(), 'public', logo)))
    return (
      <Image
        src={logo}
        alt=""
        width={size}
        height={size}
        className={className}
        style={{ width: size, height: size }}
      />
    );
  return (
    <span
      aria-hidden="true"
      className={`inline-flex flex-none items-center justify-center rounded-md bg-navy font-mono font-semibold text-white ${className}`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.42) }}
    >
      {monogram(name)}
    </span>
  );
}
