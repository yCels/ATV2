
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
router.put('/projetos/update/:id', portfolioController.atualizarProjeto);
router.put('/formacao/update/:id', portfolioController.atualizarFormacao);
router.put('/cursos/update/:id', portfolioController.atualizarCurso);
router.put('/competencias/update', portfolioController.atualizarCompetencia);


//delete
router.delete('/projetos/delete/:id', portfolioController.deletarProjeto);
router.delete('/formacao/delete/:id', portfolioController.deletarFormacao);
router.delete('/cursos/delete/:id', portfolioController.deletarCurso);

//esperar o 'tipo' e 'nome' no body,

router.delete('/competencias/delete', portfolioController.deletarCompetencia);


module.exports = router;