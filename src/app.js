import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import __dirname from "./utils/index.js"

const app = express();
process.loadEnvFile()
const PORT = process.env.PORT||8080;
const connection = mongoose.connect(process.env.MONGO_URL)

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks',mocksRouter);

// Configuracion de Swagger
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Usuarios, mascotas y adopciones",
            version: "1.0.0",
            description: "Una API para gestionar usuarios, mascotas y adopciones"
        },
        servers: [
            {
                url: `http://localhost:${PORT}`
            }
        ],
    },
    apis: [`${__dirname}/../docs/**/*.yaml`] // Ruta de los archivos con documentación 
}
console.log(`${__dirname}/../docs/**/*.yaml`)
const swaggerDocs = swaggerJSDoc(swaggerOptions)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))


app.listen(PORT,()=>console.log(`Listening on ${PORT}`))