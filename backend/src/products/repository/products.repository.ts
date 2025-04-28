import {
  ProductListResponseDTO,
  ProductResponseDTO,
  SimpleResponseDTO,
} from '../dto/product-response.dto';
import { CreateProductDTO } from '../dto/product.dto';

export abstract class ProductsRepository {
  abstract findAll(): Promise<ProductListResponseDTO>;
  abstract findById(id: string): Promise<ProductResponseDTO>;
  abstract create(data: CreateProductDTO): Promise<ProductResponseDTO>;
  abstract update(
    id: string,
    data: CreateProductDTO,
  ): Promise<ProductResponseDTO>;
  abstract delete(id: string): Promise<SimpleResponseDTO>;
}
