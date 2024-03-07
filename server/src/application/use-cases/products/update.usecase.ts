import { Inject, Injectable, Logger } from '@nestjs/common';
import { UpdateProductDto } from '@domain/dto/update-product.dto';
import { PRODUCT_REPOSITORY } from '@main/config/constants';
import { Product } from '@domain/models/product.model';

@Injectable()
export class UpdateProductUseCase {
  protected logger: Logger = new Logger(UpdateProductUseCase.name);

  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
  ) {}

  async execute(id: string, updateDto: UpdateProductDto): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      this.logger.error('Product not found');
      throw new Error('Product not found');
    }

    await product.update(updateDto);
  }
}
