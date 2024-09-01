'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

   await queryInterface.createTable('cart', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_id:{
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
          model: 'user',
          key: 'id'
        }
    },
    product_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'product',
            key: 'id'
        }
    },
    modality_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'modality',
            key: 'id'
        }
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
        type: Sequelize.STRING(255),
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
    await queryInterface.dropTable('cart');
  }
};
