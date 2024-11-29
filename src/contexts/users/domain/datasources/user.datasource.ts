import { UserEntity } from '../entities/user.entity';

export abstract class UserDatasource {
  abstract save(data: UserEntity): Promise<void>;
  abstract findById(id: string): Promise<UserEntity>;
  abstract findByEmail(email: string): Promise<UserEntity>;
  abstract findAll(): Promise<UserEntity[]>;
  abstract update(data: UserEntity): Promise<void>;
}
