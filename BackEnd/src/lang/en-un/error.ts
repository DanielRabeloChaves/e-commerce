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

export const RequiredAllFields = ():string => `You need to fill in all fields.`;
export const ConfirmPassword = ():string => `New Password and Confirm New Password must be in the same format.`;
export const InvalidPassword = ():string => `Password in the wrong format. It must contain at least 8 characters, uppercase, lowercase and numeric.`;
export const InvalidEmail = ():string => `Invalid email provided.`;
export const EmailInUse = ():string => `Email provided is already in use.`
export const NotFoundUser = ():string => `User not found.`;
export const InvalidAccess = ():string => `Invalid access.`;

export const RequiredLoginToken = ():string => `It is necessary to inform the token.`;
export const DeleteToken = ():string => `Error deleting Token.`;
export const InvalidToken = ():string => `Invalid token.`;
export const ExpiredToken = ():string => `Expired access token.`;

export const SendEmail = ():string => `Error send email.`;

export const AccessDenied = ():string => `Access denied.`;