import { BrandImage } from '../ui/BrandImage';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { experiencia } from '../../data/content';

/**
 * Secao de maior diferencial competitivo (paciente com ansiedade).
 * Prioridade absoluta no mobile: a lista de diferenciais vem antes da foto
 * no DOM, entao no empilhamento mobile o conteudo de conversao aparece primeiro.
 */
export function Experiencia() {
  return (
    <section id="experiencia" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Coluna de conteudo — primeira no DOM (mobile-first). */}
          <div className="lg:order-2">
            <SectionHeading
              tag={experiencia.tag}
              titulo={experiencia.h2}
              subtitulo={experiencia.sub}
              centralizado={false}
            />

            <ul className="mt-10 flex flex-col gap-5">
              {experiencia.diferenciais.map((d, i) => (
                <Reveal as="li" key={d.icone} delay={i * 0.08}>
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal/10">
                      <Icon nome={d.icone} size={22} className="text-teal" />
                    </span>
                    <p className="max-w-prose pt-2 text-body sm:text-body-lg text-ink">
                      {d.texto}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Foto real da clinica. */}
          <Reveal delay={0.14} className="lg:order-1">
            <div className="relative">
              <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-teal-light/25" />
              <BrandImage
                dados={experiencia.imagem}
                width={900}
                height={900}
                proporcao="aspect-square"
                className="shadow-soft"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
