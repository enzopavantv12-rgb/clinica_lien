import type { Metadata } from 'next';
import { ArrowRight, Plus } from 'lucide-react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';
import { AbrirPorAncora } from '@/components/ui/AbrirPorAncora';
import { Icon } from '@/components/ui/Icon';
import { JsonLd } from '@/components/ui/JsonLd';
import { Simbolo } from '@/components/ui/BrandGraphics';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { conteudos, site, tratamentos } from '@/data/content';
import { schemaBreadcrumb } from '@/data/schema';
import { todosArtigos } from '@/lib/artigos';

const { pagina, rotulos } = tratamentos;
const URL = `${site.url}/tratamentos/`;

export const metadata: Metadata = {
  title: pagina.title,
  description: pagina.description,
  alternates: { canonical: URL },
  openGraph: { type: 'website', locale: 'pt_BR', siteName: site.nome, title: pagina.title, description: pagina.description, url: URL },
  twitter: { card: 'summary_large_image', title: pagina.title, description: pagina.description },
};

/**
 * Pagina interna Tratamentos (alinhamento final, secao 4): os 10 tratamentos
 * do Anexo I, literais. Card curto (nome + 1 frase) e "Saiba mais"
 * expansivel no proprio card — <details> nativo; o conteudo fechado fica no
 * HTML. Cada card tem ancora propria: /tratamentos/#<slug> abre e rola ate ele.
 *
 * Em cada um: O que e, Beneficio, Indicado para, Principais tratamentos e
 * servicos, a nota em italico e um unico "Agende sua consulta". Links para os
 * artigos relacionados (secao 5.3).
 */
export default function Tratamentos() {
  const artigos = todosArtigos();

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
      <AbrirPorAncora />

      <main className="bg-cream pb-20 pt-32 sm:pb-24 sm:pt-36">
        <div className="mx-auto max-w-[960px] px-5 sm:px-8">
          <header className="flex flex-col items-start">
            <p className="text-tag sm:text-tag-lg font-semibold uppercase tracking-[0.18em] text-teal">{tratamentos.tag}</p>
            <h1 className="mt-3 text-h2 sm:text-h2-lg font-bold text-ink">{pagina.h1}</h1>
            <Simbolo variante="rgb" carregamento="eager" className="mt-4 block h-auto w-14" />
            <p className="mt-5 max-w-prose text-sub sm:text-sub-lg text-ink-muted">{tratamentos.sub}</p>
          </header>

          <ol className="mt-12 flex flex-col gap-4">
            {tratamentos.lista.map((t) => {
              const relacionados = artigos.filter((a) => a.tratamentos.includes(t.slug));
              const resumoEhOQueE = t.resumo === t.oQueE;
              return (
                <li key={t.slug}>
                  <article
                    id={t.slug}
                    className="rounded-3xl border border-brandgray bg-white p-6 shadow-soft has-[details[open]]:shadow-lift sm:p-8"
                  >
                    <div className="flex items-start gap-5">
                      <span className="hidden size-14 shrink-0 items-center justify-center rounded-2xl bg-cream text-teal sm:flex">
                        <Icon nome={t.icone} size={28} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-legend font-semibold tracking-[0.14em] text-magenta">{t.numero}</p>
                        <h2 className="mt-1 text-h3 sm:text-h3-lg font-semibold text-ink">{t.nome}</h2>
                        <p className="mt-2 max-w-prose text-body sm:text-body-lg text-ink-muted">{t.resumo}</p>

                        <details className="group mt-4">
                          <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded text-[0.9375rem] font-medium text-ink transition-colors hover:text-magenta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta [&::-webkit-details-marker]:hidden">
                            <span className="group-open:hidden">{tratamentos.saibaMais}</span>
                            <span className="hidden group-open:inline">{tratamentos.fechar}</span>
                            <span className="sr-only">: {t.nome}</span>
                            <Plus
                              size={16}
                              strokeWidth={2}
                              aria-hidden="true"
                              className="text-teal transition-transform duration-300 ease-brand group-open:rotate-45"
                            />
                          </summary>

                    <div className="mt-6 border-t border-brandgray pt-6">
                      <dl className="flex flex-col gap-5">
                        {!resumoEhOQueE && (
                          <div>
                            <dt className="text-legend font-semibold uppercase tracking-[0.12em] text-teal">{rotulos.oQueE}</dt>
                            <dd className="mt-1 max-w-prose text-body sm:text-body-lg text-ink">{t.oQueE}</dd>
                          </div>
                        )}
                        <div>
                          <dt className="text-legend font-semibold uppercase tracking-[0.12em] text-teal">{rotulos.beneficio}</dt>
                          <dd className="mt-1 max-w-prose text-body sm:text-body-lg text-ink">{t.beneficio}</dd>
                        </div>
                        <div>
                          <dt className="text-legend font-semibold uppercase tracking-[0.12em] text-teal">{rotulos.indicado}</dt>
                          <dd className="mt-1 max-w-prose text-body sm:text-body-lg text-ink">{t.indicado}</dd>
                        </div>
                        <div>
                          <dt className="text-legend font-semibold uppercase tracking-[0.12em] text-teal">{rotulos.servicos}</dt>
                          <dd className="mt-2">
                            <ul className="flex flex-col gap-2">
                              {t.servicos.map((s) => (
                                <li key={s} className="flex gap-3 text-body sm:text-body-lg text-ink">
                                  <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-magenta" />
                                  {s}
                                </li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                      </dl>

                      <p className="mt-6 max-w-prose text-legend sm:text-legend-lg italic text-ink-muted">{t.nota}</p>

                      {relacionados.length > 0 && (
                        <div className="mt-6">
                          <p className="text-legend font-semibold uppercase tracking-[0.12em] text-teal">{rotulos.relacionados}</p>
                          <ul className="mt-2 flex flex-col gap-1.5">
                            {relacionados.map((a) => (
                              <li key={a.slug}>
                                <a
                                  href={`/${a.slug}/`}
                                  className="inline-flex items-start gap-1.5 rounded text-[0.9375rem] font-medium text-magenta underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta"
                                >
                                  <ArrowRight size={15} strokeWidth={2} aria-hidden="true" className="mt-[0.2em] shrink-0" />
                                  {a.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <WhatsAppButton
                        origem={`tratamento-${t.slug}`}
                        variante="capsula"
                        tamanho="capsula"
                        className="mt-8 w-full sm:w-auto"
                      >
                        {tratamentos.cta}
                      </WhatsAppButton>
                    </div>
                        </details>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
