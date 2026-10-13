import type { ReactNode } from 'react';

/**
 * Icones duotone dos 10 tratamentos (prompt "tratamentos-lien", out/2026):
 * corpo preenchido a 18% + detalhes em linha, traco arredondado, na cor do
 * `currentColor` (magenta ou teal, conforme a variante do card). Desenhados
 * aqui porque o projeto nao tinha esse conjunto. Decorativos (aria-hidden).
 */

/** Silhueta de dente (coroa + duas raizes) usada em varios icones. */
const DENTE =
  'M10.5 5C7.7 5 6 7.2 6 10c0 3 1.2 5 2 8 .8 3 1 9 3.2 9 1.9 0 1.6-6 3.3-6h3c1.7 0 1.4 6 3.3 6 2.2 0 2.4-6 3.2-9 .8-3 2-5 2-8 0-2.8-1.7-5-4.5-5-2 0-3.2 1-5.5 1S12.5 5 10.5 5Z';

function Base({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {children}
    </svg>
  );
}

const corpo = { fill: 'currentColor', fillOpacity: 0.18 } as const;

const ICONES: Record<string, (p: { className?: string }) => ReactNode> = {
  // Dente sobre o parafuso do implante, com tracos "digitais".
  'implantodontia-digital': ({ className }) => (
    <Base className={className}>
      <path {...corpo} d="M10 5.5c0-1.6 1.5-2.8 3.2-2.8 1.2 0 2 .5 2.8.5s1.6-.5 2.8-.5c1.7 0 3.2 1.2 3.2 2.8 0 2.4-1.2 4.4-2 6H12c-.8-1.6-2-3.6-2-6Z" />
      <path d="M12.5 14.5h7M13 17.5h6M13.5 20.5h5M14.2 23.5h3.6M16 23.5V28" />
      <path d="M5 7h2.2M24.8 7H27M6.3 2.8l1.5 1.5M25.7 2.8l-1.5 1.5" />
    </Base>
  ),
  // Dente envolto por uma orbita (planejamento integrado).
  'reabilitacao-oral-completa': ({ className }) => (
    <Base className={className}>
      {/* Dente reduzido a 65%: traco 2.6 para sair com ~1.7 visivel. */}
      <g transform="translate(5.6 5.2) scale(.65)" strokeWidth={2.6}>
        <path {...corpo} d={DENTE} />
      </g>
      <ellipse cx="16" cy="16.5" rx="13" ry="5.5" transform="rotate(-18 16 16.5)" />
      <circle cx="27.4" cy="12" r="1.3" fill="currentColor" stroke="none" />
    </Base>
  ),
  // Arcada/faceta com brilhos.
  'facetas-e-proteses': ({ className }) => (
    <Base className={className}>
      <path {...corpo} d="M5 13c0-3 3-5 11-5s11 2 11 5c0 5-4.5 10-11 10S5 18 5 13Z" />
      <path d="M11 9v12M16 8v15M21 9v12" />
      <path d="M26 2.5v4M24 4.5h4M4 23.5v3M2.5 25h3" />
    </Base>
  ),
  // Dente com a linha da gengiva.
  periodontia: ({ className }) => (
    <Base className={className}>
      <path {...corpo} d={DENTE} />
      <path d="M4 15.5c2 1.6 4 1.6 6 0s4-1.6 6 0 4 1.6 6 0 4-1.6 6 0" />
    </Base>
  ),
  // Perfil de rosto feminino com brilho.
  'harmonizacao-orofacial': ({ className }) => (
    <Base className={className}>
      <path {...corpo} d="M18.5 4C13.6 4 10.5 7.6 10.5 12c0 1.6-1.6 3.1-2.6 4.6.6.6 1.9.8 2.3 1.4.2 1 0 2.3.8 2.9.9.6 2.2.2 2.6 1 .4 1-.1 2.6.3 3.7.5 1.3 2.6 1.6 4.3 1.6h4.6c-1.4-1.6-2.1-3.4-2.1-5.4 0-3.5 2.1-5.2 2.1-9.3C22.8 8 21.3 4 18.5 4Z" />
      <path d="M18.5 4c4.4 0 7.5 3.4 7.5 8 0 4.2-2 6.2-2 9.6 0 2 .8 4 2 5.4" />
      <path d="M5 4.5v4M3 6.5h4" />
    </Base>
  ),
  // Cabeca de perfil com destaque na mandibula.
  'dtm-e-dor-orofacial': ({ className }) => (
    <Base className={className}>
      <path d="M20 3.5c-5.5 0-9.5 3.8-9.5 9 0 1.8-1.7 3.3-2.7 4.9.6.6 2 .9 2.4 1.5.2 1.1 0 2.4.9 3 1 .6 2.3.3 2.8 1.1.4 1-.1 2.7.4 3.8.6 1.3 2.8 1.7 4.7 1.7" />
      <path {...corpo} d="M13.5 22.5c2.8 1.6 6.5 1.6 9.2-.6 1-.8 1.8-2 2.3-3.4" />
      <path d="M13.5 22.5c2.8 1.6 6.5 1.6 9.2-.6 1-.8 1.8-2 2.3-3.4" />
      <circle cx="22" cy="14" r="2" />
      <path d="M26.5 9.5 28 8M27.5 13.5h2M26.5 17.5 28 19" />
    </Base>
  ),
  // Mandibula com os dentes.
  'cirurgia-bucomaxilofacial': ({ className }) => (
    <Base className={className}>
      <path {...corpo} d="M5 9c0 9.5 4.6 17 11 17s11-7.5 11-17c-2.4 2.3-5.4 3.5-11 3.5S7.4 11.3 5 9Z" />
      <path d="M5 9c0 9.5 4.6 17 11 17s11-7.5 11-17" />
      <path d="M8.5 12.5v3M12 13.5v3M16 14v3M20 13.5v3M23.5 12.5v3" />
    </Base>
  ),
  // Dente com braquete e fio.
  ortodontia: ({ className }) => (
    <Base className={className}>
      <path {...corpo} d={DENTE} />
      <rect x="12" y="10" width="8" height="6" rx="1.5" fill="currentColor" fillOpacity={0.35} />
      <path d="M2.5 13h9.5M20 13h9.5" />
    </Base>
  ),
  // Dente com lima endodontica entrando pelo canal.
  endodontia: ({ className }) => (
    <Base className={className}>
      <path {...corpo} d={DENTE} />
      <path d="M16 2.5v4M16 6.5l-1.4 2 2.8 2-2.8 2 2.8 2-1.4 2v3" />
      <path d="M14 2.5h4" />
    </Base>
  ),
  // Dente com cruz de saude.
  'clinica-geral': ({ className }) => (
    <Base className={className}>
      <path {...corpo} d={DENTE} />
      <path d="M16 9.5v7M12.5 13h7" />
    </Base>
  ),
};

export function IconeTratamento({ slug, className = '' }: { slug: string; className?: string }) {
  const Icone = ICONES[slug] ?? ICONES['clinica-geral'];
  return <>{Icone({ className })}</>;
}
