import { DataTypes } from 'sequelize';

const TokenAttributes = {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: false,
    },
    login: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    expired_date: {
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

export default TokenAttributes;