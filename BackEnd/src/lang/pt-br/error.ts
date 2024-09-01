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

export const RequiredAllFields = ():string => `Necessario preencher todos os campos.`;
export const ConfirmPassword = ():string => `Nova Senha e Confirma Nova Senha devem estar no mesmo formato.`;
export const InvalidPassword = ():string => `Senha no formato incorreto. Deve contem no minimo 8 caracteres, maiusculas, minusculas e numericos.`;
export const InvalidEmail = ():string => `Email fornecido inválido.`;
export const EmailInUse = ():string => `Email fornecido ja esta em uso.`;
export const NotFoundUser = ():string => `Usuario nao encontrado`;
export const InvalidAccess = ():string => `Acesso inválido.`;

export const RequiredLoginToken = ():string => `Necessario informar o token.`;
export const DeleteToken = ():string => `Erro ao deletar Token.`;
export const InvalidToken = ():string => `Token inválido.`;
export const ExpiredToken = ():string => `Token de acesso expirado.`;

export const SendEmail = ():string => `Erro ao enviar email.`;

export const AccessDenied = ():string => `Acesso negado.`;