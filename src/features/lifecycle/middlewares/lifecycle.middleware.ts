import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class LifecycleMiddleware implements NestMiddleware {
  logger = new Logger(LifecycleMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.debug('1.Middleware');
    next();
  }
}
