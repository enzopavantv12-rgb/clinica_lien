import { Clock, Instagram, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { MapaSobDemanda } from '../ui/MapaSobDemanda';
import { navegacao, rodape, site } from '../../data/content';

/** Icone do TikTok — lucide-react nao inclui marcas. */
function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M16.6 5.82A4.28 4.28 0 0 0 15.54 3h-3.1v12.4a2.6 2.6 0 1 1-1.86-2.49V9.7a5.7 5.7 0 1 0 4.96 5.65V8.9a7.2 7.2 0 0 0 3.96 1.2V7a4.3 4.3 0 0 1-2.9-1.18Z" />
    </svg>
  );
}

const icone = 'mt-1 shrink-0 text-teal';
const link =
  'rounded transition-colors hover:text-magenta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta';
const titulo = 'text-legend font-semibold uppercase tracking-[0.16em] text-ink';
const botaoRede =
  'rounded-xl border border-ink/15 p-2.5 text-teal transition-colors hover:border-teal hover:bg-teal/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal';

/**
 * Rodape. Fundo cream com a logo COLORIDA: o manual preve colorido sobre
 * branco/cream e branco so sobre magenta/teal — a combinacao anterior (branco
 * sobre ink) nao esta entre as permitidas.
 *
 * Contraste: teal sobre cream mede 4,46:1 e FALHA AA para texto. Aqui teal so
 * aparece em icones (exigencia de 3:1 para elemento grafico); todo texto e ink,
 * ink-muted ou magenta.
 *
 * Linha legal obrigatoria: razao social, CNPJ e responsavel tecnica com CRO.
 */
export function Footer() {
  const comoChegar = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${site.endereco.rua}, ${site.endereco.bairro}, ${site.endereco.cidade} - ${site.endereco.uf}, ${site.endereco.cep}`,
  )}`;

  return (
    <footer className="border-t border-brandgray bg-cream pt-16 pb-10 text-ink">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_1.1fr_1.1fr]">
          {/* Marca */}
          <div>
            <Logo variante="colorida" className="h-16" />
            <p className="mt-4 max-w-[30ch] text-body text-ink-muted">{site.tagline}</p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram da Dra. Natália Simões (${site.instagram.arroba})`}
                className={botaoRede}
              >
                <Instagram size={20} strokeWidth={1.75} aria-hidden="true" />
              </a>
              {site.tiktok.exibir && (
                <a
                  href={site.tiktok.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`TikTok da Lien (${site.tiktok.arroba})`}
                  className={botaoRede}
                >
                  <TikTokIcon size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Navegacao */}
          <nav aria-label="Navegação do rodapé">
            <h2 className={titulo}>{rodape.titulos.navegacao}</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {navegacao.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={`text-body text-ink-muted ${link}`}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <div>
            <h2 className={titulo}>{rodape.titulos.contato}</h2>
            <ul className="mt-5 flex flex-col gap-4 text-body text-ink-muted">
              <li className="flex items-start gap-3">
                <MapPin size={18} strokeWidth={1.75} aria-hidden="true" className={icone} />
                <span>
                  {site.enderecoCompleto}
                  {/* [PENDENTE: numero da sala e ponto de referencia] */}
                  <a
                    href={comoChegar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-2 flex w-fit items-center gap-1.5 font-medium text-magenta ${link}`}
                  >
                    <Navigation size={15} strokeWidth={2} aria-hidden="true" />
                    {rodape.comoChegar}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} strokeWidth={1.75} aria-hidden="true" className={icone} />
                <a href={`tel:${site.telefoneE164}`} className={link}>
                  {site.telefoneExibicao}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} strokeWidth={1.75} aria-hidden="true" className={icone} />
                <a href={`mailto:${site.email}`} className={`break-all ${link}`}>
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Horarios + mapa */}
          <div>
            <h2 className={titulo}>{rodape.titulos.horarios}</h2>
            <ul className="mt-5 flex flex-col gap-3 text-body text-ink-muted">
              {site.horarios.map((h) => (
                <li key={h.dias} className="flex items-start gap-3">
                  <Clock size={18} strokeWidth={1.75} aria-hidden="true" className={icone} />
                  <span>
                    <span className="font-medium text-ink">{h.dias}</span>
                    <br />
                    {h.horas}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <MapaSobDemanda
                endereco={`${site.endereco.edificio}, ${site.endereco.rua}, ${site.endereco.bairro}, ${site.endereco.cidade} - ${site.endereco.uf}`}
                rotulo={rodape.mostrarMapa}
                aviso={rodape.avisoMapa}
              />
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-ink/10 pt-7 text-legend text-ink-muted">
          {/* Linha legal: responsavel tecnica + CRO obrigatorios por norma do CFO. */}
          <p>
            {site.razaoSocial} · CNPJ {site.cnpj} · Responsável técnica: {site.responsavelTecnica} ·{' '}
            {site.cro}
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <a href="/privacidade/" className={`w-fit font-medium text-ink ${link}`}>
              {rodape.privacidade}
            </a>
            <p>{site.credito}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
