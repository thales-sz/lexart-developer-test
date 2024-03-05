import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindProductDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  minPrice: number;

  @IsOptional()
  @IsNumber()
  maxPrice: number;

  @IsOptional()
  @IsString()
  brand: string;

  @IsOptional()
  @IsString()
  color: string;

  @IsOptional()
  @IsString()
  model: string;

  @IsNumber()
  @IsNotEmpty()
  itemsPerPage: number;

  @IsNumber()
  @IsNotEmpty()
  currentPage: number;
}
