import { Body, Controller, Get, Param } from '@nestjs/common';
import { FindOneProductUseCase } from '@app/use-cases/products/find-one.usecase';
import { FindProductUseCase } from '../../application/use-cases/products/find.usecase';
import { FindProductDto } from '../../domain/dto/find-product.dto';

@Controller('product')
export class ProductController {
  constructor(
    private readonly findOneProductUseCase: FindOneProductUseCase,
    private readonly findProductUseCase: FindProductUseCase,
  ) {}

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.findOneProductUseCase.execute(id);
  }

  @Get()
  async find(@Body() findProductDto: FindProductDto) {
    return await this.findProductUseCase.execute(findProductDto);
  }
}
