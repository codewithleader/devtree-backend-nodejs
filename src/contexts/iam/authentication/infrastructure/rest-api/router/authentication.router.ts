import { Router } from 'express';
import { authenticationController } from '@contexts/iam/authentication/infrastructure/dependencies';
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
      authenticationController.register
    );

    router.post('/login', loginValidatorRules, authenticationController.login);

    return router;
  }
}
