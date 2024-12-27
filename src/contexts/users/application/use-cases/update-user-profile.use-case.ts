import { ReasonPhrases, StatusCodes } from 'http-status-codes';
//
import { CustomError } from '@shared/errors/domain';
import { SlugService } from '@shared/services/domain';
import { UserRepository } from '@contexts/users/domain';
import { UpdateUserProfileDto } from '@contexts/users/application';

export class UpdateUserProfileUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly slugService: SlugService
  ) {}

  async execute(data: UpdateUserProfileDto): Promise<void> {
    try {
      const nicknameSlug = await this.slugService.generateSlug(data.nickname);
      await this.userRepository.updateUserProfile({
        ...data,
        nickname: nicknameSlug,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        throw new CustomError(error.message, error.statusCode);
      }
      console.log(error);
      throw new CustomError(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
