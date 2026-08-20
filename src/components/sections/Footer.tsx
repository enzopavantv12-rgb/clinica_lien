import { Clock, Instagram, MapPin, Phone } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { navegacao, site } from '../../data/content';

/** Icone do TikTok — lucide-react nao inclui marcas. */
function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M16.6 5.82A4.28 4.28 0 0 0 15.54 3h-3.1v12.4a2.6 2.6 0 1 1-1.86-2.49V9.7a5.7 5.7 0 1 0 4.96 5.65V8.9a7.2 7.2 0 0 0 3.96 1.2V7a4.3 4.3 0 0 1-2.9-1.18Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink pt-16 pb-10 text-white">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Marca */}
          <div>
            <Logo variante="branca" className="h-14" />
            <p className="mt-4 max-w-[34ch] text-body text-white/70">{site.tagline}</p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram da Lien Reabilitação Oral (${site.arroba})`}
                className="rounded-xl border border-white/20 p-2.5 text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Instagram size={20} strokeWidth={1.75} aria-hidden="true" />
              </a>
              <a
                href={site.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`TikTok da Lien Reabilitação Oral (${site.arroba})`}
                className="rounded-xl border border-white/20 p-2.5 text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <TikTokIcon size={20} />
              </a>
            </div>
          </div>

          {/* Navegacao */}
          <nav aria-label="Navegação do rodapé">
            <h2 className="text-legend font-semibold uppercase tracking-[0.16em] text-magenta-light">
              Navegação
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {navegacao.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="rounded text-body text-white/75 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <div>
            <h2 className="text-legend font-semibold uppercase tracking-[0.16em] text-magenta-light">
              Contato
            </h2>
            <ul className="mt-5 flex flex-col gap-4 text-body text-white/75">
              <li className="flex items-start gap-3">
                <MapPin size={18} strokeWidth={1.75} aria-hidden="true" className="mt-1 shrink-0 text-teal-light" />
                <span>{site.endereco}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} strokeWidth={1.75} aria-hidden="true" className="mt-1 shrink-0 text-teal-light" />
                <a
                  href={`tel:${site.telefoneE164}`}
                  className="rounded transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  {site.telefoneExibicao}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} strokeWidth={1.75} aria-hidden="true" className="mt-1 shrink-0 text-teal-light" />
                <span>{site.horario}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/15 pt-7">
          {/* Responsavel tecnico: obrigatorio por norma do CFO. */}
          <p className="text-legend text-white/60">
            Responsável técnico: {site.responsavelTecnico}
          </p>
          <p className="mt-2 text-legend text-white/50">{site.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
