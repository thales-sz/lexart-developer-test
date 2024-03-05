import { Inject, Injectable, Logger } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from '../../../main/config/constants';
import { Product } from '../../../domain/models/product.model';
@Injectable()
export class DeleteProductUseCase {
  protected logger: Logger = new Logger(DeleteProductUseCase.name);
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
  ) {}
  async execute(id: string): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      this.logger.error('Product not found');
      throw new Error('Product not found');
    }

    await product.destroy();
  }
}
