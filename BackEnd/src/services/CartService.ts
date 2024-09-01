import { IError } from "../interfaces/IError";
import { Transaction } from "sequelize";
import Cart, { CartCreationAttributes } from "../models/cartModel/Cart";
import { ICart } from "../interfaces/cart/ICart";
import CartMethods from "../models/cartModel/CartMethods";
import MessageError from "../lang/MessageError";
import UserMethods from "../models/userModel/UserMethods";
import ProductMethods from "../models/productModel/ProductMethods";
import ModalityMethods from "../models/modalityModel/ModalityMethods";

class CartService{
    public async getAll(): Promise<ICart[] | IError>{
        return await CartMethods.getAll();
    }

    public async getAllByUID(uid: string): Promise<ICart[] | IError>{
        const result = await CartMethods.getAllByUID(uid);
        if(!result || 'error' in result || result.length == 0)
            return { error: await MessageError.NotFoundCart(), table: 'Cart' };

        return result;
    }

    public async getCartByID(id: number): Promise<ICart | IError | null>{
        return await CartMethods.getByID(id);
    }

    public async create(transaction: Transaction, obj: CartCreationAttributes): Promise<Cart | IError>{
        const verifyExistUser = await UserMethods.getByID(obj.user_id);
        if(!verifyExistUser)
            return { error: await MessageError.NotFoundUser(), table: 'User' };

        const verifyExistProduct = await ProductMethods.getByID(obj.product_id);
        if(!verifyExistProduct)
            return { error: await MessageError.NotFoundError('Produto', obj.product_id), table: 'Product' };

        const verifyExistModality = await ModalityMethods.getByID(obj.modality_id);
        if(!verifyExistModality)
            return { error: await MessageError.NotFoundError('Modalidade', obj.modality_id), table: 'Modality' };

        obj.active = true;
        return await CartMethods.create(transaction, obj);
    }
}

export default new CartService();