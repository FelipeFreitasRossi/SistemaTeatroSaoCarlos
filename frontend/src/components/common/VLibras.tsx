import React, { useEffect } from 'react';

const VLibras: React.FC = () => {
  useEffect(() => {
    // Evita carregar o script mais de uma vez
    if (document.querySelector('#vlibras-script')) return;

    // 1. Cria a estrutura HTML do VLibras via JavaScript
    const vwDiv = document.createElement('div');
    vwDiv.setAttribute('vw', '');
    vwDiv.className = 'enabled';

    const accessButton = document.createElement('div');
    accessButton.setAttribute('vw-access-button', '');
    accessButton.className = 'active';
    vwDiv.appendChild(accessButton);

    const pluginWrapper = document.createElement('div');
    pluginWrapper.setAttribute('vw-plugin-wrapper', '');
    const topWrapper = document.createElement('div');
    topWrapper.className = 'vw-plugin-top-wrapper';
    pluginWrapper.appendChild(topWrapper);
    vwDiv.appendChild(pluginWrapper);

    // Adiciona ao body (para ficar no final da página, como no HTML)
    document.body.appendChild(vwDiv);

    // 2. Carrega o script oficial do VLibras
    const script = document.createElement('script');
    script.id = 'vlibras-script';
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;

    script.onload = () => {
      // 3. Inicializa o widget
      if ((window as any).VLibras) {
        new (window as any).VLibras.Widget({
          rootPath: 'https://vlibras.gov.br/app',
        });
      } else {
        console.warn('VLibras não carregou corretamente.');
      }
    };

    script.onerror = () => {
      console.error('Erro ao carregar o script do VLibras. Verifique sua conexão.');
    };

    document.body.appendChild(script);

    // Limpeza: remove as divs e o script quando o componente desmontar
    return () => {
      const vwElement = document.querySelector('[vw]');
      if (vwElement) vwElement.remove();

      const scriptElement = document.querySelector('#vlibras-script');
      if (scriptElement) scriptElement.remove();
    };
  }, []);

  return null;
};

export default VLibras;