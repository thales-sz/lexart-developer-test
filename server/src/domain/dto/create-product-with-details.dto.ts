import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
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

export class CreateProductWithDetailsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Details)
  details: Details;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
