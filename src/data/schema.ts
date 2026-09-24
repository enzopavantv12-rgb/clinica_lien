import { equipe, faq, seo, site, tratamentos } from './content';

/**
 * JSON-LD derivado do content.ts.
 *
 * O FAQPage e um map sobre o mesmo objeto `faq` da secao de duvidas: editar
 * uma pergunta la ja atualiza o schema. A lista de servicos vem de
 * `tratamentos`, pelo mesmo motivo.
 *
 * Atualizado pelo briefing oficial (set/2026):
 * - horario, CEP, Instagram e nome completo da responsavel tecnica corrigidos;
 * - `geo` REMOVIDO ate as coordenadas serem confirmadas. Um placeholder em
 *   latitude/longitude invalida o bloco inteiro — melhor sem o campo.
 *   [PENDENTE: latitude e longitude do Edificio Asteca]
 * - `priceRange` REMOVIDO: o briefing proibe qualquer referencia a preco.
 * - sem `aggregateRating`: autoavaliacao em schema proprio contraria a
 *   politica do Google (briefing, secao 7).
 */

/** @id do bloco da clinica. O `worksFor` do Person aponta para ele. */
const idClinica = `${site.url}/#clinica`;

const natalia = equipe.membros[0];

/** Cargo da Dra. Natalia no schema — mais formal que o do card. */
const cargoNatalia = 'Cirurgiã-Dentista — Implantodontia, Prótese e Periodontia';

const logo = `${site.url}/marca/logo-rgb.png`;

const endereco = {
  '@type': 'PostalAddress',
  streetAddress: `${site.endereco.rua} — ${site.endereco.edificio}`,
  addressLocality: site.endereco.cidade,
  addressRegion: site.endereco.uf,
  postalCode: site.endereco.cep,
  addressCountry: 'BR',
};

const servicos = [
  tratamentos.destaque,
  ...tratamentos.medios,
  ...tratamentos.grade,
  ...tratamentos.compactos,
].map((t) => ({ '@type': 'MedicalProcedure', name: t.nome }));

export const schemaDentist = {
  '@context': 'https://schema.org',
  '@type': ['Dentist', 'LocalBusiness', 'MedicalBusiness'],
  '@id': idClinica,
  name: site.nome,
  legalName: site.razaoSocial,
  description: seo.description,
  url: site.url,
  telephone: site.telefoneE164,
  email: site.email,
  // [PENDENTE: foto real da clinica — ate la, a logo oficial]
  image: logo,
  logo,
  address: endereco,
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.enderecoMaps)}`,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Wednesday'],
      opens: '09:00',
      closes: '20:00',
    },
  ],
  areaServed: { '@type': 'City', name: 'Belo Horizonte' },
  medicalSpecialty: 'Dentistry',
  availableService: servicos,
  founder: {
    '@type': 'Person',
    name: site.responsavelTecnica,
    jobTitle: cargoNatalia,
  },
  sameAs: [site.instagram.url, ...(site.tiktok.exibir ? [site.tiktok.url] : [])],
};

export const schemaFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${site.url}/#duvidas`,
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
  name: site.responsavelTecnica,
  honorificPrefix: 'Dra.',
  jobTitle: cargoNatalia,
  description: `Fundadora e responsável técnica da ${site.nome}, em Belo Horizonte. ${natalia.bio}`,
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'CRO-MG',
    value: site.cro.replace('CRO-MG ', ''),
  },
  worksFor: {
    '@type': ['Dentist', 'LocalBusiness', 'MedicalBusiness'],
    '@id': idClinica,
    name: site.nome,
  },
  url: site.url,
  workLocation: { '@type': 'Place', address: endereco },
  knowsAbout: ['Implantodontia', 'Reabilitação Oral', 'Prótese Dentária', 'Periodontia'],
  sameAs: [site.instagram.url],
};
