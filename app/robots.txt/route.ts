import { site } from '@/data/content';

/**
 * robots.txt, gerado no build a partir de `site.url`. Sai como out/robots.txt.
 *
 * Acesso LIBERADO para buscadores e IA — decisao estrategica: para uma clinica
 * local, ser citada em respostas do tipo "clinica de implante em BH" vale mais
 * do que proteger conteudo institucional.
 *
 * Grupos de robots.txt NAO herdam: cada crawler obedece so ao grupo mais
 * especifico que casa com ele. Por isso os mesmos Disallow vao em todos os
 * grupos (auditoria SEO, nov/2026). Os grupos separam busca, IA de busca e
 * acionada pelo usuario, e IA de treino, para a politica ficar explicita.
 * Sem a linha Content-Signal (rascunho): o validador do Lighthouse e do Google
 * a trata como diretiva desconhecida e tira a nota de SEO de 100.
 */
export const dynamic = 'force-static';

const bloqueios = ['Disallow: /admin', 'Disallow: /*.json$', 'Disallow: /index.txt', 'Disallow: /__next', 'Disallow: /_not-found', 'Disallow: /404'];

const grupos: [string, string[]][] = [
  ['Todos', ['*']],
  ['Buscadores', ['Googlebot', 'Googlebot-Image', 'Bingbot', 'Applebot', 'DuckDuckBot', 'YandexBot']],
  [
    'IA de busca e agentes acionados pelo usuario',
    ['OAI-SearchBot', 'ChatGPT-User', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Amazonbot', 'meta-externalagent'],
  ],
  ['IA de treino (permitido)', ['GPTBot', 'ClaudeBot', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'Bytespider']],
];

export function GET() {
  const texto = [
    `# ${site.nome} — ${site.url}`,
    '# Politica: busca e respostas de IA permitidas; treino de IA permitido.',
    '',
    ...grupos.flatMap(([titulo, agentes]) => [
      `# --- ${titulo} ---`,
      ...agentes.map((a) => `User-agent: ${a}`),
      'Allow: /',
      ...bloqueios,
      '',
    ]),
    `Sitemap: ${site.url}/sitemap.xml`,
    '',
  ].join('\n');

  return new Response(texto, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
