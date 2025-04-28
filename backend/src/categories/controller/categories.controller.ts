import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { CategoryDTO } from '../dto/category.dto';
import { CategoriesService } from '../service/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getCategories(): Promise<CategoryDTO[]> {
    return await this.categoriesService.getCategories();
  }
}
