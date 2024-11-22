import { Router } from 'express';

const whatRouter = Router();

whatRouter.get('/hello', (req, res) => {
  res.send('what');
});

export { whatRouter };
