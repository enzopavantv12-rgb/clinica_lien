# Agent readiness - lienreabilitacao.com.br (2026-11-23)

## Lighthouse Agentic Browsing
Indisponivel: PSI HTTP 429 (cota diaria excedida, mobile e desktop). Sem fracao X/N. Repetir com chave Google API (/seo google setup).

## Agent-UX heuristica (separada do Lighthouse): 100/100, completa
1339 nos na arvore a11y, 65 interativos, 0 sem nome, 0 div onclick, 35 landmarks, 0 inputs sem label.

## Achados
- P0 pass: conteudo sem JS (1782 palavras); robots.txt 200 com 20 grupos; grupos de IA nomeados (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot); nenhum crawler de busca bloqueado.
- P1 pass: llms.txt 200 text/plain 7015 bytes (+ llms-full.txt 200); 404 correto (sem soft-404).
- P1 aviso: llms.txt tem 1 item "Site: https://..." sem formato [nome](url) (malformed-link); demais notas sao informativas (H2 sem links, itens sem link). Fix: public/llms.txt, escrever [Site](https://lienreabilitacao.com.br) e listar paginas como [Tratamentos](url).
- P1 info: Content-Signal ausente (rascunho Cloudflare/IETF, preferencia, Google nao age sobre ele; verificado 2026-09-23). Opcional em public/robots.txt: Content-Signal: search=yes, ai-input=yes, ai-train=no (decisao de politica do cliente).
- P1 info: Markdown ausente (sem Accept negotiation, sem rel=alternate, /index.md 404). Oportunidade. Em export estatico, Accept/Vary nao e possivel na Hostinger; viavel: gerar .md por pagina em public/ e link rel=alternate type=text/markdown.
- P2 info: WebMCP ausente (0 registerTool, 0 forms). Rascunho; oportunidade (ex.: ferramenta "agendar avaliacao" via WhatsApp), so via script client-side.
- P3 n/a: ai-catalog.json 404 (rascunho; so publicar se houver recursos de agente), api-catalog, oauth-*, agent-card, ucp 404 - nao se aplicam a clinica sem API.

## Politica de acesso
- Treino (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot): permitido (Allow /).
- Busca (OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot, Bingbot): permitido.
- Acionado pelo usuario (ChatGPT-User, Perplexity-User, Claude-User): permitido; ChatGPT-User pode nao aplicar robots, Perplexity-User/Google-Agent geralmente ignoram, Claude-User respeita.
- Se quiser permitir busca e bloquear treino, mudar os grupos de treino para Disallow: / (decisao do cliente).

## Notas de status (verificado 2026-09-23, vendor-matrix)
WebMCP, Content-Signal, ai-catalog.json e Web Bot Auth sao rascunhos/propostas; llms.txt e proposta comunitaria. Sem promessa de ranking, citacao ou trafego.

## Observacoes
robots.txt cita X-Robots-Tag em vercel.json, mas o host e Hostinger: conferir se o header realmente e aplicado (use .htaccess) ou se /index.txt e /__next continuam indexaveis.
Nao foi detectado aviso de sandbox. Codigo-fonte nao modificado.
