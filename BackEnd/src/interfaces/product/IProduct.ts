export interface IProduct {
    id: number;
    name: string;
    description: string;
    photo: string;
    value: number;
    promotion: boolean;
    porcent: number;
    rule: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}