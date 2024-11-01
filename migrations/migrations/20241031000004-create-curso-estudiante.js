'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CursoEstudiantes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cursoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cursos',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      estudianteId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Estudiantes',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Añadir índices después de crear la tabla
    await queryInterface.addIndex('CursoEstudiantes', ['cursoId']);
    await queryInterface.addIndex('CursoEstudiantes', ['estudianteId']);
    await queryInterface.addIndex('CursoEstudiantes', ['cursoId', 'estudianteId'], {
      unique: true
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CursoEstudiantes');
  }
};