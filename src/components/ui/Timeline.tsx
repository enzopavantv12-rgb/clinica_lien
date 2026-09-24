'use client';

import { useLayoutEffect, useRef, useSyncExternalStore, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

/**
 * Linha do tempo horizontal com scroll (adaptada do "Timeline" da Hyperiux
 * Vault). A secao fixa na tela, o trilho desliza para o lado conforme a
 * rolagem e cada etapa desenha a haste, o ponto e revela o texto linha a linha.
 *
 * Diferencas em relacao ao original:
 * - Dados por props (as etapas vem do content.ts), sem datas.
 * - Sem foto de banco de imagens: o primeiro bloco do trilho e um painel da
 *   marca com o titulo da secao (regra do projeto: nunca stock photo).
 * - Posicoes calculadas pela geometria (variaveis CSS em .timeline-trilho, no
 *   globals.css), nao por uma tabela fixa de 7 itens. As revelacoes usam
 *   `containerAnimation`, entao disparam quando a etapa entra na tela.
 * - Pin do proprio ScrollTrigger, com a distancia de rolagem igual a distancia
 *   horizontal real — sem altura magica de 200vw.
 * - Movimento reduzido: o trilho ainda acompanha a rolagem (movimento
 *   controlado pelo proprio visitante), mas nada aparece sozinho — todo o
 *   texto ja esta visivel.
 * - Todo o texto sai no HTML estatico; o GSAP so o esconde depois de montar.
 */

export type EtapaTimeline = {
  numero: string;
  titulo: string;
  texto: string;
};

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function assinarMovimentoReduzido(callback: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function usePrefereMovimentoReduzido() {
  return useSyncExternalStore(
    assinarMovimentoReduzido,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

export function Timeline({
  id,
  etapas,
  painel,
}: {
  id: string;
  etapas: readonly EtapaTimeline[];
  /** Conteudo do painel de abertura do trilho (titulo da secao). */
  painel: ReactNode;
}) {
  const secaoRef = useRef<HTMLElement>(null);
  const trilhoRef = useRef<HTMLDivElement>(null);
  const reduzir = usePrefereMovimentoReduzido();

  useLayoutEffect(() => {
    const secao = secaoRef.current;
    const trilho = trilhoRef.current;
    if (!secao || !trilho) return;

    const ctx = gsap.context(() => {
      const distancia = () => Math.max(0, trilho.scrollWidth - window.innerWidth);
      const mobile = window.innerWidth < 768;

      const deslize = gsap.to(trilho, {
        x: () => -distancia(),
        ease: 'none',
        scrollTrigger: {
          trigger: secao,
          start: 'top top',
          end: () => `+=${distancia()}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.fromTo(
        '.timeline-progresso',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          // Mesmo intervalo do deslize: a linha termina cheia junto com o pin.
          scrollTrigger: {
            trigger: secao,
            start: 'top top',
            end: () => `+=${distancia()}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );

      if (reduzir) return;

      gsap.utils.toArray<HTMLElement>('.timeline-etapa').forEach((etapa) => {
        const haste = etapa.querySelector('.timeline-haste');
        const ponto = etapa.querySelector('.timeline-ponto');
        const textos = etapa.querySelectorAll('[data-split]');

        // autoSplit refaz a divisao em linhas quando a largura muda; o
        // onSplit recria a animacao sobre as linhas novas.
        SplitText.create(textos, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) =>
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: etapa,
                  containerAnimation: deslize,
                  // A ultima etapa para em ~65% da tela no desktop (e ~7% no
                  // mobile): o fim precisa ficar antes disso, senao o pin
                  // acaba com a revelacao pela metade.
                  start: mobile ? 'left 90%' : 'left 100%',
                  end: mobile ? 'left 40%' : 'left 72%',
                  scrub: true,
                },
              })
              .from(haste, { scaleY: 0, duration: 0.4, ease: 'none' })
              .from(ponto, { scale: 0, duration: 0.4, ease: 'none' }, '<')
              .from(self.lines, { yPercent: 110, duration: 1, stagger: 0.06, ease: 'power2.out' }, '<0.15'),
        });
      });
    }, secao);

    return () => ctx.revert();
  }, [reduzir]);

  return (
    <section
      ref={secaoRef}
      id={id}
      className="relative flex h-svh flex-col justify-center overflow-hidden bg-white pt-20 sm:pt-[88px]"
    >
      <div ref={trilhoRef} className="timeline-trilho flex w-max items-stretch gap-[7vw] px-[7vw] md:gap-[4vw] md:px-[5vw]">
        {/* Painel de abertura */}
        <div className="relative w-[85vw] shrink-0 overflow-hidden rounded-3xl bg-magenta p-7 text-white sm:p-10 md:w-[max(34vw,320px)]">
          {painel}
        </div>

        {/* Area da linha do tempo */}
        <ol
          className="timeline-area relative h-[var(--altura)] shrink-0"
          style={{
            width: `calc(var(--inicio) * 2 + ${etapas.length - 1} * var(--passo) + var(--largura))`,
          }}
        >
          {/* Trilho cinza + progresso magenta, na altura do meio */}
          <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-brandgray" />
          <span
            aria-hidden="true"
            className="timeline-progresso absolute inset-x-0 top-1/2 h-px origin-left bg-magenta"
          />

          {etapas.map((etapa, i) => {
            const emCima = i % 2 === 0;
            return (
              <li
                key={etapa.numero}
                className={`timeline-etapa absolute ${emCima ? 'top-0 bottom-1/2' : 'top-1/2 bottom-0'}`}
                style={{
                  left: `calc(var(--inicio) + ${i} * var(--passo))`,
                  width: 'var(--largura)',
                }}
              >
                <span
                  aria-hidden="true"
                  className={`timeline-haste absolute left-0 top-0 h-full w-px bg-magenta ${emCima ? 'origin-bottom' : 'origin-top'}`}
                />
                <span
                  aria-hidden="true"
                  className={`timeline-ponto absolute left-0 size-3 -translate-x-1/2 rounded-full bg-magenta ring-4 ring-white ${
                    emCima ? 'bottom-0 translate-y-1/2' : 'top-0 -translate-y-1/2'
                  }`}
                />
                <div
                  className={`flex h-full flex-col pl-5 pr-4 sm:pl-6 ${emCima ? 'justify-start pb-7 baixa:pb-5' : 'justify-end pt-7 baixa:pt-5'}`}
                >
                  <span
                    data-split
                    aria-hidden="true"
                    className="block text-[2.5rem] font-black leading-none text-magenta lg:text-[3.25rem] baixa:text-[2.25rem]"
                  >
                    {etapa.numero}
                  </span>
                  <h3 className="mt-3 text-h3 font-semibold text-ink sm:text-h3-lg baixa:mt-2 baixa:text-h3">
                    <span className="sr-only">Etapa {etapa.numero}: </span>
                    <span data-split className="block">
                      {etapa.titulo}
                    </span>
                  </h3>
                  <p data-split className="mt-2.5 text-body text-ink-muted sm:text-body-lg baixa:mt-2 baixa:text-body">
                    {etapa.texto}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
