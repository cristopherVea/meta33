'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Curso extends Model {
    static associate(models) {
      // Definir asociaciones aquí
      Curso.belongsToMany(models.Estudiante, {
        through: 'CursoEstudiantes',
        foreignKey: 'cursoId',
        otherKey: 'estudianteId',
        as: 'estudiantes'
      });
      
      Curso.belongsToMany(models.Profesor, {
        through: 'CursoProfesores',
        foreignKey: 'cursoId',
        otherKey: 'profesorId',
        as: 'profesores'
      });
    }
  }
  
  Curso.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Curso',
    tableName: 'Cursos'
  });
  
  return Curso;
};