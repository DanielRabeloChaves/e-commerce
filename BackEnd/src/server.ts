import http from 'http';
import app from './app';
const port = process.env.PORT || 3001;
const processId : number = process.pid;
const server = http.createServer(app);
server.listen(port)
.once('listening', () => {
    console.log('Server started in process: ', processId);
})

// kill process by id. Bloquear todos novos acessos as APIs antes de fechar o processo. Encerrar o processo garantindo que nao tem mais nada ativo.
process.on('sigterm', () => {
    console.log('server ending: ', new Date().toISOString());
    server.close(() => process.exit());
})

// Erros nao tratados. Evita a queda da aplicacao em casos de erros.
process.on('uncaughtException', (error, origin) =>{
    console.log(`\n${origin} signal received. \n${error}`);
})
process.on('unhandledRejection', (error) =>{
    console.log(`\nunhandledRejection signal received. \n${error}`);
})