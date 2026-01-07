import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { LifecycleController } from './lifecycle.controller';
import { LifecycleService } from './lifecycle.service';
import { LifecycleMiddleware } from './middlewares/lifecycle.middleware';

@Module({
  controllers: [LifecycleController],
  providers: [LifecycleService],
})
export class LifecycleModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LifecycleMiddleware).forRoutes('*');
  }
}
