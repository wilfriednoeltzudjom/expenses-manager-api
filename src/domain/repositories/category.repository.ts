import { Category } from '../entities/category';

export interface CategoryRepository {
  create(category: Category): Promise<Category>;
  findById(id: string): Promise<Category | null>;
  findByName(name: string): Promise<Category | null>;
  findCategories(): Promise<Category[]>;
}
