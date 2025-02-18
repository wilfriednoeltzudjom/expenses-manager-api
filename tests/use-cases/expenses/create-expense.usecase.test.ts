import 'reflect-metadata';

import categoryFactory from 'tests/factories/category.factory';
import expenseFactory from 'tests/factories/expense.factory';
import userFactory from 'tests/factories/user.factory';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { MISCELLANEOUS_CATEGORY } from '@/config/constants';
import { container } from '@/config/container';
import { CreateExpenseUseCase } from '@/use-cases/expenses/create-expense.usecase';

describe('CreateExpenseUseCase', () => {
  let createExpenseUseCase: CreateExpenseUseCase;
  const expenseRepository = { create: vi.fn() };
  const categoryRepository = { create: vi.fn(), findByName: vi.fn() };
  const aiPlatformProvider = { guessExpenseCategory: vi.fn() };
  const getUserUseCase = { execute: vi.fn() };
  const user = userFactory.generateUser();

  beforeEach(() => {
    vi.resetAllMocks();

    getUserUseCase.execute.mockResolvedValue(user);
    categoryRepository.create.mockImplementation((category) => category);
    expenseRepository.create.mockImplementation((expense) => expense);

    container.registerInstance('ExpenseRepository', expenseRepository);
    container.registerInstance('CategoryRepository', categoryRepository);
    container.registerInstance('AIPlatformProvider', aiPlatformProvider);
    container.registerInstance('GetUserUseCase', getUserUseCase);
    createExpenseUseCase = container.resolve<CreateExpenseUseCase>(CreateExpenseUseCase);
  });

  describe('when the ai platform provider does not return a category', () => {
    beforeEach(() => {
      aiPlatformProvider.guessExpenseCategory.mockResolvedValue('');
    });

    it('should create a new expense', async () => {
      const expense = await createExpenseUseCase.execute(user.id, expenseFactory.generateExpense());
      expect(expenseRepository.create).toHaveBeenCalled();
      expect(expense.id).toBeDefined();
      expect(categoryRepository.create).toHaveBeenCalled();
      expect(expense.category.name).toBe(MISCELLANEOUS_CATEGORY);
      expect(expense.user.id).toBe(user.id);
    });
  });

  describe('when the ai platform provider returns a category that is not in the database', () => {
    beforeEach(() => {
      aiPlatformProvider.guessExpenseCategory.mockResolvedValue('Food');
    });

    it('should create a new expense', async () => {
      const expense = await createExpenseUseCase.execute(user.id, expenseFactory.generateExpense());
      expect(expenseRepository.create).toHaveBeenCalled();
      expect(expense.id).toBeDefined();
      expect(categoryRepository.create).toHaveBeenCalled();
      expect(expense.category.name).toBe('Food');
      expect(expense.user.id).toBe(user.id);
    });
  });

  describe('when the ai platform provider returns a category that is in the database', () => {
    const category = categoryFactory.generateCategory();

    beforeEach(() => {
      aiPlatformProvider.guessExpenseCategory.mockResolvedValue(category.name);
      categoryRepository.findByName.mockResolvedValue(category);
    });

    it('should create a new expense', async () => {
      const expense = await createExpenseUseCase.execute(user.id, expenseFactory.generateExpense());
      expect(expenseRepository.create).toHaveBeenCalled();
      expect(expense.id).toBeDefined();
      expect(categoryRepository.create).not.toHaveBeenCalled();
      expect(expense.category.name).toBe(category.name);
      expect(expense.user.id).toBe(user.id);
    });
  });
});
