import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Mail, MapPin, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lineRef.current) {
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  return (
    <footer className="bg-[#0B0B0B] border-t border-white/5 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Logo e descrição */}
          <div>
            <h3 className="text-2xl font-playfair font-bold text-white">
              Teatro<span className="text-gray-400">Municipal</span>
            </h3>
            <p className="text-gray-500 text-sm mt-2 max-w-xs mx-auto md:mx-0">
              Cultura, arte e tradição desde 1950.
            </p>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-white font-medium text-sm uppercase tracking-wider mb-3">
              Contato
            </h4>
            <div className="space-y-2 text-gray-400 text-sm">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <MapPin size={16} className="text-white/40" />
                <span>Rua das Artes, 100 – Centro</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Phone size={16} className="text-white/40" />
                <span>(11) 3456-7890</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Mail size={16} className="text-white/40" />
                <span>contato@teatromunicipal.com.br</span>
              </div>
            </div>
          </div>

          {/* Redes sociais */}
          <div>
            <h4 className="text-white font-medium text-sm uppercase tracking-wider mb-3">
              Redes Sociais
            </h4>
            <div className="flex justify-center md:justify-start gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebook size={22} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram size={22} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="YouTube"
              >
                <FaYoutube size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Linha dourada animada */}
        <div
          ref={lineRef}
          className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mt-8"
          style={{ transformOrigin: 'left' }}
        />

        <p className="text-center text-gray-500 text-xs mt-4">
          © {new Date().getFullYear()} Teatro Municipal. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;