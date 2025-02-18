import { faker } from '@faker-js/faker';

import { User } from '@/domain/entities/user';

function generateUser() {
  return User.instance({
    id: faker.string.uuid(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  });
}

export default { generateUser };
