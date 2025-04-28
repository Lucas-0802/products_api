import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { CreateProductDTO } from '../dto/product.dto';
import {
  ProductListResponseDTO,
  ProductResponseDTO,
  SimpleResponseDTO,
} from '../dto/product-response.dto';

@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(): Promise<ProductListResponseDTO> {
    return await this.productsService.getProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<ProductResponseDTO> {
    return await this.productsService.getProductById(id);
  }

  @Post()
  async createProduct(
    @Body() body: CreateProductDTO,
  ): Promise<ProductResponseDTO> {
    return await this.productsService.createProduct(body);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() body: CreateProductDTO,
  ): Promise<ProductResponseDTO> {
    return await this.productsService.updateProduct(id, body);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<SimpleResponseDTO> {
    return await this.productsService.deleteProduct(id);
  }
}
