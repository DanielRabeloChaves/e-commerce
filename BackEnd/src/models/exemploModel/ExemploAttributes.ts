import { DataTypes } from 'sequelize';

const ExemploAttributes = {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    idade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    altura: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    peso: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    empregado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    data_nascimento: {
      type: DataTypes.DATE,
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

export default ExemploAttributes;