import { PadraoOndas, Simbolo } from '../ui/BrandGraphics';
import { Timeline } from '../ui/Timeline';
import { metodo } from '../../data/content';

/**
 * Metodo Lien em 4 etapas, como linha do tempo horizontal com scroll: a secao
 * fixa na tela e as etapas passam da direita para a esquerda (Timeline.tsx).
 *
 * O painel de abertura carrega o titulo da secao em branco sobre magenta —
 * combinacao prevista no manual — com a padronagem oficial a 10%.
 * Proibido "avaliacao" e "orcamento" em qualquer etapa (briefing, 5.5).
 */
export function MetodoLien() {
  return (
    <Timeline
      id="metodo"
      etapas={metodo.etapas}
      painel={
        <>
          <PadraoOndas className="pointer-events-none absolute inset-0" cor="#FFFFFF" opacidade={0.1} />
          <div className="relative flex h-full flex-col">
            <p
              className="text-tag sm:text-tag-lg font-semibold uppercase text-white"
              style={{ letterSpacing: '0.18em' }}
            >
              {metodo.tag}
            </p>
            <h2 className="mt-5 text-h2 sm:text-h2-lg font-bold text-white">{metodo.h2}</h2>
            <p className="mt-5 text-sub sm:text-sub-lg text-white/90">{metodo.sub}</p>
            <Simbolo variante="negativo" className="mt-auto block h-auto w-28 pt-8 sm:w-36" />
          </div>
        </>
      }
    />
  );
}
