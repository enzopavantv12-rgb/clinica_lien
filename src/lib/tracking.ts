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

export const trackWhatsAppClick = (origem: string) => {
  try {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'click_whatsapp', origem });
  } catch {
    // Silencio proposital: rastreamento nunca deve quebrar a conversao.
  }
};
