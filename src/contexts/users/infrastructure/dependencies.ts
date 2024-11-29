import { CreateUserUseCase } from '../application/use-cases';
import { UserMongoDbDatasource } from './datasources/aws/mongodb/user-mongodb.datasource';
import { UserRepositoryImp } from './repositories';

const userRepository = new UserRepositoryImp(new UserMongoDbDatasource());
const createUserUseCase = new CreateUserUseCase(userRepository);

export { createUserUseCase };
