import { UpdateUserProfileDto } from '@src/contexts/users/application';
import { UserEntity } from '@src/contexts/users/domain';

export abstract class UserRepository {
  abstract save(data: UserEntity): Promise<void>;
  abstract findById(id: string): Promise<UserEntity | null>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract findAll(): Promise<UserEntity[]>;
  abstract updateUserProfile(data: UpdateUserProfileDto): Promise<UserEntity>;
}
