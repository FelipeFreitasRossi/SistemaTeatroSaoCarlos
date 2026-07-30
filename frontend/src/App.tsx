// src/App.tsx
// Agora o site é 100% institucional e de página única — não existe mais
// login nem painel administrativo, então nem precisamos de rotas.

import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';

function App() {
  return (
    <>
      {/* O Toaster mostra um aviso caso os eventos não consigam ser carregados */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#151318',
            color: '#F5F1E8',
            border: '1px solid rgba(201,162,39,0.3)',
          },
        }}
      />
      <Home />
    </>
  );
}

export default App;
