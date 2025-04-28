import { Module } from '@nestjs/common';

import { CategoriesRepository } from './repository/categories.repository';
import { CategoriesPrismaRepository } from './repository/categories-prisma.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoriesController } from './controller/categories.controller';
import { CategoriesService } from './service/categories.service';

@Module({
  imports: [],
  controllers: [CategoriesController],
  providers: [
    PrismaService,
    CategoriesService,
    {
      provide: CategoriesRepository,
      useClass: CategoriesPrismaRepository,
    },
  ],
  exports: [CategoriesService],
})
export class CategoriesModule {}
