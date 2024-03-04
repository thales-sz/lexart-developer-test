import { Module } from '@nestjs/common';
import { AuthService } from './service/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { customerProvider } from './models/customer.provider';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.getOrThrow<string>('JWT_EXPIRATION')}s`,
          algorithm: 'HS512',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, ...customerProvider],
  exports: [AuthService, ...customerProvider],
})
export class DomainModule {}
