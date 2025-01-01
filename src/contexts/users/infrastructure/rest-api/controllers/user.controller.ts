import type { Request, Response } from 'express';
import colors from 'colors';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
//
import { CustomError } from '@shared/errors/domain';
import { ResponseFormat } from '@shared/utils';
import { IUser } from '@contexts/users/domain';
import {
  UpdateUserProfileDto,
  UpdateUserProfileUseCase,
} from '@contexts/users/application';

export class UserController {
  constructor(private readonly updateUserProfile: UpdateUserProfileUseCase) {}

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

  public getUser = (req: Request, res: Response) => {
    res
      .status(StatusCodes.OK)
      .json(ResponseFormat.success<{ user: IUser }>({ user: req.user }));
    return;
  };

  public updateProfile = (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id && id !== req.user.id) {
      res.status(StatusCodes.UNAUTHORIZED).json(
        ResponseFormat.error(ReasonPhrases.UNAUTHORIZED, {
          error: 'Unauthorized',
        })
      );
      return;
    }
    const [errors, updateUserProfileDto] = UpdateUserProfileDto.validate({
      ...req.body,
      id,
    });

    if (errors) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          ResponseFormat.error(ReasonPhrases.BAD_REQUEST, { error: errors })
        );
      return;
    }

    this.updateUserProfile
      .execute(updateUserProfileDto)
      .then(() =>
        res
          .status(StatusCodes.OK)
          .json(
            ResponseFormat.success<null>(
              null,
              'User profile updated successfully'
            )
          )
      )
      .catch((error) => this.handleErrors(res, error));
  };

  public uploadImage = (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id && id !== req.user.id) {
      res.status(StatusCodes.UNAUTHORIZED).json(
        ResponseFormat.error(ReasonPhrases.UNAUTHORIZED, {
          error: 'Unauthorized',
        })
      );
      return;
    }
    res.status(StatusCodes.OK).json(ResponseFormat.success<null>(null));
    // this.uploadUserProfileImage
    //   .execute({ id, image: req.file })
  };
}
