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
npm run sitemap    # regenera sitemap.xml com o lastmod de hoje
npm run images     # gera as variantes das fotos
npm run verificar  # roda as assertions do build
```

---

## Estrutura

```
next.config.ts                  output: 'export' + trailingSlash: true
tailwind.config.ts              design system (paleta e escala do manual)
app/
  layout.tsx                    shell HTML, Metadata API, favicon, preload
                                da fonte, JSON-LD
  page.tsx                      compõe as seções, na ordem
  globals.css                   @font-face + camadas do Tailwind
scripts/
  gen-images.mjs                npm run images — gera as variantes das fotos
  gen-sitemap.mjs               npm run sitemap — atualiza o lastmod
  verificar-build.mjs           npm run verificar — assertions sobre out/
assets/
  fotos-originais/              ENTRADA das fotos originais; fora do deploy.
                                Não existe no repo até a primeira foto chegar
  icones/                       SVGs de referência
public/
  robots.txt                    permissivo para crawlers de IA
  sitemap.xml                   Fase 1 + placeholders Fase 2 comentados
  llms.txt / llms-full.txt      contexto para agentes de IA
  .htaccess                     Hostinger: text/plain, 404, HTTPS, cache
  favicon.svg
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
  components/ui/                Logo, botões, gráficos de marca, Reveal
  components/sections/          as 10 seções
out/                            build estático (gerado, fora do git)
```

**Para editar qualquer texto do site, mexa só em `src/data/content.ts`.** Nenhuma string fica hardcoded em JSX.

---

## Deploy na Hostinger

1. `npm run sitemap && npm run build`
2. Suba **o conteúdo de `out/`** (não a pasta) para `public_html/` via hPanel → Gerenciador de Arquivos, ou FTP.
3. Confirme que o `.htaccess` subiu — arquivos com ponto às vezes ficam ocultos no upload. Ele é o que garante:
   - `llms.txt` servido como `text/plain`
   - redirect forçado para HTTPS (o canonical aponta para `https://`)
4. Ative o SSL em hPanel → SSL, se ainda não estiver ativo.
5. Valide, nesta ordem:
   - `https://lienreabilitacaooral.com.br/robots.txt`
   - `https://lienreabilitacaooral.com.br/sitemap.xml`
   - `https://lienreabilitacaooral.com.br/llms.txt` (precisa abrir como texto puro, não baixar)
   - [Rich Results Test](https://search.google.com/test/rich-results) → deve detectar `Dentist`, `FAQPage` e `Person`
6. Cadastre o sitemap no Google Search Console.

**Vercel/Netlify:** o `.htaccess` é ignorado. Configure o `Content-Type` de `llms*.txt` e a página de erro 404 no `vercel.json` / `netlify.toml`. **Não** configure rewrite de SPA: cada rota já é um arquivo real, e um catch-all para o `index.html` recria a duplicata de conteúdo que a migração eliminou.

> A arquitetura é Next.js com `output: 'export'`: o build gera HTML estático
> em `out/`, sem runtime Node. O `.htaccess` não tem mais fallback de SPA —
> cada rota é um arquivo real, e URL inexistente devolve 404 de verdade
> (`ErrorDocument 404 /404.html`, servindo o `out/404.html` do build).

---

## Pendências antes do deploy de produção

### Bloqueiam o go-live

| # | Item | Onde |
|---|---|---|
| 1 | **CRO-MG da Dra. Natália** — obrigatório por norma do CFO | `content.ts` → `site.responsavelTecnico` |
| 2 | **Fotos reais** — 9 imagens. Enquanto não chegarem, aparece o placeholder `[FOTO PENDENTE]` | `assets/fotos-originais/` → `npm run images` → `content.ts` |
| 3 | **CEP e coordenadas geo** do endereço | `src/data/schema.ts` → schema `Dentist` |
| 4 | **`og-image.jpg` 1200×630** — não gerado, precisa de design | `public/og-image.jpg` |

### Confirmar com a Dra. Natália

| # | Item | Onde |
|---|---|---|
| 5 | Números reais: +150 pacientes, 5,0★, 3 especialidades, +8 anos | `content.ts` → `numeros` |
| 6 | Atende convênio? (resposta do FAQ está genérica) | `content.ts` → `faq` (o schema `FAQPage` em `src/data/schema.ts` deriva desse objeto automaticamente) |
| 7 | Mais depoimentos reais (hoje só 1) — priorizar os que citam implante, reabilitação, prótese ou mastigação | `content.ts` → `depoimentos` |
| 8 | ID do container GTM | bloco preparado (inerte) em [`docs/analytics-blocos-preparados.md`](docs/analytics-blocos-preparados.md); instalar em `app/layout.tsx` com `next/script` |
| 9 | Meta Pixel e GA4 | via GTM |

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
`src/components/ui/Logo.tsx` — respeita área de proteção (padding de 10px), sem sombra, sem contorno, sem distorção. Duas variantes: `colorida` (fundo branco/cream) e `branca` (fundos magenta/teal/ink).

> **Este logo é um placeholder desenhado em SVG.** Substitua por `public/logo-lien.svg` oficial quando disponível, mantendo as duas variantes e o padding de proteção.

### Elementos gráficos
`src/components/ui/BrandGraphics.tsx` — a curva do "sorriso" (underline de headline) e o padrão de ondas. Ambos SVG inline, nunca raster.

O padrão de ondas foi remedido sobre o print do manual e reproduz o original: arcos **grossos e afilados** (paths preenchidos por dois arcos de raios diferentes que se encontram em ponta — `stroke` não serve, pois tem espessura constante), cadeia com **mordida** nas junções, e linhas alternadas deslocadas em meio período. Proporções normalizadas para período = 100:

| Constante | Valor | Origem no print |
|---|---|---|
| `P` | 100 | período crista→crista (~305px) |
| `AMP` | 16 | profundidade do arco (~50px) — ~1/3 da largura |
| `ESP` | 7 | espessura no ápice (~21px) |
| `ALT` | 108 | 2 linhas × 54 de entrelinha (~165px) |
| `GAP` | 2 | folga horizontal — mordida, não vão |

> O tile é mais **alto** que largo de propósito. Forçar 100×100 faz o vale de uma linha invadir a crista da linha acima, e o padrão vira uma malha de estrelas em vez de ondas.

Aplicado a **8%** de opacidade no hero e no CTA final — topo da faixa de 4–8% do prompt mestre, para que a geometria do manual seja legível. Para suavizar, mude `opacidade` em `Hero.tsx` e `CtaFinal.tsx`.

### Ícone do WhatsApp
`src/components/ui/WhatsAppIcon.tsx` — SVG inline próprio, em **todos os 10 CTAs** que abrem o WhatsApp (header, hero, os 6 cards de especialidade, CTA final e botão flutuante). Usa `currentColor`, então herda a cor do contexto: branco sobre magenta, teal sobre card branco, magenta sobre botão branco.

> Deliberadamente **não** usa o verde do WhatsApp. Verde não existe no manual e os "usos incorretos" vedam cores fora da paleta.

---

## Verificações já feitas neste build

Medidas no navegador, não por inspeção visual:

- **Estrelas dos depoimentos preenchidas** — `fill` computado = `rgb(156, 23, 129)`. Estrela vazia lê como avaliação zero e destrói a conversão; por isso o `fill="currentColor"` vem acompanhado de `stroke` na mesma cor, para não abrir halo no Safari.
- **Contraste WCAG AA** — 10 pares de texto/fundo medidos. **9 passam; 1 falha** (ver a decisão aberta logo abaixo). O par medido em `4.72:1` é a tag teal 12px sobre **branco** — esse passa, com margem pequena; não escureça o fundo nem clareie o teal sem remedir.
- **Um único `<h1>`**, hierarquia h2→h3 sem pular nível.
- **10 CTAs de WhatsApp**, cada um com a mensagem pré-preenchida correta da sua origem.
- **`dataLayer.push`** disparando: `{event: 'click_whatsapp', origem: 'hero'}`.
- **Zero links mortos**, zero `href="#"`, zero ocorrências de "Coleções Lien", zero cores fora da paleta, zero emoji no HTML.
- **CTA final com exatamente 1 botão.**
- **Sem overflow horizontal.** Console limpo, sem erros.
- **FAQ** — 8 perguntas, texto presente no DOM mesmo com o accordion fechado (indexável), espelhando o schema `FAQPage`.
- **Ícone do WhatsApp nos 10 CTAs** — verificado por `fill=currentColor` computado em cada um, com a cor correta do contexto.

### Falha de contraste em aberto — decisão do dono do produto

A tag teal de 12px sobre o fundo `cream` (`#FAF8F6`) mede **4.46:1**, abaixo
do mínimo **4.5:1** de AA para texto pequeno. Acontece nas seções
`#especialidades` e `#equipe`, as de fundo alternado. A variante medida antes
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

- **Lighthouse ≥90** nas 4 categorias — rode contra o `out/` servido, não contra o dev server.
- **Estrelas em Safari e Android reais** — validado só no Chromium.
- **Tempo <3s em 4G** — depende do peso das fotos reais, que ainda não existem.

---

## Decisões de escopo registradas

Pontos em que o **prompt diretor** (benchmarks/arquitetura) pediu algo que conflita com o **prompt mestre**, e o que foi decidido.

### Galeria de antes/depois — NÃO construída

O prompt diretor pede "galeria de casos antes/depois como elemento central de credibilidade". O prompt mestre restringe: *"Não exibir imagens de 'antes e depois' sem autorização documentada — a Resolução CFO 196/2019 restringe esse uso."*

**Decisão: fora do escopo até análise de conformidade.** Não é uma decisão de design — é de conformidade, e passa pela Dra. Natália e pelo CRO dela. Se houver autorização documentada dos pacientes, a seção entra depois sem retrabalho: a estrutura de seções é modular e o padrão do `BrandImage` já cobre o caso.

### Copy de jornada de transformação — NÃO aplicada

O prompt diretor sugere copy no estilo "Você chegou pela dor ao mastigar. Vai sair com o sorriso de volta.". O prompt mestre diz que o texto atual está **aprovado e final** e proíbe copy nova sem base nele.

**Decisão: manter a copy aprovada.** O H1 atual ("Devolvemos sua mastigação, seu sorriso e sua confiança") já carrega a promessa de transformação e passa no teste do próprio mestre: se um paciente com medo entendeu, está certo.

### Selos/certificações — NÃO construída

O prompt diretor pede um bloco de selos como reforço de autoridade. **Não há dado real** de títulos, especializações ou filiações no material recebido, e credencial de profissional de saúde não se inventa. Quando a lista existir, o bloco entra.

### Ambientes — construída

Entrou entre Corpo Clínico e Depoimentos, seguindo a estrutura de referência do prompt diretor (Hero → Sobre → Serviços → Equipe → **Ambientes** → Depoimentos). Três espaços com placeholder `[FOTO PENDENTE]`.

> ⚠️ A copy dessa seção é **nova** — o prompt diretor pediu a seção mas não trouxe texto. Derivei do vocabulário já aprovado no hero e na Experiência Lien para não introduzir voz nova, mas **precisa de aprovação**. Está marcada como tal em `content.ts`. A lista de ambientes também é uma suposição conservadora: confirmar quais espaços a clínica realmente tem.

---

## Restrições editoriais permanentes

- Nunca "Coleções Lien" — vocabulário de varejo, dissonante em saúde de alto padrão.
- Nunca avatar com iniciais no corpo clínico. Foto de rosto é o maior fator de confiança em saúde.
- Nunca promessa de resultado clínico garantido (Código de Ética Odontológica do CFO).
- Nunca "antes e depois" sem autorização documentada (Resolução CFO 196/2019).
- Nunca preço, promoção, desconto ou linguagem de varejo.
- Nunca banco de imagens.
- Frase-teste da copy: **se um paciente com medo entendeu, o copy está certo.**

---

## Sobre o `robots.txt`

O acesso está **liberado** para crawlers de IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended e outros). A decisão é estratégica: para uma clínica local, ser citada em respostas do tipo "melhor clínica de implante em BH" vale mais do que proteger conteúdo institucional.

Para restringir, troque `Allow: /` por `Disallow: /` nos blocos de IA em `public/robots.txt`.

O `export` do Next publica também `index.txt` e os `__next.*.txt` — dumps do
payload RSC, ou seja, uma duplicata rastreável de cada palavra do site — mais
`_not-found/` e `404/` com status 200. Todos estão em `Disallow`, no grupo
`User-agent: *` e no bloco de bloqueios do fim do arquivo.

> **Limitação conhecida, em aberto:** pelo padrão do robots.txt um crawler
> obedece **só** ao grupo mais específico que casa com ele, e não herda nada
> do grupo `*`. Como Googlebot, Bingbot e cada agente de IA têm grupo próprio
> com apenas `Allow: /`, nenhum deles recebe esses `Disallow` — nem os de
> `/admin` e `/*.json$`, que já eram assim antes desta mudança. Corrigir exige
> repetir os bloqueios dentro de cada grupo, ou consolidar os `User-agent` em
> um grupo único: as duas coisas mexem na estrutura da allow-list de IA, que é
> decisão estratégica registrada — fica para o dono. Alternativa que não passa
> pelo robots.txt: `Header set X-Robots-Tag "noindex"` para esses caminhos no
> `.htaccess`.
