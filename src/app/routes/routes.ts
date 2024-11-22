import { Router } from 'express';
import { authRouter } from '@contexts/auth/infrastructure/rest-api/router';
import { helloRouter } from '@src/contexts/hello/infrastructure/rest-api/router';

interface Route {
  path: string;
  name: string;
  router: Router;
}

export const routes: Route[] = [
  {
    path: '/hello',
    name: 'hello',
    router: helloRouter,
  },
  {
    path: '/auth',
    name: 'auth',
    router: authRouter,
  },
];
