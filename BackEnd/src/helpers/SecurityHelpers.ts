class SecurityHelpers{

    public async verifyPassword(senha: string): Promise<Boolean> {
        try{
            if (senha.length < 8) // Contem 8 ou mais Caracteres
            return false;
            
            if (!/[A-Z]/.test(senha)) // Contem Maiusculas
                return false;
            
            if (!/[a-z]/.test(senha)) // Contem Minusculas
                return false;
            
            if (!/\d/.test(senha)) // Contem Numericos
                return false;
            
            return true;
        }catch{
            return false; 
        }
    }

    public async generateTokenLogin(length: number): Promise<string> {
        try{
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let token = '';
            
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                token += characters.charAt(randomIndex);
            }
            
            return token;
        }catch{
            throw new Error('Error generating login token.'); 
        }
    }

}

export default new SecurityHelpers;