import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioReaderProps {
  text: string;
  label?: string;
  className?: string;
}

const AudioReader: React.FC<AudioReaderProps> = ({ text, label = 'Ouvir', className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  const speak = () => {
    if (!speechSynthesis) {
      alert('Seu navegador não suporta a leitura em voz alta.');
      return;
    }
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1;
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const toggle = () => {
    if (isPlaying) stop();
    else speak();
  };

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors ${className}`}
      aria-label={isPlaying ? 'Parar leitura' : `Ouvir: ${label}`}
      title={isPlaying ? 'Parar leitura' : `Ouvir ${label}`}
    >
      {isPlaying ? <VolumeX size={16} /> : <Volume2 size={16} />}
      <span>{isPlaying ? 'Parar' : label}</span>
    </button>
  );
};

export default AudioReader;