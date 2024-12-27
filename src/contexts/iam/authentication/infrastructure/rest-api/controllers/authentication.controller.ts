import type { Request, Response } from 'express';
import {
  RegisterUserDto,
  LoginUserDto,
  RegisterUserUseCase,
  LoginUserUseCase,
} from '@contexts/iam/authentication/application';
import { CustomError } from '@shared/errors/domain';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import colors from 'colors';
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
    const [errors, registerUserDto] = RegisterUserDto.validate(req.body);
    if (errors) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          ResponseFormat.error(ReasonPhrases.BAD_REQUEST, { error: errors })
        );
      return;
    }

    this.registerUser
      .execute(registerUserDto)
      .then(() =>
        res
          .status(StatusCodes.CREATED)
          .json(ResponseFormat.success<null>(null, ReasonPhrases.CREATED))
      )
      .catch((error) => this.handleErrors(res, error));
  };

  public login = (req: Request, res: Response) => {
    const [errors, loginUserDto] = LoginUserDto.validate(req.body);
    if (errors) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          ResponseFormat.error(ReasonPhrases.BAD_REQUEST, { error: errors })
        );
      return;
    }
    this.loginUser
      .execute(loginUserDto)
      .then((data) =>
        res.status(StatusCodes.OK).json(ResponseFormat.success(data))
      )
      .catch((error) => this.handleErrors(res, error));
  };
}
