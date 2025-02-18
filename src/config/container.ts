import { container } from 'tsyringe';

import { AIPlatformProvider } from '@/application/providers/ai.provider';
import { SecurityProvider } from '@/application/providers/security.provider';
import { WebTokenProvider } from '@/application/providers/webtoken.provider';
import { AuthController } from '@/controllers/auth.controller';
import { ExpensesController } from '@/controllers/expenses.controller';
import { BcryptProvider } from '@/infrastructure/providers/bcrypt.provider';
import { JsonWebTokenProvider } from '@/infrastructure/providers/jsonwebtoken.provider';
import { OpenAIProvider } from '@/infrastructure/providers/openai.provider';
import { CreateExpenseUseCase } from '@/use-cases/expenses/create-expense.usecase';
import { DeleteExpenseUseCase } from '@/use-cases/expenses/delete-expense.usecase';
import { GetUserExpensesUseCase } from '@/use-cases/expenses/get-user-expenses.usecase';
import { GetUserUseCase } from '@/use-cases/users/get-user.usecase';
import { SignInUseCase } from '@/use-cases/users/sign-in.usecase';
import { SignUpUseCase } from '@/use-cases/users/sign-up.usecase';

// Use Cases
container.registerSingleton<SignInUseCase>('SignInUseCase', SignInUseCase);
container.registerSingleton<SignUpUseCase>('SignUpUseCase', SignUpUseCase);
container.registerSingleton<GetUserUseCase>('GetUserUseCase', GetUserUseCase);

container.registerSingleton<CreateExpenseUseCase>('CreateExpenseUseCase', CreateExpenseUseCase);
container.registerSingleton<GetUserExpensesUseCase>('GetUserExpensesUseCase', GetUserExpensesUseCase);
container.registerSingleton<DeleteExpenseUseCase>('DeleteExpenseUseCase', DeleteExpenseUseCase);

// Controllers
container.registerSingleton<AuthController>('AuthController', AuthController);
container.registerSingleton<ExpensesController>('ExpensesController', ExpensesController);

// Providers
container.registerSingleton<SecurityProvider>('SecurityProvider', BcryptProvider);
container.registerSingleton<WebTokenProvider>('WebTokenProvider', JsonWebTokenProvider);
container.registerSingleton<AIPlatformProvider>('AIPlatformProvider', OpenAIProvider);

export { container };
