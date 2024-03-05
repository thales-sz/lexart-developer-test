import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  price: number;

  @IsOptional()
  @IsString()
  model: string;

  @IsOptional()
  @IsString()
  brand: string;

  @IsOptional()
  @IsString()
  color: string;
}
