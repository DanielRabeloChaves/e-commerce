import { DataTypes } from 'sequelize';

const CartAttributes = {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    product_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'product',
            key: 'id'
        }
    },
    modality_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'modality',
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    promotion: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    porcent: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    rule: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
}

export default CartAttributes;