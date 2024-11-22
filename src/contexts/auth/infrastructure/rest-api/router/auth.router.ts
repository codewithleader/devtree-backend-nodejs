import { Router } from 'express';

const authRouter = Router();

authRouter.post('/login', (req, res) => {
  res.send('login');
});

authRouter.post('/register', (req, res) => {
  res.send('register');
});

export { authRouter };
