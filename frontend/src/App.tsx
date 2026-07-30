import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LoadingScreen from './components/common/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simula o carregamento de recursos (pode ser substituído por loading real)
  useEffect(() => {
    // Se quiser um tempo mínimo de loading para a animação ser vista
    const minLoadingTime = 2000; // 2 segundos
    const start = Date.now();

    // Simula carregamento de dados (ex: API, imagens, etc)
    const loadResources = async () => {
      // Aqui você pode carregar recursos reais se necessário
      await new Promise(resolve => setTimeout(resolve, 1500));
    };

    loadResources().then(() => {
      const elapsed = Date.now() - start;
      const remaining = minLoadingTime - elapsed;
      if (remaining > 0) {
        setTimeout(() => setIsLoading(false), remaining);
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      ) : (
        <div className="min-h-screen bg-[#0B0B0B] text-white flex flex-col">
          <Header />
          <main className="flex-grow">
            <Home />
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      )}
    </>
  );
}

export default App;