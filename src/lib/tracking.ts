/**
 * Rastreamento de conversao.
 *
 * Requisito do prompt mestre: sem GTM instalado, o build deve continuar
 * funcionando — falha silenciosa, nunca erro em console. Por isso o dataLayer
 * e criado sob demanda e todo o push vive em try/catch.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Clique em CTA de agendamento (WhatsApp). `origem` = secao (data-cta) e
 * `pagina` = rota (data-page): medem conversao por secao e por pagina,
 * inclusive mobile x desktop (o GA4 ja separa por dispositivo).
 */
export const trackWhatsAppClick = (origem: string, pagina?: string) => {
  try {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'click_whatsapp',
      origem,
      pagina: pagina ?? window.location.pathname,
    });
  } catch {
    // Silencio proposital: rastreamento nunca deve quebrar a conversao.
  }
};
