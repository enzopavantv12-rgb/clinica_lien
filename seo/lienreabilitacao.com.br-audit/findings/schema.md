# Auditoria Schema.org - lienreabilitacao.com.br (23/11/2026)

Fontes: src/data/schema.ts, src/data/content.ts (não modificados) + JSON-LD renderizado nas 4 URLs (todas HTTP 200, schema server-rendered, canonical OK).

## 1. Detecção

| Página | Blocos JSON-LD |
|---|---|
| Home | Dentist/LocalBusiness/MedicalBusiness (#clinica), Person (#natalia-simoes), FAQPage (#duvidas) |
| /tratamentos/ | Dentist (#clinica), Person, BreadcrumbList |
| /conteudos/ | Dentist (#clinica), Person, BreadcrumbList |
| /implante-dentario-belo-horizonte/ | Dentist, Person, Article, BreadcrumbList (3 níveis) |

Todos: @context https://schema.org, URLs absolutas, datas ISO 8601, JSON válido.

## 2. Validação

- Dentist/LocalBusiness: PASS. Obrigatórios do Google (name, address) presentes; recomendados presentes: telephone, url, openingHoursSpecification, image, sameAs. Faltam: `geo` (removido por pendência), foto real em `image`, `@id` dentro de `founder`.
- openingHoursSpecification: PASS (seg/ter/qui/sex 8-18h, qua 9-20h). Confirmar com a clínica que sábado/domingo = fechado.
- Person: PASS. identifier CRO-MG 49.821 correto. Problemas: `url` aponta para a home (deveria ser página própria da Dra.), sem `image`, sem `alumniOf`/`hasCredential`.
- FAQPage (home): sem rich result desde 07/05/2026. Prioridade INFO. Sem dano; manter ou remover é indiferente para o Google. Não é Q&A de usuários, portanto não migrar para QAPage.
- BreadcrumbList: PASS nas 3 páginas internas (position, name, item absolutos).
- Article: PASS no mínimo, mas incompleto. Faltam `image` (recomendado pelo Google), `author.url`, `dateModified` real; `publisher.logo` está como string (preferível ImageObject); `publisher` deveria ser Organization simples com @id. author.name ("Dra. Natália Ferreira Simões") difere do nome exibido no site ("Dra. Natália Simões"): alinhar com o byline visível.
- Conteúdo YMYL (saúde): ter author com credencial + reviewedBy é ponto forte de E-E-A-T.
- Inconsistência: `availableService` lista MedicalProcedure com URLs `/tratamentos/#slug` (âncoras). Válido, mas fraco; sem descrição nem relação com o prestador.

## 3. Prioridades

**Alta**
1. Adicionar `WebSite` (+ `publisher` -> #clinica) na home. Ausente.
2. Reativar `geo` assim que as coordenadas do Edifício Asteca forem confirmadas (Av. do Contorno 5351 - aprox. -19.93, -43.93, NÃO usar sem conferir no Maps).
3. Article: adicionar `image` (1200px+, 16:9/4:3/1:1), `author.url`, `dateModified` correta; publisher.logo como ImageObject.
4. `image` do Dentist: trocar a logo por foto real da fachada/recepção (+ manter logo em `logo`).

**Média**
5. `hasOfferCatalog` com Offer -> Service/MedicalProcedure (sem preço, sem `price`/`priceRange`), substituindo/complementando `availableService`.
6. `employee` (Person com CRO) para os 6 profissionais; trocar `founder` por referência `@id`. Não usar `member` (é para Organization).
7. Página própria da Dra. Natália (/equipe/dra-natalia-simoes/) e apontar `Person.url` para ela; `sameAs` com Instagram, e Lattes/CFO se existirem.
8. `areaServed`: ampliar para lista (Belo Horizonte + bairros/Contagem/Nova Lima se de fato atendem pacientes de lá).
9. `ItemList`/CollectionPage em /tratamentos/ e /conteudos/ (opcional, sem rich result).

**Baixa / Info**
10. FAQPage: sem benefício no Google; manter (benefício GEO não confirmado).
11. Simplificar @type para `["Dentist","MedicalBusiness"]` (Dentist já herda LocalBusiness); opcional.
12. `sameAs` do Dentist: adicionar Google Business Profile (URL do Maps/CID), Doctoralia se houver; TikTok só quando `exibir: true`.
13. `isAccessibleForFree`, `speakable` e `about` (MedicalProcedure) no Article: opcionais.

Não recomendado (conforme regras): aggregateRating/Review próprio, priceRange, HowTo, FAQPage novo.

## 4. Snippets JSON-LD prontos

### 4.1 WebSite (home)
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://lienreabilitacao.com.br/#website",
  "url": "https://lienreabilitacao.com.br/",
  "name": "Lien Reabilitação Oral",
  "inLanguage": "pt-BR",
  "publisher": { "@id": "https://lienreabilitacao.com.br/#clinica" }
}
```

### 4.2 Complemento ao Dentist (mesclar no objeto existente)
```json
{
  "@type": ["Dentist", "MedicalBusiness"],
  "@id": "https://lienreabilitacao.com.br/#clinica",
  "geo": { "@type": "GeoCoordinates", "latitude": 0.0, "longitude": 0.0 },
  "areaServed": [
    { "@type": "City", "name": "Belo Horizonte" },
    { "@type": "AdministrativeArea", "name": "Região Metropolitana de Belo Horizonte" }
  ],
  "founder": { "@id": "https://lienreabilitacao.com.br/#natalia-simoes" },
  "employee": [
    { "@id": "https://lienreabilitacao.com.br/#natalia-simoes" },
    { "@id": "https://lienreabilitacao.com.br/#alexander-pedrosa" },
    { "@id": "https://lienreabilitacao.com.br/#gabriela-ribeiro" },
    { "@id": "https://lienreabilitacao.com.br/#luiza-henriques" },
    { "@id": "https://lienreabilitacao.com.br/#maria-emilia-murta" },
    { "@id": "https://lienreabilitacao.com.br/#isabela-guieiro" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Tratamentos",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "MedicalProcedure",
          "name": "Implante dentário",
          "url": "https://lienreabilitacao.com.br/tratamentos/#implantes",
          "procedureType": "https://schema.org/SurgicalProcedure"
        }
      }
    ]
  }
}
```
Atenção: latitude/longitude = 0.0 é placeholder; NÃO publicar sem as coordenadas reais (preencher a partir de `site` quando confirmadas). Slugs do catálogo devem vir de `tratamentos.lista` (gerar por map, sem preço).

### 4.3 Equipe (gerar por map sobre `equipe.membros`)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://lienreabilitacao.com.br/#alexander-pedrosa",
  "name": "Dr. Alexander Pedrosa",
  "honorificPrefix": "Dr.",
  "jobTitle": "Cirurgia e Traumatologia Bucomaxilofacial",
  "identifier": { "@type": "PropertyValue", "propertyID": "CRO-MG", "value": "26.562" },
  "image": "https://lienreabilitacao.com.br/img/equipe-alexander-pedrosa.webp",
  "worksFor": { "@id": "https://lienreabilitacao.com.br/#clinica" }
}
```
CROs: Natália 49.821, Alexander 26.562, Gabriela 65.103, Luiza 64.936, Maria Emília 36.401, Isabela 42.820. Usar `jobTitle` conforme a credencial oficial (conflito C8: evitar "Especialista" sem revisão do CRO).

### 4.4 Person da Dra. Natália (ajustes)
```json
{
  "@type": "Person",
  "@id": "https://lienreabilitacao.com.br/#natalia-simoes",
  "name": "Natália Ferreira Simões",
  "honorificPrefix": "Dra.",
  "image": "https://lienreabilitacao.com.br/img/equipe-natalia-simoes.webp",
  "url": "https://lienreabilitacao.com.br/equipe/dra-natalia-simoes/",
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "license",
    "name": "CRO-MG 49.821",
    "recognizedBy": { "@type": "Organization", "name": "Conselho Regional de Odontologia de Minas Gerais" }
  }
}
```
(`url` só após a página existir.)

### 4.5 Article (substituir `schemaArtigo`)
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Implante dentário: quando é indicado - e quando pode exigir preparo antes",
  "description": "Entenda quando o implante dentário pode ser indicado...",
  "image": ["https://lienreabilitacao.com.br/img/artigos/implante-dentario-belo-horizonte.webp"],
  "datePublished": "2026-10-12",
  "dateModified": "2026-10-12",
  "inLanguage": "pt-BR",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://lienreabilitacao.com.br/implante-dentario-belo-horizonte/" },
  "author": {
    "@type": "Person",
    "@id": "https://lienreabilitacao.com.br/#natalia-simoes",
    "name": "Dra. Natália Simões",
    "url": "https://lienreabilitacao.com.br/equipe/dra-natalia-simoes/",
    "identifier": { "@type": "PropertyValue", "propertyID": "CRO-MG", "value": "49.821" }
  },
  "publisher": {
    "@type": "Organization",
    "@id": "https://lienreabilitacao.com.br/#clinica",
    "name": "Lien Reabilitação Oral",
    "logo": { "@type": "ImageObject", "url": "https://lienreabilitacao.com.br/marca/logo-rgb.png" }
  }
}
```
A imagem do artigo é hipotética: ajustar ao arquivo real (ver `og:image` da página). Em schemaArtigo, adicionar parâmetros `imagem` e `modificado`.

## 5. Observação técnica
Dentist/Person/FAQ vão em todas as páginas repetidos (Dentist+Person nas 4). Recomendado manter o bloco completo só na home e nas demais referenciar por `@id` (reduz peso e risco de divergência). Sem sandbox/Playwright envolvido (fetch direto com curl).
