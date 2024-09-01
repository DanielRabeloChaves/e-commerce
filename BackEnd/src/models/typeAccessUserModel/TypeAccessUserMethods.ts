import { Transaction } from 'sequelize';
import { ITypeAccessUser } from '../_interfaces/typeAccessUser/ITypeAccessUser';
import { IError } from '../_interfaces/IError';
import TypeAccessUser, { TypeAccessUserCreationAttributes, TypeAccessUserUpdateAttributes } from './TypeAccessUser';
import MessageError from '../../lang/MessageError';

class TypeAccessUserMethods{
    
    public async getAll(): Promise<ITypeAccessUser[] | IError>{
        try{
            const result = await TypeAccessUser.findAll();
            return result;
        }catch(err){
            const error: IError = {error: await MessageError.ErrorExecuteQuery(`${err}`), table: 'TypeAccessUser'};
            return error;
        }
    }

    public async getTypeAccessUserByID(id: number): Promise<ITypeAccessUser | IError | null>{
        try{
            const result = await TypeAccessUser.findByPk(id);
            return result;
        }catch(err){
            const error: IError = await {error: await MessageError.ErrorExecuteQuery(`${err}`), table: 'TypeAccessUser'};
            return error; 
        }
    }

}

export default new TypeAccessUserMethods();