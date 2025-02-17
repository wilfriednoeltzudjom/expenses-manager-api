import { inject, injectable } from 'tsyringe';

import { SignUpDto } from '@/application/dtos/users/sign-up.dto';
import { ResourceNotFoundError } from '@/application/errors';
import { USER_ALREADY_EXISTS } from '@/application/messages/user.messages';
import { SecurityProvider } from '@/application/providers/security.provider';
import { User } from '@/domain/entities/user';
import { UserRepository } from '@/domain/repositories/user.repository';

@injectable()
export class SignUpUseCase {
  constructor(
    @inject('UserRepository') private userRepository: UserRepository,
    @inject('SecurityProvider') private securityProvider: SecurityProvider,
  ) {}

  async execute({ lastName, firstName, email, password }: SignUpDto): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new ResourceNotFoundError(USER_ALREADY_EXISTS());
    }

    const passwordHash = await this.securityProvider.hash(password);

    return this.userRepository.create(User.create({ lastName, firstName, email, password: passwordHash }));
  }
}
