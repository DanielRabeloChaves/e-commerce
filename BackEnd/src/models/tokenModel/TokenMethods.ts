import { Transaction } from 'sequelize';
import { IToken } from '../../interfaces/token/IToken';
import { IError } from '../../interfaces/IError';
import Token, { TokenCreationAttributes, TokenUpdateAttributes } from './Token';
import MessageError from '../../lang/MessageError';

class TokenMethods{
    public async create(transaction: Transaction, obj: TokenCreationAttributes): Promise<Token | IError>{
        try{
            const result = await Token.create(obj)
            await transaction.commit();
            return result;
        }catch(err){
            await transaction.rollback();
            const error: IError = {error: await MessageError.ErrorExecuteQuery(`${err}`), table: 'Token'};
            return error; 
        }
    }

    public async getLoginToken(token: string, userId: number):  Promise<IToken | IError | null>{
        try{
            const result = await Token.findOne({
                where: {
                  token: token,
                  user_id: userId
                }
            });
            return result;
        }catch(err){
            const error: IError = await {error: await MessageError.ErrorExecuteQuery(`${err}`), table: 'Token'};
            return error; 
        }
    }
    
    public async deleteLoginToken(transaction: Transaction, userId: number): Promise<number | IError>{
        try{
            const result = await Token.destroy({ where: { user_id: userId } })
            await transaction.commit();
            return result;
        }catch(err){
            await transaction.rollback();
            const error: IError = {error: await MessageError.ErrorExecuteQuery(`${err}`), table: 'Token'};
            return error; 
        }
    }
    
}

export default new TokenMethods();