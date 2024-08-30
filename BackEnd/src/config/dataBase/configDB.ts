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

module.exports = {
    development: {
        username,
        password,
        database,
        host,
        dialect,
        define:{
            timestamps: true,
        } 
    },
    test: {
        username,
        password,
        database,
        host,
        dialect,
        define:{
            timestamps: true,
        }
    },
    production: {
        username,
        password,
        database,
        host,
        dialect,
        define:{
            timestamps: true,
        }
    }
};
