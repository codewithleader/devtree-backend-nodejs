import { NextFunction, Request, Response } from 'express';
// todo: falta repositorio y caso de uso

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  // aqui el repositorio y caso de uso

  try {
    // const jwt = await loginUseCase.run({
    //   email,
    //   password
    // })
    res.json('jwt');
    return;
  } catch (e) {
    return next(e);
  }
};
