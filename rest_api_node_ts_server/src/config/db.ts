import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

dotenv.config()



console.log('Database Config:', {
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
});

const db = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: 'localhost',
    port: Number(process.env.DB_PORT), 
    dialect: 'postgres', 
  }
);


export default db