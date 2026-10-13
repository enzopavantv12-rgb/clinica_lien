import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';
import { FiltroCategorias } from '@/components/ui/FiltroCategorias';
import { JsonLd } from '@/components/ui/JsonLd';
import { Simbolo } from '@/components/ui/BrandGraphics';
import { conteudos, site } from '@/data/content';
import { schemaBreadcrumb } from '@/data/schema';
import { todosArtigos } from '@/lib/artigos';

const { pagina, categorias } = conteudos;
const URL = `${site.url}/conteudos/`;

export const metadata: Metadata = {
  title: pagina.title,
  description: pagina.description,
  alternates: { canonical: URL },
  openGraph: { type: 'website', locale: 'pt_BR', siteName: site.nome, title: pagina.title, description: pagina.description, url: URL },
  twitter: { card: 'summary_large_image', title: pagina.title, description: pagina.description },
};

/**
 * Biblioteca "Conteudos em Saude Bucal" (alinhamento final, 5.1): os 14
 * artigos organizados nas 5 categorias do PDF, com filtro por chips e uma
 * secao por categoria. Card: categoria + titulo + meta-descricao + "Ler
 * conteudo". Categoria vazia nao aparece.
 */
export default function Conteudos() {
  const artigos = todosArtigos();
  const grupos = categorias
    .map((c) => ({ categoria: c, artigos: artigos.filter((a) => a.category === c) }))
    .filter((g) => g.artigos.length > 0);

  return (
    <>
      <JsonLd
        schemas={[
          schemaBreadcrumb([
            { nome: conteudos.artigo.inicio, url: `${site.url}/` },
            { nome: pagina.h1, url: URL },
          ]),
        ]}
      />
      <Header />

      <main className="bg-cream pb-20 pt-32 sm:pb-24 sm:pt-36">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <header className="flex flex-col items-start">
            <p className="text-tag sm:text-tag-lg font-semibold uppercase tracking-[0.18em] text-teal">{conteudos.tag}</p>
            <h1 className="mt-3 text-h2 sm:text-h2-lg font-bold text-ink">{pagina.h1}</h1>
            <Simbolo variante="rgb" carregamento="eager" className="mt-4 block h-auto w-14" />
          </header>

          <div className="mt-10">
            <FiltroCategorias
              categorias={grupos.map((g) => g.categoria)}
              todas={pagina.todas}
              rotulo={pagina.filtro}
            />
          </div>

          {grupos.map((g) => (
            <section key={g.categoria} data-categoria={g.categoria} aria-labelledby={`cat-${g.artigos[0].slug}`} className="mt-14">
              <h2 id={`cat-${g.artigos[0].slug}`} className="text-h3 sm:text-h3-lg font-semibold text-ink">
                {g.categoria}
              </h2>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {g.artigos.map((a) => (
                  <li key={a.slug}>
                    <a
                      href={`/${a.slug}/`}
                      className="group flex h-full flex-col rounded-3xl border border-brandgray bg-white p-7 shadow-soft transition-[transform,box-shadow] duration-300 ease-brand motion-safe:hover:-translate-y-1 hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta"
                    >
                      <p className="text-legend font-semibold uppercase tracking-[0.14em] text-teal">{a.category}</p>
                      <h3 className="mt-3 text-h3 font-semibold text-ink">{a.title}</h3>
                      <p className="mt-3 text-body text-ink-muted">{a.metaDescription}</p>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[0.9375rem] font-medium text-magenta underline-offset-4 group-hover:underline">
                        {conteudos.lerConteudo}
                        <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
