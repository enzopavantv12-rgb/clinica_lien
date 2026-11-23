# GEO (Generative Engine Optimization): lienreabilitacao.com.br

Data da auditoria: 2026-11-23
Escopo: home, /llms.txt, /llms-full.txt, /robots.txt, /sitemap.xml, 2 artigos (implante-dentario-belo-horizonte, semaglutida-ozempic-wegovy-saude-bucal-bh)
Renderização: `render_page.py --mode auto`, fetch bruto (`is_spa: false`, sem Playwright, sem alerta de sandbox).

## GEO Readiness Score: 65/100

| Dimensão | Peso | Nota | Ponderado |
|---|---|---|---|
| Citabilidade | 25% | 58 | 14,5 |
| Legibilidade estrutural | 20% | 78 | 15,6 |
| Conteúdo multimodal | 15% | 50 | 7,5 |
| Autoridade e marca | 20% | 45 | 9,0 |
| Acessibilidade técnica | 20% | 92 | 18,4 |
| **Total** | | | **65** |

### Notas por plataforma (estimadas)

| Plataforma | Nota | Principal limitador |
|---|---|---|
| Google AI Overviews | 62 | Artigos curtos, sem fontes; perfil do Google Business fora do `sameAs` |
| Gemini | 58 | Mesmo grafo do Google; entidade fraca fora do site |
| ChatGPT Search | 52 | Depende de menções de terceiros (Reddit, diretórios, imprensa), que não foram encontradas |
| Perplexity | 60 | Gosta de páginas com fontes citadas e respostas diretas; faltam referências |
| Bing Copilot | 55 | Bing Places e diretórios locais não verificados |

## 1. Acesso de crawlers de IA (robots.txt)

robots.txt: HTTP 200, `text/plain`. Gerado por `app/robots.txt/route.ts`. Todos os bots nomeados têm `Allow: /`. Testei a home com UA de OAI-SearchBot, GPTBot, ClaudeBot, Claude-SearchBot e PerplexityBot: todos receberam HTTP 200 (sem bloqueio de WAF/CDN na Hostinger).

| Bot | Função | Status | Efeito |
|---|---|---|---|
| OAI-SearchBot | Índice do ChatGPT Search | Liberado | Pode aparecer e ser citado no ChatGPT Search |
| ChatGPT-User | Busca disparada pelo usuário no ChatGPT | Liberado | Pode ser lido quando o usuário pede |
| GPTBot | Treino da OpenAI (não afeta a busca do ChatGPT) | Liberado | Decisão de negócio; não afeta o ChatGPT Search |
| Claude-SearchBot | Índice de busca do Claude | Liberado | Pode ser citado no Claude |
| Claude-User | Busca disparada pelo usuário no Claude | **Ausente** (cai no `*`, ou seja, liberado) | Funciona, mas falta a declaração explícita |
| ClaudeBot | Treino da Anthropic | Liberado | Só treino |
| Claude-Web, anthropic-ai | Tokens antigos/obsoletos | Liberado | Sem efeito real; podem sair |
| PerplexityBot | Índice do Perplexity | Liberado | Pode ser citado |
| Perplexity-User | Busca disparada pelo usuário | Liberado | OK |
| Googlebot | Google Search **e AI Overviews/AI Mode** | Liberado | Requisito para AIO |
| Google-Extended | Treino e grounding do Gemini/Vertex (não governa AIO) | Liberado | Ajuda nas respostas do app Gemini com grounding |
| Bingbot | Bing e Copilot | Liberado | Requisito para o Copilot |
| Applebot | Siri/Spotlight/Safari | Liberado | OK |
| Applebot-Extended | Só treino da Apple Intelligence | Liberado | Só treino |
| Amazonbot, meta-externalagent, Bytespider, CCBot | Treino/assistentes | Liberado | Decisão de negócio |
| DuckAssistBot, MistralAI-User, cohere-ai | Assistentes menores | Ausente (cai no `*`) | Liberado por padrão |

Observações:
- Os grupos nomeados não herdam os `Disallow` do `*`. O comentário no robots.txt diz que o noindex desses caminhos vem do `vercel.json`, mas a produção está na **Hostinger** (`platform: hostinger`, `server: hcdn`). Hoje `/index.txt`, `/__next*.txt` e `/<slug>/index.txt` retornam 404, e `/_not-found`, `/404` e `/admin` retornam 308. Então não há vazamento de fato, mas o comentário está desatualizado.
- Não há `Content-Signal` nem licença RSL 1.0 (`/license.xml` 404; nenhuma diretiva `License:`). Isso não é necessário para ser citado.

### robots.txt recomendado (manter a política "liberar tudo")

```
# Lien Reabilitação Oral: https://lienreabilitacao.com.br

User-agent: *
Allow: /
Disallow: /admin
Disallow: /*.json$
Disallow: /index.txt
Disallow: /__next
Disallow: /_not-found
Disallow: /404

# Busca tradicional (Google Search + AI Overviews/AI Mode seguem o Googlebot)
User-agent: Googlebot
User-agent: Googlebot-Image
User-agent: Bingbot
User-agent: Applebot
Allow: /
Disallow: /admin
Disallow: /index.txt
Disallow: /__next
Disallow: /_not-found
Disallow: /404

# Busca e agentes de IA (citação em respostas)
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: PerplexityBot
User-agent: Perplexity-User
User-agent: DuckAssistBot
User-agent: MistralAI-User
Allow: /
Disallow: /admin
Disallow: /index.txt
Disallow: /__next
Disallow: /_not-found
Disallow: /404

# Treino e grounding de modelos (decisão de negócio: liberado)
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: Google-Extended
User-agent: Applebot-Extended
User-agent: Amazonbot
User-agent: meta-externalagent
User-agent: CCBot
User-agent: cohere-ai
Allow: /
Disallow: /admin
Disallow: /index.txt
Disallow: /__next
Disallow: /_not-found
Disallow: /404

Sitemap: https://lienreabilitacao.com.br/sitemap.xml
```

Como esses caminhos já dão 404/308 na Hostinger, repetir os `Disallow` em cada grupo é inofensivo (o argumento do "precisa ler o X-Robots-Tag" deixou de valer). Agrupar vários `User-agent` num mesmo bloco é válido pela RFC 9309. Remover `Claude-Web` e `anthropic-ai`, que estão obsoletos. `Bytespider` é opcional: ele ignora robots.txt com frequência e não traz citações.

## 2. llms.txt e llms-full.txt

| Arquivo | Status | Tamanho | Content-Type |
|---|---|---|---|
| /llms.txt | Presente, bem-formado (H1, blockquote, seções H2, lista de links) | 7,2 KB | text/plain; utf-8 |
| /llms-full.txt | Presente | 20,1 KB | text/plain; utf-8 |

Pontos fortes: gerados no build a partir de `content.ts` (não divergem do site); identificação completa (CNPJ, CRO, endereço, horário, "não atende convênios"); links de artigos com descrição; aviso clínico.

Problemas encontrados (o gerador é `src/lib/llms.ts`; NÃO foi modificado):
1. **Seção "O Método Lien em 4 Etapas" vazia no llms.txt**: ela imprime só `metodo.intro`; as 4 etapas aparecem apenas no full.
2. **"Como agendar" do llms.txt reaproveita `faq.itens[0].resposta`**, que é o texto sobre como é a primeira consulta, e não instruções de agendamento. Isso mistura dois assuntos no mesmo bloco.
3. **O llms-full.txt não tem o conteúdo dos artigos**: são 15 artigos, mas só aparecem título + meta description. O "conteúdo completo" não é completo, e esse é justamente o material clínico mais citável.
4. A FAQ "Onde a clínica está localizada?" não traz o endereço ("fica disponível no rodapé"). Um LLM que extrai só essa resposta fica sem o dado. Vale tanto para o site quanto para o llms-full.
5. A equipe (6 dentistas com CRO) só aparece no full. O llms.txt não lista nenhum profissional além da RT.
6. Os tratamentos no llms.txt não têm link (as âncoras `/tratamentos/#...` existem).
7. Falta data de atualização ("Atualizado em AAAA-MM-DD") e uma linha de "Fatos-chave" no topo (ano de fundação, bairro/região, público, diferenciais: sedação com anestesista, planejamento digital 3D, cirurgia guiada).
8. Não há `/.well-known/llms.txt` (404). É opcional, não prioritário.

### Estrutura recomendada para o llms.txt

```
# Lien Reabilitação Oral

> Clínica odontológica particular no bairro Cruzeiro (Centro-Sul de Belo Horizonte/MG), fundada em 2024 pela Dra. Natália Ferreira Simões (CRO-MG 49.821). Implantodontia digital, reabilitação oral, próteses, periodontia, DTM e sedação para quem tem medo de dentista.

Atualizado em: 2026-11-23

## Fatos-chave
- Endereço: Av. do Contorno, 5351, Edifício Asteca, Cruzeiro, Belo Horizonte/MG, CEP 30110-923
- WhatsApp: (31) 98507-0448 · E-mail · Horários
- Atendimento particular, sem convênios
- Diferenciais: planejamento digital 3D e cirurgia guiada; sedação oral e intravenosa com médico anestesista; equipe multidisciplinar (6 especialistas)
- CNPJ · Instagram · Perfil no Google (URL do GBP)

## Equipe
- Dra. Natália Ferreira Simões (CRO-MG 49.821): reabilitação oral, implantodontia, periodontia
- Dr. Alexander Pedrosa (CRO-MG 26.562): cirurgia bucomaxilofacial
- ... (os 6)

## Tratamentos
- [Implantodontia Digital](https://lienreabilitacao.com.br/tratamentos/#implantodontia-digital): resumo
- ...

## Método Lien
1. Escuta: ...  2. Diagnóstico: ...  3. Planejamento: ...  4. Acompanhamento: ...

## Como agendar
WhatsApp (31) 98507-0448 ou e-mail. Primeira consulta presencial; [texto da primeira consulta em uma linha separada].

## Artigos (Conteúdos em Saúde Bucal)
- [Título](url): descrição (data de publicação)

## Optional
- [Conteúdo completo](https://lienreabilitacao.com.br/llms-full.txt)
- [Política de privacidade](https://lienreabilitacao.com.br/privacidade/)

## Observação para agentes de IA
...
```

No llms-full.txt: incluir o corpo em Markdown de cada artigo (H2 = perguntas), com autor, data e URL canônica. A `todosArtigos()` já fornece os dados.

## 3. Citabilidade em nível de passagem

O que funciona:
- Os artigos usam H2 em forma de pergunta ("O que é um implante dentário?", "Implante dói? E quanto tempo leva?", "E periodontite?"), e a primeira frase de cada seção responde diretamente. É um ótimo padrão para extração.
- O tom é prudente e baseado em evidência (ex.: "não é adequado afirmar que semaglutida causa ou trata periodontite"), o que ajuda em YMYL.
- Tem byline ("Autoria: Dra. Natália Simões") e `<time datetime>`, além de schema Article com author `@id`.

Lacunas:
- **Artigos curtos**: cerca de 340 a 500 palavras, com seções de 40 a 80 palavras. Cada bloco é autocontido, mas raso. Faltam blocos de resposta de ~130-170 palavras (heurística de terceiros) para as perguntas de cauda longa ("quanto custa", "quanto tempo dura", "quem pode fazer").
- **Nenhuma fonte externa**: são 0 links de saída para literatura (PubMed, CFO, sociedades), e isso inclui o artigo sobre semaglutida, que fala em "suporte clínico". Perplexity e AIO dão preferência a afirmações com fonte.
- **Nenhum número concreto**: "altas taxas de sobrevivência" sem percentual nem fonte; prazos de osseointegração sem faixa. Estatísticas com atribuição estão entre os sinais mais fortes de citação.
- Sem resumo "Em resumo / Resposta rápida" no topo de cada artigo (40-60 palavras).
- Sem FAQ por artigo (o FAQPage existe só na home).
- FAQ da home "Onde a clínica está localizada?" sem endereço na resposta.
- Faltam conteúdos que respondem às perguntas comerciais típicas de IA: "quanto custa implante em BH" (faixas ou fatores de preço), "clínica com sedação para medo de dentista em BH", "implante com anestesista BH", "prótese protocolo valor".

## 4. Entidade e autoridade

Presentes: schema `Dentist`/`MedicalBusiness` com `@id` estável, endereço, horários, `areaServed`, `hasMap`, 10 `MedicalProcedure`; `Person` da RT com `@id`, `knowsAbout`, CRO (`PropertyValue`), `sameAs` Instagram; `BreadcrumbList`; `Article` com author/publisher; CNPJ e CRO visíveis.

Lacunas:
- `sameAs` da clínica tem só o Instagram. Faltam o Google Business Profile (URL `maps.google.com/?cid=...`), Facebook, LinkedIn da empresa, Doctoralia e diretórios locais.
- O `Person` da Dra. Natália tem `url` = home. Não há página de perfil própria nem `hasCredential`/`alumniOf`/`memberOf`, e falta link para a consulta pública do CRO-MG. Os outros 5 dentistas não têm `Person` no schema.
- A byline do artigo ("Especialista em Implantodontia e Prótese Dentária | Aperfeiçoamento em Periodontia") não bate com o card da equipe ("Reabilitação Oral | Implantodontia e Periodontia"). Convém unificar para evitar ambiguidade da entidade.
- Artigos sem `reviewedBy`/`lastReviewed`. Com `dateModified` igual a `datePublished` (2026-10-12) não há sinal de revisão.
- Sem `geo` (lat/long) no LocalBusiness.
- Sem `aggregateRating`. A home diz "Veja o que nossos pacientes dizem no Google", mas não linka o perfil do Google. Não marcar avaliações próprias como rating (o Google não aceita self-serving reviews para LocalBusiness); apenas linkar o GBP.
- O sitemap tem `lastmod` = data do build (2026-11-23) nas 18 URLs, o que dilui o sinal de frescor. O ideal é usar a data real de modificação de cada artigo.

### Presença de marca (sinais com mais correlação com citação em IA)

| Plataforma | Status |
|---|---|
| Wikipedia (pt) | Nenhum resultado para "Lien Reabilitação" (esperado para uma clínica local; não é meta realista) |
| Wikidata | Nenhuma entidade |
| YouTube | Nenhum canal ou vídeo verificável (a busca automatizada foi bloqueada). Este é o sinal com mais correlação (~0,74) |
| Reddit | Não verificável (API 403); provavelmente sem menções |
| LinkedIn | Não verificado (busca bloqueada) |
| Instagram | @clinica_lien e @dra.nataliasimoes (no schema) |
| Google Business Profile | Existe (avaliações mencionadas no site), mas não está ligado no schema nem no llms.txt |

Para uma clínica local, o que mais pesa nas respostas de IA é a consistência de NAP (nome, endereço, telefone) e as avaliações em GBP, Doctoralia, Reclame Aqui e Bing Places, mais menções em mídia local e listas do tipo "melhores clínicas de implante em BH".

## 5. Acessibilidade técnica

- SSR/SSG com Next.js (`x-nextjs-prerender: 1`): todo o texto, schema e FAQ está no HTML inicial, sem dependência de JS. Excelente para crawlers de IA, que não executam JS.
- HTTP 200 para todos os UAs de IA testados; CDN da Hostinger com cache HIT.
- `lang="pt-BR"`, canonical correto, sitemap com 18 URLs.
- llms.txt/llms-full.txt com `text/plain; charset=utf-8`.
- Imagens: 46 na home, 14 com `alt=""` (verificar se são todas decorativas). Os artigos têm 1 imagem de conteúdo cada, sem tabela nem diagrama.

## Top 5 mudanças de maior impacto

| # | Mudança | Impacto | Esforço |
|---|---|---|---|
| 1 | Expandir os 15 artigos: bloco "Resposta rápida" de 40-60 palavras, seções de 120-170 palavras, 2-4 referências (PubMed/CFO/ABO) com link, números com fonte (taxas de sobrevivência de implantes, prazos de osseointegração), FAQ por artigo, `reviewedBy` + `dateModified` real | Alto (AIO, Perplexity) | 2-3 dias de redação clínica |
| 2 | Ajustar o `src/lib/llms.ts` (fora deste escopo; mudança para o dono do código): corpo dos artigos no llms-full, etapas do Método no llms.txt, "Como agendar" separado da FAQ, equipe, links das âncoras de tratamento, "Atualizado em" e "Fatos-chave" | Médio-alto (ChatGPT, Claude, Perplexity) | 2-3 h |
| 3 | Entidade: GBP, Facebook, LinkedIn e Doctoralia no `sameAs`; `geo`; página de perfil por dentista com `Person` + CRO + formação; unificar a byline da Dra. Natália; FAQ "Onde fica" com o endereço completo | Alto (Google AIO/Gemini, Bing) | 4-6 h |
| 4 | Brand signals fora do site: perfis Doctoralia e Bing Places com NAP idêntico; pedir avaliações no Google; 3-5 vídeos curtos no YouTube (canal da clínica) respondendo às mesmas perguntas dos artigos, com link para o site; pautas em mídia local de BH | Alto (ChatGPT, Perplexity) | Contínuo; 1-2 dias para montar |
| 5 | Páginas comerciais que respondem consultas de IA: "Quanto custa implante dentário em BH" (fatores e faixa), "Dentista com sedação para quem tem medo em BH", "Prótese protocolo: etapas e prazos". Mais: robots.txt reorganizado (adicionar Claude-User, remover tokens obsoletos, corrigir o comentário sobre vercel.json) e `lastmod` real no sitemap | Médio | 1 dia de conteúdo; 30 min para robots/sitemap |

## Dados estruturados para audit-data.json (AI Search Readiness)

```json
{
  "category": "AI Search Readiness",
  "score": 65,
  "dimensions": {"citability": 58, "structural_readability": 78, "multimodal": 50, "authority_brand": 45, "technical_accessibility": 92},
  "platform_scores": {"google_aio": 62, "gemini": 58, "chatgpt": 52, "perplexity": 60, "bing_copilot": 55},
  "crawlers": {"OAI-SearchBot": "allowed", "ChatGPT-User": "allowed", "GPTBot": "allowed", "Claude-SearchBot": "allowed", "Claude-User": "implicit-allowed", "ClaudeBot": "allowed", "PerplexityBot": "allowed", "Perplexity-User": "allowed", "Googlebot": "allowed", "Google-Extended": "allowed", "Bingbot": "allowed", "Applebot": "allowed", "Applebot-Extended": "allowed", "CCBot": "allowed"},
  "llms_txt": {"status": "present", "well_formed": true, "issues": ["metodo sem etapas", "como-agendar reutiliza FAQ", "llms-full sem corpo dos artigos", "sem equipe", "sem data de atualizacao"]},
  "llms_full_txt": {"status": "present", "size_kb": 20.1},
  "rsl_license": "missing",
  "findings": [
    {"id": "geo-01", "severity": "high", "title": "Artigos curtos e sem fontes externas ou estatisticas"},
    {"id": "geo-02", "severity": "high", "title": "llms-full.txt nao inclui o conteudo dos artigos"},
    {"id": "geo-03", "severity": "high", "title": "Entidade fraca fora do site: sameAs so com Instagram, sem GBP/YouTube/diretorios"},
    {"id": "geo-04", "severity": "medium", "title": "llms.txt: Metodo sem etapas e 'Como agendar' com texto da FAQ"},
    {"id": "geo-05", "severity": "medium", "title": "FAQ 'Onde fica' sem endereco; byline inconsistente com o card da equipe"},
    {"id": "geo-06", "severity": "medium", "title": "Sem reviewedBy/dateModified real; sitemap lastmod = data do build"},
    {"id": "geo-07", "severity": "low", "title": "robots.txt: falta Claude-User, tokens obsoletos, comentario cita vercel.json (producao na Hostinger)"}
  ]
}
```
