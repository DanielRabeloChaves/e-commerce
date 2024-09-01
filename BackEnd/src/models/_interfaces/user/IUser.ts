import { ITypeAccessUser } from "../typeAccessUser/ITypeAccessUser";

export interface IUser {
    id: number;
    uid: string;
    type_access_user_id: number;
    name: string;
    login: string;
    password: string;
    cpf: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;

    typeAccessUser?: ITypeAccessUser; 
}