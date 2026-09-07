import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Producao e servida como estatico na Hostinger: sem runtime Node.
  output: 'export',
  // Fixa a forma das URLs antes de existirem paginas internas (Fase 2).
  trailingSlash: true,
};

export default nextConfig;
