import { BrandImage } from '../ui/BrandImage';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { ambientes } from '../../data/content';

/**
 * Secao Ambientes — mostra o espaco fisico da clinica.
 *
 * Veio do prompt diretor (estrutura de referencia do Studio Dental:
 * Hero -> Sobre -> Servicos -> Equipe -> Ambientes -> Depoimentos), por isso
 * fica entre Corpo Clinico e Depoimentos.
 *
 * Vale a mesma regra das outras: nunca banco de imagens. Sem as fotos reais
 * do espaco, renderiza [FOTO PENDENTE] — a direcao de fotografia do briefing
 * (tons neutros, off-white, bege e madeira, luz natural) e justamente o que
 * diferencia essas fotos de um consultorio clinico frio qualquer.
 */
export function Ambientes() {
  return (
    <section id="ambientes" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHeading tag={ambientes.tag} titulo={ambientes.h2} subtitulo={ambientes.sub} />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ambientes.espacos.map((espaco, i) => (
            <Reveal as="li" key={espaco.titulo} delay={i * 0.08}>
              <figure className="flex h-full flex-col">
                <BrandImage
                  dados={espaco.foto}
                  width={720}
                  height={540}
                  proporcao="aspect-[4/3]"
                  className="shadow-soft"
                />
                <figcaption className="mt-4 text-h3 font-semibold text-ink">
                  {espaco.titulo}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
