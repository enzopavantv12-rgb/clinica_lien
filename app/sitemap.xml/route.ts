import { site } from '@/data/content';
import { DATA_PUBLICACAO, todosArtigos } from '@/lib/artigos';
import { dataGit } from '@/lib/dataGit';

/**
 * sitemap.xml, gerado no build a partir de `site.url`.
 *
 * `lastmod` real de cada pagina (auditoria SEO, nov/2026): a data do ultimo
 * commit que mexeu nos arquivos dela (git log). Sem git no build (ou com clone
 * raso), cai na data de publicacao dos artigos ou na data do build. Sem
 * changefreq/priority: o Google ignora os dois.
 */
export const dynamic = 'force-static';

const hoje = new Date().toISOString().slice(0, 10);

const paginas = [
  { caminho: '/', lastmod: dataGit(['app/page.tsx', 'src/data/content.ts', 'src/components/sections'], hoje) },
  { caminho: '/tratamentos/', lastmod: dataGit(['app/tratamentos', 'src/data/content.ts', 'src/components/sections/GradeTratamentos.tsx'], hoje) },
  { caminho: '/conteudos/', lastmod: dataGit(['app/conteudos', 'content/artigos'], hoje) },
  ...todosArtigos().map((a) => ({
    caminho: `/${a.slug}/`,
    lastmod: dataGit([`content/artigos/${a.slug}.md`], DATA_PUBLICACAO),
  })),
  { caminho: '/privacidade/', lastmod: dataGit(['app/privacidade'], hoje) },
];

export function GET() {
  const urls = paginas
    .map((p) => `  <url>\n    <loc>${site.url}${p.caminho}</loc>\n    <lastmod>${p.lastmod}</lastmod>\n  </url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
