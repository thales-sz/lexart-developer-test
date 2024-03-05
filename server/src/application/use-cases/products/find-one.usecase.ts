import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Product } from '../../../domain/models/product.model';
import { PRODUCT_REPOSITORY } from '../../../main/config/constants';
@Injectable()
export class FindOneProductUseCase {
  protected logger: Logger = new Logger(FindOneProductUseCase.name);

  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
  ) {}

  async execute(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      this.logger.error('Product not found for the id: ' + id);
      throw new NotFoundException('Product not found');
    }

    return product;
  }
}
