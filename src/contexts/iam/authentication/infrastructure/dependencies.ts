// Instances
import { userRepository } from '@contexts/users/infrastructure/dependencies';
// Classes
import {
  HashingBcryptService,
  SlugSlugService,
} from '@contexts/iam/authentication/infrastructure/services';
import {
  LoginUserUseCase,
  RegisterUserUseCase,
} from '@contexts/iam/authentication/application';
import { AuthenticationController } from '@contexts/iam/authentication/infrastructure/rest-api/controllers';

const hashingService = new HashingBcryptService();
const slugService = new SlugSlugService();
const registerUserUseCase = new RegisterUserUseCase(
  userRepository,
  hashingService,
  slugService
);
const loginUserUseCase = new LoginUserUseCase(userRepository, hashingService);

const authenticationController = new AuthenticationController(
  registerUserUseCase,
  loginUserUseCase
);

export { authenticationController };
