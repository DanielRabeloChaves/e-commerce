import { Request, Response } from "express";
import ModalityService from "../services/ModalityService";
import sequelize  from '../config/dataBase/connection'
import MessageError from "../lang/MessageError";
import MessageSuccess from "../lang/MessageSuccess";
import jwt from 'jsonwebtoken';
import { secretKey } from "../token";

class ModalityController{
    public async getAllModality(req: Request, res: Response): Promise<Response>{
        try{
            const result = await ModalityService.getAll();
            if ('error' in result)
                return res.status(400).json({error: result.error});
            
            if(!result)
                return res.status(404).json({error: await MessageError.NotFoundError('Modalidade')});

            return res.status(200).json(result);    
        }catch(err){
            return res.status(500).json({ error: await MessageError.UnknownError(`${err}`)});
        }
    }

    public async getModalityByID(req: Request, res: Response): Promise<Response>{
        try{
            const id: number = parseInt(req.query.id as string, 10); // 10 - Converte o id para número decimal
            const result = await ModalityService.getModalityByID(id);
            if(!result)
                return res.status(404).json({error: await MessageError.NotFoundError('Modalidade', id)});

            if ('error' in result)
                return res.status(400).json({error: result.error});

            return res.status(200).json(result);    
        }catch(err){
            return res.status(500).json({ error: await MessageError.UnknownError(`${err}`)});
        }
    }

    public async createModality(req: Request, res: Response): Promise<Response>{
        const transaction = await sequelize.transaction();
        try{
            const token = req?.headers?.authorization?.replace(/Bearer /gi, '');
            const decryptToken = jwt.verify(token, secretKey);
            if (decryptToken.type_access_user_name != 'ADMIN')
                return res.status(403).json({error: await MessageError.AccessDenied()});

            const body = req.body;      
            const result = await ModalityService.create(transaction, body)
            if ('error' in result)
                return res.status(400).json({error: result.error});

            if( !result?.id )
                return res.status(400).json({error: await MessageError.ErrorCreated('Modalidade')});
    
            return res.status(200).json({message: await MessageSuccess.SuccessCreated('Modalidade')});
        }catch(err){
            if(transaction) await transaction.rollback();
            return res.status(500).json({ error: await MessageError.UnknownError(`${err}`)});
        }
    }

}

export default new ModalityController();