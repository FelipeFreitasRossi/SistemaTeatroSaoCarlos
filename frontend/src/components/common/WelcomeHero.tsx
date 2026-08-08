import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronDown } from 'lucide-react';
import AudioReader from './AudioReader';

const WelcomeHero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out' }
      );
    }

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );
    }

    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power2.out', delay: 0.2 }
      );
    }

    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.4 }
      );
    }

    if (taglineRef.current) {
      gsap.fromTo(
        taglineRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power1.out', delay: 0.6 }
      );
    }

    if (arrowRef.current) {
      gsap.fromTo(
        arrowRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power1.out', delay: 0.8 }
      );
      gsap.to(arrowRef.current, {
        y: 8,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 1.0,
      });
    }
  }, []);

  const scrollToEvents = () => {
    const section = document.getElementById('eventos');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      aria-label="Boas-vindas ao Teatro Municipal"
      className="relative min-h-screen flex flex-col px-4 text-center overflow-hidden"
      style={{
        backgroundImage: 'url(https://i.postimg.cc/dQ20n6Hf/Teatro-1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 backdrop-blur-sm" aria-hidden="true" />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full py-8">
        <h1
          ref={titleRef}
          className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-lg"
        >
          Bem-vindo ao Teatro Municipal
        </h1>

        <AudioReader
          text="Bem-vindo ao Teatro Municipal"
          label="Ouvir título"
          className="mt-3"
        />

        <div
          ref={lineRef}
          className="w-20 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto my-6"
          style={{ transformOrigin: 'center' }}
          aria-hidden="true"
        />

        <p
          ref={subtitleRef}
          className="text-base sm:text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto drop-shadow-md leading-relaxed"
        >
          <span className="text-white font-medium">Cultura</span>, 
          <span className="text-white font-medium"> arte</span> e 
          <span className="text-white font-medium"> tradição</span> em um só lugar.
          <br />
          <span className="text-gray-300">
            Explore nossa programação e viva momentos inesquecíveis.
          </span>
        </p>

        <AudioReader
          text="Cultura, arte e tradição em um só lugar. Explore nossa programação e viva momentos inesquecíveis."
          label="Ouvir subtítulo"
          className="mt-3"
        />

        <div
          ref={taglineRef}
          className="mt-4 text-sm text-gray-400/80 font-light tracking-[0.15em] uppercase"
        >
          ⋆ Desde 1960 ⋆
        </div>
      </div>

      <div
        ref={arrowRef}
        className="relative z-10 mt-16 pb-16 flex flex-col items-center cursor-pointer group"
        onClick={scrollToEvents}
        role="button"
        tabIndex={0}
        aria-label="Rolar para a seção de eventos"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToEvents();
          }
        }}
      >
        <div className="flex flex-col items-center gap-1 transition-colors">
          <span className="text-xs uppercase tracking-[0.2em] text-white/40 font-light group-hover:text-white/70 transition-colors">
            Explorar
          </span>
          <ChevronDown
            size={28}
            className="text-white/40 group-hover:text-white/70 transition-colors"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};

export default WelcomeHero;