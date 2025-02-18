import 'reflect-metadata';

import userFactory from 'tests/factories/user.factory';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { InvalidCredentialsError, ResourceNotFoundError } from '@/application/errors';
import { container } from '@/config/container';
import { SignInUseCase } from '@/use-cases/users/sign-in.usecase';

describe('SignInUseCase', () => {
  let signInUseCase: SignInUseCase;
  const userRepository = { findByEmail: vi.fn() };
  const securityProvider = { compareHash: vi.fn() };
  const webTokenProvider = { sign: vi.fn() };

  beforeEach(() => {
    vi.resetAllMocks();
    container.registerInstance('UserRepository', userRepository);
    container.registerInstance('SecurityProvider', securityProvider);
    container.registerInstance('WebTokenProvider', webTokenProvider);
    signInUseCase = container.resolve<SignInUseCase>('SignInUseCase');
  });

  it('should fail if user not found', async () => {
    const user = userFactory.generateUser();
    userRepository.findByEmail.mockResolvedValue(null);

    await expect(signInUseCase.execute(user)).rejects.toThrow(ResourceNotFoundError);
  });

  it('should fail if password is invalid', async () => {
    const user = userFactory.generateUser();
    userRepository.findByEmail.mockResolvedValue(user);
    securityProvider.compareHash.mockResolvedValue(false);

    await expect(signInUseCase.execute(user)).rejects.toThrow(InvalidCredentialsError);
  });

  it('should be able to sign in', async () => {
    const user = userFactory.generateUser();
    userRepository.findByEmail.mockResolvedValue(user);
    securityProvider.compareHash.mockResolvedValue(true);
    webTokenProvider.sign.mockResolvedValue('token');

    const signInResponse = await signInUseCase.execute(user);
    expect(signInResponse).toEqual({ token: 'token', user });
  });
});
