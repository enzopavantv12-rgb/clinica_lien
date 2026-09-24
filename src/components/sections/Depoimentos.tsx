import { CincoEstrelas } from '../ui/CincoEstrelas';
import { DepoimentosMarquee } from './DepoimentosMarquee';
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
 * Nunca inventar depoimento. Abaixo de `minimoMarquee` avaliacoes reais, a
 * secao mostra so o selo do Google — prova social real — sem texto de
 * "em breve". A partir dele, as avaliacoes rolam no marquee-03 (vertical).
 *
 * `--background` redefinido para o cream da secao: e a cor do fade no topo e
 * na base do marquee (`from-background`).
 */
export function Depoimentos() {
  return (
    <section id="depoimentos" className="bg-cream py-20 [--background:250_248_246] sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHeading tag={depoimentos.tag} titulo={depoimentos.h2} />

        <Reveal delay={0.1} className="mt-10">
          <SeloGoogle />
        </Reveal>

        {depoimentos.itens.length >= depoimentos.minimoMarquee && <DepoimentosMarquee />}
      </div>
    </section>
  );
}
