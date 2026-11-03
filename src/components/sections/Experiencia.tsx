'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { PadraoOndas, Simbolo } from '../ui/BrandGraphics';
import { Reveal } from '../ui/Reveal';
import { SemQuebraNoHifen } from '../ui/SemQuebraNoHifen';
import { experiencia } from '../../data/content';

const { capitulos } = experiencia;

/** Poster neutro enquanto o video nao chega: escuro, com o simbolo oficial (ciano) a 25%. */
function PosterPendente() {
  return (
    <div aria-hidden="true" className="absolute inset-0 grid place-items-center bg-[#14141A]">
      <Simbolo variante="cyano" className="h-auto w-[46%] max-w-[420px] opacity-25" />
    </div>
  );
}

/**
 * Fundo do slide: o proprio quadro do video ampliado e desfocado (a paleta
 * do video ocupa o player inteiro) e um degrade leve nas laterais.
 */
function FundoVertical({ src }: { src: string }) {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 scale-125 bg-cover bg-center blur-3xl"
        style={{ backgroundImage: `url(${src})` }}
      />
      <div aria-hidden="true" className="exp-laterais absolute inset-0" />
    </>
  );
}

const INTERVALO = 5000;

/**
 * Experiencia Lien — cabecalho centralizado e um player largo com os 3
 * capitulos e a barra de abas na base.
 *
 * Slider com crossfade (pedido da clinica, nov/2026): os 3 slides ficam
 * empilhados e a troca e so por opacidade (0,8s), sem deslizar. Cada slide
 * tem o fundo desfocado do proprio video, o texto do capitulo a esquerda e o
 * video na VERTICAL, no formato original (9:16 inteiro, sem corte nem bordas
 * esfumadas), a direita.
 *
 * - Autoplay: passa ao proximo capitulo a cada 5s, em loop, so com a secao na
 *   tela. Pausa no hover, no foco, com a aba oculta e enquanto um video toca.
 *   Movimento reduzido: sem autoplay e troca instantanea.
 * - Nada toca sozinho com som: o play reinicia o video com som e controles
 *   nativos. Ao terminar, passa ao capitulo seguinte sem tocar.
 * - Abas ARIA (setas, Home/End) e setas do teclado com o foco no slider. A
 *   barra rosa da aba mostra o tempo do autoplay ou o progresso do video.
 *   Slides inativos com aria-hidden e inert.
 * - A partir de 640px as abas ficam sobrepostas; abaixo, pills sob o player.
 * - Numeros em branco (o manual veda o rosa-claro como texto); tag teal sobre
 *   branco com borda (sobre #E3F1F4 o teal reprova AA).
 */
export function Experiencia() {
  const secaoRef = useRef<HTMLElement>(null);
  const videosRef = useRef<(HTMLVideoElement | null)[]>([]);
  const abasRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [ativo, setAtivo] = useState(0);
  const [tocando, setTocando] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [perto, setPerto] = useState(false);
  const [naTela, setNaTela] = useState(false);
  const [hover, setHover] = useState(false);
  const [foco, setFoco] = useState(false);
  const [oculta, setOculta] = useState(false);
  const [reduzir, setReduzir] = useState(false);

  // Carrega os metadados perto da secao; o autoplay so roda com ela na tela.
  useEffect(() => {
    const secao = secaoRef.current;
    if (!secao) return;
    const perto = new IntersectionObserver(([e]) => e.isIntersecting && setPerto(true), { rootMargin: '200px' });
    const tela = new IntersectionObserver(([e]) => setNaTela(e.isIntersecting), { threshold: 0.35 });
    perto.observe(secao);
    tela.observe(secao);
    return () => {
      perto.disconnect();
      tela.disconnect();
    };
  }, []);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const aoMudar = () => setReduzir(mql.matches);
    aoMudar();
    mql.addEventListener('change', aoMudar);
    const aoVisibilidade = () => setOculta(document.hidden);
    aoVisibilidade();
    document.addEventListener('visibilitychange', aoVisibilidade);
    return () => {
      mql.removeEventListener('change', aoMudar);
      document.removeEventListener('visibilitychange', aoVisibilidade);
    };
  }, []);

  // Trocar de capitulo: para os videos e volta ao "pronto para play".
  useEffect(() => {
    setTocando(false);
    setProgresso(0);
    // So recarrega o que ja tocou: load() volta ao poster. Mexer no
    // currentTime de um video parado trocaria o poster pelo 1o quadro.
    videosRef.current.forEach((v) => {
      if (v && (!v.paused || v.currentTime > 0)) {
        v.pause();
        v.load();
      }
    });
  }, [ativo]);

  const autoplay = !reduzir && naTela && !hover && !foco && !oculta && !tocando;

  useEffect(() => {
    if (!autoplay) return;
    const t = window.setTimeout(() => setAtivo((a) => (a + 1) % capitulos.length), INTERVALO);
    return () => window.clearTimeout(t);
  }, [autoplay, ativo]);

  const tocar = () => {
    const v = videosRef.current[ativo];
    if (!v) return;
    v.muted = false;
    v.currentTime = 0;
    void v.play();
    setTocando(true);
  };

  const irPara = (destino: number) => setAtivo((destino + capitulos.length) % capitulos.length);

  const aoTeclarAba = (e: KeyboardEvent, i: number, prefixo: string) => {
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
    abasRef.current[destino + (prefixo === 'm' ? capitulos.length : 0)]?.focus();
  };

  // Setas com o foco em qualquer ponto do slider (as abas tratam as suas).
  const aoTeclarSlider = (e: KeyboardEvent) => {
    if (e.defaultPrevented || (e.target as Element).closest('video')) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      irPara(ativo + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      irPara(ativo - 1);
    }
  };

  const botaoPlay =
    'grid h-[58px] w-[58px] place-items-center rounded-full border border-white/25 bg-white/[.14] backdrop-blur-md transition hover:scale-[1.06] hover:bg-white/[.24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0B6F2] motion-reduce:transition-none';
  const focoAba = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#F0B6F2]';
  const fade = reduzir ? '' : 'transition-opacity duration-[800ms] ease-in-out';

  return (
    <section
      ref={secaoRef}
      id="experiencia"
      aria-labelledby="exp-title"
      className="relative isolate overflow-hidden bg-white py-[72px] lg:py-[104px]"
    >
      <PadraoOndas className="pointer-events-none absolute inset-0 -z-10 h-full w-full" cor="#9C1781" opacidade={0.035} ladrilho={130} />

      <Reveal y={16} duracao={0.6} className="mx-auto max-w-[760px] px-6 text-center">
        <span className="inline-block rounded-full border border-[#DCEBEF] bg-white px-4 py-[7px] text-xs font-semibold uppercase leading-none tracking-[.14em] text-teal">
          {experiencia.tag}
        </span>
        <h2 id="exp-title" className="mt-[14px] text-[clamp(30px,3.2vw,42px)] font-bold leading-[1.15] text-ink">
          {experiencia.h2}
        </h2>
        <p className="mt-[18px] text-[clamp(16px,1.4vw,19px)] font-light leading-[1.65] text-ink-muted">
          {experiencia.subLinhas[0]} <br className="hidden md:inline" />
          {experiencia.subLinhas[1]}
        </p>
      </Reveal>

      <Reveal y={16} duracao={0.6} delay={0.1} className="mx-auto mt-16 max-w-[1260px] px-6">
        <div
          role="region"
          aria-roledescription="carrossel"
          aria-label={experiencia.abas}
          onKeyDown={aoTeclarSlider}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onFocusCapture={() => setFoco(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFoco(false);
          }}
        >
          <div
            id="exp-panel"
            role="tabpanel"
            aria-labelledby={`exp-tab-${ativo}`}
            className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/[.08] bg-[#0F1116] shadow-[0_30px_70px_-30px_rgba(26,20,32,.45)] sm:aspect-video lg:aspect-[16/7.6] lg:rounded-[18px]"
          >
            {capitulos.map((cap, i) => {
              const sel = i === ativo;
              const video = cap.video?.tipo === 'arquivo' ? cap.video : null;
              return (
                <div
                  key={cap.numero}
                  aria-hidden={!sel}
                  inert={!sel}
                  className={`absolute inset-0 ${fade} ${sel ? 'z-[1] opacity-100' : 'pointer-events-none opacity-0'}`}
                >
                  {video ? (
                    <>
                      {video.fundo && <FundoVertical src={video.fundo} />}
                      {/* Leitura: escurece de leve a esquerda e a base. */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(10,12,16,.42),rgba(10,12,16,.22)_40%,rgba(10,12,16,0)_60%),linear-gradient(0deg,rgba(10,12,16,.55),rgba(10,12,16,0)_32%)]"
                      />
                      {/* Video na vertical, inteiro (9:16), a direita a partir de
                          640px e no topo do card no celular. */}
                      <div className="absolute left-1/2 top-4 h-[calc(62%-16px)] -translate-x-1/2 sm:bottom-[98px] sm:left-auto sm:right-[7%] sm:top-6 sm:h-auto sm:translate-x-0">
                        <div className="relative aspect-[9/16] h-full overflow-hidden rounded-xl shadow-[0_20px_50px_-20px_rgba(0,0,0,.6)] ring-1 ring-white/10">
                          <video
                            ref={(el) => {
                              videosRef.current[i] = el;
                            }}
                            className="h-full w-full object-cover"
                            poster={video.poster}
                            playsInline
                            preload={perto ? 'metadata' : 'none'}
                            controls={sel && tocando}
                            aria-label={`${cap.titulo}: ${video.descricao}`}
                            onPause={() => sel && setTocando(false)}
                            onEnded={() => {
                              setTocando(false);
                              irPara(i + 1);
                            }}
                            onTimeUpdate={(e) => {
                              const v = e.currentTarget;
                              if (sel) setProgresso(v.duration ? v.currentTime / v.duration : 0);
                            }}
                          >
                            <source src={video.webm} type="video/webm" />
                            <source src={video.mp4} type="video/mp4" />
                            {video.vtt && <track kind="captions" src={video.vtt} srcLang="pt-BR" label="Português" default />}
                          </video>
                          {!(sel && tocando) && (
                            <div className="absolute inset-0 grid place-items-center">
                              <button
                                type="button"
                                onClick={tocar}
                                aria-label={`${experiencia.reproduzir}: ${cap.titulo}`}
                                className={botaoPlay}
                              >
                                <svg aria-hidden="true" viewBox="0 0 16 16" className="ml-0.5 h-4 w-4 fill-white">
                                  <path d="M4 2.5v11l9-5.5z" />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <PosterPendente />
                  )}

                  {/* Texto do capitulo: a esquerda a partir de 640px; no celular, na base. */}
                  <div className="pointer-events-none absolute bottom-5 left-5 right-5 sm:bottom-[98px] sm:left-8 sm:right-auto sm:top-0 sm:flex sm:w-[50%] sm:flex-col sm:justify-center lg:left-12 lg:w-[46%]">
                    <span className="text-[13px] font-bold tracking-[.04em] text-white sm:text-sm">{cap.numero}</span>
                    <h3 className="mt-2 text-[22px] font-bold leading-[1.15] text-white sm:mt-2.5 sm:text-[28px] lg:text-[clamp(30px,3vw,42px)]">
                      {cap.titulo}
                    </h3>
                    <p className="mt-3 text-[13px] font-medium leading-[1.6] text-white/[.92] sm:mt-[18px] sm:text-[15px] lg:text-[17px]">
                      <SemQuebraNoHifen texto={cap.linhas[0]} /> <br className="hidden sm:inline" />
                      <SemQuebraNoHifen texto={cap.linhas[1]} />
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Barra de abas sobreposta (a partir de 640px). */}
            <div
              role="tablist"
              aria-label={experiencia.abas}
              className="absolute bottom-4 left-4 right-4 z-[2] hidden grid-cols-3 overflow-hidden rounded-xl border border-white/10 bg-[rgba(14,18,24,.72)] backdrop-blur-[10px] sm:grid"
            >
              {capitulos.map((t, i) => {
                const sel = i === ativo;
                return (
                  <button
                    key={t.numero}
                    ref={(el) => {
                      abasRef.current[i] = el;
                    }}
                    id={`exp-tab-${i}`}
                    type="button"
                    role="tab"
                    aria-selected={sel}
                    aria-controls="exp-panel"
                    tabIndex={sel ? 0 : -1}
                    onClick={() => setAtivo(i)}
                    onKeyDown={(e) => aoTeclarAba(e, i, 'd')}
                    className={`relative flex min-h-[66px] items-center gap-2.5 px-[18px] text-left transition-colors ${
                      i > 0 ? 'border-l border-white/[.12]' : ''
                    } ${sel ? 'bg-white/[.06]' : 'hover:bg-white/[.05]'} ${focoAba}`}
                  >
                    <span className="text-[13px] font-bold text-white">{t.numero}</span>
                    <span className={`text-[14.5px] font-semibold ${sel ? 'text-white' : 'text-white/80'}`}>{t.aba}</span>
                    {sel &&
                      (tocando ? (
                        <span
                          aria-hidden="true"
                          className="absolute bottom-0 left-0 h-0.5 bg-[#F0B6F2] transition-[width] duration-200"
                          style={{ width: `${progresso * 100}%` }}
                        />
                      ) : (
                        !reduzir && (
                          // Tempo do autoplay: enche em 5s; pausa junto com ele.
                          <span
                            key={ativo}
                            aria-hidden="true"
                            className="exp-timer absolute bottom-0 left-0 h-0.5 bg-[#F0B6F2]"
                            style={{ animationDuration: `${INTERVALO}ms`, animationPlayState: autoplay ? 'running' : 'paused' }}
                          />
                        )
                      ))}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Celular: abas como pills abaixo do player. */}
          <div
            role="tablist"
            aria-label={experiencia.abas}
            className="mt-3 flex snap-x gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden"
          >
            {capitulos.map((t, i) => {
              const sel = i === ativo;
              return (
                <button
                  key={t.numero}
                  ref={(el) => {
                    abasRef.current[i + capitulos.length] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={sel}
                  aria-controls="exp-panel"
                  tabIndex={sel ? 0 : -1}
                  onClick={() => setAtivo(i)}
                  onKeyDown={(e) => aoTeclarAba(e, i, 'm')}
                  className={`min-h-11 shrink-0 snap-start rounded-full border bg-[#14181F] px-4 py-2.5 text-[13px] font-semibold ${
                    sel ? 'border-[#F0B6F2] text-white' : 'border-transparent text-white/80'
                  } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta`}
                >
                  <span className="mr-1.5 font-bold text-white">{t.numero}</span>
                  {t.aba}
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
