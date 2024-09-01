import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import { UnknownError } from './lang/pt-br/error';

// Import Routes
import exemploRoutes from './routes/exemploRoutes';
import userRoutes from './routes/userRoutes';
import verifyToken from './routes/verifyToken';
import modality from './routes/modalityRoutes';
import product from './routes/productRoutes';
import cart from './routes/cartRoutes';

const app = express()

app.set('trust proxy', 1); // Confiar nos cabeçalhos "X-Forwarded-For" -> ajuda na busca pelo ip do usuario que esta fazendo as request.

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req: Request, res: Response, next: NextFunction)=>{
    try{
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
         'Access-Control-Allow-Header',
         'Origin, X-Requested-With, Content-Type, Accept, Authorization, userip'
         );
    
         if(req.method === 'OPTIONS'){
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).send({});
         }
         next();
    }catch (err){
        return res.status(405).json({ error: UnknownError(`${err}`)});
    }
})

app.use('/api/exemplo', exemploRoutes);
app.use('/api/user', userRoutes);
app.use('/api/token', verifyToken);
app.use('/api/modality', modality);
app.use('/api/product', product);
app.use('/api/cart', cart);

app.use((req: Request, res: Response, next: NextFunction) => {
    try{
        const erro = new Error('Not Found');
        next(erro);
    }catch(err){
        return res.status(500).json({ error: UnknownError(`${err}`)});
    }
})
app.use((error: any, req : Request, res: Response, next: NextFunction) =>{
    try{
        res.status(error.status || 500);
        return res.send({ erro:{ message: error.message }});
    }catch(err){
        return res.status(500).json({ error: UnknownError(`${err}`)});
    }
})

export default app;