import { CincoEstrelas } from '../ui/CincoEstrelas';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { depoimentos } from '../../data/content';

/** Selo da nota no Google. Vira link quando a URL do perfil for cadastrada. */
function SeloGoogle() {
  const { nota, total, url } = depoimentos.google;
  const conteudo = (
    <>
      <CincoEstrelas tamanho={22} />
      <p className="text-body sm:text-body-lg text-ink">
        <span className="font-black text-magenta">Google {nota}</span>
        <span className="text-ink-muted"> · {total} avaliações</span>
      </p>
    </>
  );
  const classe =
    'mx-auto flex w-fit flex-col items-center gap-2 rounded-3xl border border-brandgray bg-white px-7 py-5 shadow-soft sm:flex-row sm:gap-4';

  return url ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${classe} transition-shadow hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta`}
    >
      {conteudo}
    </a>
  ) : (
    <div className={classe}>{conteudo}</div>
  );
}

/**
 * Depoimentos + avaliacoes do Google.
 *
 * Nunca inventar depoimento. Sem nenhum cadastrado, a secao mostra so o selo
 * do Google — prova social real — sem texto de "em breve".
 * Com depoimentos: carrossel horizontal com scroll-snap (CSS puro, sem JS).
 * A partir de `minimoMarquee` avaliacoes, elas passam para a faixa em marquee
 * da secao Sobre e o carrossel daqui some, para nao repetir os mesmos textos.
 */
export function Depoimentos() {
  return (
    <section id="depoimentos" className="bg-cream py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHeading tag={depoimentos.tag} titulo={depoimentos.h2} />

        <Reveal delay={0.1} className="mt-10">
          <SeloGoogle />
        </Reveal>

        {depoimentos.itens.length > 0 && depoimentos.itens.length < depoimentos.minimoMarquee && (
          <ul className="-mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:px-0">
            {depoimentos.itens.map((d) => (
              <li key={d.nome} className="w-[86%] shrink-0 snap-start sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]">
                <article className="flex h-full flex-col rounded-3xl border border-brandgray bg-white p-7 shadow-soft sm:p-8">
                  <CincoEstrelas />
                  <blockquote className="mt-5 flex-1">
                    <p className="max-w-prose text-body sm:text-body-lg text-ink">&ldquo;{d.texto}&rdquo;</p>
                  </blockquote>
                  <footer className="mt-6 border-t border-brandgray pt-4">
                    <p className="text-[0.9375rem] font-semibold text-ink">{d.nome}</p>
                    {d.tratamento && <p className="mt-0.5 text-legend text-teal">{d.tratamento}</p>}
                  </footer>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
