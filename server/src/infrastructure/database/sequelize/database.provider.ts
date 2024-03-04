import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { DATABASE_PROVIDER } from '@main/config/constants';
import { Customer } from '../../../domain/models/customer.model';

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
        models: [Customer],
      });

      await sequelize.sync();

      return sequelize;
    },
  },
];
