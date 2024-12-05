import type { Request, Response } from 'express';
import { RegisterUserUseCase } from '@contexts/iam/authentication/application';
import { CustomError } from '@src/contexts/shared/errors/domain';

export class AuthenticationController {
  constructor(private readonly registerUser: RegisterUserUseCase) {}

  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      await this.registerUser.execute({
        name,
        email,
        password,
      });
      return res.status(201).json({ message: 'OK!' });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Ocurrió un error inesperado' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      return res.status(200).json({ message: 'Method not implemented' });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Ocurrió un error inesperado' });
    }
  }
}
