# Migração para Next.js — Lien Reabilitação Oral

**Data:** 2026-09-07
**Branch:** `migracao-nextjs`
**Abordagem escolhida:** A — port cirúrgico

---

## 1. Objetivo

Hoje o `index.html` entrega isto ao navegador:

```html
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
```

Todo o conteúdo do `content.ts` só existe depois que o JS baixa, parseia e executa. Em 4G de celular — onde o tráfego pago cai — isso empurra o LCP para depois da hidratação, contra a meta de <3s do README e o limiar de 2,5s do LCP.

**A migração existe para que o HTML saia do build já com o conteúdo dentro.** Esse é o critério de sucesso primário. Todo o resto é consequência ou oportunidade barata aproveitada no caminho.

Ganho secundário, com valor na Fase 2: roteamento por arquivo e Metadata API, que o README hoje registra como custo pendente ("Publicar páginas internas exige adicionar roteamento (`react-router-dom`) e trocar o `.htaccess`").

## 2. Restrições

Herdadas do projeto e **não negociáveis** nesta migração:

- **Nenhuma linha de copy nova.** As restrições editoriais permanentes do README seguem valendo, incluindo a proibição de copy sem base no texto aprovado.
- **Paleta e tipografia travadas** pelo manual de identidade. Nenhum token muda de valor.
- **Conformidade CFO** intocada: sem antes/depois, sem promessa de resultado, sem preço, sem banco de imagens.
- **`content.ts` continua sendo a fonte única de texto.** Nenhuma string migra para JSX.
- **Fase 1 apenas.** Nenhuma das 7 páginas internas da Fase 2 é criada. A estrutura de rotas fica preparada; nenhuma rota nova nasce.

## 3. Contexto de hospedagem — e o que ele custa

Decisão do dono do projeto: **produção continua na Hostinger como estático; Vercel serve apenas de preview.**

Consequência direta: o Next.js roda em `output: 'export'`. Isso significa que **não existe runtime Node em produção**, e portanto:

| Recurso | Disponível? |
|---|---|
| HTML pré-renderizado no build (SSG) | ✅ — é o ganho principal, e sobrevive ao export |
| Metadata API estática | ✅ |
| Roteamento por arquivo | ✅ — cada rota vira um `.html` real |
| Otimizador de `next/image` em runtime | ❌ |
| SSR / ISR / Route Handlers | ❌ — não são necessários aqui |
| `app/sitemap.ts` / `app/robots.ts` | ⚠️ Não usaremos — ver §7 |

Registrado para quem for ler isto depois: se algum dia a produção migrar para a Vercel (ou para um VPS com Node), o ganho adicional disponível é o `next/image` com otimização em runtime. **Nada nesta spec impede essa mudança futura** — o pipeline de imagens do §6 seria substituível por `next/image` sem tocar em nenhuma seção.

O Git deploy da Hostinger na hospedagem compartilhada apenas clona o repositório no `public_html`; não provê runtime Node. Um Next.js com SSR ali exigiria VPS.

## 4. Stack

Next.js na última major estável, App Router.

**Restrições de versão** (a versão resolvida no `npm install` deve ser registrada no plano de implementação):

- Peer de React 19
- Suporte a `output: 'export'`
- Suporte a Metadata API

Isso puxa React 19, e com isso a troca obrigatória de `framer-motion` por `motion`:

> O `framer-motion` 11.11 (versão atual do projeto) é React 18. O projeto tornou-se independente em meados de 2025, foi renomeado para Motion, e o suporte a React 19 veio nas versões novas — com import de `motion/react` em vez de `framer-motion`.

Considerada e descartada a alternativa de ficar em Next 14 + React 18 para não tocar em animação alguma. Motivo da recusa: começar um build novo duas majors atrás, num site institucional que vai viver anos, custa mais manutenção futura do que a troca custa agora. A superfície de animação é pequena e contida — `Reveal.tsx` mais uso de `motion` em 4 arquivos — e o `Reveal` já tem o caminho de `prefers-reduced-motion` que funciona como rede de segurança.

**Configuração do `next.config.ts`:**

```
output: 'export'
trailingSlash: true
```

`trailingSlash: true` é decidido **agora**, antes de existirem páginas internas, para fixar a forma das URLs. Escolher entre `/implante-dentario` e `/implante-dentario/` depois de o Search Console ter indexado uma das duas gera redirect e perda de sinal. Também é o formato que o Apache serve de forma limpa a partir de diretórios.

## 5. Arquivos

### Nascem

| Arquivo | Papel |
|---|---|
| `app/layout.tsx` | `<html lang="pt-BR">`, import do CSS global, preload da fonte, JSON-LD |
| `app/page.tsx` | Composição das 10 seções — recebe o corpo do atual `App.tsx` |
| `app/globals.css` | Recebe o `src/index.css` sem alteração de conteúdo |
| `next.config.ts` | Config do §4 |
| `next-env.d.ts` | Gerado pelo Next |
| `scripts/gen-images.mjs` | Pipeline sharp do §6 |
| `src/data/schema.ts` | JSON-LD derivado do `content.ts` — §7 |

### Morrem

`index.html`, `src/main.tsx`, `src/App.tsx`, `vite.config.ts`, `postcss.config.js` (o Next traz o seu), `tsconfig.tsbuildinfo`.

### Ficam intocados

`src/data/content.ts`, `src/lib/whatsapp.ts`, `src/lib/tracking.ts`, `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`, `public/llms-full.txt`, `public/favicon.svg`, `public/fonts/`, `scripts/gen-sitemap.mjs`, `assets/`.

Em `src/components/sections/` há 12 arquivos: as 10 seções da página mais `Header` e `Footer`. Destes, **9 ficam intocados** — os 3 exceções (`Header`, `Numeros`, `Especialidades`) aparecem em "Modificados" abaixo por receberem `'use client'`, sem alteração de conteúdo.

### Modificados

| Arquivo | Mudança |
|---|---|
| `package.json` | Scripts e dependências — §9 |
| `tsconfig.json` | `jsx: preserve`, plugin do Next, `include` cobrindo `app` e `src` |
| `.gitignore` | Adiciona `out/` e `.next/` |
| `tailwind.config.ts` | Apenas o `content`: `['./index.html', './src/**/*.{ts,tsx}']` → `['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}']`. **Nenhum token de cor, fonte ou escala muda.** Sem isso o Tailwind purga todas as classes usadas em `app/` |
| `public/.htaccess` | Remove o fallback de SPA — §8 |
| `src/components/ui/BrandImage.tsx` | `<img>` → `<picture>` — §6 |
| `README.md` | Stack, comandos, e `dist/` → `out/` no deploy |
| Os 6 arquivos do §5.1 | Diretiva `'use client'` |
| `Reveal.tsx` + 4 arquivos | Import `framer-motion` → `motion/react` |

### 5.1 Fronteira server/client

`'use client'` em **exatamente 6 arquivos**, os únicos que usam estado, efeito, ref ou handler:

1. `src/components/sections/Header.tsx`
2. `src/components/sections/Numeros.tsx`
3. `src/components/sections/Especialidades.tsx`
4. `src/components/ui/FloatingWhatsApp.tsx`
5. `src/components/ui/Reveal.tsx`
6. `src/components/ui/WhatsAppButton.tsx`

Todo o resto — incluindo `Hero`, `MetodoLien`, `Experiencia`, `Equipe`, `Ambientes`, `Depoimentos`, `Faq`, `CtaFinal`, `Footer` — permanece Server Component.

**O detalhe que faz a migração funcionar:** o `Reveal` recebe conteúdo via `children`. Um Client Component que recebe `children` não força os filhos a serem client — eles são renderizados no servidor e passados prontos. Por isso o conteúdo das seções envolvidas por `Reveal` sai dentro do HTML do build, que é o objetivo do §1.

**O `Faq` permanece Server Component.** Verificado no código: o accordion usa `<details>`/`<summary>` nativo, sem estado — escolha já documentada no próprio arquivo ("acessível por teclado de graça, e o conteúdo fica no DOM"). É exatamente a propriedade que a verificação do §11 exige (texto indexável com accordion fechado), e ela sobrevive à migração sem esforço.

## 6. Imagens

O README aponta o peso das 9 fotos como o risco de performance nº 1 ("Tempo <3s em 4G — depende do peso das fotos reais, que ainda não existem"). Sem otimizador em runtime, a otimização vai para o build.

### Pipeline

`scripts/gen-images.mjs`, com sharp:

- **Entrada:** `assets/fotos-originais/` — fora do deploy, seguindo a convenção que o `assets/` já estabelece de guardar material-fonte não publicado.
- **Saída:** `public/img/`
- **Formatos:** AVIF e WebP
- **Fallback do `<img>`:** o WebP de largura intermediária

### Larguras por slot

| Slot | Arquivos | Larguras |
|---|---|---|
| Hero | `hero-dra-natalia` | 640, 960, 1280 |
| Quadradas | `experiencia-recepcao`, `equipe-natalia-simoes`, `equipe-maria-emilia`, `equipe-isabela-guieiro`, `equipe-alexander-pedrosa` | 320, 480, 640 |
| Ambientes 4:3 | `ambiente-recepcao`, `ambiente-atendimento`, `ambiente-kit-boas-vindas` | 480, 768, 1024 |

### `BrandImage`

Troca `<img>` por `<picture>` com `<source>` AVIF, `<source>` WebP e `<img>` de fallback, emitindo `srcset` e `sizes`.

**Preserva integralmente** o que já está correto no componente: `width`, `height`, `loading` (`eager` no hero, `lazy` no resto), `fetchPriority` alto só no hero, `decoding`, e as classes de `object-cover`/`rounded-3xl`.

**Preserva integralmente** o caminho de placeholder `[FOTO PENDENTE]`, incluindo o `ImageOff` e a exibição do `src` esperado. É o que a página mostra hoje e vai continuar mostrando até as fotos chegarem — a migração não pode alterar esse estado, porque é o estado atual do site.

O contrato de `pendente: true` no `content.ts` não muda.

## 7. Metadata e JSON-LD

### Metadata

Hoje a mesma informação está declarada **duas vezes**: no `Helmet` do `App.tsx` (runtime) e nas metas estáticas do `index.html` (fallback para crawlers sem JS). Com HTML pré-renderizado, o fallback perde a razão de existir.

Metadata API do Next substitui as duas, lendo o `seo` do `content.ts`. Uma fonte, um lugar.

Cobertura obrigatória, igual à de hoje: `title`, `description`, `canonical`, `robots` (`index, follow, max-image-preview:large, max-snippet:-1`), `theme-color`, Open Graph completo (incluindo `og:image` 1200×630 e o `og:image:alt`) e Twitter card.

### JSON-LD

Os 3 schemas — `Dentist`, `FAQPage`, `Person` — saem do `index.html` e passam a ser gerados em `src/data/schema.ts` a partir do `content.ts`, injetados via `<script type="application/ld+json">` no `layout.tsx`.

**Isto resolve a pendência nº 6 do README**, que hoje pede para confirmar a resposta de convênio em dois lugares: `content.ts → faq` **e** `index.html → FAQPage`. Gerando o schema do mesmo objeto `faq`, a manutenção dupla deixa de existir.

Os placeholders `[[CONFIRMAR]]` do `content.ts` continuam sendo placeholders. A migração **não** preenche CRO, CEP, coordenadas nem números — são as pendências de go-live do README e seguem abertas.

### robots.txt e sitemap.xml — decisão de não converter

`public/robots.txt` e `public/sitemap.xml` **ficam como arquivos estáticos**, e `scripts/gen-sitemap.mjs` continua sendo o gerador.

Motivo: há relato de que as convenções `app/robots.ts` e `app/sitemap.ts` não são emitidas em `output: 'export'`. Não vale apostar nisso quando os arquivos atuais já funcionam e já estão afinados — a allowlist de crawlers de IA (decisão estratégica documentada no README) e os placeholders da Fase 2 comentados. Converter seria churn com risco e sem ganho.

## 8. `.htaccess`

**Sai** o bloco de fallback de SPA:

```apache
RewriteRule . /index.html [L]
```

Em export estático, cada rota é um `.html` real. Manter o catch-all faria qualquer URL inexistente renderizar a home sob outro endereço — conteúdo duplicado aos olhos do Google, e um 404 que nunca acontece. Passa a devolver 404 de verdade.

**Ficam**, sem alteração: `ForceType text/plain` do `llms.txt` (exigência dos agentes de IA), redirect forçado para HTTPS (o canonical aponta para `https://`), compressão `mod_deflate`, e as regras de cache do `mod_expires`.

## 9. Fontes — decisão revisada

**Mantém os `@font-face` escritos à mão**, migrados sem alteração de `src/index.css` para `app/globals.css`. O preload da Poppins 700 passa a ser declarado no `layout.tsx`.

Esta decisão **substitui** a proposta inicial de usar `next/font/local`. Razão: o CSS atual não é ingênuo. Ele tem `unicode-range` explícito por face, os arquivos já estão subset para latin, e há um comentário registrando duas escolhas deliberadas — evitar o `@fontsource/poppins` (que arrastava ~460KB de subsets devanagari e latin-ext inúteis para pt-BR) e manter caminhos estáveis em `/public/fonts/` para o preload casar exatamente com o arquivo que o CSS usa.

`next/font/local` exigiria mover os arquivos para fora de `public/`, recriar o `unicode-range` pela escape hatch de `declarations`, e reescrever uma decisão documentada e funcional. O ganho — preload automático — é obtido com uma linha no `layout.tsx`. Não compensa.

Os 5 pesos autorizados pelo manual (300, 400, 500, 700, 900) seguem sendo exatamente 5.

## 10. Scripts e dependências

### `package.json`

| Script | De | Para |
|---|---|---|
| `dev` | `vite` | `next dev` |
| `build` | `tsc -b && vite build` | `next build` |
| `preview` | `vite preview` | `npx serve out` |
| `sitemap` | `node scripts/gen-sitemap.mjs` | inalterado |
| `images` | — | `node scripts/gen-images.mjs` (novo) |

`next start` **não** funciona com `output: 'export'`; por isso `preview` passa a servir o diretório `out/`.

### Dependências

- **Entram:** `next`, `motion`, `sharp` (dev)
- **Saem:** `vite`, `@vitejs/plugin-react`, `framer-motion`, `react-helmet-async`, `postcss`, `autoprefixer`
- **Sobem para React 19:** `react`, `react-dom`, `@types/react`, `@types/react-dom`
- **Permanecem:** `tailwindcss` 3.4, `lucide-react`, `typescript`

### Saída do build

`dist/` → `out/`. O README precisa ser corrigido nos passos de deploy da Hostinger, que hoje instruem a subir o conteúdo de `dist/`.

## 11. Verificação — critério de conclusão

A migração **não** está concluída quando o build passa. Está concluída quando a paridade é provada, medindo no navegador e não a olho. O README documenta uma lista de verificações já feitas neste build; todas precisam ser reproduzidas.

### Paridade obrigatória

- [ ] **10 CTAs de WhatsApp**, cada um com a mensagem pré-preenchida correta da sua origem
- [ ] **Ícone do WhatsApp nos 10 CTAs**, com `fill=currentColor` computado na cor correta do contexto (branco sobre magenta, teal sobre card branco, magenta sobre botão branco)
- [ ] **`dataLayer.push`** disparando `{event: 'click_whatsapp', origem: 'hero'}`
- [ ] **Estrelas dos depoimentos preenchidas** — `fill` computado = `rgb(156, 23, 129)`
- [ ] **Contraste WCAG AA** nos 10 pares de texto/fundo. Atenção ao mais apertado: tag teal 12px em 4.72:1, margem pequena
- [ ] **Um único `<h1>`**, hierarquia h2→h3 sem pular nível
- [ ] **FAQ** — 8 perguntas, texto presente no DOM com o accordion fechado (indexável), espelhando o schema `FAQPage`
- [ ] **CTA final com exatamente 1 botão**
- [ ] **Sem overflow horizontal**, console limpo
- [ ] **Zero** links mortos, `href="#"`, ocorrências de "Coleções Lien", cores fora da paleta, emoji no HTML
- [ ] **Padrão de ondas** a 8% de opacidade no hero e no CTA final, com a geometria do manual preservada (`P`=100, `AMP`=16, `ESP`=7, `ALT`=108, `GAP`=2)

### Verificação nova — o objetivo da migração

- [ ] **`curl` no HTML de `out/`** confirmando que o H1 e a copy do hero vêm **dentro** do HTML, sem execução de JS

Esta é a única verificação que hoje falharia e que a migração existe para fazer passar.

### Fora de escopo da verificação

Lighthouse ≥90 e tempo <3s em 4G continuam **não verificáveis** — dependem do peso das fotos reais, que ainda não existem. Seguem pendentes, como já estão no README.

## 12. Riscos

| Risco | Mitigação |
|---|---|
| `motion/react` altera comportamento do `Reveal` | Superfície de 5 arquivos; `prefers-reduced-motion` como rede; verificação visual das entradas de seção |
| Tailwind 3.4 + Next na major atual | Config não muda; se houver incompatibilidade, ela aparece no primeiro build, antes de qualquer porte de seção |
| Perder o texto do FAQ no DOM | Baixo — `<details>` nativo não depende de JS. Ainda assim é item explícito da checklist do §11 |
| Estado intermediário quebrado chegar em produção | Trabalho isolado na branch `migracao-nextjs`; `main` serve produção o tempo todo; merge só após §11 completa |
| Hook de auto-commit empurrar commits intermediários | Comportamento desejado e aceito — vão para a branch, não para `main` |

## 13. Decisões registradas

Para quem retomar isto sem o contexto da conversa:

1. **Produção segue na Hostinger estática**, não na Vercel. A Vercel entra só como preview. Isso é escolha do dono do projeto, feita com o custo do §3 explicitado.
2. **Pipeline sharp no build**, não `next/image` com `unoptimized` e não CDN externa. Escolhido porque entrega o ganho real de peso sem serviço terceiro no caminho do LCP.
3. **Fase 2 fora de escopo.** A copy das páginas internas não existe nem foi aprovada pela Dra. Natália. A estrutura fica pronta; as páginas não nascem.
4. **Abordagem A (port cirúrgico)**, não reestruturação para RSC. Com 9 fotos ainda ausentes, metade da página é placeholder e uma regressão de layout passaria despercebida num diff grande.
5. **`robots.txt` e `sitemap.xml` não são convertidos** para convenções do App Router (§7).
6. **`@font-face` manual mantido** em vez de `next/font/local` (§9).
