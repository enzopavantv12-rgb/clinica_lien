import { BrandImage } from '../ui/BrandImage';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { equipe } from '../../data/content';

/**
 * Corpo clinico — cada especialidade com quem e especialista.
 *
 * PROIBIDO avatar com iniciais: sem foto, o BrandImage mostra o bloco neutro
 * de foto pendente. Campos ausentes nao viram texto inventado: sem
 * especialidade ou CRO a linha some; sem bio aparece um aviso discreto.
 */
export function Equipe() {
  return (
    <section id="equipe" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHeading tag={equipe.tag} titulo={equipe.h2} subtitulo={equipe.sub} />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {equipe.membros.map((membro, i) => (
            <Reveal as="li" key={membro.nome} delay={i * 0.06}>
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
                  {'cargo' in membro && membro.cargo && (
                    <p className="mt-1 text-legend sm:text-legend-lg font-medium text-magenta">{membro.cargo}</p>
                  )}
                  {membro.especialidade && (
                    <p className="mt-2 text-legend font-medium uppercase tracking-[0.08em] text-teal">
                      {membro.especialidade}
                    </p>
                  )}
                  {membro.cro && <p className="mt-1.5 text-legend text-ink-muted">{membro.cro}</p>}
                  <p className={`mt-3.5 text-body ${membro.bio ? 'text-ink-muted' : 'italic text-ink-muted'}`}>
                    {membro.bio ?? equipe.semBio}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
