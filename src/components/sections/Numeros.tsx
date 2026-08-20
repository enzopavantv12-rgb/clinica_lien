import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Reveal } from '../ui/Reveal';
import { numeros } from '../../data/content';

/** Contador com count-up ao entrar na viewport. Duracao <= 1.2s, uma vez so. */
function Contador({ valor }: { valor: number }) {
  const reduzir = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [atual, setAtual] = useState(reduzir ? valor : 0);
  const jaRodou = useRef(false);

  useEffect(() => {
    if (reduzir) {
      setAtual(valor);
      return;
    }
    const no = ref.current;
    if (!no) return;

    const observer = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas[0]?.isIntersecting;
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
