import { Expense } from '../entities/expense';

export interface ExpenseRepository {
  create(expense: Expense): Promise<Expense>;
  delete(id: string): Promise<Expense>;
  findById(id: string): Promise<Expense | null>;
  findByUserId(userId: string): Promise<Expense[]>;
}
