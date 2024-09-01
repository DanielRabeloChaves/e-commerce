'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('modality', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    cod: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false
    }
   });

   await queryInterface.bulkInsert('modality', [
    {
      name: 'Diário',
      cod: 'DAY',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Semanal',
      cod: 'WEEK',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Quinzenal',
      cod: 'BIWEEKLY',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Mensal',
      cod: 'MONTH',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ])
},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('modality', {})
    await queryInterface.dropTable('modality');
  }
};
