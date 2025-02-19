import { inject, injectable } from 'tsyringe';

import { PrismaClient } from '@prisma/client';

import { User } from '@/domain/entities/user';
import { UserRepository } from '@/domain/repositories/user.repository';

@injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(@inject('PrismaClient') private readonly prisma: PrismaClient) {}

  async create(user: User): Promise<User> {
    const prismaUser = await this.prisma.user.create({
      data: {
        lastName: user.lastName,
        firstName: user.firstName,
        email: user.email,
        password: user.password,
      },
    });

    return User.instance(prismaUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { email },
    });

    return prismaUser ? User.instance(prismaUser) : null;
  }

  async findById(id: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { id },
    });

    return prismaUser ? User.instance(prismaUser) : null;
  }
}
