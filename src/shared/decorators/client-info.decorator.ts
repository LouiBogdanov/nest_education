import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import type { Request } from 'express';

export const ClientInfo = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();

    return {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      requestId: req.headers['x-request-id'],
    };
  },
);
