// src/components/common/EventCard.tsx
// Este é o "cartão" de cada evento, usado na lista pública do site institucional.

import { useRef } from 'react';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import type { Evento } from '../../types/Evento';
import { hoverCard } from '../../utils/gsapAnimations';

interface EventCardProps {
  evento: Evento;
  onClick?: () => void;
}

// Cada status tem uma cor e um texto — isso é o "selo" colorido do card.
const badgeConfig: Record<Evento['status'], { texto: string; classe: string }> = {
  EM_CARTAZ: { texto: 'Em Cartaz', classe: 'bg-[#C9A227] text-[#12100A]' },
  BREVE: { texto: 'Em Breve', classe: 'bg-[#3B6F84] text-[#F5F1E8]' },
  ENCERRADO: { texto: 'Encerrado', classe: 'bg-[#3A3A42] text-[#A8A29A]' },
  CANCELADO: { texto: 'Cancelado', classe: 'bg-[#7A2E2E] text-[#F5F1E8]' },
};

function formatarData(dataISO: string) {
  const data = new Date(dataISO);
  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }) + ' às ' + data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export default function EventCard({ evento, onClick }: EventCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const luzRef = useRef<HTMLDivElement>(null);
  const badge = badgeConfig[evento.status];

  // Move um "brilho" (gradiente radial) para onde o mouse está em cima do card.
  function moverLuz(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current || !luzRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    luzRef.current.style.background = `radial-gradient(220px circle at ${x}px ${y}px, rgba(201,162,39,0.16), transparent 70%)`;
  }

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={() => cardRef.current && hoverCard(cardRef.current, true)}
      onMouseLeave={() => cardRef.current && hoverCard(cardRef.current, false)}
      onMouseMove={moverLuz}
      className="evento-card group relative cursor-pointer overflow-hidden rounded-2xl
                 border border-[#C9A227]/25 bg-[#151318]/45 backdrop-blur-xl shadow-2xl shadow-black/50
                 ring-1 ring-inset ring-white/[0.03] transition-all duration-300
                 hover:border-[#C9A227]/70 hover:shadow-[0_0_36px_-6px_rgba(201,162,39,0.5)]"
    >
      {/* Camada de luz que acompanha o mouse (efeito sutil, só aparece no hover) */}
      <div
        ref={luzRef}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Imagem */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={evento.imagemUrl}
          alt={evento.titulo}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://placehold.co/600x400/151318/C9A227?text=Teatro';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B10] via-transparent to-transparent" />
        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${badge.classe} ${
            evento.status === 'EM_CARTAZ' ? 'animate-pulse' : ''
          }`}
        >
          {badge.texto}
        </span>
      </div>

      {/* Conteúdo de texto */}
      <div className="relative space-y-3 p-5">
        <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#F5F1E8] leading-snug">
          {evento.titulo}
        </h3>
        <p className="line-clamp-2 text-sm text-[#A8A29A]">{evento.descricao}</p>

        <div className="flex flex-col gap-1.5 pt-1 text-sm text-[#C9A227]">
          <span className="flex items-center gap-2">
            <Calendar size={15} /> {formatarData(evento.dataHora)}
          </span>
          <span className="flex items-center gap-2 text-[#A8A29A]">
            <MapPin size={15} /> {evento.local}
          </span>
          <span className="flex items-center gap-2 text-[#A8A29A]">
            <Ticket size={15} /> {evento.ingressosDisponiveis} ingressos disponíveis
          </span>
        </div>
      </div>
    </div>
  );
}
