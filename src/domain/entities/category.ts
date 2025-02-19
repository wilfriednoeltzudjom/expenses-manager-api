export class Category {
  constructor(
    public id: string,
    public name: string,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static instance(category: Partial<Category>) {
    return new Category(category.id ?? '', category.name ?? '', category.createdAt ?? new Date(), category.updatedAt ?? new Date());
  }
}
