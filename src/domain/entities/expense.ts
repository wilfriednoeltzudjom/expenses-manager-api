import { Category } from './category';
import { User } from './user';

export class Expense {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public user: User,
    public category: Category,
    public readonly amount: number,
    public readonly description: string,
    public readonly date: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      amount: this.amount,
      description: this.description,
      date: this.date,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      user: this.user?.toJSON(),
      category: this.category?.toJSON(),
    };
  }

  static instance(expense: Partial<Omit<Expense, 'user' | 'category'>> & { user?: Partial<User>; category?: Partial<Category> }) {
    return new Expense(
      expense.id ?? '',
      expense.title ?? '',
      expense.user ? User.instance(expense.user) : User.instance({}),
      expense.category ? Category.instance(expense.category) : Category.instance({}),
      expense.amount ?? 0,
      expense.description ?? '',
      expense.date ?? new Date(),
      expense.createdAt ?? new Date(),
      expense.updatedAt ?? new Date(),
    );
  }
}
