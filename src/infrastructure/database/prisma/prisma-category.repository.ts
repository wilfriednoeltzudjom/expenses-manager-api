import { inject, injectable } from 'tsyringe';

import { PrismaClient } from '@prisma/client';

import { Category } from '@/domain/entities/category';
import { CategoryRepository } from '@/domain/repositories/category.repository';

@injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(@inject('PrismaClient') private readonly prisma: PrismaClient) {}

  async create(category: Category): Promise<Category> {
    const prismaCategory = await this.prisma.category.create({
      data: category,
    });

    return Category.instance(prismaCategory);
  }

  async findById(id: string): Promise<Category | null> {
    const prismaCategory = await this.prisma.category.findUnique({
      where: { id },
    });

    return prismaCategory ? Category.instance(prismaCategory) : null;
  }

  async findByName(name: string): Promise<Category | null> {
    const prismaCategory = await this.prisma.category.findUnique({
      where: { name },
    });

    return prismaCategory ? Category.instance(prismaCategory) : null;
  }

  async findCategories(): Promise<Category[]> {
    const prismaCategories = await this.prisma.category.findMany();

    return prismaCategories.map(Category.instance);
  }
}
