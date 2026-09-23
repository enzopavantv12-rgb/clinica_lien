import { BrandImage } from '../ui/BrandImage';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { estrutura } from '../../data/content';

/**
 * Estrutura e tecnologia. Absorve a antiga secao "Ambientes": as tres fotos
 * (recepcao, atendimento, kit de boas-vindas) ilustram a estrutura aqui.
 * Sem estacionamento nem acessibilidade — nao marcados no briefing.
 */
export function Estrutura() {
  return (
    <section id="estrutura" className="bg-cream py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHeading tag={estrutura.tag} titulo={estrutura.h2} />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {estrutura.itens.map((item, i) => (
            <Reveal as="li" key={item.titulo} delay={i * 0.06}>
              <article className="h-full rounded-3xl bg-white p-6 shadow-soft sm:p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal/10">
                  <Icon nome={item.icone} size={24} className="text-teal" />
                </span>
                <h3 className="mt-5 text-h3 font-semibold text-ink">{item.titulo}</h3>
                <p className="mt-2 text-body text-ink-muted">{item.texto}</p>
              </article>
            </Reveal>
          ))}
        </ul>

        <ul className="mt-12 grid gap-5 sm:grid-cols-3">
          {estrutura.fotos.map((foto, i) => (
            <Reveal as="li" key={foto.titulo} delay={i * 0.08}>
              <figure>
                <BrandImage
                  dados={foto.imagem}
                  width={1024}
                  height={768}
                  proporcao="aspect-[4/3]"
                  className="shadow-soft"
                />
                <figcaption className="mt-3 text-legend sm:text-legend-lg font-medium text-ink-muted">
                  {foto.titulo}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
