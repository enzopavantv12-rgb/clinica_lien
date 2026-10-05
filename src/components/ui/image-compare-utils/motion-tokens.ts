/**
 * Molas do ImageCompare (o prompt importa este arquivo sem traze-lo).
 * - snappy: o divisor seguindo o dedo/teclado, firme e sem quicar.
 * - morph: mudancas de forma (alca em capsula, giro da orientacao), um pouco
 *   mais macias.
 * `type: "spring"` permite usar o token direto como `transition` do motion.
 */
export const motionTokens = {
  spring: {
    snappy: { type: "spring" as const, visualDuration: 0.28, bounce: 0.12 },
    morph: { type: "spring" as const, visualDuration: 0.36, bounce: 0.2 },
  },
};
