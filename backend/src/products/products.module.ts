import { Module } from '@nestjs/common';
import { ProductsController } from './controller/products.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsService } from './service/products.service';
import { ProductsRepository } from './repository/products.repository';
import { ProductsPrismaRepository } from './repository/products-prima.repository';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [
    PrismaService,
    ProductsService,
    {
      provide: ProductsRepository,
      useClass: ProductsPrismaRepository,
    },
  ],
})
export class ProductsModule {}
