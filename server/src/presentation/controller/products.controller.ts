import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { FindOneProductUseCase } from '@app/use-cases/products/find-one.usecase';
import { FindProductUseCase } from '@app/use-cases/products/find.usecase';
import { FindProductDto } from '@domain/dto/find-product.dto';
import { CreateProductUseCase } from '@app/use-cases/products/create.usecase';
import {
  CreateProductDto,
  CreateProductWithDataDto,
  CreateProductWithDetailsDto,
} from '@domain/dto';
import { DTOValidationInterceptor } from '../interceptor/is-valid-dto.interceptor';

@Controller('product')
export class ProductController {
  constructor(
    private readonly findOneProductUseCase: FindOneProductUseCase,
    private readonly findProductUseCase: FindProductUseCase,
    private readonly createProductUseCase: CreateProductUseCase,
  ) {}

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.findOneProductUseCase.execute(id);
  }

  @Get()
  async find(@Body() findProductDto: FindProductDto) {
    return this.findProductUseCase.execute(findProductDto);
  }

  @Post()
  @UseInterceptors(new DTOValidationInterceptor())
  async create(
    @Body()
    productDto:
      | CreateProductWithDataDto[]
      | CreateProductDto
      | CreateProductWithDetailsDto,
  ) {
    return this.createProductUseCase.execute(productDto);
  }
}
