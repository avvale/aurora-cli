import { getRequestFromExecutionContext } from '@aurorajs.dev/core';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationPermissionsGuard implements CanActivate
{
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>
    {
        const permissions = this.reflector.get<string[]>('permissions', context.getClass());

        if (
            !permissions ||
            (Array.isArray(permissions) && permissions.length === 0)
        ) return true;

        if (permissions.some(permission => this.getRequest(context).user.dPermissions.all?.includes(permission))) return true;

        throw new UnauthorizedException({
            statusCode: 403,
            message   : 'Forbidden resource, requires the following permissions ' + permissions.join(', '),
            error     : 'Forbidden',
        });
    }

    // override the getRequest() method for return request from graphql or rest api.
    getRequest<T = any>(context: ExecutionContext): T
    {
        return getRequestFromExecutionContext(context);
    }
}
