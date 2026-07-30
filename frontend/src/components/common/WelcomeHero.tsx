// src/components/common/WelcomeHero.tsx
// Tela de boas-vindas (100vh) que aparece assim que a cortina termina de abrir.
// É só visual — não pede login nem cadastro, qualquer visitante vê isso.

import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  revelarTituloLetraPorLetra,
  brilharTitulo,
  revelarSubtitulo,
} from '../../utils/gsapAnimations';

const TITULO = 'Seja muito bem-vindo ao Teatro São Carlos';

interface WelcomeHeroProps {
  // Chamado quando o visitante clica na setinha para ver os eventos.
  onExplorar: () => void;
}

export default function WelcomeHero({ onExplorar }: WelcomeHeroProps) {
  const jaAnimou = useRef(false);

  useEffect(() => {
    if (jaAnimou.current) return;
    jaAnimou.current = true;

    // Pequeno atraso para a cortina terminar de abrir antes do texto entrar.
    const timer = setTimeout(() => {
      revelarTituloLetraPorLetra('.letra-titulo', () => brilharTitulo('.titulo-boas-vindas'));
      revelarSubtitulo('.subtitulo-boas-vindas', 0.4);
      revelarSubtitulo('.seta-explorar', 1.1);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* O fundo (gradiente + partículas + holofote) agora vem do AtmosphereBackground,
          que fica fixo atrás de toda a página — aqui só cuidamos do texto. */}


      {/* Título — cada letra vira um <span> para poder ser animada individualmente */}
      <h1
        className="titulo-boas-vindas relative max-w-3xl font-['Playfair_Display'] text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl"
        style={{
          backgroundImage:
            'linear-gradient(90deg, #F5F1E8 40%, #F3DE9A 48%, #C9A227 52%, #F5F1E8 60%)',
          backgroundSize: '250% 100%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          perspective: '800px', // necessário para o giro (rotateX) das letras ficar visível
        }}
      >
        {TITULO.split('').map((letra, i) => (
          <span key={i} className="letra-titulo inline-block" style={{ opacity: 0 }}>
            {letra === ' ' ? '\u00A0' : letra}
          </span>
        ))}
      </h1>

      <p
        className="subtitulo-boas-vindas mt-6 max-w-md text-base text-[#A8A29A] sm:text-lg"
        style={{ opacity: 0 }}
      >
        Explore nossos espetáculos e viva momentos inesquecíveis.
      </p>

      <button
        onClick={onExplorar}
        className="seta-explorar group mt-14 flex flex-col items-center gap-2 text-[#C9A227] transition hover:text-[#E8C766]"
        style={{ opacity: 0 }}
        aria-label="Ver eventos em cartaz"
      >
        <span className="text-xs uppercase tracking-[0.2em]">Ver espetáculos</span>
        <ChevronDown className="animate-bounce transition-transform group-hover:rotate-180" size={22} />
      </button>
    </section>
  );
}
