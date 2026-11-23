# Auditoria SEO completa: lienreabilitacao.com.br

**Data:** 23/11/2026.
**Ferramenta:** claude-seo 2.6.2, com 7 especialistas: técnico, conteúdo, schema, GEO, agentes, local e backlinks.
**Tipo de negócio:** clínica odontológica com endereço físico. Serviço local (YMYL, saúde).

## Notas por categoria (antes das correções de 23/11)

| Categoria | Peso | Nota |
|---|---|---|
| SEO técnico | 22% | 82 |
| Qualidade de conteúdo (E-E-A-T) | 23% | 58 |
| On-page | 20% | ~72 |
| Schema | 10% | ~75 |
| Desempenho (Core Web Vitals, laboratório) | 10% | 95 |
| Prontidão para busca por IA (GEO) | 10% | 65 |
| Imagens | 5% | ~90 |
| **Nota de saúde SEO** | | **~74** |

Outras métricas:
- SEO local, estimado: 54/100.
- Prontidão para agentes de IA, na heurística: 100/100.
- Backlinks: dados insuficientes. O domínio é novo e ainda não aparece no Common Crawl.

Depois das correções no código, a estimativa é de ~80. O ganho restante vem de conteúdo e autoridade fora do site (ver `ACTION-PLAN.md`).

## Resumo por pilar

**Técnico**
- Está bom:
  - sitemap válido, com as 18 URLs respondendo 200;
  - canonicals que apontam para a própria página;
  - http redirecionando para https;
  - compressão brotli;
  - conteúdo e JSON-LD já no HTML inicial;
  - 404 real.
- Corrigido em 23/11:
  - `www` duplicado e o espelho na Vercel, com redirect 301;
  - headers de segurança;
  - sinais conflitantes na página 404;
  - `lastmod` real no sitemap;
  - robots.txt organizado;
  - `favicon.ico` na raiz.

**On-page e conteúdo**
- Está bom: um H1 por página, títulos e metas únicos, autoria visível com CRO.
- Corrigido em 23/11:
  - `og-image` que dava 404;
  - títulos e metas longos;
  - links internos no corpo dos artigos e "Leia também" em rodízio;
  - linha com o endereço em todos os artigos.
- Pendente:
  - os artigos são curtos para um tema de saúde;
  - falta página própria para cada serviço;
  - faltam referências e revisoras.

**Off-page**
- Não há dados de links (domínio novo).
- O plano de citações, imprensa e parcerias está em `findings/backlinks.md`.

**Local**
- Nome, endereço e telefone estão consistentes dentro do site.
- Corrigido em 23/11: `geo`, equipe e catálogo de tratamentos no schema.
- Pendente: otimizar o Google Business Profile, criar a rotina de avaliações, as citações e a seção "Como chegar".

**IA e GEO**
- Todos os crawlers de IA estão liberados.
- Corrigido em 23/11: `llms.txt` refeito e `llms-full.txt` com o texto integral dos artigos.
- Pendente: aprofundar os artigos, criar os sinais da marca fora do site (YouTube, Doctoralia) e completar o `sameAs` com o perfil do Google.

## Lighthouse depois das correções (build local)

| Página | Celular | Desktop |
|---|---|---|
| Home | 95 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| /tratamentos/ | 96 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| /conteudos/ | 99 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| Artigo (implante) | 99 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| /privacidade/ | 99 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |

As notas seguem a ordem Desempenho / Acessibilidade / Práticas recomendadas / SEO.

## Observações

- **Content-Signal:** a diretiva `Content-Signal` no robots.txt (rascunho) foi testada e removida. O Lighthouse a trata como diretiva desconhecida, e a nota de SEO cairia de 100 para 92.
- **Sandbox:** nenhuma página foi renderizada fora do sandbox do navegador.
- **PageSpeed Insights:** a API pública devolveu 429 (cota excedida), então a fração "Agentic Browsing" do Lighthouse não foi medida.
