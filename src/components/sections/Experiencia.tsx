'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { PadraoOndas } from '../ui/BrandGraphics';
import { Reveal } from '../ui/Reveal';
import { experiencia } from '../../data/content';

const { capitulos } = experiencia;

/** Poster neutro enquanto o video nao chega: escuro, com o arco do sorriso em rosa a 20%. */
function PosterPendente() {
  return (
    <div aria-hidden="true" className="absolute inset-0 grid place-items-center bg-[#14141A]">
      <svg viewBox="0 0 380 120" fill="none" className="w-[46%] max-w-[420px] opacity-20">
        <path d="M20 22 Q190 196 360 22" stroke="#F0B6F2" strokeWidth={22} strokeLinecap="round" />
      </svg>
    </div>
  );
}

/**
 * Experiencia Lien — print aprovado (prompt "experiencia-lien", out/2026),
 * layout e copy do print por decisao da clinica: cabecalho centralizado e um
 * player escuro largo (1260px) com o texto do capitulo sobreposto e a barra
 * de 3 abas na base.
 *
 * - Nada toca sozinho com som: o play reinicia o video com som e controles
 *   nativos; ao pausar ou terminar, o texto volta. Ao terminar, seleciona o
 *   capitulo seguinte sem tocar. Sem preview mudo (so o poster).
 * - Lazy: os metadados so carregam quando a secao chega a 200px da tela.
 * - Capitulo sem video: poster neutro e o texto, sem botao de play.
 * - Abas ARIA (setas, Home/End); o player e o tabpanel. A partir de 640px a
 *   barra fica sobreposta; abaixo disso, pills escuras abaixo do player.
 * - Numeros dos capitulos em branco, e nao no rosa do print: o manual veda o
 *   rosa-claro como cor de texto (decisao do usuario). O rosa fica na barra
 *   de progresso e na borda da pill ativa.
 * - Tag teal sobre branco com borda: sobre #E3F1F4 o teal reprova AA.
 */
export function Experiencia() {
  const secaoRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const abasRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [ativo, setAtivo] = useState(0);
  const [tocando, setTocando] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [perto, setPerto] = useState(false);
  const c = capitulos[ativo];

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
      { rootMargin: '200px' },
    );
    observador.observe(secao);
    return () => observador.disconnect();
  }, []);

  // Trocar de capitulo: para o video, zera o progresso e volta ao "pronto para play".
  useEffect(() => {
    setTocando(false);
    setProgresso(0);
    videoRef.current?.load();
  }, [ativo]);

  const tocar = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.currentTime = 0;
    void v.play();
    setTocando(true);
  };

  const aoTeclar = (e: KeyboardEvent, i: number, prefixo: string) => {
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

  const foco = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#F0B6F2]';

  return (
    <section
      ref={secaoRef}
      id="experiencia"
      aria-labelledby="exp-title"
      className="relative isolate overflow-hidden bg-white py-[72px] lg:py-[104px]"
    >
      <PadraoOndas className="pointer-events-none absolute inset-0 -z-10 h-full w-full" cor="#9C1781" opacidade={0.05} />

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
          id="exp-panel"
          role="tabpanel"
          aria-labelledby={`exp-tab-${ativo}`}
          className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/[.08] bg-[#0F1116] shadow-[0_30px_70px_-30px_rgba(26,20,32,.45)] sm:aspect-video lg:aspect-[16/7.6] lg:rounded-[18px]"
        >
          {c.video ? (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              poster={c.video.poster}
              playsInline
              preload={perto ? 'metadata' : 'none'}
              controls={tocando}
              onPause={() => setTocando(false)}
              onEnded={() => {
                setTocando(false);
                setAtivo((a) => (a + 1) % capitulos.length);
              }}
              onTimeUpdate={(e) => {
                const v = e.currentTarget;
                setProgresso(v.duration ? v.currentTime / v.duration : 0);
              }}
            >
              <source src={c.video.webm} type="video/webm" />
              <source src={c.video.mp4} type="video/mp4" />
              {c.video.vtt && <track kind="captions" src={c.video.vtt} srcLang="pt-BR" label="Português" default />}
            </video>
          ) : (
            <PosterPendente />
          )}

          {/* Overlay de leitura: escurece a esquerda e a base. */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(10,12,16,.72),rgba(10,12,16,.35)_45%,rgba(10,12,16,0)_70%),linear-gradient(0deg,rgba(10,12,16,.75),rgba(10,12,16,0)_40%)] transition-opacity duration-300 ${
              tocando ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {!tocando && (
            <>
              {c.video && (
                <button
                  type="button"
                  onClick={tocar}
                  aria-label={`${experiencia.reproduzir}: ${c.titulo}`}
                  className="absolute left-1/2 top-1/2 grid h-[58px] w-[58px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-white/[.14] backdrop-blur-md transition hover:scale-[1.06] hover:bg-white/[.24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0B6F2] motion-reduce:transition-none"
                >
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="ml-0.5 h-4 w-4 fill-white">
                    <path d="M4 2.5v11l9-5.5z" />
                  </svg>
                </button>
              )}

              <div
                key={ativo}
                className="anima-sobe absolute bottom-6 left-5 right-5 max-w-[520px] sm:bottom-[100px] sm:left-7 lg:bottom-[112px] lg:left-11"
              >
                <span className="text-[13px] font-bold tracking-[.04em] text-white">{c.numero}</span>
                <h3 className="mt-2.5 text-[22px] font-bold leading-[1.2] text-white sm:text-[24px] lg:text-[clamp(22px,2.2vw,30px)]">
                  {c.titulo}
                </h3>
                <p className="mt-[18px] text-[13px] font-medium leading-[1.65] text-white/[.92] sm:text-[13.5px] lg:text-[14.5px]">
                  {c.linhas[0]} <br className="hidden sm:inline" />
                  {c.linhas[1]}
                </p>
              </div>
            </>
          )}

          {/* Barra de abas sobreposta (a partir de 640px). */}
          <div
            role="tablist"
            aria-label={experiencia.abas}
            className="absolute bottom-4 left-4 right-4 hidden grid-cols-3 overflow-hidden rounded-xl border border-white/10 bg-[rgba(14,18,24,.72)] backdrop-blur-[10px] sm:grid"
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
                  onKeyDown={(e) => aoTeclar(e, i, 'd')}
                  className={`relative flex min-h-[66px] items-center gap-2.5 px-[18px] text-left transition-colors ${
                    i > 0 ? 'border-l border-white/[.12]' : ''
                  } ${sel ? 'bg-white/[.06]' : 'hover:bg-white/[.05]'} ${foco}`}
                >
                  <span className="text-[13px] font-bold text-white">{t.numero}</span>
                  <span className={`text-[14.5px] font-semibold ${sel ? 'text-white' : 'text-white/80'}`}>{t.aba}</span>
                  {sel && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-0.5 bg-[#F0B6F2] transition-[width] duration-200"
                      style={{ width: `${progresso * 100}%` }}
                    />
                  )}
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
                onKeyDown={(e) => aoTeclar(e, i, 'm')}
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
      </Reveal>
    </section>
  );
}
