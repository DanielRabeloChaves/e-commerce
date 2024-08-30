import dotenv from 'dotenv';
dotenv.config();
const ambientDev = process.env.Ambient_Dev;

// Error 
export const UnknownError = (detail?: string):string => `Erro desconhecido.${ambientDev ? ' Detail: ' + detail: ''}`;
export const NotFoundError = (name: string, id?: number):string => `${name} ${id ? id + ' ' : ''}não encontrado.`;
export const ErrorCreated = (name: string):string => `${name} não pode ser criado.`;
export const ErrorUpdated = (name: string, id: number):string => `${name} com id ${id} não pode ser atualizado.`;
export const ErrorDeleted = (name: string, id: number):string => `${name} com id ${id} não pode ser deletado.`;
export const ErrorExecuteQuery = (detail?: string):string => `Erro ao executar comando no banco de dados.${ambientDev ? ' Detail: ' + detail: ''}`;
export const ErrorRateLimit = (defaultLimit?: number, timeWaitMinutes?: number): string => `Voce chegou no limite maximo de ${defaultLimit} requisições. Tente novamente em ${timeWaitMinutes || 15} minutos.`;
