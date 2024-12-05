import {
  CreateUserUseCase,
  FindByEmailUserUseCase,
} from '@contexts/users/application/use-cases';
import { UserMongoDbDatasource } from '@contexts/users/infrastructure/datasources/aws/mongodb/user-mongodb.datasource';
import { UserRepositoryImp } from './repositories';

const dataSource = new UserMongoDbDatasource();
const userRepository = new UserRepositoryImp(dataSource);
const createUserUseCase = new CreateUserUseCase(userRepository);
const findUserByEmailUseCase = new FindByEmailUserUseCase(userRepository);

export { createUserUseCase, findUserByEmailUseCase };
