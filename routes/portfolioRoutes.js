
const express = require('express');


const router = express.Router();


const portfolioController = require('../controllers/portfolioControllers');


router.get('/', portfolioController.paginaApresentacao);
router.get('/formacao', portfolioController.paginaFormacao);
router.get('/cursos', portfolioController.paginaCursos);
router.get('/projetos', portfolioController.paginaProjetos);
router.get('/competencias', portfolioController.paginaCompetencias);


//rotas post,delete,put:


//post
router.post('/projetos/add', portfolioController.adicionarProjeto); 
router.post('/formacao/add', portfolioController.adicionarFormacao);
router.post('/cursos/add', portfolioController.adicionarCurso);
router.post('/competencias/add', portfolioController.adicionarCompetencia);


//put
router.put('/apresentacao/update', portfolioController.atualizarApresentacao);


module.exports = router;