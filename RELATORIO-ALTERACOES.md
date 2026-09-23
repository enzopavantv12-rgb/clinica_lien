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
