import { Transaction } from 'sequelize';
import { IUser } from '../../interfaces/user/IUser';
import { IError } from '../../interfaces/IError';
import { IUserDto } from '../../interfaces/user/IUserDto'
import User, { UserCreationAttributes, UserUpdateAttributes } from './User';
import MessageError from '../../lang/MessageError';
import TypeAccessUser from '../typeAccessUserModel/TypeAccessUser';

class UserMethods{
    
    public async getByLogin(login: string):  Promise<IUser | IError | null>{
        try{
            const result = await User.findOne({
                where: {
                  login: login,
                },
                include: [{
                    model: TypeAccessUser,
                    as: 'typeAccessUser'
                }]
            });
            return result;
        }catch(err){
            const error: IError = await {error: await MessageError.ErrorExecuteQuery(`${err}`), table: 'User'};
            return error; 
        }
    }

    public async create(transaction: Transaction, obj: UserCreationAttributes): Promise<User | IError>{
        try{
            const result = await User.create(obj)
            await transaction.commit();
            return result;
        }catch(err){
            await transaction.rollback();
            const error: IError = {error: await MessageError.ErrorExecuteQuery(`${err}`), table: 'User'};
            return error; 
        }
    }

    public async getAll(): Promise<IUserDto[] | IError>{
        try{
            const result = await User.findAll({
                attributes: { exclude: ['password'] },
                include: [{
                    model: TypeAccessUser,
                    as: 'typeAccessUser'
                }]
              });
            return result;
        }catch(err){
            const error: IError = {error: await MessageError.ErrorExecuteQuery(`${err}`), table: 'User'};
            return error;
        }
    }

    public async getByUID(uid: string):  Promise<IUserDto | IError | null>{
        try{
            const result = await User.findOne({
                attributes: { exclude: ['password'] },
                where: {
                    uid: uid,
                },
                include: [{
                    model: TypeAccessUser,
                    as: 'typeAccessUser'
                }]
            });
            return result;
        }catch(err){
            const error: IError = await {error: await MessageError.ErrorExecuteQuery(`${err}`), table: 'User'};
            return error; 
        }
    }

}

export default new UserMethods();