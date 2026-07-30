// src/pages/Home.tsx
// Site institucional de página única do Teatro São Carlos. Sem login,
// sem cadastro — só a experiência de boas-vindas e a lista de eventos.

import { useEffect, useRef, useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import WelcomeHero from '../components/common/WelcomeHero';
import AtmosphereBackground from '../components/common/AtmosphereBackground';
import PublicEventList from '../components/public/PublicEventList';
import { abrirCortina, aplicarParallax } from '../utils/gsapAnimations';

export default function Home() {
  const [cortinaAberta, setCortinaAberta] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    abrirCortina(() => setCortinaAberta(true));
  }, []);

  useEffect(() => {
    // Parallax mais dramático: a textura de fundo do dashboard se move
    // visivelmente mais devagar que o scroll, dando sensação de profundidade.
    aplicarParallax('.dashboard-fundo', 0.5);
  }, []);

  function irParaDashboard() {
    dashboardRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="relative min-h-screen">
      {/* Fundo vivo: gradiente dinâmico + partículas + holofote, fixo atrás de tudo */}
      <AtmosphereBackground />

      {/* Cortina de teatro na entrada, com um brilho dourado no instante final */}
      {!cortinaAberta && (
        <div className="pointer-events-none fixed inset-0 z-[100] flex">
          <div className="cortina-esquerda h-full w-1/2 bg-gradient-to-r from-[#4A0E0E] to-[#7A1F1F]" />
          <div className="cortina-direita h-full w-1/2 bg-gradient-to-l from-[#4A0E0E] to-[#7A1F1F]" />
          <div
            className="cortina-brilho pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(232,199,102,0.9), rgba(201,162,39,0.2) 40%, transparent 70%)',
            }}
          />
        </div>
      )}

      <Header />

      {/* 1) Tela de boas-vindas — tela cheia, só visual, sem login */}
      <WelcomeHero onExplorar={irParaDashboard} />

      {/* 2) Dashboard — a lista pública de eventos */}
      <div id="eventos" ref={dashboardRef} className="relative scroll-mt-20 overflow-hidden">
        {/* camada de textura, que se move em parallax mais acentuado */}
        <div
          className="dashboard-fundo pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-45deg, #C9A227 0px, #C9A227 1px, transparent 1px, transparent 32px)',
          }}
        />

        <section className="relative px-6 pt-20 text-center">
          <h2 className="font-['Playfair_Display'] text-3xl font-semibold text-[#F5F1E8] sm:text-4xl">
            Em cartaz e em breve
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[#A8A29A]">
            Confira os espetáculos disponíveis e garanta seu lugar.
          </p>
        </section>

        <main className="relative mx-auto max-w-6xl px-6 pb-24 pt-12">
          <PublicEventList />
        </main>
      </div>

      <Footer />
    </div>
  );
}
