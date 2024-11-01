const { Curso, Estudiante, Profesor } = require('../models');

exports.getAllCursos = async (req, res) => {
  try {
    const cursos = await Curso.findAll({
      include: [
        {
          model: Estudiante,
          as: 'estudiantes'
        },
        {
          model: Profesor,
          as: 'profesores'
        }
      ]
    });
    res.json(cursos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCurso = async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.id, {
      include: [
        {
          model: Estudiante,
          as: 'estudiantes'
        },
        {
          model: Profesor,
          as: 'profesores'
        }
      ]
    });
    if (curso) {
      res.json(curso);
    } else {
      res.status(404).json({ error: 'Curso no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCurso = async (req, res) => {
  try {
    const nuevoCurso = await Curso.create(req.body);
    res.status(201).json(nuevoCurso);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCurso = async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.id);
    if (curso) {
      await curso.update(req.body);
      res.json(curso);
    } else {
      res.status(404).json({ error: 'Curso no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCurso = async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.id);
    if (curso) {
      await curso.destroy();
      res.json({ mensaje: 'Curso eliminado con éxito' });
    } else {
      res.status(404).json({ error: 'Curso no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};