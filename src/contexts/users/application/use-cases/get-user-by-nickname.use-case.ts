import { UserEntity, UserRepository } from '@contexts/users/domain';
import { CustomError } from '@shared/errors/domain';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export class GetUserByNicknameUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(nickname: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findByNickname(nickname);
      delete user.id;
      return user;
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
