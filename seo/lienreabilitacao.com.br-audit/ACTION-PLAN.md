# Plano de ação SEO: lienreabilitacao.com.br

Auditoria de 23/11/2026, feita com a skill claude-seo. Sete especialistas (técnico, conteúdo, schema, GEO, agentes, local e backlinks) olharam os 4 pilares: técnico, on-page, off-page e local. Os detalhes de cada um estão em `findings/`.

**Nota de saúde SEO:**
- Antes das correções: cerca de **74/100**.
- Estimativa depois do que já foi feito no código: cerca de **80/100**.
- O que falta depende de conteúdo novo aprovado pela clínica e de trabalho fora do site.

## Já feito no código (23/11/2026)

**SEO técnico**
- `next.config.mjs` com os headers de segurança (HSTS, nosniff, X-Frame-Options, Referrer-Policy e Permissions-Policy) e com redirect 301 de `www` para o domínio raiz. A produção na Hostinger roda o servidor do Next; conferir depois do deploy se os dois entraram.
- `vercel.json` com redirect 301 de `clinica-lien.vercel.app` para o domínio oficial, mantendo o caminho.
- Robots.txt reorganizado:
  - grupos separados para buscadores, IA de busca e acionada pelo usuário, e IA de treino;
  - os bloqueios repetidos em todos os grupos, porque os grupos não herdam regras uns dos outros;
  - saíram os nomes obsoletos (`Claude-Web`, `anthropic-ai`) e entrou o `Claude-User`.
- Sitemap com `lastmod` real por página, tirado do git, e sem `changefreq`/`priority`.
- Página 404 com `noindex` e sem o canonical da home herdado do layout.
- `favicon.ico` na raiz.

**Schema (dados estruturados)**
- `WebSite` novo.
- Bloco `Dentist`:
  - `geo` com as coordenadas do OpenStreetMap para a Av. do Contorno, 5351;
  - foto real da clínica e `logo` como `ImageObject`;
  - `hasOfferCatalog` com os 10 tratamentos, sem preço;
  - `employee` com os 6 profissionais e seus CROs;
  - `founder` apontando para o `@id` da Dra. Natália;
  - `medicalSpecialty` no formato do schema.org.
- Person da Dra. Natália: ganhou `image` e `hasCredential` com o CRO-MG.
- `Article` nos 14 artigos: ganhou `image`, autor com `url` e CRO, `dateModified` real, `publisher.logo` como `ImageObject` e `isPartOf` ligado ao WebSite.

**On-page**
- `og-image.jpg` de 1200×630 criada. Antes ela dava 404, e o link compartilhado no WhatsApp ia sem imagem.
- Títulos: os 3 que passavam de 60 caracteres foram encurtados, e outros 2 foram ajustados.
- Meta descriptions: as 4 que passavam de 160 caracteres foram encurtadas (home, /tratamentos/, implante, semaglutida).
- Links internos:
  - 21 links no corpo dos artigos, só sobre palavras que o texto aprovado já tinha, sem mudar o texto;
  - o "Leia também" agora faz rodízio, e os links se distribuem entre os 14 artigos.
- Na autoria dos artigos entraram o CRO, a data "Atualizado em" e uma linha fixa com o endereço no Cruzeiro, em BH.

**GEO (motores de IA)**
- `llms.txt` refeito:
  - bloco de fatos-chave e data de atualização;
  - links Markdown para cada tratamento;
  - as 4 etapas do Método e a equipe com CRO;
  - instrução real de agendamento.
- `llms-full.txt` agora traz o texto integral dos 14 artigos (antes só título e descrição).

**Lighthouse (build local):** Acessibilidade, Práticas recomendadas e SEO ficaram em 100 nas 5 páginas testadas, no celular e no desktop. Desempenho ficou em 100 no desktop e entre 95 e 99 no celular.

## Fase 1: crítico e alto, semana 1 (clínica e equipe)

1. **Search Console e Bing Webmaster:** verificar o domínio e enviar `https://lienreabilitacao.com.br/sitemap.xml`. Depois, colar o código de verificação em `seo.googleVerification` no `content.ts`.
2. **Google Business Profile:**
   - site novo com UTM, categoria principal Dentista, serviços sem preço;
   - mais de 25 fotos reais, posts semanais e perguntas e respostas;
   - passar o link do perfil para colocar em `google.url`, no `sameAs` do schema e no botão "Ver no Google" dos depoimentos.
3. **Confirmar com a clínica:**
   - as coordenadas do `geo` (-19.93936, -43.92694);
   - a sala ou andar do Edifício Asteca;
   - se (31) 98507-0448 é o número único de atendimento.
4. **Avaliações:** criar uma rotina, com QR code e link curto, pedindo a todos os pacientes, sem filtro e sem incentivo. Responder em até 48h sem citar dados de saúde.
5. **Conferir depois do deploy:**
   - se `www` redireciona para o domínio raiz e os headers de segurança aparecem;
   - se `clinica-lien.vercel.app` redireciona.
   - Se a Hostinger não aplicar os headers, configurar no hPanel ou num CDN.

## Fase 2: impacto alto, semanas 2 e 3 (conteúdo novo, aprovado pela clínica)

1. **Páginas próprias de serviço:**
   - `/tratamentos/implante-dentario/`
   - `/tratamentos/reabilitacao-oral/`
   - `/tratamentos/lentes-de-contato-dental/`
   - `/sedacao-medo-de-dentista/`

   Cada uma com H1 "serviço + BH", texto aprovado do card, FAQ própria, profissional com CRO, antes e depois do tema e endereço. É o maior ganho para buscas de quem quer contratar.
2. **Aprofundar os 14 artigos** sem reescrever o texto aprovado. Hoje eles têm de 155 a 500 palavras. Acrescentar em cada um:
   - um "Em resumo" de 40 a 60 palavras;
   - um bloco "Na prática da Lien";
   - de 4 a 6 perguntas frequentes;
   - referências (PubMed, CFO, ABO);
   - "Revisado por", com outra profissional quando o tema for da área dela.
3. **Página de perfil para cada profissional** (`/equipe/dra-natalia-simoes/` etc.), com schema `Person`, CRO e formação.
4. **Seção "Como chegar"**: mapa que só carrega no clique, estacionamento, acessibilidade e referências, citando Savassi e Funcionários de forma natural.

## Fase 3: autoridade, mês 2 (fora do site)

1. **Citações com nome, endereço e telefone idênticos:**
   - Doctoralia (clínica e cada profissional), Apple Business Connect, Bing Places, Facebook, LinkedIn;
   - TeleListas, Apontador, Foursquare e Waze.
2. **Links editoriais:**
   - associações (ABO, sociedades de implantodontia e prótese) e faculdades;
   - imprensa de BH (O Tempo, Estado de Minas, Itatiaia) com pauta educativa;
   - parceiros (laboratórios, médicos, fisioterapeutas).
3. **Vídeos curtos no YouTube** respondendo às perguntas dos artigos. É o sinal mais ligado a ser citado por IA.
4. **Revisão no CRO-MG:**
   - termos: "relaxamento absoluto", "total segurança", "alto padrão", "o sorriso que você merece", "tecnologia de ponta", "Localização privilegiada";
   - os títulos de especialista na equipe.

## Fase 4: acompanhamento contínuo

- Atualizar o número de avaliações do Google na home ("57"), que está fixo no código.
- Medir o PageSpeed real (CrUX) quando houver tráfego, e o Search Console mês a mês.
- Reavaliar os backlinks em 6 meses (meta: de 15 a 25 domínios de referência), com Moz gratuito.

## Fora do escopo, por regra da clínica ou do CFO

- Nenhuma página ou texto com preço ("quanto custa implante"), promoção, "garantido", "sem dor" como promessa, "100%" ou superlativo.
- Sem `aggregateRating` no schema: autoavaliação contraria a política do Google.
