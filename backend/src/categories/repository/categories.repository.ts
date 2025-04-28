import { CategoryDTO } from '../dto/category.dto';

export abstract class CategoriesRepository {
  abstract findAll(): Promise<CategoryDTO[]>;
}
