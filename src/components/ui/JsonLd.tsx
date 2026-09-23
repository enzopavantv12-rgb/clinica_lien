/**
 * Injeta dados estruturados JSON-LD.
 *
 * No body e o padrao recomendado pelo Next; o Google le o schema em qualquer
 * lugar do documento. O dado e nosso, nao vem de entrada de usuario.
 *
 * O `<` escapado como < e obrigatorio: JSON.stringify nao escapa `<`, e
 * uma string do content.ts que viesse a conter `</script` fecharia o bloco no
 * meio e truncaria o documento.
 */
export function JsonLd({ schemas }: { schemas: readonly object[] }) {
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\u003c') }}
        />
      ))}
    </>
  );
}
