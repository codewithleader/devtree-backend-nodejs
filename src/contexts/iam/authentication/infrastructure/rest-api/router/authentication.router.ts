import { Router } from 'express';
import { authenticationController } from '@contexts/iam/authentication/infrastructure/dependencies';
import {
  loginValidatorRules,
  registerValidatorRules,
} from '@contexts/iam/authentication/infrastructure/validators';
import { handleValidatorErrorsMiddleware } from '@shared/middlewares';

export class AuthenticationRouter {
  static get routes(): Router {
    const router = Router();

    router.post(
      '/register',
      registerValidatorRules,
      handleValidatorErrorsMiddleware,
      authenticationController.register
    );

    router.post(
      '/login',
      loginValidatorRules,
      handleValidatorErrorsMiddleware,
      authenticationController.login
    );

    return router;
  }
}
