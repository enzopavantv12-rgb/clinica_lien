import { WhatsAppIcon } from './WhatsAppIcon';
import { whatsappUrlPor } from '../../lib/whatsapp';
import { trackWhatsAppClick } from '../../lib/tracking';
import type { OrigemWhatsApp } from '../../data/content';

type Variante = 'magenta' | 'branco' | 'outline';

const variantes: Record<Variante, string> = {
  magenta:
    'bg-magenta text-white hover:bg-[#87146F] focus-visible:outline-magenta shadow-soft',
  branco:
    'bg-white text-magenta hover:bg-cream focus-visible:outline-white shadow-soft',
  outline:
    'bg-transparent text-ink border border-ink/25 hover:border-ink hover:bg-ink/[0.04] focus-visible:outline-ink',
};

const tamanhos = {
  md: 'px-5 py-3 text-[0.9375rem]',
  lg: 'px-7 py-4 text-base sm:text-[1.0625rem]',
};

/**
 * CTA de conversao. Todo clique dispara `click_whatsapp` no dataLayer com a
 * `origem` da secao — requisito de rastreamento do prompt mestre.
 */
export function WhatsAppButton({
  origem,
  children,
  variante = 'magenta',
  tamanho = 'lg',
  className = '',
  comIcone = true,
}: {
  origem: OrigemWhatsApp;
  children: React.ReactNode;
  variante?: Variante;
  tamanho?: keyof typeof tamanhos;
  className?: string;
  comIcone?: boolean;
}) {
  return (
    <a
      href={whatsappUrlPor(origem)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick(origem)}
      className={`inline-flex items-center justify-center gap-2.5 rounded-2xl font-medium transition-all duration-300 ease-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 motion-safe:hover:-translate-y-0.5 ${variantes[variante]} ${tamanhos[tamanho]} ${className}`}
    >
      {comIcone && <WhatsAppIcon size={20} />}
      {children}
    </a>
  );
}
