// src/api/api.ts
// Este arquivo é o "telefone" que o nosso site usa para ligar pro backend.
// Como o site agora é só institucional (sem área administrativa), ele só
// precisa buscar os eventos públicos — não tem mais login nem senha aqui.

import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
