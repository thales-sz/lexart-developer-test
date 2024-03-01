import { Sequelize } from 'sequelize-typescript';
import { DATABASE_PROVIDER } from '@main/config/constants';
import { ConfigService } from '@nestjs/config';

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
      });

      await sequelize.sync();
      return sequelize;
    },
  },
];
