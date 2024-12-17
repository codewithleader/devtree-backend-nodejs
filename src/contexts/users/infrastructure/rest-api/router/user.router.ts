import { tokenValidatorMiddleware } from '@src/contexts/iam/authorization/infrastructure/middlewares';
import { Router } from 'express';
import { userController } from '../../dependencies';

export class UserRouter {
  static get routes(): Router {
    const router = Router();

    router.get('/get-user', tokenValidatorMiddleware, userController.getUser);

    // router.get('/user/:id', (req, res) => res.status(200).send('Not implemented'));

    return router;
  }
}
