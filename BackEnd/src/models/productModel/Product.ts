import { Model, Optional } from "sequelize";
import sequelize  from '../../config/dataBase/connection'
import { IProduct } from "../_interfaces/product/IProduct";
import ProductAttributes from './ProductAttributes'

export interface ProductCreationAttributes extends Optional<IProduct, 'id' | 'photo' | 'rule' | 'porcent' |'createdAt' | 'updatedAt'> {}
export interface ProductUpdateAttributes extends Partial<IProduct> { id: number; }

class Product extends Model<IProduct, ProductCreationAttributes> implements IProduct{
    public id!: number;
    public name!: string;
    public description!: string;
    public photo!: string;
    public value!: number;
    public promotion!: boolean;
    public porcent!: number;
    public rule!: string;
    public active!: boolean;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Product.init(ProductAttributes, {
      sequelize ,
      tableName: 'product',
      timestamps: true, // Adiciona 'createdAt' e 'updatedAt'
    }
);

export default Product;