export type StatusEvento = 'BREVE' | 'EM_CARTAZ' | 'ENCERRADO' | 'CANCELADO';

export interface Evento {
  id: number;
  titulo: string;
  descricao: string;
  dataHora: string;
  local: string;
  imagemUrl: string;
  capacidadeTotal: number;
  ingressosDisponiveis: number;
  status: 'BREVE' | 'EM_CARTAZ' | 'ENCERRADO' | 'CANCELADO';
}

export interface EventoFormData {
  titulo: string;
  descricao: string;
  dataHora: string;
  local: string;
  imagemUrl: string;
  capacidadeTotal: number;
  status: StatusEvento;
}
