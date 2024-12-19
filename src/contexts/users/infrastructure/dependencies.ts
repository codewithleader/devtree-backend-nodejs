import { UserMongoDbDatasource } from '@contexts/users/infrastructure/datasources/aws/mongodb/user-mongodb.datasource';
import { UserRepositoryImp } from './repositories';
import { UserController } from './rest-api/controllers';

const dataSource = new UserMongoDbDatasource();
const userRepository = new UserRepositoryImp(dataSource);

const userController = new UserController();

export { userRepository, userController };
