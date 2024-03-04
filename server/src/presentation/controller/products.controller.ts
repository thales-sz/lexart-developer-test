import { Get, Param } from "@nestjs/common";

export class ProductController {
  constructor(private readonly findOneProductUseCase: FindOneProductUseCase) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.findOneProductUseCase.execute(id);
  }

  @Get()
  async find() {
    return await this.findProductUseCase.execute();
  }
}
