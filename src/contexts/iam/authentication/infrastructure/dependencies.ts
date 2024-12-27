import { envs } from '@src/app/config';
// Instances
import { UserDependencyFactory } from '@contexts/users/infrastructure/dependencies';
// Classes
import {
  HashingBcryptService,
  TokenJwtService,
} from '@contexts/iam/authentication/infrastructure/services';
import {
  LoginUserUseCase,
  RegisterUserUseCase,
} from '@contexts/iam/authentication/application';
import { AuthenticationController } from '@contexts/iam/authentication/infrastructure/rest-api/controllers';
import { SharedDependencyFactory } from '@src/contexts/shared/dependencies';

class AuthDependencyFactory {
  static tokenService: TokenJwtService;
  static secretKey: string = envs.JWT_SECRET;

  static getTokenService(): TokenJwtService {
    if (!this.tokenService) {
      this.tokenService = new TokenJwtService(this.secretKey);
    }
    return this.tokenService;
  }
}

const hashingService = new HashingBcryptService();
const tokenService = AuthDependencyFactory.getTokenService();
const slugService = SharedDependencyFactory.getSlugService();
const userRepository = UserDependencyFactory.getUserRepository();

const registerUserUseCase = new RegisterUserUseCase(
  userRepository,
  hashingService,
  slugService
);
const loginUserUseCase = new LoginUserUseCase(
  userRepository,
  hashingService,
  tokenService
);
const authenticationController = new AuthenticationController(
  registerUserUseCase,
  loginUserUseCase
);

export { authenticationController, AuthDependencyFactory };
