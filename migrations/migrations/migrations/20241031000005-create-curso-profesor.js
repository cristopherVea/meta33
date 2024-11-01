'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CursoProfesores', {
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
        onDelete: 'CASCADE'
      },
      profesorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Profesores',
          key: 'id'
        },
        onDelete: 'CASCADE'
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CursoProfesores');
  }
};