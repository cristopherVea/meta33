'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Profesor extends Model {
    static associate(models) {
      Profesor.belongsToMany(models.Curso, {
        through: 'CursoProfesores',
        foreignKey: 'profesorId',
        otherKey: 'cursoId',
        as: 'cursos'
      });
    }
  }
  
  Profesor.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Profesor',
    tableName: 'Profesores'
  });
  
  return Profesor;
};