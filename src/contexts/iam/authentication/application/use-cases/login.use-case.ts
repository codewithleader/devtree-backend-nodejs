import { UserEntity, UserRepository } from '@contexts/users/domain';
import { HashingService } from '@contexts/iam/authentication/domain';
import { LoginUserDto } from '@contexts/iam/authentication/application';
import { CustomError } from '@src/contexts/shared/errors/domain';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export class LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashingService: HashingService
  ) {}

  async execute(data: LoginUserDto): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findByEmail(data.email);
      if (!user) {
        throw new CustomError(
          ReasonPhrases.BAD_REQUEST,
          StatusCodes.BAD_REQUEST
        );
      }
      const isPasswordValid = await this.hashingService.compare(
        data.password,
        user.password
      );
      if (!isPasswordValid) {
        throw new CustomError(
          ReasonPhrases.BAD_REQUEST,
          StatusCodes.BAD_REQUEST
        );
      }

      delete user.password;
      return user;
    } catch (error) {
      if (error instanceof CustomError) {
        throw new CustomError(error.message, error.statusCode);
      }
      throw new CustomError(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
