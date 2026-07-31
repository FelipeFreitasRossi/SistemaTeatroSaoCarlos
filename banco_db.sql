-- ==========================================
-- 1. CRIAR O BANCO DE DADOS (se não existir)
-- ==========================================
CREATE DATABASE IF NOT EXISTS teatro_db;
USE teatro_db;

-- ==========================================
-- 2. CRIAR A TABELA DE EVENTOS
-- ==========================================
CREATE TABLE IF NOT EXISTS eventos (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    descricao VARCHAR(2000) NOT NULL,
    data_hora DATETIME NOT NULL,
    local VARCHAR(100) NOT NULL,
    imagem_url VARCHAR(500) NULL,
    capacidade_total INT NOT NULL,
    ingressos_disponiveis INT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'BREVE'
);

-- ==========================================
-- 3. (OPCIONAL) CRIAR UM ÍNDICE PARA BUSCAS POR STATUS
-- ==========================================
CREATE INDEX idx_eventos_status ON eventos(status);

-- ==========================================
-- 4. (OPCIONAL) INSERIR UM EVENTO DE EXEMPLO PARA TESTAR
-- ==========================================
INSERT INTO eventos (titulo, descricao, data_hora, local, imagem_url, capacidade_total, ingressos_disponiveis, status)
VALUES (
    'Concerto Sinfônico',
    'Uma noite de música clássica com a Orquestra Municipal.',
    '2026-08-15 20:00:00',
    'Sala Principal - Teatro Municipal',
    'https://i.postimg.cc/dQ20n6Hf/Teatro-1.jpg',
    200,
    200,
    'EM_CARTAZ'
);