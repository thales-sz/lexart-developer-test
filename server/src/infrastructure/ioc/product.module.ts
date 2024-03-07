import { Module } from '@nestjs/common';
import { ApplicationModule } from '../../application/application.module';
import { ProductController } from '../../presentation/controller/products.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [ProductController],
  providers: [],
})
export class ProductsModule {}
