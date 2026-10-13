'use client';

import { Play } from 'lucide-react';
import { Carrossel } from '../ui/Carrossel';
import { SectionHeading } from '../ui/SectionHeading';
import { depoimentos } from '../../data/content';

type Video = (typeof depoimentos.videos)[number];

/** Video de paciente: so toca por acao do usuario, com controles nativos. */
function CartaoVideo({ video }: { video: Video }) {
  return (
    <figure className="flex h-full flex-col">
      <div className="aspect-[9/16] overflow-hidden rounded-3xl bg-ink shadow-soft">
        <video
          controls
          playsInline
          preload="none"
          poster={video.poster}
          className="h-full w-full object-cover"
        >
          {video.webm && <source src={video.webm} type="video/webm" />}
          <source src={video.mp4} type="video/mp4" />
          {video.vtt && <track kind="captions" src={video.vtt} srcLang="pt-BR" label="Português" default />}
        </video>
      </div>
      <figcaption className="mt-3 text-legend sm:text-legend-lg text-ink-muted">{video.legenda}</figcaption>
    </figure>
  );
}

/** Espaco reservado neutro, no mesmo recorte 9:16 dos videos. */
function CartaoPendente() {
  return (
    <div
      role="img"
      aria-label="Depoimento em vídeo de paciente, ainda não publicado"
      className="flex aspect-[9/16] flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-ink/20 bg-white"
    >
      <span className="flex size-14 items-center justify-center rounded-full bg-brandgray text-ink-muted">
        <Play size={22} strokeWidth={1.75} aria-hidden="true" />
      </span>
      <p className="text-legend font-semibold uppercase tracking-[0.14em] text-ink-muted">{depoimentos.pendente}</p>
    </div>
  );
}

/**
 * "Quem vive a Lien, conta." — prova emocional (alinhamento final, 3.3.2):
 * 2 a 3 videos curtos de pacientes num carrossel. Fica separada da prova
 * clinica: fundo creme, sem a grade dos Resultados logo acima.
 * Os depoimentos escritos do Google (colunas animadas) sairam da home
 * (conflito C2); o componente segue no repositorio sem uso.
 */
export function Depoimentos() {
  const slides = depoimentos.videos.length
    ? depoimentos.videos.map((v) => <CartaoVideo key={v.mp4} video={v} />)
    : Array.from({ length: depoimentos.vagas }, (_, i) => <CartaoPendente key={i} />);

  return (
    <section id="depoimentos" className="overflow-x-clip bg-cream py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHeading tag={depoimentos.tag} titulo={depoimentos.h2} />
        <div className="mx-auto mt-12 max-w-[920px]">
          <Carrossel
            slides={slides}
            rotulo={depoimentos.regiao}
            rotuloSlide="Vídeo"
            anterior={depoimentos.anterior}
            proximo={depoimentos.proximo}
            gap={20}
            classeSlide="w-[72vw] max-w-[300px] sm:w-[280px]"
            classeTrilho="rounded-3xl"
            centralizar
          />
        </div>
      </div>
    </section>
  );
}
