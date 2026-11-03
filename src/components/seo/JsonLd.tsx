import { serializeJsonLd } from '@/lib/seo/jsonld';

type Props = { data: Record<string, unknown> | Record<string, unknown>[] | null };

/** Dados estruturados no HTML inicial (o Google lê-os sem executar JavaScript). */
export function JsonLd({ data }: Props) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
