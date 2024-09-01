import dotenv from 'dotenv';
dotenv.config();
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import MessageError from "./lang/MessageError";

const hash = process.env.SECRETKEY_HASH as string;

const secretKey = crypto.createHash('sha256').update(hash).digest('hex');

async function verifyToken(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    let token: string | undefined;

    if (req.params.token) 
      token = req.params.token.replace(/Bearer /gi, '');
    else if (req.headers.authorization)
      token = req.headers.authorization.replace(/Bearer /gi, '');
    
    if (!token)
      return res.status(401).json({ token: false, mensagem: await MessageError.AccessDenied() });

    const decoded = await jwt.verify(token, secretKey);

    if (decoded.exp && decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ token: false, mensagem: await MessageError.ExpiredToken() });
    }
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ token: false, mensagem: await MessageError.AccessDenied() });
  }
}

export { 
  secretKey,
  verifyToken
};
