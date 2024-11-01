const { Estudiante, Curso } = require('../models');

exports.getAllEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.findAll({
      include: [{
        model: Curso,
        as: 'cursos'
      }]
    });
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id, {
      include: [{
        model: Curso,
        as: 'cursos'
      }]
    });
    if (estudiante) {
      res.json(estudiante);
    } else {
      res.status(404).json({ error: 'Estudiante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createEstudiante = async (req, res) => {
  try {
    const nuevoEstudiante = await Estudiante.create(req.body);
    res.status(201).json(nuevoEstudiante);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id);
    if (estudiante) {
      await estudiante.update(req.body);
      res.json(estudiante);
    } else {
      res.status(404).json({ error: 'Estudiante no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id);
    if (estudiante) {
      await estudiante.destroy();
      res.json({ mensaje: 'Estudiante eliminado con éxito' });
    } else {
      res.status(404).json({ error: 'Estudiante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.inscribirEnCurso = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id);
    const curso = await Curso.findByPk(req.params.cursoId);

    if (!estudiante || !curso) {
      return res.status(404).json({ error: 'Estudiante o curso no encontrado' });
    }

    await estudiante.addCurso(curso);
    res.json({ mensaje: 'Estudiante inscrito en el curso con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarDeCurso = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id);
    const curso = await Curso.findByPk(req.params.cursoId);

    if (!estudiante || !curso) {
      return res.status(404).json({ error: 'Estudiante o curso no encontrado' });
    }

    await estudiante.removeCurso(curso);
    res.json({ mensaje: 'Estudiante eliminado del curso con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCursosEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id, {
      include: [{
        model: Curso,
        as: 'cursos'
      }]
    });
    
    if (!estudiante) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    res.json(estudiante.cursos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};