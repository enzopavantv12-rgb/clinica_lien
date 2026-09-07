# Migração para Next.js — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fazer o HTML da landing page sair do build já com o conteúdo dentro, migrando de React 18 + Vite (SPA) para Next.js com App Router e `output: 'export'`, sem regredir nenhuma verificação já documentada.

**Architecture:** Port cirúrgico. Os 22 componentes existentes vão praticamente como estão; muda o que a plataforma obriga — entrypoints, `'use client'` em 6 arquivos, `Helmet` → Metadata API, `<img>` → `<picture>`. O conteúdo continua vindo inteiro do `src/data/content.ts`. A verificação é dirigida por um script (`scripts/verificar-build.mjs`) escrito **antes** das tarefas de porte, que falha de propósito e vai ficando verde tarefa a tarefa.

**Tech Stack:** Next.js (App Router, `output: 'export'`), React 19, TypeScript 5.6, Tailwind CSS 3.4, `motion` (ex-framer-motion), `sharp` (build-time), lucide-react.

**Spec:** `docs/superpowers/specs/2026-09-07-migracao-nextjs-design.md`

## Global Constraints

Valem para **todas** as tarefas. Copiadas da spec.

- **Nenhuma linha de copy nova.** Nenhuma string de texto visível é escrita, reescrita ou removida. Se uma tarefa parecer exigir copy nova, ela está errada — pare e pergunte.
- **`src/data/content.ts` é a fonte única de texto.** Nenhuma string migra para JSX. O arquivo **não é editado** em nenhuma tarefa deste plano.
- **Paleta travada:** `magenta #9C1781`, `magenta-light #F0B6F2`, `teal #037E99`, `teal-light #68C0D4`, `brandgray #E1E1E1`, `ink #1A1420`, `ink-muted #5A5260`, `cream #FAF8F6`. Nenhum valor muda. `magenta-light` e `teal-light` nunca em texto.
- **Tipografia travada:** Poppins, e apenas os 5 pesos autorizados — 300, 400, 500, 700, 900.
- **Placeholders `[[CONFIRMAR]]` continuam placeholders.** Nenhuma tarefa preenche CRO, CEP, coordenadas geo ou os números de pacientes/avaliação.
- **`pendente: true` continua funcionando.** O caminho de `[FOTO PENDENTE]` do `BrandImage` é comportamento de produção hoje e deve permanecer idêntico.
- **Fase 1 apenas.** Nenhuma rota nova. Nenhuma página interna. Nada de `react-router-dom`.
- **Sem `next/image`.** Não há runtime Node em produção; a otimização é no build (Task 7).
- **Versão do Next:** instalar `next@latest`. Restrições: peer de React 19, suporte a `output: 'export'`, suporte a Metadata API. **Registre a versão resolvida** no commit da Task 1.
- **Branch:** todo o trabalho em `migracao-nextjs`. Nada vai para `main` até a Task 9 fechar.
- **Sem emoji no HTML.** O projeto não usa e a verificação checa.
- **Não converter `robots.txt` nem `sitemap.xml`.** Eles permanecem arquivos estáticos em `public/`, e `scripts/gen-sitemap.mjs` permanece o gerador. **Não crie `app/robots.ts` nem `app/sitemap.ts`** — há relato de que essas convenções não são emitidas em `output: 'export'`, e os arquivos atuais já funcionam e já estão afinados (allowlist de crawlers de IA, placeholders da Fase 2 comentados). Decisão registrada na §7 da spec.

### Valores literais confirmados no código

Usados pelas assertions. Conferidos em `src/data/content.ts` e `index.html` antes deste plano.

| O quê | Valor |
|---|---|
| H1 do hero | `Devolvemos sua mastigação, seu sorriso e sua confiança.` (com ponto final) |
| Título | `Lien Reabilitação Oral \| Implantes e Reabilitação em Belo Horizonte` |
| Canonical | `https://lienreabilitacaooral.com.br/` |
| theme-color | `#9C1781` |
| CTAs de WhatsApp | **10** (chaves de `whatsappMensagens`) |
| Perguntas no FAQ | **8** |
| Blocos `ld+json` | **3** |
| `@type` do bloco 1 | `["Dentist", "LocalBusiness", "MedicalBusiness"]` — **array**, não string |

---

## File Structure

| Arquivo | Responsabilidade | Task |
|---|---|---|
| `next.config.ts` | Config de export estático e forma de URL | 1 |
| `app/globals.css` | CSS global (recebe `src/index.css` sem alteração) | 1 |
| `app/layout.tsx` | Shell HTML, preload de fonte, metadata, JSON-LD | 1, 5, 6 |
| `app/page.tsx` | Composição das 10 seções + Header/Footer/FloatingWhatsApp | 4 |
| `scripts/verificar-build.mjs` | Assertions automatizadas sobre `out/index.html` | 2 |
| `scripts/gen-images.mjs` | Pipeline sharp: AVIF + WebP em múltiplas larguras | 7 |
| `src/data/schema.ts` | Os 3 JSON-LD derivados do `content.ts` | 6 |
| `src/components/ui/BrandImage.tsx` | `<picture>` com `srcset`/`sizes`; placeholder intacto | 7 |

---

## Task 1: Scaffold do Next.js que builda e exporta

**Objetivo:** sair de zero para um `out/index.html` gerado pelo Next, com o CSS global e a fonte funcionando. Nenhuma seção ainda.

**Files:**
- Create: `next.config.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- Modify: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `.gitignore`
- Delete: `src/main.tsx`, `src/App.tsx`, `vite.config.ts` — orfaos apos o Step 1, e o novo `include` do tsconfig os type-checa importando deps ja desinstaladas. **`index.html` NAO** — a Task 6 o usa como fonte dos schemas, e sendo HTML nao participa do type-check.

**Interfaces:**
- Consumes: nada
- Produces: `out/index.html` gerado pelo Next; alias de import `@/*` → `./src/*`, usado por todas as tasks seguintes

- [ ] **Step 1: Trocar as dependências**

```bash
npm uninstall vite @vitejs/plugin-react framer-motion react-helmet-async
npm install next@latest react@19 react-dom@19 motion@latest
npm install -D @types/react@19 @types/react-dom@19 sharp
```

**Não desinstale `postcss` nem `autoprefixer`, e não apague `postcss.config.js`.** O Next empacota PostCSS, mas **não** registra o Tailwind como plugin — quem faz isso é o `postcss.config.js` do projeto. Sem ele, `@tailwind base/components/utilities` não compila e o site sai sem estilo nenhum, e o verificador automatizado não pega (ele checa conteúdo do HTML, não CSS).

- [ ] **Step 2: Registrar a versão resolvida**

Run: `node -e "console.log(require('./package.json').dependencies.next)"`

Anote a saída. Ela vai na mensagem de commit do Step 11.

- [ ] **Step 3: Criar `next.config.ts`**

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Producao e servida como estatico na Hostinger: sem runtime Node.
  output: 'export',
  // Fixa a forma das URLs antes de existirem paginas internas (Fase 2).
  trailingSlash: true,
};

export default nextConfig;
```

- [ ] **Step 4: Mover o CSS global**

```bash
git mv src/index.css app/globals.css
```

Não altere **nada** dentro do arquivo. Os `@font-face` com `unicode-range`, as diretivas `@tailwind` e o `@layer base` ficam exatamente como estão — decisão registrada na §9 da spec.

- [ ] **Step 5: Criar `app/layout.tsx`**

O `body` já recebe `@apply bg-white font-sans text-body text-ink antialiased` pelo `@layer base` do `globals.css`, então não passe classes aqui.

```tsx
import type { ReactNode } from 'react';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Preload da Poppins 700 (usada no H1 do hero). Caminho estavel em
            /public/fonts/ para casar exatamente com o @font-face do CSS. */}
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/poppins-latin-700-normal.woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 6: Criar `app/page.tsx` provisório**

Um H1 provisório só para o build ter o que exportar. A Task 4 substitui isto inteiro.

```tsx
export default function Home() {
  return <h1>scaffold</h1>;
}
```

- [ ] **Step 7: Corrigir o `content` do Tailwind**

Em `tailwind.config.ts`, linha 10. **Só esta linha muda** — nenhum token de cor, fonte ou escala é tocado.

```ts
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
```

Sem isso o Tailwind purga todas as classes usadas em `app/`.

- [ ] **Step 8: Substituir o `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

`jsx: preserve` e o plugin `next` são obrigatórios. O alias `@/*` existe para o `app/page.tsx` importar as seções sem `../src/...`; os imports relativos **dentro** de `src/` continuam funcionando e não precisam ser tocados.

- [ ] **Step 9: Atualizar os scripts do `package.json`**

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "preview": "npx serve out",
    "verificar": "node scripts/verificar-build.mjs",
    "sitemap": "node scripts/gen-sitemap.mjs",
    "images": "node scripts/gen-images.mjs"
  }
```

`next start` não funciona com `output: 'export'` — por isso `preview` serve o diretório `out/`.

- [ ] **Step 10: Ignorar as saídas de build**

Adicione ao `.gitignore`, na seção "Dependências e build":

```
out/
.next/
```

(Se `out/` e `.next/` ja estiverem la, nao ha nada a fazer neste step.)

- [ ] **Step 11: Buildar e conferir que o export saiu**

Run: `npm run build`
Expected: build passa e cria `out/index.html`

Run: `node -e "const h=require('fs').readFileSync('out/index.html','utf8'); if(!h.includes('lang=\"pt-BR\"')) throw new Error('lang ausente'); if(!h.includes('poppins-latin-700')) throw new Error('preload da fonte ausente'); console.log('OK')"`
Expected: `OK`

- [ ] **Step 12: Commit**

Troque `<versao>` pela versão anotada no Step 2.

```bash
git add -A
git commit -m "build: scaffold Next.js <versao> com output export

- App Router, output: 'export', trailingSlash: true
- index.css movido para app/globals.css sem alteracao
- content do Tailwind passa a cobrir app/
- react 18 -> 19, framer-motion -> motion, vite removido"
```

---

## Task 2: Verificador de build

**Objetivo:** escrever o harness de teste **antes** do porte. Ele falha de propósito agora e vai ficando verde nas Tasks 4, 5, 6 e 7.

**Files:**
- Create: `scripts/verificar-build.mjs`

**Interfaces:**
- Consumes: `out/index.html` produzido pela Task 1
- Produces: `npm run verificar` — exit 0 se tudo passa, exit 1 listando as falhas. Usado como gate nas Tasks 4–8.

- [ ] **Step 1: Escrever o verificador**

Assertions sobre valores literais, sem importar `content.ts` — assim o script também pega alteração acidental de copy.

```js
/**
 * Verificacao automatizada do build estatico.
 * Cobre a parte automatizavel da secao 11 da spec de migracao.
 * Uso: npm run build && npm run verificar
 */
import { readFileSync, existsSync } from 'node:fs';

const CAMINHO = 'out/index.html';

if (!existsSync(CAMINHO)) {
  console.error(`FALHA: ${CAMINHO} nao existe. Rode "npm run build" primeiro.`);
  process.exit(1);
}

const html = readFileSync(CAMINHO, 'utf8');
const falhas = [];
const passou = [];

const checar = (nome, condicao, detalhe = '') => {
  if (condicao) passou.push(nome);
  else falhas.push(detalhe ? `${nome} — ${detalhe}` : nome);
};

const contar = (regex) => (html.match(regex) ?? []).length;

// --- O objetivo da migracao: conteudo dentro do HTML, sem executar JS ---
const H1 = 'Devolvemos sua mastigação, seu sorriso e sua confiança.';
checar('H1 do hero presente no HTML', html.includes(H1));
checar('exatamente um <h1>', contar(/<h1[\s>]/g) === 1, `achou ${contar(/<h1[\s>]/g)}`);
checar(
  'subtitulo do hero presente no HTML',
  html.includes('planejamento individualizado'),
);

// --- CTAs de WhatsApp ---
const ctas = contar(/https:\/\/wa\.me\//g);
checar('10 CTAs de WhatsApp', ctas === 10, `achou ${ctas}`);

// --- FAQ indexavel com accordion fechado ---
const detalhes = contar(/<details[\s>]/g);
checar('8 <details> no FAQ', detalhes === 8, `achou ${detalhes}`);
checar('nenhum <details> aberto por padrao', !/<details[^>]*\sopen[\s>]/.test(html));

// --- Metadata (Task 5) ---
checar(
  'title correto',
  html.includes('Lien Reabilitação Oral | Implantes e Reabilitação em Belo Horizonte'),
);
// Por atributo: a URL crua tambem aparece em og:url e no JSON-LD.
checar('canonical', /rel="canonical"/.test(html));
checar('robots com max-image-preview', html.includes('max-image-preview:large'));
// Por atributo: o hex tambem pode aparecer em CSS inlinado pelo Next.
checar('theme-color da marca', /name="theme-color"/.test(html));
checar('og:image', html.includes('og-image.jpg'));
checar('twitter:card', html.includes('summary_large_image'));

// --- JSON-LD (Task 6) ---
const blocos = [...html.matchAll(
  /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
)].map((m) => m[1]);
checar('3 blocos ld+json', blocos.length === 3, `achou ${blocos.length}`);

let schemas = [];
try {
  schemas = blocos.map((b) => JSON.parse(b));
  passou.push('todos os ld+json fazem parse');
} catch (erro) {
  falhas.push(`ld+json invalido — ${erro.message}`);
}

const tipos = schemas.flatMap((s) => [s['@type']].flat());
checar('schema Dentist', tipos.includes('Dentist'));
checar('schema LocalBusiness', tipos.includes('LocalBusiness'));
checar('schema FAQPage', tipos.includes('FAQPage'));
checar('schema Person', tipos.includes('Person'));

const faqSchema = schemas.find((s) => [s['@type']].flat().includes('FAQPage'));
checar(
  'FAQPage com 8 perguntas',
  faqSchema?.mainEntity?.length === 8,
  `achou ${faqSchema?.mainEntity?.length}`,
);

// --- Regras editoriais permanentes ---
checar('zero ocorrencias de "Coleções Lien"', !html.includes('Coleções Lien'));
checar('zero href="#"', !html.includes('href="#"'));
// Somente pictogramas. O bloco de dingbats (U+2600-27BF) NAO entra: contem
// U+2605 (estrela), usado legitimamente em `numeros` como ",0 *".
checar('zero emoji no HTML', !/[\u{1F300}-\u{1FAFF}]/u.test(html));

// --- Relatorio ---
console.log(`\n${passou.length} passou, ${falhas.length} falhou\n`);
for (const p of passou) console.log(`  ok   ${p}`);
if (falhas.length) {
  console.log('');
  for (const f of falhas) console.log(`  FALHA  ${f}`);
  console.log('');
  process.exit(1);
}
console.log('\nTudo verde.\n');
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `npm run verificar`
Expected: exit 1. As falhas devem incluir `H1 do hero presente no HTML`, `10 CTAs de WhatsApp`, `8 <details> no FAQ`, `3 blocos ld+json` — nada disso existe ainda. O `app/page.tsx` de scaffold só tem `<h1>scaffold</h1>`, então `exatamente um <h1>` deve **passar**.

Se alguma assertion de conteúdo passar agora, o verificador está errado — investigue antes de seguir.

- [ ] **Step 3: Commit**

```bash
git add scripts/verificar-build.mjs
git commit -m "test: verificador do build estatico

Assertions sobre out/index.html cobrindo a parte automatizavel da seccao
11 da spec. Falha de proposito neste commit: as tasks de porte vao
deixando verde."
```

---

## Task 3: Porte de animação — `motion/react` e `'use client'`

**Objetivo:** trocar `framer-motion` por `motion` e marcar os 6 arquivos que precisam de runtime no cliente. Nenhuma mudança de comportamento pretendida.

**Files:**
- Modify: `src/components/ui/Reveal.tsx`, `src/components/ui/WhatsAppButton.tsx`, `src/components/ui/FloatingWhatsApp.tsx`, `src/components/sections/Header.tsx`, `src/components/sections/Numeros.tsx`, `src/components/sections/Especialidades.tsx`

**Interfaces:**
- Consumes: alias `@/*` da Task 1
- Produces: `Reveal` com a mesma assinatura de hoje — `{ children, delay?, className?, as? }`, `as` em `'div' | 'li' | 'article' | 'section'`. A Task 4 depende dela inalterada.

- [ ] **Step 1: Trocar o import em todos os arquivos que usam motion**

Em cada arquivo que importa de `'framer-motion'`, troque para `'motion/react'`. Os nomes exportados (`motion`, `useReducedMotion`, `AnimatePresence`) são os mesmos.

```bash
grep -rl "from 'framer-motion'" src/
```

Para cada arquivo listado, a única mudança é a string do módulo:

```tsx
import { motion, useReducedMotion } from 'motion/react';
```

- [ ] **Step 2: Adicionar `'use client'` nos 6 arquivos**

Primeira linha do arquivo, antes de qualquer import:

```tsx
'use client';
```

Exatamente estes 6, e nenhum outro:

1. `src/components/sections/Header.tsx`
2. `src/components/sections/Numeros.tsx`
3. `src/components/sections/Especialidades.tsx`
4. `src/components/ui/FloatingWhatsApp.tsx`
5. `src/components/ui/Reveal.tsx`
6. `src/components/ui/WhatsAppButton.tsx`

**Não** adicione em `Hero`, `MetodoLien`, `Experiencia`, `Equipe`, `Ambientes`, `Depoimentos`, `Faq`, `CtaFinal`, `Footer`, `BrandImage`, `BrandGraphics`, `Logo`, `Icon`, `SectionHeading`, `WhatsAppIcon`. Eles são Server Components — é o que faz o conteúdo sair no HTML.

- [ ] **Step 3: Confirmar que não sobrou referência a framer-motion**

Run: `grep -rn "framer-motion" src/ app/ package.json`
Expected: nenhuma saída

- [ ] **Step 4: Buildar**

Run: `npm run build`
Expected: build passa. `app/page.tsx` ainda é o scaffold, então nenhuma dessas seções entra no bundle ainda — este step só prova que os arquivos compilam.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: framer-motion -> motion/react e fronteira de client

'use client' nos 6 arquivos que usam estado, efeito ou animacao.
As 9 secoes restantes permanecem Server Components."
```

---

## Task 4: Compor a página com as seções reais

**Objetivo:** o conteúdo passa a sair dentro do HTML. É a tarefa que justifica a migração.

**Files:**
- Modify: `app/page.tsx` (substitui o scaffold inteiro)

**Interfaces:**
- Consumes: as 12 exportações nomeadas de `src/components/sections/` e `FloatingWhatsApp` de `src/components/ui/`, todas inalteradas; `Reveal` da Task 3
- Produces: `out/index.html` com a página completa

- [ ] **Step 1: Rodar o verificador e anotar o que falha**

Run: `npm run build && npm run verificar`
Expected: exit 1, com falhas de H1, CTAs, `<details>` e ld+json. Anote a contagem — ela deve cair neste task.

- [ ] **Step 2: Substituir `app/page.tsx`**

Este é o corpo do atual `src/App.tsx` sem o `<Helmet>` (que vira Metadata na Task 5). A ordem das seções é a do README e **não muda**.

```tsx
import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { Numeros } from '@/components/sections/Numeros';
import { MetodoLien } from '@/components/sections/MetodoLien';
import { Especialidades } from '@/components/sections/Especialidades';
import { Experiencia } from '@/components/sections/Experiencia';
import { Equipe } from '@/components/sections/Equipe';
import { Ambientes } from '@/components/sections/Ambientes';
import { Depoimentos } from '@/components/sections/Depoimentos';
import { Faq } from '@/components/sections/Faq';
import { CtaFinal } from '@/components/sections/CtaFinal';
import { Footer } from '@/components/sections/Footer';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Numeros />
        <MetodoLien />
        <Especialidades />
        <Experiencia />
        <Equipe />
        <Ambientes />
        <Depoimentos />
        <Faq />
        <CtaFinal />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
```

- [ ] **Step 3: Buildar**

Run: `npm run build`
Expected: passa.

Se falhar com erro de hook ou de contexto em algum componente, significa que um arquivo que eu classifiquei como Server Component usa API de cliente. **Não** adicione `'use client'` por reflexo em toda a árvore — identifique o arquivo exato, adicione só nele, e registre o desvio no commit.

- [ ] **Step 4: Confirmar o ganho — conteúdo dentro do HTML**

Run: `npm run verificar`
Expected: `H1 do hero presente no HTML`, `exatamente um <h1>`, `subtitulo do hero presente no HTML`, `10 CTAs de WhatsApp`, `8 <details> no FAQ`, `nenhum <details> aberto por padrao` e as regras editoriais agora **passam**. As assertions de metadata e ld+json continuam falhando — são as Tasks 5 e 6.

- [ ] **Step 5: Ver com os próprios olhos**

Run: `node -e "const h=require('fs').readFileSync('out/index.html','utf8'); const i=h.indexOf('Devolvemos sua'); console.log(h.slice(i-200, i+200))"`

Confirme que o H1 aparece como texto no HTML, não dentro de um blob de JS. Isto é a prova do objetivo da migração.

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx
git commit -m "feat: compor a pagina com as secoes reais

O conteudo passa a sair dentro do HTML do build, sem execucao de JS.
Ordem das 10 secoes preservada. Verificador: H1, 10 CTAs e 8 details
do FAQ agora passam."
```

---

## Task 5: Metadata API

**Objetivo:** uma fonte só para as metas. Hoje a mesma informação está no `Helmet` do `App.tsx` **e** duplicada nas metas estáticas do `index.html`.

**Files:**
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `seo` e `site` de `@/data/content`
- Produces: `export const metadata` no layout

- [ ] **Step 1: Ler os valores de origem**

Run: `sed -n '11,40p' src/data/content.ts`

Confirme os campos de `site` e `seo`. **Não invente valores** — tudo vem daí.

- [ ] **Step 2: Adicionar o `metadata` ao `app/layout.tsx`**

Insira acima do `RootLayout`, mantendo o `<head>` com o preload da fonte.

```tsx
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { seo, site } from '@/data/content';
import './globals.css';

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: { canonical: seo.canonical },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: site.nome,
    title: seo.title,
    description: seo.description,
    url: seo.canonical,
    images: [
      {
        url: seo.ogImage,
        width: 1200,
        height: 630,
        alt: 'Lien Reabilitação Oral — implantes e reabilitação oral em Belo Horizonte',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage],
  },
};

export const viewport = {
  themeColor: seo.themeColor,
};
```

O `alt` da `og:image` é o texto que já existe no `Helmet` do `App.tsx` — copiado, não escrito.

`themeColor` vai em `viewport`, não em `metadata`; o Next avisa se estiver no lugar errado.

- [ ] **Step 3: Buildar e verificar**

Run: `npm run build && npm run verificar`
Expected: `title correto`, `canonical`, `robots com max-image-preview`, `theme-color da marca`, `og:image` e `twitter:card` agora passam. Só as assertions de ld+json seguem falhando.

- [ ] **Step 4: Conferir que não há meta duplicada**

Run: `node -e "const h=require('fs').readFileSync('out/index.html','utf8'); const n=(h.match(/name=\"description\"/g)||[]).length; console.log('description:', n); if(n!==1) throw new Error('description duplicada')"`
Expected: `description: 1`

Esta é a duplicação que existia entre `Helmet` e `index.html`. Ela não pode reaparecer.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: Metadata API substitui Helmet e as metas do index.html

Fonte unica: o objeto seo do content.ts. Elimina a duplicacao que
existia entre o Helmet do App.tsx e o fallback estatico do index.html."
```

---

## Task 6: JSON-LD gerado do `content.ts`

**Objetivo:** tirar os 3 schemas do `index.html` e passar a derivá-los do `content.ts`, matando a manutenção dupla do FAQ (pendência 6 do README).

**Files:**
- Create: `src/data/schema.ts`
- Modify: `app/layout.tsx`
- Reference: `index.html` linhas 45–160 (a fonte a portar; o arquivo só é apagado na Task 8)

**Interfaces:**
- Consumes: `site`, `seo`, `faq`, `equipe` de `@/data/content`
- Produces: `schemaDentist`, `schemaFaq`, `schemaPerson` — três objetos serializáveis exportados de `@/data/schema`

- [ ] **Step 1: Ler os schemas existentes na íntegra**

Run: `sed -n '45,160p' index.html`

**Porte a estrutura fielmente.** Não redesenhe o schema, não acrescente nem remova propriedades. Preste atenção especial:

- O `@type` do primeiro bloco é o **array** `["Dentist", "LocalBusiness", "MedicalBusiness"]`, não uma string.
- Ele contém `PostalAddress`, `GeoCoordinates`, `OpeningHoursSpecification`, `areaServed` (`City`), uma lista de `MedicalProcedure` e um `Person` aninhado.
- Os valores de CEP e coordenadas são placeholders hoje. **Continuam placeholders** — pendência 3 do README.

- [ ] **Step 2: Criar `src/data/schema.ts`**

Estrutura a seguir. Os `...` marcam onde entram as propriedades portadas do Step 1 — preencha com o conteúdo real do `index.html`, não deixe literalmente `...`.

```ts
import { equipe, faq, seo, site } from './content';

/**
 * JSON-LD derivado do content.ts.
 *
 * Motivo de existir: antes, o FAQ vivia em dois lugares — content.ts e o
 * schema FAQPage escrito a mao no index.html — e qualquer edicao tinha que
 * ser feita nos dois. Agora o FAQPage e um map sobre o mesmo objeto `faq`.
 */

export const schemaDentist = {
  '@context': 'https://schema.org',
  '@type': ['Dentist', 'LocalBusiness', 'MedicalBusiness'],
  name: site.nome,
  url: seo.canonical,
  // ... demais propriedades portadas do index.html, incluindo address,
  // geo, openingHoursSpecification, areaServed, availableService e founder
};

export const schemaFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.itens.map((item) => ({
    '@type': 'Question',
    name: item.pergunta,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.resposta,
    },
  })),
};

export const schemaPerson = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  // ... propriedades portadas do index.html
};
```

**Confirme os nomes dos campos** antes de escrever o `map`: rode `sed -n '311,357p' src/data/content.ts` e veja se as chaves são `itens`/`pergunta`/`resposta` ou outras. Use os nomes reais.

- [ ] **Step 3: Remover o `<head>` explicito do `app/layout.tsx`**

O HTML sai com dois preloads identicos da mesma fonte. **Atencao: remover o
`<head>` NAO resolve isso** — foi verificado empiricamente. O React 19 emite
um `<link rel="preload">` presente na arvore duas vezes (registra o recurso E
hastea o elemento renderizado), dentro de `<head>` ou de `<body>` igualmente.

A correcao e usar `preload()` do `react-dom`, a API oficial do React 19 para
resource hint: o caminho imperativo registra a dica sem renderizar um
elemento, entao nao ha o que duplicar. Remover o `<head>` continua sendo boa
higiene (a Metadata API constroi o head), mas nao e o que corrige a contagem.

Tire o `<head>` (boa higiene: a Metadata API constroi o head) e substitua o
elemento `<link>` pela chamada imperativa. O `preload()` roda no corpo do
componente, nao no JSX:

```tsx
    <html lang="pt-BR">
      <body>
        {/* Preload da Poppins 700 (usada no H1 do hero). Caminho estavel em
            /public/fonts/ para casar exatamente com o @font-face do CSS.
            Sem <head> explicito: o React 19 hastea daqui, uma vez so. */}
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/poppins-latin-700-normal.woff2"
          crossOrigin="anonymous"
        />
        {children}
      </body>
    </html>
```

- [ ] **Step 4: Injetar o JSON-LD no `app/layout.tsx`**

Dentro do `<body>`, depois do `<link>` de preload. JSON-LD no body e o padrao
recomendado pelo Next, e o Google le o schema em qualquer lugar do documento:

```tsx
        {[schemaDentist, schemaFaq, schemaPerson].map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
```

Adicione o import: `import { schemaDentist, schemaFaq, schemaPerson } from '@/data/schema';`

`dangerouslySetInnerHTML` é o caminho correto aqui — é como se injeta JSON-LD em React, e o conteúdo vem de dado nosso, não de entrada de usuário.

- [ ] **Step 5: Buildar e verificar**

Run: `npm run build && npm run verificar`
Expected: **tudo verde**, exit 0. `3 blocos ld+json`, `todos os ld+json fazem parse`, `schema Dentist`, `schema LocalBusiness`, `schema FAQPage`, `schema Person` e `FAQPage com 8 perguntas` passam.

- [ ] **Step 6: Confirmar que o preload duplicado morreu**

Run: `node -e "const h=require('fs').readFileSync('out/index.html','utf8'); const n=(h.match(/rel=\"preload\"[^>]*poppins-latin-700/g)||[]).length; console.log('preloads da fonte:', n); if(n!==1) throw new Error('esperado 1, achou '+n)"`
Expected: `preloads da fonte: 1`

Antes desta task eram 2. Se der 0, o React nao hasteou o `<link>` de dentro do
`<body>` — reporte, nao devolva o `<head>`.

- [ ] **Step 7: Validar o JSON-LD de fora**

Run: `node -e "const h=require('fs').readFileSync('out/index.html','utf8'); const b=[...h.matchAll(/<script[^>]*type=\"application\/ld\+json\"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1])); console.log(JSON.stringify(b,null,2))"`

A regex tem de ancorar na tag `<script>` completa com o `type`. Uma regex
solta em `ld+json` tambem casa ocorrencias dentro do payload de hidratacao
RSC e lanca no `JSON.parse`. Vale a regra geral: assertion sobre **conteudo**
precisa descontar o payload; assertion sobre tag ou atributo de markup, nao.

Leia a saída. Compare com `sed -n '45,160p' index.html`. Qualquer propriedade que existia e sumiu é regressão de SEO.

- [ ] **Step 8: Commit**

```bash
git add src/data/schema.ts app/layout.tsx
git commit -m "feat: JSON-LD derivado do content.ts

Os 3 schemas (Dentist/LocalBusiness/MedicalBusiness, FAQPage, Person)
saem do index.html. O FAQPage passa a ser um map sobre o objeto faq,
eliminando a manutencao dupla registrada como pendencia 6 do README.

Verificador: tudo verde."
```

---

## Task 7: Pipeline de imagens e `<picture>`

**Objetivo:** substituir a otimização em runtime que o export estático não tem. As 9 fotos ainda não existem, então o teste usa fixture.

**Files:**
- Create: `scripts/gen-images.mjs`
- Modify: `src/components/ui/BrandImage.tsx`

**Interfaces:**
- Consumes: originais em `assets/fotos-originais/`
- Produces: `public/img/<nome>-<largura>.avif` e `.webp`; `BrandImage` com a mesma prop pública de hoje

- [ ] **Step 0: Criar `src/data/imagens.json` — fonte unica das larguras**

O script de build e o `BrandImage` precisam do mesmo mapa. Duplicar convida
divergencia silenciosa: o `srcset` passa a apontar para arquivo que o script
nunca gerou. Um JSON serve aos dois — `resolveJsonModule` ja esta no tsconfig
(Task 1) e o Node importa com `with { type: 'json' }`.

```json
{
  "hero-dra-natalia": [640, 960, 1280],
  "experiencia-recepcao": [320, 480, 640],
  "equipe-natalia-simoes": [320, 480, 640],
  "equipe-maria-emilia": [320, 480, 640],
  "equipe-isabela-guieiro": [320, 480, 640],
  "equipe-alexander-pedrosa": [320, 480, 640],
  "ambiente-recepcao": [480, 768, 1024],
  "ambiente-atendimento": [480, 768, 1024],
  "ambiente-kit-boas-vindas": [480, 768, 1024]
}
```

Se o import de JSON com `with { type: 'json' }` falhar no Node desta maquina,
**pare e reporte** — nao volte a duplicar o mapa sem avisar.

- [ ] **Step 1: Criar `scripts/gen-images.mjs`**

```js
/**
 * Otimizacao de imagem no build.
 *
 * Motivo de existir: producao e estatica (Hostinger), sem runtime Node, logo
 * sem o otimizador do next/image. As variantes sao geradas aqui.
 *
 * Entrada:  assets/fotos-originais/<nome>.{jpg,png,webp}  (fora do deploy)
 * Saida:    public/img/<nome>-<largura>.{avif,webp}
 * Uso:      npm run images
 */
import { readdirSync, mkdirSync, existsSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import sharp from 'sharp';
// Larguras por slot: fonte unica, compartilhada com o BrandImage.
// Se os dois divergirem, o srcset aponta para arquivo que nao existe.
import LARGURAS from '../src/data/imagens.json' with { type: 'json' };

const ENTRADA = 'assets/fotos-originais';
const SAIDA = 'public/img';


if (!existsSync(ENTRADA)) {
  console.log(`${ENTRADA} nao existe — nada a gerar. As fotos reais ainda nao chegaram.`);
  process.exit(0);
}

mkdirSync(SAIDA, { recursive: true });

const arquivos = readdirSync(ENTRADA).filter((f) =>
  ['.jpg', '.jpeg', '.png', '.webp'].includes(extname(f).toLowerCase()),
);

if (arquivos.length === 0) {
  console.log(`${ENTRADA} esta vazio — nada a gerar.`);
  process.exit(0);
}

let geradas = 0;

for (const arquivo of arquivos) {
  const nome = basename(arquivo, extname(arquivo));
  const larguras = LARGURAS[nome];

  if (!larguras) {
    console.warn(`  aviso: "${nome}" nao esta no mapa LARGURAS — ignorado.`);
    continue;
  }

  for (const largura of larguras) {
    const origem = join(ENTRADA, arquivo);
    const base = sharp(origem).resize({ width: largura, withoutEnlargement: true });

    await base.clone().avif({ quality: 55 }).toFile(join(SAIDA, `${nome}-${largura}.avif`));
    await base.clone().webp({ quality: 78 }).toFile(join(SAIDA, `${nome}-${largura}.webp`));
    geradas += 2;
  }
  console.log(`  ok  ${nome} — ${larguras.join(', ')}`);
}

console.log(`\n${geradas} arquivo(s) gerado(s) em ${SAIDA}\n`);
```

- [ ] **Step 2: Rodar sem originais**

Run: `npm run images`
Expected: `assets/fotos-originais nao existe — nada a gerar.` e exit 0.

Isto importa: o build não pode quebrar por causa de fotos que ainda não chegaram.

- [ ] **Step 3: Testar com fixture**

```bash
mkdir -p assets/fotos-originais
node -e "const sharp=require('sharp'); sharp({create:{width:2000,height:1400,channels:3,background:'#FAF8F6'}}).jpeg().toFile('assets/fotos-originais/ambiente-recepcao.jpg')"
npm run images
```

Expected: `ok  ambiente-recepcao — 480, 768, 1024` e 6 arquivos em `public/img/`.

Run: `ls public/img/`
Expected: `ambiente-recepcao-480.avif`, `-480.webp`, `-768.avif`, `-768.webp`, `-1024.avif`, `-1024.webp`

- [ ] **Step 4: Limpar a fixture**

```bash
rm -rf assets/fotos-originais public/img
```

A fixture não vai para o repositório. `public/img/` volta a não existir, que é o estado real do projeto.

- [ ] **Step 5: Ler o `BrandImage` atual**

Run: `cat src/components/ui/BrandImage.tsx`

Note e **preserve**: o caminho de placeholder com `ImageOff` e `[Foto pendente]`, e no `<img>` os atributos `width`, `height`, `loading`, `fetchPriority`, `decoding` e as classes.

- [ ] **Step 6: Trocar o `<img>` por `<picture>`**

Só o bloco de retorno da imagem muda. O bloco de placeholder fica **idêntico**.

```tsx
  // Nome base sem extensao: /img/hero-dra-natalia.webp -> hero-dra-natalia
  const nomeBase = dados.src.replace(/^\/img\//, '').replace(/\.[^.]+$/, '');
  const larguras = LARGURAS_POR_SLOT[nomeBase] ?? [];
  const srcset = (ext: string) =>
    larguras.map((l) => `/img/${nomeBase}-${l}.${ext} ${l}w`).join(', ');
  const intermediaria = larguras[Math.floor(larguras.length / 2)];

  return (
    <picture>
      <source type="image/avif" srcSet={srcset('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
      <img
        src={`/img/${nomeBase}-${intermediaria}.webp`}
        alt={dados.alt}
        width={width}
        height={height}
        loading={prioridade ? 'eager' : 'lazy'}
        {...(prioridade ? { fetchPriority: 'high' as const } : {})}
        decoding={prioridade ? 'sync' : 'async'}
        className={`${proporcao} w-full rounded-3xl object-cover ${className}`}
      />
    </picture>
  );
```

Adicione no topo do arquivo. **Fonte unica** — o mesmo JSON que o `gen-images.mjs` le,
para que script e componente nao possam divergir:

```tsx
import larguras from '@/data/imagens.json';

const LARGURAS_POR_SLOT = larguras as Record<string, number[]>;
```

E aceite uma prop `sizes` opcional com default por slot:

```tsx
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
```

- [ ] **Step 7: Buildar e verificar que nada regrediu**

Run: `npm run build && npm run verificar`
Expected: exit 0, tudo verde. Todas as 9 imagens têm `pendente: true`, então a página deve renderizar 9 placeholders — o mesmo que hoje.

Run: `node -e "const h=require('fs').readFileSync('out/index.html','utf8'); const m=h.replace(/<script[\s\S]*?<\/script>/g,''); const n=(m.match(/Foto pendente/gi)||[]).length; console.log('placeholders visiveis:', n); if(n!==9) throw new Error('esperado 9, achou '+n)"`
Expected: `placeholders visiveis: 9`

O `replace` que remove `<script>` e **obrigatorio**. Sem ele a contagem da 18:
as secoes com placeholder sao children de `Reveal`, que e Client Component,
entao o conteudo serializado aparece tambem no payload de hidratacao RSC.
Contar o HTML cru faria a assertion falhar sem haver defeito nenhum.

- [ ] **Step 8: Commit**

```bash
git add scripts/gen-images.mjs src/components/ui/BrandImage.tsx package.json
git commit -m "feat: pipeline de imagem no build e <picture> com srcset

Substitui a otimizacao em runtime que o export estatico nao tem: sharp
gera AVIF + WebP em 2-3 larguras por slot. BrandImage emite <picture>
preservando width/height, fetchPriority, loading e decoding.

O caminho de [FOTO PENDENTE] permanece identico — as 9 fotos reais
ainda nao existem."
```

---

## Task 8: Remover o Vite, ajustar `.htaccess` e README

**Objetivo:** apagar o que ficou órfão e corrigir a documentação de deploy.

**Files:**
- Delete: `index.html`, `tsconfig.tsbuildinfo` (os arquivos do Vite ja morreram na Task 1)
- **Nao apagar:** `postcss.config.js` — e ele que registra o Tailwind como plugin do PostCSS (ver Task 1 Step 1)
- Modify: `public/.htaccess`, `README.md`

**Interfaces:**
- Consumes: tudo das Tasks 1–7
- Produces: repositório sem resíduo de Vite

- [ ] **Step 1: Confirmar que nada importa os arquivos a apagar**

Run: `grep -rn "main.tsx\|App.tsx\|vite" src/ app/ package.json --include="*.ts" --include="*.tsx" --include="*.json"`
Expected: nenhuma saída. Se houver, resolva antes de apagar.

- [ ] **Step 2: Apagar**

```bash
git rm index.html
git rm --cached tsconfig.tsbuildinfo 2>/dev/null || true
rm -f tsconfig.tsbuildinfo
```

Acrescente tambem `tsconfig.tsbuildinfo` ao `.gitignore`, junto de `out/` e
`.next/`. Sem isso ele volta a ser versionado no proximo build e passa a
sujar todo diff — um revisor chegou a evitar rodar o build por causa disso.

O `index.html` só pode sair **agora** — a Task 6 o usa como fonte dos schemas.

- [ ] **Step 3: Remover o fallback de SPA do `.htaccess`**

Apague o bloco inteiro sob o comentário `# --- SPA: tudo que não é arquivo real cai no index.html ---`, incluindo o `<IfModule mod_rewrite.c>` que o envolve.

Em export estático cada rota é um `.html` real; o catch-all faria qualquer URL errada renderizar a home sob outro endereço, o que o Google lê como conteúdo duplicado.

**Mantenha intactos** os outros quatro blocos: `ForceType text/plain` do `llms.txt`, o redirect de HTTPS, `mod_deflate` e `mod_expires`.

- [ ] **Step 4: Conferir o `.htaccess`**

Run: `grep -c "index.html" public/.htaccess`
Expected: `0`

Run: `grep -c "llms\|HTTPS\|DEFLATE\|Expires" public/.htaccess`
Expected: número maior que 0 — os outros blocos continuam lá.

- [ ] **Step 5: Atualizar o README**

Três lugares:

1. **Tabela de Stack:** trocar `Vite 5.4` por `Next.js <versao>`; `React 18.3` por `React 19`; `Framer Motion 11.11` por `Motion <versao>`. Remover `react-helmet-async`. Acrescentar `sharp` como dependência de build.
2. **Comandos:** acrescentar `npm run images` (gera as variantes das fotos) e `npm run verificar` (roda as assertions do build). Corrigir `npm run build` — não roda mais `tsc` antes.
3. **Deploy na Hostinger:** trocar **todas** as ocorrências de `dist/` por `out/`. O passo 2 hoje diz "Suba o conteúdo de `dist/`".

Acrescente ao final da seção de deploy:

```markdown
> A arquitetura é Next.js com `output: 'export'`: o build gera HTML estático
> em `out/`, sem runtime Node. O `.htaccess` não tem mais fallback de SPA —
> cada rota é um arquivo real, e URL inexistente devolve 404 de verdade.
```

- [ ] **Step 6: Build limpo do zero**

```bash
rm -rf .next out node_modules
npm install
npm run build
npm run verificar
```

Expected: install, build e verificador passam. Exit 0.

Isto pega dependência fantasma — algo que só funcionava porque ainda estava em `node_modules` de antes.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: remover Vite, ajustar .htaccess e README

- index.html, main.tsx, App.tsx e vite.config.ts apagados (index.html
  so agora, pois a Task 6 o usava como fonte dos schemas)
- postcss.config.js MANTIDO: registra o Tailwind no PostCSS
- .htaccess: fallback de SPA removido; export estatico tem arquivo real
  por rota, e o catch-all criava conteudo duplicado
- README: stack, comandos e dist/ -> out/ no deploy"
```

---

## Task 9: Verificação no navegador — gate final

**Objetivo:** provar a paridade que o script não alcança. Nada é commitado como código; a saída é um relatório.

**Files:**
- Create: `docs/superpowers/plans/2026-09-07-verificacao-migracao.md`

**Interfaces:**
- Consumes: build de `out/` das Tasks 1–8
- Produces: relatório de verificação; libera o merge em `main`

- [ ] **Step 1: Servir o build**

Use o Browser pane (`preview_start`), **não** o dev server. As verificações valem contra o export, que é o que vai ao ar.

```bash
npm run build
npx serve out
```

- [ ] **Step 2: Console e rede**

`read_console_messages` e `read_network_requests`.
Expected: console limpo, zero erros. Nenhum 404 de asset.

- [ ] **Step 3: Contraste WCAG AA — 10 pares**

Meça os pares texto/fundo com `javascript_tool` lendo o estilo computado. Todos devem passar em AA.

**Atenção ao par mais apertado**, que o README documenta em `4.72:1` (mínimo 4.5): a tag teal de 12px. Se ele cair abaixo de 4.5, é regressão — não escureça o fundo nem clareie o teal para "resolver", porque os dois são tokens travados do manual. Investigue o que mudou.

- [ ] **Step 4: Estrelas dos depoimentos**

`javascript_tool` lendo o `fill` computado dos SVGs de estrela.
Expected: `rgb(156, 23, 129)`

Estrela vazia lê como avaliação zero e destrói a conversão. O README registra que o `fill="currentColor"` vem acompanhado de `stroke` na mesma cor para não abrir halo no Safari — confirme que ambos continuam.

- [ ] **Step 5: Ícone do WhatsApp nos 10 CTAs**

Para cada um dos 10, confirme `fill=currentColor` computado com a cor do contexto: branco sobre magenta, teal sobre card branco, magenta sobre botão branco.
Expected: nenhum verde do WhatsApp. Verde não existe no manual.

- [ ] **Step 6: `dataLayer`**

Clique no CTA do hero com `computer` e leia o `dataLayer` com `javascript_tool`.
Expected: `{event: 'click_whatsapp', origem: 'hero'}`

- [ ] **Step 7: Sem overflow horizontal**

`resize_window` no preset mobile (375px), depois tablet, depois desktop.
Expected: `document.documentElement.scrollWidth <= window.innerWidth` em todos.

- [ ] **Step 8: Padrão de ondas a 8%**

Confirme visualmente com `computer {action: "screenshot"}` que o padrão aparece no hero e no CTA final, com os arcos grossos e afilados do manual — não uma malha de estrelas. Se virou malha, a proporção do tile foi forçada para quadrada; o tile é mais alto que largo de propósito (`ALT` 108 vs `P` 100).

- [ ] **Step 9: Escrever o relatório**

Crie `docs/superpowers/plans/2026-09-07-verificacao-migracao.md` com uma linha por item das Tasks 9.2–9.8: o que foi medido, o valor medido, e passou/falhou. Valores medidos, não impressões.

Registre também o que **continua não verificado**, e por quê:

- Lighthouse ≥90 nas 4 categorias — depende do peso das fotos reais
- Tempo <3s em 4G — mesma razão
- Estrelas em Safari e Android reais — validado só em Chromium

- [ ] **Step 10: Commit**

```bash
git add docs/superpowers/plans/2026-09-07-verificacao-migracao.md
git commit -m "docs: relatorio de verificacao da migracao

Paridade medida no navegador contra o build de out/, cobrindo os itens
da seccao 11 da spec que o verificador automatizado nao alcanca."
```

- [ ] **Step 11: Parar e reportar**

**Não faça merge em `main`.** Reporte ao dono do projeto: o que passou, o que não passou, e o que segue pendente. O merge é decisão dele.

Se qualquer item das Tasks 9.2–9.8 falhou, a migração **não** está pronta — a `main` continua servindo produção, que é exatamente o motivo de o trabalho estar numa branch.

---

## Notas para quem executa

**As pendências de go-live do README não são desta migração.** CRO-MG, as 9 fotos, CEP e coordenadas, `og-image.jpg`, números reais, GTM — todas seguem abertas depois que este plano termina. Nenhuma tarefa aqui as fecha, e nenhuma deve tentar.

**Se uma tarefa parecer exigir copy nova, ela está errada.** Pare e pergunte. A copy está aprovada e final.

**O hook de auto-commit vai empurrar commits intermediários para `migracao-nextjs`.** É comportamento esperado. Se o push falhar, o commit local acontece de todo jeito.

**Se aparecer complexidade escondida** — um componente que não compila como Server Component, uma incompatibilidade de Tailwind com a major do Next — pare, registre, e reporte antes de improvisar. A spec e este plano são argumentáveis; adivinhar no meio da execução não é.
