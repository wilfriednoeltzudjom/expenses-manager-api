import { inject, injectable } from 'tsyringe';

import { Expense } from '@/domain/entities/expense';
import { ExpenseRepository } from '@/domain/repositories/expense.repository';

@injectable()
export class GetUserExpensesUseCase {
  constructor(@inject('ExpenseRepository') private expenseRepository: ExpenseRepository) {}

  async execute(userId: string): Promise<Expense[]> {
    return this.expenseRepository.findByUserId(userId);
  }
}
