CREATE DATABASE portfolio_db;
USE portfolio_db;
-- Tabela para os Projetos
CREATE TABLE projetos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    tecnologias VARCHAR(255)
);
-- Tabela para Formação Acadêmica
CREATE TABLE formacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    curso VARCHAR(255) NOT NULL,
    instituicao VARCHAR(255),
    periodo VARCHAR(50)
);
-- Tabela para Cursos Extras
CREATE TABLE cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    plataforma VARCHAR(255)
);
-- Tabela para Competências
CREATE TABLE competencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tipo ENUM('tecnica', 'interpessoal') NOT NULL
);
-- SEED (Dados Iniciais)
INSERT INTO projetos (nome, descricao, tecnologias)
VALUES (
        'Portfólio Digital',
        'Projeto Fullstack',
        'Node.js, Express, EJS, MySQL'
    ),
    (
        'Sistema de Cadastro',
        'CRUD Completo',
        'Node.js, MySQL'
    );
INSERT INTO formacao (curso, instituicao, periodo)
VALUES (
        'Análise e Desenvolvimento de Sistemas',
        'FATEC',
        '2023 - Atual'
    ),
    ('Técnico em Informática', 'ETEC', '2020 - 2022');
INSERT INTO cursos (nome, plataforma)
VALUES ('Desenvolvimento Web Completo', 'Udemy'),
    ('Bootcamp Node.js', 'DIO');
INSERT INTO competencias (nome, tipo)
VALUES ('JavaScript', 'tecnica'),
    ('Node.js', 'tecnica'),
    ('MySQL', 'tecnica'),
    ('Comunicação', 'interpessoal'),
    ('Proatividade', 'interpessoal');