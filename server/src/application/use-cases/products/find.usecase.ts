import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from 'src/main/config/constants';
import { Product } from 'src/domain/models/product.model';
import { FindProductDto } from '../../../domain/dto/find-product.dto';
import { Op, WhereOptions } from 'sequelize';
import { PaginationHelper } from '../../../utils/paginate.helper';

type FindProductResponse = {
  items: Product[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
};

@Injectable()
export class FindProductUseCase {
  protected logger: Logger = new Logger(FindProductUseCase.name);

  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
    private readonly pagination: PaginationHelper<Product>,
  ) {}

  async execute({
    brand,
    name,
    color,
    minPrice,
    maxPrice,
    model,
    currentPage,
    itemsPerPage,
  }: FindProductDto): Promise<FindProductResponse> {
    const whereOptions: WhereOptions<Product> = {};

    brand ? (whereOptions.brand = { [Op.iLike]: `%${brand}%` }) : null;
    name ? (whereOptions.name = { [Op.iLike]: `%${name}%` }) : null;
    color ? (whereOptions.color = { [Op.iLike]: `%${color}%` }) : null;
    model ? (whereOptions.model = { [Op.iLike]: `%${model}%` }) : null;
    minPrice && maxPrice
      ? (whereOptions.price = {
          [Op.and]: {
            [Op.gte]: minPrice,
            [Op.lte]: maxPrice,
          },
        })
      : null;

    console.log('whereOptions', whereOptions);

    const { rows, count } = await this.productRepository.findAndCountAll({
      offset: (currentPage - 1) * itemsPerPage,
      limit: itemsPerPage,
      where: whereOptions,
    });

    if (!rows || count <= 0) {
      this.logger.error('Products not found');
      throw new NotFoundException('Products not found');
    }

    return this.pagination.execute(rows, currentPage, itemsPerPage, count);
  }
}
