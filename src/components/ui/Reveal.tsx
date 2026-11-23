'use client';

import { useEffect, useRef } from 'react';

/**
 * Animacao de entrada: fade-in + translate-Y sutil, uma unica vez.
 *
 * Sem biblioteca (nov/2026, desempenho): CSS (.reveal no globals.css) + um
 * IntersectionObserver compartilhado. Antes era o motion/react, ~45 KB de JS
 * so para isso. `prefers-reduced-motion` desativa o movimento (CSS), e sem
 * JS o conteudo aparece (<noscript> no layout).
 */
let observador: IntersectionObserver | null = null;
function observar(el: Element) {
  if (typeof IntersectionObserver === 'undefined') {
    el.classList.add('is-in');
    return () => {};
  }
  observador ??= new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          observador?.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -64px 0px' },
  );
  observador.observe(el);
  return () => observador?.unobserve(el);
}

export function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
  y = 18,
  duracao = 0.55,
  escala,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'article' | 'section';
  /** Deslocamento vertical inicial, em px. */
  y?: number;
  /** Duracao da transicao, em segundos. */
  duracao?: number;
  /** Escala inicial (ex.: 1.04 para a imagem assentar ao entrar). */
  escala?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => (ref.current ? observar(ref.current) : undefined), []);
  const Componente = as as 'div';
  return (
    <Componente
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal ${className}`}
      style={
        {
          '--reveal-y': `${y}px`,
          '--reveal-s': escala ?? 1,
          '--reveal-dur': `${duracao}s`,
          '--reveal-delay': `${delay}s`,
        } as React.CSSProperties
      }
    >
      {children}
    </Componente>
  );
}
