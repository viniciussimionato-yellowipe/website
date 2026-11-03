import type { NextConfig } from 'next';

/**
 * Cabeçalhos de segurança aplicados a todas as respostas.
 * A Content-Security-Policy completa (com nonce) fica para quando o GTM e a
 * plataforma de consentimento estiverem escolhidos — ver docs/08-seguranca-e-privacidade.md.
 */
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      // Imagens de public/ sem hash no nome: cache de um dia, servida da cache mais uma semana
      // enquanto revalida. As versões otimizadas (next/image) têm cache própria.
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
    ];
  },
  async redirects() {
    // Mapa de redirecionamentos 301 do site atual: preencher a partir de
    // docs/redirects.csv (Sprint 0) e testar em staging antes do lançamento.
    return [];
  },
};

export default nextConfig;
