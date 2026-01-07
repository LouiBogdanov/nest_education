import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';

@Catch(HttpException)
export class LifecycleFilter implements ExceptionFilter {
  logger = new Logger(LifecycleFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    this.logger.error('ExceptionFilter');

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(200).json({
      success: false,
      path: request.url,
      message: exception.message,
      timestamp: new Date().toISOString(),
    });
  }
}
