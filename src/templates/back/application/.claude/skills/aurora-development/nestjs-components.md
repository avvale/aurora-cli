# NestJS Components Reference

## Guard

```typescript
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class UserNotLockedGuard implements CanActivate {
    /* #region AI-generated code */
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (user?.isLocked) {
            throw new ForbiddenException('User account is locked');
        }

        return true;
    }
    /* #endregion AI-generated code */
}
```

## Interceptor

```typescript
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    /* #region AI-generated code */
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        const request = context.switchToHttp().getRequest();

        return next.handle().pipe(
            tap(() => {
                const elapsed = Date.now() - now;
                console.log(`${request.method} ${request.url} - ${elapsed}ms`);
            }),
        );
    }
    /* #endregion AI-generated code */
}
```

## Custom Decorator

```typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        /* #region AI-generated code */
        const request = ctx.switchToHttp().getRequest();
        return request.user;
        /* #endregion AI-generated code */
    },
);

// Usage in controller:
@Get('profile')
getProfile(@CurrentUser() user: User) {
    return user;
}
```

## Pipe

```typescript
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
    /* #region AI-generated code */
    transform(value: string): number {
        const val = parseInt(value, 10);
        if (isNaN(val)) {
            throw new BadRequestException('Validation failed: not a number');
        }
        return val;
    }
    /* #endregion AI-generated code */
}
```

## Exception Filter

```typescript
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    /* #region AI-generated code */
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            message: exception.message,
        });
    }
    /* #endregion AI-generated code */
}
```
