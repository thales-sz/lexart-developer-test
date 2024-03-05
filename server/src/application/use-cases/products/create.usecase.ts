import { Inject, Injectable, Logger } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from '@main/config/constants';
import { Product } from '@domain/models/product.model';
import { CreateProductDto } from '@domain/dto/create-product.dto';

@Injectable()
export class CreateProductUseCase {
  protected logger: Logger = new Logger(CreateProductUseCase.name);

  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
  ) {}

  async execute(productDto: CreateProductDto): Promise<Product[]> {
    const productList: Product[] = [];

    return this.productRepository.bulkCreate([]);
  }
}
