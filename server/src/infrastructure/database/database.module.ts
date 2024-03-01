import { Module } from '@nestjs/common';
import { databaseProviders } from './sequelize/database.provider';

@Module({
  imports: [],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
