import { Model, Optional } from "sequelize";
import sequelize  from '../../config/dataBase/connection'
import { IToken } from "../_interfaces/token/IToken";
import TokenAttributes from './TokenAttributes'

export interface TokenCreationAttributes extends Optional<IToken, 'id' | 'createdAt' | 'updatedAt'> {}
export interface TokenUpdateAttributes extends Partial<IToken> { id: number; }

class Token extends Model<IToken, TokenCreationAttributes> implements IToken{
    public id!: number;
    public user_id!: number;
    public login!: string;
    public token!: string;
    public expired_date!: Date;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Token.init(TokenAttributes, {
      sequelize ,
      tableName: 'token',
      timestamps: true, // Adiciona 'createdAt' e 'updatedAt'
    }
  );
  
  export default Token;