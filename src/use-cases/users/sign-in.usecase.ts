import { inject, injectable } from 'tsyringe';

import { SignInDto } from '@/application/dtos/users/sign-in.dto';
import { SignInResponseDto } from '@/application/dtos/users/sign-in-response.dto';
import { ResourceNotFoundError, UnauthorizedError } from '@/application/errors';
import { INVALID_CREDENTIALS, USER_NOT_FOUND } from '@/application/messages/user.messages';
import { SecurityProvider } from '@/application/providers/security.provider';
import { WebTokenProvider } from '@/application/providers/webtoken.provider';
import { WEB_TOKEN_EXPIRATION_TIME } from '@/config/constants';
import { UserRepository } from '@/domain/repositories/user.repository';

@injectable()
export class SignInUseCase {
  constructor(
    @inject('UserRepository') private userRepository: UserRepository,
    @inject('SecurityProvider') private securityProvider: SecurityProvider,
    @inject('WebTokenProvider') private webTokenProvider: WebTokenProvider,
  ) {}

  async execute({ email, password }: SignInDto): Promise<SignInResponseDto> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new ResourceNotFoundError(USER_NOT_FOUND());
    }

    const isPasswordValid = await this.securityProvider.compareHash(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError(INVALID_CREDENTIALS());
    }

    const token = await this.webTokenProvider.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: WEB_TOKEN_EXPIRATION_TIME });

    return { token, user };
  }
}
