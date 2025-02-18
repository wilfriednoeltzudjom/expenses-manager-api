import { inject, injectable } from 'tsyringe';

import { ResourceNotFoundError } from '@/application/errors';
import { USER_NOT_FOUND } from '@/application/messages/user.messages';
import { UserRepository } from '@/domain/repositories/user.repository';

@injectable()
export class GetUserUseCase {
  constructor(@inject('UserRepository') private userRepository: UserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new ResourceNotFoundError(USER_NOT_FOUND());
    }

    return user;
  }
}
