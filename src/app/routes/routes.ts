import { Router } from 'express';
import { authenticationRouter } from '@contexts/iam/authentication/infrastructure/rest-api/router';
import { helloRouter } from '@contexts/hello/infrastructure/rest-api/router';

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
    name: 'authentication',
    router: authenticationRouter,
  },
];
