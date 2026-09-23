import { site } from '@/data/content';

/**
 * sitemap.xml, gerado no build: dominio de `site.url` e `lastmod` = data do
 * build. Substitui o arquivo estatico e o script que atualizava o lastmod.
 *
 * URLs sempre com barra final: next.config.ts usa trailingSlash: true, e a
 * URL sem barra responde 301.
 *
 * FASE 2 — acrescentar aqui conforme as paginas forem publicadas:
 *   /implantes-dentarios-belo-horizonte/  0.9
 *   /reabilitacao-oral-belo-horizonte/    0.8
 *   /protese-dentaria-belo-horizonte/     0.8
 *   /periodontia-belo-horizonte/          0.7
 *   /lentes-de-contato-dental-bh/         0.7
 *   /disfuncao-atm-belo-horizonte/        0.7
 */
export const dynamic = 'force-static';

const paginas = [
  { caminho: '/', frequencia: 'weekly', prioridade: '1.0' },
  { caminho: '/privacidade/', frequencia: 'yearly', prioridade: '0.3' },
];

export function GET() {
  const hoje = new Date().toISOString().slice(0, 10);
  const urls = paginas
    .map(
      (p) =>
        `  <url>\n    <loc>${site.url}${p.caminho}</loc>\n    <lastmod>${hoje}</lastmod>\n` +
        `    <changefreq>${p.frequencia}</changefreq>\n    <priority>${p.prioridade}</priority>\n  </url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
