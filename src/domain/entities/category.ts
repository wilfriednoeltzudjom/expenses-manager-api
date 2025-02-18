export class Category {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
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
