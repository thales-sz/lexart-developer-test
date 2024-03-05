import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class Details {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  color: string;
}

class Data {
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  color: string;
}

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

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Details)
  details: Details;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Data)
  data: Data[];
}
