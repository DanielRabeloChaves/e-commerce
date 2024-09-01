import { Request, Response } from "express";
import CartService from "../services/CartService";
import sequelize  from '../config/dataBase/connection'
import MessageError from "../lang/MessageError";
import MessageSuccess from "../lang/MessageSuccess";
import UserService from "../services/UserService";
import jwt from 'jsonwebtoken';
import { secretKey } from "../token";

class CartController{
    public async getAllCart(req: Request, res: Response): Promise<Response>{
        try{
            const token = req?.headers?.authorization?.replace(/Bearer /gi, '');
            const decryptToken = jwt.verify(token, secretKey);

            if (decryptToken.type_access_user_name != 'ADMIN')
                return res.status(403).json({error: await MessageError.AccessDenied()});

            const result = await CartService.getAll();
            if ('error' in result)
                return res.status(400).json({error: result.error});

            if(!result)
                return res.status(404).json({error: await MessageError.NotFoundError('Carrinho')});

            return res.status(200).json(result);    
        }catch(err){
            return res.status(500).json({ error: await MessageError.UnknownError(`${err}`)});
        }
    }

    public async getCartByID(req: Request, res: Response): Promise<Response>{
        try{
            const token = req?.headers?.authorization?.replace(/Bearer /gi, '');
            const decryptToken = jwt.verify(token, secretKey);

            const id: number = parseInt(req.query.id as string, 10); // 10 - Converte o id para número decimal
            const result = await CartService.getCartByID(id);
            if(!result)
                return res.status(404).json({error: await MessageError.NotFoundError('Carrinho', id)});

            if ('error' in result)
                return res.status(400).json({error: result.error});

            if (decryptToken.id != result.user_id)
                return res.status(403).json({error: await MessageError.AccessDenied()});

            return res.status(200).json(result);    
        }catch(err){
            return res.status(500).json({ error: await MessageError.UnknownError(`${err}`)});
        }
    }

    public async getCartByUID(req: Request, res: Response): Promise<Response>{
        try{
            const token = req?.headers?.authorization?.replace(/Bearer /gi, '');
            const decryptToken = jwt.verify(token, secretKey);

            const uid: string | undefined = req.query.uid?.toString();
            if(!uid)
                return res.status(404).json({error: await MessageError.NotFoundUser()});

            if (decryptToken.uid != uid)
                return res.status(403).json({error: await MessageError.AccessDenied()});

            const user = await UserService.getByUID(uid);
            if(!user)
                return res.status(404).json({error: await MessageError.NotFoundUser()});

            const result = await CartService.getAllByUID(uid);
            if(!result)
                return res.status(404).json({error: await MessageError.NotFoundCart()});
            if ('error' in result)
                return res.status(400).json({error: result.error});

            return res.status(200).json(result);    
        }catch(err){
            return res.status(500).json({ error: await MessageError.UnknownError(`${err}`)});
        }
    }

    public async createCart(req: Request, res: Response): Promise<Response>{
        const transaction = await sequelize.transaction();
        try{
            const token = req?.headers?.authorization?.replace(/Bearer /gi, '');
            const decryptToken = jwt.verify(token, secretKey);
            const userId = decryptToken.id;

            const body = req.body;   
            body.user_id = userId;
            
            const result = await CartService.create(transaction, body)
            if ('error' in result)
                return res.status(400).json({error: result.error});

            if( !result?.id )
                return res.status(400).json({error: await MessageError.ErrorCreated('Carrinho')});
    
            return res.status(200).json({message: await MessageSuccess.CartProdut()});
        }catch(err){
            if(transaction) await transaction.rollback();
            return res.status(500).json({ error: await MessageError.UnknownError(`${err}`)});
        }
    }

}

export default new CartController();