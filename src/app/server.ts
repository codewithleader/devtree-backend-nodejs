import express from 'express';
import { routes } from '@app/routes/routes';

const server = express();

routes.map((route) => server.use(route.path, route.router));

export default server;
