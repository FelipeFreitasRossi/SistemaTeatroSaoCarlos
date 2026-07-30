import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, Phone, Clock, Send } from 'lucide-react';
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import AudioReader from './AudioReader';

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
      className="py-16 md:py-24 bg-[#0B0B0B] border-t border-white/5"
    >
      <div ref={contentRef} className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-block bg-white/10 text-white/60 text-xs font-medium px-3 py-1 rounded-full border border-white/10 mb-4">
            ⋆ Fale Conosco
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white tracking-tight">
            Entre em <span className="text-gray-400">Contato</span>
          </h2>
          <AudioReader text="Entre em Contato" label="Ouvir título" className="mt-2 justify-center" />
          <div className="w-16 h-px bg-white/20 mx-auto mt-4" aria-hidden="true" />
          <p className="text-gray-400 mt-4 max-w-lg mx-auto text-sm md:text-base">
            Dúvidas, sugestões ou parcerias? Estamos aqui para ajudar.
          </p>
          <AudioReader
            text="Dúvidas, sugestões ou parcerias? Estamos aqui para ajudar."
            label="Ouvir descrição"
            className="mt-2 justify-center"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* COLUNA ESQUERDA: Informações + Mapa */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-white/5 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
                <MapPin className="text-white/60 mb-3" size={24} aria-hidden="true" />
                <h4 className="text-white font-medium text-sm">Endereço</h4>
                <p className="text-gray-400 text-sm mt-1">
                  R. 7 de Setembro, 1735 – Centro<br />
                  <span className="text-gray-500 text-xs">São Carlos – SP, 13560-180</span>
                </p>
                <AudioReader
                  text="Endereço: Rua 7 de Setembro, 1735, Centro, São Carlos, São Paulo, CEP 13560-180"
                  label="Ouvir endereço"
                  className="mt-2"
                />
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-white/5 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
                <Phone className="text-white/60 mb-3" size={24} aria-hidden="true" />
                <h4 className="text-white font-medium text-sm">Telefone</h4>
                <p className="text-gray-400 text-sm mt-1">(16) 3371-1234</p>
                <p className="text-gray-500 text-xs">WhatsApp: (16) 91234-5678</p>
                <AudioReader
                  text="Telefone: 16 3371-1234. WhatsApp: 16 91234-5678"
                  label="Ouvir telefone"
                  className="mt-2"
                />
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-white/5 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
                <Mail className="text-white/60 mb-3" size={24} aria-hidden="true" />
                <h4 className="text-white font-medium text-sm">E-mail</h4>
                <p className="text-gray-400 text-sm mt-1">contato@teatromunicipalsc.com.br</p>
                <p className="text-gray-500 text-xs">Resposta em até 24h</p>
                <AudioReader
                  text="E-mail: contato at teatromunicipalsc.com.br. Resposta em até 24 horas."
                  label="Ouvir e-mail"
                  className="mt-2"
                />
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-white/5 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
                <Clock className="text-white/60 mb-3" size={24} aria-hidden="true" />
                <h4 className="text-white font-medium text-sm">Funcionamento</h4>
                <p className="text-gray-400 text-sm mt-1">
                  Seg–Sex: <span className="text-white/80">10h – 22h</span><br />
                  Sáb–Dom: <span className="text-white/80">14h – 22h</span>
                </p>
                <AudioReader
                  text="Funcionamento: Segunda a Sexta das 10 às 22 horas. Sábado e Domingo das 14 às 22 horas."
                  label="Ouvir funcionamento"
                  className="mt-2"
                />
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3693.978975234016!2d-47.8913124!3d-22.0084977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b8772a2c2b2b2b%3A0x5d8c4e2b8b5b5b5b!2sR.%207%20de%20Setembro%2C%201735%20-%20Centro%2C%20S%C3%A3o%20Carlos%20-%20SP%2C%2013560-180!5e0!3m2!1spt-BR!2sbr!4v1700000000000"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização do Teatro Municipal de São Carlos"
                className="w-full"
              />
            </div>
          </div>

          {/* COLUNA DIREITA: Formulário */}
          <div className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/10 shadow-xl">
            <h3 className="font-playfair text-xl font-bold text-white mb-2">Envie uma mensagem</h3>
            <AudioReader text="Envie uma mensagem" label="Ouvir título do formulário" className="mb-4" />
            <p className="text-gray-400 text-sm mb-6">Preencha o formulário e entraremos em contato.</p>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">
                  Nome
                </label>
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">
                  E-mail
                </label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">
                  Mensagem
                </label>
                <textarea
                  rows={4}
                  placeholder="Escreva sua mensagem..."
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all duration-200 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-white text-black font-medium py-3.5 rounded-lg hover:bg-gray-200 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                <Send size={18} aria-hidden="true" /> Enviar mensagem
              </button>
              <p className="text-center text-gray-500 text-xs mt-3">
                * Este formulário é ilustrativo (sem envio real).
              </p>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-gray-500 text-sm font-light tracking-widest uppercase">
            Siga-nos nas redes sociais
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110 transform" aria-label="Facebook">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110 transform" aria-label="Instagram">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110 transform" aria-label="YouTube">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;