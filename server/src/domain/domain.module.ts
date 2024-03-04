import { Module } from '@nestjs/common';
import { AuthService } from './service/auth/auth.service';

@Module({
  imports: [],
  providers: [AuthService],
  exports: [AuthService],
})
export class DomainModule {}
