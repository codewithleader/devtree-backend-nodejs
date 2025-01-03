import { UpdateMyUserProfileDto } from '@src/contexts/users/application';
import { UserEntity } from '@src/contexts/users/domain';

export abstract class UserDatasource {
  abstract save(data: UserEntity): Promise<void>;
  abstract findById(id: string): Promise<UserEntity | null>;
  abstract findByEmail(email: string): Promise<UserEntity>;
  abstract findAll(): Promise<UserEntity[]>;
  abstract updateUserProfile(data: UpdateMyUserProfileDto): Promise<UserEntity>;
}
