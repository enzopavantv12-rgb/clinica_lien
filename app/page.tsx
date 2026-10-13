import { Header } from '@/components/sections/Header';
import { Hero, MEDIA_EMPILHADO, MEDIA_FUNDO } from '@/components/sections/Hero';
import { TrustMarquee } from '@/components/sections/TrustMarquee';
import { Resultados } from '@/components/sections/Resultados';
import { Testimonials } from '@/components/sections/Testimonials';
import { Sobre } from '@/components/sections/Sobre';
import { MetodoLien } from '@/components/sections/MetodoLien';
import { Tratamentos } from '@/components/sections/Tratamentos';
import { Sedacao } from '@/components/sections/Sedacao';
import { Experiencia } from '@/components/sections/Experiencia';
import { Equipe } from '@/components/sections/Equipe';
import { ConteudosHome } from '@/components/sections/ConteudosHome';
import { Faq } from '@/components/sections/Faq';
import { CtaFinal } from '@/components/sections/CtaFinal';
import { Footer } from '@/components/sections/Footer';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';
import { JsonLd } from '@/components/ui/JsonLd';
import { schemaFaq } from '@/data/schema';
import { hero } from '@/data/content';
import { preload } from 'react-dom';

/**
 * Ordem final da home (alinhamento final 2026, secao 3): hero, faixa unica,
 * prova clinica (Resultados) e prova emocional (Depoimentos), historia da
 * marca, Metodo, navegacao por queixa, 3 tratamentos, Sedacao, Experiencia,
 * Equipe, 3 conteudos, Duvidas e CTA final. O verificar-build.mjs confere
 * esta ordem — atualize os dois juntos.
 */
export default function Home() {
  // Preload da foto da hero (o LCP). Um por composicao, com `media`, para o
  // celular nao baixar a versao 16:9 nem o desktop o recorte vertical. So
  // AVIF: navegador sem suporte ignora o preload pelo `type` e cai no
  // <picture> normal.
  const { imagem } = hero;
  preload(`${imagem.base}-1440.avif`, {
    as: 'image',
    type: 'image/avif',
    fetchPriority: 'high',
    imageSrcSet: imagem.larguras.map((l) => `${imagem.base}-${l}.avif ${l}w`).join(', '),
    imageSizes: '100vw',
    media: MEDIA_FUNDO,
  });
  preload(`${imagem.mobile}.avif`, {
    as: 'image',
    type: 'image/avif',
    fetchPriority: 'high',
    media: MEDIA_EMPILHADO,
  });

  return (
    <>
      {/* FAQPage so aqui: corresponde as perguntas visiveis em #duvidas. */}
      <JsonLd schemas={[schemaFaq]} />
      <Header />

      <main>
        <Hero />
        <TrustMarquee />
        <Resultados />
        <Testimonials />
        <Sobre />
        {/* Metodo + "Por onde voce quer comecar?" (#comecar) no mesmo fundo. */}
        <MetodoLien />
        <Tratamentos />
        <Sedacao />
        <Experiencia />
        <Equipe />
        <ConteudosHome />
        <Faq />
        <CtaFinal />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
