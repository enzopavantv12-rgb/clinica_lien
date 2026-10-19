'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Simbolo } from '../ui/BrandGraphics';
import { Reveal } from '../ui/Reveal';
import { MOLDURA, TopoTratamento, VARIANTES, classeBotao, variantePor } from '../ui/TratamentoCard';
import { WhatsAppButton } from '../ui/WhatsAppButton';
import { tratamentos } from '../../data/content';

type Tratamento = (typeof tratamentos.lista)[number];
type Leitura = { slug: string; title: string };

/**
 * Regiao recolhivel: transicao de altura por grid-template-rows (0fr -> 1fr,
 * 350ms). Fechada continua no HTML (SEO), mas `inert` tira os links e o CTA
 * da ordem de tabulacao.
 */
function Colapso({ aberto, children, className = '', id }: { aberto: boolean; children: ReactNode; className?: string; id?: string }) {
  return (
    <div
      id={id}
      inert={!aberto}
      className={`grid transition-[grid-template-rows] duration-[350ms] ease-out motion-reduce:transition-none ${
        aberto ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
      } ${className}`}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}

function Rotulo({ children, cor }: { children: ReactNode; cor: string }) {
  return <p className={`text-xs font-semibold uppercase tracking-[.1em] ${cor}`}>{children}</p>;
}

/**
 * Grade de /tratamentos/ (prompt "tratamentos-lien", out/2026): os 10 cards do
 * print, 3 -> 2 -> 1 colunas. "Saiba mais" expande o card na linha inteira,
 * um aberto por vez, com o conteudo literal do Alinhamento (secao 4.2):
 *   esquerda — icone, titulo (H2), descricao curta e "Indicado para";
 *   direita — O que e, Beneficio e Principais tratamentos e servicos;
 *   rodape — a nota em italico e um unico "Agende sua consulta".
 * /tratamentos/#<slug> abre o card e rola ate ele; abrir atualiza a URL
 * (replaceState). No espaco vazio da ultima linha (3 colunas), o arco grande.
 */
export function GradeTratamentos({ leituras }: { leituras: Record<string, Leitura[]> }) {
  const [aberto, setAberto] = useState<string | null>(null);
  const arcoRef = useRef<HTMLLIElement>(null);
  const { lista, rotulos } = tratamentos;

  const rolarAte = useCallback((slug: string, suave: boolean) => {
    const alvo = document.getElementById(slug);
    if (!alvo) return;
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // 'instant', e nao 'auto': 'auto' herda o scroll-behavior: smooth do <html>.
    alvo.scrollIntoView({ behavior: suave && !reduzir ? 'smooth' : 'instant', block: 'start' });
  }, []);

  // Ancora na URL (vinda da home, do "Por onde comecar" ou de um artigo).
  useEffect(() => {
    const abrirPelaUrl = (suave: boolean) => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      if (!lista.some((t) => t.slug === slug)) return;
      setAberto(slug);
      // Depois do roteador do Next (que mexe no scroll ao hidratar).
      window.setTimeout(() => rolarAte(slug, suave), suave ? 0 : 120);
    };
    abrirPelaUrl(false);
    const aoMudar = () => abrirPelaUrl(true);
    window.addEventListener('hashchange', aoMudar);
    return () => window.removeEventListener('hashchange', aoMudar);
  }, [lista, rolarAte]);

  // O simbolo se revela quando entra na tela.
  useEffect(() => {
    const arco = arcoRef.current;
    if (!arco) return;
    const observador = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        arco.classList.add('is-visivel');
        observador.disconnect();
      }
    });
    observador.observe(arco);
    return () => observador.disconnect();
  }, []);

  const alternar = (slug: string) => {
    const proximo = aberto === slug ? null : slug;
    setAberto(proximo);
    const { pathname, search } = window.location;
    window.history.replaceState(null, '', proximo ? `#${proximo}` : `${pathname}${search}`);
    if (proximo) window.setTimeout(() => rolarAte(proximo, true), 60);
  };

  return (
    <ul role="list" className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-7">
      {lista.map((t: Tratamento, i) => {
        const v = variantePor(i);
        const cor = VARIANTES[v].rotulo;
        const estaAberto = aberto === t.slug;
        const relacionados = leituras[t.slug] ?? [];
        const idDetalhes = `${t.slug}-detalhes`;
        return (
          <Reveal as="li" key={t.slug} y={16} duracao={0.6} delay={(i % 3) * 0.07} className={estaAberto ? 'col-span-full' : ''}>
            {/* scroll-mt de 10px + scroll-padding-top de 110px do <html> = 120px. */}
            <article
              id={t.slug}
              className={`grid h-full scroll-mt-[10px] px-[26px] pb-[26px] pt-7 transition-[transform,box-shadow] duration-[250ms] ease-out motion-reduce:transition-none ${MOLDURA} ${
                estaAberto
                  ? 'lg:grid-cols-[2fr_3fr] lg:gap-x-12 lg:px-10 lg:pb-10 lg:pt-10'
                  : 'grid-rows-[1fr_auto_auto] hover:-translate-y-[3px] hover:shadow-[0_16px_36px_-14px_rgba(26,20,32,.14),0_1px_2px_rgba(26,20,32,.03)] motion-reduce:hover:translate-y-0'
              }`}
            >
              {/* Esquerda: topo do card, "Indicado para" e o botao. */}
              <div className="flex min-w-0 flex-col">
                <TopoTratamento slug={t.slug} nome={t.nome} resumo={t.resumo} variante={v} Titulo="h2" tituloGrande={estaAberto} />
                <Colapso aberto={estaAberto}>
                  <div className="pt-6">
                    <Rotulo cor={cor}>{rotulos.indicado}</Rotulo>
                    <p className="mt-2 text-[14px] leading-[1.65] text-ink">{t.indicado}</p>
                  </div>
                </Colapso>
                <div className={estaAberto ? 'lg:mt-auto' : 'mt-auto'}>
                  <button
                    type="button"
                    onClick={() => alternar(t.slug)}
                    aria-expanded={estaAberto}
                    aria-controls={idDetalhes}
                    className={classeBotao(v)}
                  >
                    {estaAberto ? tratamentos.fechar : tratamentos.saibaMais}
                    <span className="sr-only"> sobre {t.nome}</span>
                  </button>
                </div>
              </div>

              {/* Direita: O que e, Beneficio e servicos (+ conteudos relacionados).
                  A posicao em 2 colunas so vale aberto: fechado, um
                  col-start-2 criaria uma 2a coluna e espremeria o card. */}
              <Colapso aberto={estaAberto} id={idDetalhes} className={estaAberto ? 'lg:col-start-2 lg:row-start-1' : ''}>
                <div className="flex flex-col gap-6 pt-8 lg:pt-0">
                  <div>
                    <Rotulo cor={cor}>{rotulos.oQueE}</Rotulo>
                    <p className="mt-2 text-[14px] leading-[1.65] text-ink">{t.oQueE}</p>
                  </div>
                  <div>
                    <Rotulo cor={cor}>{rotulos.beneficio}</Rotulo>
                    <p className="mt-2 text-[14px] leading-[1.65] text-ink">{t.beneficio}</p>
                  </div>
                  <div>
                    <Rotulo cor={cor}>{rotulos.servicos}</Rotulo>
                    <ul className="mt-3 flex flex-col gap-2">
                      {t.servicos.map((s) => (
                        <li key={s} className="flex gap-3 text-[14px] leading-[1.6] text-ink">
                          <span aria-hidden="true" className={`mt-[0.55em] size-1.5 shrink-0 rounded-full ${VARIANTES[v].ponto}`} />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {relacionados.length > 0 && (
                    <div>
                      <Rotulo cor={cor}>{rotulos.relacionados}</Rotulo>
                      <ul className="mt-2 flex flex-col gap-1.5">
                        {relacionados.map((a) => (
                          <li key={a.slug}>
                            <a
                              href={`/${a.slug}/`}
                              className="inline-flex items-start gap-1.5 rounded text-[14px] font-medium text-magenta underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta"
                            >
                              <ArrowRight size={14} strokeWidth={2} aria-hidden="true" className="mt-[0.25em] shrink-0" />
                              {a.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Colapso>

              {/* Rodape: nota e o unico CTA. */}
              <Colapso aberto={estaAberto} className={estaAberto ? 'lg:col-span-2' : ''}>
                <div className="mt-8 flex flex-col gap-6 border-t border-brandgray pt-6 lg:flex-row lg:items-center lg:justify-between">
                  <p className="max-w-[62ch] text-[13px] font-light italic leading-[1.6] text-ink-muted">{t.nota}</p>
                  <WhatsAppButton
                    origem={`tratamento-${t.slug}`}
                    variante="capsula"
                    tamanho="capsulaMenu"
                    className="w-full shrink-0 shadow-[0_10px_30px_-10px_rgba(156,23,129,0.55)] sm:w-auto"
                  >
                    {tratamentos.cta}
                  </WhatsAppButton>
                </div>
              </Colapso>
            </article>
          </Reveal>
        );
      })}

      {/* Simbolo oficial no vazio da ultima linha (so com 3 colunas). */}
      <li ref={arcoRef} aria-hidden="true" className="pointer-events-none hidden items-center justify-center drop-shadow-[0_18px_30px_rgba(104,192,212,.25)] lg:col-span-2 lg:flex">
        <Simbolo variante="cyano" className="simbolo-entra h-auto w-[340px]" />
      </li>
    </ul>
  );
}
