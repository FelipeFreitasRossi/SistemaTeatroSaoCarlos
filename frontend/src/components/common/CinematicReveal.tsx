import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface CinematicRevealProps {
  onComplete?: () => void;
}

const CinematicReveal: React.FC<CinematicRevealProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const centerTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
        // Remove o container do DOM após a animação
        if (containerRef.current) {
          containerRef.current.style.display = 'none';
        }
      }
    });

    // Inicialmente, as barras cobrem a tela
    // mas vamos partir de um estado onde elas estão abertas? Não, vamos fechadas.
    // Vamos fazer: barras entram de fora (topo e base) e se encontram no meio, depois abrem.
    // Ou simplesmente: barras estão cobrindo a tela (topo 0, altura 50% cada) e depois recuam para as bordas.

    // Configuração inicial: top bar no topo (0%) e bottom bar na base (50%).
    // Usaremos yPercent para animar.

    // Vamos usar transform: translateY para mover.
    // Barra superior: começa em 0 e vai para -100% (fora da tela)
    // Barra inferior: começa em 0 e vai para +100%

    // Mas primeiro, precisamos definir posições iniciais.
    // Vamos usar CSS para posicionar.

    // Melhor: usar um overlay com duas divs que ocupam metade da tela cada.

    // Vamos definir via CSS: position fixed, top 0, left 0, width 100%, height 50% para top, e bottom 0 para bottom.
    // Depois animamos y.

    // Pré-definir: as barras estão com translateY(0) (posição inicial).
    // Vamos animar para translateY(-100%) e translateY(100%).

    // Mas para dar um efeito mais interessante, podemos adicionar um texto central que aparece e some.
    // O texto pode ser "Teatro Municipal" ou "🎬" ou "Abrindo as cortinas...".

    // Vamos fazer um efeito de "abertura de cortina" com duas barras verticais? Não, vamos manter horizontal (barras pretas).

    // Vou fazer um efeito mais cinematográfico: um overlay preto com uma linha branca no centro que se expande, e depois o overlay sai.

    // Na verdade, vou simplificar: apenas duas barras pretas que se afastam verticalmente, revelando o conteúdo abaixo.

    // Configurar estados iniciais:
    if (topBarRef.current) {
      gsap.set(topBarRef.current, { y: 0 });
    }
    if (bottomBarRef.current) {
      gsap.set(bottomBarRef.current, { y: 0 });
    }

    // Texto central (opcional)
    if (centerTextRef.current) {
      gsap.set(centerTextRef.current, { opacity: 0, scale: 0.8 });
    }

    // Animação:
    // 1. Aparecer o texto central com fade + scale
    tl.to(centerTextRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out'
    }, 0.2)
    // 2. Barras se afastam (abrem a cortina)
    .to(topBarRef.current, {
      y: '-100%',
      duration: 1.2,
      ease: 'power3.inOut'
    }, 1.0)
    .to(bottomBarRef.current, {
      y: '100%',
      duration: 1.2,
      ease: 'power3.inOut'
    }, 1.0)
    // 3. Texto desaparece
    .to(centerTextRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.4,
      ease: 'power2.in'
    }, 1.4)
    // 4. Remover overlay (transparência)
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out'
    }, 1.8);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] pointer-events-none overflow-hidden"
      style={{ background: 'transparent' }}
    >
      {/* Barra superior */}
      <div
        ref={topBarRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#0B0B0B]"
      />
      {/* Barra inferior */}
      <div
        ref={bottomBarRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0B0B0B]"
      />
      {/* Texto central */}
      <div
        ref={centerTextRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-playfair text-3xl md:text-5xl font-bold tracking-widest"
      >
        ⋆ Teatro Municipal ⋆
      </div>
    </div>
  );
};

export default CinematicReveal;