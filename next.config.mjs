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
  experimental: {
    // CSS embutido no HTML (~13 KB): tira a folha de estilo do caminho
    // critico, que bloqueava a renderizacao do hero no celular (Lighthouse).
    inlineCss: true,
  },
};

export default nextConfig;
