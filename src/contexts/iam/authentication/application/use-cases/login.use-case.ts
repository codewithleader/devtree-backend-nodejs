import { UserRepository } from '@contexts/users/domain';
import {
  DataToLogin,
  HashingService,
  TokenService,
} from '@contexts/iam/authentication/domain';
import { CustomError } from '@shared/errors/domain';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export class LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashingService: HashingService,
    private readonly tokenService: TokenService
  ) {}

  async execute(data: DataToLogin): Promise<{ token: string }> {
    try {
      const user = await this.userRepository.findByEmailWithPassword(
        data.email
      );
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

      // El Payload debe ser un objeto plano y no una Entity (UserEntity en este caso)
      // La solución es esparcir las propiedades de la Entidad dentro de los corchetes {...user} (Actualmente no se hace, solo se pasa el id)
      const token = this.tokenService.generateToken({ id: user.id }, '180d');

      return { token };
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
