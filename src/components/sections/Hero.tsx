import { PadraoOndas } from '../ui/BrandGraphics';
import { BrandImage } from '../ui/BrandImage';
import { WhatsAppButton } from '../ui/WhatsAppButton';
import { hero } from '../../data/content';

/**
 * Midia do hero: video da experiencia Lien quando existir, foto enquanto nao.
 *
 * Com video, a foto vira o `poster` e tambem a unica midia para quem pede
 * movimento reduzido — as classes `motion-reduce:` escondem o video e mostram
 * a imagem, sem depender de JavaScript.
 */
function HeroMidia() {
  const imagem = (
    <BrandImage
      dados={hero.imagem}
      width={860}
      height={1075}
      prioridade
      proporcao="aspect-[4/5]"
      className="shadow-soft"
      // `sizes` proprio: a coluna e 45% de um container travado em 1200px,
      // entao acima de 1200px a largura para de crescer. O default de 33vw da
      // BrandImage sobe uma faixa do srcset a mais do que o necessario
      // justamente na imagem do LCP.
      sizes="(max-width: 1024px) 100vw, 482px"
    />
  );

  if (!hero.video) return imagem;

  return (
    <>
      <video
        className="aspect-[4/5] w-full rounded-3xl object-cover shadow-soft motion-reduce:hidden"
        poster={hero.imagem.src}
        muted
        autoPlay
        loop
        playsInline
        aria-label={hero.imagem.alt}
      >
        <source src={hero.video.src} type={hero.video.tipo} />
      </video>
      <div className="hidden motion-reduce:block">{imagem}</div>
    </>
  );
}

/**
 * Hero SEM `Reveal`.
 *
 * O `Reveal` renderiza `initial={{ opacity: 0 }}` como style inline, e o
 * prerender estatico sai com `style="opacity:0"`. Elemento com opacidade zero
 * nao e candidato a LCP: o LCP passava a esperar o download, o parse e a
 * hidratacao do bundle. Conteudo que ja nasce dentro da viewport nao ganha
 * nada com a animacao de entrada e paga o preco inteiro.
 *
 * Um unico CTA, como pede o briefing: a conversao e uma so (WhatsApp).
 */
export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-white pt-28 sm:pt-32 lg:pt-36">
      {/* Padronagem oficial em teal a 8%, no fundo da coluna de texto. */}
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

            <h1 className="mt-5 max-w-[20ch] text-h1 sm:text-h1-lg font-bold text-ink">
              {hero.h1}
            </h1>

            <p className="mt-6 max-w-prose text-sub sm:text-sub-lg text-ink-muted">{hero.sub}</p>

            <div className="mt-9">
              <WhatsAppButton origem="hero">{hero.cta}</WhatsAppButton>
              <p className="mt-4 max-w-prose text-legend sm:text-legend-lg text-ink-muted">
                {hero.microcopy}
              </p>
            </div>
          </div>

          {/* Coluna de midia — no mobile aparece depois do CTA. */}
          <div className="relative">
            <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-magenta-light/25" />
            <HeroMidia />
          </div>
        </div>
      </div>
    </section>
  );
}
