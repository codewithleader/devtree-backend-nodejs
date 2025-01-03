import {
  UserDatasource,
  UserEntity,
  UserRepository,
} from '@contexts/users/domain';
import { UpdateUserProfileDto } from '@contexts/users/application';

export class UserRepositoryImp implements UserRepository {
  constructor(private readonly datasource: UserDatasource) {}

  async save(data: UserEntity): Promise<void> {
    return await this.datasource.save(data);
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

  async updateUserProfile(data: UpdateUserProfileDto): Promise<UserEntity> {
    return await this.datasource.updateUserProfile(data);
  }
}
