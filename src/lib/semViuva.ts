/**
 * Sem palavra viuva: une as duas ultimas palavras com espaco nao separavel
 * (U+00A0), para a ultima linha nunca ficar com uma palavra sozinha.
 * Complementa o `text-wrap: pretty` do globals.css, que o Chrome aplica so em
 * parte e o Safari anterior ao 26 ignora. Por padrao, textos de ate 3
 * palavras ficam como estao; `minimo` baixa o limite (nomes, rotulos).
 */
export function semViuva(texto: string, minimo = 4): string {
  const palavras = texto.trim().split(/\s+/);
  if (palavras.length < minimo) return texto;
  return texto.replace(/\s+(\S+)\s*$/, ' $1');
}
