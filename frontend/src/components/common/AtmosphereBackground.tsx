// src/components/common/AtmosphereBackground.tsx
// Esse componente é só "atmosfera": fica FIXO atrás de todo o site (por isso
// tem z-index negativo) e cria três camadas visuais:
//   1) um gradiente escuro que muda de posição lentamente (respiração)
//   2) partículas douradas soltas, como poeira de palco iluminada
//   3) um "holofote" (spotlight) que varre a tela devagar, como no teatro

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function AtmosphereBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const holofoteRef = useRef<HTMLDivElement>(null);

  // --- Partículas (poeira dourada) desenhadas em um <canvas> ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let largura = window.innerWidth;
    let altura = window.innerHeight;
    canvas.width = largura;
    canvas.height = altura;

    // Menos partículas em telas pequenas, para não pesar no celular.
    const quantidade = largura < 640 ? 22 : 45;

    interface Particula {
      x: number;
      y: number;
      raio: number;
      velocidade: number;
      opacidade: number;
    }

    const particulas: Particula[] = Array.from({ length: quantidade }, () => ({
      x: Math.random() * largura,
      y: Math.random() * altura,
      raio: Math.random() * 1.6 + 0.4,
      velocidade: Math.random() * 0.25 + 0.05,
      opacidade: Math.random() * 0.5 + 0.15,
    }));

    let animId: number;

    function desenhar() {
      if (!ctx) return;
      ctx.clearRect(0, 0, largura, altura);
      for (const p of particulas) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.raio, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,162,39,${p.opacidade})`;
        ctx.fill();

        // sobe bem devagar, como poeira flutuando no ar
        p.y -= p.velocidade;
        if (p.y < -10) {
          p.y = altura + 10;
          p.x = Math.random() * largura;
        }
      }
      animId = requestAnimationFrame(desenhar);
    }
    desenhar();

    function aoRedimensionar() {
      largura = window.innerWidth;
      altura = window.innerHeight;
      canvas.width = largura;
      canvas.height = altura;
    }
    window.addEventListener('resize', aoRedimensionar);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', aoRedimensionar);
    };
  }, []);

  // --- Holofote: um "foco de luz" grande e desfocado que varre a tela devagar ---
  useEffect(() => {
    if (!holofoteRef.current) return;
    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut' } });
    tl.to(holofoteRef.current, { xPercent: 30, yPercent: -15, duration: 14 })
      .to(holofoteRef.current, { xPercent: -25, yPercent: 20, duration: 16 })
      .to(holofoteRef.current, { xPercent: 10, yPercent: -10, duration: 12 });
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#0B0B10]">
      {/* Camada 1: gradiente escuro "respirando" lentamente */}
      <div className="atmosfera-gradiente absolute inset-0" />

      {/* Camada 2: holofote grande e desfocado */}
      <div
        ref={holofoteRef}
        className="absolute left-1/2 top-1/3 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[110px]"
        style={{
          background: 'radial-gradient(circle, rgba(201,162,39,0.55) 0%, transparent 70%)',
        }}
      />

      {/* Camada 3: partículas douradas */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />

      {/* Vinheta suave nas bordas, para o conteúdo central se destacar */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(11,11,16,0.75) 100%)',
        }}
      />

      {/* Animação do gradiente "respirando" — feita em CSS puro por ser mais leve que GSAP aqui */}
      <style>{`
        .atmosfera-gradiente {
          background:
            radial-gradient(circle at 30% 20%, rgba(201,162,39,0.14), transparent 55%),
            radial-gradient(circle at 75% 65%, rgba(122,31,31,0.12), transparent 60%),
            linear-gradient(180deg, #0B0B10 0%, #131017 100%);
          background-size: 160% 160%;
          animation: respirarFundo 18s ease-in-out infinite;
        }
        @keyframes respirarFundo {
          0%   { background-position: 0% 0%; }
          50%  { background-position: 100% 60%; }
          100% { background-position: 0% 0%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .atmosfera-gradiente { animation: none; }
        }
      `}</style>
    </div>
  );
}
