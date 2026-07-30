// src/hooks/useAuth.ts
// Hook de autenticação (não utilizado no site institucional)
// Mantido apenas para referência, caso futuramente precise de uma área restrita.

import { useState, useCallback } from 'react';

export function useAuth() {
  const [logado, setLogado] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const login = useCallback(async (usuario: string, senha: string) => {
    setCarregando(true);
    setErro(null);

    // Simulação: credenciais fixas (admin/admin123)
    // Em um cenário real, você faria uma requisição para o backend.
    if (usuario === 'admin' && senha === 'admin123') {
      setLogado(true);
      setCarregando(false);
      return true;
    } else {
      setErro('Usuário ou senha incorretos.');
      setLogado(false);
      setCarregando(false);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setLogado(false);
  }, []);

  return { logado, carregando, erro, login, logout };
}