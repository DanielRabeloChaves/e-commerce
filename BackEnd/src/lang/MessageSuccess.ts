import dotenv from 'dotenv';
dotenv.config();
const lang = process.env.Ambient_Language || 'pt-br';

class MessageSuccess{
    private async getMessages() {
        try {
            return await import(`./${lang}/success`);
        } catch (error) {
            console.log(`Erro language ${lang}:`, error);
        }
    }

    public async SuccessCreated(name: string): Promise<string>{
        const messages = await this.getMessages();
        return messages.SuccessCreated(name);
    }

    public async SuccessUpdated(name: string, id: number): Promise<string>{
        const messages = await this.getMessages();
        return messages.SuccessUpdated(name, id);
    }

    public async SuccessDeleted(name: string, id: number): Promise<string>{
        const messages = await this.getMessages();
        return messages.SuccessDeleted(name, id);
    }

}

export default new MessageSuccess;