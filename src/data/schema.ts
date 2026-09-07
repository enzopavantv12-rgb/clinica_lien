import { CONFIRMAR, equipe, faq, seo, site } from './content';

/**
 * JSON-LD derivado do content.ts.
 *
 * Motivo de existir: antes, o FAQ vivia em dois lugares — content.ts e o
 * schema FAQPage escrito a mao no index.html — e qualquer edicao tinha que
 * ser feita nos dois. Agora o FAQPage e um map sobre o mesmo objeto `faq`.
 *
 * Os tres blocos sao um porte 1:1 do que estava no index.html: nenhuma
 * propriedade foi acrescentada ou removida. CEP e coordenadas continuam
 * placeholders — pendencia 3 do README, dona a clinica.
 */

/** @id do bloco da clinica. O `worksFor` do Person aponta para ele. */
const idClinica = `${site.url}/#clinica`;

/** Cargo da Dra. Natalia no schema — mais formal que o `titulo` do content.ts. */
const cargoNatalia = 'Cirurgiã-Dentista — Implantodontia, Prótese e Periodontia';

export const schemaDentist = {
  '@context': 'https://schema.org',
  '@type': ['Dentist', 'LocalBusiness', 'MedicalBusiness'],
  '@id': idClinica,
  name: site.nome,
  description:
    'Clínica especializada em implantodontia, reabilitação oral e prótese dentária em Belo Horizonte, com atendimento humanizado para pacientes com ansiedade odontológica.',
  url: site.url,
  telephone: site.telefoneE164,
  priceRange: '$$$',
  image: seo.ogImage,
  logo: `${site.url}/logo-lien.svg`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. do Contorno, 5351 — Edifício Asteca',
    addressLocality: 'Belo Horizonte',
    addressRegion: 'MG',
    postalCode: '[[CONFIRMAR CEP]]',
    addressCountry: 'BR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: CONFIRMAR,
    longitude: CONFIRMAR,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '19:00',
    },
  ],
  areaServed: { '@type': 'City', name: 'Belo Horizonte' },
  medicalSpecialty: 'Dentistry',
  availableService: [
    { '@type': 'MedicalProcedure', name: 'Implantodontia Digital' },
    { '@type': 'MedicalProcedure', name: 'Reabilitação Oral Completa' },
    { '@type': 'MedicalProcedure', name: 'Prótese Dentária' },
    { '@type': 'MedicalProcedure', name: 'Periodontia' },
    { '@type': 'MedicalProcedure', name: 'Lentes de Contato Dental' },
    { '@type': 'MedicalProcedure', name: 'Tratamento de Disfunção de ATM' },
  ],
  founder: {
    '@type': 'Person',
    name: equipe.membros[0].nome,
    jobTitle: cargoNatalia,
  },
  sameAs: [site.instagram, site.tiktok],
};

export const schemaFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${site.url}/#faq`,
  mainEntity: faq.itens.map((item) => ({
    '@type': 'Question',
    name: item.pergunta,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.resposta,
    },
  })),
};

export const schemaPerson = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${site.url}/#natalia-simoes`,
  name: equipe.membros[0].nome,
  jobTitle: cargoNatalia,
  description:
    'Fundadora da Lien Reabilitação Oral e referência em reabilitação oral completa em Belo Horizonte, com atenção especial a pacientes com ansiedade odontológica.',
  worksFor: {
    '@type': ['Dentist', 'LocalBusiness', 'MedicalBusiness'],
    '@id': idClinica,
    name: site.nome,
  },
  url: site.url,
  telephone: site.telefoneE164,
  workLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. do Contorno, 5351 — Edifício Asteca',
      addressLocality: 'Belo Horizonte',
      addressRegion: 'MG',
      addressCountry: 'BR',
    },
  },
  knowsAbout: ['Implantodontia', 'Reabilitação Oral', 'Prótese Dentária', 'Periodontia'],
};
