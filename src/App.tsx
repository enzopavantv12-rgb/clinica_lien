import { Helmet } from 'react-helmet-async';
import { Header } from './components/sections/Header';
import { Hero } from './components/sections/Hero';
import { Numeros } from './components/sections/Numeros';
import { MetodoLien } from './components/sections/MetodoLien';
import { Especialidades } from './components/sections/Especialidades';
import { Experiencia } from './components/sections/Experiencia';
import { Equipe } from './components/sections/Equipe';
import { Ambientes } from './components/sections/Ambientes';
import { Depoimentos } from './components/sections/Depoimentos';
import { Faq } from './components/sections/Faq';
import { CtaFinal } from './components/sections/CtaFinal';
import { Footer } from './components/sections/Footer';
import { FloatingWhatsApp } from './components/ui/FloatingWhatsApp';
import { seo, site } from './data/content';

export default function App() {
  return (
    <>
      <Helmet>
        <html lang="pt-BR" />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={seo.canonical} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta name="theme-color" content={seo.themeColor} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:site_name" content={site.nome} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={seo.canonical} />
        <meta property="og:image" content={seo.ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Lien Reabilitação Oral — implantes e reabilitação oral em Belo Horizonte"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={seo.ogImage} />
      </Helmet>

      <Header />

      <main>
        <Hero />
        <Numeros />
        <MetodoLien />
        <Especialidades />
        <Experiencia />
        <Equipe />
        <Ambientes />
        <Depoimentos />
        <Faq />
        <CtaFinal />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
