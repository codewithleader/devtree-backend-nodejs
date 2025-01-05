import type { Request, Response } from 'express';
import colors from 'colors';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
//
import { CustomError } from '@shared/errors/domain';
import { ResponseFormat } from '@shared/utils';
import { DataToUpdateUserProfile, UserEntity } from '@contexts/users/domain';
import { UpdateMyUserProfileUseCase } from '@contexts/users/application';
import {
  DeleteImageUseCase,
  UploadImageUseCase,
} from '@contexts/media/application';

export class UserController {
  constructor(
    private readonly updateMyUserProfile: UpdateMyUserProfileUseCase,
    private readonly uploadImageUseCase: UploadImageUseCase,
    private readonly deleteImageUseCase: DeleteImageUseCase
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

  public getMyUser = (req: Request, res: Response) => {
    res
      .status(StatusCodes.OK)
      .json(ResponseFormat.success<{ user: UserEntity }>({ user: req.user }));
    return;
  };

  public updateMyProfile = async (req: Request, res: Response) => {
    const id = req.user.id;
    let imageUrl: string = req.user.imageUrl;
    let imagePublicId: string = req.user.imagePublicId;

    if (req.files && req.files.file) {
      // Delete previous image
      if (imageUrl && imagePublicId) {
        this.deleteImageUseCase.execute(imagePublicId);
      }

      // Upload image
      const filePath = req.files.file[0].filepath;
      const uploadedImage = await this.uploadImageUseCase.execute(filePath);

      imageUrl = uploadedImage.url;
      imagePublicId = uploadedImage.publicId;
    }

    const dataToUpdateUserProfile: DataToUpdateUserProfile = {
      ...req.body, // nickname and bio HERE!
      id,
      imageUrl,
      imagePublicId,
    };

    this.updateMyUserProfile
      .execute(dataToUpdateUserProfile)
      .then((data) =>
        res
          .status(StatusCodes.OK)
          .json(
            ResponseFormat.success<{ user: UserEntity }>(
              { user: data },
              'User profile updated successfully'
            )
          )
      )
      .catch((error) => this.handleErrors(res, error));
  };
}
