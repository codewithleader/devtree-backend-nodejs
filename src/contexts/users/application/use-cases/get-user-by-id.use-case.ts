import { UserEntity, UserRepository } from '@contexts/users/domain';

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);
    delete user.password;
    return user;
  }
}
