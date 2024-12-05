import { FindByEmailUserUseCase } from '@src/contexts/users/application';
import { UserMongoDbDatasource } from '@contexts/users/infrastructure/datasources/aws/mongodb/user-mongodb.datasource';
import { UserRepositoryImp } from './repositories';

const dataSource = new UserMongoDbDatasource();
const userRepository = new UserRepositoryImp(dataSource);
const findUserByEmailUseCase = new FindByEmailUserUseCase(userRepository);

export { userRepository, findUserByEmailUseCase };
