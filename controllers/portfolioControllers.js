

let proximoIdProjetos = 3;
let proximoIdFormacao = 3; 
let proximoIdCursos = 3;

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

    formacao: [
        {
            id: 1,
            curso: "Curso Técnico em Elétrica",
            instituicao: "Nome da Instituição de Ensino",
            periodo: "2010-2015"
        },
        {
            id: 2,
            curso: "Graduação em Comoutação",
            instituicao: "Nome da Universidade",
            periodo: "2020 - 2024"   
        }
    ],

    cursos: [
        {
            id: 1,
            nome: "Curso de JavaScript Avançado",
            plataforma: "Plataforma (Ex: Alura, Udemy, Coursera)",
          
        },
        {
            id: 2,
            nome: "Workshop de Metodologias Ágeis",
            plataforma: "Evento ou Instituição",
           
        }
    ],

    projetos: [
        {
            id: 1,
            nome: "Portfólio Acadêmico Digital ",
            descricao: "Projeto desenvolvido com Node.js, Express e EJS para atender aos requisitos da atividade. Inclui rotas, views dinâmicas e controllers.",
            tecnologias: ["Node.js", "Express", "EJS", "CSS"],
        },
        {
            id: 2,
            nome: "Projeto 2 (Ex: Calculadora)",
            descricao: "Uma breve descrição do seu segundo projeto.",
            tecnologias: ["HTML", "CSS", "JavaScript"],
            
        }
    ],

    competencias: {
        tecnicas: ["HTML5", "CSS3", "JavaScript (ES6+)", "Node.js", "Express", "EJS", "Git", "SQL Básico"],
        interpessoais: ["Comunicação", "Trabalho em Equipe", "Resolução de Problemas", "Aprendizado Contínuo", ]
    },

    linksRedes: [
        { nome: "LinkedIn", url: "https://linkedin.com/in/seu-usuario" },
        { nome: "GitHub", url: "https://github.com/yCels" },
        { nome: "Lattes", url: "#" }
    ]
};


const portfolioController = {


    paginaApresentacao: (req, res) => {

        res.render('pages/index', {
            pageTitle: "Apresentação",
            dados: dadosPortfolio
        });
    },


    paginaFormacao: (req, res) => {

        res.render('pages/formacao', {
            pageTitle: "Formação Acadêmica",
            dados: dadosPortfolio
        });
    },


    paginaCursos: (req, res) => {
        res.render('pages/cursos', {
            pageTitle: "Cursos e Certificações",
            dados: dadosPortfolio
        });
    },


    paginaProjetos: (req, res) => {
        res.render('pages/projetos', {
            pageTitle: "Projetos",
            dados: dadosPortfolio
        });
    },


    paginaCompetencias: (req, res) => {
        res.render('pages/competencias', {
            pageTitle: "Competências",
            dados: dadosPortfolio
        });
    },




  adicionarProjeto: (req, res) => {
     
        console.log("Recebido no POST /projetos/add:", req.body);
        
        
        const { nome, descricao, tecnologias } = req.body;
        
        let arrayTecnologias = [];
        if (tecnologias && typeof tecnologias === 'string') {
            arrayTecnologias = tecnologias.split(',').map(tech => tech.trim());
        }

        const novoProjeto = {
            id: proximoIdProjetos, 
            nome: nome,
            descricao: descricao,
            tecnologias: arrayTecnologias 
        };

        dadosPortfolio.projetos.push(novoProjeto);
        proximoIdProjetos++; 
        
        console.log("Projeto novo adicionado:", novoProjeto);

        res.redirect('/projetos');
    },

    adicionarFormacao: (req, res) => {
        
        console.log("Recebido no POST /formacao/add:", req.body);

        const { curso, instituicao, periodo } = req.body;

       
        const novaFormacao = {
            id: proximoIdFormacao,
            curso: curso,
            instituicao: instituicao,
            periodo: periodo
        };

        proximoIdFormacao++;
        dadosPortfolio.formacao.push(novaFormacao);
        
        console.log("Formação nova adicionada:", novaFormacao);

        
        res.redirect('/formacao');
    },

    adicionarCurso: (req, res) => {
        console.log("Recebido no POST /cursos/add:", req.body);
        
       
        const { nome, plataforma } = req.body;

        
        const novoCurso = {
            id: proximoIdCursos,
            nome: nome,
            plataforma: plataforma
        };

       proximoIdCursos++;   
        dadosPortfolio.cursos.push(novoCurso);
        
        console.log("Curso novo adicionado:", novoCurso);

        
        res.redirect('/cursos');
    },

    adicionarCompetencia: (req, res) => {
        console.log("Recebido no POST /competencias/add:", req.body);
        
        const { nome, tipo } = req.body; 

        
        if (nome && tipo === 'tecnica') {
            dadosPortfolio.competencias.tecnicas.push(nome);
            console.log("Competência Técnica adicionada:", nome);

        } else if (nome && tipo === 'interpessoal') {
            dadosPortfolio.competencias.interpessoais.push(nome);
            console.log("Competência Interpessoal adicionada:", nome);
        }

        
        res.redirect('/competencias');
    },

  
    

    atualizarApresentacao: (req, res) => {
        const { nome, biografia, email, telefone } = req.body;

        console.log("Recebido no PUT /apresentacao/update:", req.body);

 
        if (nome) {
            dadosPortfolio.apresentacao.nome = nome;
        }
        if (biografia) {
            dadosPortfolio.apresentacao.biografia = biografia;
        }
        if (email) {
            dadosPortfolio.apresentacao.contato.email = email;
        }
        if (telefone) {
            dadosPortfolio.apresentacao.contato.telefone = telefone;
        }
        
        console.log("Dados de apresentação atualizados com sucesso!");

        
        res.redirect('/');
    }
  

};

module.exports = portfolioController;