import { getRequestFromExecutionContext } from '@aurorajs.dev/core';
import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthenticationJwtGuard extends AuthGuard('jwt')
{
    // override the getRequest() method for return request from graphql or rest api.
    getRequest(context: ExecutionContext): Request
    {
        return getRequestFromExecutionContext(context);
    }

    // Account returned by jwt.strategy in validate method
    handleRequest<AccountResponse>(err, user, info): AccountResponse
    {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) throw err || new UnauthorizedException();
        return user;
    }
}