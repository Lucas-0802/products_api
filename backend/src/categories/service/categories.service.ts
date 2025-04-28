import { Injectable } from '@nestjs/common';
import { CategoryDTO } from '../dto/category.dto';
import { CategoriesRepository } from '../repository/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async getCategories(): Promise<CategoryDTO[]> {
    return await this.categoriesRepository.findAll();
  }
}
