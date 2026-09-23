'use client';

import { WhatsAppIcon } from './WhatsAppIcon';
import { whatsappUrlPor } from '../../lib/whatsapp';
import { trackWhatsAppClick } from '../../lib/tracking';
import type { OrigemWhatsApp } from '../../data/content';

/**
 * CTA de WhatsApp em forma de link de texto — o "Quero conversar sobre isso"
 * dos cards. Mesma URL, mesmo rastreamento e mesmo `data-cta` do
 * WhatsAppButton; so a aparencia muda.
 *
 * `contexto` entra no sufixo para leitor de tela: varios cards tem o mesmo
 * texto visivel, e sem ele a lista de links do leitor ficaria com N entradas
 * identicas.
 */
export function WhatsAppLink({
  origem,
  children,
  contexto,
  claro = false,
  className = '',
}: {
  origem: OrigemWhatsApp;
  children: React.ReactNode;
  contexto: string;
  claro?: boolean;
  className?: string;
}) {
  return (
    <a
      href={whatsappUrlPor(origem)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick(origem)}
      data-cta={origem}
      className={`group/link inline-flex items-center gap-2 self-start rounded-xl text-[0.9375rem] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
        claro
          ? 'text-white hover:text-magenta-light focus-visible:outline-white'
          : 'text-teal hover:text-magenta focus-visible:outline-magenta'
      } ${className}`}
    >
      <WhatsAppIcon
        size={18}
        className="transition-transform duration-300 motion-safe:group-hover/link:scale-110"
      />
      {children}
      <span className="sr-only"> — {contexto} (abre o WhatsApp)</span>
    </a>
  );
}
