import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
  abstract save(data: UserEntity): Promise<void>;
  abstract findById(id: string): Promise<UserEntity | null>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract findAll(): Promise<UserEntity[]>;
  abstract update(data: UserEntity): Promise<void>;
}
