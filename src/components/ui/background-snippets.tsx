/**
 * Fundo "grade + brilho" (background-snippets, 21st.dev), adaptado a Lien:
 * o brilho radial lilas do original (#d5c5ff) virou o rosa-fucsia da paleta
 * (#F0B6F2, o tom que o manual reserva para fundo e brilho). Grade e branco
 * como no original.
 *
 * Posicao do brilho: no original, circulo de 800px a 200px do topo — bem na
 * altura das tags teal dos titulos, que sobre o rosa caiam para 4,3:1 (o teal
 * so passa AA sobre branco quase puro). Aqui o brilho sai da mesma borda
 * direita, mas centrado a 55% da altura e com 640px (420px no celular, onde
 * as secoes sao mais estreitas): nao alcanca os titulos em nenhuma largura.
 *
 * Movimento (globals.css, .fundo-grade-*): a grade desliza na diagonal uma
 * celula por minuto, em loop sem emenda, e o brilho "respira" devagar. So
 * transform e opacity (compositados, sem repintura); parado com movimento
 * reduzido.
 *
 * Fica atras do conteudo (-z-10): a secao que o usa precisa de `relative
 * isolate`, senao o -z-10 escapa para tras do fundo da pagina.
 */
export const Component = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-hidden bg-white"
    >
      {/* Grade maior que a secao em uma celula, para deslizar sem mostrar borda. */}
      <div className="fundo-grade-trama absolute -inset-x-[6rem] -inset-y-[4rem] bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]" />
      <div className="fundo-grade-brilho absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_420px_at_right_55%,#F0B6F2,transparent)] md:bg-[radial-gradient(circle_640px_at_right_55%,#F0B6F2,transparent)]"></div>
    </div>
  );
};

/** Nome em portugues usado nas secoes. */
export { Component as FundoGrade };
