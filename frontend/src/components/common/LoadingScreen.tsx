import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LoadingScreen: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Anima o título (fade-in + leve subida)
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }
      );
    }

    // 2. Anima os pontinhos (pulsação contínua)
    if (dotsRef.current) {
      const dots = dotsRef.current.querySelectorAll('span');
      gsap.to(dots, {
        opacity: 0.3,
        scale: 0.7,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        stagger: 0.15,
        ease: 'power1.inOut',
      });
    }

    // 3. Após 2.2s, faz o fade-out do container e o remove do DOM
    const timer = setTimeout(() => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.7,
          ease: 'power2.inOut',
          onComplete: () => {
            if (containerRef.current) {
              containerRef.current.style.display = 'none';
            }
          },
        });
      }
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0B0B]"
    >
      {/* Logo / Nome do Teatro */}
      <h1
        ref={textRef}
        className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight text-center"
      >
        Teatro<span className="text-gray-400">Municipal</span>
      </h1>

      {/* Linha divisória sutil */}
      <div className="w-12 h-px bg-white/20 mt-4 mb-6" />

      {/* Indicador de carregamento: "Carregando" + 3 pontinhos animados */}
      <div className="flex items-center gap-2 text-white/60">
        <span className="text-sm font-light tracking-widest">Carregando</span>
        <div ref={dotsRef} className="flex gap-1.5">
          <span className="dot-pulse w-1.5 h-1.5 bg-white/80 rounded-full" />
          <span className="dot-pulse w-1.5 h-1.5 bg-white/80 rounded-full" />
          <span className="dot-pulse w-1.5 h-1.5 bg-white/80 rounded-full" />
        </div>
      </div>

      {/* Detalhe decorativo no rodapé */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-gray-600 text-xs font-light tracking-[0.3em]">
        ⋆ ⋆ ⋆
      </div>
    </div>
  );
};

export default LoadingScreen;