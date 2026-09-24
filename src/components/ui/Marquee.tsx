import type { ComponentPropsWithoutRef, CSSProperties } from 'react';

/**
 * Rolagem continua (marquee), do utilitario do componente marquee-03
 * (21st.dev), sem a dependencia de shadcn: o conteudo e repetido `repeat`
 * vezes e cada copia anda o proprio tamanho + gap, entao o loop fecha sem
 * emenda. Animacoes `marquee` / `marquee-vertical` no tailwind.config.ts.
 *
 * So a primeira copia e lida por leitor de tela (`aria-hidden` nas demais).
 * Movimento reduzido: animacao desligada no globals.css.
 *
 * `duracao` vai por style: uma classe `[--duration:…]` passada de fora
 * empataria em especificidade com a padrao e perderia pela ordem do CSS.
 */
export function Marquee({
  className = '',
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
  duracao = '40s',
  children,
  style,
  ...props
}: ComponentPropsWithoutRef<'div'> & {
  duracao?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
}) {
  return (
    <div
      {...props}
      style={{ ...style, '--duration': duracao } as CSSProperties}
      className={`group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] ${
        vertical ? 'flex-col' : 'flex-row'
      } ${className}`}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          aria-hidden={i > 0 || undefined}
          className={`flex shrink-0 justify-around [gap:var(--gap)] ${
            vertical ? 'animate-marquee-vertical flex-col' : 'animate-marquee flex-row'
          } ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''} ${
            reverse ? '[animation-direction:reverse]' : ''
          }`}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
