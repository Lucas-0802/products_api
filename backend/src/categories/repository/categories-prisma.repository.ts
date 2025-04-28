import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CategoryDTO } from '../dto/category.dto';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesPrismaRepository implements CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<CategoryDTO[]> {
    const categories = await this.prisma.category.findMany();

    return categories.map((category) => ({
      value: category.id,
      label: category.label,
    }));
  }
}
