import { container } from 'tsyringe';

import { AIPlatformProvider } from '@/application/providers/ai.provider';
import { SecurityProvider } from '@/application/providers/security.provider';
import { WebTokenProvider } from '@/application/providers/webtoken.provider';
import { AuthController } from '@/controllers/auth.controller';
import { BcryptProvider } from '@/infrastructure/providers/bcrypt.provider';
import { JsonWebTokenProvider } from '@/infrastructure/providers/jsonwebtoken.provider';
import { OpenAIProvider } from '@/infrastructure/providers/openai.provider';
import { GetUserUseCase } from '@/use-cases/users/get-user.usecase';
import { SignInUseCase } from '@/use-cases/users/sign-in.usecase';
import { SignUpUseCase } from '@/use-cases/users/sign-up.usecase';

// Use Cases
container.registerSingleton<SignInUseCase>('SignInUseCase', SignInUseCase);
container.registerSingleton<SignUpUseCase>('SignUpUseCase', SignUpUseCase);
container.registerSingleton<GetUserUseCase>('GetUserUseCase', GetUserUseCase);

// Controllers
container.registerSingleton<AuthController>('AuthController', AuthController);

// Providers
container.registerSingleton<SecurityProvider>('SecurityProvider', BcryptProvider);
container.registerSingleton<WebTokenProvider>('WebTokenProvider', JsonWebTokenProvider);
container.registerSingleton<AIPlatformProvider>('AIPlatformProvider', OpenAIProvider);

export { container };
