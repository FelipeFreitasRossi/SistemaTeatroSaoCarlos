import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Calendar, Info, Phone, Home } from 'lucide-react';
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

  const navLinks = [
    { name: 'Início', href: '/', icon: Home },
    { name: 'Eventos', href: '#eventos', icon: Calendar },
    { name: 'Sobre', href: '#sobre', icon: Info },
    { name: 'Contato', href: '#contato', icon: Phone },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0B0B0B]/95 backdrop-blur-md border-b border-white/10 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/80 text-sm font-playfair">
                🎭
              </div>
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
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white/60 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Botão do menu mobile */}
            <button
              onClick={toggleDrawer}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Menu"
            >
              <Menu size={24} className="text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay (fundo escuro) */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 hidden"
        onClick={closeDrawer}
      />

      {/* Drawer (menu lateral) */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 h-full w-72 max-w-[80vw] bg-[#0B0B0B] border-l border-white/10 z-50 shadow-2xl overflow-y-auto"
        style={{ transform: 'translateX(100%)' }}
      >
        <div className="flex flex-col h-full">
          {/* Cabeçalho do drawer */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <span className="font-playfair text-lg font-bold text-white">
              Teatro<span className="text-gray-400">Municipal</span>
            </span>
            <button
              onClick={closeDrawer}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Fechar menu"
            >
              <X size={22} className="text-white" />
            </button>
          </div>

          {/* Links do drawer */}
          <nav className="flex-1 p-4 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={closeDrawer}
                  className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  <Icon size={20} className="text-gray-400" />
                  <span className="font-medium">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Rodapé do drawer */}
          <div className="p-4 border-t border-white/10">
            <p className="text-xs text-gray-500 text-center">
              © {new Date().getFullYear()} Teatro Municipal
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;