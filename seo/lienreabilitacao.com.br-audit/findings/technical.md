# Auditoria Técnica - lienreabilitacao.com.br (2026-11-23)

Score técnico: 82/100

## Passa
- sitemap.xml válido (18 URLs, todas 200, canonical autorreferente, declarado no robots.txt).
- robots.txt coerente; AI crawlers liberados; /index.txt, /__next, /404 bloqueados.
- http->https 301 no apex; sem trailing slash -> 308 para com barra (consistente com trailingSlash:true).
- lang="pt-BR", viewport ok, og:locale pt_BR; sem hreflang (correto, site monolíngue).
- Brotli ativo (home 357 KB -> 66 KB). JSON-LD presente (FAQPage, MedicalProcedure, Place etc.).
- 404 real (status 404) para URLs inexistentes.

## Critical
Nenhum.

## High
1. www duplica o site: http://www -> https://www responde 200 (sem redirecionar para o apex). Só o canonical evita duplicação. Corrigir no hPanel (Domínios > redirecionar www para apex, 301) ou no proxy. Em Node/Next: `redirects()` não existe com output:'export'; usar o redirecionamento do hPanel/Cloudflare.
2. Espelho https://clinica-lien.vercel.app/ indexável: 200, robots index,follow, robots.txt liberado, canonical aponta para o domínio oficial (mitiga). Fix: em /Users/enzopavan/Documents/clinica_lien/vercel.json adicionar header `X-Robots-Tag: noindex` para `has: host clinica-lien.vercel.app`, ou melhor, 301 do host vercel.app para o domínio (redirects com `has: [{type:"host", value:"clinica-lien.vercel.app"}]`, destination https://lienreabilitacao.com.br/:path*, permanent true) ou desativar o projeto/proteger deployments. Também no Search Console remover URLs do espelho se aparecerem.
3. Zero security headers em produção (sem HSTS, X-Content-Type-Options, X-Frame-Options/frame-ancestors, Referrer-Policy, Permissions-Policy). Só `content-security-policy: upgrade-insecure-requests` (injetado pela Hostinger). O vercel.json só cobre o espelho. Os headers do public/.htaccess (X-Robots-Tag, ForceType do llms.txt) provavelmente NÃO estão sendo aplicados: a resposta vem com `x-powered-by: Next.js`/`x-nextjs-cache`, ou seja, servidor Node via hcdn, não Apache. Confirmar o modelo de deploy (memória do projeto diz "estático"; a produção se comporta como runtime Next). Se for Node, as regras do .htaccess são inúteis; configurar headers em next.config.mjs só funciona sem output:'export' - alternativa: headers no hPanel/Cloudflare (Transform Rules). Valores sugeridos: Strict-Transport-Security: max-age=31536000; includeSubDomains; X-Content-Type-Options: nosniff; Referrer-Policy: strict-origin-when-cross-origin; X-Frame-Options: SAMEORIGIN; Permissions-Policy: camera=(), microphone=(), geolocation=().

## Medium
4. Página 404 com sinais conflitantes: contém `noindex` E `index, follow` + `canonical` para a home (metadata do layout vazando no not-found). Status 404 mitiga, mas limpar: não herdar canonical/robots no app/not-found (exportar `metadata = { robots:{index:false}, alternates:{canonical:null} }` ou mover canonical para as páginas em vez do layout raiz).
5. HTML pesado: 170-360 KB por página bruto (payload RSC embutido + CSS inline); depende de brotli. Home 357 KB. Reduzir props serializadas em componentes client (ex.: dados longos de conteúdo passados a client components) e JSON-LD repetido.
6. Sitemap: lastmod = 2026-11-23 em todas as URLs (data do build), sem relação com a última edição real. Google tende a ignorar lastmod pouco confiável. Gerar lastmod da data real do conteúdo (frontmatter/git log) na geração do sitemap em /Users/enzopavan/Documents/clinica_lien/scripts ou app/sitemap.ts. changefreq/priority são ignorados (pode remover).
7. Cache-Control do HTML `s-maxage=31536000` (1 ano em CDN) com x-nextjs-cache HIT: risco de conteúdo velho após deploy se o purge do hcdn falhar. Verificar purge pós-deploy; sitemap com lastmod novo não prova HTML novo.
8. robots.txt: grupos nomeados (Googlebot, Bingbot etc.) com só `Allow: /` ignoram os Disallow do grupo *. Já documentado no arquivo; como o noindex via header pode não ser servido (item 3), /index.txt está 404 na produção (ok), mas confirmar que /__next*.txt também 404. `Bytespider`/`CCBot` liberados: decisão de negócio, não técnica.

## Low
9. IndexNow não implantado (sem chave .txt na raiz; /indexnow.txt 404). Opcional: gerar chave, salvar `public/<chave>.txt` e disparar POST para https://api.indexnow.org/indexnow com as 18 URLs pós-deploy (Bing/Yandex/Naver; Google não usa).
10. Sem hreflang: ok. Sem favicon .ico na raiz (só PNG); adicionar `app/favicon.ico` ou /favicon.ico para crawlers legados.
11. Renderização: SSG/SSR, todo o conteúdo e JSON-LD no HTML inicial; sem dependência de JS para indexação (Pass).
12. Mobile: viewport correto, hero com preload AVIF separado mobile/desktop (bom para LCP). Sem checagem de touch targets via fonte além do Lighthouse.
