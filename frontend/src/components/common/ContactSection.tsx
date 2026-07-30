import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, Phone, Clock, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
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
      id="contato"
      ref={sectionRef}
      className="py-20 md:py-28 bg-[#0B0B0B] border-t border-white/5"
    >
      <div ref={contentRef} className="container mx-auto px-4 md:px-6">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <div className="inline-block bg-white/10 text-white/60 text-xs font-medium px-3 py-1 rounded-full border border-white/10 mb-4">
            ⋆ Fale conosco
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white tracking-tight">
            Entre em <span className="text-gray-400">Contato</span>
          </h2>
          <div className="w-16 h-px bg-white/20 mx-auto mt-4" />
          <p className="text-gray-400 mt-4 max-w-lg mx-auto text-sm md:text-base">
            Dúvidas, sugestões ou parcerias? Estamos aqui para ajudar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Informações de contato */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="text-white/60 mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="text-white font-medium">Endereço <span className="text-xs text-gray-500 font-light">(Centro)</span></h4>
                <p className="text-gray-400 text-sm">
                  Rua das Artes, 100 – Centro<br />
                  <span className="text-gray-500 text-xs">Cidade Cultural – 01000-000</span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="text-white/60 mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="text-white font-medium">Telefone <span className="text-xs text-gray-500 font-light">(WhatsApp)</span></h4>
                <p className="text-gray-400 text-sm">(11) 3456-7890</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="text-white/60 mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="text-white font-medium">E-mail <span className="text-xs text-gray-500 font-light">(Resposta rápida)</span></h4>
                <p className="text-gray-400 text-sm">contato@teatromunicipal.com.br</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="text-white/60 mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="text-white font-medium">Funcionamento <span className="text-xs text-gray-500 font-light">(Bilheteria)</span></h4>
                <p className="text-gray-400 text-sm">
                  Segunda a Sexta: <span className="text-white/80">10h – 22h</span><br />
                  Sábado e Domingo: <span className="text-white/80">14h – 22h</span>
                </p>
              </div>
            </div>
          </div>

          {/* Formulário estático */}
          <div className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/10">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  placeholder="Seu nome"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                  Mensagem
                </label>
                <textarea
                  rows={4}
                  placeholder="Escreva sua mensagem..."
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-white text-black font-medium py-2.5 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Send size={18} /> Enviar mensagem
              </button>
              <p className="text-center text-gray-500 text-xs mt-2">
                * Este formulário é apenas ilustrativo (sem envio real).
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;