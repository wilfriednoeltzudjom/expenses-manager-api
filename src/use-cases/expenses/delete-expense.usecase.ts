import { inject, injectable } from 'tsyringe';

import { ExpenseRepository } from '@/domain/repositories/expense.repository';

@injectable()
export class DeleteExpenseUseCase {
  constructor(@inject('ExpenseRepository') private expenseRepository: ExpenseRepository) {}

  async execute(id: string) {
    await this.expenseRepository.delete(id);
  }
}
