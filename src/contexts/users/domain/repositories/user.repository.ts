import { DataToRegister } from '@contexts/iam/authentication/domain';
import {
  DataToUpdateUserProfile,
  UserEntity,
} from '@src/contexts/users/domain';

export abstract class UserRepository {
  abstract create(data: DataToRegister): Promise<void>;
  abstract findById(id: string): Promise<UserEntity | null>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract findAll(): Promise<UserEntity[]>;
  abstract updateUserProfile(
    data: DataToUpdateUserProfile
  ): Promise<UserEntity>;
}
