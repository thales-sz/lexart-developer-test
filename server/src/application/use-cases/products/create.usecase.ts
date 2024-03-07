import { Inject, Injectable, Logger } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from 'src/main/config/constants';
import { Product } from 'src/domain/models/product.model';
import {
  CreateProductDto,
  CreateProductWithDataDto,
  CreateProductWithDetailsDto,
} from 'src/domain/dto';

@Injectable()
export class CreateProductUseCase {
  protected logger: Logger = new Logger(CreateProductUseCase.name);

  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
  ) { }

  async execute(
    productDto:
      | CreateProductDto
      | CreateProductWithDataDto[]
      | CreateProductWithDetailsDto,
  ): Promise<Product[]> {
    const products = this.convertToProductList(productDto);

    console.log(products);

    return this.productRepository.bulkCreate(products as any);
  }

  private convertToProductList(
    productDto:
      | CreateProductDto
      | CreateProductWithDataDto[]
      | CreateProductWithDetailsDto,
  ): CreateProductDto[] {
    if (Array.isArray(productDto)) {
      const products: CreateProductDto[] = [];

      for (const product of productDto) {
        product.data.forEach((data) => {
          products.push({
            name: product.name,
            brand: product.brand,
            model: product.model,
            price: data.price,
            color: data.color,
          });
        });
      }

      return products;
    }

    if ('details' in productDto) {
      return [
        {
          ...productDto,
          brand: productDto.details.brand,
          model: productDto.details.model,
          color: productDto.details.color,
        },
      ];
    }

    return [productDto];
  }
}
