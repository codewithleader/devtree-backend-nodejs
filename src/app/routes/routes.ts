import { Router } from 'express';
import { AuthenticationRouter } from '@src/contexts/iam/authentication/infrastructure/rest-api/router';
import { UserRouter } from '@src/contexts/users/infrastructure/rest-api/router';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    //* Import the routes of the different modules

    // API Routes
    router.use('/api/auth', AuthenticationRouter.routes);
    router.use('/api/users', UserRouter.routes);

    // Others Routes

    return router;
  }
}
