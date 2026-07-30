import React from 'react';
import type { Evento } from '../../types/Evento';
import { Calendar, MapPin, Users } from 'lucide-react';
import AudioReader from './AudioReader';

interface EventCardProps {
  evento: Evento;
  onClick?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ evento, onClick }) => {
  const dataResumida = new Date(evento.dataHora).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const statusConfig = {
    BREVE: { label: 'Em Breve', className: 'bg-white/10 text-gray-300 border-white/10' },
    EM_CARTAZ: { label: 'Em Cartaz', className: 'bg-white/20 text-white border-white/30' },
    ENCERRADO: { label: 'Encerrado', className: 'bg-white/5 text-gray-500 border-white/5' },
    CANCELADO: { label: 'Cancelado', className: 'bg-red-500/20 text-red-300 border-red-500/20' },
  };

  const status = statusConfig[evento.status] || statusConfig.BREVE;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <article
      className="event-card group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalhes do evento: ${evento.titulo}`}
    >
      <div className="relative w-full h-48 overflow-hidden">
        {evento.imagemUrl ? (
          <img
            src={evento.imagemUrl}
            alt={`Imagem do evento ${evento.titulo}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center text-5xl" aria-hidden="true">
            🎭
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${status.className}`}>
            {status.label}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent" aria-hidden="true" />
      </div>

      <div className="p-4 space-y-3">
        <h3 className="font-playfair text-lg font-bold text-white leading-tight line-clamp-2">
          {evento.titulo}
        </h3>

        <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
          {evento.descricao}
        </p>

        <AudioReader
          text={`${evento.titulo}. ${evento.descricao}`}
          label="Ouvir evento"
          className="mt-1"
        />

        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 pt-2 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-white/30" aria-hidden="true" />
            <span>{dataResumida}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className="text-white/30" aria-hidden="true" />
            <span className="truncate max-w-[120px]">{evento.local}</span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <Users size={14} className="text-white/30" aria-hidden="true" />
            <span>{evento.ingressosDisponiveis} vagas</span>
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <span className="text-xs text-white/40 group-hover:text-white/80 transition-colors font-light tracking-wider uppercase">
            Ver detalhes →
          </span>
        </div>
      </div>
    </article>
  );
};

export default EventCard;