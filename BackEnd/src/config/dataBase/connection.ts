import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const dialect = process.env.DB_dialect;
const database = process.env.DB_database;
const username = process.env.DB_user;
const password = process.env.DB_password;
const host = process.env.DB_host;

if (!database || !username || !host || !dialect) {
    throw new Error('Missing database configuration environment variables');
}

const sequelize  = new Sequelize(database, username, password, {
    host: host,
    dialect: dialect as any, /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    pool: {
        max: 10,
        min: 0,
        acquire: 30000, // Tempo máximo, em milissegundos, que a pool tentará obter a conexão antes de lançar um erro
        idle: 10000 // Tempo máximo, em milissegundos, que uma conexão pode ficar ociosa antes de ser liberada
    },
    logging: false,
    define:{
        timestamps: true,
    } // exibe os logs no console a medida que vai sendo feito querys no banco
    
});

export default sequelize;