import { Request, Response } from "express";
import VerifyTokenService from "../services/VerifyTokenService";
import MessageError from "../lang/MessageError";

class VerifyTokenController{
    public async verifyToken(req: Request, res: Response): Promise<Response>{
        try{
            const token = await VerifyTokenService.verifyToken();
        
            if(!token)
              return res.status(403).json({token: false, error: await MessageError.AccessDenied()});
        
            return res.status(200).json(token);
          }catch(err){
            console.log(err)
            return res.status(403).json({token: false, error: await MessageError.AccessDenied()});
          }
    }
}

export default new VerifyTokenController();