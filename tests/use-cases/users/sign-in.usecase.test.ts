import 'reflect-metadata';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ResourceNotFoundError } from '@/application/errors';
import { SecurityProvider } from '@/application/providers/security.provider';
import { WebTokenProvider } from '@/application/providers/webtoken.provider';
import { container } from '@/config/container';
import { UserRepository } from '@/domain/repositories/user.repository';
import { SignInUseCase } from '@/use-cases/users/sign-in.usecase';

describe('SignInUseCase', () => {
  const userRepository: Partial<UserRepository> = { create: vi.fn() };
  const securityProvider: Partial<SecurityProvider> = { compareHash: vi.fn() };
  const webTokenProvider: Partial<WebTokenProvider> = { sign: vi.fn() };
  const signInUseCase = container.resolve<SignInUseCase>('SignInUseCase');

  beforeEach(function () {
    container.registerInstance('UserRepository', userRepository);
    container.registerInstance('SecurityProvider', securityProvider);
    container.registerInstance('WebTokenProvider', webTokenProvider);
  });

  it('should fail if user not found', async () => {
    await expect(signInUseCase.execute({ email: 'test@test.com', password: '123456' })).rejects.toThrow(ResourceNotFoundError);
  });

  it('should fail if password is invalid', () => {});

  it('should be able to sign in', () => {});
});
