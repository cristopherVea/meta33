const { Profesor, Curso } = require('../models');

exports.getAllProfesores = async (req, res) => {
  try {
    const profesores = await Profesor.findAll({
      include: [{
        model: Curso,
        as: 'cursos'
      }]
    });
    res.json(profesores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProfesor = async (req, res) => {
  try {
    const profesor = await Profesor.findByPk(req.params.id, {
      include: [{
        model: Curso,
        as: 'cursos'
      }]
    });
    if (profesor) {
      res.json(profesor);
    } else {
      res.status(404).json({ error: 'Profesor no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProfesor = async (req, res) => {
  try {
    const nuevoProfesor = await Profesor.create(req.body);
    res.status(201).json(nuevoProfesor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProfesor = async (req, res) => {
  try {
    const profesor = await Profesor.findByPk(req.params.id);
    if (profesor) {
      await profesor.update(req.body);
      res.json(profesor);
    } else {
      res.status(404).json({ error: 'Profesor no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProfesor = async (req, res) => {
  try {
    const profesor = await Profesor.findByPk(req.params.id);
    if (profesor) {
      await profesor.destroy();
      res.json({ mensaje: 'Profesor eliminado con éxito' });
    } else {
      res.status(404).json({ error: 'Profesor no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.asociarACurso = async (req, res) => {
  try {
    const profesor = await Profesor.findByPk(req.params.id);
    const curso = await Curso.findByPk(req.params.cursoId);

    if (!profesor || !curso) {
      return res.status(404).json({ error: 'Profesor o curso no encontrado' });
    }

    await profesor.addCurso(curso);
    res.json({ mensaje: 'Profesor asociado al curso con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarDeCurso = async (req, res) => {
  try {
    const profesor = await Profesor.findByPk(req.params.id);
    const curso = await Curso.findByPk(req.params.cursoId);

    if (!profesor || !curso) {
      return res.status(404).json({ error: 'Profesor o curso no encontrado' });
    }

    await profesor.removeCurso(curso);
    res.json({ mensaje: 'Profesor eliminado del curso con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCursosProfesor = async (req, res) => {
  try {
    const profesor = await Profesor.findByPk(req.params.id, {
      include: [{
        model: Curso,
        as: 'cursos'
      }]
    });
    
    if (!profesor) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    res.json(profesor.cursos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};