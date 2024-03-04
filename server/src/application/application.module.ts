import { Module } from '@nestjs/common';
import { SignInUseCase } from './use-cases/sign-in.usecase';
import { DomainModule } from '@domain/domain.module';
import { DatabaseModule } from '../infrastructure/database/database.module';

@Module({
  imports: [DomainModule, DatabaseModule],
  providers: [SignInUseCase],
  exports: [SignInUseCase],
})
export class ApplicationModule {}
