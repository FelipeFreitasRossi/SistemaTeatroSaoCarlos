import React, { useEffect, useRef } from 'react';
import { X, Calendar, MapPin, Users, Ticket } from 'lucide-react';
import { gsap } from 'gsap';
import type { Evento } from '../../types/Evento';
import AudioReader from './AudioReader';

interface EventModalProps {
  evento: Evento | null;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ evento, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (overlayRef.current && modalRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.92, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );
      setTimeout(() => {
        if (closeButtonRef.current) closeButtonRef.current.focus();
      }, 100);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!evento) return null;

  const dataFormatada = new Date(evento.dataHora).toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const statusConfig = {
    BREVE: { label: 'Em Breve', className: 'bg-white/10 text-gray-300 border-white/10' },
    EM_CARTAZ: { label: 'Em Cartaz', className: 'bg-white/20 text-white border-white/30' },
    ENCERRADO: { label: 'Encerrado', className: 'bg-white/5 text-gray-500 border-white/5' },
    CANCELADO: { label: 'Cancelado', className: 'bg-red-500/20 text-red-300 border-red-500/20' },
  };

  const status = statusConfig[evento.status] || statusConfig.BREVE;

  // Texto completo para áudio
  const textoCompleto = `
    ${evento.titulo}. 
    ${evento.descricao}. 
    Data: ${dataFormatada}. 
    Local: ${evento.local}. 
    Capacidade: ${evento.capacidadeTotal} lugares. 
    Status: ${status.label}.
    Local de compra do ingresso: ${evento.localVendaIngressos || 'Não informado'}.
  `;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#111111] rounded-2xl border border-white/10 shadow-2xl shadow-black/50"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#333 transparent' }}
      >
        {/* Botão fechar */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all duration-300 flex items-center justify-center text-gray-400 hover:text-white border border-white/10 hover:border-white/30"
          aria-label="Fechar modal"
        >
          <X size={18} />
        </button>

        {/* Imagem de capa */}
        <div className="relative w-full h-56 md:h-64 overflow-hidden rounded-t-2xl">
          {evento.imagemUrl ? (
            <img
              src={evento.imagemUrl}
              alt={`Imagem do evento ${evento.titulo}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center text-6xl" aria-hidden="true">
              🎭
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-4 left-4">
            <span className={`px-4 py-1.5 rounded-full text-xs font-medium border backdrop-blur-sm ${status.className}`}>
              {status.label}
            </span>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-6 md:p-8 space-y-5">
          {/* Título + botão de áudio */}
          <div className="flex items-start justify-between gap-4">
            <h2 id="modal-title" className="font-playfair text-2xl md:text-3xl font-bold text-white leading-tight">
              {evento.titulo}
            </h2>
            <AudioReader
              text={textoCompleto}
              label="Ouvir evento completo"
              className="flex-shrink-0 mt-1"
            />
          </div>

          <div className="w-12 h-px bg-gradient-to-r from-white/40 to-transparent" aria-hidden="true" />

          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            {evento.descricao}
          </p>

          {/* Grid de informações – incluindo o novo campo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-start gap-3">
                <Calendar className="text-white/50 mt-0.5" size={18} aria-hidden="true" />
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Data</p>
                  <p className="text-sm text-white font-medium">{dataFormatada}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-start gap-3">
                <MapPin className="text-white/50 mt-0.5" size={18} aria-hidden="true" />
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Local</p>
                  <p className="text-sm text-white font-medium">{evento.local}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-start gap-3">
                <Users className="text-white/50 mt-0.5" size={18} aria-hidden="true" />
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Capacidade</p>
                  <p className="text-sm text-white font-medium">{evento.capacidadeTotal} lugares</p>
                </div>
              </div>
            </div>
            {/* ========== NOVO CAMPO ========== */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-start gap-3">
                <Ticket className="text-white/50 mt-0.5" size={18} aria-hidden="true" />
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Compra de ingressos</p>
                  <p className="text-sm text-white font-medium">
                    {evento.localVendaIngressos || 'Não informado'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Botão fechar */}
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={onClose}
              className="w-full py-3 bg-white/5 hover:bg-white/15 text-white font-medium rounded-xl transition-all duration-300 text-sm border border-white/5 hover:border-white/20 flex items-center justify-center gap-2 group"
            >
              <span>Fechar</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">✕</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;