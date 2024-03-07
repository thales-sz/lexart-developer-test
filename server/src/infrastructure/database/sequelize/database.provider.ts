import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import {
  CUSTOMER_REPOSITORY,
  DATABASE_PROVIDER,
  PRODUCT_REPOSITORY,
} from '@main/config/constants';
import { Customer } from '@domain/models/customer.model';
import { Product } from '@domain/models/product.model';

const configService = new ConfigService();

export const databaseProviders = [
  {
    provide: DATABASE_PROVIDER,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: configService.getOrThrow('DB_DIALECT'),
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        username: configService.getOrThrow('DB_USERNAME'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.getOrThrow('DB_NAME'),
        dialectOptions: {
          ssl: true,
        },
        models: [Customer, Product],
      });

      await sequelize.sync();

      return sequelize;
    },
  },
  {
    provide: CUSTOMER_REPOSITORY,
    useValue: Customer,
  },
  {
    provide: PRODUCT_REPOSITORY,
    useValue: Product,
  },
];
