import { envs } from '@src/app/config';
// Instances
import { userRepository } from '@contexts/users/infrastructure/dependencies';
// Classes
import {
  HashingBcryptService,
  TokenJwtService,
  SlugSlugService,
} from '@contexts/iam/authentication/infrastructure/services';
import {
  LoginUserUseCase,
  RegisterUserUseCase,
} from '@contexts/iam/authentication/application';
import { AuthenticationController } from '@contexts/iam/authentication/infrastructure/rest-api/controllers';

const hashingService = new HashingBcryptService();
const tokenService = new TokenJwtService(envs.JWT_SECRET);
const slugService = new SlugSlugService();
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

export { authenticationController, tokenService };
