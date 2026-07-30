// src/utils/gsapAnimations.ts
// Aqui juntamos todas as animações GSAP num só lugar, assim os componentes
// ficam mais limpos e só "chamam" a animação pelo nome.

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { MouseEvent as ReactMouseEvent } from 'react';

gsap.registerPlugin(ScrollTrigger);

// Faz os cards de evento surgirem com um efeito de "subir e aparecer"
// conforme o usuário rola a página.
export function animarCardsAoRolar(seletor: string) {
  const cards = gsap.utils.toArray<HTMLElement>(seletor);

  cards.forEach((card, index) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: (index % 3) * 0.08, // um pequeno atraso escalonado, tipo "cascata"
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

// Abertura da cortina de teatro na home (o "momento de assinatura" da página).
// No final, um brilho dourado passa rapidamente pela tela — como o flash
// de luz que "sobra" quando a cortina termina de abrir num teatro de verdade.
export function abrirCortina(onComplete?: () => void) {
  const tl = gsap.timeline({ onComplete });

  tl.to('.cortina-esquerda', {
    xPercent: -100,
    duration: 1.4,
    ease: 'power4.inOut',
  }).to(
    '.cortina-direita',
    {
      xPercent: 100,
      duration: 1.4,
      ease: 'power4.inOut',
    },
    '<' // '<' significa "ao mesmo tempo que a animação anterior"
  );

  // Brilho final: um flash dourado que aparece e desaparece rapidinho.
  tl.fromTo(
    '.cortina-brilho',
    { opacity: 0.9 },
    { opacity: 0, duration: 0.9, ease: 'power2.out' },
    '-=0.3'
  );

  return tl;
}

// Animação de entrada de um modal (janela flutuante de detalhes ou formulário).
export function animarEntradaModal(overlaySeletor: string, boxSeletor: string) {
  const tl = gsap.timeline();
  tl.fromTo(overlaySeletor, { opacity: 0 }, { opacity: 1, duration: 0.25 });
  tl.fromTo(
    boxSeletor,
    { opacity: 0, y: 30, scale: 0.96 },
    { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out' },
    '<0.05'
  );
  return tl;
}

// Animação de saída de um modal. Recebe uma função para rodar quando terminar
// (normalmente, é aí que a gente realmente fecha/remove o modal da tela).
export function animarSaidaModal(
  overlaySeletor: string,
  boxSeletor: string,
  onComplete: () => void
) {
  const tl = gsap.timeline({ onComplete });
  tl.to(boxSeletor, { opacity: 0, y: 20, scale: 0.96, duration: 0.2, ease: 'power2.in' });
  tl.to(overlaySeletor, { opacity: 0, duration: 0.2 }, '<');
  return tl;
}

// Pequeno "levantar" no hover de um cartão (efeito sutil, chamado via onMouseEnter).
export function hoverCard(elemento: HTMLElement, entrando: boolean) {
  gsap.to(elemento, {
    y: entrando ? -6 : 0,
    scale: entrando ? 1.015 : 1,
    duration: 0.3,
    ease: 'power2.out',
  });
}

// ---------------------------------------------------------------------------
// A PARTIR DAQUI: animações novas, adicionadas para a tela de boas-vindas
// e para deixar o site com uma "cara" mais viva.
// ---------------------------------------------------------------------------

// Revela o título letra por letra (efeito de "digitação suave").
// Recebe o texto pronto (o HTML já precisa estar dividido em <span> por letra —
// isso é feito dentro do próprio componente WelcomeHero).
export function revelarTituloLetraPorLetra(seletorLetras: string, aoTerminar?: () => void) {
  const tl = gsap.timeline({ onComplete: aoTerminar });
  tl.fromTo(
    seletorLetras,
    { opacity: 0, y: 20, rotateX: -40 },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.5,
      ease: 'power3.out',
      stagger: 0.035, // vai revelando uma letra de cada vez
    }
  );
  return tl;
}

// Faz um "brilho" dourado passar por cima do título, tipo reflexo de luz.
export function brilharTitulo(seletor: string) {
  gsap.fromTo(
    seletor,
    { backgroundPosition: '200% center' },
    {
      backgroundPosition: '-200% center',
      duration: 3,
      repeat: -1,
      repeatDelay: 2.5,
      ease: 'power1.inOut',
    }
  );
}

// Fade + subida suave do subtítulo e do indicador de "role para baixo".
export function revelarSubtitulo(seletor: string, atraso = 0) {
  gsap.fromTo(
    seletor,
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.8, delay: atraso, ease: 'power2.out' }
  );
}

// Efeito de parallax simples: o elemento se move mais devagar (ou mais rápido)
// que o scroll, dando sensação de profundidade. A intensidade padrão subiu
// para deixar o efeito mais dramático, como pedido para o site institucional.
export function aplicarParallax(seletor: string, intensidade = 0.5) {
  const elementos = gsap.utils.toArray<HTMLElement>(seletor);
  elementos.forEach((el) => {
    gsap.to(el, {
      yPercent: intensidade * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6, // acompanha o scroll suavemente, sem "pulos"
      },
    });
  });
}

// Controla o header: encolhe e fica mais opaco conforme o usuário rola a página.
// Retorna uma função para "desligar" o listener quando o componente desmontar.
export function observarScrollHeader(
  aoMudar: (rolou: boolean) => void
): () => void {
  const limite = 40; // depois de 40px de scroll, já considera "rolado"
  function handler() {
    aoMudar(window.scrollY > limite);
  }
  window.addEventListener('scroll', handler, { passive: true });
  handler(); // roda uma vez logo de cara
  return () => window.removeEventListener('scroll', handler);
}

// Zoom suave na imagem quando o modal de detalhes abre.
export function zoomImagemModal(seletor: string) {
  gsap.fromTo(
    seletor,
    { scale: 1.15, opacity: 0.7 },
    { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' }
  );
}

// Efeito "ripple" (ondulação) ao clicar em um botão — bem comum em apps modernos.
// Uso: <button onMouseDown={criarRipple}>...
export function criarRipple(evento: ReactMouseEvent<HTMLElement>) {
  const botao = evento.currentTarget;
  const rect = botao.getBoundingClientRect();
  const tamanho = Math.max(rect.width, rect.height);
  const bolha = document.createElement('span');

  bolha.style.position = 'absolute';
  bolha.style.borderRadius = '50%';
  bolha.style.pointerEvents = 'none';
  bolha.style.background = 'rgba(255,255,255,0.35)';
  bolha.style.width = bolha.style.height = `${tamanho}px`;
  bolha.style.left = `${evento.clientX - rect.left - tamanho / 2}px`;
  bolha.style.top = `${evento.clientY - rect.top - tamanho / 2}px`;

  const posicaoOriginal = getComputedStyle(botao).position;
  if (posicaoOriginal === 'static') botao.style.position = 'relative';
  botao.style.overflow = 'hidden';
  botao.appendChild(bolha);

  gsap.fromTo(
    bolha,
    { scale: 0, opacity: 0.6 },
    {
      scale: 1.8,
      opacity: 0,
      duration: 0.55,
      ease: 'power2.out',
      onComplete: () => bolha.remove(),
    }
  );
}

// Linha dourada do rodapé, que "se estica" da esquerda pra direita ao aparecer na tela.
export function expandirLinhaRodape(seletor: string) {
  gsap.fromTo(
    seletor,
    { scaleX: 0 },
    {
      scaleX: 1,
      duration: 1,
      ease: 'power3.out',
      transformOrigin: 'left center',
      scrollTrigger: {
        trigger: seletor,
        start: 'top 95%',
        toggleActions: 'play none none none',
      },
    }
  );
}
