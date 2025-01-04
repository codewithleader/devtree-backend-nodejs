import { UserMongoDbDatasource } from '@contexts/users/infrastructure/datasources';
import { UserRepositoryImp } from '@contexts/users/infrastructure/repositories';
import { UserController } from '@contexts/users/infrastructure/rest-api/controllers';
import { UpdateMyUserProfileUseCase } from '@contexts/users/application';
import { SharedDependencyFactory } from '@shared/dependencies';
import { MediaDependencyFactory } from '@src/contexts/media/infrastructure/dependencies';

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
const updateMyUserProfile = new UpdateMyUserProfileUseCase(
  userRepository,
  slugService
);

const uploadImage = MediaDependencyFactory.getUploadImageUseCase();
const deleteImage = MediaDependencyFactory.getDeleteImageUseCase();

const userController = new UserController(
  updateMyUserProfile,
  uploadImage,
  deleteImage
);

export { UserDependencyFactory, userController };
