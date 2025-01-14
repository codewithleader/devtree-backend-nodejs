import { ReasonPhrases, StatusCodes } from 'http-status-codes';
//
import { CustomError } from '@shared/errors/domain';
import { UserRepository } from '@contexts/users/domain';

export class SearchNicknameUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(nickname: string): Promise<string> {
    try {
      return await this.userRepository.searchNickname(nickname);
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
