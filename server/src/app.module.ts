import { Module } from '@nestjs/common';
import { CustomerModule, ProductsModule } from '@infra';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3030),
      }),
      envFilePath: '.env',
    }),
    CustomerModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
