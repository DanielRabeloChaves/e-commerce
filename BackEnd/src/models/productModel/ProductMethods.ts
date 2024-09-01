import { Transaction } from 'sequelize';
import { IProduct } from '../../interfaces/product/IProduct';
import { IError } from '../../interfaces/IError';
import Product, { ProductCreationAttributes, ProductUpdateAttributes } from './Product';
import MessageError from '../../lang/MessageError';

class ProductMethods{
    public async create(transaction: Transaction, obj: ProductCreationAttributes): Promise<Product | IError>{
        try{
            const result = await Product.create(obj)
            await transaction.commit();
            return result;
        }catch(err){
            await transaction.rollback();
            const error: IError = {error: await MessageError.ErrorExecuteQuery(`${err}`), table: 'Product'};
            return error; 
        }
    }

    public async getAll(): Promise<IProduct[] | IError>{
        try{
            const result = await Product.findAll({
                where: { active: true }
              });
            return result;
        }catch(err){
            const error: IError = {error: await MessageError.ErrorExecuteQuery(`${err}`), table: 'Product'};
            return error;
        }
    }

    public async getByID(id: number):  Promise<IProduct | IError | null>{
        try{
            const result = await Product.findOne({
                where: { id: id }
            });
            return result;
        }catch(err){
            const error: IError = await {error: await MessageError.ErrorExecuteQuery(`${err}`), table: 'Product'};
            return error; 
        }
    }

}

export default new ProductMethods();