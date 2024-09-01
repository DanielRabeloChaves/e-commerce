import { DataTypes } from 'sequelize';

const ProductAttributes = {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name:{
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    photo: {
        type: DataTypes.STRING(255),
        allowNull: true,
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
        type: DataTypes.STRING,
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

export default ProductAttributes;