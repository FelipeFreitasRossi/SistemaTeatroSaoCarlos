import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LoadingScreen: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Pequeno delay para garantir que o DOM esteja pronto
    const timer = setTimeout(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' }
      });

      // Logo: fade + scale
      if (logoRef.current) {
        tl.fromTo(logoRef.current,
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 0.6 }
        );
      }

      // Título: fade + subida
      if (titleRef.current) {
        tl.fromTo(titleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.2'
        );
      }

      // Barra de progresso: cresce
      if (barRef.current) {
        tl.fromTo(barRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.5, ease: 'power2.inOut' },
          '-=0.1'
        );
      }

      // Pulsação contínua da barra (depois que cresce)
      if (barRef.current) {
        gsap.to(barRef.current, {
          opacity: 0.5,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: 1.5,
        });
      }

    }, 100); // pequeno delay para garantir que os elementos estejam no DOM

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0B0B]"
    >
      {/* Fundo com gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B] via-[#141414] to-[#0B0B0B]" />

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6">
        {/* Logo */}
        <img
          ref={logoRef}
          src="https://i.postimg.cc/j5g22R73/Theatrical-masks-set-Premium-Vector.jpg"
          alt="Teatro Municipal"
          className="w-20 h-20 md:w-24 md:h-24 object-contain rounded-full border border-white/10 bg-white/5 p-1 mb-4"
        />

        {/* Título */}
        <h1
          ref={titleRef}
          className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight text-center"
        >
          Teatro<span className="text-gray-400">Municipal</span>
        </h1>

        {/* Subtítulo estático */}
        <p className="mt-2 text-xs text-gray-500 tracking-[0.2em] uppercase font-light">
          ⋆ Desde 1950 ⋆
        </p>

        {/* Barra de progresso */}
        <div className="w-full max-w-xs mt-8 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            ref={barRef}
            className="h-full bg-gradient-to-r from-white/30 via-white/70 to-white/30 rounded-full"
            style={{ transformOrigin: 'left' }}
          />
        </div>

        {/* Texto "CARREGANDO" com pulsação CSS */}
        <p className="mt-4 text-xs text-gray-500 font-light tracking-widest animate-pulse">
          CARREGANDO
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;