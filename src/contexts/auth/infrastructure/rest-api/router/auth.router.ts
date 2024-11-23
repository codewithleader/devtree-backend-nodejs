import { Router } from 'express';

const authRouter = Router();

authRouter.post('/login', (req, res) => {
  res.send('login');
});

authRouter.post('/register', (req, res) => {
  console.log(req.body);
});

export { authRouter };
