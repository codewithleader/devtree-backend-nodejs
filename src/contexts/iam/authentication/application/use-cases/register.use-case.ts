import { UserRepository } from '@contexts/users/domain';
import {
  DataToRegister,
  HashingService,
} from '@contexts/iam/authentication/domain';
import { SlugService } from '@shared/services/domain';

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashingService: HashingService,
    private readonly slugService: SlugService
  ) {}
  async execute(data: DataToRegister): Promise<void> {
    // Generate slug
    const nicknameSlug = await this.slugService.generateSlug(data.nickname);
    // Hashing password
    const hashedPassword = await this.hashingService.hash(data.password);
    // Save new user
    return await this.userRepository.create({
      ...data,
      nickname: nicknameSlug,
      password: hashedPassword,
    });
  }
}
