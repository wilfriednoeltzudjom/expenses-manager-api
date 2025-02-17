import { Expense } from '../entities/expense';

export interface ExpenseRepository {
  create(expense: Expense): Promise<Expense>;
  update(id: string, expense: Partial<Expense>): Promise<Expense>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Expense | null>;
  findByUserId(userId: string): Promise<Expense[]>;
}
