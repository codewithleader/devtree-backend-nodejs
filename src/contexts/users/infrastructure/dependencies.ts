import {
  // FindUserByEmailUseCase,
  GetUserByIdUseCase,
} from '@src/contexts/users/application';
import { UserMongoDbDatasource } from '@contexts/users/infrastructure/datasources/aws/mongodb/user-mongodb.datasource';
import { UserRepositoryImp } from './repositories';
import { UserController } from './rest-api/controllers';

const dataSource = new UserMongoDbDatasource();
const userRepository = new UserRepositoryImp(dataSource);
// const findUserByEmailUseCase = new FindUserByEmailUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);

const userController = new UserController(getUserByIdUseCase);

export { userRepository, userController };
