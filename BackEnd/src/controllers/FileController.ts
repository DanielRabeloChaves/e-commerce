import { Request, Response } from "express";
import ProductService from "../services/ProductService";
import sequelize  from '../config/dataBase/connection'
import MessageError from "../lang/MessageError";
import MessageSuccess from "../lang/MessageSuccess";
import jwt from 'jsonwebtoken';
import { secretKey } from "../token";
import path from "path";
import * as fs from 'fs';
import VerifyHelpers from "../helpers/VerifyHelpers";


class FileController{
    public async getFileProductById(req: Request, res: Response): Promise<Response>{
        try{
            const productId: number = parseInt(req.query.productId as string, 10);
            const token = req.query.token;
            const decryptToken = jwt.verify(token, secretKey);
            if(!decryptToken)
                return res.status(404).json({error: await MessageError.AccessDenied()});

            console.log(productId)
            const result = await ProductService.getProductByID(productId);

            if(!result)
                return res.status(404).json({error: await MessageError.NotFoundError('Foto')});

            if ('error' in result)
                return res.status(400).json({error: result.error});

            const extensao = path.extname(result.photo);
            
            const contentType = await VerifyHelpers.getContentType(extensao);

            res.setHeader('Content-disposition', `attachment; filename=${result.photo}`);
            res.setHeader('Content-type', contentType);
            res.setHeader('Authorization', `Bearer ${token}`);
        
            const filePath = `uploads/product/${result.photo}`;

            const localFilePath = path.join(__dirname, '..', 'uploads', 'product', result.photo);  
            if (!fs.existsSync(localFilePath))
            return res.status(200).json({ error: "Arquivo nao encontrado." });

            const localFileStream = fs.createReadStream(localFilePath);
            localFileStream.pipe(res);   
            return new Promise<void>((resolve, reject) => {
                localFileStream.on('end', resolve);
                localFileStream.on('error', reject);
            }).then(() => res).catch(err => res.status(500).json({ error: err.message }));

            
        }catch(err){
            return res.status(500).json({ error: await MessageError.UnknownError(`${err}`)});
        }
    }

}

export default new FileController();