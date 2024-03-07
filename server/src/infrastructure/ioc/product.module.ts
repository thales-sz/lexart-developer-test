import { Module } from '@nestjs/common';
import { ApplicationModule } from '../../application/application.module';
import { ProductController } from '../../presentation/controller/products.controller';
import {
  CacheInterceptor,
  CacheModule,
  CacheStore,
} from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ApplicationModule,
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
  controllers: [ProductController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class ProductsModule {}
