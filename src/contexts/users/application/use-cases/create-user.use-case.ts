import { UserEntity, UserRepository } from '@contexts/users/domain';

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(data: UserEntity) {
    const newUser = new UserEntity(data);
    await this.userRepository.save(newUser);
  }
}
