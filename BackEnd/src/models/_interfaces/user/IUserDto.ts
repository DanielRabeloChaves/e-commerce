import { ITypeAccessUser } from "../typeAccessUser/ITypeAccessUser";

export interface IUserDto {
    id: number;
    uid: string;
    type_access_user_id: number;
    name: string;
    login: string;
    cpf: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;

    typeAccessUser?: ITypeAccessUser; 
}