import dotenv from 'dotenv';
dotenv.config();
import { ErrorRateLimit } from '../lang/pt-br/error';

class Config{
    public configRateLimit(maxLimit?: number, timeWaitMinutes?: number){
        const defaultMinute: number = timeWaitMinutes ? timeWaitMinutes *  60  *  1000 : 15  *  60  *  1000; // 15 Minutos
        const defaultLimit: number = maxLimit ? maxLimit : 100;
        const messageLimite: string = ErrorRateLimit(defaultLimit, timeWaitMinutes);
        const limiterDataFile = {windowMs : defaultMinute , max: defaultLimit,  message: {error: messageLimite},} ;
        return limiterDataFile;
    }

    public async sendEmailTest(): Promise<String>{
        const emails = `danielrabelochaves1999@gmail.com, danielrabelobh@outlook.com`;
        return emails;
    }

    public async currentUrlFrontWeb(): Promise<String>{
        const ambientDev = process.env.Ambient_Dev;
        const currentUrl = ambientDev ? `http://localhost:3000` : `https://*.dominio_producao.com.br`;
        return currentUrl;
    }
}

export default new Config