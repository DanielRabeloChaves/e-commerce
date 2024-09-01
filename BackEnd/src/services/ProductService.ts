import { IError } from "../interfaces/IError";
import { Transaction } from "sequelize";
import Product, { ProductCreationAttributes } from "../models/productModel/Product";
import { IProduct } from "../interfaces/product/IProduct";
import ProductMethods from "../models/productModel/ProductMethods";
import MessageError from "../lang/MessageError";

class ProductService{
    public async getAll(): Promise<IProduct[] | IError>{
        return await ProductMethods.getAll();
    }

    public async getProductByID(id: number): Promise<IProduct | IError | null>{
        return await ProductMethods.getByID(id);
    }

    public async create(transaction: Transaction, obj: ProductCreationAttributes): Promise<Product | IError>{
        obj.active = true;
        return await ProductMethods.create(transaction, obj);
    }
}

export default new ProductService();