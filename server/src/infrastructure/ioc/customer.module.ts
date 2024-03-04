import { Module } from '@nestjs/common';
import { AuthController } from '@presentation/controller/auth.controller';
import { ApplicationModule } from '@app/application.module';
import { CustomerController } from '@presentation/controller/customer.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [AuthController, CustomerController],
  providers: [],
})
export class CustomerModule {}
