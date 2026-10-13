import { ArrowRight } from 'lucide-react';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { tratamentos } from '../../data/content';

const destaques = tratamentos.lista.filter((t) => 'home' in t && t.home);

/**
 * Tratamentos na home (alinhamento final, 3.7): so os 3 mais alinhados ao
 * posicionamento da Lien, com a frase aprovada e "Saiba mais" para o
 * tratamento na pagina interna. Os 10 ficam em /tratamentos/.
 * Fundo creme, entre o "Por onde comecar" (branco) e a Sedacao (magenta).
 */
export function Tratamentos() {
  return (
    <section id="tratamentos" className="bg-cream py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHeading tag={tratamentos.tag} titulo={tratamentos.h2} subtitulo={tratamentos.sub} />

        <ul className="mt-14 grid gap-5 lg:grid-cols-3">
          {destaques.map((t, i) => (
            <Reveal as="li" key={t.slug} delay={i * 0.06}>
              <a
                href={`/tratamentos/#${t.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-brandgray bg-white p-7 shadow-soft transition-[transform,box-shadow] duration-300 ease-brand motion-safe:hover:-translate-y-1 hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta sm:p-8"
              >
                <Icon nome={t.icone} size={32} className="text-teal" />
                <h3 className="mt-5 text-h3 sm:text-h3-lg font-semibold text-ink">{t.nome}</h3>
                <p className="mt-3 text-body sm:text-body-lg text-ink-muted">{t.resumo}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-7 text-[0.9375rem] font-medium text-magenta underline-offset-4 group-hover:underline">
                  {tratamentos.saibaMais}
                  <span className="sr-only">: {t.nome}</span>
                  <ArrowRight
                    size={15}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="transition-transform duration-300 motion-safe:group-hover:translate-x-0.5"
                  />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <div className="mt-12 flex justify-center">
            <a
              href="/tratamentos/"
              className="inline-flex h-14 items-center gap-2 rounded-full border border-ink/25 px-7 text-base font-medium text-ink transition-colors hover:border-ink hover:bg-ink/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
            >
              {tratamentos.verTodos}
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
