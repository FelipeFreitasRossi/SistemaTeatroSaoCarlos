import React, { useEffect, useState, useRef } from 'react';
import type { Evento } from '../../types/Evento';
import { endpoints } from '../../api/api';
import EventCard from '../common/EventCard';
import EventModal from '../common/EventModal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface PublicEventListProps {
  onLoaded?: () => void;
}

const PublicEventList: React.FC<PublicEventListProps> = ({ onLoaded }) => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [eventoSelecionado, setEventoSelecionado] = useState<Evento | null>(null);
  const loadedCalled = useRef(false);

  useEffect(() => {
    const carregarEventos = async () => {
      try {
        const resposta = await endpoints.listarPublicos();
        setEventos(resposta.data);
        if (onLoaded && !loadedCalled.current) {
          loadedCalled.current = true;
          onLoaded();
        }
        ScrollTrigger.refresh();
      } catch (error) {
        console.error('Erro ao carregar eventos:', error);
        if (onLoaded && !loadedCalled.current) {
          loadedCalled.current = true;
          onLoaded();
        }
      } finally {
        setCarregando(false);
      }
    };

    carregarEventos();
  }, [onLoaded]);

  useEffect(() => {
    if (!carregando && eventos.length > 0) {
      gsap.fromTo(
        '.event-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.eventos-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, [carregando, eventos]);

  if (carregando) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 eventos-grid" aria-live="polite" aria-busy="true">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/5 rounded-xl h-64 animate-pulse" aria-hidden="true" />
        ))}
        <span className="sr-only">Carregando eventos...</span>
      </div>
    );
  }

  if (eventos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400" aria-live="polite">
        <p className="text-lg">🎭 Nenhum evento em cartaz no momento.</p>
        <p className="text-sm mt-2">Volte em breve para conferir nossa programação.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 eventos-grid" aria-live="polite" aria-label="Lista de eventos">
        {eventos.map((evento) => (
          <EventCard
            key={evento.id}
            evento={evento}
            onClick={() => setEventoSelecionado(evento)}
          />
        ))}
      </div>

      {eventoSelecionado && (
        <EventModal
          evento={eventoSelecionado}
          onClose={() => setEventoSelecionado(null)}
        />
      )}
    </>
  );
};

export default PublicEventList;