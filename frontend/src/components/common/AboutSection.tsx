import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Star, Users, Award } from 'lucide-react';
import AudioReader from './AudioReader';

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
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

    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
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
      className="py-16 md:py-24 bg-[#0B0B0B] border-t border-white/5"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* COLUNA ESQUERDA: TEXTO */}
          <div ref={contentRef}>
            <div className="inline-block bg-white/10 text-white/60 text-xs font-medium px-3 py-1 rounded-full border border-white/10 mb-4">
              ⋆ Nossa História
            </div>

            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
              Sobre o <span className="text-gray-400">Teatro Municipal</span>
            </h2>

            {/* Botão "Ouvir" para o título */}
            <AudioReader
              text="Sobre o Teatro Municipal"
              label="Ouvir título"
              className="mb-4"
            />

            <div className="w-16 h-px bg-white/20 mb-6" aria-hidden="true" />

            <div className="space-y-4 text-gray-300 text-base md:text-lg leading-relaxed">
              <p>
                Fundado em <span className="text-white font-bold">1960</span>, o 
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
                <span className="text-white font-semibold"> grandes espetáculos nacionais </span> 
                até <span className="text-white font-semibold"> produções locais</span> que revelam novos talentos.
              </p>
            </div>

            {/* Botão "Ouvir" para o texto completo */}
            <AudioReader
              text="Fundado em 1950, o Teatro Municipal é o coração cultural da nossa cidade. Com uma arquitetura neoclássica imponente e uma acústica reconhecida internacionalmente, já recebeu os maiores nomes da música, dança e teatro do Brasil e do mundo. Nossa missão é democratizar o acesso à arte, oferecendo uma programação diversificada e de qualidade, que vai desde grandes espetáculos nacionais até produções locais que revelam novos talentos."
              label="Ouvir sobre o teatro"
              className="mt-4"
            />

            <div className="mt-6 p-4 md:p-6 bg-white/5 border-l-2 border-white/20 rounded-r-lg">
              <p className="text-gray-400 text-sm md:text-base italic leading-relaxed">
                <span className="text-white font-playfair text-xl">" </span>
                Um palco para todos, uma plateia para a vida.
                <span className="text-white font-playfair text-xl">"</span>
              </p>
              <AudioReader
                text="Um palco para todos, uma plateia para a vida."
                label="Ouvir citação"
                className="mt-2"
              />
            </div>
          </div>

          {/* COLUNA DIREITA: IMAGEM + ESTATÍSTICAS */}
          <div ref={imageRef} className="space-y-6">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/5">
              <img
                src="https://i.postimg.cc/dQ20n6Hf/Teatro-1.jpg"
                alt="Teatro Municipal - Fachada"
                className="w-full h-56 sm:h-64 md:h-72 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/5 text-center hover:bg-white/10 transition-colors">
                <Calendar className="w-5 h-5 text-white/60 mx-auto mb-2" aria-hidden="true" />
                <div className="text-xl font-bold text-white">66+</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Anos</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/5 text-center hover:bg-white/10 transition-colors">
                <Star className="w-5 h-5 text-white/60 mx-auto mb-2" aria-hidden="true" />
                <div className="text-xl font-bold text-white">1000+</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Espetáculos</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/5 text-center hover:bg-white/10 transition-colors">
                <Users className="w-5 h-5 text-white/60 mx-auto mb-2" aria-hidden="true" />
                <div className="text-xl font-bold text-white">5k+</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Visitantes/ano</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/5 text-center hover:bg-white/10 transition-colors">
                <Award className="w-5 h-5 text-white/60 mx-auto mb-2" aria-hidden="true" />
                <div className="text-xl font-bold text-white">★</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Reconhecido</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;