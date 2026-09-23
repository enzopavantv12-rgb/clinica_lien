import { Plus } from 'lucide-react';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { WhatsAppLink } from '../ui/WhatsAppLink';
import { tratamentos } from '../../data/content';

type Item = (typeof tratamentos)['medios'][number] | (typeof tratamentos)['grade'][number];

/** Os tres campos do briefing: o que e, beneficio, para quem e indicado. */
function Campos({
  item,
  claro = false,
  semOQueE = false,
}: {
  item: { oQueE: string; beneficio?: string; indicado?: string };
  claro?: boolean;
  semOQueE?: boolean;
}) {
  const rotulo = claro ? 'text-magenta-light' : 'text-teal';
  const texto = claro ? 'text-white/90' : 'text-ink-muted';
  const linhas = [
    !semOQueE && { rotulo: tratamentos.rotulos.oQueE, texto: item.oQueE },
    item.beneficio && { rotulo: tratamentos.rotulos.beneficio, texto: item.beneficio },
    item.indicado && { rotulo: tratamentos.rotulos.indicado, texto: item.indicado },
  ].filter(Boolean) as { rotulo: string; texto: string }[];

  return (
    <dl className="flex flex-col gap-4">
      {linhas.map((l) => (
        <div key={l.rotulo}>
          <dt className={`text-legend font-semibold uppercase tracking-[0.12em] ${rotulo}`}>{l.rotulo}</dt>
          <dd className={`mt-1 max-w-prose text-body sm:text-body-lg ${texto}`}>{l.texto}</dd>
        </div>
      ))}
    </dl>
  );
}

function Cabecalho({ item, claro = false }: { item: { nome: string; apelido?: string; icone: string }; claro?: boolean }) {
  return (
    <>
      <Icon nome={item.icone} size={30} className={claro ? 'text-magenta-light' : 'text-teal'} />
      <h3 className={`mt-5 text-h3 sm:text-h3-lg font-semibold ${claro ? 'text-white' : 'text-ink'}`}>
        {item.nome}
      </h3>
      {item.apelido && (
        <p className={`mt-1 text-legend sm:text-legend-lg ${claro ? 'text-white/80' : 'text-ink-muted'}`}>
          {item.apelido}
        </p>
      )}
    </>
  );
}

/**
 * Tratamentos, na ordem de prioridade comercial do briefing.
 *
 * - Implantodontia digital: card de destaque, largura total. "Implantodontia
 *   digital" no titulo e "implantes dentarios" no texto — o termo que o
 *   paciente pesquisa.
 * - Reabilitacao e protese: cards medios, com os tres campos visiveis.
 * - Grade: "Saiba mais" expande beneficio e indicacao — nunca parede de texto.
 *   <details> nativo: acessivel por teclado, e o texto fica no DOM fechado.
 * - Compactos: uma frase cada, sem destaque.
 *
 * Cada card tem `id` proprio: e o destino dos links do cardapio.
 */
export function Tratamentos() {
  const { destaque } = tratamentos;

  return (
    <section id="tratamentos" className="bg-cream py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHeading tag={tratamentos.tag} titulo={tratamentos.h2} subtitulo={tratamentos.sub} />

        {/* Destaque: implantodontia digital */}
        <Reveal className="mt-14">
          <article
            id={destaque.id}
            className="grid gap-8 rounded-3xl bg-magenta p-7 text-white shadow-lift sm:p-10 lg:grid-cols-[1fr_1.15fr] lg:gap-12"
          >
            <div className="flex flex-col">
              <Icon nome={destaque.icone} size={40} className="text-magenta-light" />
              <h3 className="mt-5 text-h2 sm:text-h2-lg font-bold text-white">{destaque.nome}</h3>
              <p className="mt-2 text-sub sm:text-sub-lg text-white/85">{destaque.apelido}</p>

              <ul className="mt-7 flex flex-wrap gap-2" aria-label="Diferenciais do implante na Lien">
                {destaque.selos.map((selo) => (
                  <li key={selo.texto}>
                    {'href' in selo ? (
                      <a
                        href={selo.href}
                        className="inline-block rounded-full border border-white/40 px-3.5 py-1.5 text-legend sm:text-legend-lg font-medium text-white transition-colors hover:bg-white hover:text-magenta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        {selo.texto}
                      </a>
                    ) : (
                      <span className="inline-block rounded-full bg-white/15 px-3.5 py-1.5 text-legend sm:text-legend-lg font-medium text-white">
                        {selo.texto}
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              <WhatsAppLink
                origem={destaque.origem}
                contexto={destaque.nome}
                claro
                className="mt-8 lg:mt-auto lg:pt-8"
              >
                {tratamentos.cta}
              </WhatsAppLink>
            </div>

            <Campos item={destaque} claro />
          </article>
        </Reveal>

        {/* Medios: reabilitacao e protese */}
        <ul className="mt-5 grid gap-5 lg:grid-cols-2">
          {tratamentos.medios.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 0.06}>
              <article
                id={item.id}
                className="flex h-full flex-col rounded-3xl border border-brandgray bg-white p-7 shadow-soft sm:p-8"
              >
                <Cabecalho item={item} />
                <div className="mt-6">
                  <Campos item={item} />
                </div>
                <WhatsAppLink origem={item.origem} contexto={item.nome} className="mt-auto pt-7">
                  {tratamentos.cta}
                </WhatsAppLink>
              </article>
            </Reveal>
          ))}
        </ul>

        {/* Grade: "Saiba mais" expansivel */}
        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tratamentos.grade.map((item: Item, i) => (
            <Reveal as="li" key={item.id} delay={i * 0.05}>
              <article
                id={item.id}
                className="flex h-full flex-col rounded-3xl border border-brandgray bg-white p-6 shadow-soft sm:p-7"
              >
                <Cabecalho item={item} />
                <p className="mt-4 text-body sm:text-body-lg text-ink-muted">{item.oQueE}</p>

                <details className="group mt-5">
                  <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded text-[0.9375rem] font-medium text-ink transition-colors hover:text-magenta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta [&::-webkit-details-marker]:hidden">
                    {tratamentos.saibaMais}
                    <span className="sr-only">: {item.nome}</span>
                    <Plus
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="text-teal transition-transform duration-300 ease-brand group-open:rotate-45"
                    />
                  </summary>
                  <div className="mt-4">
                    <Campos item={item} semOQueE />
                    {'nota' in item && item.nota && (
                      <p className="mt-4 text-legend sm:text-legend-lg italic text-ink-muted">{item.nota}</p>
                    )}
                    {'profissional' in item && item.profissional && (
                      <p className="mt-4 text-legend sm:text-legend-lg text-teal">{item.profissional}</p>
                    )}
                  </div>
                </details>

                <WhatsAppLink origem={item.origem} contexto={item.nome} className="mt-auto pt-6">
                  {tratamentos.cta}
                </WhatsAppLink>
              </article>
            </Reveal>
          ))}
        </ul>

        {/* Compactos: uma frase cada */}
        <ul className="mt-5 grid gap-5 sm:grid-cols-3">
          {tratamentos.compactos.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 0.05}>
              <article
                id={item.id}
                className="flex h-full flex-col rounded-3xl border border-brandgray/80 bg-white/70 p-6"
              >
                <h3 className="text-[1.0625rem] sm:text-h3 font-semibold text-ink">
                  {item.nome}
                  {'apelido' in item && item.apelido && (
                    <span className="font-normal text-ink-muted"> ({item.apelido.toLowerCase()})</span>
                  )}
                </h3>
                <p className="mt-2 text-body text-ink-muted">{item.oQueE}</p>
                <WhatsAppLink origem={item.origem} contexto={item.nome} className="mt-auto pt-5">
                  {tratamentos.cta}
                </WhatsAppLink>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
