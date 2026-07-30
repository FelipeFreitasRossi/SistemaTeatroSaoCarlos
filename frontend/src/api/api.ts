// src/api/api.ts
import axios from 'axios';
import type { Evento } from '../types/Evento';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Criamos o cliente axios (padrão)
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const username = localStorage.getItem('auth_username');
  const password = localStorage.getItem('auth_password');
  if (username && password) {
    const token = btoa(`${username}:${password}`);
    config.headers.Authorization = `Basic ${token}`;
  }
  return config;
});

// Definimos os endpoints
const endpoints = {
  listarPublicos: () => api.get<Evento[]>('/api/eventos/publicos'),
  buscarPorId: (id: number) => api.get<Evento>(`/api/eventos/${id}`),
  listarTodos: () => api.get<Evento[]>('/api/eventos/admin/todos'),
  criar: (dados: Omit<Evento, 'id'>) => api.post<Evento>('/api/eventos/admin', dados),
  atualizar: (id: number, dados: Partial<Evento>) =>
    api.put<Evento>(`/api/eventos/admin/${id}`, dados),
  deletar: (id: number) => api.delete<void>(`/api/eventos/admin/${id}`),
};

// Exportação padrão (api) + exportação nomeada (endpoints)
export default api;
export { endpoints };