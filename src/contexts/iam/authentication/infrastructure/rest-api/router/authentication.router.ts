import { Router } from 'express';
import { authenticationController } from '@contexts/iam/authentication/infrastructure/dependencies';
import { handleValidatorErrorsMiddleware } from '@contexts/iam/authentication/infrastructure/middleware';
import {
  loginValidatorRules,
  registerValidatorRules,
} from '@contexts/iam/authentication/infrastructure/validators';

export class AuthenticationRouter {
  static get routes(): Router {
    const router = Router();

    router.post(
      '/register',
      registerValidatorRules,
      handleValidatorErrorsMiddleware.bind(handleValidatorErrorsMiddleware),
      authenticationController.register.bind(authenticationController)
    );

    router.post(
      '/login',
      loginValidatorRules,
      handleValidatorErrorsMiddleware.bind(handleValidatorErrorsMiddleware),
      authenticationController.login.bind(authenticationController)
    );

    return router;
  }
}
