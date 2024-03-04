import { Module } from '@nestjs/common';
import { SignInUseCase } from './use-cases/sign-in.usecase';
import { DomainModule } from '@domain/domain.module';
import { DatabaseModule } from '../infrastructure/database/database.module';
import { SignUpUseCase } from './use-cases/sign-up.usecase';

@Module({
  imports: [DomainModule, DatabaseModule],
  providers: [SignInUseCase, SignUpUseCase],
  exports: [SignInUseCase, SignUpUseCase],
})
export class ApplicationModule {}
