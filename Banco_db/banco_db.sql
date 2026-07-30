-- Cria o banco de dados (se não existir)
CREATE DATABASE IF NOT EXISTS teatro_db;
USE teatro_db;

-- Cria a tabela eventos
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

-- (Opcional) Cria um índice para acelerar buscas por status
CREATE INDEX idx_eventos_status ON eventos(status);