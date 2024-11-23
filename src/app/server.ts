import express from 'express';
import { routes } from '@app/routes';
import { connectDB } from '@app/config/db';

const server = express();

// Habilitar BodyParser (Leer datos de formularios)
server.use(express.json());

// Conexion a la base de datos MongoDB
connectDB();

// Todas las rutas
routes.map((route) => server.use(route.path, route.router));

export default server;
