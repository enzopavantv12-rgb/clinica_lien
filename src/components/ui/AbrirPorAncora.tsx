'use client';

import { useEffect } from 'react';

/**
 * Abre o <details> do bloco cujo id esta na URL (/tratamentos/#periodontia) e rola ate
 * ele — inclusive quando o hash muda sem recarregar. O conteudo fechado ja
 * esta no HTML estatico (SEO); isto so cuida da abertura.
 */
export function AbrirPorAncora() {
  useEffect(() => {
    const abrir = (suave: boolean) => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const alvo = document.getElementById(id);
      const detalhes = alvo instanceof HTMLDetailsElement ? alvo : alvo?.querySelector('details');
      if (!alvo || !detalhes) return;
      detalhes.open = true;
      const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      // 'instant', e nao 'auto': 'auto' herda o scroll-behavior: smooth do <html>.
      alvo.scrollIntoView({ behavior: suave && !reduzir ? 'smooth' : 'instant', block: 'start' });
    };
    // Na carga, rola depois do roteador do Next (que tambem mexe no scroll
    // ao hidratar) e sem animacao; numa troca de hash, com animacao.
    const inicial = window.setTimeout(() => abrir(false), 120);
    const aoMudar = () => abrir(true);
    window.addEventListener('hashchange', aoMudar);
    return () => {
      window.clearTimeout(inicial);
      window.removeEventListener('hashchange', aoMudar);
    };
  }, []);
  return null;
}
