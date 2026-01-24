import { Arr, getRequestFromExecutionContext } from '@aurorajs.dev/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationPermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const apiPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getClass(),
    );
    const accountPermissions = this.getRequest(context).user.dPermissions.all;

    // if no permissions are defined, allow access
    if (
      !apiPermissions ||
      (Array.isArray(apiPermissions) && apiPermissions.length === 0)
    )
      return true;

    if (Arr.intersects(apiPermissions, accountPermissions)) return true;

    throw new UnauthorizedException({
      statusCode: 403,
      message:
        'Forbidden resource, requires the following permissions ' +
        apiPermissions.join(', '),
      error: 'Forbidden',
    });
  }

  // override the getRequest() method for return request from graphql or rest api.
  getRequest<T = any>(context: ExecutionContext): T {
    return getRequestFromExecutionContext(context);
  }
}
