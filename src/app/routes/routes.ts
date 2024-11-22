import { whatRouter } from '@src/contexts/what/infrastructure/rest-api/router/what.routes';
import { Router } from 'express';

interface Route {
  path: string;
  name: string;
  router: Router;
}

export const routes: Route[] = [
  {
    path: '/what',
    name: 'what',
    router: whatRouter,
  },
];
