import dotenv from 'dotenv';
dotenv.config();
const lang = process.env.Ambient_Language || 'pt-br';

class TemplateEmail{
    private async getTemplate() {
        try {
            return await import(`./${lang}/email`);
        } catch (error) {
            console.log(`Erro language ${lang}:`, error);
        }
    }

    public async subjectTokenLogin(): Promise<string>{
        const messages = await this.getTemplate();
        return messages.subjectTokenLogin();
    }

    public async bodyTokenLogin(name: string, email: string, codigo: string): Promise<string>{
        const messages = await this.getTemplate();
        return messages.bodyTokenLogin(name, email, codigo);
    }

}

export default new TemplateEmail;