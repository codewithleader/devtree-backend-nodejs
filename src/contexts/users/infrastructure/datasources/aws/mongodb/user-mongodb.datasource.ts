import { UserDatasource, UserEntity } from '@contexts/users/domain';
import User from './models';
import colors from 'colors';

export class UserMongoDbDatasource implements UserDatasource {
  async save(data: UserEntity): Promise<void> {
    const newUser = new User(data);
    await newUser.save();
    console.log(colors.green.bold(`Create User: ${newUser}`));
  }

  async findById(id: string): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }

  async findByEmail(email: string): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }

  async update(data: UserEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
