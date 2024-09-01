class VerifyHelpers{

    public async Email(email: string): Promise<Boolean> {
        try{
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }catch{
            return false; 
        }
    }
    
}

export default new VerifyHelpers;