import { BrandImage } from '../ui/BrandImage';
import { Etiqueta } from '../ui/Etiqueta';
import { Reveal } from '../ui/Reveal';
import { sobre } from '../../data/content';

type Trecho = { texto: string; forte?: boolean };

function Texto({ trechos, forte }: { trechos: readonly Trecho[]; forte: string }) {
  return (
    <>
      {trechos.map((t, i) =>
        t.forte ? (
          <strong key={i} className={forte}>
            {t.texto}
          </strong>
        ) : (
          t.texto
        ),
      )}
    </>
  );
}

/**
 * "Lien quer dizer vinculo." — layout do Print 1 (prompt "sobre-metodo-lien",
 * out/2026), texto final do Alinhamento 2026 (literal).
 *
 * Texto a esquerda (52%) e uma foto grande do consultorio a direita (48%);
 * abaixo de 1024px, 1 coluna com a foto depois do texto. O quote (exigencia
 * do alinhamento) entra discreto, com borda teal, antes dos 2 destaques.
 * "vinculo" em italico: a Poppins italica nao e carregada, o navegador
 * inclina a regular (nao se importa fonte nova).
 */
export function Sobre() {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-title"
      className="bg-[linear-gradient(180deg,#FFFFFF,#F9FAFB)] py-[72px] lg:py-[112px]"
    >
      <div className="mx-auto grid max-w-[1160px] items-center gap-10 px-6 lg:grid-cols-[52fr_48fr] lg:gap-16">
        <div>
          <Reveal y={16} duracao={0.6}>
            <Etiqueta>{sobre.tag}</Etiqueta>
            <h2
              id="sobre-title"
              className="mt-[14px] text-[clamp(32px,3.6vw,46px)] font-bold leading-[1.1] tracking-[-.01em] text-ink"
            >
              {sobre.tituloPartes[0]}
              <em className="text-magenta">{sobre.tituloPartes[1]}</em>
              {sobre.tituloPartes[2]}
            </h2>
          </Reveal>

          <Reveal y={16} duracao={0.6} delay={0.09}>
            <p className="mt-6 max-w-[56ch] text-[17px] leading-[1.65] text-ink">
              <Texto trechos={sobre.abertura} forte="font-semibold" />
            </p>
            <div className="mt-[18px] max-w-[60ch] space-y-[18px] text-[15px] font-light leading-[1.75] text-ink-muted">
              {sobre.apoio.map((p, i) => (
                <p key={i}>
                  <Texto trechos={p} forte="font-medium text-ink" />
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal y={16} duracao={0.6} delay={0.18}>
            <blockquote className="mt-7 border-l-[3px] border-teal pl-[18px] text-base font-medium italic leading-[1.6] text-ink">
              &ldquo;{sobre.quote}&rdquo;
            </blockquote>

            <dl className="mt-9 flex flex-wrap gap-8 sm:gap-14">
              {sobre.destaques.map((d) => {
                return (
                  <div key={d.titulo} className="flex items-start gap-[14px]">
                    {/* Icone oficial (pasta NOSSA ESSENCIA, `npm run icones`). */}
                    <img
                      src={`/icones-lien/essencia-${d.icone}.webp`}
                      width={128}
                      height={128}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      className="h-10 w-10 shrink-0 object-contain"
                    />
                    <div>
                      <dt className="text-[22px] font-bold leading-[1.2] text-ink">{d.titulo}</dt>
                      <dd className="mt-1 text-[13px] leading-[1.45] text-ink-muted">{d.legenda}</dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </Reveal>
        </div>

        <Reveal y={16} duracao={0.6} delay={0.1}>
          <BrandImage
            dados={sobre.imagem}
            width={941}
            height={1672}
            proporcao="aspect-[4/3] lg:aspect-[16/10]"
            className="!rounded-[24px] object-[50%_62%] shadow-[0_20px_40px_-24px_rgba(26,20,32,.18)] lg:!rounded-[28px]"
            sizes="(max-width: 1024px) 92vw, 540px"
          />
        </Reveal>
      </div>
    </section>
  );
}
