import { IModality } from "../modality/IModality";
import { IProduct } from "../product/IProduct";
import { IUser } from "../user/IUser";

export interface ICart {
    id: number;
    user_id: number;
    product_id: number;
    modality_id: number;
    quantity: number;
    value: number;
    promotion: boolean;
    porcent: number;
    rule: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;

    user?: IUser; 
    product?: IProduct; 
    modality?: IModality; 
}