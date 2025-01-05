import {
  DataToUpdateUserProfile,
  UserDatasource,
  UserEntity,
  UserRepository,
} from '@contexts/users/domain';
import { DataToRegister } from '@contexts/iam/authentication/domain';

export class UserRepositoryImp implements UserRepository {
  constructor(private readonly datasource: UserDatasource) {}

  async create(data: DataToRegister): Promise<void> {
    return await this.datasource.create(data);
  }

  async findById(id: string): Promise<UserEntity | null> {
    return await this.datasource.findById(id);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.datasource.findByEmail(email);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.datasource.findAll();
  }

  async updateUserProfile(data: DataToUpdateUserProfile): Promise<UserEntity> {
    return await this.datasource.updateUserProfile(data);
  }
}
