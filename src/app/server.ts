import express from 'express';
import { routes } from '@app/routes';
import { envs, MongoDatabase } from '@app/config';

const server = express();

// Habilitar BodyParser (Leer datos de formularios)
server.use(express.json());

// Conexion a la base de datos MongoDB
MongoDatabase.connect({
  mongoUrl: envs.MONGO_URL,
  dbName: envs.MONGO_DBNAME,
});

// Todas las rutas
routes.map((route) => server.use(route.path, route.router));

export default server;
