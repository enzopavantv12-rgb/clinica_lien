'use client';

import { usePathname } from 'next/navigation';
import { Clock, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import { whatsappUrlPor } from '../../lib/whatsapp';
import { trackWhatsAppClick } from '../../lib/tracking';
import { rodape, site } from '../../data/content';

const link =
  'rounded transition-colors hover:text-magenta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta';
const botaoRede =
  'grid h-11 w-11 place-items-center rounded-full bg-[#8E1F7E] text-white transition-colors hover:bg-magenta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta';
const icone = 'mt-[3px] shrink-0 text-[#8E1F7E]';

/**
 * Rodape — layout do print da clinica (out/2026): marca + redes, duas colunas
 * de links (secoes e tratamentos) e o contato, com a linha de copyright.
 *
 * Por decisao do usuario, mantidos os dados reais de contato (o print tinha
 * placeholders) e, numa linha discreta, a identificacao exigida pelo CFO
 * (razao social, CNPJ, responsavel tecnica + CRO) e o link da privacidade
 * (LGPD). Saiu o bloco "Como chegar" com mapa; o endereco abre o Google Maps.
 * Sem LinkedIn (a clinica nao tem).
 */
export function Footer() {
  const pagina = usePathname() ?? '/';
  const mapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.enderecoMaps)}`;

  return (
    <footer className="bg-white pt-16 pb-10 text-ink">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr_1.25fr] lg:gap-8">
          {/* Marca */}
          <div>
            <Logo variante="colorida" className="h-14" />
            <p className="mt-4 max-w-[32ch] text-[0.9375rem] font-light leading-[1.65] text-ink-muted">{rodape.texto}</p>
            <div className="mt-7 flex items-center gap-4">
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram da Lien (${site.instagram.arroba})`}
                className={botaoRede}
              >
                <Instagram size={19} strokeWidth={2} aria-hidden="true" />
              </a>
              <a
                href={whatsappUrlPor('rodape')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('rodape', pagina)}
                data-cta="rodape"
                data-page={pagina}
                aria-label="WhatsApp da Lien (abre o WhatsApp)"
                className={botaoRede}
              >
                <WhatsAppIcon size={19} />
              </a>
            </div>
          </div>

          {/* Secoes do site */}
          <nav aria-label={rodape.rotuloSecoes}>
            <ul className="flex flex-col gap-3 text-[0.9375rem] font-light text-ink-muted lg:pt-3">
              {rodape.secoes.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={link}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Tratamentos */}
          <nav aria-label={rodape.rotuloTratamentos}>
            <ul className="flex flex-col gap-3 text-[0.9375rem] font-light text-ink-muted lg:pt-3">
              {rodape.tratamentos.map((item) => (
                <li key={item.href + item.label}>
                  <a href={item.href} className={link}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <ul className="flex flex-col gap-4 text-[0.9375rem] font-light text-ink-muted lg:pt-3">
            <li className="flex items-start gap-3">
              <MapPin size={17} strokeWidth={2} aria-hidden="true" className={icone} />
              <a href={mapa} target="_blank" rel="noopener noreferrer" className={link}>
                {rodape.endereco}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={17} strokeWidth={2} aria-hidden="true" className={icone} />
              <a href={`tel:${site.telefoneE164}`} className={link}>
                {site.telefoneExibicao}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={17} strokeWidth={2} aria-hidden="true" className={icone} />
              <a href={`mailto:${site.email}`} className={`break-all ${link}`}>
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Clock size={17} strokeWidth={2} aria-hidden="true" className={icone} />
              <span>
                {site.horarios.map((h, i) => (
                  <span key={h.dias} className="block">
                    {rodape.horarios[i]}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-14 border-t border-ink/60 pt-6 text-[0.8125rem] text-ink-muted">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>{rodape.copyright}</p>
            <p>{rodape.assinatura}</p>
          </div>
          {/* Identificacao obrigatoria pelo CFO + privacidade (LGPD), discretas. */}
          <p className="mt-3 text-[0.75rem] text-ink-muted/90">
            {site.razaoSocial} · CNPJ {site.cnpj} · Responsável técnica: {site.responsavelTecnica} · {site.cro} ·{' '}
            <a href="/privacidade/" className={`underline underline-offset-2 ${link}`}>
              {rodape.privacidade}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
