import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current && textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="py-20 md:py-28 bg-[#0B0B0B] border-t border-white/5"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div ref={textRef} className="max-w-4xl mx-auto text-center">
          {/* Badge de destaque */}
          <div className="inline-block bg-white/10 text-white/60 text-xs font-medium px-3 py-1 rounded-full border border-white/10 mb-4">
            ⋆ 70 anos de história
          </div>

          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            Sobre o <span className="text-gray-400">Teatro Municipal</span>
          </h2>

          <div className="w-20 h-px bg-white/20 mx-auto mb-8" />

          <div className="space-y-5 text-gray-300 text-base md:text-lg leading-relaxed">
            <p>
              Fundado em <span className="text-white font-bold">1950</span>, o 
              <span className="text-white font-bold"> Teatro Municipal</span> é o 
              <span className="text-white font-semibold"> coração cultural</span> da nossa cidade. 
              Com uma arquitetura neoclássica imponente e uma 
              <span className="text-white font-semibold"> acústica reconhecida internacionalmente</span>, 
              já recebeu os maiores nomes da <span className="text-white font-semibold">música</span>, 
              <span className="text-white font-semibold"> dança</span> e 
              <span className="text-white font-semibold"> teatro</span> do Brasil e do mundo.
            </p>
            <p>
              Nossa missão é <span className="text-white font-bold">democratizar o acesso à arte</span>, 
              oferecendo uma programação diversificada e de qualidade, que vai desde 
              <span className="text-white font-semibold"> grandes espetáculos nacionais</span> 
              até <span className="text-white font-semibold"> produções locais</span> que revelam novos talentos.
            </p>
            <p className="text-gray-400 text-sm md:text-base italic">
              <span className="text-white font-medium">"Um palco para todos, uma plateia para a vida."</span>
            </p>
          </div>

          {/* Dados rápidos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/5">
            <div>
              <div className="text-3xl font-bold text-white">70+</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Anos de História</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Espetáculos Realizados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">10k+</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Visitantes por Ano</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;