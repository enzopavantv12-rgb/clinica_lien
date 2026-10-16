import { site } from '@/data/content';
import { todosArtigos } from '@/lib/artigos';

/**
 * sitemap.xml, gerado no build: dominio de `site.url` e `lastmod` = data do
 * build. Substitui o arquivo estatico e o script que atualizava o lastmod.
 *
 * URLs sempre com barra final: next.config.mjs usa trailingSlash: true, e a
 * URL sem barra responde 301.
 *
 * Paginas: home, /tratamentos/, /conteudos/, os 14 artigos (URLs do PDF, na
 * raiz) e a privacidade.
 */
export const dynamic = 'force-static';

const paginas = [
  { caminho: '/', frequencia: 'weekly', prioridade: '1.0' },
  { caminho: '/tratamentos/', frequencia: 'monthly', prioridade: '0.9' },
  { caminho: '/conteudos/', frequencia: 'weekly', prioridade: '0.8' },
  ...todosArtigos().map((a) => ({ caminho: `/${a.slug}/`, frequencia: 'monthly', prioridade: '0.7' })),
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
