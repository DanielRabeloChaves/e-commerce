'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('product', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name:{
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    description:{
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    photo: {
        type: Sequelize.STRING(255),
        allowNull: true,
    },
    value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
    },
    promotion: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    porcent: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: true,
    },
    rule: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
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

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('product');
  }
};
