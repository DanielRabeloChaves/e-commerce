import { DataTypes } from 'sequelize';

const UserAttributes = {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    uid:{
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
    },
    type_access_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'typeAccessUser',
          key: 'id'
        }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    login: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    cpf: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING(255),
        allowNull: true,
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

export default UserAttributes;