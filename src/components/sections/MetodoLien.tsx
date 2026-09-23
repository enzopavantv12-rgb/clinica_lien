import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { metodo } from '../../data/content';

/**
 * Metodo Lien em 4 etapas, como linha do tempo: horizontal no desktop,
 * vertical no mobile. Numeros em magenta, 44 -> 64px.
 * Proibido "avaliacao" e "orcamento" em qualquer etapa (briefing, 5.5).
 */
export function MetodoLien() {
  return (
    <section id="metodo" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHeading tag={metodo.tag} titulo={metodo.h2} subtitulo={metodo.sub} />

        <ol className="relative mt-14 grid gap-10 lg:grid-cols-4 lg:gap-8">
          {/* Trilho da linha do tempo: vertical no mobile, horizontal no desktop. */}
          <span
            aria-hidden="true"
            className="absolute bottom-4 left-[1.3rem] top-4 w-px bg-brandgray lg:bottom-auto lg:left-4 lg:right-4 lg:top-8 lg:h-px lg:w-auto"
          />

          {metodo.etapas.map((etapa, i) => (
            <Reveal as="li" key={etapa.numero} delay={i * 0.08} className="relative pl-16 lg:pl-0">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 block bg-white pr-2 text-stat font-black leading-none text-magenta lg:static lg:inline-block lg:text-stat-lg lg:pr-4"
              >
                {etapa.numero}
              </span>
              <h3 className="text-h3 sm:text-h3-lg font-semibold text-ink lg:mt-5">
                <span className="sr-only">Etapa {etapa.numero}: </span>
                {etapa.titulo}
              </h3>
              <p className="mt-2.5 max-w-prose text-body sm:text-body-lg text-ink-muted">
                {etapa.texto}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
