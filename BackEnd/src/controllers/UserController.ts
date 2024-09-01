import { Request, Response } from "express";
import UserService from "../services/UserService";
import sequelize  from '../config/dataBase/connection'
import MessageError from "../lang/MessageError";
import MessageSuccess from "../lang/MessageSuccess";
import jwt from 'jsonwebtoken';
import { secretKey } from "../token";

class UserController{

    public async createUser(req: Request, res: Response): Promise<Response>{
        const transaction = await sequelize.transaction();
        try{
            const body = req.body;      
            if(!body.name || !body.login || !body.password || !body.confirm_passowrd)
                return await res.status(400).json({ error: await MessageError.RequiredAllFields()});

            if(body.password != body.confirm_passowrd)
                return await res.status(400).json({ error: await MessageError.ConfirmPassword()});

            const result = await UserService.create(transaction, body)
            if ('error' in result)
                return res.status(400).json({error: result.error});

            if( !result?.id )
                return res.status(400).json({error: await MessageError.ErrorCreated('Usuario')});
    
            return res.status(200).json({message: await MessageSuccess.SuccessCreated('Usuario'), id: result.id});
        }catch(err){
            if(transaction) await transaction.rollback();
            return res.status(500).json({ error: await MessageError.UnknownError(`${err}`)});
        }
    }

    public async getAllUser(req: Request, res: Response): Promise<Response>{
        try{
            const token = req?.headers?.authorization?.replace(/Bearer /gi, '');
            const decryptToken = jwt.verify(token, secretKey);
            if (decryptToken.type_access_user_name != 'ADMIN')
                return res.status(403).json({error: await MessageError.AccessDenied()});
                
            const result = await UserService.getAll();
            if ('error' in result)
                return res.status(400).json({error: result.error});
            if(!result)
                return res.status(404).json({error: await MessageError.NotFoundError('Usuario')});

            return res.status(200).json(result);    
        }catch(err){
            return res.status(500).json({ error: await MessageError.UnknownError(`${err}`)});
        }
    }

    public async getUserByUID(req: Request, res: Response): Promise<Response>{
        try{
            const uid: string | undefined = req.query.uid?.toString();
            if(!uid)
                return res.status(404).json({error: await MessageError.NotFoundUser()});

            const token = req?.headers?.authorization?.replace(/Bearer /gi, '');
            const decryptToken = jwt.verify(token, secretKey);
            if (decryptToken.uid != uid)
                return res.status(403).json({error: await MessageError.AccessDenied()});

            const result = await UserService.getByUID(uid);
            if(!result)
                return res.status(404).json({error: await MessageError.NotFoundUser()});

            if ('error' in result)
                return res.status(400).json({error: result.error});

            return res.status(200).json(result);    
        }catch(err){
            return res.status(500).json({ error: await MessageError.UnknownError(`${err}`)});
        }
    }

    public async authentication(req: Request, res: Response): Promise<Response>{
        const transaction = await sequelize.transaction();
        try{
            const body = req.body; 
            if(!body.login || !body.password)
                return await res.status(400).json({ error: await MessageError.RequiredAllFields()});

            const authentication = await UserService.authentication(transaction, body)
            if ('error' in authentication)
                return res.status(400).json({error: authentication.error});
            else 
                return res.status(200).json(authentication);
        }catch(err){
            if(transaction) await transaction.rollback();
            return res.status(500).json({ error: await MessageError.UnknownError(`${err}`)});
        }
    }

}

export default new UserController();