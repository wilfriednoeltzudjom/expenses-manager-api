import { Expense } from '@/domain/entities/expense';

export interface AIPlatformProvider {
  guessExpenseCategory(expense: Expense): Promise<string>;
}
