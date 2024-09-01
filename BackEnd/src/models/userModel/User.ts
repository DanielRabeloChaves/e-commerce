import { Model, Optional } from "sequelize";
import sequelize  from '../../config/dataBase/connection'
import { IUser } from "../_interfaces/user/IUser";
import UserAttributes from './UserAttributes'
import TypeAccessUser from "../typeAccessUserModel/TypeAccessUser";

export interface UserCreationAttributes extends Optional<IUser, 'id' | 'cpf' | 'phone' | 'createdAt' | 'updatedAt'> {}
export interface UserUpdateAttributes extends Partial<IUser> { uid: string; }

class User extends Model<IUser, UserCreationAttributes> implements IUser{
    public id!: number;
    public uid!: string;
    public type_access_user_id!: number;
    public name!: string;
    public login!: string;
    public password!: string;
    public cpf!: string;
    public phone!: string;
    public createdAt!: Date;
    public updatedAt!: Date;

    public readonly typeAccessUser?: TypeAccessUser; 
}

User.init(UserAttributes, {
      sequelize ,
      tableName: 'user',
      timestamps: true, // Adiciona 'createdAt' e 'updatedAt'
    }
);

User.belongsTo(TypeAccessUser, {
  foreignKey: 'type_access_user_id',
  as: 'typeAccessUser'
});

export default User;