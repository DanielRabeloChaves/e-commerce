import { DataTypes } from 'sequelize';

const ModalityAttributes = {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name:{
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    cod:{
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
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

export default ModalityAttributes;