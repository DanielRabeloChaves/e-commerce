class VerifyHelpers{

    public async Email(email: string): Promise<Boolean> {
        try{
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }catch{
            return false; 
        }
    }

    public async getContentType(extensao: string): Promise<string> {
        try {
          switch (extensao) {
            case '.pdf':
              return 'application/pdf';
            case '.png':
              return 'image/png';
            case '.jpg':
            case '.jpeg':
              return 'image/jpeg';
            case '.bmp':
              return 'image/bmp';
            case '.svg':
              return 'image/svg+xml';
            case '.gif':
              return 'image/gif';
            default:
              return 'application/octet-stream';
          }
        } catch {
          throw new Error('Erro ao enviar extensao do arquivo.'); 
        }
    }
    
}

export default new VerifyHelpers;