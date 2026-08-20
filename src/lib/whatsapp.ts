import { site, whatsappMensagens, type OrigemWhatsApp } from '../data/content';

/** Monta a URL do WhatsApp com a mensagem pre-preenchida. */
export const buildWhatsAppUrl = (message: string) =>
  `https://wa.me/${site.whatsappNumero}?text=${encodeURIComponent(message)}`;

/** URL a partir de uma origem catalogada em content.ts. */
export const whatsappUrlPor = (origem: OrigemWhatsApp) =>
  buildWhatsAppUrl(whatsappMensagens[origem]);
