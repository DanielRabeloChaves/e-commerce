import { Transaction } from 'sequelize';
import { ICart } from '../../interfaces/cart/ICart';
import { IError } from '../../interfaces/IError';
import Cart, { CartCreationAttributes, CartUpdateAttributes } from './Cart';
import MessageError from '../../lang/MessageError';
import User from '../userModel/User';
import Product from '../productModel/Product';
import Modality from '../modalityModel/Modality';

class CartMethods{
    
    public async getByID(id: number):  Promise<ICart | IError | null>{
        try{
            const result = await Cart.findOne({
                where: {
                  id: id,
                },
                include: [{model: User, as: 'user', attributes: { exclude: ['password'] }},
                    {model: Product, as: 'product'},
                    {model: Modality, as: 'modality'},
                ]
            });
            return result;
        }catch(err){
            const error: IError = await {error: await MessageError.ErrorExecuteQuery(`${err}`), table: 'Cart'};
            return error; 
        }
    }

    public async create(transaction: Transaction, obj: CartCreationAttributes): Promise<Cart | IError>{
        try{
            const result = await Cart.create(obj)
            await transaction.commit();
            return result;
        }catch(err){
            await transaction.rollback();
            const error: IError = {error: await MessageError.ErrorExecuteQuery(`${err}`), table: 'Cart'};
            return error; 
        }
    }

    public async getAll(): Promise<ICart[] | IError>{
        try{
            const result = await Cart.findAll({
                include: [{model: User, as: 'user', attributes: { exclude: ['password'] }},
                    {model: Product, as: 'product'},
                    {model: Modality, as: 'modality'},
                ]
              });
            return result;
        }catch(err){
            const error: IError = {error: await MessageError.ErrorExecuteQuery(`${err}`), table: 'Cart'};
            return error;
        }
    }

    public async getAllByUID(uid: string):  Promise<ICart[] | IError | null>{
        try{
            const result = await Cart.findAll({
                include: [{model: User, as: 'user',  where: { uid: uid }, attributes: { exclude: ['password'] },},
                    {model: Product, as: 'product'},
                    {model: Modality, as: 'modality'},
                ]
            });
            return result;
        }catch(err){
            const error: IError = await {error: await MessageError.ErrorExecuteQuery(`${err}`), table: 'Cart'};
            return error; 
        }
    }
    
}

export default new CartMethods();