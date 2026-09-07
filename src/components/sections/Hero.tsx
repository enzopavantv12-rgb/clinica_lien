import { ArrowDown } from 'lucide-react';
import { PadraoOndas } from '../ui/BrandGraphics';
import { BrandImage } from '../ui/BrandImage';
import { WhatsAppButton } from '../ui/WhatsAppButton';
import { hero } from '../../data/content';

/**
 * Hero SEM `Reveal`.
 *
 * O `Reveal` renderiza `initial={{ opacity: 0 }}` como style inline, e o
 * prerender estatico sai com `style="opacity:0"`. Elemento com opacidade zero
 * nao e candidato a LCP: o LCP passava a esperar o download, o parse e a
 * hidratacao do bundle — exatamente o custo que esta migracao existe para
 * eliminar. Conteudo que ja nasce dentro da viewport nao ganha nada com a
 * animacao de entrada e paga o preco inteiro.
 *
 * Abaixo da dobra o `Reveal` continua igual em todas as outras secoes.
 */
export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-white pt-28 sm:pt-32 lg:pt-36">
      {/* Padrao de ondas teal a 5% no fundo da coluna de texto. */}
      <PadraoOndas
        className="pointer-events-none absolute -left-24 top-10 h-[560px] w-[820px]"
        opacidade={0.08}
      />

      <div className="relative mx-auto max-w-[1200px] px-5 pb-16 sm:px-8 sm:pb-20 lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[55fr_45fr] lg:gap-16">
          {/* Coluna de texto */}
          <div>
            <p
              className="text-tag sm:text-tag-lg font-semibold uppercase text-teal"
              style={{ letterSpacing: '0.18em' }}
            >
              {hero.tag}
            </p>

            <h1 className="mt-5 max-w-[19ch] text-h1 sm:text-h1-lg font-bold text-ink">
              {hero.h1}
            </h1>

            <p className="mt-6 max-w-prose text-sub sm:text-sub-lg text-ink-muted">{hero.sub}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <WhatsAppButton origem="hero">{hero.ctaPrimario}</WhatsAppButton>

              <a
                href={hero.ctaSecundarioHref}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-ink/25 px-7 py-4 text-base font-medium text-ink transition-all duration-300 ease-brand hover:border-ink hover:bg-ink/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-safe:hover:-translate-y-0.5"
              >
                {hero.ctaSecundario}
                <ArrowDown size={18} strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Coluna de imagem — no mobile aparece depois do CTA. Este div e o
              item de grid (antes o `Reveal` embrulhava ele); mesma largura de
              trilha, mesma altura de conteudo, `items-center` igual. */}
          <div className="relative">
            <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-magenta-light/25" />
            <BrandImage
              dados={hero.imagem}
              width={860}
              height={1075}
              prioridade
              proporcao="aspect-[4/5]"
              className="shadow-soft"
              // `sizes` proprio: a coluna e 45% de um container travado em
              // 1200px, entao acima de 1200px a largura para de crescer. O
              // default de 33vw da BrandImage sobe uma faixa do srcset a mais
              // do que o necessario justamente na imagem do LCP.
              sizes="(max-width: 1024px) 100vw, 482px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
