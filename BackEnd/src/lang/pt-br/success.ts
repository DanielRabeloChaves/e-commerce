import dotenv from 'dotenv';
dotenv.config();
const ambientDev = process.env.Ambient_Dev;

// Success 
export const SuccessCreated = (name: string):string => `${name} criado com sucesso.`;
export const SuccessUpdated = (name: string, id: number):string => `${name} com id ${id} atualizado com sucesso.`;
export const SuccessDeleted = (name: string, id: number):string => `${name} com id ${id} deletado com sucesso.`;