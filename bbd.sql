
-- 1. Populando a FORMAÇÃO ACADÊMICA 🎓
INSERT INTO formacao (curso, instituicao, periodo) VALUES 
('Análise e Desenvolvimento de Sistemas', 'Faculdade de Tecnologia (FATEC)', '2023 - Atual'),
('Técnico em Informática para Internet', 'ETEC', '2020 - 2022'),
('Ensino Médio Completo', 'Escola Estadual', '2017 - 2019');

-- 2. Populando CURSOS EXTRAS 📜
INSERT INTO cursos (nome, plataforma) VALUES 
('Desenvolvimento Web Completo 2024', 'Udemy'),
('Bootcamp Node.js e MySQL', 'DIO (Digital Innovation One)'),
('Inglês Técnico para TI', 'Alura'),
('Git e GitHub para Iniciantes', 'YouTube (Curso em Vídeo)');

-- 3. Populando COMPETÊNCIAS (Hard Skills e Soft Skills) 🧠
-- Técnicas
INSERT INTO competencias (nome, tipo) VALUES 
('JavaScript (ES6+)', 'tecnica'),
('Node.js', 'tecnica'),
('Express', 'tecnica'),
('MySQL / SQL', 'tecnica'),
('HTML5 & CSS3', 'tecnica'),
('EJS (Template Engine)', 'tecnica'),
('Git / GitHub', 'tecnica');

-- Interpessoais
INSERT INTO competencias (nome, tipo) VALUES 
('Comunicação Clara', 'interpessoal'),
('Trabalho em Equipe', 'interpessoal'),
('Resolução de Problemas', 'interpessoal'),
('Aprendizado Contínuo (Lifelong Learning)', 'interpessoal'),
('Proatividade', 'interpessoal');
SHOW TABLES;

SELECT * FROM projetos;

-- Ver toda a FORMAÇÃO
SELECT * FROM formacao;

-- Ver todos os CURSOS
SELECT * FROM cursos;

-- Ver todas as COMPETÊNCIAS
SELECT * FROM competencias;
-- 4. Adicionando mais PROJETOS (caso queira mais de um) 💻
INSERT INTO projetos (nome, descricao, tecnologias) VALUES 
('Sistema de Cadastro de Clientes', 'CRUD completo com Node.js e Banco de Dados.', 'Node.js, Express, MySQL'),
('Landing Page Responsiva', 'Página de vendas de alta conversão mobile-first.', 'HTML, CSS, Flexbox');