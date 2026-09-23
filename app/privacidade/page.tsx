import type { Metadata } from 'next';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';
import { privacidade, site } from '@/data/content';

/*
 * [PENDENTE: revisao juridica] Rascunho LGPD escrito a partir do briefing — a
 * clinica nao tinha politica de privacidade. O texto fica em content.ts
 * (`privacidade`), junto com o resto da copy.
 */

export const metadata: Metadata = {
  title: `${privacidade.titulo} | ${site.nome}`,
  description: `Como a ${site.nome} trata os dados pessoais de quem visita o site, conforme a LGPD.`,
  alternates: { canonical: `${site.url}/privacidade/` },
};

export default function Privacidade() {
  return (
    <>
      <Header />

      <main className="bg-white pb-20 pt-32 sm:pb-24 sm:pt-36">
        <article className="mx-auto max-w-[760px] px-5 sm:px-8">
          <h1 className="text-h2 sm:text-h2-lg font-bold text-ink">{privacidade.titulo}</h1>
          <p className="mt-3 text-legend sm:text-legend-lg text-ink-muted">{privacidade.atualizacao}</p>
          <p className="mt-8 max-w-prose text-body sm:text-body-lg text-ink">{privacidade.intro}</p>

          {privacidade.secoes.map((secao) => (
            <section key={secao.titulo} className="mt-10">
              <h2 className="text-h3 sm:text-h3-lg font-semibold text-ink">{secao.titulo}</h2>
              {secao.paragrafos.map((p) => (
                <p key={p} className="mt-3 max-w-prose text-body sm:text-body-lg text-ink-muted">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </article>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
