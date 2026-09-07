# Relatório de verificação no navegador — migração React+Vite → Next.js

**Data:** 2026-09-07
**Branch:** `migracao-nextjs` (commit base `5ca85ec`)
**Task:** 9 — gate final do plano `2026-09-07-migracao-nextjs`

## Veredito

**REPROVADO com 1 item, que é uma falha pré-existente na `main` — não uma regressão da migração.**

- 7 dos 8 grupos de verificação passaram integralmente.
- 1 falha real de WCAG AA: **tag teal 12/13px sobre fundo cream `#FAF8F6` mede 4.46:1** (mínimo 4.5), em 2 seções. Verificado por `git show`: o mesmo par existe idêntico na `main`. Não é regressão; é um defeito que a migração herdou e que o README nunca mediu.
- 3 itens continuam **não verificáveis** neste ambiente (Lighthouse, 4G, Safari/Android reais) — listados no fim.

Nenhum código de produto foi alterado por esta task. Ver "Nada foi consertado" no fim.

## Ambiente da medição

| | |
|---|---|
| Artefato medido | `out/` (static export), **não** o dev server |
| Build | `npm run build` executado nesta sessão; Next.js 16.3.4, Turbopack, Node v24.12.0; 3 páginas estáticas geradas, TypeScript OK |
| Servidor | `npx serve out -l 5183` (serve 14.2.6) |
| URL | `http://localhost:5183/` |
| Navegador | Chromium / Chrome 148.0.7778.280, `devicePixelRatio` 1 |
| Sanity check | `document.querySelector('h1').textContent` = `Devolvemos sua mastigação, seu sorriso e sua confiança.` — site correto confirmado antes de qualquer medição |
| Peso do export | 1.3 MB em `out/` (sem as 9 fotos reais) |
| Harness automatizado | `node scripts/verificar-build.mjs` → "Tudo verde" (22/22), re-rodado nesta sessão |

Método: leitura de estilo computado via `javascript_tool` (`getComputedStyle`), com composição de alpha sobre a cadeia de ancestrais para achar o fundo efetivo; razão de contraste pela fórmula WCAG 2.x de luminância relativa.

---

## 9.2 — Console e rede

| Verificação | Medido | Veredito |
|---|---|---|
| Erros de console | **0** erros em 6 carregamentos completos da página (`read_console_messages`) | PASSA |
| Avisos de console | **1** aviso: `poppins-latin-700-normal.woff2 was preloaded using link preload but not used within a few seconds from the window's load event` | PASSA (aviso, não erro) |
| 404 de asset | **0**. Todas as 11 requisições por carga retornaram `200 OK` ou `304 Not Modified` | PASSA |
| Requisições por carga | 1 HTML + 1 CSS + 6 chunks JS + 3 fontes woff2 = 11 | — |

Observação honesta sobre a rede: o log do painel também contém 5 falhas `GET http://localhost:3000/ [ERR_CONNECTION_REFUSED / RESET]`. Essas requisições **antecedem** esta sessão de medição (tentativas de um agente anterior de alcançar o dev server, que não está rodando) e não foram originadas pela página servida em `:5183`. Não são 404 de asset e não contam contra o gate.

O aviso de preload da woff2 700 merece registro mas não é bloqueante: a fonte é baixada e a página renderiza com ela (o H1 aparece em Poppins 700 nos screenshots). O aviso indica que o `<link rel=preload>` chega antes do primeiro uso do peso 700 passar da janela de alguns segundos que o Chrome tolera. Não existia critério de aceite sobre isso.

---

## 9.3 — Contraste WCAG AA (12 pares medidos)

Alvo: 4.5:1 para texto normal, 3.0:1 para texto grande (≥24px, ou ≥18.66px com peso ≥700).

| # | Par | Texto | Fundo efetivo | px / peso | Alvo | Medido | Veredito |
|---|---|---|---|---|---|---|---|
| 1 | H1 hero (ink / branco) | `rgb(26, 20, 32)` | `rgb(255, 255, 255)` | 60px / 700 | 3.0 | **18.03** | PASSA |
| 2 | Sub hero (ink-muted / branco) | `rgb(90, 82, 96)` | `rgb(255, 255, 255)` | 19px / 400 | 4.5 | **7.47** | PASSA |
| 3 | Tag teal sobre **branco** (`#inicio`) | `rgb(3, 126, 153)` | `rgb(255, 255, 255)` | 13px / 600 | 4.5 | **4.72** | PASSA |
| 4 | Tag teal sobre **cream** (`#especialidades`) | `rgb(3, 126, 153)` | `rgb(250, 248, 246)` | 13px / 600 | 4.5 | **4.46** | **FALHA** |
| 5 | Tag teal sobre **cream** (`#equipe`) | `rgb(3, 126, 153)` | `rgb(250, 248, 246)` | 13px / 600 | 4.5 | **4.46** | **FALHA** |
| 6 | Label CTA branco / magenta (hero) | `rgb(255, 255, 255)` | `rgb(156, 23, 129)` | 17px / 500 | 4.5 | **7.36** | PASSA |
| 7 | Label CTA magenta / branco (CTA final) | `rgb(156, 23, 129)` | `rgb(255, 255, 255)` | 17px / 500 | 4.5 | **7.36** | PASSA |
| 8 | Legenda `white/80` sobre magenta (CTA final) | `rgb(230, 197, 224)` | `rgb(156, 23, 129)` | 14px / 400 | 4.5 | **4.71** | PASSA |
| 9 | Corpo FAQ (ink-muted / cream) | `rgb(90, 82, 96)` | `rgb(250, 248, 246)` | 17px / 400 | 4.5 | **7.05** | PASSA |
| 10 | Link de navegação do footer (`white/70` / ink) | `rgb(198, 196, 199)` | `rgb(26, 20, 32)` | 15px / 400 | 4.5 | **10.42** | PASSA |
| 11 | Número dos stats (magenta / cream) | `rgb(156, 23, 129)` | `rgb(250, 248, 246)` | 64px / 700 | 3.0 | **6.95** | PASSA |
| 12 | Copyright do footer (`white/55` / ink) | `rgb(141, 138, 144)` | `rgb(26, 20, 32)` | 13px / 400 | 4.5 | **5.26** | PASSA |

**Resultado: 10 de 12 passam. 2 falham (o mesmo par, em 2 seções).**

### O par documentado em 4.72:1 sobreviveu

O README documenta o par mais apertado como a tag teal de 12px em `4.72:1`. Esse valor **está intacto**: medido em `4.72` (linha 3), em todas as 5 tags que ficam sobre fundo branco (`#inicio`, `#metodo-lien`, `#experiencia`, `#ambientes`, `#faq`). Não houve regressão nesse par.

A razão é independente do tamanho da fonte (só depende das duas cores), e foi medida igual nos dois breakpoints: 12px (`text-tag`, viewport 375/800px) e 13px (`sm:text-tag-lg`, viewport 1440px).

### A falha: teal sobre cream, 4.46:1

`#037E99` sobre `#FAF8F6` = **4.46:1**, contra um mínimo de 4.5. Faltam 0.04. Ocorre em 2 dos 7 `SectionHeading` da página — exatamente os dois cujas `<section>` usam `bg-cream`:

- `#especialidades` → tag "ESPECIALIDADES"
- `#equipe` → tag "CORPO CLÍNICO"

As outras 5 tags ficam sobre `bg-white` e medem 4.72:1.

**Isto não é regressão da migração.** Verificado por diff direto entre branches:

```
git show main:src/components/sections/Especialidades.tsx  → `className="bg-cream ..."` + <SectionHeading tag=...>
git show HEAD:src/components/sections/Especialidades.tsx  → idêntico
```

Mesma coisa em `Equipe.tsx`. O componente `SectionHeading`, a classe `bg-cream` da seção e os dois tokens (`teal #037E99`, `cream #FAF8F6`) são iguais em `main` e em `migracao-nextjs`. O par sempre esteve em 4.46:1; o README mediu 10 pares e o conjunto medido incluiu a variante sobre branco (4.72) mas não a variante sobre cream.

**Não consertei.** Os dois valores são tokens travados do manual de identidade (`tailwind.config.ts`: "NAO alterar sem atualizar o manual"), e a instrução da task é explícita: não escurecer o fundo nem clarear o teal. A decisão é do dono do projeto. Caminhos possíveis, sem tocar nos tokens de marca:

- usar `text-ink` nessas 2 tags (18.03:1 sobre cream) e reservar o teal para as seções brancas;
- subir o peso da tag nessas 2 seções para 700 e o tamanho para ≥18.66px, o que a joga na faixa de "texto grande" (alvo 3.0);
- trocar `bg-cream` por `bg-white` nessas 2 seções (muda o ritmo visual da página);
- aceitar formalmente 4.46:1 como desvio documentado.

### Dois pares abaixo de 4.5 que NÃO são falhas de conteúdo

Registrados para transparência, com o porquê de não contarem:

| Elemento | Texto / Fundo | px / peso | Medido | Por que não conta |
|---|---|---|---|---|
| Numerais decorativos `01`–`04` do Método Lien | `rgba(26,20,32,0.07)` composto / `#FBEDFC` e `#D9EFF4` | 72px / 700 | **1.15** | `aria-hidden="true"`, `pointer-events-none`, `user-select: none`. Marca d'água puramente decorativa. WCAG 1.4.3 isenta texto decorativo. Confirmado no DOM: 4 ocorrências, todas com `aria-hidden="true"`. |
| Subtexto do caminho da imagem nos placeholders (`/img/hero-dra-natalia.webp`) | `rgb(117,111,122)` / `#E1E1E1` | 11px / 400 | **3.74** | Andaime dos 9 `[FOTO PENDENTE]`. Desaparece quando as fotos reais entrarem. Não é conteúdo que vai ao ar. O rótulo `[Foto pendente]` em si mede 5.71:1 e passa. |

---

## 9.4 — Estrelas dos depoimentos

| Verificação | Medido | Veredito |
|---|---|---|
| Quantidade de estrelas | **5** (`svg.lucide-star` dentro de um único `<article>` de depoimento) | PASSA |
| `fill` computado | **`rgb(156, 23, 129)`** nas 5 — idêntico ao esperado | PASSA |
| Atributo `fill` | `currentColor` nas 5 | PASSA |
| `stroke` computado | **`rgb(156, 23, 129)`** nas 5 — mesma cor do fill, anti-halo do Safari preservado | PASSA |
| Atributo `stroke` | `currentColor` nas 5 | PASSA |
| `color` herdado do contexto | `rgb(156, 23, 129)` | PASSA |
| `stroke-width` | `1px` | — |
| `fill` do `<path>` interno | `rgb(156, 23, 129)` (herança chega até o path, não só ao `<svg>`) | PASSA |
| Fallback acessível | `.sr-only` com "5 de 5 estrelas" presente no DOM | PASSA |

Nenhuma estrela vazia. `fill` e `stroke` ambos em `currentColor` e ambos resolvendo para o magenta — o pareamento que o README registra para não abrir halo no Safari continua íntegro no markup. (Que o resultado *visual* em Safari é o esperado não foi medido — só Chromium; ver pendências.)

---

## 9.5 — Ícone do WhatsApp nos 10 CTAs

10 CTAs encontrados por `a[href*="wa.me"]`. Todos com `<svg fill="currentColor">` e `fill` computado **igual à cor do link** (`inheritsCurrentColor: true` em 10/10).

| # | Origem | Fundo do CTA | `fill` computado do ícone | Contexto | Verde? |
|---|---|---|---|---|---|
| 1 | header, "Agendar" | `rgb(156, 23, 129)` | `rgb(255, 255, 255)` | branco sobre magenta | não |
| 2 | `#inicio`, "Agendar Avaliação pelo WhatsApp" | `rgb(156, 23, 129)` | `rgb(255, 255, 255)` | branco sobre magenta | não |
| 3 | `#especialidades` (card destaque) | `rgb(156, 23, 129)` | `rgb(255, 255, 255)` | branco sobre magenta | não |
| 4 | `#especialidades` (Reabilitação) | `rgb(255, 255, 255)` | `rgb(3, 126, 153)` | teal sobre card branco | não |
| 5 | `#especialidades` (Prótese) | `rgb(255, 255, 255)` | `rgb(3, 126, 153)` | teal sobre card branco | não |
| 6 | `#especialidades` (Perio) | `rgb(255, 255, 255)` | `rgb(3, 126, 153)` | teal sobre card branco | não |
| 7 | `#especialidades` (Lentes) | `rgb(255, 255, 255)` | `rgb(3, 126, 153)` | teal sobre card branco | não |
| 8 | `#especialidades` (demais tratamentos) | `rgb(255, 255, 255)` | `rgb(3, 126, 153)` | teal sobre card branco | não |
| 9 | `#agendar`, "Agendar pelo WhatsApp" | `rgb(255, 255, 255)` | `rgb(156, 23, 129)` | magenta sobre botão branco | não |
| 10 | botão flutuante | `rgb(156, 23, 129)` | `rgb(255, 255, 255)` | branco sobre magenta | não |

Os 3 contextos que o brief exige estão todos presentes e corretos: 4× branco sobre magenta, 5× teal sobre card branco, 1× magenta sobre botão branco.

**Varredura de verde na página inteira:** 628 elementos, 7 propriedades cada (`color`, `backgroundColor`, `fill`, `stroke`, 2 bordas, `outlineColor`).

- ocorrências dos verdes de marca do WhatsApp (`#25D366`, `#075E54`, `#128C7E`, `#4BD964`, `#00A884`, tolerância ±24 por canal): **0**
- ocorrências de qualquer cor com dominância de verde (`g > r+30` e `g > b+30`): **0**

Zero verde na página. PASSA.

---

## 9.6 — `dataLayer`

| Verificação | Medido | Veredito |
|---|---|---|
| `window.dataLayer` antes do clique | `undefined` (nenhum array pré-existente) | — |
| Clique | `computer left_click` no CTA do hero (`ref_19`, coordenada 249,404) — clique real de mouse, não `.click()` sintético | — |
| `window.dataLayer` depois | `[{ "event": "click_whatsapp", "origem": "hero" }]` | **PASSA** |
| `Array.isArray(dataLayer)` | `true`, `length` 1 | PASSA |
| `href` do CTA | `https://wa.me/5531985070448?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20na%20Lien.` | PASSA |
| `target` / `rel` | `_blank` / `noopener noreferrer` | PASSA |

Payload exatamente igual ao esperado: `{event: 'click_whatsapp', origem: 'hero'}`, uma única entrada, sem campos extras.

**Como a navegação foi tratada:** antes do clique registrei um listener de fase de bubble em `document` que dá `preventDefault()` em cliques em `a[href*="wa.me"]`. Como o React 18+ escuta no container da raiz (descendente de `document`), o `onClick` do componente executa **antes** do meu listener; `preventDefault()` só suprime a navegação padrão e não interfere no handler. Confirmado: `__navBlocked === 1`, `dataLayer.length === 1`, `location.href` continuou `http://localhost:5183/`, e nenhuma aba nova abriu (`tabs_context` mostrou só a aba de medição). O push do `dataLayer` medido é o do handler real do produto.

---

## 9.7 — Overflow horizontal

Critério: `document.documentElement.scrollWidth <= window.innerWidth`. Página recarregada após cada `resize_window` para que gates de layout de load re-executem.

| Viewport | `innerWidth` | `documentElement.scrollWidth` | `clientWidth` | `body.scrollWidth` | Veredito |
|---|---|---|---|---|---|
| mobile 375×812 | 375 | **375** | 375 | 375 | PASSA |
| tablet 768×1024 | 768 | **753** | 753 | 753 | PASSA |
| desktop 1440×900 | 1440 | **1425** | 1425 | 1425 | PASSA |
| nativo do painel 1280×720 | 1280 | **1265** | 1265 | 1265 | PASSA |

Nos 4 casos `scrollWidth <= innerWidth`. A diferença de 15px em tablet/desktop é a largura da barra de rolagem vertical.

Nota: no viewport mobile, uma varredura de bounding boxes encontrou 2 elementos que cruzam a borda (`<svg>` e `<rect>`, `left: -96` / `right: 724`) — é o padrão de ondas decorativo, que fica dentro de um container `overflow-hidden` e por isso não gera overflow de documento. Confirmado pelo próprio número: `scrollWidth` = 375 = `innerWidth`.

---

## 9.8 — Padrão de ondas a 8%

### Medido no DOM

| Propriedade | Hero (`#inicio`) | CTA final (`#agendar`) | Esperado | Veredito |
|---|---|---|---|---|
| Presente | sim | sim | sim | PASSA |
| `opacity` computada | **0.08** | **0.08** | 0.08 | PASSA |
| `pattern` width × height | **100 × 108** | **100 × 108** | `P` 100 × `ALT` 108 | PASSA |
| Tile mais alto que largo | **sim** (108 > 100) | **sim** (108 > 100) | sim | PASSA |
| `patternUnits` | `userSpaceOnUse` | `userSpaceOnUse` | não escalável | PASSA |
| `viewBox` / `preserveAspectRatio` no `<svg>` | ambos ausentes | ambos ausentes | ausentes (nenhum esticamento) | PASSA |
| `fill` do path | `#037E99` → `rgb(3, 126, 153)` | `#FFFFFF` → `rgb(255, 255, 255)` | teal / branco | PASSA |
| Path preenchido, não traçado | `stroke: none` | `stroke: none` | preenchido (afina nas pontas) | PASSA |
| Subpaths / quadráticas no `d` | 4 arcos / 8 `Q` | 4 arcos / 8 `Q` | 4 arcos (2 crista + 2 vale) | PASSA |
| Caixa renderizada | 820 × 560 px | 1425 × 574 px | visível | PASSA |
| `<rect>` de preenchimento | `fill="url(#ondas-1)"` | `fill="url(#ondas-2)"` | ids únicos | PASSA |

Sem `viewBox` e com `patternUnits="userSpaceOnUse"`, o tile é renderizado 1:1 em px de CSS — a proporção 100×108 chega à tela sem ser forçada para quadrada. O modo de falha que o brief descreve (tile achatado → malha de estrelas) não ocorre.

### Confirmado visualmente

`computer {action: "screenshot"}` no hero e no CTA final. Em ambos o padrão lê como **arcos grossos e afilados**: espessos no ápice, terminando em ponta; cadeia descontínua com a "mordida" nas junções; linhas alternadas deslocadas em meio período na horizontal. **Não é uma malha de estrelas.** PASSA nos dois.

Para tornar a geometria legível num screenshot (a 8% de opacidade os arcos são propositalmente quase invisíveis), a opacidade do `<svg>` foi elevada temporariamente para `1` **apenas no DOM da sessão do navegador**, e restaurada em seguida — confirmado `0.08` de novo nos dois após a restauração e após um reload limpo. Nenhum arquivo-fonte foi tocado. O valor de 8% do gate vem da leitura de `getComputedStyle` na tabela acima, não do screenshot.

Extra observado no mesmo screenshot: o CTA final tem **exatamente 1 botão** (`#agendar a[href*="wa.me"], #agendar button` → 1), coerente com o critério do README.

### Limitação do ferramental, registrada

`computer {action: "zoom"}` respondeu `region crop not yet supported in the Browser pane` e devolveu o screenshot inteiro — não houve recorte ampliado. Além disso, com viewport emulado grande (1440×900) e a página inteira medindo 12.278px de altura, `screenshot` falhava repetidamente com `Screenshot timed out after 5s`, e as capturas não acompanhavam `window.scrollTo`. Contornado voltando o viewport ao tamanho nativo do painel e, para o CTA final, ocultando temporariamente via `style.display='none'` os 15 irmãos de `#agendar` (revertido por reload) para encurtar a região de captura. As duas confirmações visuais foram efetivamente obtidas; o registro fica para quem repetir a medição.

---

## Placeholders de foto — esperados, não são defeitos

**9** ocorrências de `[Foto pendente]` no DOM, cada uma num container com `role="img"` e `aria-label` descritivo, mais o caminho do arquivo esperado como subtexto (`/img/hero-dra-natalia.webp`, `/img/experiencia-recepcao.webp`, etc.). É o comportamento correto enquanto as fotos reais não existem. Não contam como falha.

---

## Continua NÃO verificado

Itens que este relatório **não** fecha, com o motivo:

| Item | Por que segue aberto |
|---|---|
| **Lighthouse ≥90 nas 4 categorias** | Performance depende do peso das 9 fotos reais, que ainda não existem. O `out/` medido pesa 1.3 MB porque não tem imagem nenhuma — qualquer pontuação de performance obtida agora seria otimista e enganosa. Refazer contra o `out/` servido (não contra o dev server) **depois** que as fotos entrarem. |
| **Tempo <3s em 4G** | Mesma razão. Sem as imagens reais o número não representa a página que vai ao ar. |
| **Estrelas em Safari e Android reais** | Medido só em Chromium (Chrome 148). O pareamento `fill`+`stroke` em `currentColor` que evita o halo do Safari foi confirmado **no markup e no estilo computado**, mas o resultado renderizado em WebKit e em Chrome Android não foi observado. Precisa de dispositivo/navegador real. |
| **Emulação ≠ dispositivo** | Os 375px foram obtidos por emulação de viewport no Chromium, não em hardware. Suficiente para o critério de `scrollWidth`, insuficiente para afirmar paridade de renderização em Android real. |

Pendências de go-live que **não** são desta migração e seguem abertas: CRO-MG, as 9 fotos, CEP e coordenadas, `og-image.jpg`, números reais dos stats (hoje `+0`), GTM.

---

## Nada foi consertado

Esta task mediu; não corrigiu. Nenhum arquivo em `src/`, `app/`, `public/`, `tailwind.config.ts` ou `next.config.ts` foi alterado. O único arquivo criado é este relatório. As duas mexidas feitas no navegador (opacidade do padrão de ondas, `display:none` nos irmãos do CTA final) viveram só no DOM da sessão e foram revertidas.

A falha de 4.46:1 precisa de uma decisão, não de um patch: os dois valores envolvidos são tokens travados do manual de identidade.

## Recomendação sobre o merge

O merge é decisão do dono do projeto. O material para decidir:

- A migração **não introduziu regressão** em nenhum dos itens medidos. O par mais apertado que o README documentava (4.72:1) está intacto; estrelas, os 10 CTAs, `dataLayer`, overflow, ondas a 8%, console e rede todos passam com os valores esperados.
- A única falha de AA é **pré-existente na `main`**, confirmada por diff. Ou seja: ela já está em produção hoje. Bloquear este merge por causa dela não corrige nada e mantém a `main` servindo o mesmo defeito.
- O caminho coerente é tratar o 4.46:1 como um item próprio de acessibilidade, decidido e corrigido em separado — antes ou depois do merge, mas não como condição dele.

Se o critério do gate for lido ao pé da letra ("se qualquer item das Tasks 9.2–9.8 falhou, a migração não está pronta"), então o gate está reprovado e a decisão sobe para o dono.
