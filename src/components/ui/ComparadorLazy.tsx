'use client';

import { useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ImageCompareProps } from './image-compare';
import styles from './image-compare-utils/image-compare.module.css';

/**
 * Comparador de antes e depois carregado sob demanda (nov/2026, desempenho).
 *
 * O ImageCompare depende do motion/react (~45 KB). Aqui o HTML estatico e o
 * primeiro quadro identico ao do comparador parado (divisor em 50%, rotulos e
 * alca), com as mesmas classes; o componente interativo so e baixado quando o
 * card chega perto da tela (ou ao primeiro toque) e entra no lugar sem salto.
 */
let carregando: Promise<ComponentType<ImageCompareProps>> | null = null;
const carregar = () => (carregando ??= import('./image-compare').then((m) => m.default));

export function ComparadorLazy(props: {
  before: ReactNode;
  after: ReactNode;
  labels: [string, string];
  label: string;
  aspectRatio: string;
}) {
  const [Comp, setComp] = useState<ComponentType<ImageCompareProps> | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ativar = () => carregar().then((c) => setComp(() => c));
    if (typeof IntersectionObserver === 'undefined') {
      ativar();
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          obs.disconnect();
          ativar();
        }
      },
      { rootMargin: '300px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (Comp) return <Comp {...props} />;

  return (
    <div
      ref={ref}
      className={styles.root}
      style={{ aspectRatio: props.aspectRatio }}
      onPointerDown={() => carregar().then((c) => setComp(() => c))}
    >
      <div className={styles.layer}>{props.after}</div>
      <div className={styles.layer} style={{ clipPath: 'inset(0 50% 0 0)' }}>
        {props.before}
      </div>
      <span className={styles.chip} aria-hidden="true">
        {props.labels[0]}
      </span>
      <span className={styles.chip} data-place="end" aria-hidden="true">
        {props.labels[1]}
      </span>
      <div className={styles.pivot} style={{ transform: 'translateX(50%)' }} aria-hidden="true">
        <span className={styles.rotor}>
          <span className={styles.line} />
        </span>
        <span className={styles.handleSlot}>
          <span className={styles.handle} style={{ width: 40, height: 40 }}>
            <span className={styles.chevrons}>
              <span className={styles.chevron}>
                <ChevronLeft size={16} strokeWidth={2} />
              </span>
              <span className={styles.chevron}>
                <ChevronRight size={16} strokeWidth={2} />
              </span>
            </span>
          </span>
        </span>
      </div>
    </div>
  );
}
