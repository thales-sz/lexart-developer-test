import { Module } from '@nestjs/common';
import { SignInUseCase } from './use-cases/auth/sign-in.usecase';
import { DomainModule } from 'src/domain/domain.module';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { SignUpUseCase } from './use-cases/auth/sign-up.usecase';
import { FindOneCustomerUseCase } from './use-cases/customer';
import { FindCustomerUseCase } from './use-cases/customer/find-all.usecase';
import { DeleteCustomerUseCase } from './use-cases/customer/delete.usecase';
import { UpdateCustomerUseCase } from './use-cases/customer/update.usecase';
import { PaginationHelper } from '../utils/paginate.helper';
import { FindOneProductUseCase } from './use-cases/products/find-one.usecase';
import { FindProductUseCase } from './use-cases/products/find.usecase';
import { CreateProductUseCase } from './use-cases/products/create.usecase';
import { DeleteProductUseCase } from './use-cases/products/delete.usecase';
import { UpdateProductUseCase } from './use-cases/products/update.usecase';

@Module({
  imports: [DomainModule, DatabaseModule],
  providers: [
    PaginationHelper,
    SignInUseCase,
    SignUpUseCase,
    FindOneCustomerUseCase,
    FindCustomerUseCase,
    DeleteCustomerUseCase,
    UpdateCustomerUseCase,
    FindOneProductUseCase,
    FindProductUseCase,
    CreateProductUseCase,
    DeleteProductUseCase,
    UpdateProductUseCase,
  ],
  exports: [
    SignInUseCase,
    SignUpUseCase,
    FindOneCustomerUseCase,
    FindCustomerUseCase,
    DeleteCustomerUseCase,
    UpdateCustomerUseCase,
    FindOneProductUseCase,
    FindProductUseCase,
    CreateProductUseCase,
    DeleteProductUseCase,
    UpdateProductUseCase,
  ],
})
export class ApplicationModule {}
