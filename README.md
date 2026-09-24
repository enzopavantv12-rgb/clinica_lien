# Lien Reabilitação Oral — Landing Page

Landing page single-page de alta conversão para a Lien Reabilitação Oral (Dra. Natália Simões — Belo Horizonte/MG).

O objetivo de conversão é **um único evento**: clique no botão que abre o WhatsApp com mensagem pré-preenchida.

---

## Stack

| Item | Versão |
|---|---|
| Next.js | 16.3.4 |
| React | 19 |
| TypeScript | 5.6 |
| Tailwind CSS | 3.4 |
| Motion | 13.2 |
| lucide-react | 0.460 |
| sharp | 0.35 (build) |

Build estático em `out/`. Não requer servidor Node em produção.

---

## Comandos

```bash
npm install        # instala dependências
npm run dev        # servidor de desenvolvimento
npm run build      # gera out/
npm run preview    # serve o out/ localmente
npm run images     # gera as variantes das fotos
npm run marca      # gera as versões web dos arquivos oficiais de marca
npm run verificar  # roda as assertions do build
```

---

## Estrutura

```
next.config.ts                  output: 'export' + trailingSlash: true
tailwind.config.ts              design system (paleta e escala do manual)
app/
  layout.tsx                    shell HTML, Metadata API, favicon, preload
                                da fonte, JSON-LD da clínica (Dentist, Person)
  page.tsx                      compõe as seções, na ordem do briefing;
                                JSON-LD FAQPage (só aqui: FAQ visível)
  privacidade/page.tsx          política de privacidade (rascunho LGPD)
  robots.txt/ sitemap.xml/      rotas GERADAS no build a partir do
  llms.txt/ llms-full.txt/      content.ts — o domínio vem de site.url
  globals.css                   @font-face + camadas do Tailwind
scripts/
  gen-images.mjs                npm run images — gera as variantes das fotos
  gen-marca.mjs                 npm run marca — gera public/marca/ a partir
                                de assets/Pastas/
  verificar-build.mjs           npm run verificar — assertions sobre out/
assets/
  fotos-originais/              ENTRADA das fotos originais; fora do deploy.
                                Não existe no repo até a primeira foto chegar
  Pastas/                       ORIGINAIS de marca enviados pela clínica:
                                logo RGB, logo branca, símbolo (RGB, ciano,
                                negativo) e padronagem. Fonte, fora do deploy
  icones/                       SVGs de referência
public/
  .htaccess                     Hostinger: text/plain, noindex dos dumps
                                RSC, 404, HTTPS, cache
  marca/                        SAÍDA gerada pelo npm run marca — logos,
                                símbolos, padronagem e favicons. Não editar
                                à mão: troque o original e rode de novo
  fonts/                        Poppins self-hospedada, subset latin
  img/                          SAÍDA gerada pelo npm run images —
                                <nome>-<largura>.{avif,webp}. Não editar
                                à mão, e não é onde se colocam as fotos
src/
  data/content.ts               TODO o conteúdo textual — fonte única
  data/schema.ts                JSON-LD (Dentist, FAQPage, Person) derivado
                                do content.ts
  data/imagens.json             larguras por slot de foto — fonte única
                                compartilhada por gen-images.mjs e BrandImage
  lib/whatsapp.ts               buildWhatsAppUrl centralizado
  lib/tracking.ts               dataLayer.push com falha silenciosa
  lib/llms.ts                   gera o llms.txt e o llms-full.txt
  components/ui/                Logo, botões, gráficos de marca, Reveal
  components/sections/          as seções da página, na ordem do briefing
vercel.json                     Vercel: noindex nos dumps RSC do export
out/                            build estático (gerado, fora do git)
```

**Para editar qualquer texto do site, mexa só em `src/data/content.ts`.** Nenhuma string fica hardcoded em JSX. O mesmo arquivo alimenta o schema, o `robots.txt`, o `sitemap.xml` e os `llms.txt`.

**Domínio de produção:** `site.url` em `src/data/content.ts` — hoje `https://clinica-lien.vercel.app`. Quando o domínio próprio for apontado, basta trocar essa linha: canonical, Open Graph, schema, sitemap, robots e `llms.txt` acompanham.

**Copy:** reescrita em setembro de 2026 a partir do briefing oficial da clínica. O que mudou, o que está pendente e o que precisa de validação está em [`RELATORIO-ALTERACOES.md`](RELATORIO-ALTERACOES.md).

---

## Deploy

**Produção atual: Vercel**, em `clinica-lien.vercel.app`. O `vercel.json` marca como `noindex` os dumps de payload RSC que o export gera (`index.txt`, `__next.*.txt`) e as cópias 200 da página de erro. Depois do primeiro deploy, confira que `/index.txt` responde com o header `X-Robots-Tag: noindex`.

### Alternativa: Hostinger

1. `npm run build`
2. Suba **o conteúdo de `out/`** (não a pasta) para `public_html/` via hPanel → Gerenciador de Arquivos, ou FTP.
3. Confirme que o `.htaccess` subiu — arquivos com ponto às vezes ficam ocultos no upload. Ele é o que garante:
   - `llms.txt` servido como `text/plain`
   - redirect forçado para HTTPS (o canonical aponta para `https://`)
4. Ative o SSL em hPanel → SSL, se ainda não estiver ativo.
5. Valide, nesta ordem:
   - `/robots.txt`
   - `/sitemap.xml`
   - `/llms.txt` (precisa abrir como texto puro, não baixar)
   - [Rich Results Test](https://search.google.com/test/rich-results) → deve detectar `Dentist`, `FAQPage` e `Person`
6. Cadastre o sitemap no Google Search Console.

**Vercel/Netlify:** o `.htaccess` é ignorado. A Vercel já serve `.txt` como texto, HTTPS, compressão e a página 404; o `noindex` dos dumps está no `vercel.json`. **Não** configure rewrite de SPA: cada rota já é um arquivo real, e um catch-all para o `index.html` recria a duplicata de conteúdo que a migração eliminou.

> A arquitetura é Next.js com `output: 'export'`: o build gera HTML estático
> em `out/`, sem runtime Node. O `.htaccess` não tem mais fallback de SPA —
> cada rota é um arquivo real, e URL inexistente devolve 404 de verdade
> (`ErrorDocument 404 /404.html`, servindo o `out/404.html` do build).

---

## Pendências antes do deploy de produção

A lista completa, com cada `[PENDENTE]` e `[SUGESTÃO]` agrupado por seção, está em [`RELATORIO-ALTERACOES.md`](RELATORIO-ALTERACOES.md). Os bloqueios principais:

### Bloqueiam o go-live

| # | Item | Situação |
|---|---|---|
| 1 | CRO-MG da Dra. Natália | ✅ **Resolvido pelo briefing**: CRO-MG 49.821, no rodapé e no schema |
| 2 | **Fotos reais** — 12 imagens (hero, sobre, experiência, 6 profissionais, 3 ambientes). Enquanto não chegarem, aparece o placeholder `[FOTO PENDENTE]` | `assets/fotos-originais/` → `npm run images` → remover `pendente: true` em `content.ts` |
| 3 | CEP do endereço | ✅ **Resolvido**: 30110-923 (corrigido em set/2026; o briefing trazia 30110-035). As **coordenadas** seguem pendentes — foram retiradas do schema até lá, porque o placeholder invalidava o bloco |
| 4 | **`og-image.jpg` 1200×630** com foto real da clínica — o arquivo não existe, e o compartilhamento em rede sai sem imagem | `public/og-image.jpg` |
| 5 | **Validação da copy** marcada como `[SUGESTÃO]` e da redação da sedação | ver `RELATORIO-ALTERACOES.md` |
| 6 | **Revisão jurídica** da política de privacidade | `app/privacidade/` + `content.ts` → `privacidade` |

### Confirmar com a Dra. Natália

| # | Item | Onde |
|---|---|---|
| 7 | Depoimentos reais autorizados — hoje a seção mostra só o selo do Google. Priorizar os que citam implante, reabilitação, prótese ou mastigação | `content.ts` → `depoimentos` |
| 8 | Casos de antes e depois autorizados (Resolução CFO 196/2019) — seção pronta e oculta | `content.ts` → `resultados` + `SHOW_RESULTS` |
| 9 | ID do container GTM | bloco preparado (inerte) em [`docs/analytics-blocos-preparados.md`](docs/analytics-blocos-preparados.md); instalar em `app/layout.tsx` com `next/script`. **Junto com o GTM entram o banner de consentimento e a atualização da política de privacidade** |
| 10 | Meta Pixel e GA4 | via GTM, com a mesma ressalva |

### Fotos esperadas

Produção é estática, sem runtime Node — logo sem o otimizador do `next/image`.
As variantes são geradas por `scripts/gen-images.mjs`. O fluxo tem três etapas
e **nenhuma delas é copiar arquivo para `public/img/`**:

1. Crie a pasta de entrada, que ainda não existe no repo:
   `mkdir assets/fotos-originais`
2. Coloque lá o **original em resolução alta** de cada foto, com o nome-base
   exato da tabela abaixo. Extensão aceita: `.jpg`, `.jpeg`, `.png` ou
   `.webp` — o nome-base é que precisa casar.
3. Rode `npm run images`. Ele lê as larguras de `src/data/imagens.json` e
   escreve `public/img/<nome>-<largura>.avif` e `.webp`. Um nome-base que não
   esteja no `imagens.json` é **ignorado com aviso** — nada é gerado para ele.

| Original em `assets/fotos-originais/` | Conteúdo |
|---|---|
| `hero-dra-natalia.*` | Dra. Natália, 3/4 ou corpo inteiro, fundo neutro |
| `experiencia-recepcao.*` | Recepção ou kit de acolhimento (quadrada) |
| `equipe-natalia-simoes.*` | Headshot quadrado |
| `equipe-maria-emilia.*` | Headshot quadrado |
| `equipe-isabela-guieiro.*` | Headshot quadrado |
| `equipe-alexander-pedrosa.*` | Headshot quadrado |
| `ambiente-recepcao.*` | Recepção (4:3) |
| `ambiente-atendimento.*` | Sala de atendimento (4:3) |
| `ambiente-kit-boas-vindas.*` | Kit de boas-vindas (4:3) |

> `public/img/` é **saída gerada**. Largar 9 arquivos `.webp` ali resulta em 9
> imagens quebradas: o `BrandImage` monta o `srcset` a partir do
> `imagens.json` e pede `/img/<nome>-<largura>.webp`, nunca
> `/img/<nome>.webp`. O `src` do `content.ts` serve só para derivar o
> nome-base; é o `pendente: true` que faz aparecer o placeholder.

Headshots com fundo neutro e iluminação consistente entre si. **Nunca banco de imagens** — o placeholder é preferível a uma stock photo.

Ao adicionar cada foto: original em `assets/fotos-originais/` → `npm run images` → conferir que os arquivos apareceram em `public/img/` → só então remover `pendente: true` do respectivo objeto em `content.ts` → `npm run build`.

### Direção de fotografia (briefing para o fotógrafo)

Diretrizes do prompt diretor. **Sem essas imagens o site não deve ir ao ar.**

- **Paleta de cena:** tons neutros, off-white, bege e madeira. Evitar consultório "frio" azul/branco clínico — isso trabalha contra o posicionamento de acolhimento.
- **Iluminação:** natural sempre que possível. Evitar fluorescente.
- **Expressão:** natural e sorriso confortável. Nunca posada ou forçada.
- **Composição:** espaço em branco generoso, para permitir sobreposição de texto.
- **Referências de estilo:** Aesop, Hospital Albert Einstein, clínicas premium europeias.
- **Prioridade máxima:** fotos reais de todos os profissionais, foto da clínica e do kit de boas-vindas.

Note que a paleta de cena (bege/madeira/off-white) foi escolhida para conversar com o token `cream` (`#FAF8F6`) dos fundos alternados. Fotos com fundo branco-clínico frio vão brigar visualmente com o site.

---

## Roadmap — Fase 2

Páginas internas otimizadas para SEO local. Os placeholders já estão comentados em `public/sitemap.xml`; descomentar conforme cada página for publicada.

Cada página deve ter: H1 com palavra-chave + cidade, explicação sem jargão, indicação, "Como funciona na Lien" (Método Lien aplicado ao tratamento), FAQ com schema próprio, depoimento específico do tratamento e CTA WhatsApp contextual.

| Página | Prioridade no sitemap |
|---|---|
| Implante Dentário em Belo Horizonte | 0.9 |
| Reabilitação Oral em Belo Horizonte | 0.8 |
| Prótese Dentária em Belo Horizonte | 0.8 |
| Periodontia em Belo Horizonte | 0.7 |
| Lentes de Contato Dental em BH | 0.7 |
| Disfunção de ATM em Belo Horizonte | 0.7 |
| Sobre a Dra. Natália (história + trajetória) | — |
| FAQ geral | — |

**Blog institucional** — há 14 artigos já redigidos para usar como base de autoridade: implantes, prótese vs. implante, protocolo, reabilitação oral completa, perda óssea, enxerto ósseo, facetas/lentes, dentes desgastados, dentadura fixa, mordida desalinhada, sangramento gengival, doença periodontal, periodontia e hormônios, e Ozempic/Wegovy e saúde bucal.

> Esse custo **já foi pago** pela migração para o Next.js. Não é mais preciso
> adicionar biblioteca de roteamento — o App Router é baseado em arquivos, e
> cada página é uma pasta em `app/` com um `page.tsx` — e não há mais fallback
> de SPA no `.htaccess` para desfazer: o `output: 'export'` grava um arquivo
> real por rota. Publicar uma página interna da Fase 2 é criar
> `app/<slug>/page.tsx`, exportar o `metadata` dela, descomentar a linha
> correspondente no `public/sitemap.xml` e buildar. O `trailingSlash: true` já
> fixa a forma das URLs, então nada precisa ser redirecionado depois.

---

## Ações fora do código (antes do lançamento)

Do prompt diretor, seção 4. Nada disso é implementável no repositório:

- [ ] **GA4** — bloco preparado (gtag), inerte, em [`docs/analytics-blocos-preparados.md`](docs/analytics-blocos-preparados.md). Instalar em `app/layout.tsx` com `next/script`. Falta o Measurement ID
- [ ] **Google Search Console** — verificar o domínio e submeter o `sitemap.xml` existente
- [ ] **Google Business Profile** — criar/atualizar com link direto para o site
- [ ] **SSL/HTTPS** ativo em produção (o `.htaccess` já força o redirect)
- [ ] **Auditoria Lighthouse/PageSpeed** mobile-first, meta <3s — só faz sentido depois das fotos reais

> Se o GTM for usado para gerenciar tags, instale o GA4 **por dentro** do GTM em vez de instalar os dois separadamente. O bloco GTM está junto do de GA4 em [`docs/analytics-blocos-preparados.md`](docs/analytics-blocos-preparados.md), também inerte (instalar em `app/layout.tsx` com `next/script`). GA4 e GTM juntos duplicam pageviews.

---

## Regras de marca travadas no código

Derivadas do manual de identidade visual oficial. **Não alterar sem atualizar o manual.**

### Paleta

| Token | HEX | Uso |
|---|---|---|
| `magenta` | `#9C1781` | CTAs, números, destaques, CTA final |
| `magenta-light` | `#F0B6F2` | Fundos suaves, tags — **nunca texto** |
| `teal` | `#037E99` | Assinatura, subtítulos, ícones |
| `teal-light` | `#68C0D4` | Fundos de card, detalhes — **nunca texto** |
| `brandgray` | `#E1E1E1` | Divisores, bordas |
| `ink` | `#1A1420` | Texto principal (neutro derivado) |
| `ink-muted` | `#5A5260` | Texto secundário (neutro derivado) |
| `cream` | `#FAF8F6` | Fundos alternados (off-white quente) |

Não existe "navy" no manual. Onde o plano estratégico pedia navy, o código usa `ink` para texto ou `teal` para elemento de marca.

### Tipografia
Poppins como família única. Apenas os 5 pesos autorizados: 300, 400, 500, 700, 900. Self-hospedada em `public/fonts/`, subset latin apenas.

### Logo
`src/components/ui/Logo.tsx` — arquivos oficiais da clínica. Respeita área de proteção (padding de 10px), sem sombra, sem contorno, sem distorção: só a altura é fixada, e a largura segue a proporção natural do arquivo. Duas variantes: `colorida` (`LIEN_logo_rgb.png` — header, fundo branco) e `branca` (`Logo Lien Branca.png` — rodapé, fundo `ink`).

> A logo branca veio com uma textura de ruído no próprio arquivo: 35% dos pixels são semi-transparentes, contra 2% na colorida. No tamanho do rodapé é invisível, mas aparece se for ampliada. Vale pedir à clínica uma versão limpa.

### Símbolo
O sorriso isolado, em três variações: `rgb` (teal, fundos claros), `cyano` (ciano, fundos escuros) e `negativo` (branco, sobre magenta ou teal). Componente `Simbolo` em `BrandGraphics.tsx`.

- **Underline dos títulos de seção** — variação `rgb`, 56px de largura, sem distorcer.
- **Favicon** — `negativo` sobre quadrado magenta, gerado em 32, 180 (Apple) e 512px.

### Padronagem
`PadraoOndas` em `src/components/ui/BrandGraphics.tsx` — arquivo oficial `LIEN_padronagem.png`: o símbolo do sorriso repetido em ondas.

O arquivo é branco sobre transparente, então entra como **máscara CSS**: o canal alfa recorta a forma e a cor de fundo pinta. Um único arquivo serve em qualquer cor — teal no hero, branco sobre o magenta no CTA final.

Vai **inteiro**, com `mask-size: cover`, sem ser retalhado em mosaico. O arquivo tem margens desiguais (topo e base diferentes) e não fecha sem emenda se repetido.

Aplicado a **8%** de opacidade no hero e no CTA final — topo da faixa de 4–8% do prompt mestre. Para suavizar, mude `opacidade` em `Hero.tsx` e `CtaFinal.tsx`.

O original tem 11.839px e 854KB. O `npm run marca` gera uma versão de 2.000px e 44KB, com perda leve: é textura a 8%, e a borda segue limpa mesmo ampliada.

### Raster × vetor
A versão anterior deste README registrava que o manual pede os elementos gráficos em vetor. Os arquivos enviados pela clínica são PNG, e o site usa esses arquivos. Se existir versão vetorial (SVG, PDF, AI ou EPS), ela é preferível: logo nítida em qualquer tamanho e padronagem de poucos KB. Basta colocar em `assets/Pastas/`, adaptar o `gen-marca.mjs` e rodar de novo.

### Ícone do WhatsApp
`src/components/ui/WhatsAppIcon.tsx` — SVG inline próprio, em **todos os CTAs** que abrem o WhatsApp — header, hero, os 8 cards do cardápio, os 10 tratamentos, sedação, CTA final e botão flutuante. Usa `currentColor`, então herda a cor do contexto: branco sobre magenta ou teal, teal sobre card branco, magenta sobre botão branco.

> Deliberadamente **não** usa o verde do WhatsApp. Verde não existe no manual e os "usos incorretos" vedam cores fora da paleta.

---

## Verificações já feitas neste build

**Automáticas** — `npm run verificar`, 60 assertions sobre o `out/`, com teste negativo das principais (cada uma foi forçada a falhar e falhou pelo motivo certo):

- Conteúdo dentro do HTML, sem executar JS; um único `<h1>`; seções na ordem do briefing.
- Todo CTA de WhatsApp com o número da clínica, mensagem pré-preenchida e `data-cta`; todas as 23 origens presentes.
- FAQ com 12 perguntas indexáveis com o accordion fechado; `FAQPage` só na home.
- Vocabulário do briefing varrido no HTML, no JSON-LD, nas mensagens de WhatsApp, na privacidade e nos `llms.txt`.
- Nenhum marcador `[PENDENTE]` / `[SUGESTÃO]` publicado; nenhum número inflado; domínio único.
- Schema sem `aggregateRating`, sem `priceRange`, sem placeholder.
- CSS compilado, H1 fora de `opacity:0`, arquivos de marca existentes.

**No navegador**, contra o `out/` servido:

- Página viva: 23 CTAs com `data-cta` e o número certo; console limpo.
- `dataLayer.push` disparando: `{event: 'click_whatsapp', origem: 'hero'}`.
- Contraste medido em **300 elementos de texto**: só reprova o par da decisão abaixo. O aprovado mais apertado é o link teal nos cards compactos de tratamento, a 4,64:1.
- Sem overflow horizontal em 375, 1024 e 1280px; header sem quebra de linha a 1024px.
- Mapa do Google: nenhum iframe antes do clique.
- Botão flutuante: oculto sobre o hero, visível depois, com foco e `aria-hidden` coerentes.
- Estrelas dos depoimentos com `fill` e `stroke` em `currentColor` magenta.

### Falha de contraste em aberto — decisão do dono do produto

A tag teal de 12px sobre o fundo `cream` (`#FAF8F6`) mede **4.46:1**, abaixo
do mínimo **4.5:1** de AA para texto pequeno. Acontece nas tags das seções de
fundo alternado: `#sobre`, `#tratamentos`, `#estrutura` e `#depoimentos`.
A arquitetura do briefing tem mais seções em cream, e **as ocorrências subiram
de 2 para 4**. A variante medida antes
em `4.72:1` era a mesma tag sobre **branco**; a variante sobre `cream` nunca
havia sido medida.

Não é corrigível dentro das travas atuais: `teal` (`#037E99`) e `cream`
(`#FAF8F6`) são tokens do manual de identidade oficial, e os 12px vêm da
escala do manual. As saídas possíveis são todas decisão de dono, não de
implementação:

1. Escurecer o `teal` **só nesta tag** — viola o manual de identidade.
2. Subir a tag para 14px+ em peso 700, entrando na regra de texto grande
   (mínimo 3:1) — muda a escala tipográfica do manual.
3. Aceitar a falha de AA neste elemento e registrar como risco assumido.

**Status: aberto.** Nada foi alterado — nenhum token, nenhuma cor da tag.
Precisa de decisão de quem responde pelo manual de identidade.

### Ainda não verificado

- **Lighthouse** (o briefing pede Performance ≥ 85, Acessibilidade ≥ 95, SEO ≥ 95) — rode contra o `out/` servido, não contra o dev server.
- **Rich Results Test** do schema — exige o site publicado.
- **Animações de entrada das seções** — o navegador de teste rodou com a página oculta, o que pausa as animações. Os 102 elementos em espera têm a assinatura exata do estado inicial do `Reveal`; confira rolando num navegador visível.
- **CTAs em celular real.**
- **Estrelas em Safari e Android reais** — validado só no Chromium.
- **Tempo <3s em 4G** — depende do peso das fotos reais, que ainda não existem.

---

## Decisões de escopo registradas

### Copy — reescrita pelo briefing oficial (setembro de 2026)

A copy anterior, dada como "aprovada e final" pelo prompt mestre, foi substituída pela do briefing oficial preenchido pela clínica. O briefing tem precedência: é a fonte da própria clínica. O que mudou e o que ficou pendente está em [`RELATORIO-ALTERACOES.md`](RELATORIO-ALTERACOES.md).

### Galeria de antes e depois — construída, oculta

O briefing registra que existem casos de reabilitação e facetas com autorização assinada. A seção está pronta, com a legenda obrigatória em cada caso ("Imagem publicada com autorização do paciente" e "Os resultados variam de pessoa para pessoa e dependem de diagnóstico individual"), e **oculta** por `SHOW_RESULTS` até os arquivos chegarem e o enquadramento na Resolução CFO 196/2019 ser confirmado.

### Selos e certificações — não construído

O briefing não pede um bloco de selos. Os diferenciais técnicos (escâner intraoral, agregados plaquetários, sedação) aparecem como selos dentro do card de implantodontia. Credencial de profissional de saúde não se inventa.

### Ambientes — absorvida

A seção "Ambientes" não existe na arquitetura do briefing. As três fotos (recepção, atendimento, kit de boas-vindas) passaram para **Estrutura e tecnologia**.

---

## Restrições editoriais permanentes

- Nunca "Coleções Lien" — vocabulário de varejo, dissonante em saúde de alto padrão.
- Nunca avatar com iniciais no corpo clínico. Foto de rosto é o maior fator de confiança em saúde.
- Nunca promessa de resultado clínico garantido (Código de Ética Odontológica do CFO).
- Nunca "antes e depois" sem autorização documentada (Resolução CFO 196/2019).
- Nunca preço, valor da consulta, parcelamento, promoção, desconto, urgência artificial ("últimas vagas") ou linguagem de varejo. As informações comerciais do briefing servem só para o atendimento no WhatsApp.
- **Vocabulário do briefing:** nunca "avaliação" no sentido de consulta (use **consulta** ou **consulta e planejamento**), nunca "orçamento" (use **planejamento individual**), nunca "indolor"/"sem dor" como promessa, nunca superlativo vazio. "Investimento" só na FAQ, sem número. O `npm run verificar` reprova o build se algum aparecer.
- Nunca inventar dado clínico, número, título, CRO, depoimento ou nome. Onde falta informação, `[PENDENTE]` em comentário de código — nunca no texto publicado.
- Nunca imagem gerada por IA.
- Nunca banco de imagens.
- Frase-teste da copy: **se um paciente com medo entendeu, o copy está certo.**

---

## Sobre o `robots.txt`

O acesso está **liberado** para crawlers de IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended e outros). A decisão é estratégica: para uma clínica local, ser citada em respostas do tipo "melhor clínica de implante em BH" vale mais do que proteger conteúdo institucional.

O arquivo é **gerado no build** por `app/robots.txt/route.ts`, com o domínio de `site.url`. Para restringir os agentes de IA, tire-os da lista `agentesIA` nesse arquivo.

O `export` do Next publica também `index.txt` e os `__next.*.txt` — dumps do payload RSC, uma duplicata rastreável de cada palavra do site — mais `_not-found/` e `404/` com status 200. Eles recebem **`X-Robots-Tag: noindex`**, pelo `vercel.json` na Vercel e pelo `.htaccess` na Hostinger.

> Por que o header, e não só o `Disallow`: pelo padrão do robots.txt um crawler obedece **só** ao grupo mais específico que casa com ele. Googlebot, Bingbot e cada agente de IA têm grupo próprio com `Allow: /`, então não herdam os `Disallow` do grupo `*`. O header funciona para qualquer crawler — e ele precisa poder buscar o arquivo para ler o `noindex`, que é exatamente o que acontece.
