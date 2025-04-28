import {
  IsArray,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CategoryDTO } from 'src/categories/dto/category.dto';

export class CreateProductDTO {
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryDTO)
  categories: CategoryDTO[];

  @IsNumber()
  price: number;

  @IsNumber()
  qty: number;

  @IsString()
  photo: string;
}

export class GetProductDTO {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryDTO)
  categories: CategoryDTO[];

  @IsNumber()
  price: number;

  @IsNumber()
  qty: number;

  @IsString()
  photo: string;
}
