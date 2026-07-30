// src/components/common/LoginModal.tsx
// Tela de login simples para a área administrativa.

import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import { animarEntradaModal, criarRipple } from '../../utils/gsapAnimations';
import { useAuth } from '../../hooks/useAuth';

interface LoginModalProps {
  onLogado: () => void;
}

export default function LoginModal({ onLogado }: LoginModalProps) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const { login, carregando, erro } = useAuth();

  useEffect(() => {
    animarEntradaModal('.modal-overlay', '.modal-box');
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const sucesso = await login(usuario, senha);
    if (sucesso) onLogado();
  }

  return (
    <div className="modal-overlay flex min-h-screen items-center justify-center bg-[#0B0B10] p-4">
      <div className="modal-box w-full max-w-sm rounded-2xl border border-[#C9A227]/30 bg-[#151318]/80 p-8 shadow-2xl shadow-black/50 backdrop-blur-md">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <div className="rounded-full bg-[#C9A227]/10 p-3">
            <Lock className="text-[#C9A227]" size={22} />
          </div>
          <h1 className="font-['Playfair_Display'] text-2xl font-semibold text-[#F5F1E8]">
            Área Administrativa
          </h1>
          <p className="text-sm text-[#A8A29A]">Entre com suas credenciais para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-[#A8A29A]">Usuário</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full rounded-lg border border-[#C9A227]/20 bg-[#0B0B10] px-3 py-2 text-[#F5F1E8]
                         outline-none transition-shadow focus:border-[#C9A227] focus:shadow-[0_0_0_3px_rgba(201,162,39,0.2)]"
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[#A8A29A]">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full rounded-lg border border-[#C9A227]/20 bg-[#0B0B10] px-3 py-2 text-[#F5F1E8]
                         outline-none transition-shadow focus:border-[#C9A227] focus:shadow-[0_0_0_3px_rgba(201,162,39,0.2)]"
              placeholder="••••••••"
              required
            />
          </div>

          {erro && <p className="text-sm text-[#D96C6C]">{erro}</p>}

          <button
            type="submit"
            disabled={carregando}
            onMouseDown={criarRipple}
            className="relative w-full overflow-hidden rounded-lg bg-[#C9A227] py-2.5 font-semibold text-[#12100A] transition
                       hover:bg-[#E8C766] disabled:opacity-60"
          >
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
