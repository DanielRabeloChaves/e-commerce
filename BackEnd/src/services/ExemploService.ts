import ExemploMethods from "../models/exemploModel/ExemploMethods";
import { IExemplo } from "../interfaces/exemplo/IExemplo";
import { IError } from "../interfaces/IError";
import Exemplo, { ExemploCreationAttributes } from "../models/exemploModel/Exemplo";
import { Transaction } from "sequelize";

class ExemploService{
    public async getAllExemplo(): Promise<IExemplo[] | IError>{
        return await ExemploMethods.getAllExemplos();
    }

    public async getExemploByID(id: number): Promise<IExemplo | IError | null>{
        return await ExemploMethods.getExemploByID(id);
    }

    public async createExemplo(transaction: Transaction, obj: ExemploCreationAttributes): Promise<Exemplo | IError>{
        return await ExemploMethods.createExemplo(transaction, obj);
    }

    public async updateExemploByID(transaction: Transaction, obj: IExemplo): Promise<number | IError>{
        return await ExemploMethods.updateExemploByID(transaction, obj);
    }

    public async deleteExemploByID(transaction: Transaction, id: number): Promise<number | IError>{
        return await ExemploMethods.deleteExemploByID(transaction, id);
    }
}

export default new ExemploService();