interface IProductListDto {
    id: number;
    name: string;
    description: string;
    photo: string | null;
    value: string;
    promotion: boolean;
    porcent: number | null;
    rule: string | null;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

export default IProductListDto;