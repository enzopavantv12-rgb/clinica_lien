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
