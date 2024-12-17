import { UserEntity, UserRepository } from '@contexts/users/domain';

export class FindUserByEmailUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(email: string): Promise<UserEntity> {
    return await this.userRepository.findByEmail(email);
  }
}
