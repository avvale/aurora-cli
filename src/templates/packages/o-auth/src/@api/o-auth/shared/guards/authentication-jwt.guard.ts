import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthenticationJwtGuard extends AuthGuard('jwt')
{
    // override the getRequest() method for return request from graphql or rest api,
    // graphql wrap request in context object
    getRequest(context: ExecutionContext): Request
    {
        if (context['contextType'] === 'graphql')
        {
            return GqlExecutionContext.create(context).getContext().req;
        }
        else if (context['contextType'] === 'http')
        {
            return context.switchToHttp().getRequest();
        }
    }

    // Account returned by jwt.strategy in validate method
    handleRequest<AccountResponse>(err, user, info): AccountResponse
    {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) throw err || new UnauthorizedException();
        return user;
    }
}