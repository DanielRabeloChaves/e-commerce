import { Model, Optional } from "sequelize";
import sequelize  from '../../config/dataBase/connection'
import { ICart } from "../_interfaces/cart/ICart";
import CartAttributes from './CartAttributes'
import Modality from "../modalityModel/Modality";
import User from "../userModel/User";
import Product from "../productModel/Product";

export interface CartCreationAttributes extends Optional<ICart, 'id' | 'rule' | 'porcent' | 'createdAt' | 'updatedAt'> {}
export interface CartUpdateAttributes extends Partial<ICart> { id: number; }

class Cart extends Model<ICart, CartCreationAttributes> implements ICart{
    public id!: number;
    public user_id!: number;
    public product_id!: number;
    public modality_id!: number;
    public quantity!: number;
    public value!: number;
    public promotion!: boolean;
    public porcent!: number;
    public rule!: string;
    public active!: boolean;
    public createdAt!: Date;
    public updatedAt!: Date;

    public readonly user?: User; 
    public readonly product?: Product; 
    public readonly modality?: Modality; 
}

Cart.init(CartAttributes, {
      sequelize ,
      tableName: 'cart',
      timestamps: true, // Adiciona 'createdAt' e 'updatedAt'
    }
);

User.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

User.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'product'
});

User.belongsTo(Modality, {
    foreignKey: 'modality_id',
    as: 'modality'
});

export default Cart;