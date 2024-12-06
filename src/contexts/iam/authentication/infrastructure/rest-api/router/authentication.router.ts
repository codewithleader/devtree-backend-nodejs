import { Router } from 'express';
import { authenticationController } from '@contexts/iam/authentication/infrastructure/dependencies';

export class AuthenticationRouter {
  static get routes(): Router {
    const router = Router();

    router.post(
      '/login',
      authenticationController.login.bind(authenticationController)
    );

    router.post(
      '/register',
      authenticationController.register.bind(authenticationController)
    );

    return router;
  }
}
