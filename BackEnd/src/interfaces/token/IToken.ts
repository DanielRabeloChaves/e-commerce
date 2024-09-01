export interface IToken {
    id: number;
    user_id: number;
    login: string;
    token: string;
    expired_date: Date;
    createdAt: Date;
    updatedAt: Date;
}