'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { Simbolo } from './BrandGraphics';

type DadosVideo = { webm: string; mp4: string; poster: string };

/**
 * Video da secao Sobre com "efeito GIF": sozinho, sem som, sem controles
 * nativos, em loop — dentro de uma moldura com o topo em arco (o sorriso da
 * marca). Nunca um .gif real.
 *
 * - Com movimento reduzido ou `navigator.connection.saveData`, o <video> nem
 *   e montado: so o poster. Por isso o video entra so no cliente, depois
 *   dessa checagem (o HTML estatico sai com o poster).
 * - IntersectionObserver: play so com a secao visivel, pause ao sair.
 * - Botao discreto de pausa: loop acima de 5s exige controle (WCAG 2.2.2).
 * - Sem video cadastrado: placeholder neutro, fundo cream com o arco teal.
 */
export function VideoArco({
  video,
  rotuloPausar,
  rotuloReproduzir,
  className = '',
}: {
  video: DadosVideo | null;
  rotuloPausar: string;
  rotuloReproduzir: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [permitido, setPermitido] = useState(false);
  const [pausadoPeloUsuario, setPausadoPeloUsuario] = useState(false);
  const [tocando, setTocando] = useState(false);

  useEffect(() => {
    if (!video) return;
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const economia = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    setPermitido(!reduzir && !economia);
  }, [video]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !permitido) return;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting && !pausadoPeloUsuario) {
          el.play().then(() => setTocando(true), () => setTocando(false));
        } else {
          el.pause();
          setTocando(false);
        }
      },
      { threshold: 0.25 },
    );
    observador.observe(el);
    return () => observador.disconnect();
  }, [permitido, pausadoPeloUsuario]);

  const alternar = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      setPausadoPeloUsuario(false);
      el.play().then(() => setTocando(true), () => setTocando(false));
    } else {
      setPausadoPeloUsuario(true);
      el.pause();
      setTocando(false);
    }
  };

  const moldura = `lien-arco relative aspect-[380/480] overflow-hidden border-[6px] border-cream bg-cream shadow-lift ${className}`;

  if (!video) {
    return (
      <div className={`${moldura} flex items-center justify-center`}>
        <Simbolo variante="rgb" className="block h-auto w-1/3 opacity-80" />
      </div>
    );
  }

  return (
    <div className={moldura}>
      {permitido ? (
        <video
          ref={ref}
          className="h-full w-full object-cover"
          // autoPlay e seguro aqui: o <video> so e montado depois da checagem
          // de movimento reduzido e economia de dados. O observador abaixo
          // pausa quando a secao sai da tela.
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          preload="metadata"
          poster={video.poster}
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={video.webm} type="video/webm" />
          <source src={video.mp4} type="video/mp4" />
        </video>
      ) : (
        <img src={video.poster} alt="" className="h-full w-full object-cover" loading="lazy" />
      )}
      {permitido && (
        <button
          type="button"
          onClick={alternar}
          aria-label={tocando ? rotuloPausar : rotuloReproduzir}
          className="absolute bottom-4 right-4 rounded-full bg-white/70 p-2 text-ink backdrop-blur transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
        >
          {tocando ? (
            <Pause size={16} strokeWidth={2} aria-hidden="true" />
          ) : (
            <Play size={16} strokeWidth={2} aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  );
}
