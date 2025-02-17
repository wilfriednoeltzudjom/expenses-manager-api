import { container } from 'tsyringe';

import { SecurityProvider } from '@/application/providers/security.provider';
import { WebTokenProvider } from '@/application/providers/webtoken.provider';
import { BcryptProvider } from '@/infrastructure/providers/bcrypt.provider';
import { JsonWebTokenProvider } from '@/infrastructure/providers/jsonwebtoken.provider';
import { SignInUseCase } from '@/use-cases/users/sign-in.usecase';
import { SignUpUseCase } from '@/use-cases/users/sign-up.usecase';

// Use Cases
container.registerSingleton<SignInUseCase>('SignInUseCase', SignInUseCase);
container.registerSingleton<SignUpUseCase>('SignUpUseCase', SignUpUseCase);

// Providers
container.registerSingleton<SecurityProvider>('SecurityProvider', BcryptProvider);
container.registerSingleton<WebTokenProvider>('WebTokenProvider', JsonWebTokenProvider);

export { container };
