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

    public async RequiredAllFields(): Promise<string>{
        const messages = await this.getMessages();
        return messages.RequiredAllFields();
    }

    public async ConfirmPassword(): Promise<string>{
        const messages = await this.getMessages();
        return messages.ConfirmPassword();
    }

    public async InvalidPassword(): Promise<string>{
        const messages = await this.getMessages();
        return messages.InvalidPassword();
    }

    public async InvalidEmail(): Promise<string>{
        const messages = await this.getMessages();
        return messages.InvalidEmail();
    }

    public async EmailInUse(): Promise<string>{
        const messages = await this.getMessages();
        return messages.EmailInUse();
    }

    public async NotFoundUser(): Promise<string>{
        const messages = await this.getMessages();
        return messages.NotFoundUser();
    }

    public async InvalidAccess(): Promise<string>{
        const messages = await this.getMessages();
        return messages.InvalidAccess();
    }

    public async SendEmail(): Promise<string>{
        const messages = await this.getMessages();
        return messages.SendEmail();
    }

    public async RequiredLoginToken(): Promise<string>{
        const messages = await this.getMessages();
        return messages.RequiredLoginToken();
    }
    
    public async DeleteToken(): Promise<string>{
        const messages = await this.getMessages();
        return messages.DeleteToken();
    }

    public async InvalidToken(): Promise<string>{
        const messages = await this.getMessages();
        return messages.InvalidToken();
    }

    public async ExpiredToken(): Promise<string>{
        const messages = await this.getMessages();
        return messages.ExpiredToken();
    }

    public async AccessDenied(): Promise<string>{
        const messages = await this.getMessages();
        return messages.AccessDenied();
    }
    
}

export default new MessageError;