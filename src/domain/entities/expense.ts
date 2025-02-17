import { Category } from './category';
import { User } from './user';

export class Expense {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly user: User,
    public readonly category: Category,
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
}
