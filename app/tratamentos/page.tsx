import type { Metadata } from 'next';
import { ChevronRight } from 'lucide-react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { GradeTratamentos } from '@/components/sections/GradeTratamentos';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';
import { Etiqueta } from '@/components/ui/Etiqueta';
import { JsonLd } from '@/components/ui/JsonLd';
import { site, tratamentos } from '@/data/content';
import { schemaBreadcrumb } from '@/data/schema';
import { todosArtigos } from '@/lib/artigos';

const { pagina } = tratamentos;
const URL = `${site.url}/tratamentos/`;

export const metadata: Metadata = {
  title: pagina.title,
  description: pagina.description,
  alternates: { canonical: URL },
  openGraph: { type: 'website', locale: 'pt_BR', siteName: site.nome, title: pagina.title, description: pagina.description, url: URL },
  twitter: { card: 'summary_large_image', title: pagina.title, description: pagina.description },
};

const link =
  'rounded underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta';

/**
 * Pagina interna Tratamentos — grade de 10 cards do print aprovado (prompt
 * "tratamentos-lien", out/2026), com o conteudo literal do Alinhamento Final
 * (secao 4.2) aberto pelo "Saiba mais" (GradeTratamentos). Um H1; um H2 por
 * tratamento. Links para os artigos relacionados (secao 5.3).
 */
export default function Tratamentos() {
  const leituras = Object.fromEntries(
    tratamentos.lista.map((t) => [
      t.slug,
      todosArtigos()
        .filter((a) => a.tratamentos.includes(t.slug))
        .map((a) => ({ slug: a.slug, title: a.title })),
    ]),
  );

  return (
    <>
      <JsonLd
        schemas={[
          schemaBreadcrumb([
            { nome: tratamentos.inicio, url: `${site.url}/` },
            { nome: tratamentos.tag, url: URL },
          ]),
        ]}
      />
      <Header />

      <main className="bg-[linear-gradient(180deg,#FFFFFF,#F6F7F9_18%)] pb-[72px] pt-32 lg:pb-[112px] lg:pt-36">
        <div className="mx-auto max-w-[1000px] px-6">
          <nav aria-label="Trilha de navegação">
            <ol className="flex items-center gap-1.5 text-legend sm:text-legend-lg text-ink-muted">
              <li>
                <a href="/" className={link}>
                  {tratamentos.inicio}
                </a>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={14} />
              </li>
              <li aria-current="page" className="text-ink">
                {tratamentos.tag}
              </li>
            </ol>
          </nav>

          <header className="mt-10 flex flex-col items-center text-center">
            <Etiqueta cor="teal">{tratamentos.tag}</Etiqueta>
            <h1 className="mt-3 text-[clamp(28px,3vw,34px)] font-bold leading-[1.15] text-ink">{pagina.h1}</h1>
            <p className="mt-[14px] max-w-[470px] text-base font-light leading-[1.6] text-ink-muted">{tratamentos.sub}</p>
          </header>

          <div className="mt-14">
            <GradeTratamentos leituras={leituras} />
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
