import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repository/products.repository';

import {
  ProductListResponseDTO,
  ProductResponseDTO,
  SimpleResponseDTO,
} from '../dto/product-response.dto';
import { CreateProductDTO } from '../dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async getProducts(): Promise<ProductListResponseDTO> {
    return this.productsRepository.findAll();
  }

  async getProductById(id: string): Promise<ProductResponseDTO> {
    return this.productsRepository.findById(id);
  }

  async createProduct(data: CreateProductDTO): Promise<ProductResponseDTO> {
    return this.productsRepository.create(data);
  }

  async updateProduct(
    id: string,
    data: CreateProductDTO,
  ): Promise<ProductResponseDTO> {
    return this.productsRepository.update(id, data);
  }

  async deleteProduct(id: string): Promise<SimpleResponseDTO> {
    return this.productsRepository.delete(id);
  }
}
