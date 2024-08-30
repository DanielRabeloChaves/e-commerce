import dotenv from 'dotenv';
dotenv.config();
const lang = process.env.Ambient_Language || 'pt-br';

class MessageError{
    private async getMessages() {
        try {
            return await import(`./${lang}/error`);
        } catch (error) {
            console.log(`Erro language ${lang}:`, error);
        }
    }

    public async UnknownError(detail?: string): Promise<string>{
        const messages = await this.getMessages();
        return messages.UnknownError(detail ? detail : '');
    }

    public async NotFoundError(name: string, id?: number): Promise<string>{
        const messages = await this.getMessages();
        return messages.NotFoundError(name, id ? id : '');
    }
    
    public async ErrorCreated(name: string): Promise<string>{
        const messages = await this.getMessages();
        return messages.ErrorCreated(name);
    }

    public async ErrorUpdated(name: string, id: number): Promise<string>{
        const messages = await this.getMessages();
        return messages.ErrorUpdated(name, id);
    }

    public async ErrorDeleted(name: string, id: number): Promise<string>{
        const messages = await this.getMessages();
        return messages.ErrorDeleted(name, id); 
    }

    public async ErrorExecuteQuery(detail?: string): Promise<string>{
        const messages = await this.getMessages();
        return messages.ErrorExecuteQuery(detail ? detail : '');
    }
}

export default new MessageError;