import { inject, injectable } from 'tsyringe';

import { CreateExpenseDto } from '@/application/dtos/expenses/create-expense.dto';
import { AIPlatformProvider } from '@/application/providers/ai.provider';
import { MISCELLANEOUS_CATEGORY } from '@/config/constants';
import { Category } from '@/domain/entities/category';
import { Expense } from '@/domain/entities/expense';
import { CategoryRepository } from '@/domain/repositories/category.repository';
import { ExpenseRepository } from '@/domain/repositories/expense.repository';

import { GetUserUseCase } from '../users/get-user.usecase';

@injectable()
export class CreateExpenseUseCase {
  constructor(
    @inject('ExpenseRepository') private expenseRepository: ExpenseRepository,
    @inject('CategoryRepository') private categoryRepository: CategoryRepository,
    @inject('GetUserUseCase') private getUserUseCase: GetUserUseCase,
    @inject('AIPlatformProvider') private aiPlatformProvider: AIPlatformProvider,
  ) {}

  async execute(userId: string, createExpenseDto: CreateExpenseDto) {
    const user = await this.getUserUseCase.execute(userId);
    const expense = Expense.instance({ ...createExpenseDto, user });
    const aiCategoryName = await this.aiPlatformProvider.guessExpenseCategory(expense);
    expense.category = await this.findOrCreateCategory(aiCategoryName || MISCELLANEOUS_CATEGORY);

    return this.expenseRepository.create(expense);
  }

  private async findOrCreateCategory(categoryName: string) {
    const category = await this.categoryRepository.findByName(categoryName);
    if (category) {
      return category;
    }

    return this.categoryRepository.create(Category.instance({ name: categoryName }));
  }
}
