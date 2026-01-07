import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class LifecycleInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  logger = new Logger(LifecycleInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    this.logger.debug('3.Before...');

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        this.logger.debug(`7.After... ${Date.now() - now}ms`);
      }),
      map((data) => ({ data })),
    );
  }
}
