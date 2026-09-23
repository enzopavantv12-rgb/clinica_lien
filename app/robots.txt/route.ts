import { site } from '@/data/content';

/**
 * robots.txt, gerado no build: o dominio vem de `site.url`, o unico lugar a
 * trocar quando o dominio proprio for apontado. Sai como out/robots.txt.
 *
 * Acesso LIBERADO para crawlers de IA — decisao estrategica: para uma clinica
 * local, ser citada em respostas do tipo "melhor clinica de implante em BH"
 * vale mais do que proteger conteudo institucional.
 *
 * Grupos de robots.txt NAO herdam: um crawler obedece so ao grupo mais
 * especifico que casa com ele. Por isso os Disallow ficam no grupo `*` e nao
 * alcancam os crawlers nomeados — e esta certo assim para os dumps RSC: eles
 * recebem `X-Robots-Tag: noindex` pelo vercel.json, e o crawler precisa poder
 * buscar o arquivo para ler o header. Um Disallow o impediria de ver o noindex.
 */
export const dynamic = 'force-static';

const buscadores = ['Googlebot', 'Googlebot-Image', 'Bingbot'];

const agentesIA = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
  'Amazonbot',
  'meta-externalagent',
  'Bytespider',
  'CCBot',
];

const grupo = (agentes: string[]) => agentes.map((a) => `User-agent: ${a}\nAllow: /`).join('\n');

export function GET() {
  const texto = [
    `# ${site.nome} — ${site.url}`,
    '',
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin',
    'Disallow: /*.json$',
    '# Dumps de payload RSC do export do Next e paginas de erro publicadas com',
    '# status 200. Os crawlers nomeados abaixo nao herdam estas linhas; para',
    '# eles o noindex vem do header X-Robots-Tag (vercel.json).',
    'Disallow: /index.txt',
    'Disallow: /__next',
    'Disallow: /_not-found',
    'Disallow: /404',
    '',
    '# --- Crawlers de busca ---',
    grupo(buscadores),
    '',
    '# --- Crawlers e agentes de IA (acesso explicitamente permitido) ---',
    grupo(agentesIA),
    '',
    `Sitemap: ${site.url}/sitemap.xml`,
    '',
  ].join('\n');

  return new Response(texto, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
