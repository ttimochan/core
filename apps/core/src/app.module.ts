import { DatabaseModule } from '@libs/database';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '~/libs/cache/src';
import { ConfigModule } from '~/libs/config/src';
import { AllExceptionsFilter } from '~/shared/common/filters/any-exception.filter';
import { RolesGuard } from '~/shared/common/guard/roles.guard';
import { HttpCacheInterceptor } from '~/shared/common/interceptors/cache.interceptor';
import { JSONSerializeInterceptor } from '~/shared/common/interceptors/json-serialize.interceptor';
import { ResponseInterceptor } from '~/shared/common/interceptors/response.interceptor';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AggregateModule } from './modules/aggregate/aggregate.module';
import { CategoryModule } from './modules/category/category.module';
import { PageModule } from './modules/page/page.module';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';
import { CommentsModule } from './modules/comments/comments.module';
import { FriendsModule } from './modules/friends/friends.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServicesEnum } from '~/shared/constants/services.constant';
import { REDIS } from './app.config';
import { ConfigPublicModule } from './modules/configs/configs.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CacheModule,
    DatabaseModule,
    ConfigModule,
    UserModule,
    PostModule,
    PageModule,
    CategoryModule,
    AggregateModule,
    CommentsModule,
    FriendsModule,
    ConfigPublicModule,
    ClientsModule.register([
      {
        name: ServicesEnum.notification,
        transport: Transport.REDIS,
        options: {
          port: REDIS.port,
          host: REDIS.host,
          password: REDIS.password,
          username: REDIS.user,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpCacheInterceptor, // 3
    },

    {
      provide: APP_INTERCEPTOR,
      useClass: JSONSerializeInterceptor, // 2
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor, // 1
    },

    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
