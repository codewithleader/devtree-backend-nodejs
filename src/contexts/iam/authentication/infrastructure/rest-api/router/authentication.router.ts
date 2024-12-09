import { Router } from 'express';
import { authenticationController } from '@contexts/iam/authentication/infrastructure/dependencies';
import { registerValidatorMiddleware } from '@contexts/iam/authentication/infrastructure/middleware';

export class AuthenticationRouter {
  static get routes(): Router {
    const router = Router();

    router.post(
      '/login',
      authenticationController.login.bind(authenticationController)
    );

    router.post(
      '/register',
      registerValidatorMiddleware.bind(registerValidatorMiddleware),
      authenticationController.register.bind(authenticationController)
    );

    return router;
  }
}
