import { UserEntity, UserRepository } from '@contexts/users/domain';
import { HashingService } from '@src/contexts/iam/authentication/domain';

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashingService: HashingService
  ) {}
  async execute(data: UserEntity): Promise<void> {
    // Hashing password
    data.password = await this.hashingService.hash(data.password);
    // Save new user
    return await this.userRepository.save(data);
  }
}
