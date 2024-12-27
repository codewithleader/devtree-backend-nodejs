import { UserMongoDbDatasource } from '@contexts/users/infrastructure/datasources/aws/mongodb/user-mongodb.datasource';
import { UserRepositoryImp } from '@contexts/users/infrastructure/repositories';
import { UserController } from '@contexts/users/infrastructure/rest-api/controllers';
import { UpdateUserProfileUseCase } from '@contexts/users/application';
import { SharedDependencyFactory } from '@shared/dependencies';

class UserDependencyFactory {
  static userRepository: UserRepositoryImp;
  static dataSource: UserMongoDbDatasource = new UserMongoDbDatasource();

  static getUserRepository(): UserRepositoryImp {
    if (!this.userRepository) {
      this.userRepository = new UserRepositoryImp(this.dataSource);
    }
    return this.userRepository;
  }
}

const userRepository = UserDependencyFactory.getUserRepository();
const slugService = SharedDependencyFactory.getSlugService();
const updateUserProfile = new UpdateUserProfileUseCase(
  userRepository,
  slugService
);

const userController = new UserController(updateUserProfile);

export { UserDependencyFactory, userController };
