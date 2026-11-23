import type { Metadata } from 'next';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { site } from '@/data/content';

/**
 * Pagina 404 (auditoria SEO tecnica, nov/2026): noindex explicito e sem o
 * canonical da home herdado do layout, que dava sinais conflitantes.
 */
export const metadata: Metadata = {
  title: `Página não encontrada | ${site.nome}`,
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function NaoEncontrada() {
  return (
    <>
      <Header />
      <main className="bg-cream px-6 pb-24 pt-40 text-center">
        <p className="text-tag font-semibold uppercase tracking-[0.18em] text-[#026A82]">Erro 404</p>
        <h1 className="mt-3 text-h2 sm:text-h2-lg font-bold text-ink">Página não encontrada</h1>
        <p className="mx-auto mt-4 max-w-prose text-body text-ink-muted">
          O endereço pode ter mudado. Veja os tratamentos, os conteúdos ou volte ao início.
        </p>
        <nav aria-label="Páginas principais" className="mt-8 flex flex-wrap justify-center gap-4 text-[0.9375rem] font-medium">
          <a href="/" className="rounded-full bg-magenta px-6 py-3 text-white">Início</a>
          <a href="/tratamentos/" className="rounded-full border border-teal px-6 py-3 text-teal">Tratamentos</a>
          <a href="/conteudos/" className="rounded-full border border-teal px-6 py-3 text-teal">Conteúdos</a>
        </nav>
      </main>
      <Footer />
    </>
  );
}
