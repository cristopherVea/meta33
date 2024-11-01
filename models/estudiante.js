'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Estudiante extends Model {
    static associate(models) {
      Estudiante.belongsToMany(models.Curso, {
        through: 'CursoEstudiantes',
        foreignKey: 'estudianteId',
        otherKey: 'cursoId',
        as: 'cursos'
      });
    }
  }
  
  Estudiante.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    matricula: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false
    },
    semestreIngreso: {
      type: DataTypes.STRING,
      allowNull: false
    },
    creditosCursados: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Estudiante',
    tableName: 'Estudiantes'
  });
  
  return Estudiante;
};