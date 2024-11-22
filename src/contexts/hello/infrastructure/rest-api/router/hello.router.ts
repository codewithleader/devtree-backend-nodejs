import { Router } from 'express';

const helloRouter = Router();

helloRouter.get('/hello', (req, res) => {
  res.send('what');
});

export { helloRouter };
