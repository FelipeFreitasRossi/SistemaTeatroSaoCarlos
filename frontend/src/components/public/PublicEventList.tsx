// src/components/public/PublicEventList.tsx
// Busca os eventos públicos no backend e mostra em uma grade de cards.

import { useEffect, useState } from 'react';
import { api } from '../../api/api';
import type { Evento } from '../../types/Evento';
import EventCard from '../common/EventCard';
import EventModal from '../common/EventModal';
import { animarCardsAoRolar } from '../../utils/gsapAnimations';

export default function PublicEventList() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [eventoSelecionado, setEventoSelecionado] = useState<Evento | null>(null);

  useEffect(() => {
    async function buscarEventos() {
      try {
        const resposta = await api.get<Evento[]>('/eventos/publicos');
        setEventos(resposta.data);
      } catch (err) {
        setErro('Não foi possível carregar os eventos. Verifique se o backend está rodando.');
      } finally {
        setCarregando(false);
      }
    }
    buscarEventos();
  }, []);

  // Roda a animação de "aparecer ao rolar" só depois que os cards existem na tela.
  useEffect(() => {
    if (eventos.length > 0) {
      // pequeno delay para garantir que o DOM já desenhou os cards
      const timer = setTimeout(() => animarCardsAoRolar('.evento-card'), 50);
      return () => clearTimeout(timer);
    }
  }, [eventos]);

  if (carregando) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="animate-pulse text-[#C9A227]">Carregando eventos...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="mx-auto max-w-md rounded-xl border border-[#7A2E2E]/40 bg-[#7A2E2E]/10 p-6 text-center">
        <p className="text-[#D96C6C]">{erro}</p>
      </div>
    );
  }

  if (eventos.length === 0) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center">
        <p className="text-[#A8A29A]">Nenhum evento em cartaz no momento. Volte em breve!</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {eventos.map((evento) => (
          <EventCard key={evento.id} evento={evento} onClick={() => setEventoSelecionado(evento)} />
        ))}
      </div>

      {eventoSelecionado && (
        <EventModal evento={eventoSelecionado} onFechar={() => setEventoSelecionado(null)} />
      )}
    </>
  );
}
