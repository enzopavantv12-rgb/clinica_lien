'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Video } from 'lucide-react';

type DadosVideo = { webm: string; mp4: string; poster: string };

/**
 * Video da secao Sobre, recortado em forma de gota (.lien-gota).
 *
 * - Sem `autoPlay` no HTML: o play e disparado no cliente so quando o
 *   visitante NAO pede movimento reduzido. Com o atributo, o navegador
 *   comecaria a tocar antes da hidratacao, ignorando a preferencia.
 * - Loop acima de 5 s exige controle de pausa (WCAG 2.2.2): botao discreto
 *   dentro da area circular, fora do recorte do `overflow-hidden`.
 * - Sem video cadastrado, a gota mostra um placeholder visivel, na mesma
 *   convencao do [Foto pendente] da BrandImage.
 */
export function VideoGota({
  video,
  rotuloPausar,
  rotuloReproduzir,
}: {
  video: DadosVideo | null;
  rotuloPausar: string;
  rotuloReproduzir: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [tocando, setTocando] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.play().then(
      () => setTocando(true),
      () => setTocando(false),
    );
  }, []);

  if (!video) {
    return (
      <div className="lien-gota flex aspect-square w-full flex-col items-center justify-center gap-3 overflow-hidden border border-dashed border-ink/20 bg-brandgray shadow-lift">
        <Video size={28} className="text-ink-muted" aria-hidden="true" />
        <p className="px-6 text-center text-legend font-semibold uppercase tracking-[0.14em] text-ink-muted">
          [Vídeo pendente]
        </p>
      </div>
    );
  }

  const alternar = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      el.play().then(() => setTocando(true), () => setTocando(false));
    } else {
      el.pause();
      setTocando(false);
    }
  };

  return (
    <div className="relative">
      <div className="lien-gota aspect-square w-full overflow-hidden shadow-lift">
        <video
          ref={ref}
          className="h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          poster={video.poster}
          aria-hidden="true"
        >
          <source src={video.webm} type="video/webm" />
          <source src={video.mp4} type="video/mp4" />
        </video>
      </div>
      <button
        type="button"
        onClick={alternar}
        aria-label={tocando ? rotuloPausar : rotuloReproduzir}
        className="absolute bottom-[14%] right-[14%] rounded-full bg-white/70 p-2 text-ink backdrop-blur transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
      >
        {tocando ? (
          <Pause size={16} strokeWidth={2} aria-hidden="true" />
        ) : (
          <Play size={16} strokeWidth={2} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
