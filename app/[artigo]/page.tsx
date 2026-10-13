import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';
import { ArcoSorriso } from '@/components/ui/BrandGraphics';
import { JsonLd } from '@/components/ui/JsonLd';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { CTA_PRINCIPAL, conteudos, mensagemArtigo, site, tratamentoPorSlug } from '@/data/content';
import { schemaArtigo, schemaBreadcrumb } from '@/data/schema';
import {
  DATA_PUBLICACAO,
  artigoPorSlug,
  dataPorExtenso,
  relacionados,
  todosArtigos,
  type Bloco,
} from '@/lib/artigos';

/**
 * Template dos 14 artigos (alinhamento final, 5.3), cada um na URL exata do
 * PDF, na raiz do dominio. Texto literal de content/artigos/<slug>.md.
 *
 * Um H1 (o titulo), subtitulos em H2; <title> e meta-descricao exatos do PDF;
 * breadcrumb (Inicio > Conteudos > Artigo); autoria e data; bloco "Proximo
 * passo" com o arco teal e o unico CTA; links para o tratamento relacionado e
 * para 2 ou 3 artigos relacionados. JSON-LD Article + BreadcrumbList.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return todosArtigos().map((a) => ({ artigo: a.slug }));
}

type Props = { params: Promise<{ artigo: string }> };

const urlDe = (slug: string) => `${site.url}/${slug}/`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const artigo = artigoPorSlug((await params).artigo);
  if (!artigo) return {};
  const url = urlDe(artigo.slug);
  return {
    title: artigo.metaTitle,
    description: artigo.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      locale: 'pt_BR',
      siteName: site.nome,
      title: artigo.metaTitle,
      description: artigo.metaDescription,
      url,
      publishedTime: DATA_PUBLICACAO,
      authors: [site.responsavelTecnica],
    },
    twitter: { card: 'summary_large_image', title: artigo.metaTitle, description: artigo.metaDescription },
  };
}

function Corpo({ blocos }: { blocos: Bloco[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocos.map((b, i) => {
        if (b.tipo === 'h2') {
          return (
            <h2 key={i} className="mt-6 text-h3 sm:text-h3-lg font-semibold text-ink">
              {b.texto}
            </h2>
          );
        }
        if (b.tipo === 'p') {
          return (
            <p key={i} className="text-body sm:text-body-lg leading-[1.75] text-ink">
              {b.texto}
            </p>
          );
        }
        const Lista = b.tipo === 'ul' ? 'ul' : 'ol';
        return (
          <Lista key={i} className="flex flex-col gap-2.5">
            {b.itens.map((item, j) => (
              <li key={item} className="flex gap-3 text-body sm:text-body-lg leading-[1.65] text-ink">
                {b.tipo === 'ul' ? (
                  <span aria-hidden="true" className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-magenta" />
                ) : (
                  <span aria-hidden="true" className="w-5 shrink-0 font-semibold text-magenta">
                    {j + 1}.
                  </span>
                )}
                <span>{item}</span>
              </li>
            ))}
          </Lista>
        );
      })}
    </div>
  );
}

const link =
  'rounded underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta';

export default async function Artigo({ params }: Props) {
  const artigo = artigoPorSlug((await params).artigo);
  if (!artigo) notFound();

  const url = urlDe(artigo.slug);
  const { artigo: rotulos } = conteudos;
  const tratamentosRelacionados = artigo.tratamentos
    .map((s) => tratamentoPorSlug(s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const leituras = relacionados(artigo);

  return (
    <>
      <JsonLd
        schemas={[
          schemaArtigo({
            titulo: artigo.title,
            descricao: artigo.metaDescription,
            url,
            data: DATA_PUBLICACAO,
            palavraChave: artigo.keyword,
          }),
          schemaBreadcrumb([
            { nome: rotulos.inicio, url: `${site.url}/` },
            { nome: conteudos.pagina.h1, url: `${site.url}/conteudos/` },
            { nome: artigo.title, url },
          ]),
        ]}
      />
      <Header paginaAtiva="/conteudos/" />

      <main className="bg-white pb-20 pt-32 sm:pb-24 sm:pt-36">
        <article className="mx-auto max-w-[760px] px-5 sm:px-8">
          <nav aria-label="Trilha de navegação">
            <ol className="flex flex-wrap items-center gap-1.5 text-legend sm:text-legend-lg text-ink-muted">
              <li>
                <a href="/" className={link}>
                  {rotulos.inicio}
                </a>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={14} />
              </li>
              <li>
                <a href="/conteudos/" className={link}>
                  {conteudos.pagina.h1}
                </a>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={14} />
              </li>
              <li aria-current="page" className="text-ink">
                {artigo.title}
              </li>
            </ol>
          </nav>

          <header className="mt-8">
            <p className="text-tag sm:text-tag-lg font-semibold uppercase tracking-[0.18em] text-teal">{artigo.category}</p>
            <h1 className="mt-3 text-h2 sm:text-h2-lg font-bold text-ink">{artigo.title}</h1>
            <div className="mt-6 flex flex-col gap-1 border-l-2 border-magenta pl-4 text-legend sm:text-legend-lg text-ink-muted">
              <p>
                <span className="font-semibold text-ink">Autoria:</span> {artigo.author}
              </p>
              <p>
                {rotulos.publicado} <time dateTime={DATA_PUBLICACAO}>{dataPorExtenso(DATA_PUBLICACAO)}</time>
              </p>
            </div>
          </header>

          <div className="mt-10">
            <Corpo blocos={artigo.corpo} />
          </div>

          <aside aria-labelledby="proximo-passo" className="mt-14 rounded-3xl bg-cream p-7 shadow-soft sm:p-10">
            <ArcoSorriso className="h-auto w-16" />
            <h2 id="proximo-passo" className="mt-4 text-h3 sm:text-h3-lg font-semibold text-ink">
              {rotulos.proximoPasso}
            </h2>
            <p className="mt-3 text-body sm:text-body-lg text-ink">{artigo.proximoPasso}</p>
            <WhatsAppButton
              origem={`artigo-${artigo.slug}`}
              mensagem={mensagemArtigo(artigo.title)}
              variante="capsula"
              tamanho="capsula"
              className="mt-8 w-full shadow-[0_10px_30px_-10px_rgba(156,23,129,0.55)] sm:w-auto"
            >
              {CTA_PRINCIPAL}
            </WhatsAppButton>
          </aside>

          <nav aria-label="Conteúdos relacionados" className="mt-14 grid gap-10 sm:grid-cols-2">
            <div>
              <p className="text-legend font-semibold uppercase tracking-[0.12em] text-teal">
                {rotulos.tratamentoRelacionado}
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {tratamentosRelacionados.map((t) => (
                  <li key={t.slug}>
                    <a href={`/tratamentos/#${t.slug}`} className={`inline-flex items-start gap-1.5 text-[0.9375rem] font-medium text-magenta ${link}`}>
                      <ArrowRight size={15} strokeWidth={2} aria-hidden="true" className="mt-[0.2em] shrink-0" />
                      {t.nome}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-legend font-semibold uppercase tracking-[0.12em] text-teal">{rotulos.relacionados}</p>
              <ul className="mt-3 flex flex-col gap-2">
                {leituras.map((a) => (
                  <li key={a.slug}>
                    <a href={`/${a.slug}/`} className={`inline-flex items-start gap-1.5 text-[0.9375rem] font-medium text-magenta ${link}`}>
                      <ArrowRight size={15} strokeWidth={2} aria-hidden="true" className="mt-[0.2em] shrink-0" />
                      {a.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </article>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
