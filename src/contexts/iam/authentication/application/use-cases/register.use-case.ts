import { UserRepository } from '@contexts/users/domain';
import { HashingService } from '@contexts/iam/authentication/domain';
import { RegisterUserDto } from '@contexts/iam/authentication/application';
import { SlugService } from '@shared/services/domain';

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashingService: HashingService,
    private readonly slugService: SlugService
  ) {}
  async execute(data: RegisterUserDto): Promise<void> {
    // Generate slug
    const nicknameSlug = await this.slugService.generateSlug(data.nickname);
    // Hashing password
    const hashedPassword = await this.hashingService.hash(data.password);
    // Save new user
    return await this.userRepository.save({
      ...data,
      nickname: nicknameSlug,
      password: hashedPassword,
    });
  }
}
