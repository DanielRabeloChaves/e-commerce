import dotenv from 'dotenv';
dotenv.config();
const ambientDev = process.env.Ambient_Dev;

// Success 
export const SuccessCreated = (name: string):string => `${name} created sucessfully.`;
export const SuccessUpdated = (name: string, id: number):string => `${name} with id ${id} updated sucessfully.`;
export const SuccessDeleted = (name: string, id: number):string => `${name} with id ${id} deleted sucessfully.`;