import { Module } from '@nestjs/common';
import { AuthController } from '@presentation/controller/auth.controller';
import { ApplicationModule } from '@app/application.module';
import { CustomerController } from '@presentation/controller/customer.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  CacheInterceptor,
  CacheModule,
  CacheStore,
} from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DomainModule } from '../../domain/domain.module';

@Module({
  imports: [
    ApplicationModule,
    DomainModule,
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: 60,
        max: 5,
        store: redisStore as unknown as CacheStore,
        socket: {
          host: configService.getOrThrow<string>('REDIS_HOST'),
          port: configService.getOrThrow<string>('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController, CustomerController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class CustomerModule {}
