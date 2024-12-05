import { UserEntity, UserRepository } from '@contexts/users/domain';
import { HashingService } from '@src/contexts/iam/authentication/domain';

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(data: UserEntity): Promise<void> {
    const newUser = new UserEntity(data);
    return await this.userRepository.save(newUser);
  }
}
