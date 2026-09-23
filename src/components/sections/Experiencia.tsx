import { BrandImage } from '../ui/BrandImage';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { experiencia } from '../../data/content';

/**
 * Experiencia Lien — o maior diferencial para o paciente com ansiedade.
 * Oito diferenciais sensoriais, com icones lucide em teal (nunca emoji).
 *
 * Mobile-first: a lista vem antes da foto no DOM, entao no empilhamento o
 * conteudo aparece primeiro.
 */
export function Experiencia() {
  return (
    <section id="experiencia" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHeading tag={experiencia.tag} titulo={experiencia.h2} subtitulo={experiencia.sub} />

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          <ul className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {experiencia.diferenciais.map((d, i) => (
              <Reveal as="li" key={d.titulo} delay={i * 0.05}>
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal/10">
                    <Icon nome={d.icone} size={22} className="text-teal" />
                  </span>
                  <div>
                    <h3 className="text-[1.0625rem] sm:text-h3 font-semibold text-ink">{d.titulo}</h3>
                    <p className="mt-1.5 text-body text-ink-muted">{d.texto}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.14}>
            <div className="relative lg:sticky lg:top-28">
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
