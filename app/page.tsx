import { Header } from '@/components/sections/Header';
import { Hero, MEDIA_EMPILHADO, MEDIA_FUNDO } from '@/components/sections/Hero';
import { TrustMarquee } from '@/components/sections/TrustMarquee';
import { Testimonials } from '@/components/sections/Testimonials';
import { Cardapio } from '@/components/sections/Cardapio';
import { Sobre } from '@/components/sections/Sobre';
import { MetodoLien } from '@/components/sections/MetodoLien';
import { Tratamentos } from '@/components/sections/Tratamentos';
import { Sedacao } from '@/components/sections/Sedacao';
import { Experiencia } from '@/components/sections/Experiencia';
import { Estrutura } from '@/components/sections/Estrutura';
import { Equipe } from '@/components/sections/Equipe';
import { Resultados } from '@/components/sections/Resultados';
import { Faq } from '@/components/sections/Faq';
import { CtaFinal } from '@/components/sections/CtaFinal';
import { Footer } from '@/components/sections/Footer';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';
import { JsonLd } from '@/components/ui/JsonLd';
import { schemaFaq } from '@/data/schema';
import { hero } from '@/data/content';
import { preload } from 'react-dom';

/**
 * Ordem das secoes: prompt "numeros, depoimentos e midia" (set/2026). Prova
 * social logo apos o hero (faixa de numeros + depoimentos), depois o manifesto
 * (Sobre), o Metodo e o cardapio de situacoes levando aos tratamentos. O
 * verificar-build.mjs confere esta ordem — atualize os dois juntos.
 * `Resultados` so renderiza com SHOW_RESULTS ligado.
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
        <Testimonials />
        <Sobre />
        <MetodoLien />
        <Cardapio />
        <Tratamentos />
        <Sedacao />
        <Experiencia />
        <Estrutura />
        <Equipe />
        <Resultados />
        <Faq />
        <CtaFinal />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
