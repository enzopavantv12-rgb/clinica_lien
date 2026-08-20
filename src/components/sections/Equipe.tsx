import { BrandImage } from '../ui/BrandImage';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { equipe } from '../../data/content';

/**
 * PROIBIDO usar avatares com iniciais. Quando a foto real nao existe, o
 * BrandImage renderiza o placeholder [FOTO PENDENTE] — nunca "NS"/"ME"/etc.
 */
export function Equipe() {
  return (
    <section id="equipe" className="bg-cream py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHeading tag={equipe.tag} titulo={equipe.h2} subtitulo={equipe.sub} />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {equipe.membros.map((membro, i) => (
            <Reveal as="li" key={membro.nome} delay={i * 0.07}>
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-brandgray bg-white shadow-soft">
                <BrandImage
                  dados={membro.foto}
                  width={520}
                  height={520}
                  proporcao="aspect-square"
                  className="rounded-none rounded-t-3xl"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-h3 font-semibold text-ink">{membro.nome}</h3>
                  <p className="mt-1.5 text-legend font-medium uppercase tracking-[0.08em] text-teal">
                    {membro.titulo}
                  </p>
                  <p className="mt-3.5 text-body text-ink-muted">{membro.bio}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
