const express = require('express');
const router = express.Router();

const estudiantesRouter = require('./estudiantes');
const profesoresRouter = require('./profesores');
const cursosRouter = require('./cursos');

router.use('/estudiantes', estudiantesRouter);
router.use('/profesores', profesoresRouter);
router.use('/cursos', cursosRouter);

module.exports = router;