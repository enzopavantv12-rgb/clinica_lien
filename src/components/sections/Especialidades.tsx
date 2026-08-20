import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { whatsappUrlPor } from '../../lib/whatsapp';
import { trackWhatsAppClick } from '../../lib/tracking';
import { especialidades } from '../../data/content';

export function Especialidades() {
  return (
    <section id="especialidades" className="bg-cream py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHeading tag={especialidades.tag} titulo={especialidades.h2} />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {especialidades.itens.map((item, i) => {
            const destaque = item.destaque;
            return (
              <Reveal
                as="li"
                key={item.id}
                delay={i * 0.06}
                className={destaque ? 'sm:col-span-2' : ''}
              >
                <article
                  className={`group flex h-full flex-col rounded-3xl p-7 transition-all duration-300 ease-brand sm:p-8 motion-safe:hover:-translate-y-1 ${
                    destaque
                      ? 'bg-magenta text-white shadow-lift'
                      : 'border border-brandgray bg-white shadow-soft hover:shadow-lift'
                  }`}
                >
                  <Icon
                    nome={item.icone}
                    size={destaque ? 36 : 30}
                    className={destaque ? 'text-magenta-light' : 'text-teal'}
                  />

                  <h3
                    className={`mt-5 font-semibold ${
                      destaque
                        ? 'text-h2 sm:text-[2rem] sm:leading-[1.15] text-white'
                        : 'text-h3 sm:text-h3-lg text-ink'
                    }`}
                  >
                    {item.titulo}
                  </h3>

                  <p
                    className={`mt-3 max-w-prose text-body sm:text-body-lg ${
                      destaque ? 'text-white/90' : 'text-ink-muted'
                    }`}
                  >
                    {item.descricao}
                  </p>

                  {/* As paginas internas sao Fase 2 — o CTA abre o WhatsApp com
                      mensagem especifica do tratamento. Nunca href="#". */}
                  <a
                    href={whatsappUrlPor(item.origem)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick(item.origem)}
                    className={`mt-6 inline-flex items-center gap-2 self-start rounded-xl text-[0.9375rem] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
                      destaque
                        ? 'text-white hover:text-magenta-light focus-visible:outline-white'
                        : 'text-teal hover:text-magenta focus-visible:outline-magenta'
                    }`}
                    aria-label={`${especialidades.ctaLabel} sobre ${item.titulo} pelo WhatsApp`}
                  >
                    <WhatsAppIcon
                      size={18}
                      className="transition-transform duration-300 motion-safe:group-hover:scale-110"
                    />
                    {especialidades.ctaLabel}
                  </a>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
