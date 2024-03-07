import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class FindProductDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumberString()
  minPrice: number;

  @IsOptional()
  @IsNumberString()
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

  @IsNumberString()
  @IsNotEmpty()
  itemsPerPage: number;

  @IsNumberString()
  @IsNotEmpty()
  currentPage: number;
}
