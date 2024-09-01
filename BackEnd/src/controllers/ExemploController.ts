import { Request, Response } from "express";
import ExemploService from "../services/ExemploService";
import sequelize  from '../config/dataBase/connection'
import MessageError from "../lang/MessageError";
import MessageSuccess from "../lang/MessageSuccess";

class ExemploController{
    public async getAllExemplo(req: Request, res: Response): Promise<Response>{
        try{
            const result = await ExemploService.getAllExemplo();
            if ('error' in result)
                return res.status(400).json({error: result.error});
            if(!result)
                return res.status(404).json({error: await MessageError.NotFoundError('Exemplo')});

            return res.status(200).json(result);    
        }catch(err){
            return res.status(500).json({ error: await MessageError.UnknownError(`${err}`)});
        }
    }

    public async getExemploByID(req: Request, res: Response): Promise<Response>{
        try{
            const id: number = parseInt(req.query.id as string, 10); // 10 - Converte o id para número decimal
            const result = await ExemploService.getExemploByID(id);
            if(!result)
                return res.status(404).json({error: await MessageError.NotFoundError('Exemplo', id)});
            if ('error' in result)
                return res.status(400).json({error: result.error});

            return res.status(200).json(result);    
        }catch(err){
            return res.status(500).json({ error: await MessageError.UnknownError(`${err}`)});
        }
    }

    public async createExemplo(req: Request, res: Response): Promise<Response>{
        const transaction = await sequelize.transaction(); // Inicia uma transaction para tratar possiveis erros com rollback. faca isso somente com insert, delete e update.
        try{
            const body = req.body;      
            const result = await ExemploService.createExemplo(transaction, body)
            if ('error' in result)
                return res.status(400).json({error: result.error});
            if( !result?.id )
                return res.status(400).json({error: await MessageError.ErrorCreated('Exemplo')});
    
            return res.status(200).json({message: await MessageSuccess.SuccessCreated('Exemplo')});
        }catch(err){
            if(transaction) await transaction.rollback();
            return res.status(500).json({ error: await MessageError.UnknownError(`${err}`)});
        }
    }

    public async updateExemploByID(req: Request, res: Response): Promise<Response>{
        const transaction = await sequelize.transaction(); 
        try{
            const body = req.body
            const result = await ExemploService.updateExemploByID(transaction, body);
            if (typeof result === 'object' && 'error' in result) 
                return res.status(400).json({error: result.error});
            if( result == undefined || result == 0)
                return res.status(400).json({error: await MessageError.ErrorUpdated('Exemplo', body.id)});
                        
            return res.status(200).json({message: await MessageSuccess.SuccessUpdated('Exemplo', body.id)});
        }catch(err){
            if(transaction) await transaction.rollback();
            return res.status(500).json({ error: await MessageError.UnknownError(`${err}`)});
        }
    }

    public async deleteExemploByID(req: Request, res: Response): Promise<Response>{
        const transaction = await sequelize.transaction();
        try{
            const id: number = parseInt(req.query.id as string, 10);        
            const result = await ExemploService.deleteExemploByID(transaction, id);
            if (typeof result === 'object' && 'error' in result) 
                return res.status(400).json({error: result.error});
            if( result == undefined || result == 0)
                return res.status(400).json({error: await MessageError.ErrorDeleted('Exemplo', id)});
            
            return res.status(200).json({message: await MessageSuccess.SuccessDeleted('Exemplo', id)});
        }catch(err){
            if(transaction) await transaction.rollback();
            return res.status(500).json({ error: await MessageError.UnknownError(`${err}`)});
        }
    }

}

export default new ExemploController();