import MessageError from "../lang/MessageError";
import MessageSuccess from "../lang/MessageSuccess";

class VerifyTokenService{
    public async verifyToken(): Promise<any>{
        try{
            return { token: true, Menssage: await MessageSuccess.ValidToken()};
        }catch(err){
            console.log(err)
            return { token: false, Menssage: await MessageError.InvalidToken()};
        }
    };
}

export default new VerifyTokenService();