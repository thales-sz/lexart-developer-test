import { Module } from '@nestjs/common';
import { AuthController } from '@presentation/controller/auth.controller';
import { ApplicationModule } from '@app/application.module';

@Module({
  imports: [ApplicationModule],
  providers: [],
  controllers: [AuthController],
})
export class CustomerModule {}
