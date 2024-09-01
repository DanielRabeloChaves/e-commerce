import UserMethods from "../models/userModel/UserMethods";
import TokenMethods from "../models/tokenModel/TokenMethods";
import { IUser } from "../models/_interfaces/user/IUser";
import { IUserDto } from "../models/_interfaces/user/IUserDto";
import { IUserAuthenticationDto } from "../models/_interfaces/user/IUserAuthenticationDto";
import { IError } from "../models/_interfaces/IError";
import User, { UserCreationAttributes } from "../models/userModel/User";

import SecurityHelpers from "../helpers/SecurityHelpers";
import VerifyHelpers from "../helpers/VerifyHelpers";
import MessageError from "../lang/MessageError";
import MessageSuccess from "../lang/MessageSuccess";
import TemplateEmail from "../lang/TemplateEmail";
import { sendEmail } from "../config/Email/email"

import { Transaction } from "sequelize";
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { secretKey } from "../token";
import { IAuthentication } from "../models/_interfaces/user/IAuthentication";


class UserService{
    public async create(transaction: Transaction, obj: UserCreationAttributes): Promise<User | IError>{
        const verifyPassword = await SecurityHelpers.verifyPassword(obj.password);
        if(!verifyPassword)
            return {error: await MessageError.InvalidPassword(), table: 'User'};

        const verifyValidEmail = await VerifyHelpers.Email(obj.login);
        if(!verifyValidEmail)
            return { error: await MessageError.InvalidEmail(), table: 'User' };
        
        const verifyExistUser = await UserMethods.getByLogin(obj.login);
        if(verifyExistUser)
            return { error: await MessageError.EmailInUse(), table: 'User' };

        const hashedPassword = await bcrypt.hash(obj.password, 10);
        obj.password = hashedPassword;
        obj.uid = uuidv4();
        obj.type_access_user_id = 2;
        return await UserMethods.create(transaction, obj);
    }

    public async getAll(): Promise<IUserDto[] | IError>{
        return await UserMethods.getAll();
    }

    public async getByUID(uid: string): Promise<IUserDto | IError | null>{
        return await UserMethods.getByUID(uid);
    }

    public async getByLogin(login: string): Promise<IUser | IError | null>{
        return await UserMethods.getByLogin(login);
    }

    public async authentication(transaction: Transaction, obj: IUserAuthenticationDto): Promise<IAuthentication | IError>{
        const user = await UserMethods.getByLogin(obj.login);
        if(!user || 'error' in user)
            return { error: await MessageError.InvalidAccess(), table: 'User' };

        const isPasswordCorrect = await bcrypt.compare(obj.password, user.password);
        if(isPasswordCorrect == false)
            return { error: await MessageError.InvalidAccess(), table: 'User' };

        if(!obj.loginToken){
            const LoginToken = await SecurityHelpers.generateTokenLogin(5);
            const now = new Date();
            const expiredDate = new Date(now.getTime() + 15 * 60000); // 15 minutos
            const dataToken = {
                user_id: user.id,
                login: user.login,
                token: LoginToken,
                expired_date: expiredDate 
            };

            const insertTokenDB = await TokenMethods.create(transaction, dataToken);
            if ('error' in insertTokenDB)
                return { error: insertTokenDB.error, table: 'Token' };

            if( !insertTokenDB?.id )
                return {error: await MessageError.ErrorCreated('Token'), table: 'Token'};

            const dataEmail = {
              to: user.login,
              subject: await TemplateEmail.subjectTokenLogin(),
              html: await TemplateEmail.bodyTokenLogin(user.name, user.login, LoginToken),
            }
            const resultSendEmail = sendEmail(dataEmail);
            return {message: await MessageSuccess.SendToken(), JWT: '', status: "SendEmail"};
          }

          const verifyToken = await TokenMethods.getLoginToken(obj.loginToken, user.id);
          const deleteToken = await TokenMethods.deleteLoginToken(transaction, user.id)
          if (typeof deleteToken === 'object' && 'error' in deleteToken ) 
            return { error: await MessageError.InvalidToken(), table: 'Token' };

          if( deleteToken == undefined || deleteToken == 0)
            return { error: await MessageError.InvalidToken(), table: 'Token' };
    
          if (!verifyToken || 'error' in verifyToken)
             return { error: await MessageError.InvalidToken(), table: 'Token' };
  
          const expiration_token = new Date(verifyToken.expired_date);
          const today = new Date();
          
          if(today > expiration_token)
            return { error: await MessageError.ExpiredToken(), table: 'Token' };
          
          const dataUser = {
              uid: user.uid,
              name: user.name,
              type_access_user_id: user.type_access_user_id,
              type_access_user_name: user.typeAccessUser?.name,
          };
          const token = jwt.sign(dataUser, secretKey, { expiresIn: '8h' });
          return {message :await MessageSuccess.Login(), JWT: token, status: "Success"};
    }

}

export default new UserService();