import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Calendar, Info, Home } from 'lucide-react';
import { gsap } from 'gsap';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Controla a transparência do header ao rolar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Anima o header ao carregar
  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );
    }
  }, []);

  // Controla abertura/fechamento do drawer com GSAP
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, display: 'block' });
      gsap.fromTo(drawerRef.current, 
        { x: '100%' },
        { x: 0, duration: 0.4, ease: 'power3.out' }
      );
      // Foca no primeiro link do drawer (para acessibilidade)
      setTimeout(() => {
        const firstLink = document.querySelector('#drawer-nav a');
        if (firstLink instanceof HTMLElement) firstLink.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
      gsap.to(overlayRef.current, { 
        opacity: 0, 
        duration: 0.3, 
        onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = 'none';
        }
      });
      gsap.to(drawerRef.current, { x: '100%', duration: 0.3, ease: 'power3.in' });
    }
  }, [isOpen]);

  const toggleDrawer = () => setIsOpen(!isOpen);
  const closeDrawer = () => setIsOpen(false);

  // ORDEM: Início → Sobre → Eventos (sem Acessibilidade)
  const navLinks = [
    { name: 'Início', href: '/', icon: Home },
    { name: 'Sobre', href: '#sobre', icon: Info },
    { name: 'Eventos', href: '#eventos', icon: Calendar },
  ];

  return (
    <>
      <header
        ref={headerRef}
        role="banner"
        aria-label="Cabeçalho principal do site"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0B0B0B]/95 backdrop-blur-md border-b border-white/10 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-3 group"
              aria-label="Página inicial – Teatro Municipal"
            >
              <img
                src="https://i.postimg.cc/j5g22R73/Theatrical-masks-set-Premium-Vector.jpg"
                alt="Logo do Teatro Municipal – máscaras de teatro"
                className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-full bg-white/5 border border-white/10 p-1 transition-transform group-hover:scale-105"
              />
              <div>
                <span className="text-xl md:text-2xl font-playfair font-bold tracking-tight text-white">
                  Teatro<span className="text-gray-300">Municipal</span>
                </span>
                <div className="hidden md:block text-[10px] text-gray-400 tracking-[0.2em] font-light -mt-0.5">
                  DESDE 1950
                </div>
              </div>
            </a>

            {/* Menu Desktop */}
            <nav role="navigation" aria-label="Menu principal">
              <ul className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white/60 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Botão do menu mobile */}
            <button
              onClick={toggleDrawer}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 hidden"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer (menu lateral) */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className="fixed top-0 right-0 h-full w-72 max-w-[80vw] bg-[#0B0B0B] border-l border-white/10 z-50 shadow-2xl overflow-y-auto"
        style={{ transform: 'translateX(100%)' }}
      >
        <div className="flex flex-col h-full min-h-screen">
          {/* Cabeçalho do drawer */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <img
                src="https://i.postimg.cc/j5g22R73/Theatrical-masks-set-Premium-Vector.jpg"
                alt="Teatro Municipal"
                className="w-8 h-8 object-contain rounded-full"
              />
              <span className="font-playfair text-lg font-bold text-white">
                Teatro<span className="text-gray-400">Municipal</span>
              </span>
            </div>
            <button
              onClick={closeDrawer}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Fechar menu"
            >
              <X size={22} className="text-white" />
            </button>
          </div>

          {/* Links do drawer */}
          <nav id="drawer-nav" role="navigation" aria-label="Menu móvel" className="flex-1">
            <ul className="p-4 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={closeDrawer}
                      className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                    >
                      <Icon size={20} className="text-gray-400" aria-hidden="true" />
                      <span className="font-medium">{link.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ========== RODAPÉ DO DRAWER - "2026 Teatro Municipal" ========== */}
          <div className="p-4 border-t border-white/10 mt-auto">
            <p className="text-xs text-gray-500 text-center">
              2026 Teatro Municipal
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;