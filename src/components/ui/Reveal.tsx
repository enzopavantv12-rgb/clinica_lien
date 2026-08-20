import { motion, useReducedMotion } from 'framer-motion';

/**
 * Animacao de entrada: fade-in + translate-Y sutil, uma unica vez.
 * `prefers-reduced-motion` desativa completamente o movimento — requisito de
 * acessibilidade do prompt mestre.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'article' | 'section';
}) {
  const reduzir = useReducedMotion();
  const Componente = motion[as];

  if (reduzir) {
    const Estatico = as;
    return <Estatico className={className}>{children}</Estatico>;
  }

  return (
    <Componente
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-64px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Componente>
  );
}
