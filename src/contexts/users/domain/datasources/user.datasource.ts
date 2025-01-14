import { DataToRegister } from '@src/contexts/iam/authentication/domain';
import {
  DataToUpdateUserProfile,
  UserEntity,
} from '@src/contexts/users/domain';

export abstract class UserDatasource {
  abstract create(data: DataToRegister): Promise<void>;
  abstract findById(id: string): Promise<UserEntity | null>;
  abstract findByEmailWithPassword(email: string): Promise<UserEntity>;
  abstract findByNickname(nickname: string): Promise<UserEntity>;
  abstract findAll(): Promise<UserEntity[]>;
  abstract updateUserProfile(
    data: DataToUpdateUserProfile
  ): Promise<UserEntity>;
  abstract searchNickname(nickname: string): Promise<string>;
}
