import type { Request, Response } from 'express';
import { RegisterUserUseCase } from '@contexts/iam/authentication/application';
import { CustomError } from '@src/contexts/shared/errors/domain';
import { RegisterUserDto } from '@contexts/iam/authentication/domain';

export class AuthenticationController {
  constructor(private readonly registerUser: RegisterUserUseCase) {}

  private handleErrors = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }

    console.log({ error });
    return res
      .status(500)
      .json({ error: 'Internal Server Error - Check logs' });
  };

  public register = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.validate(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    this.registerUser
      .execute(registerUserDto)
      .then(() => res.status(201).json({ message: 'OK!' }))
      .catch((error) => this.handleErrors(res, error));
  };

  public login = (req: Request, res: Response) => {
    return res.status(500).json({ message: 'Method not implemented' });
  };
}
