import { GetProductDTO } from './product.dto';

export class ProductResponseDTO {
  code: number;
  message: string;
  product: GetProductDTO;
}

export class ProductListResponseDTO {
  code: number;
  message: string;
  products: GetProductDTO[];
  total: number;
  page: number;
  pageSize: number;
}

export class SimpleResponseDTO {
  code: number;
  message: string;
}
