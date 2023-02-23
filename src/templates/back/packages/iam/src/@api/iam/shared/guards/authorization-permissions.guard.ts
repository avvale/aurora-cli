import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationPermissionsGuard implements CanActivate
{
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>
    {
        const permissions = this.reflector.get<string[]>('permissions', context.getClass());

        if (!permissions) return true;

        // check that each permission is included in account permissions
        if (context['contextType'] === 'graphql')
        {
            const ctx = GqlExecutionContext.create(context);
            if (permissions.every(permission => ctx.getContext().req.user.dPermissions.all?.includes(permission))) return true;

            throw new UnauthorizedException({
                statusCode: 403,
                message   : 'Forbidden resource, requires the following permissions ' + permissions.join(', '),
                error     : 'Forbidden',
            });
        }
        else if (context['contextType'] === 'http')
        {
            const ctx = context.switchToHttp();
            if (permissions.every(permission => ctx.getRequest().user.dPermissions.all?.includes(permission))) return true;

            throw new UnauthorizedException({
                statusCode: 403,
                message   : 'Forbidden resource, requires the following permissions ' + permissions.join(', '),
                error     : 'Forbidden',
            });
        }
    }
}
