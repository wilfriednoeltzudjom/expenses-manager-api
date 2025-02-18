export class User {
  constructor(
    public readonly id: string,
    public readonly lastName: string,
    public readonly firstName: string,
    public readonly email: string,
    public readonly password: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
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
