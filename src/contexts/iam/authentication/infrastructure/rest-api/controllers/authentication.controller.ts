import type { Request, Response } from 'express';
import {
  CreateUserUseCase,
  // FindByEmailUserUseCase,
} from '@contexts/users/application/use-cases';
import { HashingService } from '@contexts/iam/authentication/domain';
import { CustomError } from '@src/contexts/shared/errors/domain';

export class AuthenticationController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    // private readonly findUserByEmail: FindByEmailUserUseCase,
    private readonly hashingService: HashingService
  ) {}

  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const hashedPassword = await this.hashingService.hash(password);
      await this.createUser.execute({ name, email, password: hashedPassword });
      return res.status(201).json({ message: 'OK!' });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Ocurrió un error inesperado' });
    }
  }

  async login(req: Request, res: Response) {
    return res
      .status(400)
      .json({ status: 400, message: 'Method not implemented' });
  }
}
