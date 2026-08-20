# Lien Reabilitação Oral — Landing Page

Landing page single-page de alta conversão para a Lien Reabilitação Oral (Dra. Natália Simões — Belo Horizonte/MG).

O objetivo de conversão é **um único evento**: clique no botão que abre o WhatsApp com mensagem pré-preenchida.

---

## Stack

| Item | Versão |
|---|---|
| React | 18.3 |
| Vite | 5.4 |
| TypeScript | 5.6 |
| Tailwind CSS | 3.4 |
| Framer Motion | 11.11 |
| lucide-react | 0.460 |
| react-helmet-async | 2.0 |

Build estático em `dist/`. Não requer servidor Node em produção.

---

## Comandos

```bash
npm install        # instala dependências
npm run dev        # servidor de desenvolvimento
npm run build      # gera dist/ (roda tsc antes)
npm run preview    # serve o dist/ localmente
npm run sitemap    # regenera sitemap.xml com o lastmod de hoje
```

---

## Estrutura

```
index.html                      metas de fallback + 3 schemas JSON-LD
tailwind.config.ts              design system (paleta e escala do manual)
public/
  robots.txt                    permissivo para crawlers de IA
  sitemap.xml                   Fase 1 + placeholders Fase 2 comentados
  llms.txt / llms-full.txt      contexto para agentes de IA
  .htaccess                     Hostinger: text/plain, SPA, HTTPS, cache
  favicon.svg
  fonts/                        Poppins self-hospedada, subset latin
  img/                          fotos reais (ver pendências)
src/
  data/content.ts               TODO o conteúdo textual — fonte única
  lib/whatsapp.ts               buildWhatsAppUrl centralizado
  lib/tracking.ts               dataLayer.push com falha silenciosa
  components/ui/                Logo, botões, gráficos de marca, Reveal
  components/sections/          as 9 seções, na ordem
```

**Para editar qualquer texto do site, mexa só em `src/data/content.ts`.** Nenhuma string fica hardcoded em JSX.

---

## Deploy na Hostinger

1. `npm run sitemap && npm run build`
2. Suba **o conteúdo de `dist/`** (não a pasta) para `public_html/` via hPanel → Gerenciador de Arquivos, ou FTP.
3. Confirme que o `.htaccess` subiu — arquivos com ponto às vezes ficam ocultos no upload. Ele é o que garante:
   - `llms.txt` servido como `text/plain`
   - redirect forçado para HTTPS (o canonical aponta para `https://`)
   - fallback de SPA para o `index.html`
4. Ative o SSL em hPanel → SSL, se ainda não estiver ativo.
5. Valide, nesta ordem:
   - `https://lienreabilitacaooral.com.br/robots.txt`
   - `https://lienreabilitacaooral.com.br/sitemap.xml`
   - `https://lienreabilitacaooral.com.br/llms.txt` (precisa abrir como texto puro, não baixar)
   - [Rich Results Test](https://search.google.com/test/rich-results) → deve detectar `Dentist`, `FAQPage` e `Person`
6. Cadastre o sitemap no Google Search Console.

**Vercel/Netlify:** o `.htaccess` é ignorado. Configure o `Content-Type` de `llms*.txt` e o rewrite de SPA no `vercel.json` / `netlify.toml`.

---

## Pendências antes do deploy de produção

### Bloqueiam o go-live

| # | Item | Onde |
|---|---|---|
| 1 | **CRO-MG da Dra. Natália** — obrigatório por norma do CFO | `content.ts` → `site.responsavelTecnico` |
| 2 | **Fotos reais** — 6 imagens. Enquanto não chegarem, aparece o placeholder `[FOTO PENDENTE]` | `public/img/` + `content.ts` |
| 3 | **CEP e coordenadas geo** do endereço | `index.html` → schema `Dentist` |
| 4 | **`og-image.jpg` 1200×630** — não gerado, precisa de design | `public/og-image.jpg` |

### Confirmar com a Dra. Natália

| # | Item | Onde |
|---|---|---|
| 5 | Números reais: +150 pacientes, 5,0★, 3 especialidades, +8 anos | `content.ts` → `numeros` |
| 6 | Atende convênio? (resposta do FAQ está genérica) | `content.ts` → `faq` **e** `index.html` → `FAQPage` |
| 7 | Mais depoimentos reais (hoje só 1) — priorizar os que citam implante, reabilitação, prótese ou mastigação | `content.ts` → `depoimentos` |
| 8 | ID do container GTM | `index.html` (bloco comentado) |
| 9 | Meta Pixel e GA4 | via GTM |

### Fotos esperadas

| Arquivo | Conteúdo |
|---|---|
| `hero-dra-natalia.webp` | Dra. Natália, 3/4 ou corpo inteiro, fundo neutro |
| `experiencia-recepcao.webp` | Recepção ou kit de acolhimento (quadrada) |
| `equipe-natalia-simoes.webp` | Headshot quadrado |
| `equipe-maria-emilia.webp` | Headshot quadrado |
| `equipe-isabela-guieiro.webp` | Headshot quadrado |
| `equipe-alexander-pedrosa.webp` | Headshot quadrado |

Headshots com fundo neutro e iluminação consistente entre si. **Nunca banco de imagens** — o placeholder é preferível a uma stock photo. Ao adicionar cada foto, remova `pendente: true` do respectivo objeto em `content.ts`.

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
- **Contraste WCAG AA** — 10 pares de texto/fundo medidos, todos passam. O mais apertado é a tag teal 12px em `4.72:1` (mínimo 4.5) — margem pequena, não escureça o fundo nem clareie o teal sem remedir.
- **Um único `<h1>`**, hierarquia h2→h3 sem pular nível.
- **10 CTAs de WhatsApp**, cada um com a mensagem pré-preenchida correta da sua origem.
- **`dataLayer.push`** disparando: `{event: 'click_whatsapp', origem: 'hero'}`.
- **Zero links mortos**, zero `href="#"`, zero ocorrências de "Coleções Lien", zero cores fora da paleta, zero emoji no HTML.
- **CTA final com exatamente 1 botão.**
- **Sem overflow horizontal.** Console limpo, sem erros.
- **FAQ** — 8 perguntas, texto presente no DOM mesmo com o accordion fechado (indexável), espelhando o schema `FAQPage`.
- **Ícone do WhatsApp nos 10 CTAs** — verificado por `fill=currentColor` computado em cada um, com a cor correta do contexto.

### Ainda não verificado

- **Lighthouse ≥90** nas 4 categorias — rode contra o `dist/` servido, não contra o dev server.
- **Estrelas em Safari e Android reais** — validado só no Chromium.
- **Tempo <3s em 4G** — depende do peso das fotos reais, que ainda não existem.

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
