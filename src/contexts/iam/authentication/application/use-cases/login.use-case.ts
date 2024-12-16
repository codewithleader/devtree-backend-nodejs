import { UserEntity, UserRepository } from '@contexts/users/domain';
import {
  HashingService,
  TokenService,
} from '@contexts/iam/authentication/domain';
import { LoginUserDto } from '@contexts/iam/authentication/application';
import { CustomError } from '@src/contexts/shared/errors/domain';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export class LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashingService: HashingService,
    private readonly tokenService: TokenService
  ) {}

  async execute(
    data: LoginUserDto
  ): Promise<{ user: UserEntity; token: string }> {
    try {
      const user = await this.userRepository.findByEmail(data.email);
      if (!user) {
        throw new CustomError(
          `${ReasonPhrases.UNAUTHORIZED}: Invalid email or password`,
          StatusCodes.UNAUTHORIZED
        );
      }
      const isPasswordValid = await this.hashingService.compare(
        data.password,
        user.password
      );
      if (!isPasswordValid) {
        throw new CustomError(
          `${ReasonPhrases.UNAUTHORIZED}: Invalid email or password`,
          StatusCodes.UNAUTHORIZED
        );
      }
      delete user.password;

      // El Payload debe ser un objeto plano y no una Entity (UserEntity en este caso)
      // La solución es esparcir las propiedades de la Entidad dentro de los corchetes {...user}
      const token = this.tokenService.generateToken({ ...user }, '180d');

      return { user, token };
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
