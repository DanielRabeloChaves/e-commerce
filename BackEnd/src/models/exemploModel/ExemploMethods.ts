import { Transaction } from 'sequelize';
import { IExemplo } from '../../interfaces/exemplo/IExemplo';
import { IError } from '../../interfaces/IError';
import Exemplo, { ExemploCreationAttributes, ExemploUpdateAttributes } from './Exemplo';
import MessageError from '../../lang/MessageError';

class ExemploMethods{
    public async getAllExemplos(): Promise<IExemplo[] | IError>{
        try{
            const result = await Exemplo.findAll();
            return result;
        }catch(err){
            const error: IError = {error: await MessageError.ErrorExecuteQuery(`${err}`), table: 'Exemplo'};
            return error;
        }
    }

    public async getExemploByID(id: number): Promise<IExemplo | IError | null>{
        try{
            const result = await Exemplo.findByPk(id);
            return result;
        }catch(err){
            const error: IError = await {error: await MessageError.ErrorExecuteQuery(`${err}`), table: 'Exemplo'};
            return error; 
        }
    }

    public async createExemplo(transaction: Transaction, obj: ExemploCreationAttributes): Promise<Exemplo | IError>{
        try{
            const result = await Exemplo.create(obj)
            await transaction.commit();
            return result;
        }catch(err){
            await transaction.rollback();
            const error: IError = {error: await MessageError.ErrorExecuteQuery(`${err}`), table: 'Exemplo'};
            return error; 
        }
    }

    public async updateExemploByID(transaction: Transaction, obj: ExemploUpdateAttributes): Promise<number | IError>{
        try{
            const [numberOfAffectedRows] = await Exemplo.update(obj, { where: { id: obj.id } })
            await transaction.commit();
            return numberOfAffectedRows;
        }catch(err){
            await transaction.rollback();
            const error: IError = {error: await MessageError.ErrorExecuteQuery(`${err}`), table: 'Exemplo'};
            return error; 
        }
    }

    public async deleteExemploByID(transaction: Transaction, id: number): Promise<number | IError>{
        try{
            const result = await Exemplo.destroy({ where: { id: id } })
            await transaction.commit();
            return result;
        }catch(err){
            await transaction.rollback();
            const error: IError = {error: await MessageError.ErrorExecuteQuery(`${err}`), table: 'Exemplo'};
            return error; 
        }
    }
    
}

export default new ExemploMethods();