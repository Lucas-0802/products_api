import { IsString } from 'class-validator';

export class CategoryDTO {
  @IsString()
  value: string;

  @IsString()
  label: string;
}
