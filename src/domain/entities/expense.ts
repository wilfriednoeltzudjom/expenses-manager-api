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
    const user = this.user ? this.user.toJSON() : {};
    const category = this.category ? this.category.toJSON() : {};

    return {
      id: this.id,
      title: this.title,
      user,
      category,
      amount: this.amount,
      description: this.description,
      date: this.date,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static instance(expense: Partial<Expense>) {
    return new Expense(
      expense.id ?? '',
      expense.title ?? '',
      expense.user ?? User.instance({}),
      expense.category ?? Category.instance({}),
      expense.amount ?? 0,
      expense.description ?? '',
      expense.date ?? new Date(),
      expense.createdAt ?? new Date(),
      expense.updatedAt ?? new Date(),
    );
  }
}
