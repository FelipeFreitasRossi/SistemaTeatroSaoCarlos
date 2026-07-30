import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronDown } from 'lucide-react';

const WelcomeHero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Anima o fundo com um fade-in suave
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out' }
      );
    }

    // 2. Efeito de digitação no título (revelação letra por letra)
    if (titleRef.current) {
      const text = titleRef.current.textContent || '';
      titleRef.current.textContent = '';
      const chars = text.split('');
      const tl = gsap.timeline();

      chars.forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline';
        titleRef.current?.appendChild(span);
      });

      const spans = titleRef.current.querySelectorAll('span');
      tl.fromTo(
        spans,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.04, ease: 'power2.out', duration: 0.3 }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.2'
        )
        .fromTo(
          arrowRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power1.out' },
          '-=0.2'
        )
        .to(arrowRef.current, {
          y: 8,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        }, '+=0.5');
    }
  }, []);

  const scrollToEvents = () => {
    const section = document.getElementById('eventos');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center overflow-hidden"
      style={{
        backgroundImage: 'url(https://i.postimg.cc/dQ20n6Hf/Teatro-1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay escuro para legibilidade */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Conteúdo */}
      <div className="relative z-10">
        <h1
          ref={titleRef}
          className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight max-w-4xl mx-auto leading-tight drop-shadow-lg"
        >
          Bem-vindo ao Teatro Municipal
        </h1>

        <p
          ref={subtitleRef}
          className="mt-4 text-base sm:text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto opacity-0 drop-shadow-md"
        >
          <span className="text-white font-medium">Cultura</span>, 
          <span className="text-white font-medium"> arte</span> e 
          <span className="text-white font-medium"> tradição</span> em um só lugar. 
          Explore nossa programação e viva momentos inesquecíveis.
        </p>

        {/* Seta de rolagem */}
        <div
          ref={arrowRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer opacity-0"
          onClick={scrollToEvents}
        >
          <div className="flex flex-col items-center gap-1 text-white/60 hover:text-white/90 transition-colors">
            <span className="text-xs uppercase tracking-widest text-white/50 font-light">
              Explorar
            </span>
            <ChevronDown size={28} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHero;