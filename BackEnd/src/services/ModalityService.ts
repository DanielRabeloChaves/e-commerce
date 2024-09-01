import { IError } from "../interfaces/IError";
import { Transaction } from "sequelize";
import Modality, { ModalityCreationAttributes } from "../models/modalityModel/Modality";
import { IModality } from "../interfaces/modality/IModality";
import ModalityMethods from "../models/modalityModel/ModalityMethods";
import MessageError from "../lang/MessageError";

class ModalityService{
    public async getAll(): Promise<IModality[] | IError>{
        return await ModalityMethods.getAll();
    }

    public async getModalityByID(id: number): Promise<IModality | IError | null>{
        return await ModalityMethods.getByID(id);
    }

    public async create(transaction: Transaction, obj: ModalityCreationAttributes): Promise<Modality | IError>{
        const verifyExist = await ModalityMethods.getByCod(obj.cod);
        if(verifyExist)
            return { error: await MessageError.NotFoundError(obj.cod), table: 'Modality' };

        obj.active = true;
        const result = await ModalityMethods.create(transaction, obj)
        return result;
    }
}

export default new ModalityService();