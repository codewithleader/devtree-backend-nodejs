import type { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import colors from 'colors';
//
import {
  RegisterUserUseCase,
  LoginUserUseCase,
} from '@contexts/iam/authentication/application';
import { CustomError } from '@shared/errors/domain';
import { ResponseFormat } from '@shared/utils';

export class AuthenticationController {
  constructor(
    private readonly registerUser: RegisterUserUseCase,
    private readonly loginUser: LoginUserUseCase
  ) {}

  private handleErrors = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json(ResponseFormat.error(error.message));
      return;
    }

    console.error(colors.bgRed.white(ReasonPhrases.INTERNAL_SERVER_ERROR), {
      error,
    });
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ResponseFormat.error(ReasonPhrases.INTERNAL_SERVER_ERROR));
    return;
  };

  public register = (req: Request, res: Response) => {
    this.registerUser
      .execute(req.body)
      .then(() =>
        res
          .status(StatusCodes.CREATED)
          .json(ResponseFormat.success<null>(null, ReasonPhrases.CREATED))
      )
      .catch((error) => this.handleErrors(res, error));
  };

  public login = (req: Request, res: Response) => {
    this.loginUser
      .execute(req.body)
      .then((data) =>
        res
          .status(StatusCodes.OK)
          .json(ResponseFormat.success<{ token: string }>(data))
      )
      .catch((error) => this.handleErrors(res, error));
  };
}
