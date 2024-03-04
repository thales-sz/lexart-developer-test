import { Module } from '@nestjs/common';
import { SignInUseCase } from './use-cases/auth/sign-in.usecase';
import { DomainModule } from '@domain/domain.module';
import { DatabaseModule } from '@infra/database/database.module';
import { SignUpUseCase } from './use-cases/auth/sign-up.usecase';
import { FindOneCustomerUseCase } from './use-cases/customer';
import { FindCustomerUseCase } from './use-cases/customer/find-all.usecase';

@Module({
  imports: [DomainModule, DatabaseModule],
  providers: [
    SignInUseCase,
    SignUpUseCase,
    FindOneCustomerUseCase,
    FindCustomerUseCase,
  ],
  exports: [
    SignInUseCase,
    SignUpUseCase,
    FindOneCustomerUseCase,
    FindCustomerUseCase,
  ],
})
export class ApplicationModule {}
