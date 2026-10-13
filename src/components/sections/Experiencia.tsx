'use client';

import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { Carrossel } from '../ui/Carrossel';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { experiencia } from '../../data/content';

type Capitulo = (typeof experiencia.capitulos)[number];

const foco =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta';

/**
 * Video de um capitulo. Sem som automatico: so toca por acao do usuario,
 * com os controles nativos. Video vertical (a recepcao, 4:5) fica inteiro no
 * quadro, sobre o proprio poster desfocado — sem cortar o logo da parede.
 */
function VideoCapitulo({ capitulo, carregar }: { capitulo: Capitulo; carregar: boolean }) {
  const { video } = capitulo;
  if (!video) {
    return (
      <div
        role="img"
        aria-label={`${capitulo.titulo}: vídeo ainda não publicado`}
        className="flex h-full w-full flex-col items-center justify-center gap-3 border border-dashed border-ink/20 bg-cream"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-white text-ink-muted shadow-soft">
          <Play size={22} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <p className="text-legend font-semibold uppercase tracking-[0.14em] text-ink-muted">{experiencia.pendente}</p>
      </div>
    );
  }
  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {video.vertical && (
        <div
          aria-hidden="true"
          className="absolute inset-0 scale-110 bg-cover bg-center opacity-60 blur-2xl"
          style={{ backgroundImage: `url(${video.poster})` }}
        />
      )}
      <video
        controls
        playsInline
        preload={carregar ? 'metadata' : 'none'}
        poster={video.poster}
        aria-label={`${capitulo.titulo}: ${video.descricao}`}
        className={`relative h-full w-full ${video.vertical ? 'object-contain' : 'object-cover'}`}
      >
        <source src={video.webm} type="video/webm" />
        <source src={video.mp4} type="video/mp4" />
      </video>
    </div>
  );
}

/**
 * Experiencia Lien — jornada do paciente em 3 capitulos (alinhamento final,
 * 3.9), predominantemente audiovisual.
 *
 * - Tablet e desktop: player grande + 3 abas (capitulos) abaixo; clicar numa
 *   aba troca o video. Abas no padrao WAI-ARIA (setas, Home/End).
 * - Celular: carrossel com os 3 videos.
 * - Sob cada video, so o titulo. Diferenciais numa linha discreta no fim.
 * - Lazy: nenhum video baixa metadados antes de a secao chegar perto da tela.
 */
export function Experiencia() {
  const secaoRef = useRef<HTMLElement>(null);
  const abasRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [ativo, setAtivo] = useState(0);
  const [perto, setPerto] = useState(false);
  const { capitulos } = experiencia;

  useEffect(() => {
    const secao = secaoRef.current;
    if (!secao) return;
    const observador = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setPerto(true);
          observador.disconnect();
        }
      },
      { rootMargin: '400px 0px' },
    );
    observador.observe(secao);
    return () => observador.disconnect();
  }, []);

  const aoTeclarAba = (e: React.KeyboardEvent, i: number) => {
    const ultimo = capitulos.length - 1;
    const destino =
      e.key === 'ArrowRight' ? (i === ultimo ? 0 : i + 1)
      : e.key === 'ArrowLeft' ? (i === 0 ? ultimo : i - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? ultimo
      : null;
    if (destino === null) return;
    e.preventDefault();
    setAtivo(destino);
    abasRef.current[destino]?.focus();
  };

  const atual = capitulos[ativo];

  return (
    <section ref={secaoRef} id="experiencia" className="overflow-x-clip bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHeading tag={experiencia.tag} titulo={experiencia.h2} subtitulo={experiencia.texto} />

        {/* Tablet e desktop: player + abas */}
        <Reveal className="mt-14 hidden md:block">
          <div
            role="tabpanel"
            id="experiencia-painel"
            aria-labelledby={`experiencia-aba-${ativo}`}
            className="aspect-video overflow-hidden rounded-[32px] shadow-lift"
          >
            {/* `key`: trocar de capitulo desmonta o video anterior (para de tocar). */}
            <VideoCapitulo key={atual.numero} capitulo={atual} carregar={perto} />
          </div>

          <div role="tablist" aria-label={experiencia.regiao} className="mt-5 grid grid-cols-3 gap-4">
            {capitulos.map((c, i) => {
              const selecionado = i === ativo;
              return (
                <button
                  key={c.numero}
                  ref={(el) => {
                    abasRef.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`experiencia-aba-${i}`}
                  aria-selected={selecionado}
                  aria-controls="experiencia-painel"
                  tabIndex={selecionado ? 0 : -1}
                  onClick={() => setAtivo(i)}
                  onKeyDown={(e) => aoTeclarAba(e, i)}
                  className={`flex min-h-[72px] items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-colors duration-200 ${
                    selecionado
                      ? 'border-magenta bg-magenta text-white'
                      : 'border-brandgray bg-white text-ink hover:border-magenta/50'
                  } ${foco}`}
                >
                  <span className={`text-[1.5rem] font-black leading-none ${selecionado ? 'text-white' : 'text-magenta'}`}>
                    {c.numero}
                  </span>
                  <span className="text-[0.9375rem] font-semibold leading-snug lg:text-base">{c.titulo}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Celular: carrossel com os 3 videos */}
        <div className="mt-12 md:hidden">
          <Carrossel
            rotulo={experiencia.regiao}
            rotuloSlide="Vídeo"
            anterior={experiencia.anterior}
            proximo={experiencia.proximo}
            classeSlide="w-[82vw] max-w-[340px]"
            classeTrilho="-mr-5 rounded-l-3xl"
            slides={capitulos.map((c) => (
              <figure key={c.numero}>
                <div className="aspect-[4/5] overflow-hidden rounded-3xl">
                  <VideoCapitulo capitulo={c} carregar={false} />
                </div>
                <figcaption className="mt-3 flex items-baseline gap-2.5 text-[0.9375rem] font-semibold text-ink">
                  <span className="font-black text-magenta">{c.numero}</span>
                  {c.titulo}
                </figcaption>
              </figure>
            ))}
          />
        </div>

        <p className="mx-auto mt-12 max-w-[68ch] text-center text-legend sm:text-legend-lg text-ink-muted">
          {experiencia.diferenciais}
        </p>
      </div>
    </section>
  );
}
