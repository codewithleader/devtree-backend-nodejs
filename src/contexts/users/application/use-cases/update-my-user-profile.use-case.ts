import { ReasonPhrases, StatusCodes } from 'http-status-codes';
//
import { CustomError } from '@shared/errors/domain';
import { SlugService } from '@shared/services/domain';
import {
  DataToUpdateUserProfile,
  UserEntity,
  UserRepository,
} from '@contexts/users/domain';

export class UpdateMyUserProfileUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly slugService: SlugService
  ) {}

  async execute(data: DataToUpdateUserProfile): Promise<UserEntity> {
    try {
      const nicknameSlug = await this.slugService.generateSlug(data.nickname);

      return await this.userRepository.updateUserProfile({
        ...data,
        nickname: nicknameSlug,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        throw new CustomError(error.message, error.statusCode);
      }
      // console.log(error);
      throw new CustomError(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
