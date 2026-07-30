// src/components/common/EventModal.tsx
// Essa é a "janela" que abre quando o visitante clica num evento na home,
// mostrando todos os detalhes.

import { useEffect, useRef } from 'react';
import { X, Calendar, MapPin, Ticket } from 'lucide-react';
import type { Evento } from '../../types/Evento';
import { animarEntradaModal, animarSaidaModal, zoomImagemModal } from '../../utils/gsapAnimations';

interface EventModalProps {
  evento: Evento;
  onFechar: () => void;
}

export default function EventModal({ evento, onFechar }: EventModalProps) {
  const jaAnimouEntrada = useRef(false);

  useEffect(() => {
    if (!jaAnimouEntrada.current) {
      animarEntradaModal('.modal-overlay', '.modal-box');
      zoomImagemModal('.modal-imagem');
      jaAnimouEntrada.current = true;
    }
  }, []);

  function fecharComAnimacao() {
    animarSaidaModal('.modal-overlay', '.modal-box', onFechar);
  }

  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={fecharComAnimacao}
    >
      <div
        className="modal-box relative w-full max-w-lg overflow-hidden rounded-2xl border border-[#C9A227]/30
                   bg-[#151318] shadow-2xl shadow-black/60"
        onClick={(e) => e.stopPropagation()} // evita fechar quando clica DENTRO do card
      >
        <button
          onClick={fecharComAnimacao}
          className="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-1.5 text-[#F5F1E8] transition hover:bg-black/70 hover:rotate-90"
          aria-label="Fechar"
        >
          <X size={18} />
        </button>

        <div className="h-56 w-full overflow-hidden">
          <img
            src={evento.imagemUrl}
            alt={evento.titulo}
            className="modal-imagem h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://placehold.co/600x400/151318/C9A227?text=Teatro';
            }}
          />
        </div>

        <div className="space-y-4 p-6">
          <h2 className="font-['Playfair_Display'] text-2xl font-semibold text-[#F5F1E8]">
            {evento.titulo}
          </h2>
          <p className="text-sm leading-relaxed text-[#A8A29A]">{evento.descricao}</p>

          <div className="space-y-2 border-t border-[#C9A227]/15 pt-4 text-sm text-[#C9A227]">
            <p className="flex items-center gap-2">
              <Calendar size={16} /> {new Date(evento.dataHora).toLocaleString('pt-BR')}
            </p>
            <p className="flex items-center gap-2 text-[#A8A29A]">
              <MapPin size={16} /> {evento.local}
            </p>
            <p className="flex items-center gap-2 text-[#A8A29A]">
              <Ticket size={16} /> {evento.ingressosDisponiveis} de {evento.capacidadeTotal}{' '}
              ingressos disponíveis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
