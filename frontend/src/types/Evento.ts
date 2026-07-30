// src/types/Evento.ts
// Aqui a gente descreve "a cara" que um Evento tem no nosso sistema.
// Isso ajuda o TypeScript a nos avisar se esquecermos algum campo.

export type StatusEvento = 'BREVE' | 'EM_CARTAZ' | 'ENCERRADO' | 'CANCELADO';

export interface Evento {
  id: number;
  titulo: string;
  descricao: string;
  dataHora: string; // vem do backend como texto no formato ISO (ex: "2026-08-10T20:00:00")
  local: string;
  imagemUrl: string;
  capacidadeTotal: number;
  ingressosDisponiveis: number;
  status: StatusEvento;
}

// Isso aqui é o "molde" para quando formos CRIAR ou EDITAR um evento.
// Repare que não tem "id" nem "ingressosDisponiveis", porque isso quem
// calcula é o backend.
export interface EventoFormData {
  titulo: string;
  descricao: string;
  dataHora: string;
  local: string;
  imagemUrl: string;
  capacidadeTotal: number;
  status: StatusEvento;
}
