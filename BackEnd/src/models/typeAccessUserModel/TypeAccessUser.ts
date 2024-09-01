import { Model, Optional } from "sequelize";
import sequelize  from '../../config/dataBase/connection'
import { ITypeAccessUser } from "../../interfaces/typeAccessUser/ITypeAccessUser";
import TypeAccessUserAttributes from './TypeAccessUserAttributes'

export interface TypeAccessUserCreationAttributes extends Optional<ITypeAccessUser, 'id' |'createdAt' | 'updatedAt'> {}
export interface TypeAccessUserUpdateAttributes extends Partial<ITypeAccessUser> { id: number; }

class TypeAccessUser extends Model<ITypeAccessUser, TypeAccessUserCreationAttributes> implements ITypeAccessUser{
    public id!: number;
    public name!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

TypeAccessUser.init(TypeAccessUserAttributes, {
      sequelize ,
      tableName: 'typeAccessUser',
      timestamps: true, // Adiciona 'createdAt' e 'updatedAt'
    }
);
  
export default TypeAccessUser;