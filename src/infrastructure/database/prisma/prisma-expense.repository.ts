import { inject, injectable } from 'tsyringe';

import { PrismaClient } from '@prisma/client';

import { Expense } from '@/domain/entities/expense';
import { ExpenseRepository } from '@/domain/repositories/expense.repository';

@injectable()
export class PrismaExpenseRepository implements ExpenseRepository {
  constructor(@inject('PrismaClient') private readonly prisma: PrismaClient) {}

  async create(expense: Expense): Promise<Expense> {
    const prismaExpense = await this.prisma.expense.create({
      data: {
        title: expense.title,
        description: expense.description,
        amount: expense.amount,
        date: expense.date,
        userId: expense.user.id,
        categoryId: expense.category.id,
      },
    });

    return Expense.instance({ ...prismaExpense, category: expense.category, user: expense.user });
  }

  async delete(id: string): Promise<Expense> {
    const prismaExpense = await this.prisma.expense.delete({
      where: { id },
    });

    return Expense.instance(prismaExpense);
  }

  async findById(id: string): Promise<Expense | null> {
    const prismaExpense = await this.prisma.expense.findUnique({
      where: { id },
      include: {
        category: true,
        user: true,
      },
    });

    return prismaExpense ? Expense.instance(prismaExpense) : null;
  }

  async findByUserId(userId: string): Promise<Expense[]> {
    const prismaExpenses = await this.prisma.expense.findMany({
      where: { userId },
      include: {
        category: true,
      },
    });

    return prismaExpenses.map(Expense.instance);
  }
}
