import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FindOneProductUseCase } from '@app/use-cases/products/find-one.usecase';
import { FindProductUseCase } from '@app/use-cases/products/find.usecase';
import { FindProductDto } from '@domain/dto/find-product.dto';
import { CreateProductDto } from '@domain/dto/create-product.dto';
import { CreateProductUseCase } from '@app/use-cases/products/create.usecase';

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
  async create(@Body() productDto: CreateProductDto) {
    return this.createProductUseCase.execute(productDto);
  }
}
