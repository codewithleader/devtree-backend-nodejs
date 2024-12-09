import { Router } from 'express';
import { authenticationController } from '@contexts/iam/authentication/infrastructure/dependencies';
import {
  loginValidatorMiddleware,
  loginValidatorRules,
  registerValidatorMiddleware,
  registerValidatorRules,
} from '@contexts/iam/authentication/infrastructure/middleware';

export class AuthenticationRouter {
  static get routes(): Router {
    const router = Router();

    router.post(
      '/register',
      registerValidatorRules,
      registerValidatorMiddleware.bind(registerValidatorMiddleware),
      authenticationController.register.bind(authenticationController)
    );

    router.post(
      '/login',
      loginValidatorRules,
      loginValidatorMiddleware.bind(loginValidatorMiddleware),
      authenticationController.login.bind(authenticationController)
    );

    return router;
  }
}
