import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
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
import { DeleteProductUseCase } from '@app/use-cases/products/delete.usecase';
import { UpdateProductDto } from '@domain/dto/update-product.dto';
import { UpdateProductUseCase } from '@app/use-cases/products/update.usecase';
import { Public } from '@main/config/environment/public-metadata';

@Controller('product')
export class ProductController {
  constructor(
    private readonly findOneProduct: FindOneProductUseCase,
    private readonly findProduct: FindProductUseCase,
    private readonly createProduct: CreateProductUseCase,
    private readonly deleteProduct: DeleteProductUseCase,
    private readonly updateProduct: UpdateProductUseCase,
  ) {}

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.findOneProduct.execute(id);
  }

  @Public()
  @Get()
  async find(@Query() findProductDto: FindProductDto) {
    return this.findProduct.execute(findProductDto);
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
    return this.createProduct.execute(productDto);
  }

  @Patch('/:id')
  async updatePartially(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.updateProduct.execute(id, updateProductDto);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.updateProduct.execute(id, updateProductDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return this.deleteProduct.execute(id);
  }
}
