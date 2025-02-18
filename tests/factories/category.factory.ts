import { faker } from '@faker-js/faker';

import { Category } from '@/domain/entities/category';

function generateCategory() {
  return Category.instance({
    id: faker.string.uuid(),
    name: faker.commerce.department(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  });
}

export default { generateCategory };
