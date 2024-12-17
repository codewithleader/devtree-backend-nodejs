import type { Request, Response } from 'express';

import { CustomError } from '@src/contexts/shared/errors/domain';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import colors from 'colors';
import { GetUserByIdUseCase } from '@src/contexts/users/application';
import { USER_ID_KEY } from '@src/contexts/users/users.constants';

export class UserController {
  constructor(private readonly getUserById: GetUserByIdUseCase) {}

  private handleErrors = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }

    console.error(colors.bgRed.white(ReasonPhrases.INTERNAL_SERVER_ERROR), {
      error,
    });
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
    return;
  };

  public getUser = (req: Request, res: Response) => {
    const id = req[USER_ID_KEY];
    // const id = res.locals.userId; // Option 2: Not implemented
    if (!id) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: ReasonPhrases.UNAUTHORIZED });
      return;
    }

    this.getUserById
      .execute(id)
      .then((data) => res.status(StatusCodes.OK).json(data))
      .catch((error) => this.handleErrors(res, error));
  };
}
