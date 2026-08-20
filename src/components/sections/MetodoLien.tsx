import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { metodoLien } from '../../data/content';

// Fundos alternados a 25%, conforme especificado.
const fundos = [
  'bg-magenta-light/25',
  'bg-teal-light/25',
  'bg-magenta-light/25',
  'bg-teal-light/25',
];

export function MetodoLien() {
  return (
    <section id="metodo-lien" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHeading
          tag={metodoLien.tag}
          titulo={metodoLien.h2}
          subtitulo={metodoLien.sub}
        />

        <ul className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {metodoLien.pilares.map((pilar, i) => (
            <Reveal
              as="li"
              key={pilar.numero}
              delay={i * 0.08}
              className={`relative overflow-hidden rounded-3xl p-6 sm:p-7 ${fundos[i]}`}
            >
              {/* Numeral grande em marca-d'agua no canto do card. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-1 -top-3 select-none text-[4.5rem] font-bold leading-none text-ink/[0.07] sm:text-[5.5rem]"
              >
                {pilar.numero}
              </span>

              <Icon nome={pilar.icone} size={30} className="relative text-teal" />

              <h3 className="relative mt-5 text-h3 sm:text-h3-lg font-semibold text-ink">
                {pilar.titulo}
              </h3>
              <p className="relative mt-2.5 text-body sm:text-body-lg text-ink-muted">
                {pilar.descricao}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
