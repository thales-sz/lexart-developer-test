import { Module } from '@nestjs/common';
import { CustomerModule, ProductsModule } from '@infra';

@Module({
  imports: [ConfigModule CustomerModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
