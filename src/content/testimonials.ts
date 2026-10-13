/**
 * Depoimentos de "Quem vive a Lien, conta." — transcricao fiel das
 * avaliacoes no Google (prompt "depoimentos-lien", out/2026). LITERAIS: nao
 * corrigir pontuacao nem gramatica do paciente.
 *
 * [PENDENTE: a clinica confirmar (1) a autorizacao de cada paciente para
 * exibir nome e texto no site; (2) o tratamento real de cada um — o 1o texto
 * fala de limpeza, mas o rotulo aprovado no print e "Reabilitacao Oral"
 * (alternativa segura: "Clinica Geral"); (3) a grafia "Nadia Graciely" e
 * "Nilson Antonio" como no Google.]
 */
export type Testimonial = {
  text: string;
  name: string;
  context: string; // aparece como "Paciente {context} · Google Reviews"
};

export const testimonials: Testimonial[] = [
  {
    text: "Realizei a limpeza com a Dra. Natália Simões, que imaginei ser um procedimento simples, mas acabou sendo uma verdadeira experiência. Fui um pouco tensa, achando que sentiria dor, e me surpreendi com uma massagem facial relaxante durante a aplicação do flúor. Nunca mais vou reclamar de fazer limpeza! Foi surpreendente e fiquei extremamente satisfeita.",
    name: "Alessandra Lopes",
    context: "Reabilitação Oral",
  },
  {
    text: "Se existe uma clínica para quem tem medo de dentista, é a Lien, nunca me senti tão confortável e relaxado sentado na cadeira do dentista, sensacional!",
    name: "Nilson Antônio",
    context: "Implantes",
  },
  {
    text: "Minha experiência com Dra Natália foi excelente, sendo a mesma uma profissional muito competente, cuidadosa com todos os detalhes , explicações durante o atendimento e tratamento. Isso para mim é essencial e ela me passou muita segurança e confiança em realizar o procedimento com ela. Super indico o trabalho dela!",
    name: "Nádia Graciely",
    context: "Prótese e Estética",
  },
];
