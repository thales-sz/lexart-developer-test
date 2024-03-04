import { Module } from '@nestjs/common';
import { CustomerModule, ProductsModule } from '@infra';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { ApplicationModule } from '@app/application.module';

@Module({
  imports: [
    ApplicationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3030),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.number().required(),
        DB_DIALECT: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432).required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
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
