import { Transaction } from 'sequelize';
import { IModality } from '../../interfaces/modality/IModality';
import { IError } from '../../interfaces/IError';
import Modality, { ModalityCreationAttributes, ModalityUpdateAttributes } from './Modality';
import MessageError from '../../lang/MessageError';

class ModalityMethods{
    public async create(transaction: Transaction, obj: ModalityCreationAttributes): Promise<Modality | IError>{
        try{
            const result = await Modality.create(obj)
            await transaction.commit();
            return result;
        }catch(err){
            await transaction.rollback();
            const error: IError = {error: await MessageError.ErrorExecuteQuery(`${err}`), table: 'Modality'};
            return error; 
        }
    }

    public async getAll(): Promise<IModality[] | IError>{
        try{
            const result = await Modality.findAll({
                where: { active: true }
              });
            return result;
        }catch(err){
            const error: IError = {error: await MessageError.ErrorExecuteQuery(`${err}`), table: 'Modality'};
            return error;
        }
    }

    public async getByID(id: number):  Promise<IModality | IError | null>{
        try{
            const result = await Modality.findOne({
                where: { id: id }
            });
            return result;
        }catch(err){
            const error: IError = await {error: await MessageError.ErrorExecuteQuery(`${err}`), table: 'Modality'};
            return error; 
        }
    }

}

export default new ModalityMethods();