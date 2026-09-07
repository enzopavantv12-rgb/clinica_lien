import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { Numeros } from '@/components/sections/Numeros';
import { MetodoLien } from '@/components/sections/MetodoLien';
import { Especialidades } from '@/components/sections/Especialidades';
import { Experiencia } from '@/components/sections/Experiencia';
import { Equipe } from '@/components/sections/Equipe';
import { Ambientes } from '@/components/sections/Ambientes';
import { Depoimentos } from '@/components/sections/Depoimentos';
import { Faq } from '@/components/sections/Faq';
import { CtaFinal } from '@/components/sections/CtaFinal';
import { Footer } from '@/components/sections/Footer';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';

export default function Home() {
  return (
    <>
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
