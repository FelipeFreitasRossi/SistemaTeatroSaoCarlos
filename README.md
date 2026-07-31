# 🎭 Teatro Municipal – Sistema de Gestão de Eventos

[![Render](https://img.shields.io/badge/Render-Deployed-brightgreen)](https://sistemateatrosaocarlos.onrender.com)
[![Uptime Robot](https://img.shields.io/badge/Uptime%20Robot-Monitoring-4CAF50)](https://uptimerobot.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Java 17](https://img.shields.io/badge/Java-17-ED8B00?logo=openjdk&logoColor=white)](https://adoptium.net/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.5-6DB33F?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

---

## 📌 Sobre o Projeto

Sistema completo para **gestão de eventos culturais** do Teatro Municipal. Desenvolvido com foco em **acessibilidade**, **experiência do usuário** e **facilidade de uso**, a plataforma oferece:

- **Vitrine pública** com eventos em cartaz e em breve, com cards interativos e animações.
- **Painel administrativo** privado para gerenciar eventos (criar, editar, excluir).
- **Acessibilidade** para surdos (VLibras) e cegos (áudio, navegação por teclado, ARIA).
- **Design responsivo e imersivo**, com animações GSAP que trazem a atmosfera do teatro.

🔗 **Site em produção:** [teatromunicipalsaocarlos.netlify.app](https://teatromunicipalsaocarlos.netlify.app/)  
🔗 **API Backend:** [sistemateatrosaocarlos.onrender.com](https://sistemateatrosaocarlos.onrender.com)

---

## 🎨 Tecnologias Utilizadas

### Backend
| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| Java | 17 | Linguagem principal |
| Spring Boot | 3.3.5 | Framework web e JPA |
| Spring Security | 6.3.4 | Autenticação via Basic Auth |
| Spring Data JPA | – | ORM para MySQL |
| MySQL | 8.0 | Banco de dados relacional |
| Lombok | 1.18.34 | Redução de código boilerplate |
| Docker | – | Containerização para deploy |

### Frontend
| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| React | 19 | Biblioteca de UI |
| TypeScript | 5.0 | Tipagem estática |
| Vite | 5.0 | Bundler e dev server |
| Tailwind CSS | 3.0 | Estilização utilitária |
| GSAP | 3.0 | Animações e ScrollTrigger |
| React Router DOM | 6.0 | Roteamento |
| React Hook Form + Zod | – | Validação de formulários |
| Axios | – | Cliente HTTP |
| Lucide React | – | Ícones vetoriais |

### Infraestrutura
| Serviço | Finalidade |
|---------|------------|
| Render | Hospedagem do backend (API e admin) |
| Netlify | Hospedagem do frontend |
| Aiven | Banco de dados MySQL (gratuito) |
| UptimeRobot | Monitoramento do backend (ping a cada 5 min) |

---

## ✨ Funcionalidades

### 🏛️ Página Pública (Vitrine)
- Lista de eventos com status `EM_CARTAZ` ou `BREVE`
- Cards com imagem, título, descrição resumida, data, local e ingressos disponíveis
- Modal com detalhes completos do evento
- Tela de boas-vindas com cortina animada (GSAP)
- Animações de entrada com fade-in, slide-up e parallax
- Seções: Sobre, Programação, Contato (com mapa)

### 🔐 Painel Administrativo
- Acesso restrito por autenticação Basic Auth
- Dashboard com estatísticas: total de eventos, em cartaz, em breve, encerrados
- Listagem completa de eventos (todos os status)
- **CRUD completo**:
  - Criar evento com validação de campos
  - Editar evento via modal pré-preenchido
  - Excluir evento com confirmação
- Feedbacks com toasts animados (sucesso/erro)
- **Responsivo** e otimizado para desktop/mobile

### ♿ Acessibilidade
- **VLibras**: tradução para Libras (parceria com governo federal)
- **Leitura de voz**: botões "Ouvir" em todas as seções (Speech Synthesis API)
- **Navegação por teclado**: `Tab`, `Enter` e `Espaço` em todos os elementos interativos
- **Atributos ARIA**: `role`, `aria-label`, `aria-live`, `aria-modal` etc.
- **Skip link**: "Pular para o conteúdo principal" para navegação eficiente
- **Contraste aprimorado**: fundo escuro com texto claro, cores de destaque adequadas
- **Scrollbar personalizada** e indicadores visuais de foco

### 🎨 Design & Animações
- Tema monocromático (preto, cinza, branco) com toques dourados sutis
- Efeitos **glassmorphism** em cards e modais
- **Parallax** e **ScrollTrigger** do GSAP para animações dinâmicas
- Microinterações: hover com escala, brilho, pulsação de badges
- Responsividade completa (mobile-first)

---

## 🚀 Como Rodar Localmente

### Pré‑requisitos
- [JDK 17+](https://adoptium.net/)
- [MySQL 8.0+](https://dev.mysql.com/downloads/) (ou equivalente)
- [Node.js 18+](https://nodejs.org/) e npm
- [Git](https://git-scm.com/)

### Clonar o repositório
```bash
git clone https://github.com/FelipeFreitasRossi/SistemaTeatroSaoCarlos.git
cd SistemaTeatroSaoCarlos

🔧 Backend (Spring Boot)
Acesse a pasta do backend
cd backend

Configure o banco de dados

Crie um banco de dados MySQL (ex: teatro_db)

No arquivo src/main/resources/application.properties, informe a URL, usuário e senha do seu banco (conforme sua instalação).

Execute o projeto
./mvnw spring-boot:run   # Linux/Mac
mvnw.cmd spring-boot:run # Windows

O backend estará disponível em http://localhost:8080

🖥️ Frontend (React + Vite)
Acesse a pasta do frontend
cd frontend

Instale as dependências
npm install

Configure a URL da API

Crie um arquivo .env na raiz e defina a variável VITE_API_URL com a URL do backend (ex: http://localhost:8080).

Inicie o servidor de desenvolvimento
npm run dev

O frontend estará disponível em http://localhost:5173

🌐 Deploy
Backend (Render)
O deploy é automático via GitHub, utilizando Dockerfile.

Defina as variáveis de ambiente (DATABASE_URL, DATABASE_USER, DATABASE_PASSWORD) no painel do Render.

URL do backend: https://sistemateatrosaocarlos.onrender.com

Endpoint de saúde: /health (usado pelo UptimeRobot)

Frontend (Netlify)
Deploy automático a partir da branch main, com build na pasta frontend/.

Configure a variável VITE_API_URL no painel do Netlify apontando para a URL do backend.

📁 Estrutura de Pastas

SistemaTeatroSaoCarlos/
├── backend/                          # Backend Spring Boot
│   ├── src/main/java/com/example/SistemaTeatro/
│   │   ├── controller/               # REST Controllers
│   │   ├── model/                    # JPA Entities
│   │   ├── dto/                      # Data Transfer Objects
│   │   ├── repository/               # Spring Data JPA Repositories
│   │   ├── service/                  # Regras de negócio
│   │   └── config/                   # Configurações (Security, etc.)
│   ├── src/main/resources/
│   │   ├── static/                   # Arquivos estáticos (admin.html)
│   │   └── application.properties
│   ├── Dockerfile
│   └── pom.xml
├── frontend/                         # Frontend React + TS
│   ├── src/
│   │   ├── api/                      # Configuração do Axios
│   │   ├── components/               # Componentes React
│   │   │   ├── common/               # Componentes reutilizáveis
│   │   │   └── public/               # Componentes da vitrine
│   │   ├── pages/                    # Páginas (Home, Admin)
│   │   ├── hooks/                    # Hooks personalizados
│   │   ├── types/                    # Tipos TypeScript
│   │   └── utils/                    # Utilitários (animações GSAP)
│   ├── public/                       # Arquivos públicos
│   ├── package.json
│   └── vite.config.ts
└── README.md

Backend
cd backend
./mvnw test

Frontend
cd frontend
npm test

📊 Monitoramento
O backend é monitorado pelo UptimeRobot a cada 5 minutos no endpoint /health, garantindo que o serviço não "durma" no plano gratuito do Render.

🤝 Contribuição
Contribuições são bem‑vindas! Siga os passos:

Faça um fork do projeto

Crie uma branch para sua feature:
git checkout -b feature/nova-funcionalidade

Faça commit das suas alterações:
git commit -m 'Adiciona nova funcionalidade'

Envie para a branch:
git push origin feature/nova-funcionalidade

Abra um Pull Request descrevendo suas mudanças

📄 Licença
Este projeto está sob a licença MIT – veja o arquivo LICENSE para detalhes.

📬 Contato
Desenvolvedor: Felipe Freitas Rossi
📧 E-mail: lipeferossi@gmail.com
🔗 GitHub: FelipeFreitasRossi
🔗 LinkedIn: FelipeFreitasRossi

🙏 Agradecimentos
Spring Boot – Framework backend
React – Biblioteca frontend
Tailwind CSS – Estilização ágil
GSAP – Animações fluidas
VLibras – Acessibilidade em Libras
Render – Hospedagem do backend
Netlify – Hospedagem do frontend
Aiven – Banco de dados MySQL gratuito
