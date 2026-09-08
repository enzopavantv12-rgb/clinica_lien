'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { Reveal } from '../ui/Reveal';
import { numeros } from '../../data/content';

/** Contador com count-up ao entrar na viewport. Duracao <= 1.2s, uma vez so. */
function Contador({ valor }: { valor: number }) {
  const reduzir = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  // Semeado com o valor REAL: e o que o prerender estatico publica. Se
  // comecasse em 0, o out/index.html sairia com "+0 pacientes" e "0,0 ★" como
  // conteudo rastreavel — durante o prerender `useReducedMotion()` e falso.
  const [atual, setAtual] = useState(valor);
  const jaRodou = useRef(false);

  useEffect(() => {
    // `reduzir` ja e o valor real semeado no useState: nada a fazer.
    if (reduzir) return;
    const no = ref.current;
    // Guard obrigatorio: `useReducedMotion` resolve depois da primeira
    // renderizacao, entao este efeito re-executa. Sem o guard, o zeramento
    // rodava de novo enquanto `jaRodou` bloqueava a segunda animacao — e o
    // contador ficava travado em 0 para o usuario.
    if (!no || jaRodou.current) return;

    let primeiraChamada = true;

    const observer = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas[0]?.isIntersecting ?? false;

        // O IntersectionObserver dispara uma chamada inicial com o estado
        // atual. Se o bloco ja esta na tela nesse momento, o usuario ja leu o
        // numero: manter o valor real e nao animar evita o flash 150 -> 0.
        if (primeiraChamada) {
          primeiraChamada = false;
          if (visivel) {
            jaRodou.current = true;
            observer.disconnect();
            return;
          }
          // Fora da tela: prepara a contagem.
          setAtual(0);
          return;
        }

        if (!visivel || jaRodou.current) return;
        jaRodou.current = true;

        const duracao = 1100;
        const inicio = performance.now();
        const passo = (agora: number) => {
          const t = Math.min(1, (agora - inicio) / duracao);
          // easeOutCubic
          const eased = 1 - Math.pow(1 - t, 3);
          setAtual(Math.round(valor * eased));
          if (t < 1) requestAnimationFrame(passo);
        };
        requestAnimationFrame(passo);
      },
      { threshold: 0.4 },
    );

    observer.observe(no);
    return () => observer.disconnect();
  }, [valor, reduzir]);

  return <span ref={ref}>{atual}</span>;
}

export function Numeros() {
  return (
    <section id="numeros" className="border-y border-brandgray/70 bg-cream py-14 sm:py-16">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-y-12 lg:grid-cols-4">
          {numeros.map((item, i) => (
            <Reveal as="li" key={item.label} delay={i * 0.08} className="text-center">
              <p className="text-stat sm:text-stat-lg font-bold text-magenta">
                {item.prefixo}
                <Contador valor={item.valor} />
                {item.sufixo}
              </p>
              <p className="mx-auto mt-2 max-w-[16ch] text-legend sm:text-legend-lg text-ink-muted">
                {item.label}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
