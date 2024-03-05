import { Module } from '@nestjs/common';
import { ApplicationModule } from '../../application/application.module';
import { ProductController } from '../../presentation/controller/products.controller';

@Module({
  imports: [
    ApplicationModule,
    // CacheModule.registerAsync({
    //   isGlobal: true,
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     ttl: 60,
    //     max: 5,
    //     store: redisStore as unknown as CacheStore,
    //     socket: {
    //       host: configService.getOrThrow<string>('REDIS_HOST'),
    //       port: configService.getOrThrow<string>('REDIS_PORT'),
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [ProductController],
  providers: [],
})
export class ProductsModule {}
