import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B0B10] border-t border-[#C9A227]/20 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo e nome */}
          <div>
            <h3 className="text-2xl font-playfair text-[#C9A227]">Teatro Municipal</h3>
            <p className="text-gray-400 text-sm mt-1">Cultura e arte para todos</p>
          </div>

          {/* Contato e endereço */}
          <div className="flex flex-col items-center md:items-start text-gray-400 text-sm gap-1">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-[#C9A227]" />
              <span>Rua das Artes, 100 – Centro</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-[#C9A227]" />
              <span>contato@teatromunicipal.com</span>
            </div>
          </div>

          {/* Redes sociais */}
          <div className="flex gap-6">
            <a
              href="#"
              className="text-gray-400 hover:text-[#C9A227] transition-all duration-300 hover:scale-110"
              aria-label="Facebook"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#C9A227] transition-all duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#C9A227] transition-all duration-300 hover:scale-110"
              aria-label="YouTube"
            >
              <FaYoutube size={24} />
            </a>
          </div>
        </div>

        {/* Linha dourada animada (já existente) */}
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-[#C9A227] to-transparent" />
        <p className="text-center text-gray-500 text-xs mt-4">
          © {new Date().getFullYear()} Teatro Municipal. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;