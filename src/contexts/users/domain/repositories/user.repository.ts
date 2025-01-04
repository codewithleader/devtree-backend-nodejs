import { UserEntity } from '@src/contexts/users/domain';

export abstract class UserRepository {
  abstract save(user: UserEntity): Promise<void>;
  abstract findById(id: string): Promise<UserEntity | null>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract findAll(): Promise<UserEntity[]>;
  abstract updateUserProfile(user: UserEntity): Promise<UserEntity>;
}
