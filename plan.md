## Entitties

```
Table categories {
  id uuid [primary key, default: `uuidv4()`]
  name varchar(32) [unique, not null]
  description varchar(256) [null]
  isActive bool [default: true]

  create_at timestampz
  update_at timestampz
}

Table products {
  id uuid [primary key, default: `uuidv4()`]
  name varchar(32) [unique, not null]
  description varchar(256) [null]

  category_id uuid [not null, ref: > categories.id]

  create_at timestampz
  update_at timestampz
}
```

## Життєвий цикл HTTP-запиту (Request Lifecycle)

```
Request
  ↓
Middleware
  ↓
Guards
  ↓
Interceptors (before)
  ↓
Pipes
  ↓
Controller
  ↓
Service
  ↓
Interceptors (after)
  ↓
Exception Filters (у разі помилки)
  ↓
Response
```

---

```ts
//packages/auth/src/decorators/authorized.decorator.ts
import { UserEntity } from '@bloco/entities';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { Request } from 'express';

interface GqlContext {
  req: Request & { user: UserEntity };
}

export const Authorized = createParamDecorator(
  (data: keyof UserEntity, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);

    const req = ctx.getContext<GqlContext>().req;
    const { user } = req;

    return data ? user[data] : user;
  },
);
```

```ts
import {
  type ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

// Optional GraphQL support
let GqlExecutionContext: any;
try {
  const graphql = require('@nestjs/graphql');
  GqlExecutionContext = graphql.GqlExecutionContext;
} catch (error) {
  // GraphQL not available, will use HTTP context only
}

interface GqlContext {
  req: any; // Express Request or any framework request
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(private readonly reflector: Reflector) {
    super();
  }

  public getRequest(context: ExecutionContext): any {
    if (GqlExecutionContext) {
      const ctx = GqlExecutionContext.create(context);
      return (ctx.getContext() as GqlContext).req;
    }
    // Fallback to HTTP context
    return context.switchToHttp().getRequest();
  }

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context) as boolean | Promise<boolean>;
  }

  public handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ) {
    if (err || !user) {
      throw new UnauthorizedException(err || 'You are not authenticated.');
    }

    if (GqlExecutionContext) {
      const ctx = GqlExecutionContext.create(context);
      ctx.getContext().user = user;
    }

    return user;
  }
}
```
