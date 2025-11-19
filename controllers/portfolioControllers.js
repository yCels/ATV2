const db = require('../config/db'); // Importamos nossa conexão

// Mantemos aqui apenas os dados que NÃO estão no banco de dados (estáticos)
const dadosPortfolio = {
    apresentacao: {
        nome: "Celso Moreira Freitas",
        foto: "/images/sua-foto.jpeg",
        biografia: "Sou estudante de Análise e Desenvolvimento de Sistemas, apaixonado por tecnologia e desenvolvimento. Este portfólio foi criado para demonstrar minhas habilidades e projetos acadêmicos usando Node.js, Express e EJS.",
        contato: {
            email: "celso5mf@gmail.com",
            telefone: "(12) 9999-9999"
        }
    },
    // Inicializamos vazios, pois serão preenchidos pelo banco a cada requisição
    formacao: [],
    cursos: [],
    projetos: [],
    competencias: {
        tecnicas: [],
        interpessoais: []
    },
    linksRedes: [
        { nome: "LinkedIn", url: "https://linkedin.com/in/seu-usuario" },
        { nome: "GitHub", url: "https://github.com/yCels" },
        { nome: "Lattes", url: "#" }
    ]
};

const portfolioController = {

    // --- RENDERIZAÇÃO DAS PÁGINAS (READ) ---

    paginaApresentacao: (req, res) => {
        // A página inicial usa apenas dados estáticos, então não precisa de async/await
        res.render('pages/index', {
            pageTitle: "Apresentação",
            dados: dadosPortfolio
        });
    },

    paginaFormacao: async (req, res) => {
        try {
            // Buscamos no banco
            const [rows] = await db.query('SELECT * FROM formacao');
            
            // Atualizamos o objeto global com os dados frescos do banco
            dadosPortfolio.formacao = rows;

            res.render('pages/formacao', {
                pageTitle: "Formação Acadêmica",
                dados: dadosPortfolio
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Erro ao buscar formação');
        }
    },

    paginaCursos: async (req, res) => {
        try {
            const [rows] = await db.query('SELECT * FROM cursos');
            dadosPortfolio.cursos = rows;

            res.render('pages/cursos', {
                pageTitle: "Cursos e Certificações",
                dados: dadosPortfolio
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Erro ao buscar cursos');
        }
    },

    paginaProjetos: async (req, res) => {
        try {
            const [rows] = await db.query('SELECT * FROM projetos');

            // Tratamento especial: Converter string "JS, HTML" em array ["JS", "HTML"]
            dadosPortfolio.projetos = rows.map(p => ({
                ...p,
                tecnologias: p.tecnologias ? p.tecnologias.split(',').map(t => t.trim()) : []
            }));

            res.render('pages/projetos', {
                pageTitle: "Projetos",
                dados: dadosPortfolio
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Erro ao buscar projetos');
        }
    },

    paginaCompetencias: async (req, res) => {
        try {
            const [rows] = await db.query('SELECT * FROM competencias');

            // Separamos as competências em duas listas para a view funcionar igual antes
            // Usamos 'map' para pegar só o nome, pois a view espera strings simples na lista
            dadosPortfolio.competencias.tecnicas = rows
                .filter(c => c.tipo === 'tecnica')
                .map(c => c.nome);

            dadosPortfolio.competencias.interpessoais = rows
                .filter(c => c.tipo === 'interpessoal')
                .map(c => c.nome);

            res.render('pages/competencias', {
                pageTitle: "Competências",
                dados: dadosPortfolio
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Erro ao buscar competências');
        }
    },


    // --- OPERAÇÕES DE CRIAÇÃO (CREATE) ---

    adicionarProjeto: async (req, res) => {
        const { nome, descricao, tecnologias } = req.body;
        try {
            await db.query(
                'INSERT INTO projetos (nome, descricao, tecnologias) VALUES (?, ?, ?)',
                [nome, descricao, tecnologias]
            );
            res.redirect('/projetos');
        } catch (error) {
            console.log(error);
            res.redirect('/projetos');
        }
    },

    adicionarFormacao: async (req, res) => {
        const { curso, instituicao, periodo } = req.body;
        try {
            await db.query(
                'INSERT INTO formacao (curso, instituicao, periodo) VALUES (?, ?, ?)',
                [curso, instituicao, periodo]
            );
            res.redirect('/formacao');
        } catch (error) {
            console.log(error);
            res.redirect('/formacao');
        }
    },

    adicionarCurso: async (req, res) => {
        const { nome, plataforma } = req.body;
        try {
            await db.query(
                'INSERT INTO cursos (nome, plataforma) VALUES (?, ?)',
                [nome, plataforma]
            );
            res.redirect('/cursos');
        } catch (error) {
            console.log(error);
            res.redirect('/cursos');
        }
    },

    adicionarCompetencia: async (req, res) => {
        const { nome, tipo } = req.body;
        try {
            // Precisamos validar se o tipo é válido
            if (nome && (tipo === 'tecnica' || tipo === 'interpessoal')) {
                await db.query(
                    'INSERT INTO competencias (nome, tipo) VALUES (?, ?)',
                    [nome, tipo]
                );
            }
            res.redirect('/competencias');
        } catch (error) {
            console.log(error);
            res.redirect('/competencias');
        }
    },


    // --- OPERAÇÕES DE ATUALIZAÇÃO (UPDATE) ---
    // Nota: A página de apresentação é estática neste exemplo, então mantivemos a lógica original
    // Se quiser persistir, precisaria criar uma tabela 'apresentacao' no banco.
    atualizarApresentacao: (req, res) => {
        const { nome, biografia, email, telefone } = req.body;
        if (nome) dadosPortfolio.apresentacao.nome = nome;
        if (biografia) dadosPortfolio.apresentacao.biografia = biografia;
        if (email) dadosPortfolio.apresentacao.contato.email = email;
        if (telefone) dadosPortfolio.apresentacao.contato.telefone = telefone;
        res.redirect('/');
    },

    atualizarProjeto: async (req, res) => {
        const { id } = req.params;
        const { nome, descricao, tecnologias } = req.body;
        try {
            // O SQL UPDATE só altera os campos se passarmos novos valores
            // Aqui simplifiquei assumindo que o form envia tudo. 
            // Num cenário real, você faria verificações de quais campos vieram.
            await db.query(
                'UPDATE projetos SET nome = ?, descricao = ?, tecnologias = ? WHERE id = ?',
                [nome, descricao, tecnologias, id]
            );
            res.redirect('/projetos');
        } catch (error) {
            console.log(error);
            res.redirect('/projetos');
        }
    },

    atualizarFormacao: async (req, res) => {
        const { id } = req.params;
        const { curso, instituicao, periodo } = req.body;
        try {
            await db.query(
                'UPDATE formacao SET curso = ?, instituicao = ?, periodo = ? WHERE id = ?',
                [curso, instituicao, periodo, id]
            );
            res.redirect('/formacao');
        } catch (error) {
            console.log(error);
            res.redirect('/formacao');
        }
    },

    atualizarCurso: async (req, res) => {
        const { id } = req.params;
        const { nome, plataforma } = req.body;
        try {
            await db.query(
                'UPDATE cursos SET nome = ?, plataforma = ? WHERE id = ?',
                [nome, plataforma, id]
            );
            res.redirect('/cursos');
        } catch (error) {
            console.log(error);
            res.redirect('/cursos');
        }
    },

    atualizarCompetencia: async (req, res) => {
        const { tipo, valorAntigo, valorNovo } = req.body;
        try {
            // Como não usamos ID na view de competências, atualizamos pelo nome antigo + tipo
            await db.query(
                'UPDATE competencias SET nome = ? WHERE nome = ? AND tipo = ?',
                [valorNovo, valorAntigo, tipo]
            );
            res.redirect('/competencias');
        } catch (error) {
            console.log(error);
            res.redirect('/competencias');
        }
    },


    // --- OPERAÇÕES DE EXCLUSÃO (DELETE) ---

    deletarProjeto: async (req, res) => {
        const { id } = req.params;
        try {
            await db.query('DELETE FROM projetos WHERE id = ?', [id]);
            res.redirect('/projetos');
        } catch (error) {
            console.log(error);
            res.redirect('/projetos');
        }
    },

    deletarFormacao: async (req, res) => {
        const { id } = req.params;
        try {
            await db.query('DELETE FROM formacao WHERE id = ?', [id]);
            res.redirect('/formacao');
        } catch (error) {
            console.log(error);
            res.redirect('/formacao');
        }
    },

    deletarCurso: async (req, res) => {
        const { id } = req.params;
        try {
            await db.query('DELETE FROM cursos WHERE id = ?', [id]);
            res.redirect('/cursos');
        } catch (error) {
            console.log(error);
            res.redirect('/cursos');
        }
    },

    deletarCompetencia: async (req, res) => {
        const { nome, tipo } = req.body;
        try {
            // Deletamos baseados no nome e tipo, já que a view não passa ID
            await db.query('DELETE FROM competencias WHERE nome = ? AND tipo = ?', [nome, tipo]);
            res.redirect('/competencias');
        } catch (error) {
            console.log(error);
            res.redirect('/competencias');
        }
    }

};

module.exports = portfolioController;