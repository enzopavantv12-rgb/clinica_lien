'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Logo } from '../ui/Logo';
import { WhatsAppButton } from '../ui/WhatsAppButton';
import { header, navegacao, site } from '../../data/content';

/** '/#sobre' -> 'sobre' */
const idDaSecao = (href: string) => href.split('#')[1] ?? '';

const focoVisivel =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-magenta';

/**
 * Menu flutuante em vidro, no estilo "Liquid Glass" do iOS 26 (estilos em
 * .glass-* no globals.css).
 *
 * - Desktop (>= 1024px): capsula com logo, links, indicador que desliza ate a
 *   secao ativa (IntersectionObserver) e o CTA. Compacta depois de 24px de
 *   rolagem.
 * - Mobile: capsula com logo + botao; o botao abre um painel de vidro que
 *   cresce a partir dela. Foco no primeiro link ao abrir, Esc e clique fora
 *   fecham, scroll do body travado enquanto aberto.
 */
export function Header() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const [ativo, setAtivo] = useState<string | null>(null);
  const [indicador, setIndicador] = useState<{ x: number; largura: number } | null>(null);

  const listaRef = useRef<HTMLUListElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const painelRef = useRef<HTMLDivElement>(null);
  const botaoRef = useRef<HTMLButtonElement>(null);

  // Compacta ao rolar (rAF: no maximo uma leitura por quadro).
  useEffect(() => {
    let quadro = 0;
    const aoRolar = () => {
      if (quadro) return;
      quadro = requestAnimationFrame(() => {
        quadro = 0;
        setRolou(window.scrollY > 24);
      });
    };
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => {
      window.removeEventListener('scroll', aoRolar);
      cancelAnimationFrame(quadro);
    };
  }, []);

  // Secao ativa: a que cruza a faixa central da tela.
  useEffect(() => {
    const secoes = navegacao
      .map((item) => document.getElementById(idDaSecao(item.href)))
      .filter((el): el is HTMLElement => el !== null);
    if (secoes.length === 0) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) if (e.isIntersecting) setAtivo(e.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    secoes.forEach((s) => observador.observe(s));

    // Acima da primeira secao (na hero), nenhum link fica ativo.
    const noTopo = () => {
      if (window.scrollY < secoes[0].offsetTop - window.innerHeight / 2) setAtivo(null);
    };
    window.addEventListener('scroll', noTopo, { passive: true });
    return () => {
      observador.disconnect();
      window.removeEventListener('scroll', noTopo);
    };
  }, []);

  // Posiciona a "gota" sob o link ativo; remede quando a capsula muda de
  // largura (ao compactar) ou a janela e redimensionada.
  const medir = useCallback(() => {
    const link = ativo ? listaRef.current?.querySelector<HTMLElement>(`[data-secao="${ativo}"]`) : null;
    setIndicador(link ? { x: link.offsetLeft, largura: link.offsetWidth } : null);
  }, [ativo]);

  useLayoutEffect(() => {
    medir();
  }, [medir, rolou]);

  useEffect(() => {
    const lista = listaRef.current;
    if (!lista) return;
    const observador = new ResizeObserver(medir);
    observador.observe(lista);
    return () => observador.disconnect();
  }, [medir]);

  // Painel mobile: scroll travado, foco no primeiro link, Esc e clique fora.
  useEffect(() => {
    if (!aberto) return;
    document.body.style.overflow = 'hidden';
    painelRef.current?.querySelector<HTMLElement>('a')?.focus();

    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAberto(false);
        botaoRef.current?.focus();
      }
    };
    const aoTocarFora = (e: PointerEvent) => {
      const alvo = e.target as Node;
      if (!painelRef.current?.contains(alvo) && !navRef.current?.contains(alvo)) setAberto(false);
    };
    document.addEventListener('keydown', aoTeclar);
    document.addEventListener('pointerdown', aoTocarFora);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', aoTeclar);
      document.removeEventListener('pointerdown', aoTocarFora);
    };
  }, [aberto]);

  // Passou para o desktop com o painel aberto: fecha.
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    const aoMudar = () => mql.matches && setAberto(false);
    mql.addEventListener('change', aoMudar);
    return () => mql.removeEventListener('change', aoMudar);
  }, []);

  return (
    <header id="topo" className="pointer-events-none fixed inset-x-0 top-3 z-[100] flex justify-center px-3 lg:top-4 lg:px-4">
      <nav
        ref={navRef}
        aria-label="Menu principal"
        className={`glass-nav pointer-events-auto flex items-center gap-6 lg:gap-4 xl:gap-6 pl-3 pr-2 lg:pl-5 lg:pr-2.5 ${rolou ? 'is-scrolled' : ''}`}
      >
        <a
          href="/#inicio"
          aria-label={`${site.nome} — início`}
          className={`shrink-0 rounded-2xl ${focoVisivel}`}
        >
          <Logo
            variante="colorida"
            className={`transition-[height] duration-300 ${rolou ? 'h-[50px] lg:h-12' : 'h-[50px] lg:h-[54px]'}`}
          />
        </a>

        <ul ref={listaRef} className="relative hidden flex-1 items-center justify-center gap-1 lg:flex">
          {/* Gota de vidro do link ativo (decorativa). */}
          <li
            aria-hidden="true"
            className="glass-indicador pointer-events-none absolute left-0 top-1/2 h-9"
            style={{
              width: indicador?.largura ?? 0,
              transform: `translate(${indicador?.x ?? 0}px, -50%)`,
              opacity: indicador ? 1 : 0,
            }}
          />
          {navegacao.map((item) => {
            const id = idDaSecao(item.href);
            const atual = ativo === id;
            return (
              // Sem `relative` no <li>: o offsetLeft do link precisa ser
              // relativo a lista, que e onde a gota se posiciona.
              <li key={item.href}>
                <a
                  href={item.href}
                  data-secao={id}
                  aria-current={atual ? 'true' : undefined}
                  className={`inline-flex h-11 items-center whitespace-nowrap rounded-full px-3.5 text-[0.9375rem] font-medium transition-colors hover:text-magenta lg:px-3 xl:px-4 ${
                    atual ? 'text-ink' : 'text-ink/85'
                  } ${focoVisivel}`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <WhatsAppButton
          origem="menu"
          variante="capsula"
          tamanho="capsulaMenu"
          className="ml-auto hidden shrink-0 whitespace-nowrap shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] lg:ml-0 lg:inline-flex"
        >
          {header.cta}
        </WhatsAppButton>

        <button
          ref={botaoRef}
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-expanded={aberto}
          aria-controls="mobile-menu"
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          className={`ml-auto flex size-11 shrink-0 flex-col items-center justify-center gap-[7px] rounded-full text-ink transition-colors hover:bg-white/50 lg:hidden ${focoVisivel}`}
        >
          {/* Duas linhas que viram um X. */}
          <span
            aria-hidden="true"
            className={`h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${aberto ? 'translate-y-[4.5px] rotate-45' : ''}`}
          />
          <span
            aria-hidden="true"
            className={`h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${aberto ? '-translate-y-[4.5px] -rotate-45' : ''}`}
          />
        </button>
      </nav>

      {/* Painel mobile de vidro. `inert` fechado: fora da ordem de tabulacao. */}
      <div
        ref={painelRef}
        id="mobile-menu"
        inert={!aberto}
        className={`glass-painel pointer-events-auto absolute left-3 right-3 top-[68px] ml-auto max-w-[420px] p-3 lg:hidden ${
          aberto ? 'is-open visible scale-100 opacity-100' : 'invisible scale-90 opacity-0'
        }`}
      >
        <nav aria-label="Menu mobile">
          <ul className="flex flex-col">
            {navegacao.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setAberto(false)}
                  aria-current={ativo === idDaSecao(item.href) ? 'true' : undefined}
                  className={`flex h-14 items-center rounded-2xl px-4 text-xl font-medium text-ink transition-colors hover:bg-white/50 hover:text-magenta ${focoVisivel}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <WhatsAppButton
          origem="menu"
          variante="capsula"
          tamanho="capsula"
          className="mt-3 w-full shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
        >
          {header.cta}
        </WhatsAppButton>
      </div>
    </header>
  );
}
