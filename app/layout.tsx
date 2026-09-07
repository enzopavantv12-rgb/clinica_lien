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
