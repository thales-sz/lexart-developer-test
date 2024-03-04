import { Module } from '@nestjs/common';
import { SignInUseCase } from './use-cases/sign-in.usecase';
import { DomainModule } from '@domain/domain.module';
import { DatabaseModule } from '../infrastructure/database/database.module';
import { SignUpUseCase } from './use-cases/sign-up.usecase';
import { FindOneCustomerUseCase } from './use-cases/customer';

@Module({
  imports: [DomainModule, DatabaseModule],
  providers: [SignInUseCase, SignUpUseCase, FindOneCustomerUseCase],
  exports: [SignInUseCase, SignUpUseCase, FindOneCustomerUseCase],
})
export class ApplicationModule {}
