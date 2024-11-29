import { Request, Response } from 'express';
import { CreateUserUseCase } from '@contexts/users/application/use-cases';
import { HashingService } from '@contexts/iam/authentication/domain';

export class AuthenticationController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly hashingService: HashingService
  ) {}

  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const hashedPassword = await this.hashingService.hash(password);
      await this.createUser.execute({ name, email, password: hashedPassword });
      return res.status(201).json({ message: 'OK!' });
    } catch (error) {
      if (error.errorResponse.code === 11000) {
        return res.status(400).json({
          error: `Email ya existe en base de datos: ${email}`,
        });
      }
      return res.status(400).json({ error });
    }
  }

  async login(req: Request, res: Response) {
    return res
      .status(400)
      .json({ status: 400, message: 'Method not implemented' });
  }
}
