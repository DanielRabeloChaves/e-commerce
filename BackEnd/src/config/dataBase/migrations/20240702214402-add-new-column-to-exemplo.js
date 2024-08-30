'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('exemplo', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        // unique: true,
        allowNull: false
      },
      idade: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      altura: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      peso: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      empregado: {
        type: Sequelize.TINYINT,
        allowNull: true
      },
      data_nascimento: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
     })

     await queryInterface.bulkInsert('exemplo', [
      {
        name: 'Daniel Rabelo Chaves',
        idade: 24,
        altura: 1.84,
        peso: 75,
        empregado: true,
        data_nascimento: '1999-10-30 00:00:00',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Daniel Chaves',
        idade: 25,
        altura: 1.80,
        peso: 70,
        empregado: true,
        data_nascimento: '1999-10-20 00:00:00',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Daniel Rabelo',
        idade: 26,
        altura: 1.90,
        peso: 86,
        empregado: true,
        data_nascimento: '1999-10-25 00:00:00',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {})

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('exemplo', {})
    await queryInterface.dropTable('exemplo');
  }
};
