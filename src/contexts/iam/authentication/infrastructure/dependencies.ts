// Instances
import { userRepository } from '@contexts/users/infrastructure/dependencies';
// Classes
import { HashingBcryptService } from '@contexts/iam/authentication/infrastructure/services';
import { RegisterUserUseCase } from '@contexts/iam/authentication/application';
import { AuthenticationController } from '@contexts/iam/authentication/infrastructure/rest-api/controllers';

const hashingService = new HashingBcryptService();
const registerUserUseCase = new RegisterUserUseCase(
  userRepository,
  hashingService
);

const authenticationController = new AuthenticationController(
  registerUserUseCase
);

export { authenticationController };
