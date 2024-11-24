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

// FIXME: El controller seria una clase que luego en el archivo dependencies.ts se crea la instancia pasandole todas las DI y luego en el router es que se usa la instancia desde el archivo dependencies.

/**
 * Controller luciría asi:

import { Request, Response } from "express";

import { WelcomeMessageSender } from "../../application/welcome-message-sender";

export class UserController {
  constructor(private readonly welcomeMessageSender: WelcomeMessageSender) {}

  async sendWelcomeMessage(req: Request, res: Response) {
    const { id: userId } = req.params;
    await this.welcomeMessageSender.sendToUser(userId);
    res.status(200).send();
  }
}

 */
