import { Router } from 'express';
import { authenticationController } from '@contexts/iam/authentication/infrastructure/dependencies';

const authenticationRouter = Router();

authenticationRouter.post('/login', (req, res) => {
  res.send('login');
});

authenticationRouter.post(
  '/register',
  authenticationController.register.bind(authenticationController)
);

export { authenticationRouter };
