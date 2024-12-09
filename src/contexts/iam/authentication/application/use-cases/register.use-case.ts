import { UserEntity, UserRepository } from '@contexts/users/domain';
import {
  HashingService,
  SlugService,
} from '@src/contexts/iam/authentication/domain';

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashingService: HashingService,
    private readonly slugService: SlugService
  ) {}
  async execute(data: UserEntity): Promise<void> {
    // Generate slug
    data.nickname = await this.slugService.generateSlug(data.nickname);
    // Hashing password
    data.password = await this.hashingService.hash(data.password);
    // Save new user
    return await this.userRepository.save(data);
  }
}
