import { UserEntity, UserRepository } from '@contexts/users/domain';
import { CustomError } from '@src/contexts/shared/errors/domain';
import { StatusCodes } from 'http-status-codes';

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new CustomError('User not found', StatusCodes.NOT_FOUND);
    }
    return user;
  }
}
