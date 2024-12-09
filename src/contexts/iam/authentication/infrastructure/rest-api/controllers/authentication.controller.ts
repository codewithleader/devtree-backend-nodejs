import type { Request, Response } from 'express';
import { RegisterUserUseCase } from '@contexts/iam/authentication/application';
import { CustomError } from '@src/contexts/shared/errors/domain';
import { RegisterUserDto } from '@contexts/iam/authentication/domain';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import colors from 'colors';

export class AuthenticationController {
  constructor(private readonly registerUser: RegisterUserUseCase) {}

  private handleErrors = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }

    console.error(colors.bgRed.white(ReasonPhrases.INTERNAL_SERVER_ERROR), {
      error,
    });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
  };

  public register = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.validate(req.body);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        error,
      });
    }

    this.registerUser
      .execute(registerUserDto)
      .then(() =>
        res.status(StatusCodes.CREATED).json({ message: ReasonPhrases.CREATED })
      )
      .catch((error) => this.handleErrors(res, error));
  };

  public login = (req: Request, res: Response) => {
    return res
      .status(StatusCodes.NOT_IMPLEMENTED)
      .json({ message: ReasonPhrases.NOT_IMPLEMENTED });
  };
}
