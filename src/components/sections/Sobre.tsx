import { BrandImage } from '../ui/BrandImage';
import { Reveal } from '../ui/Reveal';
import { VideoGota } from '../ui/VideoGota';
import { WhatsAppButton } from '../ui/WhatsAppButton';
import { sobre, type Trecho } from '../../data/content';

/** Paragrafo com `lien` em italico e os destaques em semibold magenta. */
function Paragrafo({ trechos }: { trechos: readonly Trecho[] }) {
  return (
    <p className="text-base leading-[1.7] text-ink lg:text-lg">
      {trechos.map((t, i) =>
        typeof t === 'string' ? (
          t
        ) : t.estilo === 'italico' ? (
          <em key={i}>{t.texto}</em>
        ) : (
          <strong key={i} className="font-semibold text-magenta">
            {t.texto}
          </strong>
        ),
      )}
    </p>
  );
}

/**
 * Sobre a Lien — layout editorial (set/2026, doc "ajustes-site-clinica-lien").
 *
 * Texto a esquerda; a direita, composicao em tres camadas:
 *   1. foto da recepcao, cantos assimetricos, degradê teal na base;
 *   2. contorno em degradê com a forma do video, deslocado para cima e a direita;
 *   3. video em forma de gota por cima de tudo.
 *
 * Tipografia toda em Poppins: titulo Bold com tracking -0.02em (Poppins
 * Bold grande fica espacada demais sem isso), paragrafos Regular 16/18px.
 *
 * Grid: 1 coluna abaixo de 1024px (texto primeiro), 6/6 no desktop.
 */
export function Sobre() {
  return (
    <section id="sobre" className="relative bg-cream">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-14 lg:min-h-[720px] lg:grid-cols-12 lg:gap-16">
          {/* Coluna de texto */}
          <div className="lg:col-span-6">
            <Reveal y={24} duracao={0.6}>
              <p className="text-[0.75rem] font-medium uppercase leading-[1.4] tracking-[0.08em] text-ink-muted underline decoration-1 underline-offset-[6px] sm:text-[0.875rem]">
                {sobre.tag}
              </p>
            </Reveal>

            <Reveal y={24} duracao={0.6} delay={0.08}>
              <h2 className="mt-8 text-[2.75rem] font-bold leading-[1.05] tracking-[-0.02em] text-magenta sm:text-[3.5rem] lg:text-[4.5rem]">
                {sobre.tituloLinhas[0]} <br className="hidden lg:block" />
                {sobre.tituloLinhas[1]}
                <span className="text-teal">.</span>
              </h2>
            </Reveal>

            <Reveal y={24} duracao={0.6} delay={0.16}>
              <div className="mt-12 flex max-w-[560px] flex-col gap-6">
                {sobre.paragrafos.map((p, i) => (
                  <Paragrafo key={i} trechos={p} />
                ))}
              </div>
            </Reveal>

            <Reveal y={24} duracao={0.6} delay={0.24}>
              <WhatsAppButton
                origem="sobre"
                variante="pilula"
                tamanho="pilula"
                className="mt-14 w-full sm:w-auto"
              >
                {sobre.cta}
              </WhatsAppButton>
            </Reveal>
          </div>

          {/* Composicao visual */}
          <div className="mx-auto w-full max-w-[640px] lg:col-span-6 lg:max-w-none">
            <div className="relative aspect-[1/0.95] w-full">
              {/* Camada 1 — foto de fundo */}
              <Reveal
                y={0}
                duracao={0.6}
                escala={1.04}
                className="lien-fundo absolute right-0 top-0 h-full w-[62%] overflow-hidden"
              >
                <BrandImage
                  dados={sobre.imagem}
                  width={960}
                  height={1470}
                  proporcao="h-full"
                  className="!rounded-none"
                  sizes="(max-width: 768px) 62vw, 380px"
                />
                <div
                  aria-hidden="true"
                  className="lien-fundo-degrade pointer-events-none absolute inset-0"
                />
              </Reveal>

              {/* Camada 2 — contorno em degradê, atras do video */}
              <Reveal
                y={0}
                duracao={0.6}
                delay={0.15}
                className="lien-outline lien-gota absolute left-[2%] top-[9%] aspect-square w-[66%]"
              >
                <span aria-hidden="true" />
              </Reveal>

              {/* Camada 3 — video em gota */}
              <Reveal y={24} duracao={0.6} delay={0.15} className="absolute left-0 top-[12%] w-[66%]">
                <VideoGota
                  video={sobre.video}
                  rotuloPausar={sobre.rotuloPausar}
                  rotuloReproduzir={sobre.rotuloReproduzir}
                />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
