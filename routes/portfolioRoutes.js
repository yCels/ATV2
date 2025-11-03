
const express = require('express');


const router = express.Router();


const portfolioController = require('../controllers/portfolioControllers');


router.get('/', portfolioController.paginaApresentacao);


router.get('/formacao', portfolioController.paginaFormacao);


router.get('/cursos', portfolioController.paginaCursos);


router.get('/projetos', portfolioController.paginaProjetos);

router.get('/competencias', portfolioController.paginaCompetencias);


//rotas post,get,delete,put:


//post
router.post('/projetos/add', portfolioController.adicionarProjeto); 


//put
router.put('/apresentacao/update', portfolioController.atualizarApresentacao);


module.exports = router;