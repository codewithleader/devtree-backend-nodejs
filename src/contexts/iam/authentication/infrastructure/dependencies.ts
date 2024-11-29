import { createUserUseCase } from '@contexts/users/infrastructure/dependencies';
import { AuthenticationController } from '@contexts/iam/authentication/infrastructure/rest-api/controllers';
import { HashingBcryptService } from '@contexts/iam/authentication/infrastructure/services';

const hashingService = new HashingBcryptService();

const authenticationController = new AuthenticationController(
  createUserUseCase,
  hashingService
);

export { authenticationController };
