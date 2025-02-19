export class User {
  constructor(
    public id: string,
    public lastName: string,
    public firstName: string,
    public email: string,
    public password: string,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}

  toJSON() {
    return {
      id: this.id,
      lastName: this.lastName,
      firstName: this.firstName,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static instance(user: Partial<User>) {
    return new User(user.id ?? '', user.lastName ?? '', user.firstName ?? '', user.email ?? '', user.password ?? '', user.createdAt, user.updatedAt);
  }
}
