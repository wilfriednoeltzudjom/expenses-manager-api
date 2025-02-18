import 'reflect-metadata';

import userFactory from 'tests/factories/user.factory';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { BadRequestError } from '@/application/errors';
import { container } from '@/config/container';
import { SignUpUseCase } from '@/use-cases/users/sign-up.usecase';

describe('SignUpUseCase', () => {
  let signUpUseCase: SignUpUseCase;
  const userRepository = { create: vi.fn(), findByEmail: vi.fn() };
  const securityProvider = { hash: vi.fn() };

  beforeEach(() => {
    vi.resetAllMocks();
    container.registerInstance('UserRepository', userRepository);
    container.registerInstance('SecurityProvider', securityProvider);
    signUpUseCase = container.resolve<SignUpUseCase>('SignUpUseCase');
  });

  it('should fail if user already exists', async () => {
    const user = userFactory.generateUser();
    userRepository.findByEmail.mockResolvedValue(user);

    await expect(signUpUseCase.execute({ ...user, confirmPassword: user.password })).rejects.toThrow(BadRequestError);
  });

  it('should be able to sign up', async () => {
    const user = userFactory.generateUser();
    securityProvider.hash.mockResolvedValue('securePassword');
    userRepository.create.mockImplementation((unregisteredUser) => unregisteredUser);

    const registeredUser = await signUpUseCase.execute({ ...user, confirmPassword: user.password });
    expect(userRepository.create).toHaveBeenCalled();
    expect(registeredUser.password).toEqual('securePassword');
  });
});
