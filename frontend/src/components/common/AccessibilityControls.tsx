import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Eye } from 'lucide-react';

const AccessibilityControls: React.FC = () => {
  const [isReading, setIsReading] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  const readPage = () => {
    if (!speechSynthesis) {
      alert('Seu navegador não suporta leitura em voz alta.');
      return;
    }

    // Cancela leitura anterior
    speechSynthesis.cancel();

    // Pega todo o texto visível da página (ignora elementos ocultos)
    const mainContent = document.querySelector('#main-content');
    if (!mainContent) return;

    const text = mainContent.textContent || '';
    const cleanedText = text.replace(/\s+/g, ' ').trim();

    if (!cleanedText) {
      alert('Nenhum texto para ler.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanedText);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1;

    utterance.onstart = () => setIsReading(true);
    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);

    speechSynthesis.speak(utterance);
  };

  const stopReading = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      setIsReading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-4 z-50 flex flex-col gap-2">
      <button
        onClick={isReading ? stopReading : readPage}
        className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-colors text-white shadow-lg"
        aria-label={isReading ? 'Parar leitura da página' : 'Ler página em voz alta'}
        title={isReading ? 'Parar leitura' : 'Ler página'}
      >
        {isReading ? <VolumeX size={22} /> : <Volume2 size={22} />}
      </button>
    </div>
  );
};

export default AccessibilityControls;