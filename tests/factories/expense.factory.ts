import { faker } from '@faker-js/faker';

import { Expense } from '@/domain/entities/expense';

function generateExpense() {
  return Expense.instance({
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    amount: Number(faker.finance.amount()),
    date: faker.date.recent(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  });
}

export default { generateExpense };
