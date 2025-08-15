import express from 'express'
import router from "./router"
import path from 'path'
import db from "./config/db"
import cors from 'cors'


export const server = express()
server.use(express.json())

server.use(cors())

server.use('/api/', router)
server.use('/images', express.static(path.join(__dirname, 'data/img/videogames')));

//conectar a la db

export async function connectDB() {
    try{
        await db.authenticate()
        db.sync()
        console.log('conexion exitosa')
    }
    catch(error){
        console.log(error)
        console.log('hubo un error al conectar a la bd',error)
    }
    
}





