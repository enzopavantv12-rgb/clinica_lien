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
