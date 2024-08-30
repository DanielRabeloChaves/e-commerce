import dotenv from 'dotenv';
dotenv.config();
const ambientDev = process.env.Ambient_Dev;

// Error 
export const UnknownError = (detail?: string):string => `Unknown error.${ambientDev ? ' Detail: ' + detail: ''}`;
export const NotFoundError = (name: string, id?: number):string => `${name} ${id ? id + ' ' : ''}not found.`;
export const ErrorCreated = (name: string):string => `${name} can't created.`;
export const ErrorUpdated = (name: string, id: number):string => `${name} with id ${id} can't updated.`;
export const ErrorDeleted = (name: string, id: number):string => `${name} with id ${id} can't deleted.`;
export const ErrorExecuteQuery = (detail?: string):string => `Error executing command on database.${ambientDev ? ' Detail: ' + detail: ''}`;
export const ErrorRateLimit = (defaultLimit?: number, timeWaitMinutes?: number): string => `You have reached the maximum limit of ${defaultLimit} requests. Please try again in ${timeWaitMinutes || 15} minutes.`;
