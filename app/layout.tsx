import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { preload } from 'react-dom';
import { seo, site } from '@/data/content';
import { schemaDentist, schemaFaq, schemaPerson } from '@/data/schema';
import './globals.css';

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: { canonical: seo.canonical },
  // Sem isto o Next nao emite <link rel="icon"> nenhum: os icones vivem em
  // public/marca/, nao em app/, entao a convencao de arquivo do App Router nao
  // os pega. Simbolo oficial sobre o magenta da marca, gerado por `npm run marca`.
  icons: {
    icon: [
      { url: '/marca/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/marca/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/marca/apple-icon.png', sizes: '180x180' }],
  },
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

export default function RootLayout({ children }: { children: ReactNode }) {
  // Preload da Poppins 700 (usada no H1 do hero). Caminho estavel em
  // /public/fonts/ para casar exatamente com o @font-face do CSS.
  //
  // Por que a API `preload()` e nao um <link rel="preload"> em JSX: com o
  // elemento na arvore o React 19 emite DOIS preloads identicos da mesma
  // fonte — registra o recurso E hasteia o elemento renderizado, e a
  // deduplicacao nao cruza os dois caminhos. Vale dentro do <head> explicito
  // e dentro do <body>. `preload()` registra o recurso uma vez so.
  preload('/fonts/poppins-latin-700-normal.woff2', {
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  });

  return (
    <html lang="pt-BR">
      <body>
        {/* JSON-LD no body e o padrao recomendado pelo Next; o Google le o
            schema em qualquer lugar do documento. O dado e nosso, nao vem de
            entrada de usuario.

            O `<` escapado como \u003c e obrigatorio: JSON.stringify nao
            escapa `<`, e uma string do content.ts que viesse a conter
            `</script` fecharia o bloco no meio e truncaria o documento. */}
        {[schemaDentist, schemaFaq, schemaPerson].map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
            }}
          />
        ))}
        {children}
      </body>
    </html>
  );
}
