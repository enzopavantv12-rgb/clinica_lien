/**
 * Config em JavaScript puro (ESM), sem TypeScript: o servidor da Hostinger
 * tem uma GLIBC antiga, o SWC nativo nao carrega e o Next nao consegue
 * compilar um next.config.ts. Nao importar nenhum arquivo .ts aqui.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Producao e servida como estatico na Hostinger: sem runtime Node.
  output: 'export',
  // URLs sempre com barra final (/tratamentos/, /<artigo>/).
  trailingSlash: true,
  // Producao na Hostinger roda o servidor do Next (x-powered-by: Next.js), que
  // aplica headers() e redirects(); no `next build` estatico eles so geram
  // aviso. Seguranca (auditoria SEO tecnica, nov/2026) e www -> dominio raiz.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.lienreabilitacao.com.br' }],
        destination: 'https://lienreabilitacao.com.br/:path*',
        permanent: true,
      },
    ];
  },
  experimental: {
    // CSS embutido no HTML (~13 KB): tira a folha de estilo do caminho
    // critico, que bloqueava a renderizacao do hero no celular (Lighthouse).
    inlineCss: true,
  },
};

export default nextConfig;
