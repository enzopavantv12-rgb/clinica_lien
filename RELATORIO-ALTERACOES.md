# Relatório de alterações — copy e arquitetura do briefing

**Site:** Lien Reabilitação Oral · **Data:** setembro de 2026
**Base:** `prompt-claude-code-site-lien.md`, a partir do briefing oficial preenchido pela clínica (Wolfness Company)
**Branch:** `copy-briefing` (parte de `marca-oficial`, que traz a logo e a padronagem oficiais)

---

## 0. Antes de tudo: o que o site anterior tinha de errado

O briefing revelou problemas no site que estava pronto para ir ao ar. Nenhum chegou a ser publicado — a `main` não foi enviada —, mas quatro deles seriam problemas éticos perante o CFO:

| Problema | Por quê | O que foi feito |
|---|---|---|
| **"+150 Pacientes reabilitados"** e **"+8 anos de excelência clínica"** | O briefing registra fundação em 2024 (cerca de 2 anos e 6 meses) e manda **não** publicar o número real de reabilitações, que é da ordem de 3. Os dois números vieram como `[[CONFIRMAR]]` do prompt original e nunca foram confirmados. | Removidos. A Barra de confiança só publica fatos do briefing. |
| **Depoimento de "Maria C."** | O briefing diz que os depoimentos estão vazios. Esse texto veio do prompt original, sem origem registrada — e estava publicado também no `llms-full.txt`, para os agentes de IA. | Removido do site e do `llms-full.txt` até ser confirmado. |
| **"Protocolo que garante previsibilidade, segurança e resultados duradouros"** | Promessa de resultado: vedada pelo Código de Ética Odontológica. | Removido. |
| **"avaliação" em 17 lugares**, inclusive o botão principal e todas as mensagens de WhatsApp | Vocabulário proibido pelo briefing. | Zerado. |

Também estavam errados: o horário (o site dizia seg–sex, 8h–19h), o Instagram (`@clinicalien` no lugar de `@dra.nataliasimoes`), o `priceRange: "$$$"` no schema (sinal de preço) e o texto "sem compromisso" (linguagem de varejo).

---

## 1. Mapa de seções: antes → depois

| # | Antes | Depois | Situação |
|---|---|---|---|
| 0 | Header, menu com 4 itens | Header `#topo`, menu com 6 itens e "Agende sua consulta" | reescrito |
| 1 | Hero `#inicio` | Hero `#inicio` | reescrito; pronto para vídeo |
| 2 | **Números** `#numeros` | **Barra de confiança** `#confianca` | **substituído** |
| 3 | — | Cardápio de necessidades `#para-voce` | **novo** |
| 4 | — | Sobre / Manifesto `#sobre` | **novo** (não existia "Sobre") |
| 5 | Método Lien `#metodo-lien` | Método Lien `#metodo` | reescrito como linha do tempo |
| 6 | Especialidades (6) `#especialidades` | Tratamentos (10) `#tratamentos` | **substituído** e ampliado |
| 7 | — | Implantes com sedação `#sedacao` | **novo** |
| 8 | Experiência (4 itens) | Experiência (8 itens) `#experiencia` | reescrito e ampliado |
| 9 | **Ambientes** `#ambientes` | **Estrutura e tecnologia** `#estrutura` | **absorvido** — as 3 fotos migraram |
| 10 | Corpo clínico (4) | Corpo clínico (6, com CRO) `#equipe` | reescrito e ampliado |
| 11 | — | Resultados, antes e depois `#resultados` | **novo, oculto** por `SHOW_RESULTS` |
| 12 | Depoimentos (1) | Depoimentos + selo do Google `#depoimentos` | reescrito |
| 13 | FAQ (8) `#faq` | Dúvidas frequentes (12) `#duvidas` | reescrito |
| 14 | CTA final | CTA final `#agendar`, com logo branca | reescrito |
| 15 | Rodapé em fundo `ink` | Rodapé em fundo cream, com linha legal e mapa | reescrito |
| 16 | — | `/privacidade/` | **nova rota** |
| — | Botão flutuante | Botão flutuante | aparece depois do hero |

---

## 2. Arquivos alterados e criados

**Copy e dados** — `src/data/content.ts` (reescrito; continua a fonte única de texto), `src/data/schema.ts`, `src/data/imagens.json` (+3 slots de foto).

**Seções novas** — `Confianca`, `Cardapio`, `Sobre`, `Tratamentos`, `Sedacao`, `Estrutura`, `Resultados` (em `src/components/sections/`).

**Seções reescritas** — `Header`, `Hero`, `MetodoLien`, `Experiencia`, `Equipe`, `Depoimentos`, `Faq`, `CtaFinal`, `Footer`.

**Seções removidas** — `Numeros`, `Especialidades`, `Ambientes`.

**Componentes novos** — `WhatsAppLink` (CTA em forma de link), `MapaSobDemanda` (mapa que só carrega com clique), `JsonLd`.

**Componentes alterados** — `WhatsAppButton` (`data-cta`), `FloatingWhatsApp`, `Icon` (21 ícones), `BrandImage` (contraste do placeholder).

**Rotas** — `app/page.tsx` (nova ordem), `app/privacidade/page.tsx`, e quatro rotas geradas no build a partir do `content.ts`: `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`.

**Infraestrutura** — `vercel.json` (novo), `public/.htaccess`, `scripts/verificar-build.mjs` (reescrito, 60 verificações), `package.json`.

**Removidos** — `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`, `public/llms-full.txt` e `scripts/gen-sitemap.mjs`. Viraram rotas geradas: o domínio agora vive num lugar só.

---

## 3. Tudo o que precisa de validação com a Dra. Natália

Cada item está marcado no código, em `src/data/content.ts`, como comentário `[PENDENTE: …]` ou `[SUGESTAO: …]`. **Nenhum marcador aparece no site publicado** — uma verificação automática reprova o build se aparecer.

- **PENDENTE** — informação que o briefing não traz. Nada foi inventado: o campo fica vazio ou o texto contorna a lacuna.
- **SUGESTÃO** — o PDF do briefing cortou a resposta; o texto publicado é uma proposta de complemento.

### Dados da clínica
- **[PENDENTE]** Número da sala e ponto de referência no Edifício Asteca (rodapé)
- **[PENDENTE]** Confirmar se (31) 98507-0448 é o número único de atendimento
- **[PENDENTE]** Latitude e longitude do Edifício Asteca, para o schema. Removidas até lá: o placeholder anterior invalidava o bloco.
- **[PENDENTE]** Link do perfil da Lien no Google (o selo "5,0 · 57 avaliações" ainda não é clicável)
- **[PENDENTE]** Atualizar o número de avaliações do Google antes de publicar (hoje: 57)
- **[PENDENTE]** Se TikTok (`@clinicalien`) e Facebook aparecem. Desligados; o Facebook nem tem URL no briefing.
- **[PENDENTE]** Estacionamento e acessibilidade — não marcados no briefing, então não citados

### Hero
- **[PENDENTE]** Vídeo ou imagem estática. O componente já toca vídeo `muted autoplay loop playsinline` quando o arquivo for cadastrado, com a foto como poster e como única mídia para quem pede movimento reduzido.
- **[SUGESTÃO]** Mensagem padrão do WhatsApp: *"Olá! Conheci a Lien pelo site e gostaria de conversar sobre o atendimento. Podem me ajudar?"* — o original foi cortado em "Podem me".

### Cardápio de necessidades
- **[SUGESTÃO]** As 8 mensagens específicas de WhatsApp. O briefing trazia só o final de cada uma ("…minha gengiva sangra."); a abertura foi padronizada como a mensagem geral.

### Sobre / Manifesto
- **[SUGESTÃO]** *"…de ter um espaço onde cada paciente fosse atendido com tempo, escuta e cuidado de verdade."* — cortado em "em ter um espaço que eu possa…"
- **[SUGESTÃO]** Missão: *"…unindo técnica, tecnologia e acolhimento em cada etapa do tratamento."*
- **[SUGESTÃO]** Filosofia: *"…excelência técnica e afeto."*

### Método Lien
- **[SUGESTÃO]** Etapa 01 **reescrita**: o briefing contrastava com "avaliação rápida" e "orçamento", mas as duas palavras são proibidas na copy pública — pela seção 2 e pelo checklist da seção 9 do próprio briefing. Ficou *"muito diferente de um atendimento corrido"*.
- **[PENDENTE]** Duração média da consulta (etapa 01)
- **[SUGESTÃO]** Etapa 03: *"A consulta inicial é conduzida pela Dra. Natália, que coordena todo o seu caso."* — cortado em "todas as consultas iniciais são…"
- **[PENDENTE]** Periodicidade do acompanhamento (etapa 04) — a clínica ainda vai desenvolver

### Tratamentos
- **[SUGESTÃO]** Implantodontia digital — complemento do "o que é" e a palavra "naturalidade" no "indicado para"
- **[SUGESTÃO]** Reabilitação oral — *"ou dificuldade para mastigar"*
- **[SUGESTÃO]** Prótese — complemento do "o que é", *"bem adaptada"* e *"desgastados"*
- **[SUGESTÃO]** Periodontia — *"saúde e segurança a longo prazo"* e *"ou dentes com mobilidade"*
- **[SUGESTÃO]** Harmonização orofacial — complemento do "o que é", e o **benefício inteiro**: o briefing não traz um. Foi derivado do tom pedido para a área ("natural e equilibrado").
- **[PENDENTE]** Indicações da harmonização orofacial (o card não tem "para quem é indicado")
- **[SUGESTÃO]** Lentes e facetas — *"tamanho e o alinhamento aparente dos dentes"* e *"incomodam você"*
- **[PENDENTE]** Lentes e facetas — texto do "indicado para" truncado no briefing
- **[SUGESTÃO]** DTM — *"as articulações que ligam a mandíbula ao crânio"* e *"ou travamentos"*

### Sedação
- **[PENDENTE]** Validar com a Dra. Natália **e com o Dr. Alexander Pedrosa**: o tipo de sedação (consciente ou venosa), quem aplica e se é correto dizer "você dorme". Até lá o site **não** usa "você dorme durante todo o procedimento" nem "sem dor". O texto publicado afirma *"conduzida por profissional habilitado e com monitoramento durante todo o procedimento"* — é do briefing, mas precisa ser confirmado.

### Estrutura e tecnologia
- **[PENDENTE]** Redação técnica sobre agregados plaquetários

### Corpo clínico
- **[PENDENTE]** Sobrenomes e grafia completa da Dra. Maria Emília e das demais
- **[SUGESTÃO]** Bio da Dra. Natália: *"…desde o primeiro encontro até o cuidado contínuo."*
- **[SUGESTÃO]** Bio da Dra. Maria Emília: *"…com precisão e cuidado."*
- **[PENDENTE]** Dra. Gabriela Ribeiro — bio e foto
- **[PENDENTE]** Dra. Luiza Henriques — especialidade, CRO, bio e foto. O card mostra só o nome e "Mais informações em breve".
- **[PENDENTE]** Fotos de todos os 6 profissionais

### Resultados (antes e depois)
- **[PENDENTE]** Receber os casos de reabilitação e facetas com autorização assinada, e confirmar o enquadramento na Resolução CFO 196/2019. A seção está pronta, com a legenda obrigatória em cada caso, e oculta: para publicar, cadastre os casos em `resultados.casos` e ligue `SHOW_RESULTS`.

### Depoimentos
- **[PENDENTE]** Textos, nome, tratamento e autorização. Priorizar os que citam implante, reabilitação, prótese ou mastigação. Hoje a seção mostra só o selo do Google.

### Dúvidas frequentes
- **[SUGESTÃO]** Complemento das respostas 1, 2, 3, 4, 5, 6, 7 e 8 — todas foram cortadas no PDF
- **[PENDENTE]** Resposta 11 ("Vocês fazem implante com sedação?") — depende da validação da sedação

### CTA final
- **[SUGESTÃO]** *"…um planejamento pensado para a sua necessidade real. Converse com a gente e dê o primeiro passo."*

### Política de privacidade
- **[PENDENTE]** **Revisão jurídica.** O texto é um rascunho LGPD escrito a partir do briefing. Ele afirma que o site não usa cookies de análise ou publicidade — se o GTM, o GA4 ou o Meta Pixel forem instalados, a política e um banner de consentimento precisam entrar juntos.

### SEO
- **[PENDENTE]** `og-image.jpg` de 1200×630 com foto real da clínica. **Hoje o arquivo não existe**, então quem compartilhar o site em rede social vê o link sem imagem.
- **[PENDENTE]** Foto real da clínica para o campo `image` do schema (usa a logo até lá)

---

## 4. Seções removidas e por quê

- **Números** → substituída pela **Barra de confiança**. Os números publicados eram inflados (ver seção 0), e a contagem animada causou dois defeitos na semana anterior. A barra nova é estática.
- **Especialidades** → substituída por **Tratamentos**, que vai de 6 para 10 e segue a ordem de prioridade comercial do briefing.
- **Ambientes** → **absorvida** por **Estrutura e tecnologia**. As três fotos (recepção, atendimento, kit de boas-vindas) ilustram a estrutura agora.
- **Botão secundário do hero** ("Conhecer a Lien") → removido. O briefing especifica um CTA único no hero.

Não havia blog, preços, promoções nem odontopediatria em destaque para despromover.

---

## 5. Decisões em aberto — para a clínica

1. **Vídeo ou imagem no hero.** O código está pronto para os dois. Limite do vídeo: 3 MB.
2. **Exibir "+200 pacientes atendidos" e "5 anos de atuação".** Estão cadastrados como opcionais e desligados (`confianca.mostrarOpcionais`). **Nunca** publicar "3 reabilitações realizadas".
3. **Redação da sedação** — ver seção 3.
4. **Quem "assina" o WhatsApp.** Quem responde é a própria Dra. Natália, mas o paciente imagina uma secretária. O site usa "equipe Lien", neutro. A opção B está comentada no código: *"Quem responde é a nossa equipe, das 8h às 18h."*
5. **TikTok e Facebook no rodapé** — desligados.
6. **Contraste teal sobre cream, 4,46:1.** A tag de seção teal de 12–13px sobre o fundo cream fica abaixo do mínimo AA de 4,5:1. **Isso já existia antes** — a verificação anterior mediu só a variante sobre branco (4,72:1). Mas a arquitetura nova tem mais seções em cream, e **o número de ocorrências passou de 2 para 4** (Sobre, Tratamentos, Estrutura, Depoimentos). Corrigir exige mexer num token travado pelo manual ou aceitar a falha AA — decisão da marca, não da implementação.
7. **H1 A ou B.** O H1 A ocupa 6 linhas no celular. O CTA ainda cabe na primeira tela de um aparelho de 667px de altura, mas a alternativa B, também do briefing e comentada no código, é mais curta.
8. **Domínio próprio.** A produção está em `clinica-lien.vercel.app`, e o briefing diz que `lienreabilitacao.com.br` está registrado. Um `*.vercel.app` é fraco para SEO local. Quando o domínio for apontado, a troca é **uma linha**: `site.url` em `src/data/content.ts`. Canonical, sitemap, robots, schema e `llms.txt` seguem sozinhos.

---

## 6. Conflitos dentro do próprio briefing — e como foram resolvidos

O `grep` literal do checklist da seção 9 reprovaria copy que o próprio briefing manda publicar. As regras foram aplicadas pela intenção:

| Regra literal | Conflito | Resolução |
|---|---|---|
| Zero "avaliação" | As seções 5.2 e 5.12 exigem "57 **avaliações**" (do Google) | Proibida "avaliação" no sentido de consulta; "avaliações" do Google é permitida |
| Zero "o melhor" | A copy aprovada diz "o melhor **caminho** para você" | Proibidas as formas autopromocionais ("o melhor de", "a melhor clínica") |
| Zero "valor" | A pergunta 7 do FAQ diz "saber o **valor** do meu tratamento" | Proibido "valor **da consulta**", que é o item do checklist |
| Etapa 01 do Método | O texto do briefing usa "avaliação rápida" e "orçamento" para contrastar | Reescrita sem as palavras (ver seção 3) |
| `aria-label="Agendar consulta pelo WhatsApp"` | Um `aria-label` diferente do texto visível quebra a WCAG 2.5.3 (*label in name*): quem usa comando de voz fala o que vê escrito | O texto visível segue sendo o nome acessível, com o sufixo "(abre o WhatsApp)" só para leitor de tela. O botão flutuante, que é só ícone, tem `aria-label`. |
| Mapa com `loading="lazy"` | Um iframe do Google Maps grava cookies ao carregar, sem consentimento | O mapa só carrega com clique; o link "Como chegar" não depende dele |
| Logo em SVG | Os arquivos oficiais enviados são PNG | Mantidos os PNGs. **Pedir à clínica a versão vetorial** (SVG, PDF, AI ou EPS). |

---

## 7. Checklist da seção 9

| Item | Resultado |
|---|---|
| `grep` sem vocabulário proibido | ✅ Verificado automaticamente no HTML, JSON-LD, mensagens de WhatsApp, `/privacidade` e `llms.txt`, com teste negativo |
| Nenhuma menção a valor, parcelamento ou pagamento | ✅ |
| RT + CRO e CNPJ no rodapé | ✅ |
| Todos os CTAs abrem o WhatsApp com mensagem | ✅ 23 CTAs, todos com o número certo e `data-cta`. ⚠️ **Não testado em celular real.** |
| Ordem das seções e âncoras | ✅ Verificado no HTML e na página viva |
| Implante digital em maior destaque | ✅ |
| Nenhum avatar com iniciais | ✅ Placeholder neutro |
| Antes e depois só com legenda, ou oculto | ✅ Oculto por flag |
| Nenhum depoimento, número ou título inventado | ✅ E os que existiam foram removidos |
| Paleta, Poppins, cantos arredondados, sombra suave | ✅ A escala tipográfica já batia exatamente com a seção 6. ⚠️ Logo em PNG, não SVG. |
| Texto corrido ≤ 68ch | ✅ `max-width: 62ch` |
| Contraste WCAG AA | ⚠️ 300 elementos de texto medidos na página viva; só reprova o par teal/cream (decisão 6) |
| Lighthouse mobile ≥ 85 / 95 / 95 | ❌ **Não medido.** Depende das fotos reais, que não existem. |
| JSON-LD válido | ✅ Faz parse, sem placeholder e sem `aggregateRating`. ⚠️ **Não passado pelo Rich Results Test**, que exige o site publicado. |
| `/privacidade` publicada e linkada | ✅ |
| Build sem erros e sem warnings novos | ✅ Console da página viva também limpo |

**Não observado neste ambiente:** as animações de entrada das seções. O navegador de teste rodou com a página oculta, que pausa as animações. Confirmei que os 102 elementos em espera têm todos a assinatura exata do estado inicial da animação — nenhum está invisível por outro motivo —, mas vale conferir a página rolando num navegador visível.

---

## 8. Como publicar

1. `npm run build` gera o site estático em `out/` e roda a checagem de tipos.
2. `npm run verificar` roda as 60 verificações. Tem de terminar com **"Tudo verde"**.
3. **Vercel** (produção atual): o `vercel.json` já marca os arquivos internos do Next como `noindex`. ⚠️ Esse arquivo **não pôde ser testado localmente** — confira depois do primeiro deploy que `https://clinica-lien.vercel.app/index.txt` responde com o header `X-Robots-Tag: noindex`.
4. **Hostinger** (alternativa): subir o **conteúdo** de `out/` para `public_html/`. O `.htaccess` já tem a mesma regra.

---

## Faixa de números, depoimentos em colunas e mídia (set/2026)

Prompt: `prompt-claude-code-secoes-numeros-depoimentos-midia-lien.md`.

### Nova ordem da página
Hero → **faixa de números** → **Depoimentos** → Sobre → Método Lien → Para você → Tratamentos → Sedação → Experiência → Estrutura → Equipe → Dúvidas → CTA final. O `verificar-build.mjs` confere essa ordem.

- "Para você" (cardápio) foi para depois do Método, por decisão da clínica.
- Removidas: a barra de confiança antiga (`Confianca`) e a seção de depoimentos de baixo (duplicata, com o marquee-03).

### Arquivos
- **Criados:** `components/ui/marquee-effect.tsx`, `components/ui/testimonials-columns-1.tsx`, `components/sections/TrustMarquee.tsx`, `components/sections/Testimonials.tsx`, `content/testimonials.ts`, `components/ui/VideoArco.tsx`, `public/assets/avatars/lien-avatar.svg`, variantes `public/img/sobre-recepcao-*` e `public/img/metodo-consulta-*`.
- **Alterados:** `app/page.tsx`, `app/globals.css`, `tailwind.config.ts`, `Sobre.tsx`, `MetodoLien.tsx`, `content.ts`, `imagens.json`, `verificar-build.mjs`.
- **Removidos:** `Confianca.tsx`, `Depoimentos.tsx`, `DepoimentosMarquee.tsx`, `marquee-03.tsx`, `marquee-03-utils/marquee.tsx`, `CincoEstrelas.tsx`, `VideoGota.tsx`.
- **Dependências:** `framer-motion`, `@motionone/utils` (o `motion` já existia).
- **Tema shadcn:** `--background` cream, `--foreground` ink, `--primary` magenta, `--border` #E1E1E1 (também como cor padrão da classe `border`).

### Alterações nos componentes, e por quê
- **`marquee-effect.tsx`:** o parâmetro `t` virou `_t`. O `tsconfig` proíbe parâmetro sem uso e o arquivo não compilava; o comportamento não muda.
- **Faixas:** espessura ajustada pela `className` (`py-2 md:py-2.5`) para 44 px. O "✦" vem de uma fonte de sistema mais alta que a Poppins e engrossava a linha.
- **`testimonials-columns-1.tsx`:** idêntico ao original, exceto a tipagem documentada no prompt.
- **Pausa dos depoimentos:** o componente anima por JavaScript (transform inline a cada quadro). A regra CSS `animation-play-state` do prompt não tem efeito, e pausar no hover exigiria alterar o componente. No lugar, o botão "Pausar depoimentos" troca as colunas por uma grade estática com todos os depoimentos.
- **Seção de depoimentos:** `py-20` no lugar de `my-20`, porque a margem mostrava faixas brancas entre as seções creme.
- **Colunas:** com menos de 6 avaliações, 1 coluna; com 6 ou mais, 2; com 9 ou mais, 3. Nada é duplicado. Como no demo, a 2ª e a 3ª coluna ficam ocultas no celular e no tablet.
- **Sobre:** a foto continua no fundo, com os cantos assimétricos. O vídeo foi para uma moldura com topo em arco (borda creme de 6 px), que salta 32 px para fora da foto. No celular: faixa 4:3 e a moldura a 80% da largura, logo abaixo.
- **Método:** a linha do tempo horizontal foi mantida, por decisão da clínica. A foto entrou no painel de abertura, com cantos de 32 px e o símbolo da marca atrás.

### Caminhos de mídia
- As fotos chegaram em `assets/fotos/consultorio/` ("consultorio lien 1/2/3.png"), não em `fotos consultório/`.
- Entraram pelo pipeline do projeto com nomes sem espaço nem acento (`sobre-recepcao`, `metodo-consulta`), então o problema de caminho com espaço e acento não existe.
- **Sobre:** "consultorio lien 3" (recepção com o logo).
- **Método:** "consultorio lien 2" (sala de consulta).

### Pendências
- ✅ **Vídeo do consultório:** `assets/vídeos/vídeo lien institucional .mp4` (7,4 s, 1080×1920), recortado em 4:5 (a proporção da moldura), 720×900, sem áudio → `public/videos/sobre-lien.webm` (755 KB), `.mp4` (1,0 MB) e poster (26 KB). Toca em loop automático.
- **[PENDENTE] Depoimentos reais:** 9 avaliações do Google, com autorização, no formato "Nome S.". Sem eles, a seção mostra só o título, a nota e o CTA.
- **[PENDENTE] Link do perfil no Google,** para o "Ver todas as avaliações no Google".
- **[PENDENTE] "+200 pacientes"** só entra na faixa se a clínica confirmar.
- **Lighthouse:** não foi rodado. Recomenda-se rodar no site publicado.

### Copy da hero (sugestão da Dra. Natália Simões, set/2026)
- **H1:** "Reabilitação oral com excelência clínica, tecnologia e cuidado em cada detalhe." ("cuidado em cada detalhe." em magenta).
- **Subtexto:** "Planejamento personalizado e uma experiência pensada para quem valoriza segurança, conforto e previsibilidade em cada etapa."
- **Apoio** (novo, abaixo do subtexto, em destaque): "Se você tem medo de dentista, talvez ainda não tenha conhecido a Lien."
- O H1 ficou mais longo (79 caracteres, contra 52), então o tamanho máximo no desktop caiu de 60 para 52 px. Assim ele fica em 4 a 5 linhas e a hero dentro do teto de 920 px.
- Contraste AA remedido sobre a foto, de 1024 a 1920 px: o menor valor é 4,55:1.

### Seção Sedação no modelo "secao-sedacao" (out/2026)
- **Layout:** faixa de largura total com a foto "Implante dentário com precisão" (`assets/fotos/seções /`) ao fundo e um card Liquid Glass escuro à esquerda, com ícone, título em 2 linhas, parágrafo e dois botões. O arquivo original não foi renomeado; uma cópia entrou no pipeline como `sedacao-implante` (960, 1440 e 1672 px, AVIF/WebP).
- **Cores da Lien no lugar do verde da referência:** tinta do vidro e véu em ink; destaque do título e ícone em ciano `#68C0D4`; botão "Agendar consulta" em magenta com texto branco; "Falar pelo WhatsApp" translúcido com borda branca.
- **Vidro:** seis camadas em `.vidro` (`globals.css`), com um único `backdrop-filter` na seção, nunca animado, e brilho que segue o mouse (só mouse, e desligado com movimento reduzido). Fallbacks: navegador sem desfoque, "reduzir transparência" e "mais contraste" deixam o card escuro e sólido.
- **Título:** uma frase por linha a partir de 1024 px. O H2 de 44 px não cabe no card da referência (a 2ª frase mede 634 px na Poppins), então o card vai a `clamp(540px, 46vw, 640px)` e a fonte acompanha: 24 px em 1024, cerca de 27 px em 1280 e 30 px de 1440 para cima.
- **Contraste**, medido no canvas (foto + véu + desfoque + tinta 0,55) no pior ponto: parágrafo de 6,1 a 6,7:1; título branco 7:1; título ciano 3,5:1 (texto grande, mínimo 3:1); botões acima de 4,5:1.
- **Celular:** a foto fica presa no topo (440 px) e se funde no fundo ink. O card fica ancorado embaixo, a partir de 260 px, sem esconder o rosto. Botões empilhados em largura total, com 48 px de altura.
- **Texto:** parágrafo do modelo. O anterior ainda não tinha sido validado com a Dra. Natália e o Dr. Alexsander e continua no llms.txt, junto com os 3 itens.
- **Medição:** novo CTA `data-cta="sedacao-agendar"`, com a mensagem de agendamento; o `sedacao` continua no botão do WhatsApp.

---

## Alinhamento final do site (out/2026)

Fonte: `prompt-claude-code-alinhamento-final-lien-2026.md`, gerado a partir do PDF "Lien — Alinhamento Final do Site". Onde houve conflito, o PDF prevaleceu sobre as instruções anteriores. A copy aprovada foi publicada literalmente.

### 1. Mapa de seções e páginas

**Home, de → para:**

| Antes | Depois |
|---|---|
| Hero (já com um CTA e a nota do Google) | Hero, sem mudança (não reabrir) |
| Faixa dupla magenta + teal | **Faixa única magenta** |
| Depoimentos (colunas do Google) + 9 antes e depois | **#resultados** "Resultados que contam histórias." (6 casos) + **#depoimentos** "Quem vive a Lien, conta." (carrossel de vídeos) |
| Sobre (3 parágrafos, vídeo em arco, CTA) | **#sobre**: texto final, foto grande e quote único |
| Método (linha do tempo GSAP com foto) | **#metodo** "Cuidado que começa antes do tratamento." em 4 colunas, sem foto |
| #para-voce (8 cards, cada um com WhatsApp) | **#comecar**: o card inteiro é link para /tratamentos/#…; um único CTA abaixo |
| Tratamentos (12 cards, cada um com WhatsApp) | **#tratamentos**: 3 cards + "Ver todos os tratamentos" |
| Sedação (card de vidro + foto genérica) | **#sedacao**: título novo, 2 modalidades, texto, 1 CTA; foto pendente |
| Experiência (carrossel do consultório) | **#experiencia**: player + 3 capítulos; faixa de diferenciais |
| Estrutura | Removida (a tecnologia vira o capítulo 1 da Experiência) |
| Equipe | **#equipe**: headline nova e os 6 textos finais |
| — | **#conteudos**: 3 artigos + "Ver todos os conteúdos" |
| Dúvidas (12, em abas, "Esta resposta ajudou?") | **#duvidas**: 6 perguntas, accordion fechado, 1 CTA |
| CTA final "Conversar com a equipe Lien" | **#agendar**: texto novo e "Agende sua consulta" |

**Páginas novas:** `/tratamentos/` (10 especialidades), `/conteudos/` (biblioteca) e os 14 artigos, nas URLs exatas do PDF.

**Menu:** Início · Método Lien · Tratamentos (página) · Experiência · Equipe · Conteúdos (página) · Dúvidas · [Agende sua consulta]. Entre 1024 e 1279px, os links ficam menores e o botão perde o ícone, para caber na cápsula.

### 2. Arquivos

- **Criados:**
  - páginas: `app/tratamentos/page.tsx`, `app/conteudos/page.tsx`, `app/[artigo]/page.tsx`;
  - conteúdo: `content/artigos/*.md` (14 arquivos) e `src/lib/artigos.ts`;
  - seções e componentes: `src/components/sections/{Depoimentos,ConteudosHome}.tsx` e `src/components/ui/{Carrossel,AbrirPorAncora,FiltroCategorias}.tsx`.
- **Reescritos:** Resultados, Sobre, MetodoLien, Cardapio, Tratamentos, Sedacao, Experiencia, Equipe, Faq, TrustMarquee e `content.ts` (a partir da linha das mensagens de WhatsApp). Também mudaram `schema.ts`, `llms.ts`, `sitemap.xml`, `layout.tsx` (meta do Search Console), Header e o verificador.
- **Removidos:**
  - seções e componentes: AntesDepois (virou Resultados), Testimonials, Estrutura, Timeline, VideoArco, timeline-animation e `ui/{button,card,tabs}`;
  - imagens: a foto genérica da sedação e suas variantes;
  - CSS: o do vidro, da linha do tempo, da moldura em arco e das colunas de depoimentos.
- **Mantidos sem uso:** `testimonials-columns-1.tsx` e `src/content/testimonials.ts`, como autoriza o conflito C2. O pacote `gsap` continua no `package.json`, mas sem uso; remover exige `npm uninstall`.
- **Paginas por rota:** `/`, `/tratamentos/`, `/conteudos/`, `/<14 slugs>/`, `/privacidade/`.

### 3. "Por onde você quer começar?" → tratamentos

| Card | Destino |
|---|---|
| Quero comer com segurança | /tratamentos/#implantodontia-digital |
| Perdi um ou mais dentes | /tratamentos/#implantodontia-digital |
| Minha prótese incomoda | /tratamentos/#facetas-e-proteses |
| Quero melhorar meu sorriso | /tratamentos/#facetas-e-proteses |
| Tenho vários problemas ao mesmo tempo | /tratamentos/#reabilitacao-oral-completa |
| Sinto dor ou estalos na mandíbula | /tratamentos/#dtm-e-dor-orofacial |
| Minha gengiva sangra | /tratamentos/#periodontia |
| Tenho medo de dentista | /#sedacao |

### 4. Faixa única

- Cor: **magenta** (`#9C1782`), a do esqueleto.
- Itens mantidos, sem número novo: 5,0 no Google · 57 avaliações · 6 especialistas · Planejamento digital · Escâner intraoral · Atendimento particular · Cruzeiro, BH.
- Velocidade reduzida; com movimento reduzido, a faixa fica parada.

### 5. Categorias dos 14 artigos (sugestão — validar com a clínica)

| Categoria | Artigos |
|---|---|
| Implantes e Reabilitação | 01, 02, 03, 04, 05, 06, 09 |
| Estética do sorriso | 07, 08 |
| DTM e dor | 10 |
| Gengiva e Periodontia | 11, 12, 13 |
| Prevenção e saúde bucal | 14 |

Artigos relacionados: entram primeiro os do mesmo tratamento, depois os da mesma categoria. O 14 é o único da categoria e recebe dois de gengiva.

### 6. Ocorrências de "avaliação"

- **Home, tratamentos e FAQ:** nenhuma dirigida ao paciente. Ficaram só as "57 avaliações" do Google, que são permitidas.
- **Artigos:** não foram alterados (texto aprovado). Ocorrências dirigidas ao paciente, para a clínica decidir:
  - **Artigo 10, título e meta-descrição** (atenção especial): "…quando procurar uma avaliação de DTM ou reabilitação?" / "Entenda quando procurar avaliação de DTM…". Sugestão: trocar por "consulta".
  - **"Na consulta, avaliamos…"** (ação da clínica, não convite) no "Próximo passo" dos artigos 01, 03, 07 e 14.
  - **Artigo 05, título:** "Perda óssea dentária: o que avaliar antes do implante" — sentido técnico.
- **Uso técnico nos artigos, que fica como está:** "avaliação individual" (03 e 13), "Como é feita a avaliação?" (10), "sua avaliação considera extensão…" (12), "reavaliada" (12), "precisam ser avaliadas" (01 e 05), "O que deve ser avaliado antes?" (07) e "desejam avaliar uma solução fixa" (03).
- **Também mantidos literais e para ciência:**
  - o título do artigo 12 contém "sem dor" ("…por que ela pode avançar sem dor"). Não é promessa, mas o verificador só o aceita nesse título;
  - o artigo 02 usa "a melhor solução" e "a melhor opção", em sentido não promocional.

### 7. Pontos para a revisão ética/CRO (item 23)

1. **Antes e depois:**
   - Os 6 casos publicados são 2, 1, 8, 3, 5 e 4, escolhidos pelo enquadramento consistente.
   - Ficaram de fora o 6 e o 9 (harmonização facial) e o 7 (antes com afastador, depois sem).
   - Cada caso tem legenda de autorização, e há o aviso de individualidade dos resultados.
   - Falta confirmar a seleção e a Resolução CFO 196/2019.
2. **Sedação:**
   - O texto não promete sono completo. As modalidades são "Sedação consciente com medicação oral" e "Sedação intravenosa acompanhada por anestesista".
   - O FAQ 2 cita "sedação oral ou intravenosa com anestesista".
   - Validar com a Dra. Natália e o Dr. Alexander.
3. **Credenciais (conflito C8):**
   - O card da Dra. Natália diz "Reabilitação Oral | Implantodontia, Prótese e Periodontia". A credencial oficial é *Aperfeiçoamento* em Periodontia.
   - "Especialista" aparece nos cards das Dras. Maria Emília, Isabela, Luiza e Gabriela.
   - A autoria dos artigos usa a credencial oficial.
   - O schema (Person) passou a usar a credencial oficial.
4. **Alegações:** "Cirurgia guiada… sem abertura extensa da gengiva" usa a redação segura do PDF. Na periodontia e no GLP-1, os artigos falam em associação, não em causalidade.
5. **Grafia "Alexander" × "Alexsander":** segui o PDF ("Alexander"). O jaleco diz "Alexsander"; confirmar.

### 8. Pendências de material

| Material | Onde | Estado no site |
|---|---|---|
| 2 a 3 vídeos de pacientes + autorizações | #depoimentos | 3 cartões "[Vídeo pendente]" (`depoimentos.videos` em content.ts) |
| 3 vídeos da Experiência (escaneamento; detalhes; conversa/kit/abraço) | #experiencia | Capítulos 1 e 3 com "[Vídeo pendente]"; o capítulo 2 usa o vídeo institucional da recepção (C3) |
| Foto real da Sedação | #sedacao | "[Foto pendente]" (`assets/fotos-originais/sedacao-atendimento.jpg`) |
| Foto real grande da clínica | #sobre | Usa a recepção (`sobre-recepcao`) |
| Ensaio padronizado dos 6 profissionais | #equipe | Fotos reais atuais, recortadas no mesmo quadrado |
| CRO da Dra. Luiza Henriques | #equipe | Linha omitida |
| Horários (confirmar) | rodapé | Os atuais: seg/ter/qui/sex, 8h às 18h; qua, 9h às 20h |
| Código do Search Console | `seo.googleVerification` | A meta tag só sai quando o código existir |
| IDs de GA4/GTM | — | Os eventos `click_whatsapp` já vão para o dataLayer com `origem` e `pagina` |
| Link do perfil no Google e atualização do nº de avaliações | `google` em content.ts | A nota aparece sem link |
| og-image 1200×630 | `seo.ogImage` | Ainda sem arquivo |

Não usei os arquivos novos em Downloads (`NATALIA-SIMOES.png` e quatro PNGs com nome UUID), porque o prompt não os cita. Se forem fotos da equipe ou da sedação, entram no próximo passo.

### 9. Lighthouse e dados estruturados

- **Dados estruturados:**
  - home: Dentist/LocalBusiness/MedicalBusiness, com os 10 tratamentos como MedicalProcedure com URL; FAQPage com as 6 perguntas; Person;
  - artigos: Article (autor = Person da Dra. Natália; publisher = a clínica) + BreadcrumbList;
  - /tratamentos/ e /conteudos/: BreadcrumbList;
  - o JSON de todos os blocos é validado pelo verificador.
- **Lighthouse mobile:** resultado no fim deste bloco.

### 10. Conferência textual

- Os 14 artigos foram extraídos do prompt por script, sem digitação.
- Dois parágrafos que o PDF partiu na troca de página foram unidos: artigo 04 ("A equipe então organiza as etapas") e artigo 08 ("conforme a estrutura remanescente").
- O verificador compara, em cada uma das 14 URLs, o `<title>`, a meta-descrição e o H1 com o frontmatter.
- A copy da home, dos tratamentos e do FAQ foi colada literalmente em `content.ts`. O hífen " - " dos textos aprovados foi mantido.
- **Verificador:** passou de 60 para **78 checagens**. As novas cobrem:
  - a ordem nova;
  - 4 a 6 casos com legenda;
  - a faixa única;
  - os 3 tratamentos e os 3 conteúdos;
  - "Agende sua consulta" em todo CTA principal;
  - `data-page`;
  - um CTA por seção de decisão;
  - 6 perguntas fechadas;
  - as páginas internas;
  - os 14 artigos;
  - o sitemap completo.

**Lighthouse mobile (site publicado, 12/out/2026, Lighthouse 12):**

| Página | Performance | Acessibilidade | Boas práticas | SEO |
|---|---|---|---|---|
| `/` | 87 | 96 | 100 | 100 |
| `/tratamentos/` | 96 | 96 | 100 | 100 |
| `/implante-dentario-belo-horizonte/` | 100 | 100 | 100 | 100 |

Todas as metas foram batidas: Performance ≥ 85, Acessibilidade ≥ 95 e SEO ≥ 95.

---

## Depoimentos do Google — "Quem vive a Lien, conta." (out/2026)

Fonte: `prompt-claude-code-depoimentos-lien.md`.

**O que mudou:**
- **Layout:** o carrossel de vídeos do alinhamento final saiu, por decisão da clínica. No lugar, entram 3 cards no layout do print aprovado: estrelas, depoimento literal entre aspas curvas, divisor e autor com avatar da inicial, alternando magenta e teal.
- **Responsivo:**
  - desktop: 3 colunas de mesma altura, com o autor sempre na base;
  - tablet e celular: carrossel com scroll-snap;
  - pontos indicadores só no celular.
- **Posição:** o id `#depoimentos` e a posição (logo depois de Resultados) foram mantidos. A separação vem do fundo liso, sem a grade dos casos clínicos.
- **Arquivos:**
  - `src/content/testimonials.ts` com os 3 textos literais;
  - `src/components/sections/Testimonials.tsx`;
  - `Depoimentos.tsx` (vídeos) e `testimonials-columns-1.tsx` foram removidos.
- **Verificador:** ganhou a checagem "3 cards literais, sem CTA". Agora são **79 checagens**.

**Desvios do prompt, para cumprir as regras do projeto:**
1. **Itálico:** a Poppins itálica não é carregada no site, e o projeto proíbe importar fonte nova. O navegador inclina a Poppins regular.
2. **Pill "DEPOIMENTOS REAIS":** teal sobre `#E3F1F4` mede 4,08:1 e reprova AA em 11px. Usei fundo branco (4,72:1) com borda teal-clara.
3. **Linha de contexto:** usei `#6B6470` (5,37:1), porque `#7A7380` mede 4,3:1 sobre o card.
4. **Estrelas:** o `aria-label` ficou "Nota 5 de 5 estrelas", e não "Avaliação…", porque o verificador bloqueia a palavra.
5. **Degradê de fundo:** saiu sem as posições 0/50/100%, que são o padrão para três cores. O verificador reprova "100%" na marcação.
6. **Divisores:** o bloco do autor reserva altura para duas linhas de contexto, para os três divisores ficarem na mesma linha.

**Para a clínica confirmar (risco ético/CFO):**
1. **Tratamento × texto:** o 1º depoimento (limpeza com aplicação de flúor) foi rotulado como "Paciente **Clínica Geral**", a pedido, no lugar do "Reabilitação Oral" do print. Faltam confirmar os rótulos "Implantes" (Nilson) e "Prótese e Estética" (Nádia).
2. **Autorização:** de cada paciente, para exibir nome e texto no site, mesmo sendo avaliações públicas.
3. **Grafia:** "Nádia Graciely" e "Nilson Antônio", exatamente como no Google.

---

## Sobre, Método e "Por onde você quer começar?" no layout dos prints (out/2026)

Fonte: `prompt-claude-code-sobre-metodo-lien.md`. O layout segue os prints 1 e 2; o texto é o do Alinhamento Final 2026, literal.

**`#sobre` — Print 1:**
- Duas colunas: texto com 52% e foto com 48%. Abaixo de 1024px, uma coluna, com a foto depois do texto.
- Tag "NOSSA ESSÊNCIA" e H2 com "vínculo" em magenta itálico.
- Texto: abertura em ink, com "Lien" em negrito; três parágrafos de apoio em ink-muted, peso 300, com "Dra. Natália Simões" em 500.
- Quote com borda teal, uma exigência do alinhamento que o print não mostra.
- Dois destaques só com ícone e texto, sem caixas.
- Foto: o consultório com a cadeira e a vista de BH (`experiencia-consultorio`, a "consultorio lien 1.png"), em 16:10. A recepção saiu.

**`#metodo` — Print 2:**
- Fundo branco com a padronagem oficial de ondas em magenta a 5%.
- Tag "PREVISIBILIDADE & SEGURANÇA" e o H2 e a intro aprovados, no lugar de "O Método Lien em 4 Etapas" e do subtítulo do print.
- Quatro cards neutros com selo numérico alternando magenta e teal, com os textos aprovados. Saem os do print, que tinham "tratamento.." e o card 3 cortado.
- Fechamento "Sem pressa. Sem excesso. Com clareza em cada etapa." com o arco teal, também exigência do alinhamento.

**`#comecar` — caixa do Print 2:**
- Fica 96px abaixo do Método, no mesmo fundo de ondas, e continua sendo `<section>` própria, com H2, para a âncora, a ordem do verificador e a separação que o alinhamento exige.
- Tag teal "ORIENTAÇÃO PERSONALIZADA" e degradê do rosado para o azul-acinzentado.
- Quatro cards com os títulos do print. O card inteiro é o link "Entenda esse cuidado →":

| Card | Destino |
|---|---|
| Minha prótese incomoda ou está antiga | /tratamentos/#facetas-e-proteses |
| Sinto dor ou estalos na mandíbula (DTM) | /tratamentos/#dtm-e-dor-orofacial |
| Quero melhorar meu sorriso (Estética) | /tratamentos/#facetas-e-proteses |
| Tenho medo ou ansiedade de dentista | /#sedacao |

- Os 8 cards anteriores saíram, porque o print traz 4.
- Um único CTA, "Não sabe por onde começar? [Agende sua consulta]", com `data-cta="comecar"`. Nenhum WhatsApp nos cards.

**Pontos de atenção:**
1. **"100%":** o print traz "100% · Personalizado para cada caso". Como "100%" é vocabulário proibido no projeto e o verificador bloqueia, o destaque saiu como **"Personalizado · para cada caso"**, por decisão do usuário. O "Cruzeiro, BH · Localização privilegiada" foi mantido. Os dois ficaram por decisão da clínica, apesar de o alinhamento pedir para evitar boxes no Sobre; por isso não têm caixa.
2. **Copy:** os textos do print foram trocados pela versão aprovada no Alinhamento Final. Se a clínica preferir o texto do print, a troca é só no `content.ts`.
3. **Exigências do alinhamento acrescentadas,** que não aparecem nos prints: o quote no Sobre, o fechamento do Método e o CTA único do "Por onde começar".
4. **Vídeo e fotos:** o Sobre já não tinha vídeo desde o alinhamento, e o Método já não tinha foto.
5. **Itálico** ("vínculo", quote e fechamento): a Poppins itálica não é carregada; o navegador inclina a regular.
6. **Contraste:** os cards do "Por onde começar" ficaram com fundo branco a 90%, e não `#F9FAFB` a 90%. O link teal de 12px fica em cerca de 4,7:1, contra 4,45:1 no fundo pedido. A tag magenta mede 6,09:1, a tag teal sobre branco 4,72:1 e o ink-muted sobre os cards cerca de 7:1.

---

## Tratamentos no visual do print (out/2026)

Fonte: `prompt-claude-code-tratamentos-lien.md`. O layout segue o print; a estrutura e os textos seguem o Alinhamento Final 2026.

**Card do print** (`src/components/ui/TratamentoCard.tsx`):
- Branco, raio 20px, sombra suave e borda quase invisível.
- Ícone duotone num quadrado tintado, título com 17px e descrição com 13px.
- Botão "Saiba mais" pastel, de largura total, sempre na base.
- Cores alternadas pela posição: par em magenta, ímpar em teal, com ícone e botão juntos.
- Ícone, título, texto e botão começam na mesma altura em todos os cards; no print alguns estavam desalinhados.

**Home (`#tratamentos`):**
- Só os 3 destaques, com a frase aprovada.
- "Ver todos os tratamentos" com contorno magenta, como botão secundário.
- Nenhum WhatsApp nos cards e sem o arco decorativo.
- Cabeçalho mantido: TRATAMENTOS / "Cada tratamento começa pelo seu planejamento." / o subtítulo atual. Não usei os textos do print, "Excelência odontológica" e "tecnologia de ponta".

**`/tratamentos/`** (`GradeTratamentos.tsx`):
- **Cabeçalho:** breadcrumb Início › Tratamentos e H1 "Tratamentos e especialidades".
- **Grade:** os 10 cards em 3, 2 ou 1 coluna, conforme a largura.
- **"Saiba mais":**
  - expande o card na linha inteira, com transição de altura de 350ms, e o botão vira "Fechar";
  - abre um card por vez, com `aria-expanded` e `aria-controls`;
  - o conteúdo literal do Anexo I fica em duas colunas: à esquerda, ícone, título (H2), descrição e "Indicado para"; à direita, O que é, Benefício, Serviços e Conteúdos relacionados; no rodapé, a nota em itálico e um único "Agende sua consulta" (`data-cta="tratamento-<slug>"`).
- **Âncoras:** `/tratamentos/#slug` abre o card e rola até ele, 120px abaixo do topo. Abrir e fechar atualiza a URL com `replaceState`.
- **SEO:** o conteúdo fechado continua no HTML estático, com `inert` para sair da ordem de tabulação.
- **Arco grande:** em azul-claro, ocupa o vazio da última linha só com 3 colunas e desenha o traço ao entrar na tela.

**Pontos de atenção:**
1. **Home com 3 cards:** o print mostra 10, mas o Alinhamento manda 3 na home e 10 na página interna. Para ter os 10 na home, basta trocar `destaques` pela lista completa.
2. **Textos do cabeçalho do print:** não usados, pelo motivo acima.
3. **Textos curtos dos 7 tratamentos restantes:** vêm do print, porque o alinhamento só define os 3 da home. **A clínica precisa confirmar.**
4. **Correções:**
   - "osdentes" → "os dentes";
   - títulos só com a primeira letra maiúscula;
   - alinhamento interno dos cards.
5. **Desvios do prompt, pelas regras do projeto:**
   - a tag teal fica sobre branco com borda: sobre `#E3F1F4` ela mede 4,08:1 e reprova AA;
   - as descrições usam peso 400, e não 300: a Poppins Light em 13px fica fina demais;
   - os degradês saíram sem as posições "100%", para passar no verificador.
6. **Ícones:** o projeto não tinha os ícones do print. Desenhei 10 SVGs duotone em `IconesTratamento.tsx`, seguindo a descrição do prompt; vale a clínica olhar.
7. **Arquivos removidos:** `Icon.tsx` (ícones lucide antigos dos tratamentos) e `AbrirPorAncora.tsx`, cuja função foi para a grade.

---

## Sedação no layout e na copy do print (out/2026)

Fonte: `prompt-claude-code-sedacao-lien.md`. Por decisão da clínica, o layout e a copy são **iguais aos do print**. Isso substitui, nesta seção, o título, o texto e o CTA do Alinhamento Final.

**O que mudou:**
- **Fundo e foto:** degradê magenta, sem foto. A foto pendente e o placeholder saíram.
- **Coluna esquerda:**
  - tag "ACOLHIMENTO AVANÇADO";
  - H2 "Mais tranquilidade / quando você precisa.";
  - parágrafo literal;
  - 2 cards de vidro (Sedação Consciente Oral / Sedação Intravenosa com Anestesista), com ícones rosa preenchidos.
- **Card lateral branco** "Converse com nossa equipe":
  - ícone de equipe com dente;
  - botão "Quero conversar sobre isso", com `data-cta="sedacao"`;
  - mensagem: "Olá! Gostaria de conversar sobre as opções de sedação da Lien.".
- **Quebras de linha:** as do print valem só no desktop.
- **Verificador:** a regra "todo CTA principal diz Agende sua consulta" ganhou exceção para a Sedação, e entrou uma checagem do CTA do print e da ausência de foto. Agora são **80 checagens**.

**Desvios técnicos:**
- O H2 pede Poppins 800, peso que não é carregado; o navegador usa o 900.
- No botão, o `aria-label` do prompt ("Conversar com a equipe da Lien pelo WhatsApp sobre sedação") não contém o texto visível e quebraria a WCAG 2.5.3 (label in name). O nome acessível ficou "Quero conversar sobre isso com a equipe da Lien pelo WhatsApp sobre sedação (abre o WhatsApp)".
- O botão usa padding de 16px, e não 22px, para caber numa linha no card de 306px.
- `rel="noopener noreferrer"`, o padrão do site.
- **Contraste**, medido nos três pontos do degradê: parágrafo 7,9:1 ou mais; texto dos cards (92%) 5,8:1 ou mais; tag (85%) 4,6:1 ou mais.

**Para a revisão ética/CRO** (item 23 do Alinhamento Final). O texto **não foi alterado**:

| Trecho do print | Atenção | Alternativa sugerida (só se a clínica aprovar) |
|---|---|---|
| "relaxamento absoluto" | Promessa absoluta; o nível de relaxamento varia de pessoa para pessoa | "mais conforto e relaxamento" |
| "com total segurança" | Afirmação absoluta sobre segurança | "com protocolos de segurança" |
| "induzir um estado de profundo relaxamento" | Pode ser lido como promessa de efeito garantido; o alinhamento pede não prometer o nível de consciência | "para promover um estado de relaxamento" |
| "Medicação **pré-consulta**" | A medicação é tomada antes do **procedimento**, não da consulta | "Medicação administrada antes do procedimento" |
| "ideal para cirurgias complexas e pacientes altamente ansiosos" | A indicação é individual e definida após a consulta e a análise de segurança | "indicada após consulta e análise de segurança" |
| "protocolos seguros de controle da dor" | Junto de "relaxamento absoluto", pode soar como promessa de ausência de dor | — |
| Título "Mais tranquilidade quando você precisa." | O Alinhamento aprovou outro título ("Mais conforto e segurança para quem sente medo ou ansiedade durante o tratamento.") | — (decisão do cliente: manter o print) |
| CTA "Quero conversar sobre isso" (WhatsApp) | O Alinhamento padronizou o CTA como "Agende sua consulta" | — (decisão do cliente: manter o print) |

---

## Experiência Lien no layout e na copy do print (out/2026)

Fonte: `prompt-claude-code-experiencia-lien.md`. Por decisão da clínica, layout e copy são os do print. Isso substitui, nesta seção, o cabeçalho, os capítulos e a faixa de diferenciais do Alinhamento Final.

**O que mudou:**
- **Cabeçalho:** "JORNADA & INOVAÇÃO" / "Experiência Lien" / subtítulo literal, sobre o fundo branco com as ondas da marca a 5%.
- **Player:** escuro e largo (até 1260px), com proporção 16/7.6 no desktop, 16/9 no tablet e 4/5 no celular.
  - O texto do capítulo fica sobreposto no canto inferior esquerdo, sobre o degradê de leitura.
  - O botão de play translúcido fica no centro.
  - A barra de 3 abas fica na base; a aba ativa mostra a barra de progresso rosa.
- **Abas no celular:** viram pills escuras abaixo do player.
- **Comportamento:**
  - Nada toca sozinho com som. O play reinicia o vídeo com som e controles; ao pausar ou terminar, o texto volta.
  - Ao terminar um vídeo, o capítulo seguinte é selecionado sem tocar.
  - Os vídeos carregam sob demanda, só quando a seção chega a 200px da tela.
  - Capítulo sem vídeo mostra um poster neutro, escuro com o arco em rosa a 20%, e o texto, sem botão de play.
  - Abas ARIA com setas, Home e End.
- **Teste do play:** foi feito com um vídeo temporário, depois removido. Toca com som, a barra de progresso avança, o texto some e volta ao pausar.
- **Removidos:** a faixa de diferenciais e o carrossel do celular (`Carrossel.tsx`, que ficou sem uso). O vídeo institucional da recepção também saiu de `public/videos/`, porque é vertical e não serve ao player largo; o original continua em `assets/vídeos/`.

**Desvios, pelas regras do projeto:**
- **Números dos capítulos** ("01", "02", "03"): em **branco**, e não no rosa-claro do print, porque o manual veda o rosa-claro como cor de texto (decisão do usuário). O rosa ficou só na barra de progresso e na borda da pill ativa.
- **Tag teal:** fica sobre branco com borda. Sobre `#E3F1F4` o teal reprova AA.

**Pontos de atenção:**
1. **Vídeos pendentes:** os três capítulos estão sem vídeo e mostram o poster neutro.
   - O print usa material promocional da **Medit** ("MEDIT iE"), que o Alinhamento trata só como referência de interação. Usar vídeo de outra empresa pode exigir autorização da fabricante, por isso não entrou.
   - O vídeo do capítulo 01 deve ser **da Lien**, com a Dra. Natália fazendo o escaneamento.
   - Cada vídeo precisa de MP4 (H.264) + WebM 1080p + poster WebP, e de `.vtt` se houver fala. Os caminhos ficam em `experiencia.capitulos[n].video`, no `content.ts`.
2. **Textos dos capítulos 02 e 03:** são **sugestão** do prompt. A clínica precisa validar:
   - 02 "Recursos de conforto": "Fones com isolamento de ruído, massagem e aromaterapia. / Cada detalhe pensado para você relaxar.";
   - 03 "Orientação e acompanhamento": "Conversa à mesa, kit personalizado e acompanhamento pós-procedimento. / O cuidado continua depois da cadeira.".
3. **"ultraprecisa"** (capítulo 01): superlativo técnico. A revisão CRO pode pedir "com alta precisão". Foi implementado como no print.
4. **Diferenças em relação ao Alinhamento Final,** por decisão do cliente:
   - o cabeçalho "Experiência Lien" no lugar de "A experiência começa antes do tratamento.";
   - os nomes dos capítulos;
   - a ausência da faixa de diferenciais.

---

## Resultados em carrossel horizontal (out/2026)

Fonte: `prompt-claude-code-resultados-carrossel-lien.md`.

**Diagnóstico do efeito de antes e depois** (Fase 1):
- O comparador é próprio, `src/components/ui/image-compare.tsx`, sem biblioteca. É um slider arrastável feito com Pointer Events (`pointerdown`, `pointermove`, `pointerup` e `pointercancel`), com `setPointerCapture` na raiz do card.
- **Mouse:** arrasta na hora.
- **Toque:** espera 6px de movimento. Se o gesto for mais vertical que horizontal, libera a rolagem da página (a raiz tem `touch-action: pan-y`).
- **Toque rápido na foto:** leva a divisória até o ponto tocado.
- **Alça:** `role="slider"`, com setas, Home/End e PageUp/Down; o duplo clique nela volta a divisória para 50%.
- Não há hover nem animação automática. As molas são do `motion`.
- Não havia biblioteca de carrossel no projeto. Entrou o **Embla Carousel 8** (`embla-carousel-react` + `embla-carousel-autoplay`), como o prompt recomenda.
- São 6 casos, o que permite loop: o mínimo é 4.

**O que mudou:**
- **Trilho:** uma linha só, com 3 cards inteiros no desktop (24px entre eles), 2 no tablet e 1,15 no celular (16px entre eles).
- **Bordas:** fade de 48px nas laterais, só no desktop. A largura dos slides e a máscara ficaram em `globals.css`, porque o verificador reprova "100%" na marcação.
- **Movimento:** autoplay de 1 card a cada 4,5s, em loop. Pausa no hover, no foco, durante a comparação, com a seção fora da tela, com a aba oculta e pelo botão de pausa (WCAG 2.2.2). Retoma 3s depois que o último motivo de pausa sai; o botão de pausa só o próprio usuário desfaz.
- **Controles:** setas de 44px (ocultas no celular), pontos que viram uma pílula magenta e o botão pausar/retomar.
- **Movimento reduzido:** sem autoplay e com troca instantânea.
- **O card não foi alterado.** Ganhou só um `<div data-compare-area>` em volta do comparador, porque o componente não aceita atributos extras; as fotos já tinham `draggable={false}`.
- **Regras contra conflito de arraste:**
  - um arraste que começa no comparador é ignorado pelo Embla (`watchDrag`) e pausa o autoplay;
  - as setas do teclado só movem o carrossel quando o foco não está na alça;
  - o Embla move apenas o trilho, sem `scale`, `rotate` nem `filter` nos slides.
- **Aviso legal:** continua visível abaixo do carrossel, e a legenda de autorização segue em cada caso.

**Testes realizados** (Chrome headless, porque o painel do app fica oculto e congela as animações):
- **Desktop, mouse:**
  - o autoplay avançou do caso 1 para o 2 em cerca de 5s;
  - o hover pausou por 6s, e o carrossel retomou depois de sair;
  - as setas foram de 3 para 4 e voltaram para 3; o ponto 4 levou ao caso 4;
  - o botão de pausa segurou o carrossel por 9s;
  - arrastar o comparador de um card visível moveu a divisória de 50% para 87% sem mover o carrossel;
  - arrastar na legenda moveu o carrossel (4 para 5);
  - as setas do teclado na alça não moveram o carrossel, e nos controles foram de 5 para 6.
- **Celular (375px, toque):**
  - arrastar no comparador moveu a divisória de 50% para 95% e não mexeu no carrossel;
  - o swipe na legenda passou do caso 1 para o 2;
  - um arrasto vertical sobre o comparador rolou a página (de 1570 para 1846px);
  - o loop passou do caso 6 para o 1;
  - o comparador continuou funcionando depois do loop: o arrasto foi de 80% para 13%, e o toque rápido na foto, de 50% para 80%;
  - sem setas e sem rolagem horizontal.
- **Ainda não testado:** iOS Safari e Chrome Android em aparelho real. O teste foi no Chrome com emulação de toque.

**Pendente:** a revisão ética/CRO dos casos, que segue como estava no Alinhamento Final.

---

## Experiência: vídeo do scanner (YouTube) no capítulo 01 (out/2026)

O vídeo enviado pela clínica, o Short https://youtube.com/shorts/W87pzc6c9hs ("Vídeo Scanner"), entrou no capítulo **01 · Scanner intraoral**.

**Como funciona:**
- **Antes do clique:** aparece o poster vertical, uma cópia local da miniatura do vídeo (`public/img/experiencia-scanner-540.{webp,avif}`, com original em `assets/videos-youtube/`), sobre um fundo desfocado da mesma imagem. Nenhum pedido vai ao YouTube ou ao Google antes do clique, a mesma regra de LGPD do mapa do rodapé. O verificador ganhou essa checagem e agora são **81**.
- **No clique de play:** entra o embed do `youtube-nocookie.com`, com autoplay, no formato 9:16, centralizado acima da barra de abas, e um botão "Fechar vídeo". Trocar de aba ou fechar remove o player, e o vídeo para.
- **Sem a API do YouTube:** não há barra de progresso na aba, e o texto não volta sozinho ao pausar. Ele volta quando se fecha o vídeo.
- **Política de privacidade:** a seção "Com quem compartilhamos" passou a citar que o vídeo do YouTube, como o mapa, só carrega no clique. A política inteira continua pendente de revisão jurídica.
- **Testado** no Chrome, em 1440px e em 375px com toque: zero requisições ao YouTube antes do clique; o embed fica dentro do player (259×460 no desktop, 211×375 no celular); fechar e trocar de aba removem o player; nenhuma rolagem horizontal.

**Atenção:** o vídeo está publicado no canal pessoal "Enzo Tavares", e o nome aparece no player do YouTube. O ideal é a clínica publicá-lo no próprio canal e trocar o ID em `experiencia.capitulos[0].video.id`, no `content.ts`.

---

## CTA final no layout e na copy do print (out/2026)

Fonte: `prompt-claude-code-cta-final-lien.md`. A seção `#agendar` foi **substituída** pelo layout do print, com o id mantido.

**O que mudou:**
- **Card:** largo, em degradê do magenta ao teal (passando por um roxo-azulado), com raio de 24px, sombra difusa e um brilho sutil no topo. Saíram o fundo magenta com padronagem e a logo branca, que o print não tem.
- **Título:** "Seu tratamento começa com / uma *consulta cuidadosa.*".
- **Texto:** o do print, "Dê o primeiro passo rumo ao sorriso que você merece com a excelência e o acolhimento da equipe Lien em Belo Horizonte.".
- **Botão:** pill branco com o ícone do WhatsApp e "Agende sua consulta" em magenta.
  - A origem passou a ser `data-cta="cta-final"`, e a mensagem é "Olá! Conheci a Lien pelo site e gostaria de agendar uma consulta.".
- **Animação:** entrada em sequência. O degradê se move devagar (14s, ida e volta) só a partir de 768px e fica parado com movimento reduzido.
- **Verificador:**
  - a origem obrigatória `final` virou `cta-final`;
  - a exigência da logo branca no CTA final saiu;
  - entrou uma checagem do card e do CTA único.
  - Agora são **82 checagens**.
- **CSS:** o degradê ficou em `.cta-final-card` (`globals.css`), porque o "100%" não pode ir na marcação. Nenhum outro botão dependia dos estilos antigos da seção.

**Desvios, pelas regras do projeto:**
- **Contraste:** no extremo teal (`#34809A`), o branco mede 4,47:1 e o branco a 92% mede 4,06:1, os dois abaixo do AA. O parágrafo ficou em **branco cheio**, como o prompt prevê, e o degradê só se move a partir de 768px, onde o texto não chega à borda teal (5,2:1 ou mais). No celular, o texto também não alcança o extremo (4,7:1 ou mais).
- **Nome acessível do botão:** é "Agende sua consulta (abre o WhatsApp)". O `aria-label` do prompt ("Agendar consulta pelo WhatsApp") não contém o texto visível e quebraria a WCAG 2.5.3.
- **Peso e itálico:** o título pede Poppins 800, que não é carregada; o navegador usa a 900. O itálico de "consulta cuidadosa." é sintético.
- **Botão no celular:** padding de 24px e 12px entre ícone e texto, para "Agende sua consulta" caber numa linha.
- `rel="noopener noreferrer"`, o padrão do site.

**Pontos de atenção:**
1. **Copy diferente do Alinhamento Final:** o parágrafo aprovado era "Na primeira consulta, entendemos sua história, suas necessidades e construímos juntos o caminho do tratamento.". Usei o texto do print, por decisão do cliente. A troca é só em `ctaFinal.textoLinhas`, no `content.ts`.
2. **"o sorriso que você merece":** tem tom de varejo. Incluir na revisão ética/CRO.

---

## Experiência: vídeo do capítulo 03 · Orientação e acompanhamento (out/2026)

O vídeo enviado pela clínica, `assets/vídeos/Lien experiência.mp4`, entrou no capítulo **03 · Orientação e acompanhamento**.

- **Original:** 7,4s, vertical 1080×1920, em HEVC (que o Chrome e o Firefox não tocam) e com áudio.
- **Arquivos gerados** em `public/videos/`, com ffmpeg rodado fora do projeto:
  - `experiencia-acompanhamento.mp4`: H.264 + AAC, 720×1280, 1,6 MB;
  - `experiencia-acompanhamento.webm`: VP9 + Opus, 1,2 MB;
  - poster WebP no quadro de 6,5s (a entrega do kit Lien) e um fundo desfocado.
- **Player:** ganhou o modo vertical para arquivos próprios.
  - Parado: o vídeo fica centralizado em 9:16 sobre o fundo desfocado.
  - Tocando: sobe para acima da barra de abas, para os controles nativos ficarem visíveis.
  - A barra de progresso rosa da aba acompanha o tempo, e o texto volta ao pausar.
- **Testado** no Chrome em 1440px e em 375px: toca com som e controles, o player fica dentro do painel, o progresso avança, o texto volta ao pausar e não há rolagem horizontal.
- **Pasta `assets/vídeos/`:** o vídeo institucional antigo ("vídeo lien institucional .mp4") foi removido pela clínica ao trocar os arquivos. A remoção entrou neste commit.
- **Pendente:** só o vídeo do capítulo 02 (Recursos de conforto).

---

## Experiência: vídeo do capítulo 02 · Recursos de conforto (out/2026)

O vídeo enviado pela clínica, `assets/vídeos/video acolhedor.mp4`, entrou no capítulo **02 · Recursos de conforto**. Com ele, os três capítulos da Experiência têm vídeo.

- **Original:** 47,5s, vertical 720×1280, em HEVC, com áudio e legenda embutida na imagem.
  - Com **203 MB**, passa do limite do GitHub (100 MB). Por isso **fica fora do git**: está no `.gitignore` e continua só na máquina.
  - Se precisar dele em outro computador, guarde uma cópia no Drive da clínica.
- **Arquivos gerados** em `public/videos/`:
  - `experiencia-conforto.mp4`: H.264 + AAC, 6,5 MB;
  - `experiencia-conforto.webm`: VP9 + Opus, 6,7 MB;
  - poster WebP no quadro de 29,5s (a dentista com os fones da paciente, com a palavra "Acolher" na legenda) e um fundo desfocado.
  - O site só baixa o vídeo no play (`preload="metadata"`, e só quando a seção se aproxima).
- **Testado** no Chrome em 1440px e 375px: toca com som e controles acima da barra de abas, a barra de progresso avança, o texto volta ao pausar e não há rolagem horizontal.
- **Para a clínica:** o vídeo fala de "não prometer que nada será sentido" e de respeitar o medo, coerente com as regras de publicidade. O texto de apoio do capítulo 02 ("Fones com isolamento de ruído, massagem e aromaterapia. / Cada detalhe pensado para você relaxar.") continua como sugestão a validar.

---

## Fundo quadriculado removido (out/2026)

A pedido, saiu o fundo "grade + brilho rosa" (`FundoGrade`) das duas seções que ainda o usavam, **Resultados** e **Equipe**. As duas agora têm fundo branco liso. O componente `background-snippets.tsx` e o CSS de animação dele (`.fundo-grade-*`) foram apagados, porque ficaram sem uso. O padrão de ondas da marca no Método e na Experiência não foi alterado.

**Atenção:** o Alinhamento pedia separar visualmente a prova clínica (Resultados) da prova emocional (Depoimentos). Antes, a grade fazia essa separação. Agora a separação fica pelo respiro entre as seções e pelo degradê quase branco dos Depoimentos.

---

## Hero: foto nova (out/2026)

A foto do banner foi trocada pela enviada pela clínica, `assets/hero/Banner Natália.png` (1672×941, 16:9).

- **Script:** o `scripts/optimize-hero.mjs` aponta para a foto nova. As larguras geradas passaram a 1024, 1440 e **1672** (no lugar de 2000), porque o original é menor que a foto anterior e não deve ser ampliado. As variantes `hero-lien-2000.*` foram removidas.
- **Celular:** o recorte vertical 3:4 continua centrado em 71% da largura e enquadra bem o rosto e os ombros. Como a foto nova tem 941px de altura, esse recorte é ampliado cerca de 1,3× para 900×1200. Fica um pouco menos nítido que antes, mas sem perda visível.
- **Conteúdo:** `hero.imagem` no `content.ts` ganhou as dimensões novas (1672×941), e o preload do LCP segue as larguras novas.
- **Conferido** em 1440px, 1920px e 375px: o texto continua sobre a área clara e legível, a doutora fica no terço direito e o navegador carrega a variante certa em cada largura (1440, 1672 e mobile-900).
- **Original antigo:** `assets/hero/Banner-lien-Firefly-Upscaler-escala-2x.png` continua na pasta, sem uso.

---

## Sorriso da marca: maior e sempre o símbolo oficial (out/2026)

Pedido da clínica: deixar o sorriso maior, trocar onde ele aparecia só como uma linha e deixar a textura da seção "Previsibilidade & Segurança" mais delicada e com menos zoom.

- **Tamanho:** o símbolo oficial (assets/Pastas/LIEN_simbolo_*.png) ficou maior.
  - Títulos de seção e /conteudos/: de 56px para 96px.
  - Hero: de 72px para 104px (120px no desktop).
- **Linhas trocadas pelo símbolo oficial:**
  - Fechamento do Método: rgb, 96px.
  - "Próximo passo" dos artigos: rgb, 96px.
  - Destaque da grade de /tratamentos/: cyano, 340px, aparece da esquerda para a direita (sem animação com movimento reduzido).
  - Poster de espera do vídeo da Experiência: cyano a 25%.
  - Os componentes `ArcoSorriso` e `ArcoGrande`, que desenhavam o sorriso em SVG, foram removidos.
- **Textura (Método e Experiência):**
  - O `npm run marca` passou a gerar `public/marca/padronagem-ladrilho.webp`. É um período exato do desenho oficial (1787×907px no original), que repete sem emenda.
  - O fundo usa esse ladrilho com 200px de largura. Antes, o arquivo inteiro era esticado com `cover`, e o zoom crescia junto com a altura da seção.
  - A opacidade caiu de 5% para 3,5%.

---

## Hero com foto nova e texto do print; vídeos verticais fundidos ao fundo (out/2026)

- **Foto:** `assets/hero/Retrato profissional na clínica iluminada.png` (1672×941). As variantes saem pelo `npm run hero`, com o mesmo recorte mobile em 71%.
- **Hero só com a foto:** saiu o véu claro (`.hero-veu`) que ficava entre a foto e o texto, como pedido ("sem blur, só a imagem"). O texto fica direto sobre a parede clara da foto.
- **Quebras de linha do print:** valem a partir do layout lado a lado; no celular o texto corre normalmente. Os textos estão em `hero.h1Linhas` e `hero.textoLinhas`.
  - H1 em 4 linhas, com "excelência clínica," em magenta.
  - O texto de apoio e o "Se você tem medo de dentista…" viraram um parágrafo só, e o "medo de dentista" fica em tinta escura.
- **Experiência:**
  - **Fundo:** nas laterais dos vídeos verticais (capítulos 01, 02 e 03), o fundo desfocado ficou com o tom mais forte (90%, blur maior).
  - **Degradê:** um degradê lateral (`.exp-laterais`) escurece em direção às bordas do player.
  - **Bordas:** as bordas do vídeo são esfumadas (`.exp-funde`, só antes do play) e se fundem com o fundo, então vídeo e fundo leem como uma peça só.

---

## Ícones oficiais do site (out/2026)

Troca dos ícones pelos da pasta `assets/ICONES_LIEN_SITE/`, enviada pela clínica. Cada subpasta corresponde a uma seção pelo nome da tag dela. O novo `npm run icones` (`scripts/gen-icones.mjs`) gera as versões web em `public/icones-lien/`: apara as bordas, deixa cada ícone em ~3x o tamanho exibido e salva em webp, com até 10 KB cada.

- **EXCELÊNCIA ODONTOLÓGICA → cards dos 10 tratamentos** (home e /tratamentos/).
  - O arquivo já traz o quadrado tintado, então o quadrado do código saiu.
  - As cores dos ícones seguem a mesma alternância magenta/teal dos botões.
  - Os SVGs desenhados à mão (`IconesTratamento.tsx`) foram removidos.
- **ORIENTAÇÃO PERSONALIZADA → "Por onde você quer começar?"**: Prótese, Mandíbula (DTM), Sorriso (Estética) e Medo. Os SVGs antigos de `public/icones/` foram removidos.
- **NOSSA ESSÊNCIA → Sobre**: Personalizado e Localização, no lugar dos ícones do lucide.
- **ACOLHIMENTO AVANÇADO → Sedação**:
  - Sedação (pílula) e Anestesista entraram nas modalidades.
  - No card "Converse com nossa equipe" entrou o Equipe_v02, que já vem com o círculo rosa-claro.
  - O `Equipe.png` (sem círculo) ficou sem uso.
- **Verificador:** a checagem "Sedação sem foto" passou a aceitar só os ícones de `/icones-lien/` como imagem.

---

## Sobre ("Lien quer dizer vínculo."): carrossel de fotos do consultório (out/2026)

- **Fotos:** as 3 fotos novas de `assets/fotos/consultorio/` (que substituíram as 3 antigas na pasta) foram copiadas para `assets/fotos-originais/`. Saíram as variantes avif/webp em `public/img/`:
  - `consultorio-vista` (horizontal, 720/1200/1672);
  - `consultorio-recepcao` e `consultorio-atendimento` (verticais, 480/720/960).
  - A foto anterior (`experiencia-consultorio`) foi removida.
- **Carrossel:** o `CarrosselConsultorio.tsx` usa Embla, igual ao de Resultados.
  - Uma foto por vez, em loop, recorte 4:5. A horizontal entra com o foco na cadeira e na janela.
  - Setas sobre a foto, pontos e botão de pausa abaixo, e setas do teclado.
  - Passa sozinho a cada 5 s. Pausa no hover e no foco da região inteira e pelo botão (WCAG 2.2.2). Com movimento reduzido, não há autoplay.
- **Textos:** os alt e os rótulos ficam em `sobre.fotos` e `sobre.carrossel` (`content.ts`).

---

## Experiência: 3 vídeos novos, um por capítulo (out/2026)

A clínica trocou os vídeos de `assets/vídeos/`. Cada um entrou no capítulo do seu nome:

| Original | Capítulo | Site (`public/videos/`) | Pôster |
|---|---|---|---|
| `Scanner feito (1).mp4`, 16,7s, 1080×1920 60fps | **01 · Scanner intraoral** (no lugar do Short do YouTube) | `experiencia-scanner`: mp4 3,2 MB · webm 3,4 MB | 13,5s: a dentista explica o modelo 3D ao paciente |
| `Lien Experiencia (1).mp4`, 17,1s, 1080×1920 | **02 · Recursos de conforto** (no lugar do "video acolhedor") | `experiencia-conforto`: mp4 3,6 MB · webm 2,8 MB | 10,5s: fones na paciente |
| `Acompanhamento.mp4`, 10,6s, 1080×1920 | **03 · Orientação e acompanhamento** | `experiencia-acompanhamento`: mp4 2,0 MB · webm 1,6 MB | 7,5s: a dentista com o kit Lien à mesa |

- **Conversão:** 720×1280 a 30fps, H.264/AAC (mp4, `+faststart`) e VP9/Opus (webm). Cada vídeo ganhou também um fundo desfocado para as laterais.
- **Sem YouTube:** o capítulo 01 deixou de usar o YouTube. A Experiência não faz mais nenhum pedido ao Google. Saíram a miniatura e o fundo do Short (`public/img/experiencia-scanner-*`, `assets/videos-youtube/`). O suporte a YouTube continua no player, sem uso.
- **Verificador:** a checagem LGPD do YouTube agora confere a ausência de YouTube e o pôster próprio do capítulo 01.
- **Original grande:** o `Scanner feito (1).mp4`, de 88 MB, foi para o `.gitignore`. Fica abaixo do limite de 100 MB do GitHub, mas pesa demais no repositório. Ele continua só na máquina.
- **Testado** no Chrome em 1440px e 375px: os 3 capítulos trocam e tocam com som e controles, e nenhum arquivo deu erro.
- **Atenção (LGPD):** entre ~1s e ~8s do vídeo do scanner, a tela do software mostra o **nome do paciente**. O pôster evita esse trecho, mas o vídeo exibe o nome. Confirmar com a clínica se há autorização do paciente; se não houver, o trecho precisa ser reeditado (desfoque do nome).

---

## Equipe: foto nova da Dra. Natália Simões (out/2026)

- **Origem:** a foto enviada pela clínica, `assets/fotos/Equipe/NATALIA-SIMOES (1).png` (3391×5087), entrou no card da Dra. Natália na seção Equipe, no lugar da anterior, que a clínica removeu da pasta.
- **Recorte:** `scripts/recortar-equipe.mjs` passou a usar topo 0,385, esquerda 0,08 e lado 0,82. Sai um quadrado do alto da cabeça às mãos, o mesmo enquadramento das demais profissionais.
- **Variantes:** `equipe-natalia-simoes-{320,480,640}.{avif,webp}`, regeradas.

---

## Hero igual ao print da clínica (out/2026)

- **Saíram:** o selo "Reabilitação oral · Belo Horizonte", o sorriso sob o título, a nota do Google (5,0 · 57 avaliações) e a legenda "Atendimento particular · Cruzeiro, BH". Os campos `hero.tag` e `hero.microcopy` também saíram do `content.ts`.
- **Título:** maior, até 56px no desktop (antes 52px), com as mesmas 4 linhas. O teto de 56px evita que "clínica," encoste no cabelo da doutora a 1440px. O parágrafo passou a peso light.
- **Dois botões:**
  - "Agende sua consulta": WhatsApp, `data-cta="hero"`, agora com ícone de agenda no lugar do logo do WhatsApp.
  - "Conheça a Experiência Lien →": cápsula em degradê teal, âncora para `/#experiencia`, sem WhatsApp.
- **Menu:** o 1º item passou de "Início" para "Sobre" (`/#sobre`), como no print. O logo continua levando ao início.
- **Verificador:** a checagem "prova social do Google no lugar do 2º botão" virou "2º botão leva à Experiência".

---

## Textos da home iguais aos prints da clínica (out/2026)

O 2º botão do hero ("Conheça a Experiência Lien") saiu. O hero voltou a ter um único CTA, o do WhatsApp.

Os textos foram trocados pelos dos prints enviados para cada seção:

| Seção | O que mudou |
|---|---|
| **Resultados** | Tag "Casos reais & transformações"; H2 "Resultados que contam histórias" (sem ponto); novo subtítulo. |
| **Depoimentos** | Contexto do 1º depoimento voltou a "Reabilitação Oral" (decisão do usuário). O resto já estava igual. |
| **Sobre** | Abertura e parágrafo novos ("Derivado do francês, **Lien**… Fundada em 2024 pela **Dra. Natália Simões**…"); a citação saiu. |
| **Método** | H2 "O Método Lien em 4 Etapas"; novo subtítulo; textos novos das 4 etapas; o fechamento "Sem pressa…" e o sorriso abaixo dele saíram. |
| **Por onde começar** | O link virou "conhecer tratamento ↓". |
| **Tratamentos (home)** | Tag "Excelência odontológica"; H2 "Tratamentos e Especialidades"; novo subtítulo. Os nomes passaram a "Implantodontia Digital", "Reabilitação Oral Completa" e "Harmonização Orofacial" (valem também em /tratamentos/). |
| **Equipe** | Tag "Corpo clínico"; novo subtítulo. Natália, Alexander, Gabriela e Luiza ganharam os textos do print, nesta ordem, e os selos "Fundadora", "Mestre & Doutor" e "Especialista", com a especialidade em caixa alta. Maria Emília e Isabela foram mantidas com os textos anteriores (decisão do usuário). |
| **Conteúdos** | Tag "Hub editorial"; novo subtítulo. Os 3 cards seguem com artigos reais, porque os títulos do print não existem (decisão do usuário). |
| **FAQ** | Tag "Esclarecimentos"; H2 "Dúvidas Frequentes"; subtítulo novo, antes do sorriso; 5 perguntas com a redação do print e as respostas aprovadas. Saiu "Preciso saber qual tratamento preciso antes de agendar?". O schema FAQPage acompanha. |
| **Sedação, Experiência e CTA final** | Já estavam iguais aos prints. |

**Ajustes ao print (decisões do usuário):**
- "100%" (Sobre) não entrou.
- "garantir" (Método, duas vezes) virou "assegurar". As duas palavras são vocabulário proibido pelo CRO.

**Erros de digitação do print corrigidos:**
- "osdentes" → "os dentes";
- "tratamento.." → "tratamento.";
- a etapa 3 vem cortada no print ("…previsibilidade do"); completei com "tratamento."

**Verificador:**
- FAQ passou de 6 para 5 perguntas.
- A checagem do hero agora exige um único botão.

**Para a revisão CRO:**
- "Especialistas renomados", "perfeita sinergia", "foco absoluto", "total segurança cirúrgica" e os selos "Especialista" / "Mestre & Doutor": a clínica precisa confirmar que os títulos estão registrados no CRO.
- A Dra. Luiza passou a "Ortodontia & Alinhadores". Antes constava "Prótese Dentária | Dentística e Estética".

---

## Experiência: texto fixo à esquerda e vídeo à direita (sugestão da Dra. Natália, out/2026)

Pedido da Dra. Natália, em vídeo: o texto do capítulo não deve sumir no play; deve ficar à esquerda, ocupando o espaço, com o vídeo do lado e uma transição suave entre os dois.

**A partir de 640px (tablet e desktop):**
- **Vídeo:** fica à direita (9:16, a 7% da borda), com o play no centro do próprio vídeo.
- **Texto do capítulo:** fica à esquerda, centralizado na vertical e maior (título até 42px, texto até 17px). Continua na tela durante o play.
- **Degradê (`.exp-laterais`):** escurece à esquerda, sob o texto, abre sobre o vídeo e fecha de leve na borda direita. As bordas esfumadas do vídeo (`.exp-funde`) fundem vídeo e fundo.
- **Tocando:** o vídeo encolhe para cima da barra de abas, para os controles aparecerem.

**Celular:** igual a antes. O vídeo fica centralizado, o texto na base, e o texto some no play, por falta de espaço lateral.

**Testado** no Chrome em 1440px e em 375px: os 3 capítulos trocam e tocam com som, sem nenhum erro de requisição.

---

## Hero com véu branco à esquerda; 1ª foto do carrossel na horizontal (out/2026)

- **Hero:** um véu branco suave cobre só o lado do texto. Ele começa em 72% de opacidade na borda esquerda e chega a zero em 58% da largura, antes do rosto. Não tem desfoque e só aparece no layout lado a lado; no celular, a foto fica abaixo do texto e o véu não entra. Serve para melhorar o contraste do texto sobre a foto.
- **Carrossel "Nossa essência":**
  - A 1ª foto (sala com a vista de BH) aparece inteira, na proporção horizontal original (1672×941). As duas verticais seguem em 4:5.
  - A altura do quadro acompanha a foto ativa, com transição suave de 0,5s, sem transição se o visitante reduz animações. Assim não sobra espaço vazio sob a foto horizontal.

---

## Rodapé igual ao print da clínica (out/2026)

O rodapé foi refeito pelo print, em 4 colunas e sobre fundo branco.

- **Marca:** logo, o texto "Odontologia que acolhe… alto padrão em Belo Horizonte." e botões redondos de Instagram e WhatsApp (`data-cta="rodape"`). Sem LinkedIn: a clínica não tem.
- **Seções:**
  - Sobre a Clínica (`/#sobre`)
  - Método Lien (`/#metodo`)
  - Tratamentos (`/tratamentos/`)
  - Experiência & Tecnologia (`/#experiencia`)
  - Corpo Clínico (`/#equipe`)
- **Tratamentos:**
  - Implantodontia Digital e Reabilitação Oral Completa: âncoras em `/tratamentos/`.
  - Lentes de Contato Dental: o artigo `/facetas-lentes-contato-dental-bh/`.
  - DTM e Dor Orofacial: âncora em `/tratamentos/`.
  - Sedação Consciente: `/#sedacao`.
- **Contato:** endereço (abre o Google Maps), telefone, e-mail e horários. Ficaram os dados reais, porque o print tinha placeholders.
- **Base:**
  - "© 2026 Lien Reabilitação Oral. Todos os direitos reservados. Belo Horizonte - MG." e "Desenvolvido com excelência clínica e rigor ético.".
  - Uma linha discreta com razão social, CNPJ, responsável técnica e CRO (exigência do CFO) e o link da Política de privacidade (LGPD).
- **Removido:** o bloco "Como chegar" com mapa e o componente `MapaSobDemanda`, o crédito "Site por Wolfness Company" e o `site.tagline`.
- **Atenção:** a resposta da FAQ "Onde a clínica está localizada…" ainda diz que o mapa fica no rodapé. Agora é o endereço que abre o Google Maps. Vale ajustar a frase se a clínica quiser.

---

## Instagram da clínica (out/2026)

- **Clínica:** o ícone do rodapé, o `sameAs` do schema da clínica e o `llms.txt` passaram a usar o Instagram da clínica, `@clinica_lien` (https://www.instagram.com/clinica_lien/).
- **Dra. Natália:** o perfil `@dra.nataliasimoes` ficou só no schema dela (Person), no campo novo `site.instagramDra`.

---

## Equipe: cabeçalho igual ao print (out/2026)

O cabeçalho da Equipe deixou de usar o `SectionHeading`.

- **Tag:** "Corpo clínico" em pílula magenta (`Etiqueta`).
- **Título:** H2 maior, em 2 linhas: "Diferentes especialidades." / "Um só planejamento.". A quebra vale a partir de 640px.
- **Subtítulo:** logo abaixo do título.
- **Sorriso:** o símbolo que ficava sob o título saiu, como no print.

---

## Conteúdos: cabeçalho igual ao print (out/2026)

O cabeçalho deixou de usar o `SectionHeading`.

- **Tag:** "Hub editorial" em pílula.
- **Título e subtítulo:** H2 e subtítulo juntos, com o subtítulo a 12px do título.
- **Sorriso:** saiu, como no print.
- **Cor da pílula:** branco a 20% sobre o teal, em vez do azul-claro do print. Com o texto branco sobre o azul-claro, o contraste ficava abaixo de 3:1.

---

## Sedação: peso das letras e diagramação do print (out/2026)

- **Título:** H2 em Poppins 700. Antes saía em 900, mais grosso que o print.
- **Parágrafo:** em 500, mais largo (680px), e cai para 3 linhas no desktop, como no print.
- **Cards:** os textos das modalidades passaram a 500.
- **Largura:** o conteúdo foi para 1160px, com o card "Converse com nossa equipe" a 320px.

---

## Sedação: sem palavras viúvas (out/2026)

- **Parágrafo e cards:** passaram a usar `text-wrap: pretty` (`text-pretty`). O navegador redistribui as linhas para não deixar uma palavra sozinha no fim, como "serenidade." e "estar.".
- **"bem-estar":** ganhou word joiners (U+2060) ao redor do hífen, para não quebrar a linha no meio da palavra.

---

## Hífen, padronagem mais fina e player na cor do vídeo (out/2026)

- **Palavras com hífen:** "bem-estar" ainda quebrava no hífen (o Safari ignorava o word joiner). O novo `SemQuebraNoHifen` (`src/components/ui/`) envolve palavras com hífen em `nowrap`. Está aplicado nos cards da Sedação e no texto dos capítulos da Experiência, o que também corrige "pós-procedimento". O word joiner saiu do `content.ts`.
- **Padronagem:** o ladrilho de ondas passou de 200px para 130px na Experiência e no Método. Com isso, o traço do símbolo fica mais fino, e a opacidade se manteve em 3,5%.
- **Player da Experiência:** o fundo segue a paleta de cada vídeo.
  - O desfoque do próprio quadro vai a 100%.
  - O véu escuro de leitura caiu de 78% para 42% à esquerda.
  - O degradê lateral (`.exp-laterais`) caiu de 90% para 30%.
  - O texto branco segue legível sobre o tom do vídeo.
