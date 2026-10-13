'use client';

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, MoveHorizontal, Pause, Play } from 'lucide-react';
import ImageCompare from '@/components/ui/image-compare';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FundoGrade } from '@/components/ui/background-snippets';
import larguras from '@/data/imagens.json';
import { resultados } from '@/data/content';

const LARGURAS = larguras as Record<string, number[]>;

/** Foto do caso com srcset AVIF/WebP (variantes de `npm run images`). */
function Foto({ src, alt }: { src: string; alt: string }) {
  const base = src.replace(/^\/img\//, '').replace(/\.[^.]+$/, '');
  const ws = LARGURAS[base] ?? [];
  const srcset = (ext: string) => ws.map((w) => `/img/${base}-${w}.${ext} ${w}w`).join(', ');
  const sizes = '(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 380px';
  return (
    <picture>
      <source type="image/avif" srcSet={srcset('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
      <img
        src={`/img/${base}-${ws[0]}.webp`}
        alt={alt}
        width={720}
        height={720}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </picture>
  );
}

const ATRASO_RETOMADA = 3000;
const seta =
  'grid h-11 w-11 place-items-center rounded-full border border-brandgray bg-white text-ink transition-colors hover:border-magenta hover:text-magenta disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta';

/**
 * "Resultados que contam historias." — prova clinica (alinhamento final,
 * 3.3.1) em carrossel de uma linha (prompt "resultados-carrossel", out/2026):
 * 3 cards inteiros no desktop, 2 no tablet e 1,15 no celular, passando 1 a
 * cada 4,5 s, em loop.
 *
 * O card de antes e depois (ImageCompare + legenda CFO) NAO mudou: o carrossel
 * so o envolve. Regras para os dois arrastes nao brigarem:
 * - todo gesto que comeca dentro de [data-compare-area] e do comparador: o
 *   Embla ignora (watchDrag) e o autoplay pausa ate 3 s depois de soltar;
 * - as setas do teclado so movem o carrossel quando o foco nao esta na alca
 *   do comparador (que tambem responde as setas);
 * - o carrossel move so o trilho (translate do Embla): nada de scale, rotate
 *   ou filter nos slides, que distorceriam o calculo de posicao do comparador.
 *
 * Largura dos slides e fade das bordas ficam no globals.css
 * (.resultados-slide/.resultados-viewport): o verificador reprova "100%" na
 * marcacao, e os dois dependem de calc com a largura toda.
 *
 * Autoplay pausa no hover, no foco, durante a comparacao, fora da tela, com a
 * aba oculta e pelo botao (WCAG 2.2.2); retoma 3 s depois que o ultimo motivo
 * sai (o botao "pausar" so o usuario desfaz). Movimento reduzido: sem
 * autoplay e troca instantanea.
 */
export function Resultados() {
  const { casos, rotulos, instrucao } = resultados;
  const regiaoRef = useRef<HTMLDivElement>(null);
  const [reduzir, setReduzir] = useState(false);
  const podeLoop = casos.length >= 4;

  const autoplay = useRef(
    Autoplay({
      delay: 4500,
      playOnInit: false,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
    }),
  );

  const [viewportRef, embla] = useEmblaCarousel(
    {
      loop: podeLoop,
      align: 'start',
      duration: 28,
      watchDrag: (_, evt) => !(evt.target as Element | null)?.closest('[data-compare-area]'),
    },
    podeLoop ? [autoplay.current] : [],
  );

  const [selecionado, setSelecionado] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);
  const [podeVoltar, setPodeVoltar] = useState(false);
  const [podeAvancar, setPodeAvancar] = useState(false);
  const [pausadoPeloUsuario, setPausadoPeloUsuario] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const aoMudar = () => setReduzir(mql.matches);
    aoMudar();
    mql.addEventListener('change', aoMudar);
    return () => mql.removeEventListener('change', aoMudar);
  }, []);

  useEffect(() => {
    if (!embla) return;
    const aoSelecionar = () => {
      setSelecionado(embla.selectedScrollSnap());
      setPodeVoltar(embla.canScrollPrev());
      setPodeAvancar(embla.canScrollNext());
    };
    const aoReiniciar = () => {
      setSnaps(embla.scrollSnapList());
      aoSelecionar();
    };
    aoReiniciar();
    embla.on('select', aoSelecionar).on('reInit', aoReiniciar);
    return () => {
      embla.off('select', aoSelecionar).off('reInit', aoReiniciar);
    };
  }, [embla]);

  // --- Autoplay: roda so quando nao ha nenhum motivo de pausa. ---
  const motivos = useRef(new Set<string>(['fora']));
  const temporizador = useRef<number | undefined>(undefined);
  const autoplayAtivo = podeLoop && !reduzir;

  const reavaliar = useCallback(
    (atraso: number) => {
      window.clearTimeout(temporizador.current);
      if (!embla || !autoplayAtivo) return;
      const plugin = autoplay.current;
      if (motivos.current.size > 0) {
        plugin.stop();
        return;
      }
      temporizador.current = window.setTimeout(() => plugin.play(), atraso);
    },
    [embla, autoplayAtivo],
  );

  const pausar = useCallback(
    (motivo: string) => {
      motivos.current.add(motivo);
      reavaliar(0);
    },
    [reavaliar],
  );
  const retomar = useCallback(
    (motivo: string, atraso = ATRASO_RETOMADA) => {
      if (!motivos.current.delete(motivo)) return;
      reavaliar(atraso);
    },
    [reavaliar],
  );

  // Fora da tela e aba oculta.
  useEffect(() => {
    const regiao = regiaoRef.current;
    if (!regiao) return;
    const observador = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? retomar('fora', 0) : pausar('fora')),
      { threshold: 0.3 },
    );
    observador.observe(regiao);
    // A pagina pode ja abrir oculta (aba em segundo plano).
    if (document.hidden) pausar('oculta');
    const aoMudarVisibilidade = () => (document.hidden ? pausar('oculta') : retomar('oculta', 0));
    document.addEventListener('visibilitychange', aoMudarVisibilidade);
    return () => {
      observador.disconnect();
      document.removeEventListener('visibilitychange', aoMudarVisibilidade);
      window.clearTimeout(temporizador.current);
    };
  }, [pausar, retomar]);

  const alternarPausa = () => {
    if (pausadoPeloUsuario) {
      setPausadoPeloUsuario(false);
      retomar('usuario', 0);
    } else {
      setPausadoPeloUsuario(true);
      pausar('usuario');
    }
  };

  const ir = (fn: 'scrollPrev' | 'scrollNext') => embla?.[fn](reduzir);
  const irPara = (i: number) => embla?.scrollTo(i, reduzir);

  const aoTeclar = (e: KeyboardEvent<HTMLDivElement>) => {
    // A alca do comparador tambem usa as setas: ali o carrossel nao se mexe.
    if ((e.target as Element).closest('[data-compare-area]')) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      ir('scrollPrev');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      ir('scrollNext');
    }
  };

  return (
    <section id="resultados" className="relative isolate py-20 sm:py-24 lg:py-28">
      <FundoGrade />
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHeading tag={resultados.tag} titulo={resultados.h2} subtitulo={resultados.apoio} />

        <p className="mt-10 flex items-center justify-center gap-2 text-legend font-medium text-ink-muted">
          <MoveHorizontal size={16} strokeWidth={2} aria-hidden="true" className="text-magenta" />
          {instrucao}
        </p>

        <div
          ref={regiaoRef}
          role="region"
          aria-roledescription="carrossel"
          aria-label="Casos de antes e depois"
          onKeyDown={aoTeclar}
          onMouseEnter={() => pausar('hover')}
          onMouseLeave={() => retomar('hover')}
          onFocusCapture={() => pausar('foco')}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) retomar('foco');
          }}
          className="mt-6"
        >
          <div
            ref={viewportRef}
            className="resultados-viewport overflow-hidden lg:px-6"
            onPointerDownCapture={(e) => {
              if ((e.target as Element).closest('[data-compare-area]')) pausar('comparando');
            }}
            onPointerUpCapture={() => retomar('comparando')}
            onPointerCancelCapture={() => retomar('comparando')}
          >
            <ul className={`flex touch-pan-y gap-4 lg:gap-6 ${podeLoop ? '' : 'justify-center'}`}>
              {casos.map((caso, i) => (
                <li
                  key={caso.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Caso ${i + 1} de ${casos.length}`}
                  className="resultados-slide min-w-0"
                >
                  {/* Card de antes e depois, igual ao da grade anterior. */}
                  <figure className="rounded-[1.75rem] border border-brandgray bg-white p-2.5 shadow-soft">
                    <div data-compare-area="">
                      <ImageCompare
                        before={<Foto {...caso.antes} />}
                        after={<Foto {...caso.depois} />}
                        labels={rotulos}
                        label={`${resultados.rotuloComparar}, caso ${i + 1}`}
                        aspectRatio="1 / 1"
                      />
                    </div>
                    <figcaption className="px-2 pb-1 pt-3 text-legend text-ink-muted">{resultados.autorizacao}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => ir('scrollPrev')}
              disabled={!podeVoltar}
              aria-label="Caso anterior"
              className={`${seta} hidden sm:grid`}
            >
              <ChevronLeft size={18} strokeWidth={2} aria-hidden="true" />
            </button>

            <div className="flex items-center gap-2">
              {snaps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => irPara(i)}
                  aria-label={`Ir para o caso ${i + 1} de ${snaps.length}`}
                  aria-current={i === selecionado ? 'true' : undefined}
                  className={`relative h-2 rounded-full transition-all duration-300 after:absolute after:-inset-2.5 after:content-[''] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta ${
                    i === selecionado ? 'w-6 bg-magenta' : 'w-2 bg-brandgray hover:bg-ink-muted/50'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => ir('scrollNext')}
              disabled={!podeAvancar}
              aria-label="Próximo caso"
              className={`${seta} hidden sm:grid`}
            >
              <ChevronRight size={18} strokeWidth={2} aria-hidden="true" />
            </button>

            {autoplayAtivo && (
              <button
                type="button"
                onClick={alternarPausa}
                aria-label={pausadoPeloUsuario ? 'Retomar passagem automática' : 'Pausar passagem automática'}
                aria-pressed={pausadoPeloUsuario}
                className="grid h-9 w-9 place-items-center rounded-full text-ink-muted transition-colors hover:text-magenta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
              >
                {pausadoPeloUsuario ? (
                  <Play size={16} strokeWidth={2} aria-hidden="true" />
                ) : (
                  <Pause size={16} strokeWidth={2} aria-hidden="true" />
                )}
              </button>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-legend text-ink-muted">{resultados.variacao}</p>
      </div>
    </section>
  );
}
